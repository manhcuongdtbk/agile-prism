/* core.js: bộ hàm dùng chung cho mọi trang (trang chính và trang design system). Màu, chữ, hình SVG, bộ điều khiển xem lần lượt, khung chi tiết. Không chạm vào phần tử cụ thể của trang nào */
/* Bộ hàm vẽ chung: mọi hình dùng cùng cỡ chữ (11.5/12.5/13/14), cùng nét (1.5/2), cùng bo góc (6/10), cùng kiểu mũi tên */
const C={
  pri:['#d6457a','#fdedf3','#a8305e'], po:['#517cbc','#eef3fd','#2e5288'], sm:['#258b95','#e5f6f8','#005f68'],
  team:['#b46336','#fef0e9','#813c12'], good:['#61894b','#eef5e8','#3c5d27'], bad:['#c1564b','#fff0ee','#8b2f28'],
  warn:['#9f7220','#fcf2e3','#704a00'], neu:['#a3a7b0','#f3f4f7','#23252b'], ink:['#4b4f58','#ffffff','#23252b']
};
const INK='#23252b',INK2='#4b4f58',MUTE='#6e727c',FAINT='#a3a7b0',LINE='#e4e5ea',SOFT='#f3f4f7',PMID='#f2a7c1',PWORK='#f9d3e0';
const MID={po:'#c3d6fb',sm:'#a8e0e6',team:'#f8cbb4',good:'#c9deb7',bad:'#f9c8c1',warn:'#eed6b0'};
const ST={todo:'#e5e7ec',doing:MID.po,test:MID.warn,done:MID.good};
let UID=0,U=0;
function fig(id,w,h,fn,opt={}){
  const el=document.getElementById(id); if(!el) return;
  U=++UID;
  const defs=Object.keys(C).map(t=>`<marker id="m${U}${t}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,1.2L9,5L0,8.8z" fill="${C[t][0]}"/></marker>`).join('');
  /* Hình rộng (từ 700) được cuộn ngang trên điện thoại. Hình nhỏ giữ gần đúng kích thước gốc, không bị phóng to */
  const style=`style="--vbw:${w+6}px;${opt.max?`max-width:${opt.max}px;margin:0 auto`:''}"`;
  el.innerHTML=`<svg class="fig ${w>=700?'wide':'sm'}" viewBox="-3 -3 ${w+6} ${h+6}" ${style} role="img" aria-label="${opt.label||''}" font-family="Be Vietnam Pro, system-ui, sans-serif"><defs>${defs}${opt.defs||''}</defs>${fn()}</svg>`;
}
function T(x,y,s,o={}){
  const halo=o.halo?` paint-order="stroke" stroke="${o.halo===true?'#fff':o.halo}" stroke-width="4" stroke-linejoin="round"`:'';
  const tr=o.rot?` transform="rotate(${o.rot} ${x} ${y})"`:'';
  const ls=o.ls?` letter-spacing="${o.ls}"`:'';
  return `<text x="${x}" y="${y}" font-size="${o.s||13}" font-weight="${o.w||400}" fill="${o.c||INK2}" text-anchor="${o.a||'middle'}"${halo}${tr}${ls}>${s}</text>`;
}
function box(x,y,w,h,tone,title,sub,o={}){
  const [s,f,t]=C[tone];
  const fill=o.fill||f, stroke=o.stroke||s, rx=o.rx??10, sw=o.sw??1.5;
  let r=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${o.nostroke?'none':stroke}" stroke-width="${sw}"${o.dash?' stroke-dasharray="5 4"':''}/>`;
  const cx=o.ax==='start'?x+(o.px||16):x+w/2, a=o.ax||'middle';
  const lines=title?title.split('|'):[];
  const subs=sub?sub.split('|'):[];
  const ts=o.ts||14, lh=ts+4, sh=16;
  const tot=lines.length*lh+subs.length*sh-4;
  let yy=y+h/2-tot/2+ts-2;
  lines.forEach(l=>{r+=T(cx,yy,l,{s:ts,w:600,c:o.tc||t,a});yy+=lh});
  subs.forEach(l=>{r+=T(cx,yy+1,l,{s:12,c:o.sc||MUTE,a});yy+=sh});
  return o.href?`<a href="${o.href}">${r}</a>`:r;
}
function solid(x,y,w,h,tone,text,o={}){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx??6}" fill="${C[tone][0]}"/>`+T(x+w/2,y+h/2+4.5,text,{s:o.s||12.5,w:600,c:'#fff'})}
function circ(cx,cy,r,tone,title,sub,o={}){
  const [s,f,t]=C[tone];
  let g=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill||f}" stroke="${o.dash?FAINT:s}" stroke-width="${o.sw??1.5}"${o.dash?' stroke-dasharray="5 4"':''}/>`;
  if(o.num){g+=T(cx,cy-4,o.num,{s:18,w:700,c:s});g+=T(cx,cy+15,title,{s:13,w:600,c:t});if(sub)g+=T(cx,cy+31,sub,{s:13,w:600,c:t});}
  else if(title){g+=T(cx,cy+(sub?-2:5),title,{s:o.ts||13,w:600,c:o.tc||t});if(sub)g+=T(cx,cy+15,sub,{s:12,c:MUTE});}
  return o.href?`<a href="${o.href}">${g}</a>`:g;
}
function A(d,tone='ink',o={}){return `<path d="${d}" fill="none" stroke="${C[tone][0]}" stroke-width="${o.w||1.75}"${o.dash?' stroke-dasharray="5 4"':''} stroke-linecap="round" marker-end="url(#m${U}${tone})"${o.start?` marker-start="url(#m${U}${tone})"`:''}/>`}
function Ln(d,c=LINE,w=1.5,dash){return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''} stroke-linecap="round"/>`}
function R(x,y,w,h,fill,o={}){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx??6}" fill="${fill}"${o.stroke?` stroke="${o.stroke}" stroke-width="${o.sw||1.5}"`:''}${o.dash?' stroke-dasharray="5 4"':''}${o.op?` opacity="${o.op}"`:''}/>`}
function grid(x0,y0,x1,y1,ys,yf,xs,xf,o={}){
  let g='';
  ys.forEach(v=>{const y=yf(v);g+=Ln(`M${x0} ${y}H${x1}`,'#eeeff3',1)+T(x0-8,y+4,v,{s:11.5,c:FAINT,a:'end'})});
  /* 2 trục cùng bắt đầu từ 0 thì chỉ ghi 1 số 0 ở gốc (số 0 của trục dọc) */
  xs.forEach(v=>{if(v===0&&ys.includes(0)&&Math.abs(xf(0)-x0)<1&&Math.abs(yf(0)-y0)<1)return;g+=T(xf(v),y0+20,(o.xp||'')+v,{s:11.5,c:FAINT})});
  g+=A(`M${x0} ${y0}H${x1+14}`,'neu',{w:1.5})+A(`M${x0} ${y0}V${y1-14}`,'neu',{w:1.5});
  if(o.yl) g+=T(16,(y0+y1)/2,o.yl,{s:12,c:MUTE,rot:-90});
  if(o.xl) g+=T((x0+x1)/2,y0+40,o.xl,{s:12,c:MUTE});
  return g;
}
/* Tên gọi khác và tên cũ: 2 nhãn khác màu, tên cũ in nghiêng kèm nguồn */
/* Tên tài liệu trong chữ của Glossary và tooltip thành chip nguồn bấm được, giống chip trong bài.
   "(APG 2, Hình 2-3, Tên hình)" thành chip + phần chi tiết xám, như dòng nguồn trong bài. Nguồn ở cuối câu thì dấu chấm đứng trước chip. Chip được giữ chỗ trước khi gạch thuật ngữ để "Scrum" trong "Scrum Guide" không bị gạch */
