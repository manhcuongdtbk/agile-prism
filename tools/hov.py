# Hiệu ứng rê chuột: mọi phần tử bấm được trong hình phải đổi kiểu khi rê chuột
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
SNAP="""el=>{const pick=e=>{const s=getComputedStyle(e);return [s.fill,s.stroke,s.strokeWidth,s.opacity,s.filter,s.transform,s.backgroundColor,s.color,s.boxShadow,s.outlineStyle,s.textDecorationLine].join('|')};
 return [el,...el.querySelectorAll('*')].slice(0,6).map(pick).join('#')}"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(T);pg.wait_for_timeout(1000)
    pg.evaluate("document.querySelector('nav.top').style.display='none'")
    sel='main svg.fig a, main svg.fig [role=button], main svg.fig [data-cf], main svg.fig [data-lv], main svg.fig [style*="cursor:pointer"], main svg.fig [style*="cursor: pointer"]'
    n=pg.locator(sel).count();bad={};tot={}
    for i in range(n):
        el=pg.locator(sel).nth(i)
        try:
            fid=el.evaluate("e=>e.closest('svg').parentElement.id")
            el.scroll_into_view_if_needed(timeout=2000);pg.mouse.move(0,0);pg.wait_for_timeout(60)
            a=el.evaluate(SNAP)
            pt=el.evaluate("e=>{const r=e.getBoundingClientRect();for(let i=1;i<10;i++)for(let j=1;j<10;j++){const x=r.left+r.width*i/10,y=r.top+r.height*j/10,h=document.elementFromPoint(x,y);if(h&&e.contains(h))return [x,y]}return null}")
            if not pt: bad[fid+' KHÔNG RÊ TỚI ĐƯỢC']=1;continue
            pg.mouse.move(*pt);pg.wait_for_timeout(220);b2=el.evaluate(SNAP)
            tot[fid]=tot.get(fid,0)+1
            if a==b2: bad[fid]=bad.get(fid,0)+1
        except Exception as ex: bad[fid+' ERR']=str(ex)[:60]
    print('hình có phần tử bấm được:',len(tot),'phần tử',sum(tot.values()))
    for k,v in bad.items(): print('KHÔNG ĐỔI KHI RÊ',k,v,'/',tot.get(k,'?'))
