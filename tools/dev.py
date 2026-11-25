# DOC: Ma trận thiết bị của chủ sản phẩm và persona (S23U, S25+, Y700 dọc và ngang, MacBook, laptop Windows): không lỗi JS, không tràn ngang; "⤢ Xem cả hình" (fz.py) chạy khi nút hiện; chạm và kéo ngón tay trên CFD đọc đúng ngày, ô Ngày thấy được cùng hình; xoay máy giữa chừng (đang mở lớp phủ, đang đọc giữa trang) không vỡ, không mất chỗ đang đọc. Đạt: mọi dòng sau tên thiết bị là []. Dùng: python3 tools/dev.py [tên thiết bị…]
import os as _o,re,sys;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
# Viewport CSS khi đã trừ thanh địa chỉ của Chrome. Y700 dọc là số đo thật (dòng "Màn hình này", 24/11), ngang suy ra từ 2560×1600 ÷ 2.5 trừ thanh trình duyệt
DEV={'S23U dọc':(384,740,3.75,1),'S23U ngang':(823,310,3.75,1),'S25+ dọc':(384,750,3.75,1),'S25+ ngang':(832,310,3.75,1),
     'Y700 dọc':(640,889,2.5,1),'Y700 ngang':(1024,560,2.5,1),
     'MacBook':(1440,800,2,0),'Windows':(1366,650,1,0),'Windows 125%':(1229,600,1.25,0)}
FZ=re.search(r"JS=r'''(.*?)'''",open(_o.path.join(ROOT,'tools','fz.py')).read(),re.S).group(1)
MOB=re.search(r"JS=r'''(.*?)'''",open(_o.path.join(ROOT,'tools','mob2.py')).read(),re.S).group(1)
CFD=r'''async(inOv)=>{const out=[],sl=ms=>new Promise(r=>setTimeout(r,ms));const c=document.getElementById('f-cfd');
 if(inOv){const b=document.querySelector(`[data-fz="${c.id}"]`);if(!b||!b.offsetParent)return ['không có nút Xem cả hình'];b.click();await sl(80)}else{c.scrollIntoView({block:'center',behavior:'instant'});await sl(80)}
 const svg=c.querySelector('svg'),rd=document.getElementById('cfdRead'),m=svg.getScreenCTM(),got=[];
 for(const d of [3,10,17]){const p=new DOMPoint(60+37*d,180).matrixTransform(m);if(!inOv&&(p.x<0||p.x>innerWidth))continue;/* ngoài trang, hình rộng cuộn ngang: điểm ngoài màn thì bỏ qua */const el=document.elementFromPoint(p.x,p.y);
   if(!el||el.id!=='cfdHit'){out.push(['ngày '+d+': chỗ chạm bị che bởi',el&&(el.id||el.className.baseVal||el.className||el.tagName)]);continue}
   el.dispatchEvent(new PointerEvent('pointerdown',{clientX:p.x,clientY:p.y,bubbles:true,pointerType:'touch'}));await sl(20);
   const n=+(rd.textContent.match(/Ngày (\d+)/)||[])[1];got.push(n)}
 if(got.some((n,i)=>!n||(i&&n-got[i-1]!==7)))out.push(['đọc sai ngày',got.join(',')]);
 if(inOv){const r=rd.getBoundingClientRect(),s=svg.getBoundingClientRect(),W=innerWidth,H=innerHeight,vis=q=>q.right>0&&q.bottom>0&&q.left<W&&q.top<H&&Math.min(q.right,W)-Math.max(q.left,0)>40&&Math.min(q.bottom,H)-Math.max(q.top,0)>40;
   if(!vis(r))out.push(['ô Ngày không thấy cùng lúc với hình']);if(!vis(s))out.push(['hình không thấy']);FZ.close()}
 return out}'''

def drag(pg):
    """Kéo ngón tay thật (CDP touch) trên CFD trong lớp phủ: ngày phải đổi theo từng bước kéo"""
    pg.evaluate("()=>{FZ.close();document.querySelector('[data-fz=f-cfd]').click()}");pg.wait_for_timeout(150)
    pts=pg.evaluate("()=>{const s=document.querySelector('#f-cfd svg'),m=s.getScreenCTM();return [3,6,9,12].map(d=>{const q=new DOMPoint(60+37*d,180).matrixTransform(m);return [q.x,q.y]})}")
    c=pg.context.new_cdp_session(pg);c.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':pts[0][0],'y':pts[0][1]}]});got=[]
    for x,y in pts[1:]:
        c.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y}]});pg.wait_for_timeout(50)
        got.append(pg.evaluate(r"+(document.getElementById('cfdRead').textContent.match(/Ngày (\d+)/)||[])[1]"))
    c.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});pg.evaluate("()=>FZ.close()")
    return [] if got==[6,9,12] else [['kéo trên CFD không đọc liên tục',got]]
ROTJS=r"""()=>{const W=innerWidth,H=innerHeight,o=[];const s=document.querySelector('.fz .fz-live>svg.fig');if(s){const r=s.getBoundingClientRect();if(r.left<-1||r.top<-1||r.right>W+1||r.bottom>H+1)o.push(['xoay khi mở lớp phủ: hình tràn màn',Math.round(r.right),Math.round(r.bottom),W,H]);if(r.width<W*.5&&r.height<H*.5)o.push(['xoay khi mở lớp phủ: hình quá nhỏ'])}return o}"""
def rot(pg,a,b):
    """Xoay máy giữa chừng: đọc ở 6.1, mở lớp phủ CFD, xoay; đóng, xoay lại: chỗ đang đọc vẫn trong màn, không tràn ngang"""
    out=[];pg.set_viewport_size({'width':a[0],'height':a[1]});pg.wait_for_timeout(200)
    pg.evaluate("()=>document.getElementById('s6-1').scrollIntoView({behavior:'instant'})");pg.wait_for_timeout(100)
    if pg.evaluate("()=>!!document.querySelector('[data-fz=f-cfd]').offsetParent"):
        pg.evaluate("()=>document.querySelector('[data-fz=f-cfd]').click()");pg.wait_for_timeout(150)
        for v in (b,a):
            pg.set_viewport_size({'width':v[0],'height':v[1]});pg.wait_for_timeout(250);out+=pg.evaluate(ROTJS)
        pg.evaluate("()=>FZ.close()")
    for v in (b,a):
        pg.set_viewport_size({'width':v[0],'height':v[1]});pg.wait_for_timeout(300)
        t=pg.evaluate("()=>{const r=document.getElementById('s6-1').getBoundingClientRect();return [r.top<innerHeight&&r.bottom>0,document.documentElement.scrollWidth-document.documentElement.clientWidth]}")
        if not t[0]:out.append(['xoay '+str(v)+': mất chỗ đang đọc (6.1)'])
        if t[1]>0:out.append(['xoay '+str(v)+': tràn ngang',t[1]])
    return out
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
        if W>760 and H>520 and nb:res.append(['màn rộng mà hiện nút Xem cả hình',nb])  # nút chỉ dành cho màn hẹp hoặc thấp
        if nb:res+=pg.evaluate(FZ)[1]
        res+=pg.evaluate(CFD,False)
        if nb:res+=pg.evaluate(CFD,True)
        if touch and nb:res+=drag(pg)
        if touch and name.endswith('dọc'):
            other=DEV[name[:-3]+'ngang'];res+=rot(pg,(W,H),other[:2])
        print(f'{name} {W}x{H} nút Xem cả hình:{nb}',res,e)
        pg.close()
