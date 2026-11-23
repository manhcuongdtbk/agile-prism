# DOC: Liệt kê hình có trục.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];document.querySelectorAll('[id^="f-"]').forEach(f=>{const s=f.querySelector('svg.fig');if(!s)return;let H=[],V=[];
 s.querySelectorAll('path[marker-end]').forEach(p=>{const b=p.getBBox();if(b.width>300&&b.height<3)H.push(Math.round(b.width));if(b.height>100&&b.width<3)V.push(Math.round(b.height))});
 if(H.length||V.length)out.push([f.id,H.join(','),V.join(',')])});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(800)
    for r in pg.evaluate(JS): print(r)
