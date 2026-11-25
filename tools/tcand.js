// DOC: Rà trường d của Glossary: câu phụ đang chứa ý của ne (Khác X), syn, old (tên cũ) hay "Xem x.y" thì in ra để chuyển sang đúng trường. Chạy: node tools/tcand.js
const fs=require('fs'),path=require('path');eval(fs.readFileSync(path.join(__dirname,'..','terms.js'),'utf8').replace(/^const TERMS=/m,'global.TERMS='));
const SEN=s=>s.split(/(?<=[.!?])\s+(?=[A-ZÀ-ỸĐ0-9"(])/u).filter(Boolean);
TERMS.forEach(t=>{[['',t.d],...(t.s2||[])].forEach(([lab,d])=>SEN(d).slice(1).forEach(x=>{
 let k='';if(/^(Khác|Ngược|Không phải|Không nhầm|Đừng nhầm|Phân biệt)/.test(x))k='NE';else if(/gọi là|Còn gọi|Tên cũ|thay bằng|tên khác/.test(x))k='NAME';else if(/^Xem \d/.test(x))k='XEM';
 if(k)console.log(k,'|',t.t,lab?'/'+lab:'','|',x,'|| syn:',t.syn,'| old:',JSON.stringify(t.old))}))});
