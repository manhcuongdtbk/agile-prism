# DOC: Hình có khối mang tên đúng bằng tên 1 mục (hay 1 thuật ngữ có trang riêng) mà chưa bấm được. Dùng khi rà "khối nên bấm được". Đọc kết quả bằng tay.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(1000)
    r=pg.evaluate("""(()=>{const sec={};document.querySelectorAll('.card[id^=s] .card-head').forEach(h=>{const n=h.querySelector('.num').textContent.trim(),t=(h.querySelector('h3,b')||{}).textContent||'';t.split(/ & | và |\\/|, /).forEach(x=>{x=x.replace(/\\(.*?\\)/g,'').trim();if(x.length>3)sec[x.toLowerCase()]=n})});
      const out=[];document.querySelectorAll('main svg.fig text').forEach(t=>{const s=t.textContent.trim().toLowerCase();const n=sec[s];if(!n)return;if(t.closest('a,[role=button],[data-cf],[data-lv]'))return;const f=t.closest('svg').parentElement.id;const own=t.closest('.card[id^=s]');if(own&&own.id==='s'+n.replace('.','-'))return;out.push([f,t.textContent.trim(),'→ '+n])});return out})()""")
    seen=set()
    for x in r:
        k=tuple(x)
        if k in seen: continue
        seen.add(k);print(x)
    print(len(seen))
