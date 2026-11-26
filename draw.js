SEGSEL('glP');SEGSEL('fgP');

/* ---------- PHẦN 1 ---------- */
fig('f-spectrum',W,150,()=>{
  const cs=[134.5,417.5,700.5,983.5];
  let g=Ln(`M276 66V31H300`,FAINT,1.5,'5 4')+Ln(`M818 31H842V66`,FAINT,1.5,'5 4');
  g+=R(300,6,518,50,'#fff',{rx:10,stroke:FAINT,dash:1});
  g+=R(314,20,14,8,PWORK,{rx:2})+R(324,32,14,8,PWORK,{rx:2})+R(342,32,8,8,PWORK,{rx:2})+R(352,32,6,8,C.good[0],{rx:2})+R(361,32,8,8,PWORK,{rx:2})+R(371,32,6,8,C.good[0],{rx:2});
  g+=T(390,27,'Hybrid, continuum of approaches',{s:14,w:600,c:INK,a:'start'})+T(390,45,'Phần giữa dải: kết hợp Predictive và Adaptive theo công việc',{s:12,c:MUTE,a:'start'});
  g+=`<path d="M4 82L20 72V92Z" fill="#fbe1ea"/><path d="M${W-4} 82L${W-20} 72V92Z" fill="#d6457a"/><rect x="20" y="76" width="${W-40}" height="12" fill="url(#gspec${U})"/>`;
  const cc=['#f7cddc','#eda3be','#e27aa0','#d6457a'];cs.forEach((x,i)=>{g+=Ln(`M${x} 92V150`,LINE,1.5)+`<circle cx="${x}" cy="82" r="9" fill="${cc[i]}" stroke="#fff" stroke-width="2.5"/>`});
  g+=T(6,114,'Predictive',{s:13,w:600,c:INK2,a:'start',halo:true})+T(W-6,114,'Adaptive',{s:13,w:600,c:C.pri[2],a:'end',halo:true});
  return g;
},{defs:`<linearGradient id="gspec${UID+1}" x1="0" x2="1"><stop offset="0" stop-color="#fbe1ea"/><stop offset="1" stop-color="#d6457a"/></linearGradient>`});
function work(x,y,w,t){return R(x,y,w,20,PWORK,{rx:5})+T(x+w/2,y+14,t,{s:11.5,w:500,c:C.pri[2]})}
function deliv(x,y,w,t){return R(x,y,w,20,C.good[0],{rx:5})+T(x+w/2,y+14,t||'',{s:11.5,w:600,c:'#fff'})}
fig('f-lc1',240,120,()=>work(6,6,68,'Phân tích')+work(46,28,68,'Thiết kế')+work(86,50,68,'Xây dựng')+work(126,72,68,'Kiểm thử')+deliv(166,94,68,'Bàn giao'));
fig('f-lc2',240,120,()=>{
  let g=work(34,6,86,'Phân tích')+work(34,40,86,'Thiết kế')+work(34,74,86,'Prototype');
  g+=Ln('M77 26V40',C.pri[0],1.5)+Ln('M77 60V74',C.pri[0],1.5);
  g+=A('M34 84H18V16H30','pri',{w:1.5,dash:1})+T(11,52,'lặp lại',{s:11.5,c:C.pri[2],rot:-90});
  g+=Ln('M120 84H136',C.pri[0],1.5)+work(136,74,66,'Xây dựng')+deliv(170,98,66,'Bàn giao');
  return g;});
fig('f-lc3',240,120,()=>{let g='';for(let k=0;k<4;k++){g+=work(2+k*60,50,40,'Phần '+(k+1))+R(44+k*60,52,14,16,C.good[0],{rx:3})}return g;});
fig('f-lc4',240,120,()=>{let g=T(120,22,'phản hồi → tái ưu tiên phần sau',{s:11.5,w:500,c:C.pri[2]});
  for(let k=0;k<4;k++){g+=work(2+k*60,66,40,'Phần '+(k+1))+R(44+k*60,68,14,16,C.good[0],{rx:3});if(k<3)g+=A(`M${51+k*60} 62C${51+k*60} 36 ${78+k*60} 36 ${82+k*60} 60`,'pri',{w:1.5})}
  return g;});
function tri(fixed){
  const P={Scope:fixed==='s'?[150,34]:[150,176],Time:fixed==='s'?[44,176]:[44,34],Cost:fixed==='s'?[256,176]:[256,34]};
  const pts=Object.values(P);
  let g=`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${LINE}" stroke-width="2"/>`;
  for(const [k,[x,y]] of Object.entries(P)){
    const isF=fixed==='s'?k==='Scope':k!=='Scope';
    g+=isF?`<circle cx="${x}" cy="${y}" r="27" fill="${C.pri[0]}"/>`+T(x,y+5,k,{s:13,w:600,c:'#fff'})
          :`<circle cx="${x}" cy="${y}" r="27" fill="#fff" stroke="${FAINT}" stroke-width="1.5" stroke-dasharray="5 4"/>`+T(x,y+5,k,{s:13,w:500,c:INK2});
  }
  return g;
}
/* 1.5 Triple Constraint: 2 tam giác trong 1 hình. Ví dụ ghi cạnh từng đỉnh cho cả 2 cách, tên theo PMBOK 8 ghi xám dưới đỉnh,
   ngoặc trên cùng nói PMBOK 8 coi cả 2 là lựa chọn của Adaptive (The Standard, Hình 4-3) */
fig('f-tri',W,350,()=>{let g='';const PB={Scope:'Scope',Time:'Schedule',Cost:'Budget'};
  /* Tên trong vòng là tên theo PMBOK 8 (Scope, Schedule, Budget). Chữ xám dưới vòng là tên trên slide (Time, Cost) */
  const node=(x,y,k,fx)=>(fx?`<circle cx="${x}" cy="${y}" r="33" fill="${C.pri[0]}"/>`+T(x,y+5,PB[k],{s:13,w:600,c:'#fff'}):`<circle cx="${x}" cy="${y}" r="33" fill="#fff" stroke="${FAINT}" stroke-width="1.5" stroke-dasharray="5 4"/>`+T(x,y+5,PB[k],{s:13,w:500,c:INK2}))+(PB[k]!==k?T(x,y+50,k,{s:11,c:FAINT}):'');
  const one=(cx,mode)=>{const top=mode==='s'?{Scope:[cx,118]}:{Time:[cx-130,118],Cost:[cx+130,118]},bot=mode==='s'?{Time:[cx-130,262],Cost:[cx+130,262]}:{Scope:[cx,262]};
    const P={...top,...bot},pts=Object.values(P);let o=`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${LINE}" stroke-width="2"/>`;
    for(const [k,[x,y]] of Object.entries(P))o+=node(x,y,k,mode==='s'?k==='Scope':k!=='Scope');return o};
  const L=290,Rr=790;
  g+=T(L,52,'Cố định Scope',{s:15,w:600,c:INK})+T(L,72,'Predictive luôn dùng. Adaptive cũng có thể dùng',{s:12,c:MUTE})+T(Rr,52,'Cố định Schedule, Budget: inverted triangle',{s:15,w:600,c:INK})+T(Rr,72,'Adaptive hay dùng nhất',{s:12,c:MUTE});
  g+=one(L,'s')+one(Rr,'tc');
  // ví dụ
  g+=T(L+44,123,'chốt toàn bộ yêu cầu từ đầu',{s:12,c:INK2,a:'start'})+T(L,330,'Schedule, Budget ước lượng từ Scope, đổi khi Scope đổi',{s:12,c:INK2});
  g+=T(Rr-174,123,'độ dài Sprint',{s:12,c:INK2,a:'end'})+T(Rr+174,123,'ngân sách của Team',{s:12,c:INK2,a:'start'})+T(Rr,330,'Scope đổi theo Value ưu tiên',{s:12,c:INK2});
  // ngoặc PMBOK 8
  return g},{label:'2 cách cố định Triple Constraint: cố định Scope, hoặc cố định Schedule và Budget'});

/* ---------- PHẦN 2 ---------- */
fig('f-size',480,92,()=>{let g=R(102,8,320,44,C.pri[1],{rx:22,stroke:C.pri[0]});
  for(let i=0;i<10;i++){const x=32+46*i,on=i>=2&&i<=8;g+=`<circle cx="${x}" cy="30" r="13" fill="${on?C.pri[0]:'#dcdee3'}"/>`;g+=T(x,84,i+1,{s:on&&(i==2||i==8)?14:12,w:on&&(i==2||i==8)?700:400,c:on&&(i==2||i==8)?C.pri[2]:FAINT})}
  g+=Ln('M12 64H466','#d5d7dd',1.5);return g;},{max:520});
fig('f-osmo',130,80,()=>`<circle cx="22" cy="44" r="10" fill="${C.pri[0]}"/><circle cx="52" cy="44" r="10" fill="${C.pri[0]}"/>`+Ln('M30 33q7-9 14 0',C.pri[0],1.5)+Ln('M68 38q5-6 0-12M76 40q9-11 0-22M68 50q5 6 0 12M76 48q9 11 0 22',FAINT,1.5)+`<circle cx="106" cy="22" r="9" fill="#cfd2d8"/><circle cx="112" cy="60" r="9" fill="#cfd2d8"/>`,{max:130});
fig('f-tuck',W,266,()=>{
  const seg=[[70,160,SOFT],[160,250,'#eceef2'],[250,340,SOFT],[340,960,C.pri[1]],[960,1080,'#eceef2']];
  let g=seg.map(([a,b,f])=>R(a,40,b-a,160,f,{rx:0})).join('');
  g+=Ln('M72 32V24H338V32',C.pri[0],1.75)+T(205,16,'đi qua nhanh nhất',{s:12.5,w:600,c:C.pri[2]});
  g+=Ln('M342 32V24H958V32',C.pri[0],1.75)+T(650,16,'duy trì lâu nhất có thể',{s:12.5,w:600,c:C.pri[2]});
  g+=A('M70 200H1096','neu',{w:1.5})+A('M70 200V34','neu',{w:1.5})+T(52,118,'Hiệu suất (định tính, không có số)',{s:12,c:MUTE,rot:-90})+T(583,262,'Thời gian',{s:12,c:MUTE});
  g+=`<path d="M72 150C100 145 130 140 160 150S220 182 240 180S300 140 340 100S380 72 420 70L930 70C980 72 1020 130 1078 175" fill="none" stroke="${C.pri[0]}" stroke-width="3"/>`;
  [['Forming','Hình thành',115],['Storming','Sóng gió',205],['Norming','Ổn định',295],['Performing','Hiệu suất cao',650],['Adjourning','Tan rã',1020]].forEach(([e,v,x],i)=>{
    g+=T(x,222,e,{s:13,w:600,c:i===3?C.pri[2]:INK})+T(x,240,v,{s:12,c:MUTE})});
  return g;});
/* 2.3 Tuckman ladder không phải lúc nào cũng đi thẳng: kẹt, quay lại, bỏ qua (PMBOK 8) */
fig('f-tuck2',W,226,()=>{const cx=[110,330,550,770,990],y=96,w=160,h=48;let g='';
  [['Forming','Hình thành'],['Storming','Sóng gió'],['Norming','Ổn định'],['Performing','Hiệu suất cao'],['Adjourning','Tan rã']].forEach(([e,v],i)=>{const p=i===3;
    g+=R(cx[i]-w/2,y,w,h,p?C.pri[1]:'#fff',{rx:8,stroke:p?C.pri[0]:LINE})+T(cx[i],y+21,e,{s:13,w:600,c:p?C.pri[2]:INK})+T(cx[i],y+38,v,{s:12,c:MUTE});
    if(i<4)g+=A(`M${cx[i]+w/2+6} ${y+h/2}H${cx[i+1]-w/2-8}`,'neu',{w:1.5})});
  g+=A(`M${cx[0]} ${y-6}C${cx[0]} 30 ${cx[2]} 30 ${cx[2]} ${y-8}`,'good',{w:2})+T(cx[1],38,'Bỏ qua 1 giai đoạn, khi Team đã từng làm cùng nhau',{s:12.5,w:600,c:C.good[2],halo:true});
  g+=A(`M${cx[1]-30} ${y+h+6}C${cx[1]-40} ${y+h+52} ${cx[1]+40} ${y+h+52} ${cx[1]+30} ${y+h+8}`,'warn',{w:2})+T(cx[1],y+h+72,'Kẹt ở 1 giai đoạn',{s:12.5,w:600,c:C.warn[2]});
  g+=A(`M${cx[3]-20} ${y+h+6}C${cx[3]-40} ${y+h+58} ${cx[2]+40} ${y+h+58} ${cx[2]+20} ${y+h+8}`,'bad',{w:2})+T((cx[2]+cx[3])/2,y+h+72,'Quay lại giai đoạn trước',{s:12.5,w:600,c:C.bad[2]});
  return g},{label:'Tuckman ladder: kẹt, quay lại, bỏ qua giai đoạn'});
function person(x,y,c=C.pri[0],r=10){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`}
function collab(on,label,sub,cnt){const xs=[40,90,140,190,240,290];let g='';
  const tx=165,ty=18,tw=150,th=sub?42:32;
  g+=box(tx-tw/2,ty,tw,th,'pri',label,sub||'',{ts:12.5,fill:'#fff',sc:C.pri[2]});
  xs.forEach((x,i)=>{const a=on.includes(i);
    if(a)g+=Ln(`M${x} 92L${tx+(x-tx)*.35} ${ty+th}`,C.pri[0],1.75);
    else g+=R(x-11,58,22,16,SOFT,{rx:3,stroke:'#d5d7dd',sw:1});
    g+=person(x,100,a?C.pri[0]:'#dcdee3',10)});
  g+=T(165,128,cnt,{s:12,w:600,c:C.pri[2]});return g}
fig('f-pair',330,136,()=>collab([2,3],'1 tác vụ','','2 người cùng làm'),{max:330});
fig('f-swarm',330,136,()=>collab([1,2,3,4],'1 việc ưu tiên','hoặc đang bị kẹt','nhiều người tạm gác việc riêng'),{max:330});
fig('f-mob',330,136,()=>collab([0,1,2,3,4,5],'1 tác vụ phức tạp','','cả Team cùng làm'),{max:330});
fig('f-r1',300,140,()=>{let g='';['To do','Doing','Done'].forEach((t,i)=>{const x=16+i*92;g+=R(x,12,84,118,SOFT,{rx:8})+T(x+42,32,t,{s:12,w:600,c:INK2});
  const n=[3,2,3][i];for(let k=0;k<n;k++)g+=R(x+8,42+k*24,68,18,'#fff',{rx:4,stroke:LINE,sw:1})});return g;});
fig('f-r2',300,140,()=>Ln('M30 14V120H284','#d5d7dd',1.5)+Ln('M30 20L280 120',FAINT,1.5,'5 4')+`<polyline points="30,20 62,26 94,42 126,45 158,70 190,82 222,92 254,106 280,120" fill="none" stroke="${C.pri[0]}" stroke-width="2.5"/>`);
fig('f-r3',300,140,()=>{const m=[[MID.warn,MID.team,MID.bad],[MID.good,MID.warn,MID.team],[MID.good,MID.good,MID.warn]];let g='';
  m.forEach((r,i)=>r.forEach((c,j)=>g+=R(96+j*38,14+i*38,36,36,c,{rx:4})));return g;});
/* ---------- PHẦN 4 ---------- */
fig('f-cycle',W,600,()=>{
  const cx=790,cy=290,Rr=200,P=a=>[cx+Rr*Math.cos(a*Math.PI/180),cy+Rr*Math.sin(a*Math.PI/180)];
  let g=`<circle cx="${cx}" cy="${cy}" r="${Rr}" fill="none" stroke="#fbe1ea" stroke-width="16"/>`;
  const ang=[-90,-30,30,90,150,210];
  for(let i=0;i<6;i++){const a1=ang[i]+15,a2=ang[(i+1)%6]+(i==5?360:0)-15,[x1,y1]=P(a1),[x2,y2]=P(a2);g+=A(`M${x1} ${y1}A${Rr} ${Rr} 0 0 1 ${x2} ${y2}`,'pri',{w:2})}
  const N=[['3','User Story'],['4','DoR / DoD'],['5','Sprint','Planning'],['6','Daily','Scrum'],['7','Sprint','Review'],['8','Retro-','spective']];
  N.forEach(([n,t,t2],i)=>{const [x,y]=P(ang[i]);g+=circ(x,y,52,'pri',t,t2,{num:'4.'+n,sw:2,href:'#s4-'+n})});
  // ngoài vòng: 4.1 và 4.2, cùng kiểu chữ với các bước trong vòng
  const node=(x,y,w,h,n,t1,t2,sub,href)=>`<a href="${href}">`+R(x,y,w,h,'#fff',{rx:14,stroke:C.pri[0],sw:2})+T(x+w/2,y+30,n,{s:18,w:700,c:C.pri[0]})+T(x+w/2,y+50,t1,{s:13,w:600,c:C.pri[2]})+(t2?T(x+w/2,y+66,t2,{s:13,w:600,c:C.pri[2]}):'')+(sub?T(x+w/2,y+h-14,sub,{s:12,c:MUTE}):'')+`</a>`;
  g+=node(150,30,190,118,'4.1','Project &','Team Charter','1 lần, khi bắt đầu','#s4-1');
  g+=A('M245 150V214','ink');
  g+=node(130,218,230,140,'4.2','Backlog &','Product Roadmap','↻ cập nhật liên tục','#s4-2');
  // 4.2 -> 4.3 (đi phía trên vòng)
  const [ux,uy]=P(-90);g+=A(`M362 250C470 200 520 ${uy} ${ux-56} ${uy}`,'ink',{dash:1})+T(488,226,'tinh chỉnh, chia nhỏ',{s:12.5,c:INK2,halo:true});
  // 4.2 -> 4.5 (đi vòng phía dưới)
  const [px,py]=P(30);g+=A(`M245 360V570H930V434`,'ink',{dash:1})+T(700,562,'chọn vào Sprint',{s:12.5,c:INK2,halo:true});
  // 4.7 -> 4.2 phản hồi
  const [rx,ry]=P(150);g+=A(`M${rx-54} ${ry}C${rx-120} ${ry} 420 330 364 318`,'ink',{dash:1})+T(452,404,'phản hồi cập nhật',{s:12.5,c:INK2,halo:true});
  g+=T(930,40,'SPRINT',{s:15,w:700,c:C.pri[0],a:'start'})+T(930,60,'↻ lặp lại, thường 2 tuần',{s:12.5,c:MUTE,a:'start'});
  g+=R(20,500,16,12,'#fff',{rx:3,stroke:C.pri[0]})+T(44,510,'ngoài vòng Sprint',{s:12,c:MUTE,a:'start'});
  const [rvx,rvy]=P(150);g+=A(`M${rvx-30} ${rvy+44}L486 470`,'good',{w:1.75});
  g+=box(336,452,150,48,'good','Release','sau 1 hoặc nhiều Sprint',{ts:13.5});
  g+=A('M411 502V512','good',{w:1.5})+box(336,514,150,44,'neu','Kết thúc Project','khi đạt Objectives',{ts:13,nostroke:true});
  g+=EXT(500,478)+EXT(500,536);
  return g;});
fig('f-backlog',300,124,()=>{const f=[C.pri[0],'#e27199','#ec9db8','#f6cadb'];let g='';
  f.forEach((c,i)=>g+=R(10,6+i*28,230,24,c,{rx:5}));g+=T(22,22,'Value cao nhất',{s:12,w:600,c:'#fff',a:'start'})+T(22,106,'Value thấp',{s:12,w:600,c:C.pri[2],a:'start'});
  g+=A('M270 10V112','ink')+T(288,61,'Thứ tự làm',{s:11.5,c:MUTE,rot:90});return g;},{max:300});
fig('f-roadmap',320,180,()=>{let g=A('M10 62H304','ink');const xs=[50,122,196,268],op=[1,1,.55,.3];
  xs.forEach((x,i)=>{g+=`<circle cx="${x}" cy="62" r="9" fill="${C.pri[0]}" opacity="${op[i]}"/>`;g+=T(x,i%2?92:42,'Feature '+'ABCD'[i],{s:11.5,w:500,c:INK2})});
  xs.forEach((x,i)=>g+=Ln(`M${x} 70V76`,FAINT,1.5)+T(x,114,'Quý '+(i+1),{s:11.5,c:FAINT}));
  [[30,142,'Release 1'],[176,288,'Release 2']].forEach(([a,b,t])=>g+=Ln(`M${a} 126V132H${b}V126`,C.pri[0],1.5)+T((a+b)/2,148,t,{s:11.5,w:600,c:C.pri[2]}));g+=T(157,174,'Thời gian',{s:12,c:MUTE});return g;},{max:320});
function cursor(x,y){return `<path d="M${x} ${y}l0 13 3.2-3.2 3 6 2.2-1-3-6 4.6 0z" fill="${INK}" stroke="#fff" stroke-width=".8"/>`}
fig('f-proto',320,130,()=>{let g='';[6,120,234].forEach(x=>g+=R(x,10,80,110,'#fff',{rx:9,stroke:C.pri[0]}));
  for(let k=0;k<4;k++)g+=R(14,22+k*22,64,14,k==1?PMID:C.pri[1],{rx:3});
  g+=R(128,20,64,42,C.pri[1],{rx:4})+R(128,68,64,6,LINE,{rx:3})+R(128,80,48,6,LINE,{rx:3})+R(128,96,64,14,C.pri[0],{rx:7});
  for(let k=0;k<3;k++)g+=R(242,22+k*16,64,10,C.pri[1],{rx:3});g+=R(242,96,64,14,C.good[0],{rx:7});
  g+=A('M78 51C98 51 98 38 118 38','pri',{w:1.5,dash:1})+A('M192 103C212 103 212 72 232 72','pri',{w:1.5,dash:1});
  g+=cursor(70,56)+cursor(182,106);return g;},{max:320});
fig('f-split',W,420,()=>{const L0=150;
  // tầng: Product 0..48, Epic 80..148, Feature 202..270, User Story 324..404
  let g=T(0,14,'THỜI LƯỢNG THƯỜNG GẶP',{s:11,w:600,c:MUTE,a:'start',ls:.5})+A(`M${L0-14} 26V412`,'neu',{w:1.5});
  [[34,'Lâu dài,'],[50,'theo Product'],[110,'Nhiều tháng,'],[128,'nhiều Sprint'],[232,'Vài Sprint, gọn'],[250,'trong 1 Release'],[358,'Vừa 1 Sprint,'],[376,'thường vài ngày']].forEach(([y,t],i)=>g+=T(0,y,t,{s:12.5,w:i%2?400:600,c:i%2?MUTE:INK,a:'start'}));
  // Product: mọi Epic, Feature, User Story nằm trong Product Backlog của 1 Product
  g+=R(509,0,300,48,C.pri[1],{rx:10,stroke:C.pri[0]})+T(659,19,'PRODUCT BACKLOG',{s:11,w:600,c:C.pri[0],ls:1})+T(659,38,'Website Gió',{s:14,w:600,c:C.pri[2]})+EXT(822,24);
  g+=Ln('M659 48V80M280 64H659M280 64V80',FAINT,1.5);
  g+=R(509,80,300,68,SOFT,{rx:10,stroke:INK2})+T(659,98,'EPIC',{s:11,w:600,c:INK2,ls:1})+T(659,120,'Mua sắm trực tuyến',{s:15,w:600,c:INK})+T(659,139,'Khách mua hàng trên web từ đầu đến cuối',{s:12,c:MUTE});
  [[170,'Quản lý tài khoản']].forEach(([x,t])=>g+=`<g opacity=".45">`+R(x,80,220,68,SOFT,{rx:10,stroke:INK2})+T(x+110,98,'EPIC',{s:11,w:600,c:INK2,ls:1})+T(x+110,124,t,{s:14,w:600,c:INK})+`</g>`);
  // Epic chia thành Feature
  g+=Ln('M659 148V184M323 184H995M323 184V202M659 184V202M995 184V202',FAINT,1.5);
  g+=T(670,170,'✂ Product Owner chia, cùng Customer',{s:12.5,w:500,c:INK2,a:'start'});
  [[228,'Giỏ hàng'],[900,'Tìm kiếm sản phẩm']].forEach(([x,t])=>g+=`<g opacity=".55">`+R(x,202,190,68,'#fff',{rx:10,stroke:C.pri[0]})+T(x+95,220,'FEATURE',{s:11,w:600,c:C.pri[0],ls:1})+T(x+95,246,t,{s:14,w:600,c:C.pri[2]})+`</g>`);
  g+=R(509,202,300,68,C.pri[1],{rx:10,stroke:C.pri[0]})+T(659,220,'FEATURE',{s:11,w:600,c:C.pri[0],ls:1})+T(659,242,'Thanh toán trực tuyến',{s:15,w:600,c:C.pri[2]})+T(659,261,'Khách trả tiền ngay trên web',{s:12,c:C.pri[2]});
  // Feature chia thành User Story
  const cw=(W-L0-36)/4,xs=[0,1,2,3].map(i=>L0+i*(cw+12));
  g+=Ln(`M659 270V306M${xs[0]+cw/2} 306H${xs[3]+cw/2}`+xs.map(x=>`M${x+cw/2} 306V324`).join(''),C.pri[0],2);
  g+=T(670,292,'✂ Team chia, cùng Product Owner',{s:12.5,w:500,c:C.pri[2],a:'start'});
  ['Thêm thẻ ngân hàng','Thanh toán bằng thẻ đã lưu','Xem lịch sử giao dịch','Yêu cầu hoàn tiền'].forEach((t,i)=>{const x=xs[i],hl=i===1;
    const x0=x+.75,x1=x+cw-.75;g+=R(x0,324,cw-1.5,80,hl?C.pri[1]:'#fff',{rx:10})+`<path d="M${x0} 334A10 10 0 0 1 ${x0+10} 324H${x1-10}A10 10 0 0 1 ${x1} 334Z" fill="${C.pri[0]}"/>`+`<rect x="${x0}" y="324" width="${cw-1.5}" height="80" rx="10" fill="none" stroke="${hl?C.pri[0]:LINE}" stroke-width="1.5"/>`;
    g+=T(x+14,352,hl?'USER STORY (VÍ DỤ BÊN DƯỚI)':'USER STORY',{s:11,w:600,c:C.pri[0],a:'start',ls:.5})+T(x+14,382,t,{s:13.5,w:hl?600:500,c:INK,a:'start'})});
  return g;});
fig('f-c1',300,84,()=>R(100,8,100,64,'#fff',{rx:6,stroke:C.pri[0],sw:2})+R(100,8,100,7,C.pri[0],{rx:3})+Ln('M114 34H186',PMID,5)+Ln('M114 50H168',PMID,5),{max:300});
fig('f-c2',300,84,()=>`<path d="M84 10h76a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H108l-10 9v-9H84a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z" fill="#fff" stroke="${C.pri[0]}" stroke-width="2"/><path d="M218 32h-70a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h50l10 9v-9h10a6 6 0 0 0 6-6V38a6 6 0 0 0-6-6z" fill="${C.pri[0]}"/>`,{max:300});
fig('f-c3',300,84,()=>{let g='';for(let k=0;k<3;k++){const y=10+k*22;g+=R(104,y,15,15,'#fff',{rx:3,stroke:C.pri[0],sw:2})+Ln(`M107.5 ${y+7.5}l3 3 5.5-6`,C.pri[0],2)+Ln(`M130 ${y+7.5}H${[200,186,194][k]}`,PMID,5)}return g;},{max:300});
fig('f-acdod',1080,190,()=>{
  let g=R(0,30,232,130,'#fff',{rx:12,stroke:C.pri[0]})+`<path d="M0.75 42A12 12 0 0 1 12.75 30H219.25A12 12 0 0 1 231.25 42V36H0.75Z" fill="${C.pri[0]}"/>`;
  g+=T(18,64,'User Story',{s:15,w:600,c:INK,a:'start'})+T(18,92,'AC riêng của User Story này',{s:12.5,w:600,c:C.po[0],a:'start'})+T(18,114,'☐ điều kiện 1',{s:12.5,c:INK2,a:'start'})+T(18,134,'☐ điều kiện 2',{s:12.5,c:INK2,a:'start'});
  g+=A('M236 95H264','ink')+box(268,56,160,78,'pri','Cổng DoR','có "AC đã rõ" chưa?');
  g+=A('M432 95H460','ink')+box(464,56,160,78,'neu','Phân tích,|phát triển','',{nostroke:true});
  g+=A('M628 95H656','ink')+R(660,10,262,170,'#fff',{rx:12,stroke:INK2,dash:1})+T(791,36,'Điều kiện để Done: đạt cả 2',{s:13,w:600,c:INK});
  g+=box(678,50,226,48,'po','✓ AC của chính User Story đó','',{ts:13.5,ax:'start'})+T(791,116,'+',{s:16,w:700,c:INK2})+box(678,124,226,44,'team','✓ DoD chung của Team','',{ts:13.5,ax:'start'});
  g+=A('M926 95H954','ink')+box(958,56,122,78,'good','Done','',{ts:15});
  return g;});
fig('f-amigos',380,250,()=>{let g='';
  [['po',190,96],['team',146,158],['tester',234,158]].forEach(([t,x,y])=>{const c=t==='tester'?INK2:C[t][0];g+=`<circle cx="${x}" cy="${y}" r="64" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.75"/>`});
  g+=T(190,20,'Product Owner',{s:14,w:600,c:C.po[0]})+T(70,240,'Developer',{s:14,w:600,c:C.team[2]})+T(310,240,'Tester',{s:14,w:600,c:INK});
  g+=`<circle cx="190" cy="138" r="38" fill="#fff" stroke="${INK2}" stroke-width="1.5"/>`+T(190,135,'Backlog',{s:11.5,w:600,c:INK})+T(190,149,'Refinement',{s:11.5,w:600,c:INK});
  return g;},{max:380});
fig('f-thr',532,228,()=>{const v=[4,6,5,5,7,5],B=176,Hh=17,Y=n=>B-n*Hh;let g=grid(46,B,512,40,[0,2,4,6,8],Y,[],()=>0,{yl:'Số User Story hoàn thành'});const avg=v.reduce((a,b)=>a+b)/6;
  g+=Ln(`M46 ${Y(avg)}H512`,INK,1.75,'6 4');
  v.forEach((n,i)=>{const x=62+i*74;for(let k=0;k<n;k++){const y=B-(k+1)*Hh;g+=R(x,y+1,56,14,'#fff',{rx:3,stroke:C.pri[0],sw:1.5})+R(x,y+1,56,4,C.pri[0],{rx:2})}
    g+=T(x+28,B+20,`Tuần ${i+1}`,{s:11.5,c:FAINT})});
  g+=T(279,B+40,'Tuần',{s:12,c:MUTE})+Ln('M46 14H68',INK,1.75,'6 4')+T(76,18,'Throughput ≈ 5,3 User Story/tuần (trung bình 6 tuần)',{s:13,w:600,c:INK,a:'start'});return g;});
