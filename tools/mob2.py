import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];const W=document.documentElement.clientWidth;/* không dùng innerWidth: trang tràn thì innerWidth nới theo, che mất lỗi */
 const scroller=e=>{for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(/(auto|scroll)/.test(s.overflowX)&&p.scrollWidth>p.clientWidth+1)return true}return false};
 document.querySelectorAll('main *').forEach(e=>{if(e.closest('svg'))return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
   if(r.right>W+1&&!scroller(e)){const s=e.closest('[id^=s],[id^=phan],#vd-shop');out.push(['TRÀN',(s||{}).id,e.tagName+'.'+String(e.className).slice(0,25),Math.round(r.right)])}});
 document.querySelectorAll('main button, main a.btn, main [role=button]:not(svg *):not(.ic):not(.def-i):not(.nt-i), main .seg button').forEach(b=>{const r=b.getBoundingClientRect();if(r.width&&r.height&&r.height<24&&!b.closest('svg')){const s=b.closest('[id^=s]');out.push(['NHỎ',(s||{}).id,b.textContent.trim().slice(0,20),Math.round(r.height)])}});
 return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844});pg.goto(T);pg.wait_for_timeout(1200)
    r=pg.evaluate(JS);seen=set()
    for x in r:
        k=(x[0],x[1],x[2])
        if k in seen:continue
        seen.add(k);print(x)
    print(len(r))
