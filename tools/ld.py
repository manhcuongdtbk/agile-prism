# DOC: Kiểm Đang tải cả trang qua máy chủ thử (check.sh tự mở máy chủ thử ở cổng 8765). Mọi dòng phải ra True. Gồm: tải xong thì ẩn, bấm liên kết sang trang khác thì hiện, rời trang bằng back thì hiện, quay lại từ bộ nhớ đệm (bfcache) thì ẩn, mỗi lần hiện chuyển động chạy lại từ đầu.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
U='http://localhost:8765/'
vis="(()=>{const l=document.getElementById('pgLoad');return !!l&&!l.hidden&&!l.classList.contains('out')})()"
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});e=[];pg.on('pageerror',lambda x:e.append(str(x)))
    for u in ('index.html','design-system.html','product.html'):
        pg.goto(U+u);pg.wait_for_timeout(1500);print('1 tải xong thì ẩn',u,not pg.evaluate(vis))
    pg.goto(U+'design-system.html');pg.wait_for_timeout(1200)
    pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')})")
    pg.click('nav.pg-nav a[href="index.html"]');pg.wait_for_timeout(1500)
    print('2 bấm liên kết thì hiện ở trang cũ',pg.evaluate("sessionStorage.ldSeen")=='1')
    pg.evaluate("sessionStorage.ldSeen=''");pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')})")
    pg.go_back();pg.wait_for_timeout(1500)
    print('3 rời trang bằng back thì hiện',pg.evaluate("sessionStorage.ldSeen")=='1')
    print('4 trang vừa quay lại không kẹt Đang tải',not pg.evaluate(vis))
    pg.evaluate("PGL.show('x')");pg.wait_for_timeout(1000);n1=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime")
    pg.evaluate("PGL.done()");pg.wait_for_timeout(400);pg.evaluate("PGL.show('y')");pg.wait_for_timeout(100);n2=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime")
    print('5 hiện lại thì chạy từ đầu',n2<n1,round(n1),round(n2))
    print(e)