fig('f-standup',W,150,()=>{let g=Ln('M60 82H1060','#d5d7dd',2);
  g+=R(70,64,470,36,C.good[1],{rx:18})+A('M80 82H528','good',{w:3});
  g+=R(616,64,446,36,C.pri[1],{rx:18})+A('M660 82H1050','pri',{w:2.5,dash:1});
  g+=`<circle cx="70" cy="82" r="9" fill="${INK}"/><circle cx="1066" cy="82" r="9" fill="${INK}"/><circle cx="566" cy="82" r="10" fill="${C.bad[0]}"/>`;
  g+=R(584,58,48,48,C.bad[0],{rx:8})+Ln('M597 71L619 93M619 71L597 93','#fff',4.5);
  g+=`<circle cx="300" cy="82" r="15" fill="${C.good[0]}"/>`+T(300,88,'1',{s:15,w:700,c:'#fff'});
  g+=`<circle cx="860" cy="82" r="15" fill="${C.pri[0]}"/>`+T(860,88,'2',{s:15,w:700,c:'#fff'});
  g+=`<circle cx="646" cy="54" r="13" fill="#fff" stroke="${C.bad[0]}" stroke-width="2"/>`+T(646,59,'3',{s:13,w:700,c:C.bad[0]});
  g+=T(70,42,'Daily Scrum trước',{s:13,w:600,c:INK})+T(566,34,'Daily Scrum hôm nay',{s:13,w:600,c:C.bad[0]})+T(1066,42,'Daily Scrum tiếp theo',{s:13,w:600,c:INK,a:'end'});
  return g;});
fig('f-review',W,230,()=>{let g='';
  g+=box(0,70,180,74,'team','Developers','xây dựng trong Sprint');
  g+=A('M184 107H236','ink')+box(240,70,200,74,'pri','Increment','phần Product dùng được|sau mỗi Sprint',{fill:'#fff'});
  g+=A('M444 107H496','ink')+box(500,70,170,74,'pri','Demo','cuối chu kỳ');
  g+=A('M674 107H726','ink')+box(730,58,200,98,'neu','Customer, Stakeholder','trực tiếp, hoặc|thông qua Product Owner',{nostroke:true});
  g+=A('M934 92L986 64','ink')+box(990,38,128,46,'good','✓ Nghiệm thu','',{ts:13.5});
  g+=A('M934 122L986 150','ink')+box(990,128,128,46,'pri','↩ Phản hồi','',{ts:13.5,fill:'#fff'});
  g+=A('M1054 176V206H90V148','pri',{dash:1})+T(560,200,'phản hồi quay về Team, giữ Team đi đúng hướng',{s:12.5,w:500,c:C.pri[2],halo:true});
  return g;});
fig('f-retro',W,210,()=>{let g=T(0,22,'TEAM NHÌN LẠI',{s:11.5,w:600,c:MUTE,a:'start',ls:.8});
  ['Quy trình','Công cụ','Cách tương tác'].forEach((t,i)=>g+=box(0,36+i*52,190,44,'neu',t,'',{nostroke:true,ts:13.5}));
  g+=Ln('M202 40Q220 40 220 60V96Q220 110 236 110Q220 110 220 124V160Q220 180 202 180',FAINT,1.5);
  g+=A('M240 110H262V68H300','ink')+A('M262 110V152H300','ink');
  g+=box(304,40,300,56,'good','✓ Những điểm làm tốt','',{ts:14.5})+box(304,124,300,56,'warn','✕ Những điểm chưa tốt','',{ts:14.5});
  g+=A('M608 68C700 68 700 100 776 104','ink')+A('M608 152C700 152 700 120 776 116','ink');
  g+=box(780,70,338,76,'pri','→ Hành động cải tiến cụ thể','thống nhất cho chu kỳ tiếp theo',{ts:15,sw:2});
  return g;});

/* ---------- PHẦN 5 ---------- */
fig('f-bd',534,264,()=>{const X=d=>56+d*45,Y=v=>214-v*1.45;let g=grid(56,214,506,40,[0,40,80,120],Y,[0,2,4,6,8,10],X,{yl:'Việc còn lại',xl:'Ngày trong Sprint'});
  g+=Ln(`M${X(0)} ${Y(115)}L${X(10)} ${Y(0)}`,FAINT,1.75,'6 4');
  const a=[115,112,101,99,77,66,62,41,33,16,0];g+=`<polyline points="${a.map((v,i)=>X(i)+','+Y(v)).join(' ')}" fill="none" stroke="${C.pri[0]}" stroke-width="2.5" stroke-linejoin="round"/>`;
  g+=Ln('M60 12H82',C.pri[0],2.5)+T(88,16,'Việc còn lại',{s:12,c:INK2,a:'start'})+Ln('M176 12H198',FAINT,1.75,'6 4')+T(204,16,'Lý tưởng',{s:12,c:INK2,a:'start'});return g;});
fig('f-vel',534,272,()=>{const Y=v=>214-v*5.6,v=[18,22,19,21,20];let g=grid(56,214,506,46,[0,10,20,30],Y,[],()=>0,{yl:'Story Points hoàn thành'});
  v.forEach((n,i)=>{const x=82+i*86;g+=R(x,Y(n),52,214-Y(n),C.pri[0],{rx:5})+T(x+26,204,n,{s:12.5,w:700,c:'#fff'})+T(x+26,236,'Sprint '+(i+1),{s:11.5,c:FAINT})});
  g+=T(281,262,'Sprint',{s:12,c:MUTE})+Ln(`M60 ${Y(20)}H506`,INK,1.75,'6 4')+Ln('M60 12H82',INK,1.75,'6 4')+T(88,16,'Velocity ≈ 20 điểm/Sprint (trung bình 5 Sprint)',{s:13,w:600,c:INK,a:'start'});return g;});
fig('f-lead',W,150,()=>{let g=Ln('M60 72H1060','#d5d7dd',2);
  g+=R(70,16,980,26,INK,{rx:13})+T(560,34,'LEAD TIME',{s:12.5,w:600,c:'#fff',ls:.8});
  g+=R(500,112,550,26,C.pri[0],{rx:13})+T(775,130,'CYCLE TIME',{s:12.5,w:600,c:'#fff',ls:.8});
  g+=`<circle cx="70" cy="72" r="9" fill="${INK}"/><circle cx="500" cy="72" r="9" fill="${C.pri[0]}"/><circle cx="1050" cy="72" r="9" fill="${C.good[0]}"/>`;
  g+=T(70,98,'Customer yêu cầu',{s:13,w:600,c:INK})+T(500,98,'Bắt đầu làm',{s:13,w:600,c:INK})+T(1050,98,'Bàn giao hoàn tất',{s:13,w:600,c:INK});return g;});
/* 5.4 Đa nhiệm và tập trung. Dạng làn (swimlane): mỗi hàng là 1 User Story. Thời gian mất khi chuyển việc vẽ sọc ngay trước khúc làm,
   trên hàng của việc vừa chuyển sang, vì đó là lúc Huy phải nhớ lại việc này đang dở ở đâu. Không có trục Oy vì các hàng không có thứ tự,
   tên hàng ghi bên trái. Ox là ngày làm việc. Đa nhiệm: các khúc làm dài ngắn khác nhau, mỗi lần chuyển mất 0,3 tới 0,6 ngày, tổng 4/13 ngày = 31%,
   nằm trong khoảng 20 tới 40% của APG 2 §4.7.1 */
fig('f-cap',W,430,()=>{const Uu=72,X0=150,LH=36,col={A:C.pri[0],B:'#e8799f',C:PMID},NM={A:'Giỏ hàng',B:'Tìm kiếm',C:'Lọc theo màu'};
  const f=n=>String(Math.round(n*10)/10).replace('.',',');
  function lanes(title,seq,sw,y0,note,nc){let o=T(X0,y0-12,title,{s:14,w:600,c:INK,a:'start'})+T(W-12,y0-12,note,{s:12.5,w:600,c:nc,a:'end'});
    const Ly={A:y0,B:y0+LH,C:y0+2*LH};
    for(const k in Ly)o+=T(X0-10,Ly[k]+19,NM[k],{s:13,w:500,c:INK2,a:'end'})+R(X0,Ly[k]+1,W-12-X0,26,SOFT,{rx:5});
    let t=0,prev=null,fin={},n=0;
    seq.forEach(([k,d])=>{if(prev&&prev!==k){const c=sw[n++];if(c>0)o+=R(X0+t*Uu+1,Ly[k]+4,c*Uu-1,20,`url(#hatch${U})`,{rx:4});t+=c}
      o+=R(X0+t*Uu+1,Ly[k]+4,d*Uu-2,20,col[k],{rx:5});t+=d;fin[k]=t;prev=k});
    for(const k in fin){const cx=X0+fin[k]*Uu-12;o+=`<circle cx="${cx}" cy="${Ly[k]+14}" r="8" fill="${C.good[0]}" stroke="#fff" stroke-width="1.5"/>`+Ln(`M${cx-3.5} ${Ly[k]+14}l2.5 2.5 4.5-5`,'#fff',1.8)}
    const ya=y0+3*LH+6;o+=A(`M${X0} ${ya}H${W-8}`,'neu',{w:1.5})+[...Array(14).keys()].map(i=>Ln(`M${X0+i*Uu} ${ya}V${ya+5}`,'#d5d7dd',1.5)+T(X0+i*Uu,ya+20,i,{s:11.5,c:FAINT})).join('')+T((X0+W-12)/2,ya+40,'Ngày làm việc',{s:12,c:MUTE});
    return o}
  const SW=[.3,.5,.4,.6,.3,.5,.4,.6,.4],tot=SW.reduce((a,b)=>a+b,0);
  return lanes('Đa nhiệm: Huy chuyển qua lại giữa 3 User Story',[['A',1.2],['C',.6],['B',1],['C',.4],['A',.5],['B',1.4],['A',1.3],['C',1.2],['B',.6],['C',.8]],SW,34,
      `Chuyển việc ${SW.length} lần, mất ${f(tot)} ngày, ${Math.round(tot/(9+tot)*100)}% thời gian`,C.bad[2])
    +lanes('Tập trung: Huy làm xong từng User Story rồi mới sang cái tiếp theo',[['A',3],['B',3],['C',3]],[0,0],246,`Không mất ngày nào, xong cả 3 sớm hơn ${f(tot)} ngày`,C.good[2]);
},{defs:`<pattern id="hatch${UID+1}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="${C.bad[1]}"/><line x1="0" y1="0" x2="0" y2="6" stroke="${C.bad[0]}" stroke-width="1.6"/></pattern>`});

/* 5.5 Risk, Issue, Impediment. Issue là việc đã xảy ra, có thể từ 1 Risk đã biết hoặc không ai lường trước.
   Impediment là Issue đang chặn Team làm việc, nên nằm trong khung Issue. Ví dụ: Risk 1 của Bảng 5.5-1 xảy ra ở Sprint 1 (4.6) */
/* ---------- 6.3: NPS và CSAT, 2 thang khảo sát đặt cạnh nhau, số liệu khảo sát sau Release 1 của Shop Áo Gió ---------- */
fig('f-nps',W,316,()=>{let g='';const G='#4a3f94',GS='#f3f1fc';
  const head=(x,ti,vi,q)=>T(x,24,ti,{s:16,w:600,c:INK,a:'start'})+T(x+(ti.length>3?58:46),24,vi,{s:12.5,c:MUTE,a:'start'})+T(x,50,q,{s:12.5,c:INK2,a:'start'});
  /* NPS: thang 0 tới 10, 3 cụm */
  const nx=0,cw=46;g+=head(nx,'NPS','Net Promoter Score','“Bạn sẵn lòng giới thiệu Website Gió cho bạn bè ở mức nào?”');
  const ncol=k=>k<=6?C.bad:k<=8?C.neu:C.good;
  for(let k=0;k<=10;k++)g+=R(nx+k*cw,66,cw-4,36,ncol(k)[1],{rx:6,stroke:ncol(k)[0],sw:1})+T(nx+k*cw+(cw-4)/2,89,String(k),{s:13,w:600,c:ncol(k)[2]});
  const grp=(a,b,col,nm,n)=>{const x1=nx+a*cw,x2=nx+b*cw+cw-4;return `<path d="M${x1} 112V118H${x2}V112" fill="none" stroke="${col[0]}" stroke-width="1.5"/>`+T((x1+x2)/2,138,nm,{s:12.5,w:600,c:col[2]})+T((x1+x2)/2,156,n,{s:12,c:INK2})};
  g+=grp(0,6,C.bad,'Detractors, chê','15 người')+grp(7,8,C.neu,'Passives','30 người')+grp(9,10,C.good,'Promoters, khen','55 người');
  g+=R(nx,176,502,62,GS,{rx:8})+T(nx+12,194,'Ở Shop Áo Gió, 100 khách trả lời',{s:10.5,w:600,c:G,a:'start'})+T(nx+12,220,'NPS = % Promoters − % Detractors = 55 − 15 = +40',{s:12.5,w:600,c:G,a:'start'});
  g+=T(nx,264,'Thang kết quả từ −100 tới +100. Passives không vào công thức.',{s:12,c:MUTE,a:'start'});
  g+=T(nx,284,'Đo: mức trung thành với cả Product.',{s:12,c:INK2,a:'start'})+T(nx,304,'Hỏi khi nào: định kỳ, so qua các Release.',{s:12,c:INK2,a:'start'});
  /* CSAT: thang 1 tới 5 */
  const cx=592,cw2=104;g+=`<path d="M560 6V308" stroke="${LINE}" stroke-width="1.5"/>`;
  g+=head(cx,'CSAT','Customer Satisfaction Score','“Bạn hài lòng thế nào với lần thanh toán vừa rồi?”');
  const cnt=[5,5,10,35,45],lab=['Rất không','Không','Bình thường','Hài lòng','Rất hài lòng'];
  for(let k=0;k<5;k++){const col=k>=3?C.good:C.neu;g+=R(cx+k*cw2,66,cw2-6,36,col[1],{rx:6,stroke:col[0],sw:1})+T(cx+k*cw2+(cw2-6)/2,82,String(k+1),{s:13,w:600,c:col[2]})+T(cx+k*cw2+(cw2-6)/2,97,lab[k],{s:10.5,c:col[2]})+T(cx+k*cw2+(cw2-6)/2,126,cnt[k]+' người',{s:12,c:INK2})}
  g+=`<path d="M${cx+3*cw2} 136V142H${cx+5*cw2-6}V136" fill="none" stroke="${C.good[0]}" stroke-width="1.5"/>`+T(cx+4*cw2-3,160,'chọn 4 hoặc 5 mới tính là hài lòng',{s:12.5,w:600,c:C.good[2]});
  g+=R(cx,176,514,62,GS,{rx:8})+T(cx+12,194,'Ở Shop Áo Gió, 100 khách vừa thanh toán bằng thẻ đã lưu',{s:10.5,w:600,c:G,a:'start'})+EQ(cx+12,218,500,`<span class="fml"><span class="fl">CSAT</span> = ${FR('Số người chọn 4, 5','Số người trả lời')} = ${FR('35 + 45','100')} = <b>80%</b></span>`,{s:12.5,c:G,h:40});
  g+=T(cx,264,'Thang kết quả từ 0% tới 100%.',{s:12,c:MUTE,a:'start'});
  g+=T(cx,284,'Đo: mức hài lòng với 1 lần dùng, 1 bước cụ thể.',{s:12,c:INK2,a:'start'})+T(cx,304,'Hỏi khi nào: ngay sau lần dùng đó.',{s:12,c:INK2,a:'start'});
  return g},{label:'NPS hỏi có sẵn lòng giới thiệu không, thang 0 tới 10, lấy % khen trừ % chê. CSAT hỏi có hài lòng với 1 lần dùng không, thang 1 tới 5, lấy % chọn 4 hoặc 5'});
/* ---------- 5.5: SWOT, 2 hàng bên trong, bên ngoài tổ chức. Màu theo nghĩa như hình f-rii: tốt xanh, xấu vàng. Hàng bên ngoài là Risk nên viền giống khối Threat, Opportunity ---------- */
fig('f-swot',W,300,()=>{let g='';const G='#4a3f94',GS='#f3f1fc',X0=150,CW=478,GX=12,Y1=34,RH=104,Y2=Y1+RH+48;
  g+=T(X0+CW/2,18,'Tác động tốt',{s:12.5,w:600,c:C.good[2]})+T(X0+CW+GX+CW/2,18,'Tác động xấu',{s:12.5,w:600,c:C.warn[2]});
  g+=T(0,Y1+RH/2-4,'Bên trong',{s:13,w:600,c:INK,a:'start'})+T(0,Y1+RH/2+14,'tổ chức, Team',{s:12,c:MUTE,a:'start'});
  g+=T(0,Y2+RH/2-4,'Bên ngoài',{s:13,w:600,c:INK,a:'start'})+T(0,Y2+RH/2+14,'là 2 loại Risk',{s:12,c:MUTE,a:'start'});
  const cell=(x,y,col,fill,ti,vi,e)=>R(x,y,CW,RH,fill,{rx:8,stroke:col[0]})+T(x+14,y+24,ti,{s:14,w:600,c:col[2],a:'start'})+T(x+132,y+24,vi,{s:12,c:INK2,a:'start'})+R(x+8,y+RH-54,CW-16,46,GS,{rx:8})+T(x+20,y+RH-36,'Ở Shop Áo Gió',{s:10.5,w:600,c:G,a:'start'})+T(x+20,y+RH-18,e,{s:12.5,c:G,a:'start'});
  g+=cell(X0,Y1,C.good,C.good[1],'Strengths','điểm mạnh','Khách quen ở 12 cửa hàng tin thương hiệu Gió');
  g+=cell(X0+CW+GX,Y1,C.warn,C.warn[1],'Weaknesses','điểm yếu','Team chưa từng làm thanh toán online');
  g+=cell(X0,Y2,C.good,'#fff','Opportunities','Risk tốt','Gió về sớm: ra mắt sớm thì bán thêm');
  g+=cell(X0+CW+GX,Y2,C.warn,'#fff','Threats','Risk xấu','Risk 2: lưu thẻ không đạt quy định bảo mật');
  g+=A(`M${X0+60} ${Y1+RH+4}V${Y2-4}`,'good',{w:1.5})+T(X0+72,Y1+RH+28,'Strength mở ra Opportunity',{s:12,w:600,c:C.good[2],a:'start'});
  g+=A(`M${X0+CW+GX+60} ${Y1+RH+4}V${Y2-4}`,'warn',{w:1.5})+T(X0+CW+GX+72,Y1+RH+28,'Weakness dẫn tới Threat',{s:12,w:600,c:C.warn[2],a:'start'});
  return g},{label:'SWOT: hàng trên là Strengths và Weaknesses bên trong, hàng dưới là Opportunities và Threats bên ngoài, chính là 2 loại Risk. Strength mở ra Opportunity, Weakness dẫn tới Threat'});
fig('f-rii',W,424,()=>{let g='';const G='#4a3f94',GS='#f3f1fc';
  /* 2 hàng theo tác động (tốt, xấu) như hàng dưới Hình 5.5-1 SWOT. 2 cột theo thời gian: chưa xảy ra, đã xảy ra.
     Mỗi hàng có 1 khối Risk đã nhận ra và 1 khối nét đứt "chưa nhận ra": cả 2 đều có thể xảy ra, nên Issue không nhất thiết đến từ Risk.
     Mức nặng của Issue vẽ bằng hình dòng việc: đi vòng qua được hay bị chặn đứng, không chỉ bằng độ dày viền */
  const ex=(x,y,w,t)=>R(x,y,w,46,GS,{rx:8})+T(x+12,y+18,'Ở Shop Áo Gió',{s:10.5,w:600,c:G,a:'start'})+T(x+12,y+36,t,{s:12.5,c:G,a:'start'});
  const box=(x,y,w,h,col,fill,ti,d,e,sw)=>R(x,y,w,h,fill,{rx:8,stroke:col[0],sw:sw||1.5})+T(x+14,y+24,ti,{s:14,w:600,c:col[2],a:'start'})+(d?T(x+14,y+44,d,{s:12,c:INK2,a:'start'}):'')+(e?ex(x+8,y+h-54,w-16,e):'');
  const unk=(x,y,col)=>R(x,y,300,36,'#fff',{rx:8,stroke:col[0],dash:1})+T(x+14,y+23,'Chưa nhận ra',{s:12.5,w:600,c:col[2],a:'start'})+T(x+116,y+23,'không có trong Risk register',{s:12,c:MUTE,a:'start'});
  const AX=150,BX=640;
  g+=T(AX,18,'Chưa xảy ra: Risk',{s:13,w:600,c:INK,a:'start'})+T(AX+138,18,'nhận ra sớm, ví dụ nhờ SWOT ở Hình 5.5-1',{s:12,c:MUTE,a:'start'})+T(BX,18,'Đã xảy ra',{s:13,w:600,c:INK,a:'start'});
  g+=`<path d="M600 6V418" stroke="${LINE}" stroke-width="1.5" stroke-dasharray="4 4"/>`;
  /* hàng tốt */
  const Y1=36;g+=T(0,Y1+70,'Tác động tốt',{s:13,w:600,c:C.good[2],a:'start'});
  g+=box(AX,Y1,300,104,C.good,'#fff','Opportunity','','Gió về sớm: ra mắt sớm thì bán thêm')+unk(AX,Y1+112,C.good);
  g+=box(BX,Y1+20,478,108,C.good,C.good[1],'Benefit','thứ đạt được thật, ghi lại để tận dụng tiếp','Gió về sớm thật: ra mắt kịp, bán thêm');
  g+=A(`M${AX+304} ${Y1+52}C620 ${Y1+52} 600 ${Y1+74} ${BX-4} ${Y1+74}`,'good',{w:1.5})+A(`M${AX+304} ${Y1+130}C620 ${Y1+130} 600 ${Y1+74} ${BX-4} ${Y1+74}`,'good',{w:1.5,dash:1});
  /* hàng xấu */
  const Y2=214;g+=T(0,Y2+100,'Tác động xấu',{s:13,w:600,c:C.warn[2],a:'start'});
  g+=box(AX,Y2+30,300,104,C.warn,'#fff','Threat','','Risk 1: sandbox PayNhanh có thể chậm')+unk(AX,Y2+142,C.warn);
  g+=R(BX,Y2,478,204,C.bad[1],{rx:12,stroke:C.bad[0]})+T(BX+16,Y2+24,'Issue',{s:15,w:600,c:C.bad[2],a:'start'})+T(BX+66,Y2+24,'2 mức, theo việc của Team còn đi tiếp được không',{s:12,c:INK2,a:'start'});
  const sub=(x,ti,d,e,block)=>{const y=Y2+36,w=226,h=160,gy=y+66;let o=R(x,y,w,h,'#fff',{rx:8,stroke:C.bad[0],sw:block?2.5:1.5})+T(x+12,y+22,ti,{s:13.5,w:600,c:C.bad[2],a:'start'})+T(x+12,y+40,d,{s:11.5,c:INK2,a:'start'});
    /* hình dòng việc: chưa chặn thì mũi tên vòng qua vật cản, Impediment thì mũi tên dừng ở tường */
    o+=R(x+100,gy-9,16,18,C.bad[1],{rx:3,stroke:C.bad[0],sw:1});
    o+=block?A(`M${x+16} ${gy}H${x+94}`,'neu',{w:2})+`<path d="M${x+122} ${gy-12}V${gy+12}" stroke="${C.bad[0]}" stroke-width="5" stroke-linecap="round"/>`+T(x+132,gy+4,'Team dừng',{s:11.5,w:600,c:C.bad[2],a:'start'})
      :A(`M${x+16} ${gy}H${x+88}Q${x+108} ${gy-26} ${x+128} ${gy}H${x+w-14}`,'neu',{w:2})+T(x+w-14,gy+20,'Team đi tiếp',{s:11.5,c:INK2,a:'end'});
    return o+ex(x+8,y+h-54,w-16,e)};
  g+=sub(BX+10,'Issue chưa chặn Team','ghi Issue log, xử lý dần','Sprint 2: sandbox chậm lại',0);
  g+=sub(BX+242,'Impediment','Scrum Master gỡ ngay (4.6)','Sprint 1: chặn Huy 2 ngày',1);
  g+=A(`M${AX+304} ${Y2+82}C620 ${Y2+82} 600 ${Y2+102} ${BX-4} ${Y2+102}`,'warn',{w:1.5})+A(`M${AX+304} ${Y2+160}C620 ${Y2+160} 600 ${Y2+102} ${BX-4} ${Y2+102}`,'warn',{w:1.5,dash:1});
  return g},{label:'Hàng tốt: Opportunity hay điều chưa nhận ra xảy ra thành Benefit. Hàng xấu: Threat hay điều chưa nhận ra xảy ra thành Issue. Issue chưa chặn Team thì ghi Issue log, đang chặn Team là Impediment'});

/* 4.2 User Story Map của Website Gió (APG 2: story mapping giúp thấy Feature giá trị cao theo thời gian, lộ chỗ sót trong backlog, lập Release).
   Hàng trên là hành trình của Hoa, trái sang phải. Dưới mỗi bước là User Story, trên quan trọng hơn. Đường ngang cắt thành từng Release */
fig('f-usm',W,436,()=>{let g='';const X0=150,CW=242,cw=224,ch=40,G='#4a3f94';
  const steps=['Tìm áo','Chọn áo, chọn size','Đặt hàng, thanh toán','Nhận hàng, đổi trả'];
  g+=`<circle cx="${X0+4}" cy="16" r="5" fill="${INK}"/>`+A(`M${X0+10} 16H${W-14}`,'neu',{w:1.5})+`<rect x="${W-12}" y="9" width="10" height="14" rx="2" fill="${INK}"/>`+T(X0+16,10,'Hành trình của Hoa. Bắt đầu: cần 1 áo khoác',{s:11.5,w:600,c:MUTE,a:'start'})+T(W-16,10,'Kết thúc: mặc áo vừa size',{s:11.5,w:600,c:MUTE,a:'end'});
  steps.forEach((t,i)=>{const x=X0+i*CW;g+=R(x,28,cw,44,C.pri[1],{rx:8,stroke:PMID})+T(x+cw/2,55,t,{s:13,w:600,c:INK})});
  const B=[['Release 1','Release đầu, MVP (6.2)',92,208,C.pri],['Release 2','Project sau (1.6)',300,60,C.po],['Không làm','Won\'t have (4.9)',360,60,C.neu]];
  B.forEach(([t,sub,y,hh,c],k)=>{g+=Ln(`M0 ${y}H${W}`,c[0],1.5,'5 4')+T(0,y+24,t,{s:13.5,w:600,c:k<2?c[2]:INK2,a:'start'})+T(0,y+42,sub,{s:11.5,c:MUTE,a:'start'})});
  // [cột, dải, ô, tên, ghi chú, kiểu]. Khớp câu chuyện: 6 hạng mục của 4.9 cộng ví điện tử thêm ngày 10 (6.2)
  const S=[[0,0,0,'Tìm kiếm'],[0,0,1,'Lọc áo theo màu'],[1,0,0,'Gợi ý size'],[2,0,0,'Giỏ hàng'],[2,0,1,'Thanh toán bằng thẻ đã lưu','User Story #12'],[2,0,2,'Thêm thẻ ngân hàng'],[2,0,3,'Thanh toán bằng ví điện tử','thêm ngày 10, sau Sprint Review 1'],[3,0,0,'Xem danh sách đơn mới','persona Long, kho'],
    [2,1,0,'Mua số lượng lớn, có hoá đơn','lộ ra nhờ persona Thu','x'],[3,1,0,'Đổi size','Operations báo về (1.6)'],
    [3,2,0,'Chat với nhân viên']];
  S.forEach(([c,b,slot,t,note,k])=>{const x=X0+c*CW,y=B[b][2]+12+slot*(ch+8),hl=k==='x';
    g+=R(x,y,cw,ch,hl?C.warn[1]:'#fff',{rx:6,stroke:hl?C.warn[0]:LINE,dash:hl?'4 3':null})+T(x+12,y+(note?17:25),t,{s:12.5,w:600,c:b===2?MUTE:INK,a:'start'})+(note?T(x+12,y+32,note,{s:11,c:hl?C.warn[2]:MUTE,a:'start'}):'')});
  return g},{label:'User Story Map của Website Gió, cắt thành các Release'});

