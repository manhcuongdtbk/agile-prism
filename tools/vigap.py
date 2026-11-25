# DOC: Chữ tiếng Việt trong bài và hình trùng nghĩa vi của 1 thuật ngữ Glossary: chỗ có thể dùng thuật ngữ mà đang viết lời thường. Đọc tay từng dòng.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import json,re,collections
from playwright.sync_api import sync_playwright
s=open(_o.path.join(ROOT,'terms.js')).read();T=json.loads(s[s.index('['):s.rindex(']')+1])
cand={}
for t in T:
    for v in re.split(r'[,;/]| hoặc ',t.get('vi','')):
        v=v.strip().lower()
        if len(v)>=6 and len(v.split())>=2: cand.setdefault(v,t['t'])
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(1200)
    texts=pg.evaluate("""(()=>{const out=[];const W=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);let n;
      while(n=W.nextNode()){const e=n.parentElement;if(!e||e.closest('dfn,.en,script,style,#s6-8,.drawer,code'))continue;const s=e.closest('[id^=s],#vd-shop');out.push([(s||{}).id||'?',n.data])}return out})()""")
hits=collections.defaultdict(list)
for sid,tx in texts:
    low=tx.lower()
    for v,term in cand.items():
        if re.search(r'(?<![\wÀ-ỹ])'+re.escape(v)+r'(?![\wÀ-ỹ])',low): hits[(term,v)].append((sid,tx.strip()[:90]))
for (term,v),L in sorted(hits.items(),key=lambda x:-len(x[1])):
    print(f'{term} ← "{v}" ×{len(L)}')
    for sid,tx in L[:3]: print('    ',sid,'|',tx)
print(len(hits),'thuật ngữ có chỗ viết lời thường')