/* Danh sách nhãn tài liệu dùng chung: bài (đổi chữ thành chip ở draw.js) và Glossary, tooltip (RF) */
const REFD=[[/Agile Practice Guide(?:,? Second Edition)?|APG(?: bản)? 2(?![\d.])/,'ref-apg'],[/PMBOK®? Guide(?:,? Eighth Edition)?|PMBOK 8(?![\d.])/,'ref-pmbok'],[/Scrum Guide(?: 20(?:20|17))?/,'ref-sg'],[/PMI Lexicon(?: of Project Management Terms)?(?:,? Version 5\.0)?|Lexicon 5\.0/,'ref-lex'],[/Choose Your WoW!?(?: 2)?/,'ref-wow'],[/(?:ACP )?ECO 2024/,'ref-eco'],[/(?:PMP )?ECO 2026/,'ref-peco'],[/Cockburn 2004/,'ref-cock'],[/Tuckman 1965/,'ref-tuck'],[/Thomsett 2002/,'ref-thom'],[/Clark 2020/,'ref-clark'],[/Cooper 1999/,'ref-cooper'],[/Edmondson 1999/,'ref-edm'],[/Thomas-Kilmann 1974/,'ref-tki'],[/Leas 1985/,'ref-leas'],[/Adkins 2010/,'ref-adk'],[/Poppendieck 2006/,'ref-pop'],[/PMI DA(?![a-z])/,'ref-da']];
const RFL=REFD.map(d=>'(?:'+d[0].source+')').join('|');
const RFP=new RegExp('\\s?\\(((?:'+RFL+')(?:,\\s(?:'+RFL+'))*)(?:,?\\s((?:Hình|Bảng|§|mục|The Standard)[^)]*))?\\)([.!?]?)','g'),RFB=new RegExp('(?<![\\w-])('+RFL+')(?![\\w])','g');
const RCH=l=>{const d=REFD.find(x=>new RegExp('^(?:'+x[0].source+')$').test(l));return d?`<a class="ref" href="#${d[1]}">${l}</a>`:l};
function RF(s,mk=x=>x){if(!s)return '';const keep=[],put=h=>''+(keep.push(h)-1)+'';
  s=s.replace(RFP,(m,labs,det,pu)=>pu+' '+put(labs.split(/,\s(?=[A-Z])/).map(RCH).join(' ')+(det?` <span class="srcn">${det}</span>`:'')));
  s=s.replace(RFB,l=>put(RCH(l)));
  return mk(s).replace(/(\d+)/g,(m,i)=>keep[+i])}