/* 2.5 Hình Stakeholders và Scrum Team: vẽ mũi tên theo vị trí thật của các ô, vẽ lại khi đổi cỡ màn hình */
(function(){const M=document.querySelector('.rmap');if(!M)return;const sv=M.querySelector('.rm-svg');
  const COL={d:'#23252b',i:'#6b6f7a',s:'#258b95'};
  const mk=k=>`<marker id="rma-${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${COL[k]}"/></marker>`;
  function draw(){if(getComputedStyle(sv).display==='none'){sv.innerHTML='';return}
    const o=M.getBoundingClientRect(),r=s=>{const b=M.querySelector(s).getBoundingClientRect();return {l:b.left-o.left,t:b.top-o.top,r:b.right-o.left,b:b.bottom-o.top,w:b.width,h:b.height,cx:b.left-o.left+b.width/2,cy:b.top-o.top+b.height/2}};
    const K=r('.rm-cust'),P=r('.rz.po'),D=r('.rz.team'),S=r('.rz.sm'),F=r('.stb');
    const ln=(d,k,w=2)=>`<path d="${d}" fill="none" stroke="${COL[k]}" stroke-width="${w}" stroke-linejoin="round" marker-end="url(#rma-${k})"/>`;
    const seg=(d,k,w=2)=>`<path d="${d}" fill="none" stroke="${COL[k]}" stroke-width="${w}" stroke-linejoin="round"/>`;
    const y1=P.t+P.h*0.34,y2=y1+54,yt=F.t-34,yb=(P.b+S.t)/2+4,xt=(P.cx+D.cx)/2;
    let g='<defs>'+mk('d')+mk('i')+mk('s')+'</defs>';
    g+=ln(`M${D.cx} ${F.t}V${yt}H${K.cx}V${K.t-4}`,'d',3);
    g+=ln(`M${K.r+4} ${y1}H${P.l-4}`,'i')+ln(`M${P.l-4} ${y2}H${K.r+4}`,'i');
    g+=ln(`M${P.r+4} ${y1}H${D.l-4}`,'i')+ln(`M${D.l-4} ${y2}H${P.r+4}`,'i');
    g+=seg(`M${xt} ${S.t-2}V${yb}`,'s')+seg(`M${P.cx} ${yb}H${D.cx}`,'s')+ln(`M${P.cx} ${yb}V${P.b+4}`,'s')+ln(`M${D.cx} ${yb}V${D.b+4}`,'s');
    g+=ln(`M${S.l-4} ${S.cy}H${K.r+4}`,'s');
    const lw=(()=>{const e=M.querySelector('.rl-ds');e.style.width='min-content';const w=e.getBoundingClientRect().width;return w})(),xi=Math.max(D.cx+24,Math.min(D.cx+46,F.r-22-lw))/* mũi tên Impediment lùi trái vừa đủ chỗ cho chữ dài nhất của nhãn bên phải, cách mũi tên teal ở D.cx ít nhất 24px */;g+=ln(`M${xi} ${D.b+4}V${S.t-4}`,'i');
    sv.innerHTML=g;
    const put=(k,x,y,w,al='c')=>{const e=M.querySelector('.rl-'+k);if(al==='l')w=Math.min(w,M.clientWidth-x-4);e.style.width=w+'px';e.style.left=(al==='c'?x-w/2:al==='l'?x:x-w)+'px';e.style.top=y+'px';e.style.textAlign=al==='c'?'center':al==='l'?'left':'right';return e};
    const gap1=F.l-K.r-20,gap2=D.l-P.r-16,c1=(K.r+F.l)/2;/* nhãn bên trái nằm ngoài khung Scrum Team */
    const a=put('inc',(K.cx+D.cx)/2,yt-24,560);
    const kp=put('kp',c1,0,gap1);kp.style.top=(y1-kp.offsetHeight-6)+'px';put('pk',c1,y2+6,gap1);
    const pd=put('pd',(P.r+D.l)/2,0,gap2);pd.style.top=(y1-pd.offsetHeight-6)+'px';put('dp',(P.r+D.l)/2,y2+6,gap2);
    put('st',xt+10,yb+6,240,'l');put('sp',P.cx+10,yb-24,220,'l');put('sd',D.cx-10,yb-24,150,'r');{const e=put('ds',xi+8,0,Math.max(70,F.r-xi-14),'l');e.style.top=((D.b+S.t)/2-e.offsetHeight/2)+'px'}
    const so=put('so',c1,0,gap1);so.style.top=(S.cy-so.offsetHeight-6)+'px'}
  draw();addEventListener('resize',()=>{clearTimeout(M._t);M._t=setTimeout(draw,80)});document.fonts&&document.fonts.ready.then(draw);setTimeout(draw,400)})();

/* 4.3 User Journey Map của Hoa (APG 2 §2: journey maps cho cả Team chung 1 ngôn ngữ, giữ thảo luận gắn với kết quả của End User).
   Cột là các bước, cùng hàng trên của User Story Map. Hàng: Hoa làm gì, cảm xúc, điều khó chịu (lấy từ persona Hoa), cơ hội thành User Story */
fig('f-ujm',W,380,()=>{let g='';const X0=150,CW=242,cw=230,G='#4a3f94';
  const steps=['Tìm áo','Chọn áo, chọn size','Đặt hàng, thanh toán','Nhận hàng, đổi trả'];
  g+=`<circle cx="${X0+4}" cy="16" r="5" fill="${INK}"/>`+A(`M${X0+10} 16H${W-14}`,'neu',{w:1.5})+`<rect x="${W-12}" y="9" width="10" height="14" rx="2" fill="${INK}"/>`;
  g+=T(X0+16,10,'Bắt đầu: trời trở gió, Hoa cần 1 áo khoác',{s:11.5,w:600,c:MUTE,a:'start'})+T(W-16,10,'Kết thúc: mặc áo vừa size',{s:11.5,w:600,c:MUTE,a:'end'});
  steps.forEach((t,i)=>{const x=X0+i*CW;g+=R(x,28,cw,40,C.pri[1],{rx:8,stroke:PMID})+T(x+cw/2,53,t,{s:13,w:600,c:INK})});
  const rows=[['Hoa làm gì',84,52],['Cảm xúc',146,92],['Điều khó chịu',248,52],['Cơ hội, thành User Story',310,124]];
  rows.forEach(([t,y])=>{const [a,b]=t.split(', ');g+=T(0,y+22,b?a+',':a,{s:13,w:600,c:INK2,a:'start'})+(b?T(0,y+40,b,{s:13,w:600,c:INK2,a:'start'}):'')});
  const act=['Tìm trên điện thoại, lọc theo màu','Xem bảng size, phân vân giữa 2 size','Gõ lại 16 số thẻ trên điện thoại','Thử áo, nếu không vừa thì đổi'];
  const pain=['Khó tìm đúng màu muốn','Sợ chọn sai size','Ghét nhập lại số thẻ','Đổi size mất công'];
  const opp=[['Lọc áo theo màu','Release 1'],['Gợi ý size','Release 1'],['Thanh toán bằng thẻ đã lưu','Release 1, User Story #12'],['Đổi size','Release 2']];
  const emo=[1,-1,-2,0];
  steps.forEach((_,i)=>{const x=X0+i*CW;
    g+=R(x,84,cw,52,SOFT,{rx:6})+T(x+12,114,act[i],{s:12.5,c:INK,a:'start'});
    g+=R(x,248,cw,52,C.bad[1],{rx:6})+T(x+12,278,pain[i],{s:12.5,c:C.bad[2],a:'start'});
    g+=R(x,322,cw,46,'#fff',{rx:6,stroke:LINE})+T(x+12,341,opp[i][0],{s:12.5,w:600,c:INK,a:'start'})+T(x+12,358,opp[i][1],{s:11,c:MUTE,a:'start'})});
  // đường cảm xúc: trên là vui, dưới là khó chịu
  const ey=v=>192-v*18,pts=emo.map((v,i)=>[X0+i*CW+cw/2,ey(v)]);
  g+=Ln(`M${X0} 192H${W-8}`,LINE,1,'3 4')+`<path d="M${pts.map(p=>p.join(' ')).join('L')}" fill="none" stroke="${C.pri[0]}" stroke-width="2.5" stroke-linejoin="round"/>`;
  pts.forEach(([x,y],i)=>{const v=emo[i],c=v>0?C.good[0]:v<0?C.bad[0]:C.neu[0];g+=`<circle cx="${x}" cy="${y}" r="13" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="${x-4}" cy="${y-3}" r="1.6" fill="${c}"/><circle cx="${x+4}" cy="${y-3}" r="1.6" fill="${c}"/>`+Ln(v>0?`M${x-5} ${y+3}Q${x} ${y+8} ${x+5} ${y+3}`:v<0?`M${x-5} ${y+6}Q${x} ${y+1} ${x+5} ${y+6}`:`M${x-5} ${y+4}H${x+5}`,c,1.8)});
  // mũi tên điều khó chịu → cơ hội
  steps.forEach((_,i)=>{const x=X0+i*CW+cw/2;g+=A(`M${x} 302V318`,'neu',{w:1.5})});
  return g},{label:'User Journey Map của Hoa: bước, việc làm, cảm xúc, điều khó chịu, cơ hội thành User Story'});

/* Số mục trong ngoặc ở chữ của hình, ví dụ (4.9), thành liên kết tới mục đó */
(function(){document.querySelectorAll('svg.fig text').forEach(t=>{if(t.closest('a'))return;const m=t.textContent.match(/\((?:[^()]*?, )?(\d)\.(\d{1,2})\)/);if(!m)return;const id='s'+m[1]+'-'+m[2];if(!document.getElementById(id))return;
  const a=document.createElementNS('http://www.w3.org/2000/svg','a');a.setAttribute('href','#'+id);a.setAttribute('class','secl');t.parentNode.insertBefore(a,t);a.appendChild(t)})})();

/* ---------- PHỤ LỤC ---------- */
(function(){
  const N=20,d=[...Array(N+1).keys()];
  const arr=d.map(t=>12+3*t), dg=d.map((t,i)=>Math.min(arr[i],Math.round(2.9*t)));
  const ts=d.map((t,i)=>t<2?0:Math.min(dg[i],Math.round(2.8*(t-1)))), dn=d.map((t,i)=>t<3?0:Math.min(ts[i],Math.round(t<=8?2.2*(t-2.5):12.1+0.9*(t-8))));
  const X=t=>60+t*37,Y=v=>330-v*3.6;
  const area=(lo,hi)=>'M'+d.map(i=>X(i)+','+Y(hi[i])).join(' L')+' L'+d.slice().reverse().map(i=>X(i)+','+Y(lo[i])).join(' L')+'Z';
  const zero=d.map(()=>0);
  const mk=(x,y,n,c)=>`<circle cx="${x}" cy="${y}" r="11" fill="${c}" stroke="#fff" stroke-width="2"/>`+T(x,y+4.5,n,{s:12,w:700,c:'#fff'});
  let base;
  fig('f-cfd',820,380,()=>{
    let g=grid(60,330,800,42,[0,20,40,60,80],Y,[0,5,10,15,20],X,{yl:'Số hạng mục cộng dồn',xl:'Ngày làm việc'});
    g+=`<path d="${area(dg,arr)}" fill="${ST.todo}"/><path d="${area(ts,dg)}" fill="${ST.doing}"/><path d="${area(dn,ts)}" fill="${ST.test}"/><path d="${area(zero,dn)}" fill="${ST.done}"/>`;
    g+=T(X(16),Y((arr[16]+dg[16])/2)+4,'To do',{s:13,w:600,c:INK})+T(X(16),Y((dg[16]+ts[16])/2)+4,'Doing',{s:12,w:600,c:C.po[2]})+T(X(16),Y((ts[16]+dn[16])/2)+4,'Testing',{s:13,w:600,c:C.warn[2]})+T(X(17.5),Y(dn[17]/2)+4,'Done',{s:13,w:600,c:C.good[2]});
    const bw=t=>Ln(`M${X(t)} ${Y(ts[t])}V${Y(dn[t])}`,C.bad[0],2.5)+Ln(`M${X(t)-6} ${Y(ts[t])}h12M${X(t)-6} ${Y(dn[t])}h12`,C.bad[0],2.5);
    g+=bw(5)+bw(19)+T(X(5)+10,Y((ts[5]+dn[5])/2)+4,ts[5]-dn[5],{s:12,w:700,c:C.bad[0],a:'start',halo:ST.test})+T(X(19)-10,Y((ts[19]+dn[19])/2)+4,ts[19]-dn[19],{s:12,w:700,c:C.bad[0],a:'end',halo:ST.test});
    g+=mk(X(19)+18,Y(ts[19])-6,'1',C.bad[0]);
    g+=`<g id="cfdHover"></g><rect x="60" y="20" width="740" height="312" fill="transparent" id="cfdHit" style="cursor:crosshair"/>`;
    return g;});
  const svg=document.querySelector('#f-cfd svg'),H=document.getElementById('cfdHover'),Rd=document.getElementById('cfdRead');
  const first=(s,v)=>{for(let i=0;i<=N;i++)if(s[i]>=v){if(!i)return 0;const a=s[i-1],b=s[i];return i-1+(v-a)/(b-a||1)}return null};
  let FOC=0;
  function show(t){
    const done=dn[t],wip=dg[t]-dn[t],lt=done>0?t-first(arr,done):null,ct=done>0?t-first(dg,done):null,t0=Math.max(0,t-7),thr=(dn[t]-dn[t0])/((t-t0)||1);
    let h=Ln(`M${X(t)} 30V330`,INK,1.2,'4 3');
    if(!FOC||FOC===2)h+=Ln(`M${X(t)-7} ${Y(dg[t])}V${Y(dn[t])}`,C.pri[0],4)+mk(X(t)-7,Y(dg[t])-16,'2',C.pri[0]);
    if(done>0&&(!FOC||FOC===3)){const xa=X(first(arr,done)),xg=X(first(dg,done)),y=Y(done);
      h+=Ln(`M${xa} ${y}H${X(t)}`,INK,5)+Ln(`M${xg} ${y}H${X(t)}`,'#fff',2)+`<circle cx="${xa}" cy="${y}" r="4.5" fill="${INK}"/><circle cx="${xg}" cy="${y}" r="4.5" fill="#fff" stroke="${INK}" stroke-width="1.5"/><circle cx="${X(t)}" cy="${y}" r="4.5" fill="${INK}"/>`+mk(xa-16,y,'3',INK);}
    if(t>=4&&(!FOC||FOC===4)){h+=Ln(`M${X(t0)} ${Y(dn[t0])}H${X(t)}V${Y(dn[t])}`,C.good[0],2,'4 3')+mk((X(t0)+X(t))/2,Y(dn[t0])+16,'4',C.good[0]);}
    if(FOC===1)h+=`<rect x="${X(5)}" y="${Y(ts[20])-8}" width="${X(20)-X(5)+6}" height="${Y(dn[5])-Y(ts[20])+16}" rx="10" fill="none" stroke="${C.bad[0]}" stroke-width="2" stroke-dasharray="6 4"/>`;
    H.innerHTML=h;
    const row=(sw,l,v)=>`<div class="row"><span>${sw}${l}</span><b>${v}</b></div>`,sq=c=>`<i class="sw" style="background:${c}"></i>`,mm=(n,c,o)=>`<span class="mk" style="background:${c};${o||''}">${n}</span>`;
    Rd.innerHTML=`<div class="rd-t">Ngày ${t}</div><div class="rd-g">Số hạng mục ở từng trạng thái</div>`+row(sq(ST.todo),'To do',arr[t]-dg[t])+row(sq(ST.doing),'Doing',dg[t]-ts[t])+row(sq(ST.test),'Testing',ts[t]-dn[t])+row(sq(ST.done),'Done',dn[t])+
      `<div class="rd-g">Chỉ số đọc từ biểu đồ</div>`+row(mm(2,C.pri[0]),'WIP = Doing + Testing',wip)+row(mm(3,INK),'Lead Time ≈',lt==null?'–':lt.toFixed(1).replace('.',',')+' ngày')+row(mm(3,'#fff','color:'+INK+';border:1.5px solid '+INK),'Cycle Time ≈',ct==null?'–':ct.toFixed(1).replace('.',',')+' ngày')+row(mm(4,C.good[0]),'Throughput 7 ngày',t>=4?thr.toFixed(1).replace('.',',')+' /ngày':'–');
  }
  window.CFD={show:(t,f)=>{FOC=f||0;show(t)}};
  const cfdAt=e=>{FOC=0;document.querySelector('.how').classList.remove('focus');const x=SVGPT(svg,e).x;show(Math.max(0,Math.min(N,Math.round((x-60)/37))))};['pointermove','pointerdown'].forEach(t=>document.getElementById('cfdHit').addEventListener(t,cfdAt));/* chuột rê, ngón tay chạm hoặc kéo đều đọc được ngày */
  show(14);
})();
(function(){
  const N=20,d=[...Array(N+1).keys()],scope=d.map(t=>t<10?40:t<14?50:t<17?56:50),done=[0,1,4,4,6,9,9,10,14,16,16,17,21,23,23,24,28,31,31,34,37],rem=d.map(t=>scope[t]-done[t]);
  const X=t=>52+t*23.4,Y=v=>244-v*3.4;
  function base(){let g=grid(52,244,522,30,[0,20,40,60],Y,[0,4,8,12,16,20],X,{yl:'Story Points'})+Ln(`M${X(10)} 34V292`,FAINT,1,'2 3')+R(X(0)+2,268,X(10)-X(0)-6,16,SOFT,{rx:4})+R(X(10)+4,268,X(20)-X(10)-6,16,SOFT,{rx:4})+T((X(0)+X(10))/2,280,'Sprint 1',{s:10.5,w:600,c:MUTE})+T((X(10)+X(20))/2,280,'Sprint 2',{s:10.5,w:600,c:MUTE})+T((X(0)+X(20))/2,304,'Ngày làm việc trong Release',{s:12,c:MUTE});
    [[10,'+ Scope'],[14,'+ Scope'],[17,'− Scope']].forEach(([t,l])=>g+=Ln(`M${X(t)} 24V244`,C.warn[0],1.5,'3 3')+T(X(t)+5,22,l,{s:11.5,w:600,c:C.warn[2],a:'start'}));return g}
  const step=s=>'M'+d.map(t=>t?`H${X(t)} V${Y(s[t])}`:`${X(0)} ${Y(s[0])}`).join(' '),line=s=>'M'+d.map(t=>X(t)+' '+Y(s[t])).join(' L');
  fig('f-bu',547,312,()=>base()+Ln(`M${X(0)} ${Y(0)}L${X(20)} ${Y(40)}`,FAINT,1.75,'6 4')+`<path d="${step(scope)}" fill="none" stroke="${INK}" stroke-width="2.5"/><path d="${line(done)}" fill="none" stroke="${C.good[0]}" stroke-width="2.5" stroke-linejoin="round"/>`
    +T(X(1),Y(40)-9,'Tổng Scope',{s:12.5,w:600,c:INK,a:'start'})+T(X(15),Y(done[15])+22,'Đã hoàn thành',{s:12.5,w:600,c:C.good[0],a:'start'})+T(X(13),Y(26)-14,'Lý tưởng',{s:12,c:MUTE,a:'end',halo:true}));
  fig('f-bd2',547,312,()=>base()+Ln(`M${X(0)} ${Y(40)}L${X(20)} ${Y(0)}`,FAINT,1.75,'6 4')+`<path d="${line(rem)}" fill="none" stroke="${C.pri[0]}" stroke-width="2.5" stroke-linejoin="round"/>`
    +T(X(1),Y(rem[1])-12,'Việc còn lại',{s:12.5,w:600,c:C.pri[0],a:'start'})+T(X(15),Y(10)+18,'Lý tưởng',{s:12,c:MUTE,a:'end',halo:true}));
})();
fig('f-wf',330,200,()=>R(14,12,302,22,'#e3e5ea',{rx:4})+R(14,46,140,96,'#fff',{rx:4,stroke:FAINT})+Ln('M14 46L154 142M154 46L14 142',FAINT,1.5)+R(170,48,146,12,'#e3e5ea',{rx:3})+R(170,68,124,12,'#e3e5ea',{rx:3})+R(170,88,136,12,'#e3e5ea',{rx:3})+R(170,116,84,24,'#fff',{rx:4,stroke:FAINT})+R(14,156,302,30,'#e3e5ea',{rx:4}));
fig('f-mu',330,200,()=>R(14,12,302,24,C.pri[0],{rx:6})+`<circle cx="30" cy="24" r="5" fill="#fff"/>`+R(14,48,140,96,C.pri[1],{rx:8})+`<circle cx="52" cy="80" r="12" fill="${PMID}"/><path d="M14 136L60 96L92 120L118 102L154 132V136a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8z" fill="${PMID}"/>`
  +T(170,66,'Áo khoác gió',{s:15,w:600,c:INK,a:'start'})+T(170,86,'Chống nước, 3 màu',{s:12.5,c:MUTE,a:'start'})+T(170,112,'590.000đ',{s:17,w:700,c:C.pri[0],a:'start'})+R(170,122,100,24,C.pri[0],{rx:12})+T(220,138.5,'Mua ngay',{s:12,w:600,c:'#fff'})+R(14,158,302,28,SOFT,{rx:6}));

fig('f-poc',330,200,()=>{let g=R(14,12,302,176,'#23252b',{rx:10})+`<circle cx="30" cy="26" r="4" fill="#c1564b"/><circle cx="44" cy="26" r="4" fill="#9f7220"/><circle cx="58" cy="26" r="4" fill="#61894b"/>`;
  const L=[['> pay.charge(the_test, 590000)','#e4e5ea'],['  gọi cổng thanh toán...','#a3a7b0'],['< 200 OK  ma_giao_dich=tx_8f2','#c9deb7'],['> pay.refund(tx_8f2)','#e4e5ea'],['< 200 OK  da_hoan_tien','#c9deb7']];
  L.forEach(([t,c],i)=>g+=`<text x="28" y="${58+i*22}" font-family="ui-monospace,Menlo,monospace" font-size="12" fill="${c}">${t}</text>`);
  g+=T(165,178,'Risk nằm ở tích hợp, nên không cần giao diện',{s:11.5,w:600,c:'#f2a7c1'});return g;});

/* ---------- TƯƠNG TÁC ---------- */
function player(btn,steps,{start,end}={}){let tm=null,on=false;
  const stop=()=>{clearTimeout(tm);on=false;btn.classList.remove('on');if(end)end()};
  btn.addEventListener('click',()=>{if(on){stop();return}on=true;btn.classList.add('on');if(start)start();let i=0;const nx=()=>{if(!on)return;if(i>=steps.length){stop();return}const [f,d]=steps[i++];f();tm=setTimeout(nx,d)};nx()});
  return {stop,get on(){return on}}}

