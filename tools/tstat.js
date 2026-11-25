// DOC: Thống kê độ dài và số câu của trường d trong Glossary, để tìm định nghĩa quá dài. Chạy: node tools/tstat.js
const fs=require('fs'),path=require('path');eval(fs.readFileSync(path.join(__dirname,'..','terms.js'),'utf8').replace(/^const TERMS=/m,'global.TERMS='));
const SEN=s=>s.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỸĐ0-9"(])/u).filter(Boolean);
const all=[];TERMS.forEach(t=>{all.push([t.t,t.d]);(t.s2||[]).forEach(x=>all.push([t.t+' /'+x[0],x[1]]))});
const n=all.map(([k,d])=>SEN(d).length);const h={};n.forEach(x=>h[x]=(h[x]||0)+1);console.log('sentences hist',h,'total',all.length);
const src=/\((?:APG 2|PMBOK 8|Scrum Guide[^)]*|[^)]*20\d\d)\)/;
let ps=0,ms=0;all.forEach(([k,d])=>{const s=SEN(d);if(src.test(s[0]))ps++;s.slice(1).forEach(x=>{if(/APG 2|PMBOK 8|Scrum Guide|slide|trong file|mục \d|ở \d\.\d|Annex/.test(x))ms++})});
console.log('main sentence with (source):',ps,' secondary sentences mentioning source/page:',ms);
const lens=all.map(([k,d])=>SEN(d)[0].split(/\s+/).length).sort((a,b)=>a-b);console.log('main words median',lens[lens.length>>1],'max',lens.at(-1));
all.filter(([k,d])=>SEN(d).length>=3).slice(0,8).forEach(([k,d])=>console.log('--',k,'|',d));
console.log('ex short bullets:');all.forEach(([k,d])=>SEN(d).slice(1).forEach(x=>{if(x.split(' ').length<=6)console.log('  ',k,'|',x)}));
