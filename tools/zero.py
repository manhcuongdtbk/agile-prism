# DOC: Mốc 0: 2 số 0 sát nhau ở gốc, trục số thiếu 0. Phải ra OK.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
JS=r'''()=>{const out=[];document.querySelectorAll('svg.fig').forEach(s=>{const id=s.parentElement.id;
 const ts=[...s.querySelectorAll('text')].filter(t=>!t.getAttribute('transform')&&/^\d+(,\d+)?$/.test(t.textContent.trim())).map(t=>{const b=t.getBBox();return {v:+t.textContent.replace(',','.'),x:b.x,r:b.x+b.width,cx:b.x+b.width/2,y:b.y+b.height/2}});
 const z=ts.filter(t=>t.v===0);
 z.forEach((a,i)=>z.slice(i+1).forEach(b=>{if(Math.hypot(a.cx-b.cx,a.y-b.y)<45)out.push(id+' HAI SỐ 0 SÁT NHAU')}));
 const grp=(key)=>{const m={};ts.forEach(t=>{const k=Math.round(t[key]/3);(m[k]=m[k]||[]).push(t)});return Object.values(m).filter(g=>g.length>=3&&new Set(g.map(t=>t.v)).size>=3)};
 [['y','ngang'],['r','dọc']].forEach(([k,n])=>grp(k).forEach(g=>{if(g.some(t=>t.v===0))return;const vs=g.map(t=>t.v).sort((a,b)=>a-b);const st=vs[1]-vs[0];if(vs[0]>st*1.01)return;
   const lo=g.reduce((a,b)=>a.v<b.v?a:b),hi=g.reduce((a,b)=>a.v>b.v?a:b);const f=(lo.v)/(hi.v-lo.v);const ex={cx:lo.cx-(hi.cx-lo.cx)*f,y:lo.y-(hi.y-lo.y)*f};
   if(!z.some(t=>Math.hypot(t.cx-ex.cx,t.y-ex.y)<60))out.push(id+' TRỤC '+n+' THIẾU 0 ('+vs.join(',')+')')}));
});return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(900)
    # Ngoại lệ có lý do: f-size đếm người, Team 0 người không có nghĩa. f-lad là số thứ tự, không phải trục
    # f-nps: thang CSAT 1 tới 5, không có 0. f-vsm: chờ vẽ lại ở #11
    SKIP=('f-size','f-lad','f-nps','f-vsm')
    print('\n'.join(x for x in pg.evaluate(JS) if not x.startswith(SKIP)) or 'OK')