(function(){const rows=[...document.querySelectorAll('.sliders .sl')];
  /* Khi chuyển ví dụ, thanh trượt chạy dần nhưng kết quả nhảy thẳng tới kết quả của ví dụ đích, không đi qua nhánh trung gian */
  let LOCK=null;const BR=(scope,time,cost)=>scope>time&&scope>cost?0:scope<time&&scope<cost?2:1;
  const TL=document.getElementById('triLive'),TT=document.getElementById('triTxt');
  function tri(v){const [val,cost,time,qual,scope]=v,P={Time:[50,40,time],Cost:[210,40,cost],Scope:[130,170,scope]};
    let g=`<polygon points="50,40 210,40 130,170" fill="none" stroke="${LINE}" stroke-width="2"/>${[[50,40],[210,40],[130,170]].map(([x,y])=>{const dx=x-130,dy=y-88,L=Math.hypot(dx,dy),a=24/L,b=(L-26)/L;return `<path d="M${(130+dx*a).toFixed(1)} ${(88+dy*a).toFixed(1)}L${(130+dx*b).toFixed(1)} ${(88+dy*b).toFixed(1)}" stroke="#b9bcc4" stroke-width="1.25" stroke-dasharray="3 3"/>`}).join("")}`;
    const node=(x,y,k,val,r)=>{const f=1-val/100,solid=f>=.6;return `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.pri[0]}" fill-opacity="${Math.max(.08,f).toFixed(2)}" stroke="${solid?C.pri[0]:FAINT}" stroke-width="1.5"${solid?'':' stroke-dasharray="5 4"'}/>`+T(x,y+4.5,k,{s:12.5,w:600,c:f>=.6?'#fff':INK})};
    for(const k in P)g+=node(P[k][0],P[k][1],k,P[k][2],26);g+=node(130,88,'Quality',qual,24).replace('font-size="12.5"','font-size="11"');
    g+=T(130,206,'Value: '+(val<34?'Most Fixed':val>66?'Most Flexible':'trung bình'),{s:12,c:MUTE});
    TL.innerHTML=`<svg class="fig" viewBox="0 0 260 214" style="max-width:260px;margin:0 auto">${g}</svg>`;
    const cur=LOCK??BR(scope,time,cost);
    TT.innerHTML=BRANCH([['Agile','Scope linh hoạt hơn cả Time và Cost'],['Hybrid','Scope nằm giữa Time và Cost'],['Predictive','Scope cố định hơn cả Time và Cost']],cur)}
  function upd(){const v=rows.map(r=>+r.querySelector('input').value),mn=Math.min(...v),mx=Math.max(...v);tri(v);
    rows.forEach((r,i)=>{const b=r.querySelector('.bd');r.classList.remove('fx','fl');b.innerHTML='';if(mn===mx)return;
      if(v[i]===mn){r.classList.add('fx');b.innerHTML='<span class="badge fx">Most Fixed</span>'}else if(v[i]===mx){r.classList.add('fl');b.innerHTML='<span class="badge fl">Most Flexible</span>'}})}
  const tx=document.getElementById('scTxt'),SS=document.getElementById('scS');
  const SC=[[[30,45,5,25,95],'<span class="gio-m"><svg class="gm" aria-hidden="true"><use href="#i-gio"/></svg>Team và anh Tuấn thống nhất: Time là Most Fixed vì phải ra mắt trước mùa gió. Scope là Most Flexible: chậm thì bớt Feature, không dời ngày ra mắt.</span>'],
    [[30,5,60,40,95],'Sponsor chỉ cấp một khoản cố định: Cost là Most Fixed. Hết tiền thì dừng, Scope làm được tới đâu bàn giao tới đó.'],
    [[30,60,95,5,45],'Phần mềm y tế không được phép lỗi: Quality là Most Fixed. Thà trễ hạn (Time là Most Flexible) còn hơn bàn giao kém Quality.'],
    [[40,90,5,60,35],'Hệ thống theo luật mới: luật có hiệu lực vào 1 ngày cố định nên Time là Most Fixed. Feature luật bắt buộc không được bớt, chỉ bớt được Feature phụ, nên Scope nằm giữa. Thiếu người thì thuê thêm: Cost là Most Flexible.']];
  const mark=i=>SS.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x.dataset.v===String(i)));
  rows.forEach(r=>r.querySelector('input').addEventListener('input',()=>{upd();mark(-1);tx.innerHTML='Bạn đang tự kéo. Bấm 1 ví dụ ở trên để xem lại cách đặt mẫu.'}));
  const go=(i,anim)=>{const [v,t]=SC[i];mark(i);LOCK=BR(v[4],v[2],v[1]);const v0=rows.map(r=>+r.querySelector('input').value);let k=anim?0:11;
    const step=()=>{k++;rows.forEach((r,j)=>r.querySelector('input').value=Math.round(v0[j]+(v[j]-v0[j])*k/12));upd();if(k<12)requestAnimationFrame(step);else{LOCK=null;tx.innerHTML=t}};step()};
  SS.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.v,1)});go(0,0);
})();
(function(){const LIM=2,todo=document.getElementById('kTodo'),doing=document.getElementById('kDoing'),done=document.getElementById('kDone'),msg=document.getElementById('kMsg'),items=['Giỏ hàng','Tìm kiếm','Lọc theo màu','Ví điện tử','Gợi ý size'];
  const cnt=c=>c.querySelectorAll('.kc').length;
  function card(t){const d=document.createElement('div');d.className='kc';d.textContent=t;d.tabIndex=0;d.onclick=()=>move(d);d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();move(d)}};return d}
  function move(d){const col=d.parentElement;
    if(col===todo){if(cnt(doing)>=LIM){doing.classList.remove('full');void doing.offsetWidth;doing.classList.add('full');msg.innerHTML='<span style="color:var(--bad-ink)">Doing đã đạt WIP Limit = 2. Hoàn thành việc đang làm trước khi nhận việc mới.</span>';return}
      doing.appendChild(d);msg.textContent='Đang làm '+cnt(doing)+'/'+LIM+'.'}
    else if(col===doing){done.appendChild(d);doing.classList.remove('full');d.onclick=null;d.onkeydown=null;d.tabIndex=-1;msg.textContent=cnt(done)===items.length?'Đã hoàn thành toàn bộ.':'Đã xong 1 việc, có chỗ trống để nhận việc mới.'}}
  function reset(){[todo,doing,done].forEach(c=>c.querySelectorAll('.kc').forEach(e=>e.remove()));doing.classList.remove('full');items.forEach(t=>todo.appendChild(card(t)));msg.innerHTML='Bấm thẻ ở <b>To do</b> để bắt đầu làm. Bấm thẻ ở <b>Doing</b> để hoàn thành.'}
  document.getElementById('kReset').onclick=()=>{reset();P&&P.clear()};reset();
  const c=t=>[...document.querySelectorAll('#kTodo .kc,#kDoing .kc')].find(e=>e.textContent===t),say=t=>()=>{msg.innerHTML='<b style="color:var(--pri-ink)">Ví dụ:</b> '+t};
  const P=STEP('kPlay',[{label:'Nhận Giỏ hàng',run:()=>{say('nhận Giỏ hàng.')();c('Giỏ hàng').click()}},{label:'Nhận Tìm kiếm',run:()=>{c('Tìm kiếm').click();say('nhận Tìm kiếm. Doing đã có 2 việc, chạm WIP Limit.')()}},{label:'Thử nhận Lọc theo màu',run:()=>{c('Lọc theo màu').click()}},{label:'Làm xong Giỏ hàng',run:()=>{c('Giỏ hàng').click();say('làm xong Giỏ hàng, Doing có chỗ trống.')()}},{label:'Nhận Lọc theo màu',run:()=>{c('Lọc theo màu').click();say('giờ mới nhận Lọc theo màu. WIP Limit buộc Team làm xong việc cũ rồi mới nhận việc mới.')()}}],{replay:true,reset,ms:3200,root:document.querySelector('.kan')});
  
})();
(function(){const V=20,bl=document.getElementById('pBacklog'),sp=document.getElementById('pSprint'),bar=document.getElementById('pBar'),txt=document.getElementById('pTxt'),sum=document.getElementById('pSum');
  const st=[['Giỏ hàng',8],['Thanh toán bằng thẻ đã lưu',5],['Tìm kiếm sản phẩm',3],['Thêm thẻ ngân hàng',5],['Gợi ý size theo chiều cao',8],['Lọc áo theo màu',2]];
  const cards=st.map(([n,p],i)=>{const d=document.createElement('div');d.className='sc';d.dataset.p=p;d.dataset.i=i;d.tabIndex=0;d.innerHTML='<span>'+n+'</span><span class="pt">'+p+' điểm</span>';
    const go=()=>{if(d.parentElement===bl)sp.appendChild(d);else{const a=[...bl.querySelectorAll('.sc')].find(e=>+e.dataset.i>i);a?bl.insertBefore(d,a):bl.appendChild(d)}upd()};
    d.onclick=go;d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}};return d});
  function upd(){const t=[...sp.querySelectorAll('.sc')].reduce((a,e)=>a+ +e.dataset.p,0);sum.textContent=t+' / '+V+' điểm';bar.firstElementChild.style.width=Math.min(100,t/V*100)+'%';bar.classList.toggle('over',t>V);txt.style.color=t>V?'var(--warn)':'';
    txt.textContent=t===0?'Bấm thẻ bên trái để chuyển sang Sprint Backlog.':t<V?'Còn '+(V-t)+' điểm so với Velocity quá khứ.':t===V?'Vừa khớp Velocity quá khứ.':'Vượt Velocity quá khứ '+(t-V)+' điểm.'}
  function reset(){cards.forEach(c=>bl.appendChild(c));upd()}document.getElementById('pReset').onclick=()=>{reset();cap.textContent='Bấm thẻ ở Product Backlog để chuyển sang Sprint Backlog, hoặc bấm Xem lần lượt.';P&&P.clear()};reset();
  const cap=document.getElementById('pCap'),k=i=>()=>cards[i].click(),say=t=>()=>{cap.textContent=t};
  const P=STEP('pPlay',[{label:'Mốc Velocity',run:()=>say('Velocity quá khứ là 20 điểm. Lấy User Story theo thứ tự Value.')()},{label:'Lấy 3 User Story đầu',run:()=>{k(0)();k(1)();k(2)();say('Lấy 3 User Story đầu theo thứ tự: 16 điểm, còn 4. Thêm thẻ ngân hàng 5 điểm sẽ vượt.')()}},{label:'Thử Gợi ý size',run:()=>{k(4)();say('Thử Gợi ý size theo chiều cao: 24 điểm, vượt Velocity.')()}},{label:'Bỏ Gợi ý size',run:()=>{k(4)();say('Bỏ Gợi ý size ra, quay về 16 điểm.')()}},{label:'Thêm Lọc áo theo màu',run:()=>{k(5)();say('Lọc áo theo màu chỉ 2 điểm: tổng 18, vừa với Velocity. 2 User Story còn lại chờ Sprint sau.')()}}],{replay:true,reset:()=>{reset();cap.textContent='Bấm thẻ ở Product Backlog để chuyển sang Sprint Backlog, hoặc bấm Xem lần lượt.'},ms:3200,root:document.querySelector('.planner')});
  
})();
(function(){let links=[],secs=[];const ref=()=>{const L=document.querySelectorAll('nav.top a:not(.nav-tool)');if(L.length!==links.length||links.some(a=>!a.isConnected)){links=[...L];secs=links.map(a=>{const h=a.getAttribute('href');return h&&h[0]==='#'?document.querySelector(h):null})}};/* danh sách mục x.y được JS dựng sau, nên dò lại khi số link đổi */
  /* 2 cấp: Phần (hoặc Mục lục, Ví dụ) trên thanh, và mục x.y trong danh sách thả xuống. Mỗi cấp tô 1 link */
  const sub=a=>!!a.closest('.nvd');function upd(){ref();[false,true].forEach(lv=>{let k=-1;secs.forEach((s,i)=>{if(sub(links[i])===lv&&s&&s.getBoundingClientRect().top<120)k=i});links.forEach((a,i)=>{if(sub(a)!==lv)return;a.classList.toggle('on',i===k);if(i===k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})})}
  addEventListener('scroll',upd,{passive:true});upd();})();
/* ---------- Tên tài liệu trong bài: dẫn tới References, không gạch chân như thuật ngữ ---------- */
(function(){const D=REFD;;
  const big=new RegExp(D.map(d=>'('+d[0].source+')').join('|'));
  const SK='a,h1,h2,h3,nav,svg,script,style,.legend,.drawer,.refs,button,label,.num,.eyebrow,.co-h,dfn,table.srct td:first-child';
  document.querySelectorAll('[id^="s"]').forEach(sec=>{if(!/^s\d-\d+$/.test(sec.id)||sec.id==='s6-8')return;const seen=new Set();const w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest(SK)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const ns=[];while(w.nextNode())ns.push(w.currentNode);
    ns.forEach(n=>{let node=n,m;while(node&&(m=big.exec(node.data))){const gi=m.slice(1).findIndex(x=>x!==undefined),id=D[gi][1];const mid=node.splitText(m.index),after=mid.splitText(m[0].length);const a=document.createElement('a');a.className='ref';a.href='#'+id;a.textContent=m[0];mid.replaceWith(a);node=after}})});
})();
/* Chip nguồn đứng 1 mình trong ngoặc thì bỏ ngoặc, giống Glossary (RF). Còn lại không để "(" hoặc ")" đứng lẻ khi xuống dòng: gói ngoặc và nhãn vào 1 khối không ngắt */
(function(){document.querySelectorAll('main a.ref').forEach(a=>{const p=a.previousSibling,n=a.nextSibling;const open=p&&p.nodeType===3&&/\($/.test(p.data),close=n&&n.nodeType===3&&/^\)/.test(n.data);if(!open&&!close)return;
  if(open&&close){p.data=p.data.slice(0,-1).replace(/\s+$/,' ');n.data=n.data.slice(1);return}const s=document.createElement('span');s.className='nw';a.before(s);if(open){p.data=p.data.slice(0,-1);s.append('(')}s.append(a);if(close){n.data=n.data.slice(1);s.append(')')}})})();
/* ---------- GLOSSARY: dò, gạch chân, tooltip, ngăn kéo ---------- */
(function(){if(typeof TERMS==='undefined')return;
  const secs=[...document.querySelectorAll('[id]')].filter(e=>/^s\d-\d+$/.test(e.id)&&e.id!=='s6-8');
  const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),ascii=s=>/^[\x20-\x7E]+$/.test(s);
  const TXC=new Map(),TX=el=>{if(!TXC.has(el)){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const o=[];while(w.nextNode())o.push(w.currentNode.data);TXC.set(el,o.join(' ').replace(/Agile Practice Guide|Scrum Guide|PMBOK®? Guide|PMI Lexicon of Project Management Terms|PMI Lexicon|Choose Your WoW/g,' '))}return TXC.get(el)};
  TERMS.forEach(t=>{t.all=[...t.al,...(t.ab?[t.ab]:[])];const res=t.all.map(a=>new RegExp('(?<![\\w-])'+esc(a)+'(?![\\w-])',ascii(a)?'':'i'));t.where=secs.filter(s=>res.some(r=>r.test(TX(s)))).map(s=>s.id)});
  const pairs=[];TERMS.forEach((t,i)=>t.all.filter(ascii).forEach(a=>pairs.push([a,i])));pairs.sort((a,b)=>b[0].length-a[0].length);
  const big=new RegExp('(?<![\\w-])('+pairs.map(p=>esc(p[0])).join('|')+')(?![\\w-])');const idx=Object.fromEntries(pairs);
  const SKIP='.dn,.tk,.tkn,.fd-h,h1,h2,h3,.fwg b,.how b,.co-h,.pc-sec,.own,.eyebrow,.num,nav,.map,.legend,a,button,dfn,svg,.drawer,.refs,.lg-pop,.kc,.sc,.pcol,label,input,script,style,.read,table.confuse td:first-child,table.confuse td:nth-child(3),.proto,.syns,.chips,.def-k';
  const HEADS='h4,.lv .t,th,.tech>b,.vl b,.wc,.ir-h b';
  // Mục giải thích chính: nơi khái niệm có hộp Định nghĩa hoặc là tiêu đề
  const homeOf=(txt,sec)=>{const k=TERMS.findIndex(t=>t.all.some(a=>a.toLowerCase()===txt.toLowerCase()));if(k>=0&&!TERMS[k].home&&sec)TERMS[k].home=sec.id};
  secs.forEach(s=>{s.querySelectorAll('.def b:first-of-type,.card-head h3,.sub-head h3,h4,.fd-h b').forEach(e=>{const tx=e.textContent.replace(/\s*\(.*?\)\s*/g,'').trim();homeOf(tx,s);tx.split(/\s*[\/,]\s*/).forEach(p=>p&&p!==tx&&!['Agile','Scrum'].includes(p)&&homeOf(p,s))})});
  TERMS.forEach(t=>{if(t.home&&!t.where.includes(t.home))t.where.unshift(t.home);if(t.home)t.where=[t.home,...t.where.filter(w=>w!==t.home)]});
  document.querySelectorAll('dfn[data-g]').forEach(df=>{const k=TERMS.findIndex(t=>t.t===df.dataset.g);if(k<0)return;df.dataset.t=k;df.tabIndex=0;const s=df.closest('[id]');const sid=secs.find(x=>x.contains(df));if(sid&&!TERMS[k].where.includes(sid.id))TERMS[k].where.push(sid.id)});
  secs.forEach(sec=>{const seen=new Set();const w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest(SKIP)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(n=>{let node=n,m;while(node&&(m=big.exec(node.data))){const ti=idx[m[1]];if(ti===-1){node=node.splitText(m.index+m[1].length);continue}if(seen.has(ti)&&!node.parentElement.closest(HEADS)){node=node.splitText(m.index+m[1].length);continue}
      seen.add(ti);const mid=node.splitText(m.index);const after=mid.splitText(m[1].length);const d=document.createElement('dfn');d.dataset.t=ti;d.tabIndex=0;d.textContent=m[1];mid.replaceWith(d);node=after}})});
  const name=t=>t.t+(t.ab?` (${t.ab})`:'');
  document.querySelectorAll('svg.fig text').forEach(tx=>{if(tx.querySelector('tspan'))return;const k=tx.textContent.trim();if(k in idx&&idx[k]>=0){tx.dataset.t=idx[k];tx.classList.add('svt')}});
  const TOC={};document.querySelectorAll('.map li a[href^="#s"]').forEach(x=>TOC[x.getAttribute('href').slice(1)]=x.lastChild.textContent);
  const LB=(id,full)=>full?TOC[id]||'':id.slice(1).replace('-','.');
  const FIND=n=>{n=n.toLowerCase();let k=TERMS.findIndex(t=>t.t.toLowerCase()===n||(t.ab&&t.ab.toLowerCase()===n));if(k<0)k=TERMS.findIndex(t=>t.all.some(a=>a.toLowerCase()===n));if(k<0)k=TERMS.findIndex(t=>t.t.toLowerCase().startsWith(n));return k};
  document.querySelectorAll('td[data-where]').forEach(td=>{const ids=new Set();td.parentElement.querySelectorAll('[data-term]').forEach(b=>{const k=FIND(b.dataset.term);if(k>=0)TERMS[k].where.forEach(w=>ids.add(w))});
    const L=[...ids].filter(id=>id!=='s6-5').sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}));td.innerHTML=L.length?'<div class="pills">'+L.map(id=>`<a href="#${id}" title="${LB(id,1)}">${LB(id)}</a>`).join('')+'</div>':'<span class="muted">chỉ ở đây</span>'});
  const tip=document.createElement('div');tip.className='tip';tip.hidden=true;tip.setAttribute('role','tooltip');document.body.appendChild(tip);
  const SEN=s=>s.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỸĐ0-9"(])/u).filter(Boolean);
  /* Ô nghĩa: câu chính. 1 ý phụ thì là đoạn xám, từ 2 ý phụ mới thành gạch đầu dòng */
  const FMT=(s,mk)=>{const p=SEN(s).map(x=>RF(x,mk||(y=>y)));return p.length<2?`<p class="d1">${p[0]||''}</p>`:p.length===2?`<p class="d1">${p[0]}</p><p class="d2">${p[1]}</p>`:`<p class="d1">${p[0]}</p><ul class="d2">${p.slice(1).map(x=>`<li>${x}</li>`).join('')}</ul>`};
  const SENSES=(t,mk)=>t.s2&&t.s2.length?`<span class="two">Có ${t.s2.length+1} nghĩa</span><div class="sense"><b><i>1</i>${t.dl||'Nghĩa chung'}</b>${FMT(t.d,mk)}</div>`+t.s2.map((x,k)=>`<div class="sense"><b><i>${k+2}</i>${x[0]}</b>${FMT(x[1],mk)}</div>`).join(''):FMT(t.d,mk);
  function show(el){const t=TERMS[+el.dataset.t];if(!t)return;tip.innerHTML=`<b>${name(t)}</b><span class="fwb">${t.fw||'Agile chung'}</span><i>${t.vi}</i>${SENSES(t)}${NAMES(t)}<small>${t.home?'Giải thích chính ở '+LB(t.home)+'. ':''}${t.x?'Ngoài slide. ':''}Bấm để mở Glossary</small>`;tip.hidden=false;
    const r=el.getBoundingClientRect(),tw=tip.offsetWidth;let x=r.left+scrollX;if(x+tw>innerWidth-12)x=innerWidth-12-tw;tip.style.left=x+'px';tip.style.top=(r.bottom+scrollY+6)+'px'}
  const showTip=el=>{tip.innerHTML=el.dataset.tip;tip.hidden=false;const r=el.getBoundingClientRect(),tw=tip.offsetWidth;let x=r.left+scrollX;if(x+tw>innerWidth-12)x=innerWidth-12-tw;tip.style.left=x+'px';tip.style.top=(r.bottom+scrollY+6)+'px'};
  /* Cảm ứng: chạm không có "rê chuột ra", tooltip sẽ đọng lại đè lên lớp phủ vừa mở (#95). Nên chỉ hiện khi rê chuột thật hoặc Tab bằng bàn phím; chạm, bấm, cuộn đều ẩn */
  let touch=false;document.addEventListener('pointerdown',e=>{touch=e.pointerType!=='mouse';tip.hidden=true},true);document.addEventListener('pointermove',e=>{if(e.pointerType==='mouse')touch=false},{passive:true});/* laptop cảm ứng: chạm rồi rê chuột vẫn có tooltip */
  document.addEventListener('mouseover',e=>{if(touch)return;const d=e.target.closest('[data-tip]');if(d)showTip(d)});document.addEventListener('mouseout',e=>{if(e.target.closest('[data-tip]'))tip.hidden=true});
  document.addEventListener('focusin',e=>{const d=e.target.closest('[data-tip]');if(d&&d.matches(':focus-visible'))showTip(d)});
  document.addEventListener('click',()=>{tip.hidden=true},true);document.addEventListener('scroll',()=>{tip.hidden=true},{capture:true,passive:true});
  /* Thuật ngữ: cùng luật với [data-tip] ở trên. Chạm thì mở Glossary, không hiện tooltip; focus trả về sau khi đóng Glossary không phải bàn phím nên không hiện (#116, góp ý PO 26/11) */
  document.addEventListener('mouseover',e=>{if(touch)return;const d=e.target.closest('[data-t]');if(d)show(d)});
  document.addEventListener('mouseout',e=>{if(e.target.closest('[data-t]'))tip.hidden=true});
  document.addEventListener('focusin',e=>{const d=e.target.closest('[data-t]');if(d&&d.matches(':focus-visible'))show(d)});document.addEventListener('focusout',()=>tip.hidden=true);
  // ngăn kéo
  const D=document.getElementById('glD'),B=document.getElementById('glBtn'),tb=document.querySelector('#glT tbody'),q=document.getElementById('glQ'),qx=document.getElementById('glX'),nE=document.getElementById('glN'),th=document.querySelector('#glT th[data-s]');
  let F='all',dir=1,hit=-1,SM='rel';const PP=document.getElementById('glP'),AZ=document.getElementById('glAZ'),KK=document.getElementById('glK');KK.onchange=()=>render();const OO=document.getElementById('glO');[...new Set(TERMS.flatMap(t=>(t.fw||'Agile chung').split(/,\s*/)))].sort((a,b)=>a==='Agile chung'?-1:b==='Agile chung'?1:a.localeCompare(b)).forEach(o=>OO.add(new Option(o,o)));OO.onchange=()=>render();window.GLO=o=>{OO.value=o;open();render()};
  const cK={in:TERMS.filter(t=>!t.x).length,ext:TERMS.filter(t=>t.x).length,two:TERMS.filter(t=>t.s2&&t.s2.length).length,home:TERMS.filter(t=>t.home).length,none:TERMS.filter(t=>!t.where.length).length};[...KK.options].forEach(o=>{if(cK[o.value]!==undefined)o.textContent+=` (${cK[o.value]})`});
  function render(){const s=q.value.trim().toLowerCase(),pp=PP.value,kk=KK.value;qx.hidden=!s;document.getElementById('glR').hidden=!(s||pp||kk||OO.value);
    const oo=OO.value;
    // điểm khớp: tên trùng hẳn > tên bắt đầu bằng > tên chứa > tên gọi khác chứa > nghĩa tiếng Việt > trong định nghĩa
    /* Độ khớp: trùng hẳn 100, tên chính bắt đầu bằng chữ gõ 90, viết tắt 85, alias 75, 1 từ trong tên chính bắt đầu bằng chữ gõ 65, tên chính chứa chữ gõ 60.
       Cùng mức thì tên ngắn trước (gần chữ gõ hơn), rồi tới A tới Z */
    const score=t=>{if(!s)return 0;const tn=t.t.toLowerCase(),nm=[t.t,t.ab,...t.all].filter(Boolean).map(x=>x.toLowerCase());if(nm.includes(s))return 100;if(tn.startsWith(s))return 90;if((t.ab||'').toLowerCase().startsWith(s))return 85;if(nm.some(x=>x.startsWith(s)))return 75;if(tn.split(/[\s/-]+/).some(w=>w.startsWith(s)))return 65;if(tn.includes(s))return 60;if(nm.some(x=>x.includes(s))||(t.syn||'').toLowerCase().includes(s)||(t.old||[]).some(o=>o[0].toLowerCase().includes(s)))return 50;if(t.vi.toLowerCase().includes(s))return 40;if([t.d,t.fw,...(t.s2||[]).flat()].join(' ').toLowerCase().includes(s))return 10;return -1};
    const kind=t=>kk===''||(kk==='old'&&t.old&&t.old.length)||(kk==='in'&&!t.x)||(kk==='ext'&&t.x)||(kk==='two'&&t.s2&&t.s2.length)||(kk==='home'&&t.home)||(kk==='none'&&!t.where.length);
    const list=TERMS.map((t,i)=>[i,score(t)]).filter(([i,sc])=>{const t=TERMS[i];return sc>=0&&(!oo||(t.fw||'Agile chung').split(/,\s*/).includes(oo))&&kind(t)&&(pp===''||t.where.some(w=>w[1]===pp))}).sort((a,b)=>s&&SM==='rel'?(b[1]-a[1])||(TERMS[a[0]].t.length-TERMS[b[0]].t.length)||TERMS[a[0]].t.localeCompare(TERMS[b[0]].t):dir*TERMS[a[0]].t.localeCompare(TERMS[b[0]].t));
    const esc2=x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),re=s?new RegExp('('+esc2(s)+')','gi'):null,mk=x=>re?x.replace(re,'<mark>$1</mark>'):x;
    let L='',html='';const letters=new Set();let grp='';
    list.forEach(([i,sc],n)=>{const t=TERMS[i],l=t.t[0].toUpperCase();letters.add(l);
      /* Khi tìm: chỉ xếp theo độ khớp, không chia nhóm, vì chữ khớp đã tô vàng ngay trong dòng */
      if(!s&&l!==L){L=l;html+=`<tr class="lt" id="gl-${l}"><td colspan="4">${l}</td></tr>`}
      html+=`<tr data-i="${i}"><td><b>${mk(t.t)}</b>${t.vi&&t.vi!==t.t?`<span class="vi">${mk(t.vi)}</span>`:''}${t.ab?`<span class="ab">viết tắt: <b>${mk(t.ab)}</b></span>`:''}${t.x?' <span class="ic ext" title="Ngoài slide"><svg><use href="#i-plus"/></svg></span>':''}</td><td>${SENSES(t,mk)}${NAMES(t,mk)}</td><td class="fwk">${(t.fw||'Agile chung').split(/,\s*/).map(o=>`<button type="button" class="fwb fwf" data-o="${o}" title="Chỉ hiện thuật ngữ có nguồn gốc ${o}">${o}</button>`).join('')}</td><td>${t.where.length?'<div class="pills">'+t.where.map(id=>`<a href="#${id}" class="${id===t.home?'home':''}" title="${id===t.home?'Giải thích chính: ':''}${LB(id,1)}">${LB(id)}</a>`).join('')+'</div>':'<span class="muted sm">chưa có trong file</span>'}</td></tr>`});
    tb.innerHTML=html;if(hit>=0){const r=tb.querySelector(`tr[data-i="${hit}"]`);hit=-1;if(r)HL([r])}
    AZ.innerHTML='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l=>`<button type="button" ${letters.has(l)?'':'disabled'} data-l="${l}">${l}</button>`).join('');
    nE.textContent=CNT(list.length,TERMS.length)}
  AZ.addEventListener('click',e=>{const b=e.target.closest('[data-l]');if(!b)return;const r=document.getElementById('gl-'+b.dataset.l);r&&r.scrollIntoView({block:'start'})});
  PP.addEventListener('change',()=>{hit=-1;render()});
  function open(i){D.hidden=false;B.setAttribute('aria-expanded',true);if(i!=null){q.value='';PP.value='';OO.value='';KK.value='';hit=i}render();
    if(i!=null){const r=tb.querySelector(`tr[data-i="${i}"]`);r&&r.scrollIntoView({block:'center'})}else AUTOFOCUS(q)}
  function close(){D.hidden=true;B.setAttribute('aria-expanded',false);hit=-1}
  /* Khi tìm: mặc định xếp theo độ khớp. Bấm tiêu đề cột thì xếp A tới Z, bấm lần nữa Z tới A, lần nữa về độ khớp */
  const thl=()=>{const s=q.value.trim();th.innerHTML='Thuật ngữ <span class="srt" title="Bấm để đổi cách sắp xếp">⇅ '+(s&&SM==='rel'?'theo độ khớp':dir>0?'A tới Z':'Z tới A')+'</span>';th.setAttribute('aria-sort',s&&SM==='rel'?'none':dir>0?'ascending':'descending')};
  th.onclick=()=>{const s=q.value.trim();if(s&&SM==='rel'){SM='az';dir=1}else if(s&&dir<0){SM='rel';dir=1}else dir=-dir;thl();render()};
  q.addEventListener('input',()=>{hit=-1;SM='rel';dir=1;thl();render();const sc=document.querySelector('#glD .dr-b');if(sc)sc.scrollTop=0});qx.onclick=()=>{q.value='';render();q.focus()};document.getElementById('glR').onclick=()=>{q.value='';PP.value='';KK.value='';OO.value='';hit=-1;render();q.focus()};
  B.onclick=()=>D.hidden?open():close();document.getElementById('glClose').onclick=close;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!D.hidden)close()});
  document.addEventListener('click',e=>{const d=e.target.closest('[data-t]');if(d){open(+d.dataset.t);return}
    const o=e.target.closest('[data-open="gl"]');if(o){e.preventDefault();open()}
    const dt=e.target.closest('[data-term]');if(dt){const n=dt.dataset.term.toLowerCase().replace(/ \(.*\)$/,'');let k=TERMS.findIndex(t=>t.t.toLowerCase()===n||(t.ab&&t.ab.toLowerCase()===n));if(k<0)k=TERMS.findIndex(t=>t.all.some(a=>a.toLowerCase()===n));if(k<0)k=TERMS.findIndex(t=>t.t.toLowerCase().startsWith(n));if(k>=0){e.stopPropagation();open(k)}return}
    if(!D.hidden&&e.target.closest('#glT .pills a'))close();
    if(!D.hidden&&e.target.isConnected&&!D.contains(e.target)&&!e.target.closest('#glBtn'))close()});
  window.GL={open,close};
})();
/* ---------- CHÚ GIẢI NỔI ---------- */
(function(){const b=document.getElementById('lgBtn'),pop=document.getElementById('lgPop'),tpl=document.getElementById('lgTpl');if(!b)return;
  document.getElementById('lgB').innerHTML=tpl.innerHTML;document.getElementById('lgClose').onclick=e=>{e.stopPropagation();set(false)};
  const set=o=>{pop.hidden=!o;b.setAttribute('aria-expanded',o)};
  b.onclick=e=>{e.stopPropagation();set(pop.hidden)};
  document.querySelectorAll('[data-open="lg"]').forEach(x=>x.onclick=e=>{e.stopPropagation();set(true)});
  document.addEventListener('click',e=>{if(!pop.hidden&&e.target.isConnected&&!pop.contains(e.target))set(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});})();
/* ---------- FOCUS KHI MỞ, ĐÓNG LỚP PHỦ ----------
   Mọi lớp phủ (Glossary, Danh mục, Chú giải) theo 1 cách: khi đóng, focus về đúng chỗ trước khi mở (nút đã bấm, ô đang gõ).
   Mở bằng phím tắt khi không có gì đang focus thì khi đóng cũng không focus gì, nên không hiện viền focus lạ */
(function(){let last=null;document.addEventListener('focusin',e=>{if(!e.target.closest('.drawer'))last=e.target},true);
  document.addEventListener('pointerdown',e=>{if(!e.target.closest('.drawer,button,a,input,select,textarea,[tabindex]'))last=null},true);
  const mo=new MutationObserver(ms=>ms.forEach(m=>{const d=m.target;if(!d.hidden)return;if(!d.contains(document.activeElement)&&document.activeElement!==document.body)return;
    if(last&&last!==document.body&&document.contains(last)&&!last.closest('.drawer'))last.focus({preventScroll:true});else if(document.activeElement)document.activeElement.blur()}));
  document.querySelectorAll('.drawer').forEach(d=>mo.observe(d,{attributes:true,attributeFilter:['hidden']}))})();
/* ---------- ĐIỀU HƯỚNG: QUAY LẠI, TIẾN LÊN, LỚP PHỦ ----------
   Dùng lịch sử của trình duyệt: mỗi lần bấm liên kết trong trang là 1 bước, nên nút Quay lại trên trang, nút back và forward của trình duyệt
   hay của chuột, phím b đều đi cùng 1 đường. Mỗi bước lưu vị trí cuộn và lớp phủ đang mở (Glossary, Danh mục, Chú giải) cùng bộ lọc của nó.
   Bấm liên kết trong lớp phủ: đóng lớp phủ rồi mới nhảy. Quay lại: mở lại đúng lớp phủ, đúng chữ tìm, bộ lọc, chỗ cuộn.
   Nhãn nút nói nơi sẽ quay về: "Về 5.5 Risk Management", "Về Glossary", "Về Ví dụ xuyên suốt", "Về Mục lục" */
(function(){const c=document.getElementById('backChip');try{history.scrollRestoration='manual'}catch(e){}
  const rep=s=>{try{history.replaceState(s,'')}catch(e){}};
  const DL={glD:'Glossary',fgD:'Danh mục hình và bảng',lgPop:'Chú giải'};
  const secLabel=sec=>{const n=sec.querySelector('.card-head .num'),h=sec.querySelector('.card-head h3');return (n?n.textContent.trim()+' ':'')+(h?h.textContent.trim():'')};
  const where=(el,y)=>{if(el&&el.closest){if(el.closest('#vd-shop'))return 'Ví dụ xuyên suốt';if(el.closest('#tong-quan'))return 'Mục lục';const s=!el.closest('nav.top')&&el.closest('.card[id^="s"]');if(s)return secLabel(s)}
    let best=null;document.querySelectorAll('.card[id^="s"],#vd-shop,#tong-quan').forEach(e=>{if(e.getBoundingClientRect().top+scrollY<=y+140)best=e});
    return best?(best.id==='vd-shop'?'Ví dụ xuyên suốt':best.id==='tong-quan'?'Mục lục':secLabel(best)):'đầu trang'};
  const opened=()=>[...document.querySelectorAll('.drawer')].find(d=>!d.hidden);
  const dstate=d=>({id:d.id,v:[...d.querySelectorAll('input[id],select[id]')].map(x=>[x.id,x.value]),seg:[...d.querySelectorAll('.seg:not(.segsel) button[aria-checked="true"]')].map(b=>b.dataset.k),st:(d.querySelector('.dr-b,#fgL,.lg-b')||d).scrollTop});
  const closeD=d=>{if(d.id==='glD'&&window.GL)GL.close();else{const b=document.querySelector(`[aria-controls="${d.id}"]`);if(b&&!d.hidden)b.click();if(!d.hidden)d.hidden=true}};
  const openD=st=>{const d=document.getElementById(st.id);if(!d)return;if(d.hidden){if(st.id==='glD'&&window.GL)GL.open();else{const b=document.querySelector(`[aria-controls="${st.id}"]`);b&&b.click()}}
    st.v.forEach(([id,v])=>{const x=document.getElementById(id);if(x&&x.value!==v){x.value=v;x.dispatchEvent(new Event(x.tagName==='SELECT'?'change':'input',{bubbles:true}))}});
    st.seg.forEach(k=>{const b=d.querySelector(`.seg:not(.segsel) button[data-k="${k}"]`);b&&b.click()});
    setTimeout(()=>{const sc=d.querySelector('.dr-b,#fgL,.lg-b')||d;sc.scrollTop=st.st},30)};
  const show=()=>{const s=history.state;if(s&&s.from){c.innerHTML=BI('back')+'Về '+s.from;c.hidden=false}else c.hidden=true};
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.getAttribute('href')==='#'||e.defaultPrevented)return;
    const d=a.closest('.drawer');const y=scrollY;const from=d?DL[d.id]:where(a,y);
    rep({...(history.state||{}),y,ds:d?dstate(d):null});
    if(d)closeD(d);
    if(location.hash===a.hash)return;
    setTimeout(()=>{if(from)rep({from,fy:y,y:scrollY});show()},0);
    /* chờ cuộn xong (cuộn mượt) rồi ghi vị trí đích vào bước mới */
    let last=-1,n=0;const iv=setInterval(()=>{n++;if(scrollY===last||n>30){clearInterval(iv);const s=history.state||{};rep({...s,y:scrollY})}last=scrollY},120)},true);
  addEventListener('popstate',e=>{const s=e.state||{};const d=opened();if(d&&!(s.ds&&s.ds.id===d.id))closeD(d);
    if(s.ds)openD(s.ds);const H=document.documentElement;H.style.scrollBehavior='auto';if(s.y!=null)[0,60].forEach(t=>setTimeout(()=>scrollTo({top:s.y,behavior:'instant'}),t));setTimeout(()=>H.style.scrollBehavior='',200);show()});
  c.onclick=()=>history.back();
  /* Cập nhật vị trí cuộn của bước hiện tại khi ngừng cuộn, để back hay forward về đúng chỗ */
  let tm;addEventListener('scroll',()=>{clearTimeout(tm);tm=setTimeout(()=>{const s=history.state||{};rep({...s,y:scrollY});if(s.from&&s.fy!=null)c.hidden=Math.abs(scrollY-s.fy)<120},150)},{passive:true});
  show()})();
