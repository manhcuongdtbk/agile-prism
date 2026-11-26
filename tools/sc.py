# DOC: Mọi chỗ cuộn được (.sc-x, .sc-y do core.js gắn) phải có bóng mép thật: không luật CSS nào đè mất nền (#116), và chỗ cuộn ngang có mask mờ mép chạy theo vị trí cuộn (nằm trên nội dung, ô có nền không che được). Chạy ở S23U dọc và MacBook. Đạt: dòng cuối [].
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''async()=>{const bad=[],fr=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));for(const e of document.querySelectorAll('.sc-x,.sc-y')){const n=e.tagName+'.'+[...e.classList].join('.')+(e.id?'#'+e.id:'');
 if(getComputedStyle(e).backgroundImage==='none'){bad.push(['mất nền bóng mép',n]);continue}
 if(e.classList.contains('sc-x')&&CSS.supports('animation-timeline','scroll()')){const c=getComputedStyle(e);if(c.maskImage==='none'||!/sc-fx/.test(c.animationName)){bad.push(['thiếu mask mờ mép',n]);continue}const v=()=>{const d=getComputedStyle(e);return [parseFloat(d.getPropertyValue('--sc-l')),parseFloat(d.getPropertyValue('--sc-r'))]};e.style.setProperty('animation','none','important');const i0=v();e.style.removeProperty('animation');if(!(i0[0]<1&&i0[1]>40))bad.push(['timeline chưa chạy thì mép phải phải mờ sẵn',n,i0.join('/')]);const o=e.scrollLeft;e.scrollLeft=0;await fr();const a=v();e.scrollLeft=e.scrollWidth;await fr();const z=v();e.scrollLeft=o;if(!(a[0]<1&&a[1]>40&&z[0]>40&&z[1]<1))bad.push(['mép mờ không chạy theo vị trí cuộn',n,a.join('/'),z.join('/')]);if(e.scrollHeight>8000)bad.push(['chỗ cuộn ngang quá cao (cả thẻ cuộn?)',n,e.scrollHeight])}}return bad}'''
res=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,h,m,rm in [('S23U dọc',384,719,True,'no-preference'),('S23U giảm chuyển động',384,719,True,'reduce'),('MacBook',1440,800,False,'no-preference')]:
        pg=b.new_page(viewport={'width':w,'height':h},is_mobile=m,has_touch=m,reduced_motion=rm);pg.goto(T);pg.wait_for_timeout(1500)
        n=pg.evaluate("document.querySelectorAll('.sc-x,.sc-y').length");r=pg.evaluate(JS);print(name,n,'chỗ cuộn,',len(r),'lỗi',r[:5]);res+=r
        if m:
            f=pg.evaluate("async()=>{const b=[...document.querySelectorAll('[data-fz]')].find(x=>x.offsetParent);if(!b)return 'không có nút Xem cả hình';b.click();await new Promise(r=>setTimeout(r,30));const o=[...document.querySelectorAll('.fz-in .sc-x')].filter(e=>!e.closest('.fz-pan')&&getComputedStyle(e).maskImage!=='none').map(e=>e.id||e.className);FZ.close();return o.length?['Xem cả hình: hình không cuộn mà còn mép mờ',o]:null}")
            if f:res.append([name,f])
        if m:
            h=pg.evaluate("async()=>{const e=document.getElementById('f-usm');HL([e]);e.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,7000));const c=getComputedStyle(e);return e.classList.contains('hit')||c.maskImage==='none'?[e.className,c.maskImage.slice(0,12)]:null}")
            if h:res.append([name,'mở hình từ Danh mục (tô sáng) xong mà mép mờ vẫn tắt',h])
            h2=pg.evaluate("async()=>{const e=document.getElementById('f-usm'),w=t=>new Promise(r=>setTimeout(r,t));HL([e]);await w(2500);HL([e]);await w(1500);return e.classList.contains('hit')}")
            if not h2:res.append([name,'tô sáng lại cùng hình trong 3.6 giây bị cắt sớm'])
        if m and n==0:res.append([name,'không có chỗ cuộn nào: core.js không gắn .sc-x?'])
print(res)
