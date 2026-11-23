# DOC: Khối tròn đè lên trục. 2 dòng f-standup là chủ ý (mốc trên trục thời gian).
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];document.querySelectorAll('svg.fig').forEach(s=>{const id=s.parentElement.id;const ax=[];s.querySelectorAll('path[marker-end],path[marker-start]').forEach(p=>{const b=p.getBBox();if(b.width<3||b.height<3)ax.push(b)});
 s.querySelectorAll('circle').forEach(c=>{const cx=+c.getAttribute('cx'),cy=+c.getAttribute('cy'),r=+c.getAttribute('r');if(r<12)return;ax.forEach(b=>{if(b.height<3){if(Math.abs(cy-b.y)<r+4&&cx+r>b.x&&cx-r<b.x+b.width)out.push([id,'circle h-axis',cx,cy])}else{if(Math.abs(cx-b.x)<r+4&&cy+r>b.y&&cy-r<b.y+b.height)out.push([id,'circle v-axis',cx,cy])}})})});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(800);print(pg.evaluate(JS))