/* ---------- CFD: từng cách đọc ---------- */
(function(){const how=document.querySelector('.how');if(!how||!window.CFD)return;const cards=[...how.querySelectorAll('[data-k]')],D={1:19,2:14,3:14,4:14};
  function pick(k){how.classList.add('focus');cards.forEach(c=>c.classList.toggle('on',+c.dataset.k===k));CFD.show(D[k],k)}
  function clear(){how.classList.remove('focus');cards.forEach(c=>c.classList.remove('on'));CFD.show(14,0)}
  cards.forEach(c=>{c.onclick=()=>{P.on&&P.stop();pick(+c.dataset.k)};c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();c.click()}}});
  const P=STEP('cPlay',[1,2,3,4].map(k=>({run:()=>pick(k),label:['Điểm tắc nghẽn','WIP','Lead Time, Cycle Time','Throughput'][k-1]})),{ms:3000});})();
/* ---------- 6.3: 5 câu hỏi ---------- */
(function(){const box=document.getElementById('ex5');if(!box)return;
  const X=[['Wireframe','khung dây','f-wf',[1,0,0],'Thấp: đen trắng, không nội dung thật','Không','Thống nhất bố cục, thứ tự thông tin. Làm rất nhanh','Team, Product Owner'],
    ['Mockup','bản mô phỏng giao diện','f-mu',[1,1,1],'Cao','Không, vẫn là ảnh tĩnh','Duyệt giao diện hình ảnh: màu, chữ, hình','Team, Product Owner, Customer'],
    ['Prototype','nguyên mẫu','f-pt',[1,2,2],'Thấp đến cao, tuỳ mục đích','Có, mô phỏng luồng đi giữa các màn hình','Thử luồng sử dụng với End User, lấy phản hồi sớm trước khi xây thật','End User thử'],
    ['Proof of Concept (PoC)','bằng chứng khái niệm','f-poc',[0,0,0],'Không quan trọng. Chỉ làm đúng phần đang có Risk, nên có giao diện thô nếu Risk nằm ở giao diện','Thường không','Chứng minh một ý tưởng kỹ thuật làm được. Làm bất kỳ lúc nào có Risk kỹ thuật, thường từ sớm, xong thì bỏ. Ví dụ khác: hiệu ứng thử áo 3D có chạy mượt trên điện thoại rẻ không, PoC này cần giao diện thô','Developers'],
    ['Minimum Viable Product (MVP)','sản phẩm khả dụng tối thiểu','f-mvp',[1,1,1],'Là Product thật, nhỏ nhất có thể','Đầy đủ cho Scope nhỏ','Phát hành cho End User thật để kiểm chứng có ai thật sự cần Product','Customer thật']];
  const Q=['Bố cục?','Đẹp chưa?','Đi hết luồng?','Kỹ thuật làm được?','Có ai cần?'];
  const seg=a=>'<span class="fsg">'+a.map(v=>`<i class="${v===1?'on':v===2?'mb':''}"></i>`).join('')+'</span>';
  const tabs=[...box.querySelectorAll('[role=tab]')],kv=document.getElementById('x5kv'),nm=document.getElementById('x5n');
  tabs.forEach((t,i)=>{const x=X[i];t.querySelector('span:last-child').insertAdjacentHTML('beforeend',`<em class="q5m">${seg(x[3])} ${x[5].startsWith('Có')||x[5].startsWith('Đầy')?'bấm được':'không bấm được'}</em>`)});
  function sel(i){const x=X[i];tabs.forEach((t,k)=>{t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});
    box.querySelectorAll('.figs5>div').forEach(d=>d.classList.toggle('on',d.id===x[2]));
    nm.innerHTML=`${x[0]} <span class="en">(${x[1]})</span>`;
    kv.innerHTML=`<dt>Trả lời câu hỏi</dt><dd>${tabs[i].querySelector('span:last-child').firstChild.textContent}</dd><dt>Độ giống thật</dt><dd>${seg(x[3])}${x[4]}</dd><dt>Bấm được</dt><dd>${x[5]}</dd><dt>Để làm gì</dt><dd>${x[6]}</dd><dt>Ai dùng</dt><dd>${x[7]}</dd>`}
  tabs.forEach((t,i)=>{t.onclick=()=>{P.on&&P.stop();sel(i)};t.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const j=(i+(e.key==='ArrowDown'?1:4))%5;tabs[j].focus();sel(j)}}});
  const P=STEP('xPlay',[0,1,2,3,4].map(i=>({run:()=>sel(i),label:X[i][0]})),{ms:3000});
  sel(0);})();

(function(){const p=document.getElementById('proto');if(!p)return;p.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(!b)return;e.preventDefault();e.stopPropagation();p.querySelectorAll('.ph').forEach(x=>x.classList.toggle('on',x.dataset.s===b.dataset.go))})})();

(function(){const b=document.getElementById('mvBuy');if(!b)return;let n=3;b.onclick=()=>{n++;document.getElementById('mvN').textContent=n;document.getElementById('mvK').textContent=n;document.getElementById('mvT').hidden=false}})();

(function(){const toc={};document.querySelectorAll('#tong-quan .mh').forEach(mh=>{const id=mh.getAttribute('href');const ol=mh.parentElement.querySelector('ol');if(ol)toc[id]=[...ol.querySelectorAll('a')].map(a=>[a.getAttribute('href'),a.querySelector('i').textContent.trim(),a.querySelector('span').textContent])});
  document.querySelectorAll('nav.top a.nv').forEach(a=>{const L=toc[a.getAttribute('href')];if(!L)return;const w=document.createElement('span');w.className='nvw';a.replaceWith(w);w.appendChild(a);
    const d=document.createElement('div');d.className='nvd';d.innerHTML=L.map(([h,n,t])=>`<a href="${h}"><i>${n==='•'?'':n}</i><span>${t}</span></a>`).join('');w.appendChild(d)})})();

/* Biểu tượng (⊕, Minh hoạ, Tương tác, Định nghĩa, Lưu ý ngoài slide): ở đâu cũng cùng 1 cách: rê chuột hiện giải thích ngay, bấm mở Chú giải và tô dòng tương ứng */
(function(){const pop=document.getElementById('lgPop'),b=document.getElementById('lgBtn');if(!pop||!b)return;
  const KS=[['ic ext','.ic.ext,.nt-i[aria-label="Ngoài slide"],.svext'],['ic demo','.ic.demo'],['ic try','.ic.try'],['def-i','.def-i']];
  const row=k=>{const s=pop.querySelector('.lg>span.'+k.split(' ').join('.'));return s&&s.closest('.lg')};
  const apply=()=>{KS.forEach(([k,sel])=>{const r=row(k);if(!r)return;const name=r.querySelector('b').textContent,desc=r.querySelector('.lg-d').textContent;
    document.querySelectorAll(sel).forEach(el=>{if(el.closest('#lgPop,template'))return;el.removeAttribute('title');el.dataset.tip=`<b>${name}</b><p>${desc}</p>${el.closest('.drawer')?'':'<p>Bấm để mở Chú giải</p>'}`;el.dataset.lgk=k;if(!el.closest('.drawer')){el.setAttribute('tabindex','0');el.setAttribute('role','button')}})});};apply();new MutationObserver(apply).observe(document.querySelector('#glT tbody')||document.body,{childList:true,subtree:true});
  const go=el=>{if(el.closest('.drawer'))return;if(pop.hidden)b.click();const r=row(el.dataset.lgk);if(r){pop.querySelectorAll('.lg.hit').forEach(x=>x.classList.remove('hit'));void r.offsetWidth;r.classList.add('hit');r.addEventListener('animationend',()=>r.classList.remove('hit'),{once:true});r.scrollIntoView({block:'nearest'})}};
  document.addEventListener('click',e=>{const el=e.target.closest('[data-lgk]');if(el){e.stopPropagation();go(el)}},true);
  document.addEventListener('keydown',e=>{const el=e.target.closest&&e.target.closest('[data-lgk]');if(el&&(e.key==='Enter'||e.key===' ')){e.preventDefault();go(el)}});
})();
/* Shop Áo Gió: liên kết lần nhắc đầu tiên trong mỗi mục về khung câu chuyện, và liệt kê các mục có dùng */
(function(){const box=document.getElementById('vdWhere');if(!box)return;const RE=/Shop Áo Gió|Website Gió|PayNhanh|chị Lan|anh Minh|anh Tuấn|\bHuy\b|dòng áo|áo khoác gió|thẻ đã lưu/;const ids=[];
  document.querySelectorAll('[id]').forEach(sec=>{if(!/^s\d-\d+$/.test(sec.id))return;const cl=sec.cloneNode(true);cl.querySelectorAll('.nogio').forEach(x=>x.remove());if(RE.test(cl.textContent))ids.push(sec.id);
    const w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('a,dfn,button,svg,h3,.lbl,.ipan,.drawer,.nogio')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
    while(w.nextNode()){const n=w.currentNode,i=n.data.indexOf('Shop Áo Gió');if(i<0)continue;const mid=n.splitText(i);mid.splitText(11);const a=document.createElement('a');a.href='#vd-shop';a.className='vdl';a.innerHTML='<svg class="gm" aria-hidden="true"><use href="#i-gio"/></svg>Shop Áo Gió';a.title='Câu chuyện ví dụ xuyên suốt';mid.replaceWith(a);break}});
  box.innerHTML=ids.map(id=>`<a href="#${id}">${id.slice(1).replace('-','.')}</a>`).join('')})();

/* ---------- 1.6: System for Value Delivery (theo PMBOK 8, Hình 1-2, 2-2) ---------- */
let VPF=0;function drawVDS(){fig('f-vds',W,500,()=>{let g='';const PF='#fdf2f6';
  // 4 kiểu khối cố định: Portfolio (nền hồng nhạt, viền hồng), Program (nền trắng, viền xám hồng), Project (nền hồng), Operations (nền xám)
  const proj=(x,y,w,h,t,sub)=>R(x,y,w,h,C.pri[1],{rx:8,stroke:PMID})+T(x+12,y+22,t,{s:13.5,w:600,c:C.pri[2],a:'start'})+(sub?T(x+12,y+40,sub,{s:12,c:C.pri[2],a:'start'}):'');
  const chip=(x,y,w,t)=>R(x,y,w,30,C.pri[1],{rx:6,stroke:PMID})+T(x+w/2,y+19,t,{s:12,w:600,c:C.pri[2]});
  const prog=(x,y,w,h,t)=>R(x,y,w,h,'#fff',{rx:10,stroke:PMID})+T(x+12,y+21,t,{s:13.5,w:600,c:C.pri[2],a:'start'});
  const port=(x,y,w,h,t)=>R(x,y,w,h,PF,{rx:10,stroke:C.pri[0]})+T(x+12,y+21,t,{s:13.5,w:600,c:C.pri[2],a:'start'});
  const ops=(x,y,w,h,t)=>R(x,y,w,h,SOFT,{rx:8,stroke:FAINT})+T(x+12,y+22,t,{s:13.5,w:600,c:INK,a:'start'});
  const eb=(x,y,t,a='start',c=MUTE)=>T(x,y,t,{s:10.5,w:600,c,a,ls:.7});
  g+=R(0,0,1118,500,'#fff',{rx:14,stroke:FAINT,dash:1})+eb(18,22,'EXTERNAL ENVIRONMENT')+T(186,22,'kinh tế, cạnh tranh, pháp luật',{s:12,c:MUTE,a:'start'});
  g+=R(16,34,1086,452,SOFT,{rx:12})+eb(34,56,'INTERNAL ENVIRONMENT')+T(194,56,'chính sách, quy trình, phương pháp, cơ chế quản trị',{s:12,c:MUTE,a:'start'});
  g+=R(32,68,1054,404,'#fff',{rx:12,stroke:C.pri[0]})+eb(50,90,'SYSTEM FOR VALUE DELIVERY',C.pri[2]);
  // Chiến lược
  g+=R(48,100,974,40,C.pri[1],{rx:8})+eb(62,124,'STRATEGIC PLANNING',C.pri[2])+T(590,125,'Vision, Mission, Organizational Strategy and Objectives',{s:13.5,w:600,c:C.pri[2]});
  // Organizational Resources: dùng chung cho mọi thành phần
  g+=R(1036,100,34,346,SOFT,{rx:8,stroke:FAINT})+`<text x="1058" y="273" font-size="12" font-weight="600" fill="${INK2}" text-anchor="middle" transform="rotate(-90 1058 273)" font-family="inherit">Organizational Resources</text>`;
  // Portfolio có thẻ chọn kiểu thư mục
  const X0=48,X1=836,Y0=196,Y1=346,r=10,tw=104,tx=k=>64+k*(tw+6),ty=168;
  g+=A('M600 140V192','pri')+A('M939 140V192','pri')+T(592,174,'định hướng',{s:11.5,c:C.pri[2],a:'end'});
  g+=eb(X1-8,ty+19,'PORTFOLIO MANAGEMENT','end',C.pri[2]);
  ['A','B','C'].forEach((t,k)=>{if(k===VPF)return;const x=tx(k);g+=`<g data-pf="${k}" style="cursor:pointer" role="button" tabindex="0" aria-label="Xem Portfolio ${t}">`+`<path d="M${x} ${Y0}V${ty+8}Q${x} ${ty} ${x+8} ${ty}H${x+tw-8}Q${x+tw} ${ty} ${x+tw} ${ty+8}V${Y0}Z" fill="${SOFT}" stroke="${PMID}" stroke-width="1.5"/>`+T(x+tw/2,ty+19,'Portfolio '+t,{s:12.5,w:600,c:MUTE})+`</g>`});
  const sx=tx(VPF);
  g+=`<path d="M${sx} ${Y0}V${ty+8}Q${sx} ${ty} ${sx+8} ${ty}H${sx+tw-8}Q${sx+tw} ${ty} ${sx+tw} ${ty+8}V${Y0}H${X1-r}Q${X1} ${Y0} ${X1} ${Y0+r}V${Y1-r}Q${X1} ${Y1} ${X1-r} ${Y1}H${X0+r}Q${X0} ${Y1} ${X0} ${Y1-r}V${Y0+r}Q${X0} ${Y0} ${X0+r} ${Y0}H${sx}" fill="${PF}" stroke="${C.pri[0]}" stroke-width="1.5" stroke-linejoin="round"/>`;
  g+=`<g aria-current="true" aria-label="Portfolio đang xem">`+T(sx+tw/2,ty+19,'Portfolio '+'ABC'[VPF],{s:12.5,w:600,c:C.pri[2]})+`</g>`;
  g+=eb(62,Y0+20,'AUTHORIZED PROGRAMS AND PROJECTS (PROJECTIZED ACTIVITIES)');
  const y=Y0+32;
  if(VPF===0){g+=prog(62,y,300,104,'Program 1')+chip(76,y+44,132,'Project 1')+chip(216,y+44,132,'Project 2');
    g+=prog(374,y,268,104,'Program 2')+R(388,y+36,240,54,'#fff',{rx:8,stroke:PMID})+T(400,y+67,'Subprogram 2.1',{s:12.5,w:600,c:C.pri[2],a:'start'})+chip(512,y+48,102,'Project 3');
    g+=proj(654,y,168,104,'Project 4','');}
  else if(VPF===1){g+=prog(62,y,446,104,'Program 3')+chip(76,y+44,100,'Project 5')+chip(184,y+44,100,'Project 6')+chip(292,y+44,100,'Project 7')+chip(400,y+44,94,'Project 8');
    g+=port(520,y,302,104,'Subportfolio B1')+chip(534,y+44,132,'Project 9')+chip(676,y+44,132,'Project 10');}
  else {g+=proj(62,y,236,104,'Project 11','')+proj(310,y,236,104,'Project 12','')+ops(558,y,264,104,'Operations');}
  g+=proj(856,Y0,166,Y1-Y0,'Project 13','');
  // Operations and Products
  g+=R(48,378,974,42,SOFT,{rx:10,stroke:FAINT})+T(64,404,'Management of Operations and Products',{s:13.5,w:600,c:INK,a:'start'});
  [[300],[939]].forEach(([x])=>{g+=A(`M${x} ${Y1}V374`,'good',{w:2})+A(`M${x+40} 378V${Y1+4}`,'neu',{w:1.5})});
  g+=T(294,368,'Deliverable',{s:11.5,w:600,c:C.good[2],a:'end'})+T(346,368,'phản hồi',{s:11.5,c:MUTE,a:'start'});
  // Chuỗi tạo Value của cả hệ thống, PMBOK 8 mục 2.1.1
  g+=eb(62,452,'CẢ HỆ THỐNG TẠO RA');const ch=['Deliverable','Outcome','Benefit','Value'],cx=[300,470,630,780];
  ch.forEach((t,k)=>{g+=T(cx[k],452,t,{s:13,w:600,c:k===3?C.pri[2]:INK2});if(k<3)g+=A(`M${cx[k]+48} 448H${cx[k+1]-44}`,'neu',{w:1.5})});
  return g;},{label:'System for Value Delivery theo PMBOK 8'});}
drawVDS();
document.addEventListener('click',e=>{const t=e.target.closest('#f-vds [data-pf]');if(t){VPF=+t.dataset.pf;drawVDS()}});document.addEventListener('keydown',e=>{const t=e.target.closest&&e.target.closest('#f-vds [data-pf]');if(t&&(e.key==='Enter'||e.key===' ')){e.preventDefault();VPF=+t.dataset.pf;drawVDS()}});
fig('f-plc',W,452,()=>{let g='';const TOP=102,YB=404;
  // Portfolio và 2 Program bao các Project theo thời gian (PMBOK 8, The Standard, Figure 2-5)
  const ph=[[80,280,'Introduction','ra mắt'],[280,500,'Growth','tăng nhanh'],[500,760,'Maturity','ổn định'],[760,930,'Decline','nhu cầu giảm'],[930,1090,'Retirement','ngừng hẳn']];
  g+=R(80,0,1010,40,C.pri[2],{rx:8})+T(585,17,'Portfolio',{s:13,w:600,c:'#fff'})+T(585,33,'của khối Kinh doanh',{s:11.5,c:'#fde8ef'});
  g+=R(80,48,416,40,C.pri[1],{rx:8,stroke:C.pri[0]})+T(288,65,'Program A',{s:13,w:600,c:C.pri[2]})+T(288,81,'gồm Project 1 tới 3',{s:11.5,c:MUTE});
  g+=R(504,48,586,40,C.pri[1],{rx:8,stroke:C.pri[0]})+T(797,65,'Program B',{s:13,w:600,c:C.pri[2]})+T(797,81,'gồm Project 4 tới 7',{s:11.5,c:MUTE});
  ph.forEach(([a,b,t,s],k)=>{g+=R(a,TOP,b-a,YB-TOP,k%2?'#fff':SOFT,{rx:0})+T((a+b)/2,TOP+20,t,{s:12.5,w:600,c:INK2})+T((a+b)/2,TOP+36,s,{s:11.5,c:MUTE})});
  g+=Ln(`M500 92V${YB}`,INK2,1.2,'5 4');
  g+=`<path d="M82 398C170 394 220 378 280 358S440 288 560 286S700 292 760 314S880 380 930 390S1040 396 1086 398" fill="none" stroke="${C.pri[0]}" stroke-width="2.5"/>`+T(632,312,'Product: Website Gió',{s:12.5,w:600,c:C.pri[2]});
  const P=[[90,270,0,'Project 1','làm mới'],[288,430,0,'Project 2','thêm Feature'],[350,492,1,'Project 3','bổ sung'],[506,622,0,'Project 4','sửa đổi'],[566,692,1,'Project 5','sửa đổi'],[636,752,0,'Project 6','sửa đổi'],[940,1082,0,'Project 7','cho ngừng']];
  P.forEach(([a,b,l,t,sub])=>{const y=TOP+52+l*48;g+=R(a,y,b-a,40,'#fff',{rx:8,stroke:C.po[0]})+T((a+b)/2,y+17,t,{s:12.5,w:600,c:C.po[2]})+T((a+b)/2,y+33,sub,{s:11.5,c:MUTE})});
  g+=A(`M80 ${YB}H1104`,'neu',{w:1.5})+A(`M80 ${YB}V${TOP-6}`,'neu',{w:1.5})+T(585,YB+30,'Thời gian',{s:12,c:MUTE})+T(62,(TOP+YB)/2,'Mức dùng, doanh số, tác động',{s:12,c:MUTE,rot:-90});
  return g;},{label:'Một Product qua nhiều Project, có thể chạy song song, gom vào Program và Portfolio'});
fig('f-vflow',W,250,()=>{let g='';const bw=220,xs=[0,299,598,898],N=['Senior Leadership','Portfolios','Programs and Projects','Operations and Products'],S=['','','',''];
  g+=A('M0 12H44','pri',{w:1.75})+T(54,16,'Chiến lược và kết quả mong muốn, đi xuống',{s:12,c:C.pri[2],a:'start'})+A('M400 12H356','neu',{w:1.5})+T(410,16,'Thông tin hiệu quả, đi ngược lên để mỗi tầng điều chỉnh',{s:12,c:MUTE,a:'start'});
  g+=`<g transform="translate(0,34)">`;
  xs.forEach((x,i)=>g+=box(x,70,bw,56,i===3?'neu':'pri',N[i],S[i],{fill:i===3?SOFT:C.pri[1],stroke:i===3?FAINT:PMID,ts:14}));
  const F=[['Strategy',''],['Outcome, Benefit, Value','mong muốn'],['Deliverable kèm thông tin','hỗ trợ, bảo trì']],B=[['Thông tin hiệu quả','của Portfolio'],['Thông tin hiệu quả','và tiến độ'],['Thông tin để cập nhật,','sửa lỗi, điều chỉnh']];
  for(let i=0;i<3;i++){const a=xs[i]+bw,b=xs[i+1],c=(a+b)/2;
    g+=A(`M${a+4} 86H${b-4}`,'pri',{w:1.75})+T(c,34,F[i][0],{s:12,w:600,c:C.pri[2]})+T(c,50,F[i][1],{s:12,c:C.pri[2]});
    g+=A(`M${b-4} 110H${a+4}`,'neu',{w:1.5})+T(c,146,B[i][0],{s:12,c:MUTE})+T(c,162,B[i][1],{s:12,c:MUTE});}
  g+=A('M1008 126V196H110V132','neu',{w:1.5,dash:1})+T(559,212,'Phân tích Outcome, Benefit, Value thực tế quay về lãnh đạo',{s:12,c:MUTE,halo:true});
  g+=`</g>`;
  return g;},{label:'Dòng thông tin trong hệ thống tạo Value'});

document.addEventListener('click',e=>{const b=e.target.closest('.fwf,.fwc .fwb');if(b&&window.GLO){e.stopPropagation();GLO(b.dataset.o||b.textContent)}},true);
document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();const d=document.getElementById('glD');if(d.hidden)document.getElementById('glBtn').click();else document.getElementById('glQ').focus()}});


/* ---------- Tô sáng điểm đến: giữ tới khi cuộn ra khỏi màn hình ---------- */
/* Tô sáng khi nhảy tới: vầng sáng mờ dần trong 2,6 giây, không để lại viền. Mã hình đang xem giữ nền hồng tới khi nhảy chỗ khác, để biết mình đang ở đâu */
/* Quầng tô sáng bám đúng khung nhìn thấy của hình (#86). Khung vẽ trong SVG (1 rect gần bằng cả hình, có nét viền): đặt quầng vào đúng rect đó, bo góc theo rx đã quy đổi. Không có thì quầng theo khung CSS của phần tử, giữ bo góc của nó */
/* Quầng là 1 lớp riêng trên trang (dùng cho hình cuộn ngang): quầng vẽ trong hình bị khung cuộn cắt, vẽ ở viền ngoài thì bao cả thanh cuộn (#102, #105) */
function HLOV(el,L,T,R,B,rl,rr){el.classList.add('hlsc');const o=document.createElement('div');o.className='hl-ov';Object.assign(o.style,{left:(L+scrollX)+'px',top:(T+scrollY)+'px',width:(R-L)+'px',height:(B-T)+'px',borderRadius:`${rl}px ${rr}px ${rr}px ${rl}px`});
  document.querySelectorAll('.hl-ov').forEach(x=>x.remove());document.body.appendChild(o);o.addEventListener('animationend',()=>o.remove(),{once:true})}
function HLFIT(el){el.classList.remove('hlin','hlsc');const rad=HLRAD(el);el.style.setProperty('--hlrad',rad);const hb=el.getBoundingClientRect();
  /* hình cuộn ngang: vùng thấy = vùng nội dung, không gồm thanh cuộn */
  const scr=el.scrollWidth>el.clientWidth+2,cl=hb.left+el.clientLeft,ct=hb.top+el.clientTop,cr=cl+el.clientWidth,cb=ct+el.clientHeight;
  const s=el.querySelector(':scope svg.fig');
  /* khung = 1 rect có viền gần bằng cả hình, hoặc vài rect cao gần bằng hình đặt cạnh nhau (4.3-3: 2 khung) — lấy hộp bao của chúng (#92) */
  const tall=s?[...s.querySelectorAll('rect')].filter(r=>{const b=r.getBoundingClientRect();return b.height>=hb.height*0.85&&(r.getAttribute('stroke')||'none')!=='none'}):[];
  if(!tall.length){if(scr){const r=parseFloat(rad)||0;HLOV(el,cl,ct,cr,cb,r,r)}return}
  const U=tall.map(r=>r.getBoundingClientRect()),b={left:Math.min(...U.map(u=>u.left)),top:Math.min(...U.map(u=>u.top)),right:Math.max(...U.map(u=>u.right)),bottom:Math.max(...U.map(u=>u.bottom))};if(!scr&&b.right-b.left<hb.width*0.9)return;const fr=tall[0];
  const k=s.getBoundingClientRect().width/(s.viewBox.baseVal.width||s.getBoundingClientRect().width),rx=(+fr.getAttribute('rx')||0)*k;
  if(scr){HLOV(el,Math.max(b.left,cl),Math.max(b.top,ct),Math.min(b.right,cr),Math.min(b.bottom,cb),b.left>=cl-1?rx:0,b.right<=cr+1?rx:0);return}
  el.style.setProperty('--hlt',(b.top-hb.top)+'px');el.style.setProperty('--hll',(b.left-hb.left)+'px');el.style.setProperty('--hlr',(hb.right-b.right)+'px');el.style.setProperty('--hlb',(hb.bottom-b.bottom)+'px');el.style.setProperty('--hlrad',rx+'px');el.classList.add('hlin')}
/* Bo góc của quầng: khung của chính phần tử nếu có; không có khung thì lấy bo góc của khối con nằm ở góc trên trái (thẻ, ô của hình), để quầng ôm theo các góc nhìn thấy. Không tìm được: 10px (#89) */
function HLRAD(el){const vis=e=>{const c=getComputedStyle(e);return c.borderTopWidth!=='0px'||(c.backgroundColor!=='rgba(0, 0, 0, 0)'&&!e.classList.contains('sc-x'))||c.boxShadow!=='none'};if(vis(el))return getComputedStyle(el).borderRadius;
  const hb=el.getBoundingClientRect();for(const e of el.querySelectorAll('*')){if(e.closest('svg'))continue;const b=e.getBoundingClientRect();if(Math.abs(b.left-hb.left)<3&&Math.abs(b.top-hb.top)<3&&b.width>20&&vis(e))return getComputedStyle(e).borderRadius;if(b.top-hb.top>3)break}return '10px'}
window.HL=(function(){let cur=[];const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.25){const el=e.target;io.unobserve(el);el.classList.remove('hit');void el.offsetWidth;HLFIT(el);el.classList.add('hit');el.addEventListener('animationend',()=>el.classList.remove('hit'),{once:true})}}),{threshold:[.25,.5]});
  return els=>{cur.forEach(e=>{e.classList.remove('hit');io.unobserve(e)});cur=els.filter(Boolean);cur.forEach(e=>setTimeout(()=>io.observe(e),60))}})();
