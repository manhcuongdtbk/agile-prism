# DOC: Rà tên cũ đang dùng như tên hiện hành trong bài và hình. Bỏ qua 6.8, Glossary và câu có chữ "tên cũ", "slide". Đọc kết quả bằng tay: tên còn đúng theo APG 2 (Information Radiator, Self-organizing, Servant Leadership) thì giữ.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import json,re
from playwright.sync_api import sync_playwright
EXTRA=['Development Team','Daily Stand-up','Daily Standup','daily standup','grooming','Self-organizing','self-organizing','Project Continuum','Tuckman Stages','12 Principles','Knowledge Area','Process Group','Sprint 0','Iteration 0','ceremonies','Ceremonies','ceremony','Information Radiator']
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(1200)
    olds=pg.evaluate("[...new Set(TERMS.flatMap(t=>(t.old||[]).map(o=>o[0])))]")
    names=sorted(set(olds+EXTRA),key=len,reverse=True)
    r=pg.evaluate("""names=>{const out=[];const W=document.createTreeWalker(document.querySelector('main')||document.body,NodeFilter.SHOW_TEXT);let n;
      while(n=W.nextNode()){const el=n.parentElement;if(!el||el.closest('#s6-8,.drawer,template,script,style'))continue;const t=n.data;
        names.forEach(nm=>{let i=t.indexOf(nm);if(i<0)return;const ctx=(el.closest('p,li,td,div,text,span')||el).textContent;if(/tên cũ|slide|trước 20|old/i.test(ctx))return;
          const s=el.closest('[id^=s],[id^=phan],#vd-shop');out.push([nm,(s||{}).id||'?',ctx.replace(/\\s+/g,' ').slice(Math.max(0,ctx.indexOf(nm)-50),ctx.indexOf(nm)+70)])})}
      return out}""",names)
    seen=set()
    for x in r:
        k=(x[0],x[1],x[2][:40])
        if k in seen:continue
        seen.add(k);print(x)
    print(len(r))