function NAMES(t,mk0=x=>x){const mk=x=>RF(x,mk0);const o=t.old&&t.old.length;if(!t.syn&&!o&&!t.ne)return '';return `<dl class="nm">${t.syn?`<dt>Cách gọi khác</dt><dd>${mk(t.syn)}</dd>`:''}${o?`<dt class="o">Tên cũ</dt><dd class="o">${t.old.map(x=>`<i>${mk(x[0])}</i> <small>${RF('('+x[1]+')')}</small>`).join('<br>')}</dd>`:''}${t.ne?`<dt class="ne">Không nhầm với</dt><dd>${mk(t.ne)}</dd>`:''}</dl>`}
/* Bộ lọc ít lựa chọn: hiện dạng nút liền (segmented), select gốc vẫn giữ giá trị và phát sự kiện change */
function SEGSEL(id){const sel=document.getElementById(id);if(!sel||sel.tagName!=='SELECT')return;const seg=document.createElement('div');seg.className='seg segsel';seg.setAttribute('role','radiogroup');seg.setAttribute('aria-label',sel.getAttribute('aria-label')||'');
  const draw=()=>{seg.innerHTML=[...sel.options].map(o=>`<button type="button" role="radio" data-v="${o.value}" aria-checked="${o.value===sel.value}" title="${o.text}">${o.dataset.s||o.text}</button>`).join('')};draw();
  /* Bấm chỉ đổi trạng thái nút, không vẽ lại: vẽ lại làm nút vừa bấm rời khỏi trang, khiến ngăn kéo tưởng bấm ra ngoài và tự đóng */
  const mark=()=>seg.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x.dataset.v===sel.value));
  seg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;sel.value=b.dataset.v;sel.dispatchEvent(new Event('change'))});
  sel.hidden=true;sel.after(seg);const d=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value');Object.defineProperty(sel,'value',{get(){return d.get.call(sel)},set(v){d.set.call(sel,v);mark()}});
  new MutationObserver(draw).observe(sel,{childList:true,subtree:true})}