/* Mọi liên kết trong trang nhảy tới 1 khối cụ thể (không phải cả mục) đều được tô sáng khi tới nơi */
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1);if(!id||/^s\d-\d+$|^phan-|^toc$/.test(id))return;const t=document.getElementById(id);if(t&&!t.closest('.drawer'))setTimeout(()=>HL([t]),30)});
/* ---------- Mã hình, bảng và danh mục ---------- */
(function(){const items=[];const cnt={};
  document.querySelectorAll('[data-cap]').forEach(el=>{const sec=el.closest('.card[id^="s"]'),pt=el.closest('section.part[id^="phan-"]');if(!sec&&!pt)return;/* hình ngay dưới tiêu đề Phần, không thuộc mục nào: Hình 4-1 */const n=sec?sec.querySelector('.card-head .num').textContent.trim():pt.id.split('-')[1];const k=el.dataset.ck==='b'?'b':'h';const key=n+k;cnt[key]=(cnt[key]||0)+1;
    const code=(k==='b'?'Bảng ':'Hình ')+n+'-'+cnt[key];const id=k+n.replace('.','-')+'-'+cnt[key];if(!el.id)el.id=id;else if(el.id!==id&&!document.getElementById(id)){const a=document.createElement('span');a.id=id;a.className='fanc';el.before(a)}
    const c=document.createElement('div');c.className='fcap';c.innerHTML='<b>'+code+'</b><span>'+el.dataset.cap+'</span>';let host=el;while(host.parentElement&&!host.parentElement.classList.contains('card')&&/grid|flex/.test(getComputedStyle(host.parentElement).display))host=host.parentElement;if(host.nextElementSibling&&host.nextElementSibling.classList.contains('keyrow'))host=host.nextElementSibling;host.after(c);el._fcap=c;c._host=el;
    items.push({k,code,name:el.dataset.cap,sec:n,id:el.id,part:n.split('.')[0]})});
  const alignCaps=()=>document.querySelectorAll('.fcap').forEach(c=>{const el=c._host;if(!el)return;const s=el.matches('[id^="f-"]')?el.querySelector('svg.fig'):null;c.style.paddingLeft='0';const box=(s||el).getBoundingClientRect(),base=c.getBoundingClientRect().left;c.style.paddingLeft=Math.max(0,Math.round(box.left-base))+'px'});
  alignCaps();window.addEventListener('resize',alignCaps);window.addEventListener('load',alignCaps);
  const D=document.getElementById('fgD'),B=document.getElementById('fgBtn'),L=document.getElementById('fgL'),Q=document.getElementById('fgQ'),N=document.getElementById('fgN');let kind='';
  const PN={1:'Phần 1',2:'Phần 2',3:'Phần 3',4:'Phần 4',5:'Phần 5',6:'Phần 6, Phụ lục'};
  const FP=document.getElementById('fgP');FP.onchange=()=>render();
  const fscore=(it,q)=>{if(!q)return 0;const nm=it.name.toLowerCase(),cd=it.code.toLowerCase(),num=cd.replace(/^(hình|bảng) /,'');if(cd===q||num===q)return 100;if(nm===q)return 95;if(nm.startsWith(q))return 80;if(nm.includes(q))return 60;if(cd.includes(q))return 50;return -1};
  const WHY={100:'Khớp mã',95:'Khớp tên',80:'Khớp đầu tên',60:'Khớp trong tên',50:'Khớp trong mã'};
  const render=()=>{const q=(Q.value||'').trim().toLowerCase(),pp=FP.value;document.getElementById('fgX').hidden=!q;document.getElementById('fgR').hidden=!(q||kind||pp);let html='',last='',n=0;
    let list=items.map(it=>[it,fscore(it,q)]).filter(([it,sc])=>sc>=0&&(!kind||it.k===kind)&&(!pp||it.part===pp));
    if(q)list.sort((x,y)=>y[1]-x[1]);
    list.forEach(([it,sc],i)=>{n++;if(!q&&it.part!==last){last=it.part;html+='<div class="fg-p">'+PN[it.part]+'</div>'}
      html+=`${q&&i===0?'<div class="fg-best"><span class="bestl">'+WHY[sc]+'</span></div>':''}<a href="#${it.id}"${q&&i===0?' class="best"':''}><b class="${it.k==='b'?'tb':''}">${it.code}</b><span>${it.name}</span><span>${it.sec}</span></a>`});
    L.innerHTML=html||'<p class="sm">Không có kết quả.</p>';N.textContent=CNT(n,items.length)};
  const open=v=>{D.hidden=!v;B.setAttribute('aria-expanded',v);if(v){render();AUTOFOCUS(Q)}};
  B.onclick=()=>open(D.hidden);document.getElementById('fgClose').onclick=()=>open(false);Q.oninput=()=>{render();L.scrollTop=0};document.getElementById('fgX').onclick=()=>{Q.value='';render();Q.focus()};document.getElementById('fgR').onclick=()=>{Q.value='';kind='';FP.value='';D.querySelectorAll('.seg:not(.segsel) button').forEach(x=>x.setAttribute('aria-checked',x.dataset.k===''));render();Q.focus()};
  D.querySelectorAll('.seg:not(.segsel) button').forEach(b=>b.onclick=()=>{kind=b.dataset.k;D.querySelectorAll('.seg:not(.segsel) button').forEach(x=>x.setAttribute('aria-checked',x===b));render()});
  const mark=id=>{let el=document.getElementById(id);if(el&&el.classList.contains('fanc'))el=el.nextElementSibling;if(!el||!el.dataset.cap)return;HL([el])};
  L.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;open(false);setTimeout(()=>mark(a.getAttribute('href').slice(1)),60)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!D.hidden)open(false);if(e.key==='h'&&!e.ctrlKey&&!e.metaKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();open(true)}});
  window.FIGS=items;
})();
/* ---------- Tiện ích: phím tắt, đọc tiếp, tiến độ, chép liên kết, tooltip tài liệu ---------- */
(function(){
  const toast=window.TOAST=(msg,btn)=>{/* thông báo dùng chung cả trang (đọc tiếp, có bản mới…) (#112) */let t=document.getElementById('uxToast');if(!t){t=document.createElement('div');t.id='uxToast';document.body.appendChild(t)}t.innerHTML='<span>'+msg+'</span>'+(btn?'<button type="button">'+btn.label+'</button>':'');t.hidden=false;if(btn)t.querySelector('button').onclick=()=>{btn.fn();t.hidden=true};clearTimeout(t._h);t._h=setTimeout(()=>t.hidden=true,btn?9000:2200)};
  const typing=()=>/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  const go=id=>{const el=document.getElementById(id);if(el){const a=document.createElement('a');a.href='#'+id;a.style.display='none';document.body.appendChild(a);a.click();a.remove()}};
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||typing())return;
    const k=e.key;if(/^[1-6]$/.test(k)){e.preventDefault();go(k==='6'?'phu-luc':'phan-'+k)}
    else if(k==='t'){go('tong-quan')}
    else if(k==='b'){history.back()}else if(k==='f'){history.forward()}
    else if(k==='?'){const b=document.getElementById('lgBtn');if(b&&b.getAttribute('aria-expanded')!=='true')b.click()}});
  // tooltip tài liệu
  document.querySelectorAll('a.ref,a.dl').forEach(a=>{const k=document.querySelector(a.getAttribute('href'));const d=k&&k.nextElementSibling;if(d)a.title=d.innerText.replace(/mở ↗/,'').replace(/\s+/g,' ').trim()});
  // chép liên kết khi bấm số mục
  document.querySelectorAll('.card-head .num').forEach(n=>{n.title='Chép liên kết tới mục này';n.style.cursor='copy';n.addEventListener('click',()=>{const id=n.closest('.card').id;const url=location.href.split('#')[0]+'#'+id;try{navigator.clipboard.writeText(url).then(()=>toast('Đã chép liên kết tới '+n.textContent),()=>toast(url))}catch(_){toast(url)}})});

  // tô sáng mục References khi nhảy tới, giống Glossary
  const flash=id=>{const k=document.getElementById(id);if(!k||!/^ref-/.test(id))return;HL([k,k.nextElementSibling])};
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#ref-"]');if(a)setTimeout(()=>flash(a.getAttribute('href').slice(1)),60)});
  if(location.hash.startsWith('#ref-'))flash(location.hash.slice(1));
  // đếm độ phủ task ở bảng Chung và riêng
  const cv=document.getElementById('crCov');if(cv){const P=new Set([...document.querySelectorAll('.cr3 .tk.p')].map(x=>x.dataset.k)),A=new Set([...document.querySelectorAll('.cr3 .tk.a')].map(x=>x.dataset.k));cv.textContent=`✓ Đủ ${P.size}/26 task của PMP ECO 2026 và ${A.size}/24 task của ACP ECO 2024, mỗi task 1 lần`;if(P.size!==26||A.size!==24)cv.style.color='var(--bad-ink)'}
  const ec=document.getElementById('ecoCov');if(ec){const c=k=>document.querySelectorAll('.ecov .cv.'+k).length;ec.textContent=`${c('ok')} task đủ, ${c('thin')} task mỏng, ${c('no')} task chưa có. Tổng ${c('ok')+c('thin')+c('no')}/24.`;ec.style.color='var(--ink2)'}
  // thanh tiến độ
  const bar=document.createElement('div');bar.id='readBar';document.querySelector('nav.top').appendChild(bar);
  let last='';const secs=[...document.querySelectorAll('.card[id^="s"]')];
  const upd=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%';
    let cur='';for(const s of secs){if(s.getBoundingClientRect().top<160)cur=s.id;else break}
    if(cur&&cur!==last){last=cur;try{localStorage.setItem('acpPos',cur)}catch(_){}}};
  addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});
  // đọc tiếp
  try{const p=localStorage.getItem('acpPos');/* tải lại trang thì trình duyệt đã về chỗ cũ, không cần hỏi đọc tiếp (#111) */const rl=window.AP_RELOAD||(performance.getEntriesByType('navigation')[0]||{}).type==='reload';if(p&&!rl&&!location.hash&&document.getElementById(p)&&p!=='s1-1'){const n=document.querySelector('#'+p+' .num');setTimeout(()=>toast('Lần trước bạn đọc tới '+(n?n.textContent:p)+'.',{label:'Đọc tiếp',fn:()=>go(p)}),600)}}catch(_){}
})();

fig('f-lad',W,792,()=>{let g='';const AX=110,AW=440,PX=630,PW=488;
  // Độ rộng tầng thể hiện số lượng: Mindset hẹp nhất, Principles rộng hơn, cách làm rộng nhất
  const tw=(x,w,f)=>[x+w*(1-f)/2,w*f];
  const chips=(x0,y0,w,cols,items,o)=>{let r='';const gap=6,ch=26,cw=(w-gap*(cols-1))/cols;items.forEach((t,i)=>{const x=x0+(i%cols)*(cw+gap),y=y0+Math.floor(i/cols)*(ch+gap);r+=R(x,y,cw,ch,'#fff',{rx:6,stroke:o.stroke});
    if(o.num){r+=`<circle cx="${x+15}" cy="${y+ch/2}" r="9" fill="${o.c}"/>`+T(x+15,y+ch/2+4,String(i+1),{s:10.5,w:700,c:'#fff'})+T(x+30,y+ch/2+4.5,t,{s:11.5,w:500,c:o.c,a:'start'})}
    else r+=T(x+cw/2,y+ch/2+4.5,t,{s:11.5,w:600,c:o.c})});return r};
  const tier=(x,w,y,h,fill,stroke,t,n,c)=>R(x,y,w,h,fill,{rx:10,stroke})+T(x+14,y+22,t,{s:13.5,w:600,c,a:'start'})+T(x+w-14,y+22,n,{s:12,w:600,c,a:'end'});
  const AC=C.pri[2],PC=C.po[2],AS=PMID,PS='#9fb6dc';
  g+=T(AX+AW/2,16,'Agile',{s:14,w:600,c:AC})+T(AX+AW/2,34,'APG 2 Hình 2-3, mục 5.2, Annex A3',{s:11.5,c:MUTE});
  g+=T(PX+PW/2,16,'Project Management',{s:14,w:600,c:PC})+T(PX+PW/2,34,'PMBOK 8 Hình 1-1, Bảng 2-1',{s:11.5,c:MUTE});
  [['MINDSET',52],['PRINCIPLES',244],['CÁCH LÀM',496]].forEach(([t,y])=>g+=T(0,y+22,t,{s:11,w:600,c:INK2,a:'start',ls:.8}));
  // Mindset
  let [x,w]=tw(AX,AW,.6);g+=tier(x,w,52,172,C.pri[1],AS,'Agile Mindset','4 Values',AC)+chips(x+12,88,w-24,1,['Individuals and interactions','Working software','Customer collaboration','Responding to change'],{c:AC,stroke:AS});
  [x,w]=tw(PX,PW,.6);g+=tier(x,w,52,172,C.po[1],PS,'Project Management Mindset','3 chiều',PC)+chips(x+12,88,w-24,1,['Proactive','Ownership','Value-driven'],{c:PC,stroke:PS});
  // Principles
  [x,w]=tw(AX,AW,.82);g+=tier(x,w,244,232,C.pri[1],AS,'Principles','12',AC)+chips(x+12,280,w-24,2,['Thoả mãn Customer','Chào đón thay đổi','Bàn giao thường xuyên','Hợp tác hằng ngày','Cá nhân có động lực','Giao tiếp trực diện','Đo bằng thứ chạy được','Phát triển bền vững','Kỹ thuật xuất sắc','Đơn giản','Self-organizing team','Phản tư, điều chỉnh'].map((t,i)=>t),{c:AC,stroke:AS,num:1});
  [x,w]=tw(PX,PW,.82);g+=tier(x,w,244,232,C.po[1],PS,'Principles','6',PC)+chips(x+12,280,w-24,1,['Adopt a Holistic View','Focus on Value','Embed Quality Into Processes and Deliverables','Be an Accountable Leader','Integrate Sustainability Within All Project Areas','Build an Empowered Culture'],{c:PC,stroke:PS,num:1});
  // Cách làm
  g+=tier(AX,AW,496,290,C.pri[1],AS,'Practices','9 practice và các framework',AC)+chips(AX+12,532,AW-24,2,['Backlog Planning','Backlog Refinement','Iteration Planning','Daily coordination','Working collaboratively','Demonstrations/Reviews','Retrospectives','Shipping Increments','Execution practices'],{c:AC,stroke:AS});
  g+=T(AX+14,704,'Framework: gói Practices làm sẵn, xem 6.7',{s:12,w:600,c:AC,a:'start'})+chips(AX+12,716,AW-24,5,['Scrum','Kanban','XP','Lean','Crystal','FDD','DSDM','Scaling','DA'],{c:INK2,stroke:FAINT});
  g+=tier(PX,PW,496,290,C.po[1],PS,'Performance Domains × Focus Areas','7 × 5',PC);
  const fa=['Initiating','Planning','Executing','Monitoring|and Controlling','Closing'],dm=['Governance','Scope','Schedule','Finance','Stakeholders','Resources','Risk'],gx=PX+116,cw=72;
  fa.forEach((f,k)=>f.split('|').forEach((p,j)=>g+=T(gx+k*cw+33,536+j*12,p,{s:10.5,w:600,c:PC})));
  /* Số process ở từng ô, đúng PMBOK 8 Bảng 2-1. Ô trống là ô không có process, vẽ nét đứt */
  const NP=[[1,2,3,2,1],[0,4,0,2,0],[0,2,0,1,0],[0,3,0,1,0],[1,2,2,2,0],[0,2,2,1,0],[0,4,1,1,0]];
  dm.forEach((d,r)=>{const y=562+r*30;g+=T(PX+14,y+15,d,{s:12,w:500,c:PC,a:'start'});fa.forEach((f,k)=>{const n=NP[r][k];g+=n?R(gx+k*cw,y,66,22,'#fff',{rx:4,stroke:PS})+T(gx+k*cw+33,y+15.5,n+'',{s:12,w:600,c:PC}):R(gx+k*cw,y,66,22,'none',{rx:4,stroke:LINE,dash:'3 3'})})});
  g+=T(PX+14,778,'Số trong ô là số process, tổng 40. Ô nét đứt: không có process',{s:11,c:MUTE,a:'start'});
  // cầu nối Annex A1
  g+=A(`M${AX+AW+6} 640H${PX-6}`,'pri',{w:1.75})+T((AX+AW+PX)/2,628,'Annex A1',{s:11.5,w:600,c:AC})+T((AX+AW+PX)/2,660,'APG 2',{s:11.5,c:MUTE});
  return g;},{label:'Agile và PMBOK 8 đặt cạnh nhau: Mindset, Principles, cách làm'});
/* User Story và Function: quan hệ nhiều – nhiều, bấm để xem. Function theo nghĩa PMBOK 8: 1 hành vi của Product (functional requirement), không phải hàm trong code */
const US_S=['Thêm thẻ ngân hàng','Thanh toán bằng thẻ đã lưu','Xem lịch sử giao dịch','Yêu cầu hoàn tiền'];
const US_F=['Kiểm tra thẻ hợp lệ','Lưu thẻ đã mã hoá','Hiển thị thẻ đã lưu','Giao dịch qua PayNhanh','Ghi lại giao dịch','Liệt kê giao dịch','Gửi email xác nhận'];
const US_M=[[0,1],[2,0,3,4,6],[5],[3,4,6]];
const US_W={'0-0':'Product kiểm tra số thẻ và ngày hết hạn trước khi lưu','0-1':'Product cất thẻ để lần sau khách khỏi nhập lại','1-2':'Product cho khách chọn 1 thẻ đã lưu','1-0':'Product kiểm tra thẻ còn hạn trước khi trừ tiền','1-3':'Product yêu cầu PayNhanh trừ tiền','1-4':'Product ghi lại khoản thanh toán','1-6':'Product báo khách đã thanh toán','2-5':'Product hiện các giao dịch đã ghi','3-3':'Product yêu cầu PayNhanh trả tiền lại','3-4':'Product ghi lại khoản hoàn tiền','3-6':'Product báo khách đã hoàn tiền'};
let USF={k:'f',i:3};function drawUSF(){fig('f-usf',W,360,()=>{let g='';
  const sx=150,sw=300,fx=700,fw=300,sy=i=>70+i*68,fy=j=>62+j*40;
  const on=(i,j)=>USF.k==='s'?i===USF.i:j===USF.i;
  g+=R(118,24,914,330,'#fff',{rx:12,stroke:C.pri[0],dash:1})+T(118,14,'FEATURE: THANH TOÁN TRỰC TUYẾN',{s:11,w:600,c:C.pri[0],a:'start',ls:.8});
  g+=T(sx+sw/2,46,'User Story: 1 nhu cầu của End User',{s:12.5,w:600,c:C.pri[2]})+T(fx+fw/2,46,'Function: 1 hành vi của Product',{s:12.5,w:600,c:INK2});
  US_M.forEach((fs,i)=>fs.forEach(j=>{const hl=on(i,j);g+=`<path d="M${sx+sw} ${sy(i)+24}C${sx+sw+120} ${sy(i)+24} ${fx-120} ${fy(j)+15} ${fx} ${fy(j)+15}" fill="none" stroke="${hl?C.pri[0]:'#d8dbe2'}" stroke-width="${hl?2.5:1.2}"/>`}));
  US_S.forEach((t,i)=>{const sel=USF.k==='s'&&USF.i===i,rel=USF.k==='f'&&US_M[i].includes(USF.i);g+=`<g data-us="${i}"${sel?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem Function của User Story ${t}">`+R(sx,sy(i),sw,48,sel||rel?C.pri[1]:'#fff',{rx:8,stroke:sel?C.pri[0]:PMID})+T(sx+14,sy(i)+29,t,{s:13.5,w:sel?600:500,c:C.pri[2],a:'start'})+'</g>'});
  US_F.forEach((t,j)=>{const sel=USF.k==='f'&&USF.i===j,rel=USF.k==='s'&&US_M[USF.i].includes(j);g+=`<g data-fn="${j}"${sel?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem User Story có Function ${t}">`+R(fx,fy(j),fw,30,sel||rel?SOFT:'#fff',{rx:6,stroke:sel?INK2:LINE})+T(fx+12,fy(j)+20,t,{s:12.5,w:sel||rel?600:500,c:INK,a:'start'})+'</g>'});
  return g;},{label:'User Story và Function: quan hệ nhiều – nhiều'});
  const el=document.getElementById('usfP');
  if(el){const li=a=>'<ul class="usl">'+a.map(([n,w])=>`<li><b>${n}</b>: ${w}</li>`).join('')+'</ul>';
    if(USF.k==='s'){const fs=US_M[USF.i];el.innerHTML=IP(null,null,[['Trong User Story này',li(fs.map(j=>[US_F[j],US_W[USF.i+'-'+j]]))],['Vì sao gộp lại','Từng hành vi riêng lẻ chưa giúp End User làm xong việc gì. Gộp lại mới thành 1 nhu cầu trọn vẹn, test được, bàn giao được.']])}
    else{const ss=US_M.map((fs,i)=>fs.includes(USF.i)?i:-1).filter(i=>i>=0);el.innerHTML=IP(null,null,[['Hành vi này xuất hiện khi',li(ss.map(i=>[US_S[i],US_W[i+'-'+USF.i]]))],['Vì sao dùng chung được',ss.length>1?'Function mô tả việc Product làm, không nói làm để phục vụ ai. Cùng 1 hành vi có thể là 1 bước trong nhiều nhu cầu khác nhau của End User. User Story nào làm sau thì Function đã có sẵn, chỉ cần thêm phần còn thiếu.':'Hiện chỉ 1 User Story cần hành vi này. Bấm Giao dịch qua PayNhanh hoặc Ghi lại giao dịch để thấy 1 hành vi nằm trong nhiều User Story.']])}}
  CARET('f-usf','usfP')}
const USFQ=[{k:'f',i:3},{k:'f',i:4},{k:'s',i:1},{k:'s',i:3}];
drawUSF();CARETS.push(()=>CARET('f-usf','usfP'));PLAY('usfPl',USFQ.length,i=>{USF=USFQ[i];drawUSF()},2800,['Function Giao dịch qua PayNhanh','Function Ghi lại giao dịch','User Story Thanh toán bằng thẻ đã lưu','User Story Yêu cầu hoàn tiền']);
document.addEventListener('click',e=>{const a=e.target.closest('#f-usf [data-us],#f-usf [data-fn]');if(!a)return;USF=a.dataset.us!==undefined?{k:'s',i:+a.dataset.us}:{k:'f',i:+a.dataset.fn};drawUSF()});
document.addEventListener('keydown',e=>{const a=e.target.closest&&e.target.closest('#f-usf [data-us],#f-usf [data-fn]');if(a&&(e.key==='Enter'||e.key===' ')){e.preventDefault();a.click()}});
/* ===== Vòng 20: các mục bổ sung để phủ ACP ECO ===== */

/* 2.6 Psychological safety: 4 bậc của Clark */
const PS=[['Inclusion safety','Được thuộc về','Được chấp nhận là thành viên của Team, được ghi nhận đúng con người mình.','Đối xử với người khác như mình muốn được đối xử, tôn trọng khác biệt về xuất thân, cách làm, nhịp độ, nghe trọn vẹn.','Đức thuộc phòng IT của chị Vy, mới vào Team, được mời vào mọi buổi họp và kênh trao đổi như mọi người.'],
 ['Learner safety','Dám hỏi, dám sai để học','Dám hỏi, thử nghiệm, học qua thử và sai.','Không ngại xin giúp, nói ra điều mình chưa biết, coi lỗi là dữ liệu để học.','Mai hỏi một câu "ngây ngô" về cách PayNhanh trả lỗi trong Backlog Refinement, cả Team cùng tra và không ai cười.'],
 ['Contributor safety','Dám đóng góp','Được trao quyền góp ý tưởng và tham gia quyết định, góp ý được đón nhận và dùng.','Coi điểm mạnh yếu khác nhau là lợi thế, chia việc theo điểm mạnh, Pairing để bù chỗ thiếu, chia công cho mọi người.','Nam đề xuất bỏ bước nhập lại địa chỉ khi thanh toán, Team đồng ý làm thử trong Sprint sau.'],
 ['Challenger safety','Dám thách thức hiện trạng','Dám thách thức giả định, đề xuất thay đổi mà không sợ hậu quả xấu. Đây là nơi sinh ra đổi mới và cải tiến liên tục.','Đặt câu hỏi về cách làm hiện tại đúng lúc và tôn trọng, làm thử nghiệm nhỏ có kết quả rõ, cùng xem kết quả rồi cùng quyết.','Trang nói thẳng ở Retrospective rằng quy tắc "mọi code đều được review" đang làm chậm, đề xuất thử Pairing thay thế trong 1 Sprint.']];
let PSi=-1;function drawPS(){fig('f-ps4',W,300,()=>{let g='';const X=i=>70+i*258,BW=246,Y=i=>184-i*44,B=246,OX=44;
  PS.forEach((p,i)=>{const on=i===PSi,done=i<PSi;g+=`<g data-ps="${i}"${on?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem giai đoạn ${i+1} ${p[0]}">`+R(X(i),Y(i),BW,B-Y(i),on?C.pri[0]:done?PWORK:C.pri[1],{rx:8,stroke:C.pri[0]})+T(X(i)+16,Y(i)+28,(i+1)+'',{s:20,w:700,c:on?'#fff':C.pri[0],a:'start'})+T(X(i)+44,Y(i)+26,p[0],{s:14,w:600,c:on?'#fff':C.pri[2],a:'start'})+T(X(i)+44,Y(i)+45,p[1],{s:12.5,c:on?'#fff':INK2,a:'start'})+'</g>'});
  g+=A(`M${OX} ${B}H${W-8}`,'neu',{w:1.5})+A(`M${OX} ${B}V${Y(3)-24}`,'neu',{w:1.5});
  g+=T((OX+W-8)/2,B+26,'Mức trưởng thành của Team',{s:12,c:MUTE})+T(OX-16,(B+Y(3)-24)/2,'Psychological safety',{s:12,c:MUTE,rot:-90});
  return g},{label:'4 giai đoạn của Psychological safety theo Clark'});
  const p=PS[PSi],el=document.getElementById('psP');if(el)el.innerHTML=p?IP(null,null,[['Nghĩa theo APG 2',p[2]],['Team làm gì',p[3]],['Ở Shop Áo Gió',p[4]]]):IP(null,null,[['Cách xem','Bấm 1 giai đoạn để xem chi tiết, hoặc bấm Xem lần lượt để đi qua từng giai đoạn.']]);CARET('f-ps4','psP')}
drawPS();CARETS.push(()=>CARET('f-ps4','psP'));clickKey('#f-ps4 [data-ps]',a=>{PSi=+a.dataset.ps;drawPS()});PLAY('psPl',4,i=>{PSi=i;drawPS()},3200,PS.map(p=>p[0]),()=>{PSi=-1;drawPS()});

const PE=[['Hỏi câu "ngây ngô", thách thức giả định, chia việc thành phần nhỏ test được mà không ngại. DoR và Working agreements bảo vệ việc hỏi và phản biện, giảm mơ hồ và Risk ẩn trước khi lập kế hoạch.','Không ai hỏi lại Acceptance Criteria chưa rõ của User Story #12. Tới giữa Sprint mới thấy mỗi người hiểu một kiểu.'],
 ['Nói ra giới hạn Capacity, lo ngại kỹ thuật và Risk bàn giao từ sớm, thương lượng Scope công khai, chốt Sprint Goal theo bằng chứng chứ không theo áp lực.','Velocity quá khứ là 20 điểm nhưng Team nhận 30 điểm vì ngại nói không với anh Tuấn.'],
 ['Nêu Impediment ngay, xin giúp, Swarming vào việc bị chặn mà không sợ bị trách. Bảng công việc giữ tiến độ và chỗ tắc luôn minh bạch.','Huy bị sandbox PayNhanh chặn 2 ngày nhưng vẫn báo "đang làm" vì ngại.'],
 ['Mời Stakeholder góp ý thẳng, coi điều bất ngờ là dữ liệu, chỉnh Product Backlog công khai. Đạt Definition of Done giúp Team tự tin với Increment, bớt sợ release.','Team chỉ demo phần chạy tốt, giấu lỗi thanh toán. Anh Tuấn phát hiện sau khi release.'],
 ['Nhìn thẳng vào hành vi và giới hạn của hệ thống, cập nhật Working agreements, chọn vài thử nghiệm cho Sprint sau. Ưu tiên học hơn tìm người có lỗi.','Retrospective thành buổi tìm người có lỗi. Lần sau ai cũng nói "mọi thứ ổn".']];
function drawPE(i){const el=document.getElementById('psV');if(el)el.innerHTML=`<div class="g"><div class="lbl">Có Psychological safety, theo APG 2</div>${PE[i][0]}</div><div class="b"><div class="lbl lgio">${GM}Thiếu, ví dụ ở Shop Áo Gió</div>${PE[i][1]}</div>`}
drawPE(0);segOn('psE',v=>drawPE(+v));PLAY('pePl',5,i=>{document.querySelectorAll('#psE button').forEach((x,k)=>x.setAttribute('aria-checked',k===i));drawPE(i)},3200,['Backlog Refinement','Sprint Planning','Daily Scrum','Sprint Review','Retrospective']);

const SV=[['Nếu bạn mắc lỗi trong Team này, lỗi đó không bị dùng để chống lại bạn.','If you make a mistake on this team, it is not held against you.'],['Trong Team này, dám làm điều mạo hiểm là an toàn.','It is safe to take a risk on this team.'],['Thành viên Team có thể nêu ra vấn đề và chuyện khó.','Members of this team are able to bring up problems and tough issues.']];
const SVa=[0,0,0];function drawSV(){const el=document.getElementById('psS');if(!el)return;const L=['Rất không đồng ý','Không đồng ý','Phân vân','Đồng ý','Rất đồng ý'];
  let s=SV.map((q,i)=>`<div class="sv-q"><div class="sv-t">${q[0]}<small>${q[1]}</small></div><div class="sv-b" role="radiogroup" aria-label="Mức đồng ý câu ${i+1}">${L.map((l,k)=>`<button type="button" role="radio" aria-checked="${SVa[i]===k+1}" data-q="${i}" data-a="${k+1}" title="${l}">${k+1}</button>`).join('')}</div></div>`).join('');
  const n=SVa.filter(Boolean).length,avg=n?SVa.reduce((a,b)=>a+b,0)/n:0;
  const cur=n<3?-1:avg<2.5?0:avg<3.75?1:2;
  const r=(n<3?`Trả lời đủ 3 câu, 1 là rất không đồng ý, 5 là rất đồng ý. Đã trả lời ${n}.`:`<b>Trung bình ${NF(avg)}.</b>`)+BRANCH([['Thấp, dưới 2,5','Team còn ngại nói. Bắt đầu từ Inclusion safety và Learner safety: leader làm gương nhận lỗi, Retrospective không tìm người có lỗi.'],['Trung bình, 2,5 tới dưới 3,75','Đã có nền nhưng chưa vững. Đối chiếu với quan sát thực tế và bàn trong Retrospective xem Team đang ở giai đoạn nào.'],['Cao, từ 3,75','Vẫn kiểm tra chéo bằng quan sát, vì người trả lời có thể chọn câu "an toàn".']],cur);
  el.innerHTML=s+`<div class="sv-r">${r}<small>APG 2 trích 3 câu mẫu trong khảo sát 7 câu của Edmondson 1999. Câu hỏi được dịch, có kèm nguyên văn.</small></div>`}
drawSV();(document.getElementById('svEx')||{}).onclick=()=>{[4,2,3].forEach((v,i)=>SVa[i]=v);drawSV()};(document.getElementById('svRs')||{}).onclick=()=>{SVa.fill(0);drawSV()};clickKey('#psS [data-q]',a=>{SVa[+a.dataset.q]=+a.dataset.a;drawSV();const b=document.querySelector(`#psS [data-q="${a.dataset.q}"][data-a="${a.dataset.a}"]`);b&&b.focus()});

/* 2.7 5 cách xử lý xung đột */
const CF=[['Withdraw/avoid','Né tránh',.2,.2,'Rút khỏi xung đột đang có hoặc sắp có, hoãn lại để chuẩn bị tốt hơn hoặc để người khác giải quyết.','Vấn đề vẫn còn, chỉ được hoãn.','Huy và Mai tranh luận về định dạng API lúc 17 giờ thứ 6, hẹn sáng thứ 2 bàn khi có đủ dữ liệu.'],
 ['Smooth/accommodate','Nhường',.8,.2,'Nhấn vào điểm giống nhau thay vì điểm khác, nhường quan điểm của mình để giữ hoà khí và quan hệ.','Giữ được quan hệ, vấn đề có thể chưa thật sự được giải quyết.','Nam nhường Mai cách đặt nút thanh toán vì khác biệt nhỏ, giữ quan hệ quan trọng hơn.'],
 ['Compromise/reconcile','Thoả hiệp',.5,.5,'Tìm giải pháp mà các bên đều hài lòng một phần, để giải quyết tạm thời hoặc một phần.','Đôi khi thành thua – thua (lose-lose).','Chị Lan muốn 3 Feature trong Sprint, Team chỉ đủ Capacity cho 2. Chốt 2 Feature và 1 phần nhỏ của Feature thứ 3.'],
 ['Force/direct','Áp đặt',.2,.8,'Đẩy quan điểm của mình, bỏ qua bên kia, thường dùng quyền lực để xử lý tình huống khẩn cấp.','Thường là thắng – thua (win-lose).','Lỗi làm lộ dữ liệu thẻ trên web thật: anh Minh quyết ngay tắt Function lưu thẻ, bàn sau.'],
 ['Collaborate/problem-solve','Hợp tác',.8,.8,'Kết hợp nhiều góc nhìn, cần thái độ hợp tác và đối thoại cởi mở, thường đi tới đồng thuận và cam kết.','Có thể thành thắng – thắng (win-win).','Huy và Trang cùng tìm cách test PayNhanh mà cả 2 đồng ý. Mất thời gian hơn nhưng cả Team cam kết.']];
