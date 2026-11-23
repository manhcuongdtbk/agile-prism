# DOC: Chụp vài dòng Glossary theo tên: glrows.py out.png "Tên 1" "Tên 2" ...
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from playwright.sync_api import sync_playwright
out=sys.argv[1];names=sys.argv[2:];W=1440
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':900})
    pg.goto(T);pg.wait_for_timeout(1000);pg.keyboard.press('/');pg.wait_for_timeout(400)
    pg.evaluate("""ns=>{const rows=[...document.querySelectorAll('#glT tbody tr[data-i]')];rows.forEach(r=>{const n=TERMS[+r.dataset.i].t;r.style.display=ns.includes(n)?'':'none'});document.querySelectorAll('#glT tbody tr:not([data-i])').forEach(r=>r.style.display='none')}""",names)
    pg.wait_for_timeout(200);el=pg.locator('#glT');bb=el.bounding_box()
    pg.screenshot(path=out,clip={'x':bb['x'],'y':bb['y'],'width':bb['width'],'height':min(bb['height'],1400)},full_page=False)
