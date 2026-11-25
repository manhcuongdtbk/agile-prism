# DOC: (MacBook, S23U dọc, Y700 dọc) Quầng tô sáng (nhảy tới hình, bảng) phải ôm đúng khung nhìn thấy: hình có khung sát mép (≤ 12px) thì mép quầng trùng mép khung (≤ 2px) và bo góc bằng bo góc của khối ở góc (lệch ≤ 2px) (#86, #89, #92). In hình lệch; [] là đạt.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));T="file://"+_o.path.join(ROOT,"tools",".out","_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];const vis=e=>{if(e instanceof SVGElement){if(e.tagName!=='rect')return false;const f=e.getAttribute('fill'),s=e.getAttribute('stroke');return (s&&s!=='none')||(f&&f!=='none'&&f!=='transparent')}const c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&(c.borderTopWidth!=='0px'||c.backgroundColor!=='rgba(0, 0, 0, 0)'||c.boxShadow!=='none')};
 const rad=e=>e instanceof SVGElement?(+e.getAttribute('rx')||0)*(e.ownerSVGElement.getBoundingClientRect().width/(e.ownerSVGElement.viewBox.baseVal.width||1)):parseFloat(getComputedStyle(e).borderTopLeftRadius)||0;
 document.querySelectorAll('.fcap').forEach(c=>{const h=c._host;if(!h||h.tagName==='TABLE'||h.closest('table'))return;const nm=(c.textContent.match(/(Hình|Bảng) [\d.-]+/)||[c.textContent.slice(0,20)])[0];
  HLFIT(h);const hb=h.getBoundingClientRect();if(!hb.width)return;h.classList.add('hit');const mk=getComputedStyle(h).maskImage;h.classList.remove('hit');if(mk&&mk!=='none'){out.push(nm+' quầng bị mép mờ che');return}const cs=getComputedStyle(h);const g=v=>parseFloat(cs.getPropertyValue(v))||0;
  const ov=h.classList.contains('hlsc')&&document.querySelector('.hl-ov'),ob=ov&&ov.getBoundingClientRect();const hl=ov?{l:ob.left,t:ob.top,r:ob.right,b:ob.bottom,rad:parseFloat(getComputedStyle(ov).borderTopLeftRadius)}:h.classList.contains('hlin')?{l:hb.left+g('--hll'),t:hb.top+g('--hlt'),r:hb.right-g('--hlr'),b:hb.bottom-g('--hlb'),rad:g('--hlrad')}:{l:hb.left,t:hb.top,r:hb.right,b:hb.bottom,rad:parseFloat(cs.getPropertyValue('--hlrad'))||10};
  let els=vis(h)?[h]:[...h.querySelectorAll('*')].filter(e=>{const b=e.getBoundingClientRect();return b.width>8&&b.height>8&&vis(e)});if(!els.length)return;
  const B=els.map(e=>[e,e.getBoundingClientRect()]);const big=B.find(x=>x[1].width*x[1].height>=hb.width*hb.height*0.85);const U=big?[big]:B;
  /* phần nằm ngoài khung cuộn thì không thấy: cắt theo hộp của hình */
  const cb=hb.top+h.clientTop+h.clientHeight,crr=hb.left+h.clientLeft+h.clientWidth;const v={l:Math.max(hb.left,Math.min(...U.map(x=>x[1].left))),t:Math.max(hb.top,Math.min(...U.map(x=>x[1].top))),r:Math.min(crr,Math.max(...U.map(x=>x[1].right))),b:Math.min(cb,Math.max(...U.map(x=>x[1].bottom)))};
  const corner=U.filter(x=>Math.abs(x[1].left-v.l)<3&&Math.abs(x[1].top-v.t)<3).sort((a,b)=>b[1].width*b[1].height-a[1].width*a[1].height)[0];
  const d=Math.max(Math.abs(hl.l-v.l),Math.abs(hl.t-v.t),Math.abs(hl.r-v.r),Math.abs(hl.b-v.b));const cr=corner?rad(corner[0]):null;
  if(cr!==null&&d<=12&&(d>3||Math.abs(cr-hl.rad)>2))out.push(nm+' lệch '+Math.round(d)+'px, bo quầng '+Math.round(hl.rad)+' khung '+(cr===null?'-':Math.round(cr)))});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();res=[]
    OK={'Hình 1.4-1','Bảng 2.8-1','Hình 4.2-3'}# PO đã xem 25/11, thấy khớp: khối ở góc không phải khung ngoài
    for nm,w,h,m in [('MacBook',1440,900,False),('S23U',384,719,True),('Y700',640,889,True)]:
        pg=b.new_context(viewport={'width':w,'height':h},is_mobile=m,has_touch=m).new_page();pg.goto(T);pg.wait_for_timeout(1500)
        res+=[nm+' '+x for x in pg.evaluate(JS) if x.split(' lệch')[0] not in OK]
    print(res)
