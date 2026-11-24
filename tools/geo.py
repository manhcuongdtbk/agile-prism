# DOC: Lỗi hình học: trục thiếu mũi tên, nhánh cây lệch, chữ đè chữ, chữ tràn khối. Phải ra OK.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];
const num=s=>s.match(/-?\d+(\.\d+)?/g).map(Number);
document.querySelectorAll('svg').forEach(svg=>{const fid=(svg.closest('[id]')||{}).id||'?';if(!svg.closest('main,.card,section'))return;
 const rects=[...svg.querySelectorAll('rect')].map(r=>{const b=r.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height,el:r}}).filter(r=>r.w>8&&r.h>8);
 const paths=[...svg.querySelectorAll('path')];
 const segs=[];paths.forEach(p=>{const d=p.getAttribute('d')||'';const m=d.match(/^M\s*([\d.]+)[ ,]([\d.]+)\s*([HV])\s*([\d.]+)$/);if(m&&!p.getAttribute('marker-end'))segs.push({x:+m[1],y:+m[2],t:m[3],v:+m[4]})});
 segs.forEach(a=>{if(a.t!=='H'||Math.abs(a.v-a.x)<200)return;segs.forEach(b=>{if(b.t==='V'&&Math.abs(b.v-b.y)>100&&((Math.abs(b.x-a.x)<2&&(Math.abs(b.v-a.y)<2||Math.abs(b.y-a.y)<2))))out.push(fid+' TRỤC KHÔNG MŨI TÊN at '+a.x+','+a.y)})});
 paths.forEach(p=>{const d=p.getAttribute('d')||'';if(!/^[MVH\d\s.,-]+$/.test(d)||p.getAttribute('marker-end')||p.getAttribute('stroke-dasharray'))return;
   const cmds=d.match(/[MVH][^MVH]*/g);if(cmds.filter(c=>c[0]==='V').length>8)return;let x=0,y=0;const vs=[];cmds.forEach(c=>{const n=num(c);if(c[0]==='M'){x=n[0];y=n[1]}else if(c[0]==='V'){vs.push({x,y1:y,y2:n[0]});y=n[0]}else{x=n[0]}});
   for(let i=0;i<vs.length;i++)for(let j=i+1;j<vs.length;j++){const a=vs[i],b=vs[j];const share=[a.y1,a.y2].some(u=>[b.y1,b.y2].some(w=>Math.abs(u-w)<1));const dx=Math.abs(a.x-b.x);if(share&&dx>0.5&&dx<30)out.push(fid+' NHÁNH LỆCH '+dx.toFixed(1)+'px at x '+a.x+'/'+b.x)}
   vs.forEach(v=>{[v.y1,v.y2].forEach(yy=>{rects.forEach(r=>{if(r.w>360)return;if((Math.abs(yy-r.y)<1.5||Math.abs(yy-(r.y+r.h))<1.5)&&v.x>r.x&&v.x<r.x+r.w){const c=r.x+r.w/2;if(Math.abs(v.x-c)>1)out.push(fid+' NỐI KHÔNG VÀO TÂM khối x'+r.x.toFixed(0)+' w'+r.w.toFixed(0)+' lệch '+(v.x-c).toFixed(1))}})})})});
 rects.forEach((a,i)=>rects.slice(i+1).forEach(b=>{if(a.w>400||b.w>400||a.w<40||b.w<40)return;const ix=Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x),iy=Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y);if(ix>1&&iy>1){const inA=b.x>=a.x-1&&b.y>=a.y-1&&b.x+b.w<=a.x+a.w+1&&b.y+b.h<=a.y+a.h+1,inB=a.x>=b.x-1&&a.y>=b.y-1&&a.x+a.w<=b.x+b.w+1&&a.y+a.h<=b.y+b.h+1;if(!inA&&!inB)out.push(fid+' KHỐI ĐÈ x'+a.x.toFixed(0)+'/'+b.x.toFixed(0)+' y'+a.y.toFixed(0)+'/'+b.y.toFixed(0))}}));
 const tb=[...svg.querySelectorAll('text')].filter(t=>!t.getAttribute('transform')&&t.textContent.trim()).map(t=>({t,b:t.getBBox()}));
 tb.forEach((a,i)=>tb.slice(i+1).forEach(c=>{const ix=Math.min(a.b.x+a.b.width,c.b.x+c.b.width)-Math.max(a.b.x,c.b.x),iy=Math.min(a.b.y+a.b.height,c.b.y+c.b.height)-Math.max(a.b.y,c.b.y);if(ix>2&&iy>3)out.push(fid+' CHỮ ĐÈ CHỮ "'+a.t.textContent.slice(0,20)+'" / "'+c.t.textContent.slice(0,20)+'"')}));
 svg.querySelectorAll('text').forEach(t=>{if(t.getAttribute('transform'))return;const b=t.getBBox();if(!b.width)return;const cx=b.x+b.width/2,cy=b.y+b.height/2;
   const cont=rects.filter(r=>cx>r.x&&cx<r.x+r.w&&cy>r.y&&cy<r.y+r.h&&(r.el.getAttribute('fill')||'')!=='none').sort((a,b)=>a.w*a.h-b.w*b.h)[0];
   if(cont&&(b.x<cont.x-1||b.x+b.width>cont.x+cont.w+1))out.push(fid+' CHỮ TRÀN "'+t.textContent.slice(0,30)+'" khối x'+cont.x.toFixed(0)+' w'+cont.w.toFixed(0))});
});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    pg.goto(T);pg.wait_for_timeout(800)
    r=pg.evaluate(JS)
    for k in (1,2):
        pg.click(f'#f-vds [data-pf="{k}"]');pg.wait_for_timeout(150);r+=['(VDS '+str(k)+') '+x for x in pg.evaluate(JS) if x.startswith('f-vds')]
    print('\n'.join(sorted(set(r))) or 'OK')
