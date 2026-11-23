# DOC: Chụp ngăn kéo Glossary: gl.py 1440 [chữ tìm]. Ảnh ở tools/.out/shots/.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from playwright.sync_api import sync_playwright
W=int(sys.argv[1]) if len(sys.argv)>1 else 1440;q=sys.argv[2] if len(sys.argv)>2 else ''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(T);pg.wait_for_timeout(1000)
    pg.keyboard.press('/');pg.wait_for_timeout(500)
    if q: pg.fill('#glQ',q);pg.wait_for_timeout(400)
    pg.screenshot(path=_o.path.join(OUT,'shots',f'gl_{W}{"_"+q if q else ""}.png'))
    print(errs)
