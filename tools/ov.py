import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS='''()=>{const out=[];document.querySelectorAll('svg.fig').forEach(svg=>{const id=svg.parentElement.id;const ts=[...svg.querySelectorAll('text')].map(t=>({t:t.textContent,b:t.getBoundingClientRect()})).filter(o=>o.b.width>0);
 const sb=svg.getBoundingClientRect();
 [...svg.querySelectorAll('path,rect,line,circle,polyline,polygon')].forEach(el=>{if(el.closest('defs,marker,symbol'))return;const b=el.getBoundingClientRect();if(!b.width&&!b.height)return;if(b.left<sb.left-1.5||b.right>sb.right+1.5||b.top<sb.top-1.5||b.bottom>sb.bottom+1.5)out.push(id+' SHAPE-CLIP '+el.tagName+' '+(el.getAttribute('d')||'').slice(0,40))});
 ts.forEach(o=>{if(o.b.left<sb.left-1||o.b.right>sb.right+1||o.b.top<sb.top-1||o.b.bottom>sb.bottom+1)out.push(id+' CLIP '+o.t)});
 for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){const a=ts[i].b,b=ts[j].b;const ox=Math.min(a.right,b.right)-Math.max(a.left,b.left),oy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(ox>2&&oy>3)out.push(id+' OVER "'+ts[i].t+'" x "'+ts[j].t+'"')}});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(T);pg.wait_for_timeout(700)
    print('\n'.join(pg.evaluate(JS)));print(errs)
