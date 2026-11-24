# DOC: Thuật ngữ bị gạch 1 phần bên trong cụm dài.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=new Set();document.querySelectorAll('dfn').forEach(d=>{const p=d.previousSibling,n=d.nextSibling;const pt=p&&p.nodeType===3?p.data:'',nt=n&&n.nodeType===3?n.data:'';const pm=pt.match(/([A-Z][\w@-]*(?: [A-Za-z][\w-]*)?) $/),nm=nt.match(/^ ((?:of |and |for )?[A-Z][\w-]*(?: [A-Z][\w-]*)*)/);if(pm||nm)out.add((pm?pm[1]+' ':'')+'['+d.textContent+']'+(nm?' '+nm[1]:''))});return [...out]}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(T);pg.wait_for_timeout(700)
    print('\n'.join(sorted(pg.evaluate(JS))))