const W=1118;
/* Đếm kết quả trong mọi lớp phủ có tìm, lọc: "12 / 230 kết quả", không lọc thì "230 kết quả" */
const CNT=(n,t)=>(n<t?n+' / ':'')+t+' kết quả';
/* Hệ điều hành, để Chú giải chỉ hiện phím tắt đúng máy đang dùng */
document.documentElement.classList.add(/Mac|iPhone|iPad/.test(navigator.platform||navigator.userAgent)?'os-mac':'os-win');
function EXT(x,y){return `<g class="svext" style="cursor:pointer" transform="translate(${x-11} ${y-11})" color="${INK2}"><circle cx="11" cy="11" r="10.5" fill="#fff" stroke="${FAINT}" stroke-width="1.5" stroke-dasharray="3 2"/><use href="#i-plus" x="4.5" y="4.5" width="13" height="13"/></g>`}
/* Khối tương tác: mũi nhọn của khung chi tiết chỉ vào phần tử đang chọn, nút xem lần lượt */
function CARET(fid,pid){requestAnimationFrame(()=>{const f=document.getElementById(fid),p=document.getElementById(pid);if(!f||!p)return;
  const s=f.querySelector('[data-sel]');if(!s||p.closest('.fz')){p.classList.remove('car');return}const a=s.getBoundingClientRect(),b=p.getBoundingClientRect();/* Phần khối thật sự thấy được: cắt theo khung cuộn ngang của hình và theo ô. Khối bị che dù 1 phần thì không vẽ đuôi (#80) */
  let sc=f;while(sc&&sc!==document.body&&!(sc.scrollWidth>sc.clientWidth+1&&/(auto|scroll)/.test(getComputedStyle(sc).overflowX)))sc=sc.parentElement;const v=sc&&sc!==document.body?sc.getBoundingClientRect():b;
  const l=Math.max(a.left,v.left,b.left),r=Math.min(a.right,v.right,b.right);if(r-l<a.width*0.98){p.classList.remove('car');return}const x=(l+r)/2-b.left;if(x<20||x>b.width-20){p.classList.remove('car');return}const cx=x;p.style.setProperty('--cx',cx+'px');p.classList.add('car')})}
const CARETS=[];window.addEventListener('resize',()=>CARETS.forEach(f=>f()));/* cuộn ngang 1 hình (phone) thì vẽ lại đuôi bong bóng theo phần khối thấy được */{let rq=0;document.addEventListener('scroll',e=>{if(e.target===document||rq)return;rq=requestAnimationFrame(()=>{rq=0;CARETS.forEach(f=>f())})},{capture:true,passive:true})}
/* Bộ điều khiển xem lần lượt dùng chung: nút chạy, lùi, tiến, chấm từng bước (bấm để nhảy), "Bước i/n", vạch chạy thời gian của bước đang chiếu */
/* Icon trong nút luôn là SVG (class .bi), không dùng ký tự (✕ ⤢ ↩ ‹ ›): ký tự nằm theo dòng chữ và mỗi máy vẽ bằng 1 font khác nên lệch tâm nút. Bộ icon chung cho cả 3 trang, chèn 1 lần ở đây.
   BI('x') trả về <svg class="bi"> dùng trong mã; HTML viết thẳng <svg class="bi"><use href="#i-x"/></svg> */
(function(){if(document.getElementById('i-x'))return;const P={x:'<path d="M4 4l8 8M12 4l-8 8"/>',expand:'<path d="M9.5 2.5h4v4M13.5 2.5L9 7M6.5 13.5h-4v-4M2.5 13.5L7 9"/>',back:'<path d="M6 3.5L2.5 7 6 10.5"/><path d="M3 7h6.5a4 4 0 0 1 0 8H8"/>',prev:'<path d="M10 3L5 8l5 5"/>',next:'<path d="M6 3l5 5-5 5"/>',pause:'<path d="M5.5 3.5v9M10.5 3.5v9"/>'};
  const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('aria-hidden','true');s.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  s.innerHTML=Object.entries(P).map(([k,d])=>`<symbol id="i-${k}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}</symbol>`).join('');
  (document.body||document.documentElement).prepend(s)})();
