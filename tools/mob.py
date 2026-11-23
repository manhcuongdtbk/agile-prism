# DOC: Bố cục điện thoại 390px: hình bị phóng to, cột chữ bị ép dọc. 9 dòng fwc ở 6.7 là chủ ý.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
    pg.goto(T);pg.wait_for_timeout(1200)
    r=pg.evaluate("""(()=>{const out=[];
    document.querySelectorAll('main svg').forEach(s=>{const vb=s.viewBox&&s.viewBox.baseVal;const r=s.getBoundingClientRect();if(!vb||!vb.width||!r.width)return;const k=r.width/vb.width;if(k>1.35&&r.width>60){const sec=s.closest('[id^=s],[id=vd-shop]');out.push(['SVGUP',(sec&&sec.id)||'',s.parentElement.className||s.parentElement.id,Math.round(vb.width),Math.round(r.width),Math.round(r.height)])}});
    document.querySelectorAll('main *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('svg'))return;const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.data).join('').trim();if(t.length>15&&r.width<80&&r.height>120){const sec=e.closest('[id^=s]');out.push(['NARROW',(sec&&sec.id)||'',e.tagName+'.'+e.className,Math.round(r.width),Math.round(r.height),t.slice(0,30)])}});
    document.querySelectorAll('main .card').forEach(c=>{const r=c.getBoundingClientRect();if(r.left<4)out.push(['EDGE',c.id,Math.round(r.left)])});
    return out})()""")
    for x in r: print(x)
    print(len(r))
