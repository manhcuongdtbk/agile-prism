# DOC: In bảng số hình → id khối hình, chú thích: fmap.py [lọc số, vd 2.5-1 5.5-3]
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(1000)
    r=pg.evaluate("""[...document.querySelectorAll('main figure, main .card [id^="f-"]')].map(f=>{const fc=f.querySelector('figcaption');const d=f.querySelector('[id^="f-"]')||f;return [d.id,(fc||{}).textContent||'']})""")
    for x in r:
        if not sys.argv[1:] or any(a in x[1] for a in sys.argv[1:]): print(x)