let CFi=4;function drawCF(){fig('f-cfl',760,400,()=>{let g='';const X0=150,X1=700,Y0=340,Y1=30,x=v=>X0+v*(X1-X0),y=v=>Y0-v*(Y0-Y1);
  g+=A(`M${X0} ${Y0}H${X1+20}`,'neu',{w:1.5})+A(`M${X0} ${Y0}V${Y1-14}`,'neu',{w:1.5});
  g+=T((X0+X1)/2,Y0+28,'Mức quan tâm tới bên kia',{s:12,c:MUTE})+T(X0-24,(Y0+Y1)/2,'Mức giữ quan điểm của mình',{s:12,c:MUTE,rot:-90});
  
  CF.forEach((c,i)=>{const on=i===CFi,cx=x(c[2]),cy=y(c[3]),[a,b]=c[0].split('/');g+=`<g data-cf="${i}"${on?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem cách ${c[0]}">`+`<circle cx="${cx}" cy="${cy}" r="54" fill="${on?C.pri[0]:'#fff'}" stroke="${C.pri[0]}" stroke-width="1.5"/>`+T(cx,cy-6,a+'/',{s:13,w:600,c:on?'#fff':C.pri[2]})+T(cx,cy+11,b,{s:13,w:600,c:on?'#fff':C.pri[2]})+T(cx,cy+28,c[1],{s:11.5,c:on?'#fff':MUTE})+'</g>'});
  return g},{label:'5 cách xử lý xung đột theo PMBOK 8 trên 2 trục Thomas-Kilmann',max:760});
  const c=CF[CFi],el=document.getElementById('cfP');if(el)el.innerHTML=IP(null,null,[['Nghĩa theo PMBOK 8',c[4]],['Kết quả thường gặp',c[5]],['Ở Shop Áo Gió',c[6]]]);CARET('f-cfl','cfP')}
drawCF();CARETS.push(()=>CARET('f-cfl','cfP'));clickKey('#f-cfl [data-cf]',a=>{CFi=+a.dataset.cf;drawCF()});PLAY('cfPl',5,i=>{CFi=[3,0,1,2,4][i];drawCF()},3200,[3,0,1,2,4].map(k=>CF[k][0]));

/* 2.7 5 mức xung đột */
const LV=[['Problem to Solve','Có vấn đề cần giải','Giải quyết vấn đề','Rõ ràng, cụ thể, dựa trên sự việc: "API trả lỗi 500 khi thẻ hết hạn."','Hợp tác, đi tới đồng thuận. Để Team tự giải quyết.'],
 ['Disagreement','Bất đồng','Tự bảo vệ, giữ thể diện','Dè dặt, mơ hồ, hiểu được nhiều cách: "Có người test chưa kỹ lắm."','Hỗ trợ và trao quyền để các bên tự giải quyết.'],
 ['Contest','Tranh thắng thua','Thắng quan trọng hơn giải quyết','Công kích cá nhân, phóng đại "luôn luôn", "không bao giờ": "Frontend lúc nào cũng làm hỏng."','Điều hoà, thương lượng, đưa mọi người về sự việc cụ thể.'],
 ['Crusade','Chiến dịch','Bảo vệ phe mình, loại bỏ phe kia','Ý thức hệ, quy chụp cả phe: "Dân backend không bao giờ hiểu người dùng."','Làm trung gian, gặp riêng từng bên, đưa xung đột về mức 3 hoặc thấp hơn.'],
 ['World War','Chiến tranh','Làm hại bên kia','Gần như không còn đối thoại.','Làm mọi cách để không ai bị tổn hại, có thể phải tách các bên.']];
let LVi=-1;function drawLV(){fig('f-lvl',W,190,()=>{let g='';const OX=36,bw=200,gap=12,B=140;
  LV.forEach((l,i)=>{const x=OX+10+i*(bw+gap),h=60+i*16,y=B-h,on=i===LVi,tone=['good','good','warn','bad','bad'][i];g+=`<g data-lv="${i}"${on?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem mức ${i+1} ${l[0]}">`+R(x,y,bw,h,on?C[tone][0]:C[tone][1],{rx:8,stroke:C[tone][0]})+T(x+14,y+24,(i+1)+'. '+l[0],{s:13.5,w:600,c:on?'#fff':C[tone][2],a:'start'})+T(x+14,y+42,l[1],{s:12,c:on?'#fff':INK2,a:'start'})+'</g>'});
  /* Ngưỡng Adkins 2010: mức 1, 2 Team tự giải quyết, từ mức 3 Agile Coach can thiệp */
  {const xd=OX+10+2*(bw+gap)-gap/2;g+=Ln(`M${xd} 6V${B-2}`,INK2,1.5,'4 4')+T(xd-10,20,'Team tự giải quyết',{s:12,w:600,c:C.good[2],a:'end'})+T(xd+10,20,'Agile Coach can thiệp',{s:12,w:600,c:C.bad[2],a:'start'})}
  g+=A(`M${OX} ${B}H${W-8}`,'neu',{w:1.5})+A(`M${OX} ${B}V8`,'neu',{w:1.5});
  g+=T((OX+W-8)/2,B+26,'Mức xung đột',{s:12,c:MUTE})+T(OX-14,B/2+4,'Độ căng',{s:12,c:MUTE,rot:-90});
  return g},{label:'5 mức xung đột của Leas'});
  const l=LV[LVi],el=document.getElementById('lvP');if(el)el.innerHTML=l?IP(null,null,[['Mục tiêu của các bên',l[2]],['Ngôn ngữ',l[3]],['Agile Coach làm gì',l[4]]]):IP(null,null,[['Cách xem','Bấm 1 mức để xem chi tiết, hoặc bấm Xem lần lượt để đi qua từng mức.']]);CARET('f-lvl','lvP')}
drawLV();CARETS.push(()=>CARET('f-lvl','lvP'));clickKey('#f-lvl [data-lv]',a=>{LVi=+a.dataset.lv;drawLV()});PLAY('lvPl',5,i=>{LVi=i;drawLV()},3200,LV.map(l=>l[0]),()=>{LVi=-1;drawLV()});

/* 2.8 I-shaped và T-shaped */
const SM0=[[[3,1,0,1,1,3],[1,3,1,1,0,0],[0,1,3,0,0,0],[0,0,0,3,0,0],[1,0,0,1,3,0]],[[3,2,0,2,1,3],[2,3,1,1,0,2],[0,2,3,1,0,0],[1,1,1,3,1,2],[2,0,0,1,3,0]]];
fig('f-tsh',W,284,()=>{let g='';const sk=['Backend','Frontend','Thiết kế UX','Kiểm thử','Dữ liệu','Thanh toán'];
  /* Trục Ox nằm trên (thanh kỹ năng treo xuống như chữ T), nên tên trục và nhãn đặt phía ngoài trục, tức phía trên. Số liệu lấy đúng dòng của Trang trong Bảng 2.8-1 */
  const panel=(x0,title,sub,lv,good,lines)=>{const AX=92,OX=x0+44,cw=72,bx=i=>x0+56+i*cw,DH=v=>v?24+(v-1)*40:0,CX=x0+270;
    let s=T(CX,18,title,{s:14,w:600,c:C.pri[2]})+T(CX,36,sub,{s:12,c:MUTE})+T(CX,58,'Mảng kỹ năng',{s:12,c:MUTE});
    sk.forEach((n,i)=>{const x=bx(i),v=lv[i],c=x+(cw-6)/2;if(v)s+=R(x,AX+1,cw-6,DH(v),i===3?C.pri[0]:PMID,{rx:4});s+=Ln(`M${c} ${AX-4}V${AX+4}`,MUTE,1.5)+T(c,AX-12,n,{s:11.5,c:v?INK2:FAINT});if(!v)s+=T(c,AX+18,'0',{s:11.5,c:FAINT})});
    [1,2,3].forEach(v=>{const y=AX+DH(v);s+=Ln(`M${OX-4} ${y}H${OX+4}`,MUTE,1.5)+T(OX-10,y+4,v+'',{s:11.5,c:FAINT,a:'end'})});
    /* Ox là các mảng kỹ năng, không có thứ tự nên không có mũi tên. Oy có số nên ghi 0 ở gốc */
    s+=Ln(`M${OX} ${AX}H${x0+510}`,C.neu[0],1.5)+A(`M${OX} ${AX}V${AX+134}`,'neu',{w:1.5})+T(OX-10,AX+4,'0',{s:11.5,c:FAINT,a:'end'})+T(x0+16,AX+64,'Mức thành thạo',{s:12,c:MUTE,rot:-90});
    lines.forEach((t,k)=>{s+=T(CX,248+k*20,t,{s:12.5,c:good?C.good[2]:C.bad[2]})});return s};
  g+=panel(0,'I-shaped','Trang lúc đầu Project',SM0[0][3],0,['Chỉ làm sâu 1 mảng','Việc test dồn vào 1 người, mọi người phải chờ']);
  g+=Ln('M559 10V278',LINE,1.5);
  g+=panel(559,'T-shaped','Trang sau 3 Sprint Pairing',SM0[1][3],1,['Vẫn sâu về test, thêm hiểu biết rộng','Giúp được người khác, ít handoff hơn']);
  return g},{label:'I-shaped và T-shaped'});

/* 2.8 Skill matrix */
const SKN=['Backend','Frontend','Thiết kế UX','Kiểm thử','Dữ liệu','Thanh toán'],PPL=['Huy','Mai','Nam','Trang','Đức'];
let SMx=SM0[0].map(r=>r.slice());function drawSM(){const el=document.getElementById('smx');if(!el)return;const L=['Chưa biết','Đang học','Tự làm được','Dạy được người khác'];
  let s='<table class="t smt"><tr><th>Người</th>'+SKN.map(k=>`<th>${k}</th>`).join('')+'<th>Hình dạng</th></tr>';
  SMx.forEach((r,i)=>{const n=r.filter(v=>v>=2).length;s+=`<tr><td>${PPL[i]}</td>`+r.map((v,j)=>`<td><button type="button" class="lv${v}" data-p="${i}" data-s="${j}" aria-label="${PPL[i]}, ${SKN[j]}: ${L[v]}. Bấm để chọn mức" aria-haspopup="menu">${v}</button></td>`).join('')+`<td><span class="shp ${n>1?'t':'i'}">${n>1?'T-shaped':'I-shaped'}</span></td></tr>`});
  const cnt=SKN.map((_,j)=>SMx.filter(r=>r[j]>=2).length);
  s+='<tr class="sum"><td>Số người tự làm được</td>'+cnt.map(c=>`<td><span class="cnt ${c<=1?'bad':'ok'}">${c}${c<=1?' người, Risk':' người'}</span></td>`).join('')+'<td></td></tr></table>';
  el.innerHTML=s;const m=document.getElementById('smM'),k=cnt.filter(c=>c<=1).length;if(m)m.textContent=k?`${k} trong ${SKN.length} kỹ năng chỉ có 1 người làm được`:'Mọi kỹ năng đều có ít nhất 2 người làm được'}
drawSM();segOn('smS',v=>{SMx=SM0[+v].map(r=>r.slice());drawSM()});
/* Chọn mức bằng menu: bấm ô hiện 4 mức, chọn trực tiếp. Trong menu, phím mũi tên đi qua các mức */
(function(){const LV=['Chưa biết','Đang học','Tự làm được','Dạy được người khác'];let menu=null;
  const close=()=>{if(menu){menu.remove();menu=null}};
  const set=(i,j,v)=>{SMx[i][j]=v;drawSM();const b=document.querySelector(`#smx [data-p="${i}"][data-s="${j}"]`);b&&b.focus()};
  document.addEventListener('click',e=>{const a=e.target.closest('#smx [data-p]');const m=e.target.closest('.smm');if(m){const o=e.target.closest('[data-v]');if(o){set(+m.dataset.p,+m.dataset.s,+o.dataset.v)}close();return}close();if(!a)return;
    const i=+a.dataset.p,j=+a.dataset.s,box=document.getElementById('smx'),r=a.getBoundingClientRect(),k=box.getBoundingClientRect();menu=document.createElement('div');menu.className='smm';menu.dataset.p=i;menu.dataset.s=j;menu.setAttribute('role','menu');
    menu.innerHTML=LV.map((l,v)=>`<button type="button" role="menuitemradio" aria-checked="${SMx[i][j]===v}" data-v="${v}"><i class="lv${v}">${v}</i>${l}</button>`).join('');
    box.appendChild(menu);menu.style.left=Math.min(r.left-k.left,k.width-210)+'px';menu.style.top=(r.bottom-k.top+4)+'px';menu.querySelector('[aria-checked=true]').focus()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();const m=e.target.closest&&e.target.closest('.smm');if(m&&(e.key==='ArrowUp'||e.key==='ArrowDown')){e.preventDefault();const bs=[...m.querySelectorAll('button')],k=bs.indexOf(e.target);bs[(k+(e.key==='ArrowDown'?1:3))%4].focus()}})})();

/* 4.9 Prioritization */
/* 7 hạng mục của Release đầu, xếp ở Sprint Planning đầu tiên (trước khi có ví điện tử ở 4.7). Size trùng Story Points ở 4.5 */
const PI=[['Giỏ hàng',10,8,3,8,'M','b'],['Thanh toán bằng thẻ đã lưu',9,8,8,5,'M','p'],['Tìm kiếm sản phẩm',6,3,1,3,'S','b'],['Thêm thẻ ngân hàng',7,3,5,5,'S','b'],['Lọc áo theo màu',3,1,1,2,'C','p'],['Gợi ý size theo chiều cao',4,2,1,8,'C','d'],['Chat với nhân viên',3,1,1,13,'W','d']];
const PRT={m:['MoSCoW','4 mức cần thiết cho lần phát hành này',[['Cách đọc','Must have: thiếu thì không phát hành được. Should have: quan trọng nhưng có cách tạm. Could have: có thì tốt. Won\'t have (this time): chưa làm lần này, không phải bỏ hẳn.'],['Kết quả','Giỏ hàng và Thanh toán bằng thẻ đã lưu là Must. Chat với nhân viên chưa làm lần này.'],['Lưu ý','Trong cùng 1 mức vẫn chưa có thứ tự, cần thêm kỹ thuật khác.']]],
 v:['Value vs effort','Ma trận 2×2',[['Cách đọc','Trục ngang là công sức (Size), trục dọc là Value. Góc trên trái làm ngay, góc dưới phải tránh.'],['Kết quả','Thanh toán bằng thẻ đã lưu, Tìm kiếm sản phẩm, Thêm thẻ ngân hàng làm ngay. Giỏ hàng Value cao nhưng tốn công nên ở góc đáng đầu tư. Gợi ý size và Chat với nhân viên ở góc tránh.'],['Lưu ý','Phụ thuộc ước lượng thô, chỉ dùng để cắt nhanh.']]],
 w:['WSJF','(User business value + Time criticality + Risk reduction) ÷ Size',[['Cách đọc','Mỗi yếu tố chấm tương đối từ 1 tới 10. Điểm WSJF cao làm trước. Việc nhỏ mà gấp được đẩy lên.'],['Kết quả','Thanh toán bằng thẻ đã lưu lên đầu. Tìm kiếm sản phẩm nhỏ nên vượt Giỏ hàng dù Value thấp hơn.'],['Lưu ý','Thanh toán bằng thẻ đã lưu có Risk reduction cao vì làm sớm sẽ sớm lộ Risk của PayNhanh, xem 5.5.']]],
 k:['Kano','Loại Feature theo cách tạo ra sự hài lòng',[['Cách đọc','Basic: thiếu thì Customer bực, đủ cũng không khen. Performance: càng tốt càng hài lòng. Delighter: không có không sao, có thì bất ngờ thích.'],['Kết quả','Bản đầu cần đủ basic, vài performance và 1 delighter để tạo khác biệt.'],['Lưu ý','Kano giúp cân đối loại Feature, không dùng để xếp hàng (APG 2). Theo thời gian delighter thành basic.']]]};
let PRv='m';function drawPR(){fig('f-pri',W,PRv==='m'?190:380,()=>{let g='';
  if(PRv==='m'){const H=[['M','Must have'],['S','Should have'],['C','Could have'],['W',"Won't have (this time)"]],cw=270;
    H.forEach(([k,n],i)=>{const x=i*(cw+12),tone=['pri','po','sm','neu'][i];g+=R(x,0,cw,184,C[tone][1],{rx:10})+T(x+cw/2,30,n,{s:14,w:600,c:C[tone][2]});
      PI.filter(p=>p[5]===k).forEach((p,j)=>{g+=R(x+14,52+j*52,cw-28,40,'#fff',{rx:6,stroke:C[tone][0]})+T(x+cw/2,77+j*52,p[0],{s:13,c:INK})})})}
  if(PRv==='v'){const X0=110,X1=1060,Y0=320,Y1=20,x=v=>X0+v/14*(X1-X0),y=v=>Y0-v/11*(Y0-Y1),mx=x(6.5),my=y(5.5);
    g+=R(X0,Y1,mx-X0,my-Y1,C.good[1],{rx:0})+R(mx,my,X1-mx,Y0-my,C.bad[1],{rx:0});
    g+=T(X0+12,Y1+22,'Làm ngay',{s:13,w:600,c:C.good[2],a:'start'})+T(X1-12,Y1+22,'Đáng đầu tư',{s:13,w:600,c:INK2,a:'end'})+T(X0+12,Y0-12,'Làm khi rảnh',{s:13,w:600,c:INK2,a:'start'})+T(X1-12,Y0-12,'Tránh',{s:13,w:600,c:C.bad[2],a:'end'});
    g+=Ln(`M${mx} ${Y1}V${Y0}`,FAINT,1,'4 4')+Ln(`M${X0} ${my}H${X1}`,FAINT,1,'4 4');
    g+=A(`M${X0} ${Y0}H${X1+16}`,'neu',{w:1.5})+A(`M${X0} ${Y0}V${Y1-12}`,'neu',{w:1.5})+T((X0+X1)/2,Y0+40,'Công sức (Size)',{s:12,c:MUTE})+T(X0-40,(Y0+Y1)/2,'Value',{s:12,c:MUTE,rot:-90});
    [0,5,10].forEach(v=>{g+=T(X0-10,y(v)+4,v,{s:11.5,c:FAINT,a:'end'})});[0,5,10].forEach(v=>{g+=T(x(v),Y0+20,v,{s:11.5,c:FAINT})});
    const off={};
    PI.forEach(p=>{const cx=x(p[4]),cy=y(p[1]),L=p[4]>11;g+=`<circle cx="${cx}" cy="${cy}" r="6" fill="${C.pri[0]}"/>`+T(L?cx-12:cx+12,cy+4+(off[p[0]]||0),p[0],{s:12.5,c:INK,a:L?'end':'start',halo:true})})}
  if(PRv==='w'){const rows=PI.map(p=>[p[0],p[1],p[2],p[3],p[4],(p[1]+p[2]+p[3])/p[4]]).sort((a,b)=>b[5]-a[5]),X0=260,mx=5.6,bw=520;
    g+=T(0,18,'Hạng mục',{s:12,w:600,c:MUTE,a:'start'})+T(X0,18,'Điểm WSJF',{s:12,w:600,c:MUTE,a:'start'})+T(X0+bw+30,18,'Cách tính',{s:12,w:600,c:MUTE,a:'start'});
    rows.forEach((r,i)=>{const y=34+i*48;g+=T(0,y+24,(i+1)+'. '+r[0],{s:13.5,w:i<3?600:400,c:INK,a:'start'})+R(X0,y+6,bw*r[5]/mx,28,i<3?C.pri[0]:PMID,{rx:4})+T(X0+bw*r[5]/mx+8,y+25,NF(r[5]),{s:13,w:600,c:C.pri[2],a:'start'})+EQ(X0+bw+30,y+20,200,FR(`${r[1]} + ${r[2]} + ${r[3]}`,r[4]),{s:13,c:INK2,h:44})})}
  if(PRv==='k'){const X0=170,X1=1060,CX=(X0+X1)/2,Y0=190,TOP=20,BOT=360,sx=v=>X0+v*(X1-X0),sy=v=>Y0-v*150;
    g+=A(`M${X0} ${Y0}H${X1+16}`,'neu',{w:1.5})+A(`M${CX} ${BOT}V${TOP-8}`,'neu',{w:1.5});
    g+=T(X1,Y0-10,'Mức Feature được làm đầy đủ',{s:12,c:MUTE,a:'end'})+T(X0,Y0+20,'Feature không có',{s:12,c:MUTE,a:'start'})+T(CX+10,TOP+4,'Customer hài lòng',{s:12,c:MUTE,a:'start'})+T(CX+10,BOT-2,'Customer bực',{s:12,c:MUTE,a:'start'});
    const curve=(f,tone)=>{let d='';for(let k=0;k<=40;k++){const v=k/40;d+=(k?'L':'M')+sx(v).toFixed(1)+' '+sy(f(v)).toFixed(1)}return `<path d="${d}" fill="none" stroke="${C[tone][0]}" stroke-width="2.5"/>`};
    g+=curve(v=>-1.05*Math.exp(-4*v)+.02,'po')+curve(v=>-.8+1.6*v,'sm')+curve(v=>.03+.95*(Math.exp(4*v)-1)/(Math.exp(4)-1),'pri');
    g+=T(X0-10,sy(-1.03)+5,'Basic',{s:13,w:600,c:C.po[2],a:'end'})+T(X0-10,sy(-.8)+5,'Performance',{s:13,w:600,c:C.sm[2],a:'end'})+T(X0-10,sy(.03)-4,'Delighter',{s:13,w:600,c:C.pri[2],a:'end'});
    const LX=CX+40;[['po','Basic','Giỏ hàng, Tìm kiếm, Thêm thẻ'],['sm','Performance','Thẻ đã lưu, Lọc áo theo màu'],['pri','Delighter','Gợi ý size, Chat với nhân viên']].forEach(([t,n,x],i)=>{const y=sy(-.42)+i*26;g+=R(LX,y-10,14,4,C[t][0],{rx:2})+T(LX+22,y-3,n+':',{s:12.5,w:600,c:C[t][2],a:'start'})+T(LX+130,y-3,x,{s:12.5,c:INK2,a:'start'})});}
  return g},{label:'Cùng 1 Product Backlog qua 4 kỹ thuật'});
  const t=PRT[PRv],el=document.getElementById('prP');if(el)el.innerHTML=IP(null,null,t[2])}
drawPR();segOn('prS',v=>{PRv=v;drawPR()});PLAY('prPl',4,i=>{PRv='mvwk'[i];document.querySelectorAll('#prS button').forEach(x=>x.setAttribute('aria-checked',x.dataset.v===PRv));drawPR()},3200,['MoSCoW','Value vs effort','WSJF','Kano']);

/* 5.5 Risk */
const RKC=['#517cbc','#258b95','#b46336','#9f7220','#d6457a'];
fig('f-rab',W,440,()=>{let g='';const L=['Thêm thẻ ngân hàng','Thanh toán bằng ví điện tử','Gợi ý size theo chiều cao','Xem lịch sử giao dịch','Yêu cầu hoàn tiền'];
  const Rr=[['Dựng sandbox dự phòng',0],['Dùng token thẻ của PayNhanh',1],['Thêm thẻ ngân hàng'],['Spike với Vendor ví',4],['Thanh toán bằng ví điện tử'],['Thử tải trước đợt khuyến mãi',2],['Gợi ý size theo chiều cao'],['Xem lịch sử giao dịch'],['Yêu cầu hoàn tiền']];
  const LX=60,RX=700,BW=360,y=i=>56+i*42;
  g+=T(LX+BW/2,20,'Chỉ theo Value',{s:14,w:600,c:INK2})+T(RX+BW/2,20,'Risk-adjusted backlog',{s:14,w:600,c:C.pri[2]})+T(LX+BW/2,38,'Product Backlog đầu Sprint 2',{s:12,c:MUTE})+T(RX+BW/2,38,'Cùng Product Backlog, thêm Risk response',{s:12,c:MUTE});
  L.forEach((n,i)=>{const j=Rr.findIndex(r=>r[0]===n);g+=Ln(`M${LX+BW} ${y(i)+17}C${LX+BW+110} ${y(i)+17} ${RX-110} ${y(j)+17} ${RX} ${y(j)+17}`,'#d8dbe2',1.2)});
  L.forEach((n,i)=>{g+=R(LX,y(i),BW,34,'#fff',{rx:6,stroke:LINE})+T(LX+14,y(i)+22,(i+1)+'. '+n,{s:13,c:INK,a:'start'})});
  Rr.forEach((r,i)=>{const rk=r[1]!==undefined;g+=R(RX,y(i),BW,34,rk?'#fff':'#fff',{rx:6,stroke:rk?RKC[r[1]]:LINE,sw:rk?2:1.5})+(rk?R(RX,y(i),6,34,RKC[r[1]],{rx:2}):'')+T(RX+16,y(i)+22,(i+1)+'. '+r[0],{s:13,w:rk?600:400,c:INK,a:'start'})+(rk?T(RX+BW-12,y(i)+22,'Risk '+(r[1]+1),{s:11.5,w:600,c:RKC[r[1]],a:'end'}):'')});
  return g},{label:'Product Backlog trước và sau khi tính Risk'});
const RB=[[5,4.5,3.2,3,0],[5,4.5,3.2,3,2],[1,4.5,3.2,3,.5],[0,1,3.2,3,.5],[0,0,3.2,3,0],[0,0,1,1.5,0],[0,0,.5,1,0]];
const RBL=['Đầu Project','Sprint 1','Sprint 2','Sprint 3','Sprint 4','Sprint 5','Sprint 6'];
const RBT=['Đánh giá Risk lần đầu ở Sprint Planning đầu tiên. Risk exposure 15,7 ngày.','Risk 1 xảy ra 1 lần thành Issue: sandbox PayNhanh chặn Huy 2 ngày (4.6). Sandbox vẫn có thể chậm lại nên Risk 1 vẫn để nguyên. Sprint Review thêm ví điện tử, Risk 5 mới xuất hiện nên tổng tăng. Retrospective chốt dựng sandbox dự phòng (4.8).','Dựng xong sandbox dự phòng, Risk 1 còn ít. Spike với Vendor ví, Risk 5 giảm.','Chuyển sang dùng token thẻ của PayNhanh, Risk 2 giảm mạnh. Risk 1 hết.','Bộ phận bảo mật duyệt cách dùng token, Risk 2 hết. Tích hợp ví xong, Risk 5 hết.','Thử tải, Risk 3 giảm. MVP bán thật 1 dòng áo có đơn thật, Risk 4 giảm.','Risk còn lại nhỏ, Team chấp nhận và tiếp tục theo dõi sau khi bàn giao cho Operations.'];
let RBi=1;function drawRB(){fig('f-rbd',W,372,()=>{let g='';const X0=70,Y0=290,sc=13.5,bw=96,step=146;
  [0,5,10,15].forEach(v=>{g+=Ln(`M${X0} ${Y0-v*sc}H${X0+7*step}`,'#eeeff3',1)+T(X0-10,Y0-v*sc+4,v,{s:11.5,c:FAINT,a:'end'})});
  g+=A(`M${X0} ${Y0}H${X0+7*step+10}`,'neu',{w:1.5})+A(`M${X0} ${Y0}V${Y0-18*sc-6}`,'neu',{w:1.5})+T(18,Y0-9*sc,'Risk exposure (ngày)',{s:12,c:MUTE,rot:-90});
  RB.forEach((col,i)=>{const x=X0+24+i*step;let yy=Y0;const on=i===RBi,tot=col.reduce((a,b)=>a+b,0);g+=`<g data-rb="${i}"${on?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem ${RBL[i]}">`+R(x-10,Y0-18*sc,bw+20,18*sc+44,on?C.pri[1]:'transparent',{rx:8});
    col.forEach((v,k)=>{if(!v)return;const h=v*sc;yy-=h;g+=`<rect x="${x}" y="${yy}" width="${bw}" height="${h}" fill="${RKC[k]}" opacity="${on?1:.75}" stroke="#fff" stroke-width="1"/>`});
    g+=T(x+bw/2,yy-8,NF(tot),{s:13,w:600,c:INK})+T(x+bw/2,Y0+22,RBL[i],{s:12.5,w:on?600:400,c:on?C.pri[2]:INK2})+'</g>'});
  g+=T(X0+3.5*step,Y0+44,'Thời điểm',{s:12,c:MUTE});['Risk 1','Risk 2','Risk 3','Risk 4','Risk 5'].forEach((n,k)=>{g+=R(X0+k*110,Y0+62,12,12,RKC[k],{rx:3})+T(X0+k*110+18,Y0+73,n,{s:12,c:INK2,a:'start'})});
  return g},{label:'Risk burndown của Project Shop online'});
  const el=document.getElementById('rbP'),tot=RB[RBi].reduce((a,b)=>a+b,0);if(el)el.innerHTML=IP(null,null,[['Risk exposure','<b class="bignum">'+NF(tot)+' ngày</b>'],['Chuyện gì xảy ra',RBT[RBi]]]);CARET('f-rbd','rbP')}
drawRB();CARETS.push(()=>CARET('f-rbd','rbP'));clickKey('#f-rbd [data-rb]',a=>{RBi=+a.dataset.rb;drawRB()});PLAY('rbPl',7,i=>{RBi=i;drawRB()},3000,RBL);