const BI=k=>`<svg class="bi" aria-hidden="true"><use href="#i-${k}"/></svg>`;
function STEP(id,steps,{reset,replay,ms=2800,root}={}){const b=document.getElementById(id);if(!b)return {stop(){},get on(){return false}};const n=steps.length;
  const w=document.createElement('span');w.className='stp';w.id=id;
  w.innerHTML=`<button type="button" class="btn play" data-a="play">${b.innerHTML}</button><span class="stp-nav"><button type="button" class="btn sq" data-a="prev" aria-label="Bước trước" disabled>${BI('prev')}</button><span class="stp-d">${steps.map((s,i)=>`<button type="button" data-i="${i}" aria-label="Bước ${i+1}${s.label?': '+s.label:''}" title="Bước ${i+1}${s.label?': '+s.label:''}"><i></i></button>`).join('')}</span><button type="button" class="btn sq" data-a="next" aria-label="Bước sau">${BI('next')}</button><span class="stp-n" aria-live="polite"></span></span>`;
  const host=root||b.closest('.ixc,.card');const row=b.parentElement;b.replaceWith(w);
  /* Mọi bộ điều khiển đều có Làm lại sát phải. Hàng nào đã có nút Làm lại riêng thì dùng nút đó */
  if(row&&![...row.querySelectorAll('button')].some(x=>/Làm lại/.test(x.textContent))){const rb=document.createElement('button');rb.type='button';rb.className='btn stp-rs';rb.innerHTML='<svg class="bi"><use href="#i-reset"/></svg>Làm lại';row.appendChild(rb);rb.onclick=()=>{stop();if(reset)reset();else steps[0].run();clear()}}const pb=w.querySelector('[data-a=play]'),lbl=pb.innerHTML;let cur=-1,tm=null;
  const show=()=>{w.querySelectorAll('.stp-d button').forEach((x,i)=>{x.classList.toggle('on',i===cur);x.classList.toggle('past',i<cur);const f=x.firstElementChild;f.style.animation='none';void f.offsetWidth;f.style.animation=''});
    w.querySelector('.stp-n').textContent=cur<0?'':`Bước ${cur+1}/${n}`+(steps[cur].label?': '+steps[cur].label:'');w.querySelector('[data-a=prev]').disabled=cur<=0;w.querySelector('[data-a=next]').disabled=cur>=n-1};
  const go=i=>{i=Math.max(0,Math.min(n-1,i));if(replay){reset&&reset();for(let k=0;k<=i;k++)steps[k].run()}else steps[i].run();cur=i;w.style.setProperty('--d',(steps[i].ms||ms)+'ms');show();hit()};
  /* Mỗi bước: khối đang chọn và ô kết quả loé viền 1 lần, để thấy bước vừa đổi kể cả khi trạng thái trùng trước đó (thay nhịp mờ cả hình, PO thấy giống lỗi tải lại) */
  const hit=()=>{requestAnimationFrame(()=>{const h=w.closest('.fz')||w.closest('.ixc,.card');if(!h)return;const sel=h.querySelector('[data-sel]');if(sel){/* hình cuộn ngang (phone): cuộn khung tới khối đang chọn, chỉ theo chiều ngang, không kéo cả trang */let sc=sel.parentElement;while(sc&&sc!==h&&!(sc.scrollWidth>sc.clientWidth+1&&/(auto|scroll)/.test(getComputedStyle(sc).overflowX)))sc=sc.parentElement;
      if(sc&&sc!==h){const a=sel.getBoundingClientRect(),v=sc.getBoundingClientRect();if(a.left<v.left||a.right>v.right)sc.scrollTo({left:sc.scrollLeft+(a.left+a.width/2)-(v.left+v.width/2),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}}
    h.querySelectorAll('[data-sel],.ipan,.read').forEach(e=>{e.classList.remove('pl-hit');void e.getBoundingClientRect();e.classList.add('pl-hit')});setTimeout(()=>CARETS.forEach(f=>f()),450)})};
  const stop=()=>{clearTimeout(tm);tm=null;pb.classList.remove('on');pb.innerHTML=lbl;w.classList.remove('run')};const clear=()=>{stop();cur=-1;show()};
  const tick=()=>{tm=setTimeout(()=>{if(cur>=n-1){stop();return}go(cur+1);tick()},steps[cur].ms||ms)};
  pb.addEventListener('click',()=>{if(tm){stop();return}pb.classList.add('on');pb.innerHTML=BI('pause')+'Tạm dừng';w.classList.add('run');if(cur<0||cur>=n-1){const h=w.closest('.fz')||w.closest('.ixc,.card'),snap=()=>h?[...h.querySelectorAll('svg.fig,.ipan,.read')].map(e=>e.innerHTML.replace(/ ?pl-hit/g,'').replace(/\bm\d+(?=[a-z])/g,'m')).join('|'):'';
    /* Bước 1 trùng trạng thái đang hiện (kiểu "hiện trạng" như VSM, Kanban): chỉ giữ 1,2 giây rồi sang bước 2, để không có quãng đứng yên (#80) */const a=snap();go(0);if(snap()===a){tm=setTimeout(()=>{go(1);tick()},1200);return}}else show();tick()});
  w.querySelector('[data-a=prev]').onclick=()=>{stop();go(cur-1)};w.querySelector('[data-a=next]').onclick=()=>{stop();go(cur+1)};
  w.querySelectorAll('.stp-d button').forEach(x=>x.onclick=()=>{stop();go(+x.dataset.i)});
  if(host)host.addEventListener('click',e=>{if(e.isTrusted&&!e.target.closest('.stp')&&e.target.closest('button,[role=button],[data-i],[data-k],[data-p],.sc,.kc,a,input'))clear()},true);
  return {stop,clear,get on(){return !!tm}}}
/* reset: trạng thái lúc mở trang (nút Làm lại về đây). Hình kiểu chọn khối nên mở ở trạng thái chưa chọn, để bước 1 thấy ngay thay đổi */
function PLAY(id,n,set,ms,labels,reset){return STEP(id,[...Array(n).keys()].map(i=>({run:()=>set(i),label:labels&&labels[i]})),{ms:ms||2800,reset})}
const NF=x=>(Math.round(x*10)/10).toString().replace('.',',');
const segOn=(id,fn)=>{const s=document.getElementById(id);if(!s)return;s.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;s.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x===b));fn(b.dataset.v)})};
const clickKey=(sel,fn)=>{document.addEventListener('click',e=>{const a=e.target.closest(sel);if(a)fn(a)});document.addEventListener('keydown',e=>{const a=e.target.closest&&e.target.closest(sel);if(a&&a.tagName!=='BUTTON'&&(e.key==='Enter'||e.key===' ')){e.preventDefault();fn(a)}})};
const GM='<svg class="gm" aria-hidden="true"><use href="#i-gio"/></svg>';function IP(t,vi,blocks){return (t?`<div class="ip-h"><b>${t}</b><span class="en">${vi}</span></div>`:'')+`<div class="ip-g">${blocks.map(([l,x])=>`<div><div class="lbl${/Shop Áo Gió/.test(l)?' lgio':''}">${/Shop Áo Gió/.test(l)?GM:''}${l}</div>${x}</div>`).join('')}</div>`}

