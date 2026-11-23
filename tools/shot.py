import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from playwright.sync_api import sync_playwright
args=sys.argv[1:];W=1440
if args and args[0].startswith('w='):W=int(args[0][2:]);args=args[1:]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':W,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(T);pg.wait_for_timeout(1000)
    pg.evaluate("document.querySelector('nav.top').style.position='static'")
    for i in args:
        sel=i if i[0] in '.#[' else '#'+i
        e=pg.locator(sel).first
        if not e.is_visible():
            pg.evaluate("s=>{let e=document.querySelector(s);while(e){if(e.hidden)e.hidden=false;if(e.tagName==='DETAILS')e.open=true;e=e.parentElement}}",sel)
        if not e.is_visible(): print('HIDDEN',i);continue
        e.scroll_into_view_if_needed();pg.wait_for_timeout(150)
        bb=e.bounding_box();n=i.strip('#.[]').replace(' ','_')[:30]
        pg.screenshot(path=f_o.path.join(OUT,'shots','o_')+'{n}_{W}.png',clip={'x':max(0,bb['x']-20),'y':max(0,bb['y']-50),'width':min(W,bb['width']+40),'height':bb['height']+100})
    print(errs)
