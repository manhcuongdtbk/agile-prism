# DOC: Mọi chỗ cuộn được (.sc-x, .sc-y do core.js gắn) phải có bóng mép thật: không luật CSS nào đè mất nền (#116), và chỗ cuộn ngang có mask mờ mép chạy theo vị trí cuộn (nằm trên nội dung, ô có nền không che được). Chạy ở S23U dọc và MacBook. Đạt: dòng cuối [].
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const bad=[];document.querySelectorAll('.sc-x,.sc-y').forEach(e=>{const n=e.tagName+'.'+[...e.classList].join('.')+(e.id?'#'+e.id:'');
 if(getComputedStyle(e).backgroundImage==='none'){bad.push(['mất nền bóng mép',n]);return}
 if(e.classList.contains('sc-x')&&CSS.supports('animation-timeline','scroll()')){const c=getComputedStyle(e);if(c.maskImage==='none'||!/sc-fx/.test(c.animationName))bad.push(['thiếu mask mờ mép',n])}});return bad}'''
res=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,h,m in [('S23U dọc',384,719,True),('MacBook',1440,800,False)]:
        pg=b.new_page(viewport={'width':w,'height':h},is_mobile=m,has_touch=m);pg.goto(T);pg.wait_for_timeout(1500)
        n=pg.evaluate("document.querySelectorAll('.sc-x,.sc-y').length");r=pg.evaluate(JS);print(name,n,'chỗ cuộn',r);res+=r
print(res)