/* Kết quả tương tác có nhiều nhánh: luôn liệt kê đủ mọi nhánh, tô nhánh đang khớp (cur = -1: chưa nhánh nào). Người đọc không phải thử mới biết còn nhánh nào */
/* Toạ độ con trỏ trong hệ toạ độ viewBox của 1 SVG. Đúng cả khi hình bị co giãn, cuộn, xoay (lớp phủ "⤢ Xem cả hình" xoay 90°). Mọi hình đọc vị trí chuột, ngón tay phải dùng hàm này, không tự tính từ clientX và getBoundingClientRect */
function SVGPT(svg,e){const m=svg.getScreenCTM();if(!m)return {x:0,y:0};return new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse())}
/* Tự focus ô nhập khi mở ngăn kéo: chỉ máy có chuột và bàn phím thật. Máy cảm ứng thì không, để bàn phím ảo không bật lên che nội dung */
const KBD=()=>matchMedia('(hover:hover) and (pointer:fine)').matches;function AUTOFOCUS(el){if(el&&KBD())el.focus()}
function BRANCH(items,cur){return '<ul class="brn">'+items.map(([h,d],i)=>`<li${i===cur?' class="on" aria-current="true"':''}><b>${h}</b><span>${d}</span></li>`).join('')+'</ul>'}
/* LOADING cả trang: khối #pgLoad đặt ngay đầu body của mỗi trang. PGL.done() gỡ khi trang đã vẽ xong và tương tác được.
   Bấm liên kết sang trang khác cùng site (index.html, design-system.html) thì hiện lại ngay, vì trang mới cần vài trăm ms mới vẽ.
   Quay lại bằng back của trình duyệt (bfcache) thì gỡ. Tối đa 10 giây để không kẹt nếu có lỗi */
