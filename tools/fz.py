# DOC: "⤢ Xem cả hình" ở 390px: mỗi hình mở lớp phủ, hình nằm gọn trong màn hình; hình có Xem lần lượt thì bấm tới, chấm bước được và đóng lại giữ đúng bước; hình có khối bấm được thì bấm được trong lớp phủ. In [] là đạt.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''async()=>{const out=[],ok=[];const W=innerWidth,H=innerHeight,sl=ms=>new Promise(r=>setTimeout(r,ms));
 const inView=r=>r.left>=-1&&r.top>=-1&&r.right<=W+1&&r.bottom<=H+1;
 for(const b of [...document.querySelectorAll('.fz-b')]){const c=b.nextElementSibling,id=c.id,par=c.parentElement;
   b.click();await sl(60);const ov=document.querySelector('.fz');if(!ov){out.push([id,'không mở']);continue}
   const s=c.querySelector(':scope>svg.fig');if(!ov.contains(c)||!s){out.push([id,'lớp phủ không chứa hình sống']);FZ.close();continue}
   const r=s.getBoundingClientRect();if(!inView(r))out.push([id,'hình tràn màn',Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom)]);
   if(r.width<W*0.6&&r.height<H*0.6)out.push([id,'hình quá nhỏ',Math.round(r.width),Math.round(r.height)]);
   const stp=ov.querySelector('.stp');let lbl='';
   if(stp){const nx=stp.querySelector('[data-a=next]');const rr=nx.getBoundingClientRect();if(!inView(rr))out.push([id,'nút tới ngoài màn']);
     nx.click();await sl(30);nx.click();await sl(30);lbl=stp.querySelector('.stp-n').textContent;if(!/Bước 2\//.test(lbl))out.push([id,'tới không chạy',lbl]);
     const d=stp.querySelectorAll('.stp-d button');d[d.length-1].click();await sl(30);lbl=stp.querySelector('.stp-n').textContent;if(!lbl.startsWith('Bước '+d.length+'/'))out.push([id,'chấm bước không chạy',lbl])}
   const blk=c.querySelector('svg [role=button]');if(blk){const snap=()=>c.innerHTML+(ov.querySelector('.fz-pan')||{}).innerHTML+[...document.querySelectorAll('.drawer:not([hidden])')].length;const before=snap();const br=blk.getBoundingClientRect();
     const el=document.elementFromPoint(br.left+br.width/2,br.top+br.height/2);if(!el||!blk.contains(el)&&el!==blk)out.push([id,'khối bị che']);
     blk.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));await sl(40);
     if(!document.querySelector('.fz'))out.push([id,'bấm khối làm đóng lớp phủ']);
     else if(snap()===before)out.push([id,'bấm khối không đổi gì']);
     const dr=document.querySelector('.drawer:not([hidden])');if(dr){const q=dr.getBoundingClientRect(),e2=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);if(!dr.contains(e2))out.push([id,'ngăn kéo nằm dưới lớp phủ']);
       document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await sl(60);if(!document.querySelector('.fz'))out.push([id,'Esc đóng cả lớp phủ thay vì ngăn kéo']);
       if(!dr.hidden)dr.querySelector('button:last-of-type')?.click()}}
   FZ.close();await sl(30);if(c.parentElement!==par)out.push([id,'đóng không trả hình về chỗ cũ']);
   if(document.querySelector('.fz,.fz-live'))out.push([id,'đóng còn sót lớp phủ']);
   if(stp&&!blk&&stp.querySelector('.stp-n').textContent!==lbl)out.push([id,'đóng mất bước đang xem']);
   ok.push(id)}
 return [ok.length,out]}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto(T);pg.wait_for_timeout(1500)
    n,out=pg.evaluate(JS);print('số hình:',n)
    for x in out:print(x)
    print(errs)
