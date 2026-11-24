# DOC: Ma trận thiết bị của chủ sản phẩm và persona (S23U, S25+, Y700 dọc và ngang, MacBook, laptop Windows): không lỗi JS, không tràn ngang; "⤢ Xem cả hình" (fz.py) chạy khi nút hiện; chạm CFD đọc đúng ngày, ô Ngày thấy được cùng hình, cả ngoài trang và trong lớp phủ. Đạt: mọi dòng sau tên thiết bị là []. Dùng: python3 tools/dev.py [tên thiết bị…]
import os as _o,re,sys;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
# Viewport CSS khi đã trừ thanh địa chỉ của Chrome. Y700 chưa có số đo thật: dùng 2 khả năng (DPR 2.75 và 2.25). Có số thật thì sửa ở đây
DEV={'S23U dọc':(384,740,3.75,1),'S23U ngang':(823,310,3.75,1),'S25+ dọc':(384,750,3.75,1),'S25+ ngang':(832,310,3.75,1),
     'Y700 dọc a':(582,860,2.75,1),'Y700 ngang a':(931,520,2.75,1),'Y700 dọc b':(711,1060,2.25,1),'Y700 ngang b':(1138,640,2.25,1),
     'MacBook':(1440,800,2,0),'Windows':(1366,650,1,0),'Windows 125%':(1229,600,1.25,0)}
FZ=re.search(r"JS=r'''(.*?)'''",open(_o.path.join(ROOT,'tools','fz.py')).read(),re.S).group(1)
MOB=re.search(r"JS=r'''(.*?)'''",open(_o.path.join(ROOT,'tools','mob2.py')).read(),re.S).group(1)
CFD=r'''async(inOv)=>{const out=[],sl=ms=>new Promise(r=>setTimeout(r,ms));const c=document.getElementById('f-cfd');
 if(inOv){const b=c.previousElementSibling;if(!b||!b.offsetParent)return ['không có nút Xem cả hình'];b.click();await sl(80)}else{c.scrollIntoView({block:'center',behavior:'instant'});await sl(80)}
 const svg=c.querySelector('svg'),rd=document.getElementById('cfdRead'),m=svg.getScreenCTM(),got=[];
 for(const d of [3,10,17]){const p=new DOMPoint(60+37*d,180).matrixTransform(m);if(!inOv&&(p.x<0||p.x>innerWidth))continue;/* ngoài trang, hình rộng cuộn ngang: điểm ngoài màn thì bỏ qua */const el=document.elementFromPoint(p.x,p.y);
   if(!el||el.id!=='cfdHit'){out.push(['ngày '+d+': chỗ chạm bị che bởi',el&&(el.id||el.className.baseVal||el.className||el.tagName)]);continue}
   el.dispatchEvent(new PointerEvent('pointerdown',{clientX:p.x,clientY:p.y,bubbles:true,pointerType:'touch'}));await sl(20);
   const n=+(rd.textContent.match(/Ngày (\d+)/)||[])[1];got.push(n)}
 if(got.some((n,i)=>!n||(i&&n-got[i-1]!==7)))out.push(['đọc sai ngày',got.join(',')]);
 if(inOv){const r=rd.getBoundingClientRect(),s=svg.getBoundingClientRect(),W=innerWidth,H=innerHeight,vis=q=>q.right>0&&q.bottom>0&&q.left<W&&q.top<H&&Math.min(q.right,W)-Math.max(q.left,0)>40&&Math.min(q.bottom,H)-Math.max(q.top,0)>40;
   if(!vis(r))out.push(['ô Ngày không thấy cùng lúc với hình']);if(!vis(s))out.push(['hình không thấy']);FZ.close()}
 return out}'''
pick=sys.argv[1:] or list(DEV)
with sync_playwright() as p:
    b=p.chromium.launch()
    for name in pick:
        W,H,dpr,touch=DEV[name];pg=b.new_page(viewport={'width':W,'height':H},device_scale_factor=dpr,is_mobile=bool(touch),has_touch=bool(touch));e=[]
        pg.on('pageerror',lambda x:e.append(str(x)));pg.goto(T);pg.wait_for_timeout(1500)
        res=[]
        sw=pg.evaluate('document.documentElement.scrollWidth');cw=pg.evaluate('document.documentElement.clientWidth')
        if sw>cw:res.append(['TRÀN NGANG',sw,cw])
        res+=pg.evaluate(MOB)[:5]
        nb=pg.evaluate("()=>[...document.querySelectorAll('.fz-b')].filter(b=>b.offsetParent).length")
        if nb:res+=pg.evaluate(FZ)[1]
        res+=pg.evaluate(CFD,False)
        if nb:res+=pg.evaluate(CFD,True)
        print(f'{name} {W}x{H} nút Xem cả hình:{nb}',res,e)
        pg.close()
