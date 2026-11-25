# DOC: Xem lần lượt: trạng thái lúc mở trang phải khác bước 1, để bấm Xem lần lượt là thấy ngay có thay đổi (#80). Ngoại lệ: hình kiểu "bước 1 là hiện trạng" (BASE), STEP tự rút bước 1 còn 1,2 giây. In hình vi phạm ngoài BASE; [] là đạt.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));T="file://"+_o.path.join(ROOT,"tools",".out","_t.html")
from playwright.sync_api import sync_playwright
JS=r'''async()=>{const out=[];for(const s of document.querySelectorAll('.stp')){const h=s.closest('.ixc,.card');const snap=()=>[...h.querySelectorAll('svg.fig,.ipan,.read,[id^="f-"]')].map(e=>e.innerHTML.replace(/ ?pl-hit/g,'').replace(/\bm\d+(?=[a-z])/g,'m').replace(/ class=""/g,'')).join('|');
  const a=snap();s.querySelector('.stp-d button').click();await new Promise(r=>setTimeout(r,80));if(snap()===a)out.push(s.id);s.closest('.ixc,.card').querySelector('.stp-rs,[id$=Reset],#svRs')?.click()}return out}'''
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});pg.goto(T);pg.wait_for_timeout(1500)
    BASE={'kPlay','pePl','pPlay','prPl','vsPl','xPlay','usfPl'}
    print(sorted(set(pg.evaluate(JS))-BASE))