/* 5.6 Value Stream Mapping */
const VS0=[['Refinement',.5,10,'chờ trong|Product Backlog'],['Code',3,2,'chờ|bắt đầu'],['Review code',.5,2,'chờ review'],['Test',1,3,'chờ test'],['Deploy',.5,4,'chờ duyệt|deploy']];
const VK={jit:false,wip:false,pair:false,ci:false};
function VSdata(){const v=VS0.map(r=>r.slice());if(VK.jit)v[0][2]=3;if(VK.wip){v[2][2]=.5;v[3][2]=1}if(VK.pair){v[1][1]=3.5;v[2][1]=0;v[2][2]=0}if(VK.ci){v[4][1]=.1;v[4][2]=.2}return v}
function drawVS(){const v=VSdata(),work=v.reduce((a,r)=>a+r[1],0),wait=v.reduce((a,r)=>a+r[2],0),lt=work+wait,base=26.5;
  /* Bước bị bỏ (Pairing gộp Review code vào Code) rút khỏi dòng chảy thật sự, không chỉ làm mờ. Số đã đổi ghi "cũ → mới" màu chính.
     Dải dưới tỉ lệ đúng theo ngày, mỗi đoạn nối về đúng ô chờ hay bước làm ở trên, nên nhìn là thấy chờ chiếm bao nhiêu */
  fig('f-vsm',W,340,()=>{let g='';const vis=v.map((r,i)=>[r,i]).filter(([r])=>r[1]||r[2]),n=vis.length,U=180,X=100+(5-n)*U/2;
    const NV=(a,b,u)=>a===b?NF(b)+u:NF(a)+' → '+NF(b)+u;
    g+=R(0,30,88,56,C.po[1],{rx:8,stroke:C.po[0]})+T(44,54,'Customer',{s:12.5,w:600,c:C.po[2]})+T(44,72,'cần',{s:12,c:MUTE});
    g+=R(1012,30,106,56,C.po[1],{rx:8,stroke:C.po[0]})+T(1065,54,'Customer',{s:12.5,w:600,c:C.po[2]})+T(1065,72,'dùng được',{s:12,c:MUTE});
    const BY=180,sc=1118/base;let bx=0;const seg=[];
    vis.forEach(([r,i],k)=>{const x=X+k*U,o=VS0[i],cw=r[2]!==o[2],ck=r[1]!==o[1];
      g+=`<path d="M${x+30} 40L${x+52} 76H${x+8}Z" fill="${C.bad[1]}" stroke="${cw?C.pri[0]:C.bad[0]}" stroke-width="${cw?2:1.5}"/>`+T(x+30,70,'!',{s:12,w:700,c:C.bad[0]});
      r[3].split('|').forEach((t,q)=>{g+=T(x+30,102+q*14,t,{s:11,c:MUTE})});
      g+=T(x+30,150,NV(o[2],r[2],' ngày'),{s:12.5,w:600,c:cw?C.pri[0]:C.bad[2]});
      const nm=r[0]==='Code'&&VK.pair?'Code + review':r[0];
      g+=R(x+66,30,106,56,'#fff',{rx:8,stroke:ck?C.pri[0]:C.good[0],sw:ck?2:1.5})+T(x+119,54,nm,{s:13,w:600,c:INK})+T(x+119,72,ck?NV(o[1],r[1],' ngày'):NF(r[1])+' ngày làm',{s:12,w:ck?600:400,c:ck?C.pri[0]:C.good[2]});
      g+=A(`M${x+56} 58H${x+62}`,'neu',{w:1.2});
      seg.push([x+30,158,r[2],'w',cw],[x+119,90,r[1],'k',ck])});
    g+=A(`M90 58H${X-4}`,'neu',{w:1.2})+A(`M${X+(n-1)*U+172} 58H1008`,'neu',{w:1.2});
    if(lt<base)g+=R(0,BY,base*sc,30,SOFT,{rx:6})+T(base*sc-10,BY+20,'ban đầu 26,5 ngày',{s:11.5,c:MUTE,a:'end'});
    seg.forEach(([ax,ay,d,k,ch])=>{if(!d)return;const w=d*sc,mx=bx+w/2;
      g+=k==='w'?R(bx,BY,w,30,C.bad[1],{rx:0,stroke:C.bad[0],sw:1}):R(bx,BY,w,30,C.good[0],{rx:0});
      if(w>34)g+=T(mx,BY+20,NF(d),{s:11.5,w:600,c:k==='w'?C.bad[2]:'#fff'});bx+=w});
    const Y=BY+74,LT='<a href="#s5-3">Lead Time</a>';
    g+=EQ(0,Y,520,`<span class="fml"><span class="fl">${LT}</span> = <span style="color:var(--bad-ink,#8b2f28)">chờ ${NF(wait)}</span> + <span style="color:var(--good-ink,#3c5d27)">làm ${NF(work)}</span> = <b>${NF(lt)} ngày</b></span>`,{s:14,c:INK});
    g+=EQ(560,Y,420,`<span class="fml"><span class="fl">Flow efficiency</span> = ${FR('Thời gian làm',LT)} = ${FR(NF(work),NF(lt))} = <b style="color:var(--pri-ink)">${Math.round(work/lt*100)}%</b></span>`,{s:14,c:INK,h:52});
    if(lt<base)g+=T(0,Y+44,'Lead Time giảm '+NF(base-lt)+' ngày so với ban đầu, gần hết nhờ bớt chờ',{s:13,w:600,c:C.pri[0],a:'start'});
    return g},{label:'Value Stream Mapping của User Story Thanh toán bằng thẻ đã lưu'})}
drawVS();clickKey('#vsT [data-k]',a=>{VK[a.dataset.k]=!VK[a.dataset.k];a.setAttribute('aria-pressed',VK[a.dataset.k]);drawVS()});PLAY('vsPl',5,i=>{const ks=['jit','wip','pair','ci'];ks.forEach((k,j)=>{VK[k]=i>0&&j<i;const b=document.querySelector(`#vsT [data-k="${k}"]`);b&&b.setAttribute('aria-pressed',VK[k])});drawVS()},2600,['Ban đầu','Refinement đúng lúc','Thêm WIP Limit','Thêm Pairing','Thêm tự động deploy']);

/* 6.7 Bản đồ framework: nhịp làm việc × quy mô, bấm để tới tóm tắt */
fig('f-fwmap',W,318,()=>{let g='';const CX=[170,645],CW=465,RY=[36,134],RH=[78,128];
  const chip=(x,y,w,t,id,sub)=>`<a href="#${id}" class="fwm">`+R(x,y,w,46,'#fff',{rx:8,stroke:C.pri[0]})+T(x+w/2,y+20,t,{s:13,w:600,c:C.pri[2]})+T(x+w/2,y+36,sub,{s:11.5,c:MUTE})+'</a>';
  g+=T(CX[0]+CW/2,18,'Nhịp theo Iteration, timebox',{s:12.5,w:600,c:INK2})+T(CX[1]+CW/2,18,'Dòng chảy liên tục',{s:12.5,w:600,c:INK2});
  g+=T(0,RY[0]+RH[0]/2+4,'1 Team',{s:12.5,w:600,c:INK2,a:'start'})+T(0,RY[1]+RH[1]/2-4,'Nhiều Team,',{s:12.5,w:600,c:INK2,a:'start'})+T(0,RY[1]+RH[1]/2+13,'cả tổ chức',{s:12.5,w:600,c:INK2,a:'start'});
  /* Cột Dòng chảy liên tục là 1 ô trải cả 2 hàng: Kanban Method dùng từ 1 Team tới cả tổ chức (APG 2, Portfolio Kanban) */
  RY.forEach((y,r)=>g+=R(CX[0],y,CW,RH[r],SOFT,{rx:10}));g+=R(CX[1],RY[0],CW,RY[1]+RH[1]-RY[0],SOFT,{rx:10});
  g+=chip(CX[0]+16,RY[0]+16,136,'Scrum','fw-scrum','Sprint, 3 trách nhiệm')+chip(CX[0]+164,RY[0]+16,136,'XP','fw-xp','kỹ thuật lập trình')+chip(CX[0]+312,RY[0]+16,138,'Crystal','fw-crystal','Clear, Team nhỏ');
  /* Kanban Method là framework duy nhất của cột nên chiếm trọn ô gộp 2 hàng */
  {const y0=RY[0]+16,h=RY[1]+RH[1]-16-y0,x=CX[1]+16,w=CW-32,m=y0+h/2;g+=`<a href="#fw-kanban" class="fwm">`+R(x,y0,w,h,'#fff',{rx:8,stroke:C.pri[0]})+T(x+w/2,m-6,'Kanban Method',{s:13,w:600,c:C.pri[2]})+T(x+w/2,m+12,'WIP Limit, dòng chảy',{s:11.5,c:MUTE})+'</a>'}
  g+=chip(CX[0]+16,RY[1]+16,434,'Scaling','fw-scaling','SoS, SAFe, LeSS, Scrum@Scale, Nexus')+chip(CX[0]+16,RY[1]+70,136,'FDD','fw-fdd','Project lớn')+chip(CX[0]+164,RY[1]+70,136,'DSDM','fw-dsdm','Project')+chip(CX[0]+312,RY[1]+70,138,'Crystal','fw-crystal','Yellow tới Red');
  g+=`<a href="#fw-da" class="fwm">`+R(170,274,940,40,C.pri[1],{rx:8,stroke:C.pri[0]})+T(640,299,'Disciplined Agile: bộ công cụ chọn cách làm ở bất kỳ ô nào, kết hợp cả Lean và cách làm truyền thống',{s:12.5,w:600,c:C.pri[2]})+'</a>';
  return g},{label:'Các framework theo nhịp làm việc và quy mô'});
/* 6.7: Agile và Kanban Method là tập con của Lean (APG 2, Hình 2-4). Bấm từng vòng để tới tóm tắt */
/* 6.7 Lean. 3 ý của Lean vẽ thành bộ 3 biểu tượng. Bộ này có trong vòng Lean, trong Agile và trong Kanban Method: cùng 1 bộ nghĩa là cùng dùng.
   Vì cùng dùng 3 ý này nên Agile và Kanban Method là tập con của Lean (APG 2, Hình 2-4) */
fig('f-lean',W,362,()=>{let g='';const cx=W/2;
  const ring=(id,x,y,rx,ry,fill,st,t,ts,ty)=>`<a href="#${id}" class="fwm">`+`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${st}" stroke-width="1.5"/>`+T(x,ty??y+5,t,{s:ts,w:600,c:st===C.pri[0]?C.pri[2]:INK})+'</a>';
  /* Mỗi vòng ghi 1 dòng xám: thế nào thì thuộc vòng này. Vòng trong nằm trong vòng ngoài nên theo cả dòng của vòng ngoài. Không lặp ý của Lean vào từng vòng */
  g+=ring('fw-lean',cx,182,330,172,SOFT,FAINT,'Lean',18,40)+T(cx,68,'mọi cách làm theo 3 ý: Focus on value, Small batch sizes, Elimination of waste',{s:11.5,c:MUTE});
  g+=`<ellipse cx="${cx+40}" cy="214" rx="210" ry="122" fill="${C.pri[1]}" stroke="${C.pri[0]}" stroke-width="1.5"/>`+T(cx+40,124,'Agile',{s:15,w:600,c:C.pri[2]})+T(cx+40,142,'mọi cách làm theo 4 Values, 12 Principles',{s:11.5,c:MUTE});
  [['fw-scrum',cx-50,210,'Scrum'],['fw-xp',cx+40,210,'XP'],['fw-crystal',cx+130,210,'Crystal'],['fw-fdd',cx-5,278,'FDD'],['fw-dsdm',cx+85,278,'DSDM']].forEach(([id,x,y,t])=>g+=ring(id,x,y,38,28,'#fff',C.pri[0],t,12.5));
  g+=ring('fw-kanban',cx-215,196,64,48,'#fff',INK2,'Kanban Method',12.5,200);
  return g},{label:'Lean bao Agile và Kanban Method, nên cả 2 cũng theo 3 ý của Lean. Bấm từng vòng để tới phần tóm tắt'});
fig('f-wbs',W,404,()=>{let g='';const H=40,rows=[78,150,222,294];
  // khối đặt theo tâm: [tâm x, rộng, chữ, kiểu]
  const nb=(cx,y,w,t,o={})=>(o.fade?`<g opacity=".45">`:'')+R(cx-w/2,y,w,H,o.fill||'#fff',{rx:8,stroke:o.stroke||C.po[0],dash:o.dash})+T(cx,y+25,t,{s:12.5,w:600,c:o.tc||C.po[2]})+(o.fade?'</g>':'');
  const con=(px,py,cy,xs,c)=>{const m=(py+cy)/2,lo=Math.min(px,...xs),hi=Math.max(px,...xs);let d=`M${px} ${py}V${m}M${lo} ${m}H${hi}`;xs.forEach(x=>d+=`M${x} ${m}V${cy}`);return Ln(d,c,1.5)};
  const panel=(x,w,title,sub,c,labels)=>R(x,0,w,404,'#fff',{rx:12,stroke:LINE})+T(x+w/2,26,title,{s:15,w:600,c})+T(x+w/2,44,sub,{s:12,c:MUTE})+labels.map((t,k)=>T(x+14,rows[k]+25,t,{s:10.5,w:600,c,a:'start',ls:.6})).join('');
  g+=panel(0,540,'WBS','Predictive, phần Predictive của Hybrid',C.po[2],['PROJECT','DELIVERABLE','SUB-DELIVERABLE','WORK PACKAGE']);
  g+=panel(578,540,'Product Backlog','Adaptive (Agile)',C.pri[2],['PRODUCT','EPIC','FEATURE','USER STORY']);
  g+=T(559,32,'≈',{s:22,w:600,c:INK2});
  // WBS: cha luôn thẳng tâm với con nằm trên nhánh đang chia tiếp
  g+=nb(330,rows[0],200,'Shop online, 3 tháng',{fill:C.po[1]});
  const d1=[[205,130,'Trang chi tiết áo'],[330,100,'Thanh toán'],[460,140,'Project Management']];
  g+=con(330,rows[0]+H,rows[1],d1.map(v=>v[0]),C.po[0]);d1.forEach(([c,w,t])=>g+=nb(c,rows[1],w,t));
  const d2=[[330,124,'Thanh toán thẻ'],[460,104,'Hoàn tiền']];
  g+=con(330,rows[1]+H,rows[2],d2.map(v=>v[0]),C.po[0]);d2.forEach(([c,w,t])=>g+=nb(c,rows[2],w,t));
  const d3=[[262,120,'Tích hợp cổng'],[392,96,'Lưu thẻ']];
  g+=con(330,rows[2]+H,rows[3],d3.map(v=>v[0]),C.po[0]);d3.forEach(([c,w,t])=>g+=nb(c,rows[3],w,t,{fill:C.po[1]}));
  g+=T(330,370,'Chia hết từ đầu, đủ 100% Scope, thành scope baseline',{s:12,c:MUTE});
  g+=T(330,388,'Gốc là Project: tạm thời, có ngày kết thúc',{s:12,c:MUTE});
  // Product Backlog
  const pk={stroke:C.pri[0],tc:C.pri[2]},ep={fill:SOFT,stroke:INK2,tc:INK};
  g+=nb(908,rows[0],170,'Website Gió',{...pk,fill:C.pri[1]});
  const e1=[[908,160,'Mua sắm trực tuyến',ep],[1058,100,'Tài khoản',{...ep,fade:1,dash:1}]];
  g+=con(908,rows[0]+H,rows[1],e1.map(v=>v[0]),C.pri[0]);e1.forEach(([c,w,t,o])=>g+=nb(c,rows[1],w,t,o));
  const f1=[[778,100,'Giỏ hàng',{...pk,fade:1,dash:1}],[908,110,'Thanh toán',pk],[1038,100,'Tìm kiếm',{...pk,fade:1,dash:1}]];
  g+=con(908,rows[1]+H,rows[2],f1.map(v=>v[0]),C.pri[0]);f1.forEach(([c,w,t,o])=>g+=nb(c,rows[2],w,t,o));
  const s1=[[820,100,'Thêm thẻ'],[1000,200,'Thanh toán bằng thẻ đã lưu']];
  g+=con(908,rows[2]+H,rows[3],s1.map(v=>v[0]),C.pri[0]);s1.forEach(([c,w,t])=>g+=nb(c,rows[3],w,t,{...pk,fill:C.pri[1]}));
  g+=T(908,370,'Chia dần: việc sắp làm chia nhỏ, việc xa để thô (khối viền đứt)',{s:12,c:MUTE});
  g+=T(908,388,'Gốc là Product: lâu dài, Backlog sống cùng Product',{s:12,c:MUTE});
  return g;},{label:'WBS và Product Backlog'});
fig('f-tt',300,270,()=>{let g='';
  g+=`<path d="M150 24L24 238H276Z" fill="${C.pri[1]}" stroke="${C.pri[0]}" stroke-width="2.5" stroke-linejoin="round"/>`;
  g+=`<text transform="translate(74 136) rotate(-59.5)" text-anchor="middle" font-size="13" font-weight="600" fill="${C.pri[2]}">Ways of Working</text>`;
  g+=`<text transform="translate(226 136) rotate(59.5)" text-anchor="middle" font-size="13" font-weight="600" fill="${C.pri[2]}">Power Skills</text>`;
  g+=T(150,258,'Business Acumen',{s:13,w:600,c:C.pri[2]});
  return g;},{label:'PMI Talent Triangle'});



/* ---------- 2.2: Servant Leadership, từ điều phối sang hỗ trợ (4 trách nhiệm theo slide, ví dụ ở Shop Áo Gió) ---------- */
const SRV=[['Remove impediments','xoá trở ngại','Xoá bỏ các trở ngại và nút thắt cản trở công việc.','Anh Minh liên hệ PayNhanh để gỡ sandbox đang chặn việc của Huy 2 ngày (4.6).'],
 ['Facilitate|problem solving','giải quyết vấn đề','Tạo điều kiện giải quyết vấn đề thay vì chỉ đạo.','Huy và Mai bất đồng chuyện lưu thẻ. Anh Minh không chọn thay, mà dẫn buổi bàn để Team tự chọn dùng token của PayNhanh (Risk 2 ở 5.5).'],
 ['Grow the team','phát triển Team','Phát triển năng lực của các thành viên.','Anh Minh xếp lịch Pairing để Trang học thêm frontend và thiết kế, từ I-shaped thành T-shaped (2.8).'],
 ['Pave the way','mở đường|để mọi người cống hiến','Mở đường để mọi người cùng cống hiến.','Anh Tuấn muốn thêm ví điện tử giữa Sprint. Anh Minh hướng yêu cầu về chị Lan để đưa vào Product Backlog, Team giữ được Sprint Goal (4.7).']];
let SRi=-1;/* -1: chưa chọn khối nào, để Xem lần lượt bước 1 thấy ngay khối sáng lên (#80) */function drawSRV(){fig('f-srv',W,330,()=>{let g='';
  /* Trái: điều phối, thông tin đi từ trên xuống */
  const L=210;g+=T(L,20,'Quản lý điều phối',{s:14,w:600,c:INK})+T(L,38,'Co-ordination',{s:12,c:MUTE});
  g+=R(L-100,64,200,48,C.neu[1],{rx:10,stroke:C.neu[0]})+T(L,85,'Project Manager',{s:13,w:600,c:INK})+T(L,102,'lập kế hoạch, giao việc',{s:12,c:MUTE});
  g+=R(20,204,380,62,C.neu[1],{rx:12})+T(36,240,'Team',{s:12,w:600,c:MUTE,a:'start'});
  ['Huy','Mai','Nam','Trang','Đức'].forEach((n,i)=>{const x=L-110+i*62+28;g+=A(`M${L} 112L${x} 210`,'neu',{w:1.4})+`<circle cx="${x}" cy="235" r="22" fill="#fff" stroke="${C.neu[0]}" stroke-width="1.5"/>`+T(x,239,n,{s:11,c:INK2})});
  g+=T(L,296,'Quyết định và việc đi 1 chiều từ trên xuống',{s:12,c:MUTE});
  g+=Ln('M450 10V320',LINE,1.5);
  /* Phải: Team ở trên, leader ở dưới đỡ lên bằng 4 trách nhiệm */
  const R0=799;g+=T(R0,20,'Hỗ trợ cộng tác',{s:14,w:600,c:C.pri[2]})+T(R0,38,'Collaboration',{s:12,c:MUTE});
  g+=R(510,58,578,62,C.pri[1],{rx:12})+T(526,94,'Team',{s:12,w:600,c:C.pri[2],a:'start'});
  ['Huy','Mai','Nam','Trang','Đức'].forEach((n,i)=>{const x=R0-180+i*90+30;g+=`<circle cx="${x}" cy="89" r="22" fill="#fff" stroke="${C.pri[0]}" stroke-width="1.5"/>`+T(x,93,n,{s:11,c:INK2})});
  SRV.forEach((s,i)=>{const x=R0-297+i*152,on=i===SRi,cx=x+69;
    g+=A(`M${cx} 152V124`,'pri',{w:1.6})+Ln(`M${R0} 246L${cx} 218`,C.pri[0],1.4);
    g+=`<g data-sr="${i}"${on?' data-sel':''} style="cursor:pointer" role="button" tabindex="0" aria-label="Xem trách nhiệm ${s[0].replace('|',' ')}">`+R(x,154,138,62,on?C.pri[0]:'#fff',{rx:10,stroke:C.pri[0]})+(()=>{const a=s[0].split('|'),b=s[1].split('|'),n=a.length+b.length;let y=185-(n-1)*7.5,o='';a.forEach(t=>{o+=T(cx,y,t,{s:12,w:600,c:on?'#fff':C.pri[2]});y+=15});b.forEach(t=>{o+=T(cx,y,t,{s:11.5,c:on?'#fff':MUTE});y+=15});return o})()+'</g>'});
  g+=R(R0-120,246,240,48,C.pri[0],{rx:10})+T(R0,267,'Servant Leader',{s:13,w:600,c:'#fff'})+T(R0,284,'ví dụ: anh Minh, Scrum Master',{s:11.5,c:'#fff'});
  g+=T(R0,318,'Leader đứng dưới, đỡ Team bằng 4 trách nhiệm',{s:12,c:MUTE});
  return g},{label:'Từ quản lý điều phối sang Servant Leadership'});
  const s=SRV[SRi],el=document.getElementById('srvP');if(el)el.innerHTML=s?IP(null,null,[['Ở Shop Áo Gió',s[3]]]):IP(null,null,[['Cách xem','Bấm 1 trách nhiệm để xem chi tiết, hoặc bấm Xem lần lượt để đi qua từng trách nhiệm.']]);CARET('f-srv','srvP')}
if(document.getElementById('f-srv')){drawSRV();CARETS.push(()=>CARET('f-srv','srvP'));clickKey('#f-srv [data-sr]',a=>{SRi=+a.dataset.sr;drawSRV()});PLAY('srvPl',4,i=>{SRi=i;drawSRV()},3200,SRV.map(s=>s[0].replace('|',' ')),()=>{SRi=-1;drawSRV()})}

/* Hình, bảng có số liệu từ câu chuyện xuyên suốt: thêm dấu Shop Áo Gió vào tên hình (chạy sau khi mọi hình đã vẽ) */
(function(){const RE=/Shop Áo Gió|Website Gió|Shop online|PayNhanh|chị Lan|anh Minh|anh Tuấn|\bHuy\b|thẻ đã lưu/;
  document.querySelectorAll('.fcap').forEach(c=>{const el=c._host;if(!el||c.querySelector('.cap-gio'))return;if(RE.test(el.textContent+' '+(el.dataset.cap||''))){const a=document.createElement('a');a.className='cap-gio';a.href='#vd-shop';a.title='Ví dụ lấy từ Shop Áo Gió, câu chuyện xuyên suốt';a.innerHTML=GM+'<span>Shop Áo Gió</span>';c.appendChild(a)}})})();
/* ---------- XEM CẢ HÌNH TRÊN ĐIỆN THOẠI ----------
   Hình rộng trên màn hẹp phải cuộn ngang. Nút "⤢ Xem cả hình" mở 1 lớp phủ: hình xoay ngang, vừa màn hình. Nút hiện khi màn ≤760px rộng hoặc ≤520px cao (điện thoại xoay ngang).
   Lớp phủ chứa chính hình đang sống, không phải bản chụp: chuyển hình, hàng Xem lần lượt và ô kết quả (.ipan, .read) của cùng khối .ixc/.card vào lớp phủ,
   nên bấm khối, tới, lùi, chấm bước đều chạy như bản thường. Đóng thì trả mọi thứ về đúng chỗ, giữ nguyên bước đang xem.
   Đóng bằng nút ✕, Esc, hoặc bấm vùng trắng ngoài hình. Ngăn kéo, tooltip mở từ hình trong lớp phủ nổi lên trên lớp phủ (CSS html:has(.fz)). Điều kiện hiện nút nằm ở CSS .fz-b */
/* Nút đặt trong hàng điều khiển của hình (cạnh Làm lại) nếu khối .ixc chỉ có 1 hình và có hàng đó; không thì đặt ngay trên hình. Nút trỏ tới hình bằng data-fz="<id hình>" */
(function(){const rowOf=c=>{const ix=c.closest('.ixc');if(!ix||[...ix.querySelectorAll('[id^="f-"]')].filter(x=>x.querySelector(':scope>svg.fig')).length!==1)return null;const st=ix.querySelector('.stp');return st&&st.parentElement!==ix&&!st.parentElement.contains(c)?st.parentElement:null};
  const mk=()=>{document.querySelectorAll('[id^="f-"]').forEach(c=>{if(!c.querySelector(':scope>svg.fig.wide')||document.querySelector(`[data-fz="${c.id}"]`))return;
  const b=document.createElement('button');b.type='button';b.className='btn fz-b';b.dataset.fz=c.id;b.innerHTML=BI('expand')+'Xem cả hình';b.onclick=()=>open(c);const r=rowOf(c);if(r)r.appendChild(b);else c.before(b)})};
  let ov=null,moved=[],live=null;
  const take=(el,box)=>{const m=document.createComment('fz');el.before(m);moved.push([el,m]);box.append(el)};
  function open(c){const s=c.querySelector(':scope>svg.fig');if(!s||ov)return;ov=document.createElement('div');ov.className='fz';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Xem cả hình');
    const vb=s.viewBox.baseVal,port=innerHeight>innerWidth&&vb.width>vb.height;ov.innerHTML=`<button type="button" class="fz-x" aria-label="Đóng">${BI('x')}</button><div class="fz-in${port?' rot':''}"><div class="fz-ctl"></div><div class="fz-fig"></div><div class="fz-pan"></div></div>`;
    /* Thanh Xem lần lượt, ô kết quả chỉ lấy khi khối .ixc chứa đúng 1 hình: .card nhiều hình thì thanh đó điều khiển phần khác, không phải hình này */
    const ix=c.closest('.ixc'),host=ix&&[...ix.querySelectorAll('[id^="f-"]')].filter(x=>x.querySelector(':scope>svg.fig')).length===1?ix:null,stp=host&&host.querySelector('.stp'),row=stp&&stp.parentElement;
    if(row&&row!==host&&!row.contains(c))take(row,ov.querySelector('.fz-ctl'));
    take(c,ov.querySelector('.fz-fig'));c.classList.add('fz-live');
    if(host)host.querySelectorAll('.ipan,.read').forEach(p=>{if(!p.closest('.fz'))take(p,ov.querySelector('.fz-pan'))});
    /* Màn (hoặc khung đã xoay) nằm ngang và có ô kết quả: hình bên trái, ô kết quả bên phải, để đọc số liệu cùng lúc với hình (#50) */
    live=c;new MutationObserver(()=>fit()).observe(ov.querySelector('.fz-pan'),{childList:true,subtree:true,characterData:true});/* xoay (rot) và bố cục cạnh nhau (side) tính trong fit(), chạy lại mỗi lần đổi cỡ màn, kể cả xoay máy khi lớp phủ đang mở */
    ov.addEventListener('click',e=>{if(e.target===ov||e.target.matches('.fz-in,.fz-fig,.fz-ctl,.fz-pan')||e.target.closest('.fz-x'))close()});
    document.body.append(ov);document.documentElement.style.overflow='hidden';fit();ov.querySelector('.fz-x').focus({preventScroll:true})}
  /* Chiều cao tối đa của hình = chiều cao khung trừ hàng điều khiển đo thật (hàng nút có thể 1 hay 2 dòng), không trừ số cố định */
  function fit(){if(!ov)return;const fi=ov.querySelector('.fz-in'),ct=ov.querySelector('.fz-ctl');const sv=live&&live.querySelector(':scope>svg.fig');if(sv){const vb=sv.viewBox.baseVal,port=innerHeight>innerWidth&&vb.width>vb.height;fi.classList.toggle('rot',port);/* bề dài khi xoay lấy đúng innerHeight: Chrome Android tính 100dvh theo lúc ẩn thanh địa chỉ, làm hình tràn xuống dưới (#99) */fi.style.width=port?innerHeight+'px':'';fi.style.height=port?innerWidth+'px':'';const pan=ov.querySelector('.fz-pan'),key=(port?'r':'n')+(innerWidth>innerHeight?'L':'P');
      /* Ô kết quả ngắn (ví dụ Shop Áo Gió): đặt dưới hình, hình vẫn to. Ô dài (số liệu CFD): đặt cạnh hình để đọc cùng lúc. Quyết 1 lần cho mỗi chiều xoay, không đổi theo từng bước (tránh hình nhảy) */
      if(fi.dataset.k!==key){fi.dataset.k=key;fi.classList.remove('side');pan.style.minHeight='';delete pan.dataset.mh;fi.dataset.sd=pan.children.length&&(port||innerWidth>innerHeight)&&pan.offsetHeight>fi.clientHeight*0.32?'1':''}
      fi.classList.toggle('side',fi.dataset.sd==='1')}const cs=getComputedStyle(fi);const pn=ov.querySelector('.fz-pan');if(pn.children.length&&!fi.classList.contains('side')){/* chừa sẵn chỗ cho ô dài nhất đã gặp, tối thiểu 30% khung, để hình không nhảy khi đổi bước */pn.style.minHeight='';const need=Math.max(pn.offsetHeight,fi.clientHeight*0.3,+(pn.dataset.mh||0));pn.dataset.mh=need;pn.style.minHeight=need+'px'}else pn.style.minHeight='';const below=pn.children.length&&!fi.classList.contains('side')?pn.offsetHeight+6:0;const h=fi.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-(ct.offsetHeight?ct.offsetHeight+6:0)-below;fi.style.setProperty('--fzh',Math.max(120,h)+'px')}
  addEventListener('resize',()=>fit());
  function close(){if(!ov)return;live=null;moved.reverse().forEach(([el,m])=>{m.replaceWith(el)});moved=[];document.querySelectorAll('.fz-live').forEach(x=>x.classList.remove('fz-live'));ov.remove();ov=null;document.documentElement.style.overflow=''}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov&&!document.querySelector('.drawer:not([hidden])')){e.stopPropagation();close()}},true);
  mk();setTimeout(mk,800);window.FZ={open,close}})();
PGL.done();
