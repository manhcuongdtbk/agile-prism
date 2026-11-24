# DOC: Lỗi JS và scrollWidth ở 1440, 1024, 390. Phải ra [] và bằng nhau.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for W in (1440,1024,768,390):
        pg=b.new_page(viewport={'width':W,'height':900});e=[];pg.on('pageerror',lambda x:e.append(str(x)))
        pg.goto(T);pg.wait_for_timeout(1000)
        print(W,pg.evaluate('document.documentElement.scrollWidth'),e);pg.close()
