# DOC: Khối có viền sát nhau dưới 8px. Các cặp chip, chữ in đậm nằm cùng dòng chữ là nhiễu, bỏ qua.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];const boxed=e=>{const s=getComputedStyle(e);return (s.borderTopWidth!=='0px'&&s.borderTopStyle!=='none')||(s.backgroundColor!=='rgba(0, 0, 0, 0)'&&s.backgroundColor!=='transparent')};
 document.querySelectorAll('main *').forEach(e=>{if(e.offsetParent===null)return;const n=e.nextElementSibling;if(!n||n.offsetParent===null)return;const ds=getComputedStyle(e.parentElement).display;if(/flex|grid/.test(ds))return;
  if(!(boxed(e)||boxed(n)))return;const a=e.getBoundingClientRect(),b=n.getBoundingClientRect();if(a.height<4||b.height<4)return;const gap=b.top-a.bottom;if(gap<8&&gap>-2&&Math.abs(a.left-b.left)<400)out.push([e.tagName+'.'+e.className.toString().slice(0,20)+'#'+e.id,n.tagName+'.'+n.className.toString().slice(0,20)+'#'+n.id,Math.round(gap),(e.closest('[id^=s]')||{}).id])});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(900)
    r=pg.evaluate(JS);print(len(r));[print(x) for x in r[:60]]
