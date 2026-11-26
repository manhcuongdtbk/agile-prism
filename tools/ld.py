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
    # 6 tải lại giữa trang (#119): mọi khung hình trang ở sai chỗ thì lớp phủ phải đục hẳn; lúc gỡ lớp phủ đã ở đúng chỗ
    pg2=b.new_page(viewport={'width':1440,'height':900});pg2.goto(U+'index.html');pg2.wait_for_timeout(1500);pg2.evaluate("scrollTo(0,20000)");pg2.wait_for_timeout(300);Y=pg2.evaluate("scrollY")
    pg2.add_init_script(r"""(()=>{const L=window.__rl=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l);const op=!l.hidden&&!l.classList.contains('out');const bg=c.backgroundColor;const solid=!/rgba\(.*,\s*0?\.\d+\)|color\(.*\/\s*0?\.\d+\)/.test(bg);L.push([Math.round(scrollY),op,solid]);if(!op&&L.length>3)return}requestAnimationFrame(f)};requestAnimationFrame(f)})()""")
    pg2.reload();pg2.wait_for_timeout(4000);L=pg2.evaluate("window.__rl")
    leak=[x for x in L if abs(x[0]-Y)>2 and not (x[1] and x[2])];first_out=next((x for x in L if not x[1]),None)
    print('6 tải lại: không lộ trang ở sai chỗ',not leak and first_out is not None and abs(first_out[0]-Y)<=2,'khung:',len(L),'lộ:',len(leak),'gỡ ở',first_out and first_out[0],'đích',Y)
    print(e)