window.PGL=(function(){const el=()=>document.getElementById('pgLoad');
  const done=()=>{const l=el();if(!l)return;l.classList.add('out');setTimeout(()=>l.hidden=true,260)};
  /* Mỗi lần hiện, thay bản đồ nhỏ bằng bản sao để chuyển động chạy lại từ đầu, không chạy tiếp chỗ đang dở */
  const show=(t)=>{const l=el();if(!l)return;if(t)l.querySelector('.pl-t').textContent=t;const m=l.querySelector('.kb-ld');if(m)m.replaceWith(m.cloneNode(true));l.hidden=false;void l.offsetWidth;l.classList.remove('out')};
  setTimeout(done,10000);window.addEventListener('pageshow',e=>{if(e.persisted)done()});
  /* Rời trang bằng bất kỳ cách nào (nút back, forward của chuột, trình duyệt, gõ địa chỉ) cũng hiện đang tải, như khi bấm liên kết. Quay lại từ bộ nhớ đệm thì pageshow gỡ ngay */
  window.addEventListener('beforeunload',()=>show());
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;const h=a.getAttribute('href');if(!/^(index|design-system|product)\.html/.test(h))return;if(a.target==='_blank'){return}show(/^design/.test(h)?'Đang mở Design system':/^product/.test(h)?'Đang mở Sản phẩm':'Đang mở Bản đồ trực quan')});
  return {done,show}})();
/* Bàn phím: mọi phần tử bấm được không phải nút hay liên kết thật (thuật ngữ dfn, khối trong hình có role=button, data-cf, data-lv) nhận Enter và Space như 1 lần bấm chuột. Phần tử đã tự xử lý phím (gọi preventDefault) thì bỏ qua */
document.addEventListener('keydown',e=>{if(e.defaultPrevented||(e.key!=='Enter'&&e.key!==' '))return;const el=e.target;if(!el||!el.matches||!el.matches('dfn[tabindex],[role=button]:not(button),[data-cf],[data-lv]'))return;if(el.closest('a[href]'))return;e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))});
/* Lối vào design system: chỉ hiện khi site có file design-system.html (Development, Staging). Production không có file nên không hiện gì */
fetch('design-system.html',{method:'HEAD'}).then(r=>{if(r.ok)document.documentElement.classList.add('has-ds')}).catch(()=>{});
/* Công thức trong hình SVG: dùng đúng .fml và .frac của bài (design system, Công thức) qua foreignObject, để phép chia trong hình cũng là phân số.
   EQ(x,yGiữa,rộng,html,{s:cỡ chữ,c:màu,a:'start'|'middle'}) */
function EQ(x,y,w,html,o={}){const h=o.h||44,al=o.a==='middle'?'center':'flex-start';return `<foreignObject x="${o.a==='middle'?x-w/2:x}" y="${y-h/2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="fo-eq" style="height:${h}px;justify-content:${al};font-size:${o.s||13}px;color:${o.c||'inherit'}">${html}</div></foreignObject>`}
function FR(a,b){return `<span class="frac"><span>${a}</span><span>${b}</span></span>`}
/* Xoay máy, đổi bề ngang cửa sổ: giữ chỗ đang đọc. Khi cuộn, nhớ phần tử đang nằm ngay dưới thanh điều hướng và khoảng cách của nó tới mép trên.
   Bề ngang đổi (xoay máy) thì trang chảy lại, nên cuộn cho phần tử đó về đúng khoảng cách cũ, lặp vài lần vì hình vẽ lại sau đó. Chỉ đổi bề cao (thanh địa chỉ ẩn hiện) thì không làm gì */
(function(){let a=null,dy=0,w=innerWidth,busy=0,raf=0;
  const navB=()=>{const n=document.querySelector('nav.top');return n?Math.max(0,n.getBoundingClientRect().bottom):0};
  const pick=()=>{raf=0;if(busy||document.querySelector('.fz')||document.documentElement.style.overflow==='hidden')return;const y=navB()+12;let e=document.elementFromPoint(innerWidth/2,y);if(!e||e===document.documentElement||e===document.body||e.closest('.drawer,nav.top,.back'))return;const s=e.closest('svg');if(s)e=s.parentElement;a=e;dy=e.getBoundingClientRect().top};
  addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(pick)},{passive:true});
  addEventListener('resize',()=>{if(innerWidth===w)return;w=innerWidth;if(!a||!document.contains(a))return;const el=a,d=dy;busy++;
    const fix=()=>{if(document.contains(el))scrollBy({top:el.getBoundingClientRect().top-d,behavior:'instant'})};
    requestAnimationFrame(fix);[120,350,700].forEach((t,i,arr)=>setTimeout(()=>{fix();if(i===arr.length-1)busy--},t))});
  setTimeout(pick,500)})();
