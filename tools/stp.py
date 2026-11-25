# DOC: Thử mọi bộ điều khiển Xem lần lượt: tới, lùi, bấm chấm.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(T);pg.wait_for_timeout(1200)
    ids=pg.evaluate("[...document.querySelectorAll('.stp')].map(s=>s.id)")
    for i in ids:
        s=f'#{i}';pg.locator(s).scroll_into_view_if_needed()
        r=[]
        for act in ['[data-a=next]','[data-a=next]','[data-a=prev]','.stp-d button:nth-child(3)','[data-a=next]']:
            pg.click(f'{s} {act}');pg.wait_for_timeout(120)
            r.append(pg.evaluate(f"document.querySelector('{s} .stp-n').textContent.split(':')[0]"))
        print(i,r)
    print(errs)
