# DOC: Kiểm Đang tải cả trang qua máy chủ thử (check.sh tự mở máy chủ thử ở cổng 8765). Mọi dòng phải ra True. Gồm: tải xong thì ẩn, bấm liên kết sang trang khác thì hiện, rời trang bằng back thì hiện, quay lại từ bộ nhớ đệm (bfcache) thì ẩn, mỗi lần hiện chuyển động chạy lại từ đầu.
import re,os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
U='http://localhost:8765/'
def LAT(pg,ms):
    c=pg.context.new_cdp_session(pg);c.send('Network.enable');c.send('Network.setCacheDisabled',{'cacheDisabled':bool(ms)});c.send('Network.emulateNetworkConditions',{'offline':False,'latency':ms,'downloadThroughput':-1,'uploadThroughput':-1});return c
# Rời trang thì lớp phủ chờ 150 ms mới hiện (#139, PO 28/11): đo trạng thái trang cũ sau 300 ms, mạng giả chậm 800 ms để trang cũ còn sống
vis="(()=>{const l=document.getElementById('pgLoad');return !!l&&!l.hidden&&!l.classList.contains('out')})()"
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});e=[];pg.on('pageerror',lambda x:e.append(str(x)))
    for u in ('index.html','design-system.html','product.html'):
        pg.goto(U+u);pg.wait_for_timeout(1500);print('1 tải xong thì ẩn',u,not pg.evaluate(vis))
    pg.goto(U+'design-system.html');pg.wait_for_timeout(1200)
    pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ld0=(document.getElementById('pgLoad').hidden?'0':'1');setTimeout(()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')},300)})")
    cl=LAT(pg,800);pg.click('nav.pg-nav a[href="index.html"]');pg.wait_for_timeout(2500)
    print('2 bấm liên kết thì hiện ở trang cũ (sau 150 ms, không hiện ngay)',pg.evaluate("sessionStorage.ldSeen")=='1' and pg.evaluate("sessionStorage.ld0")=='0')
    pg.evaluate("sessionStorage.ldSeen=''");pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ld0=(document.getElementById('pgLoad').hidden?'0':'1');setTimeout(()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')},300)})")
    pg.go_back();pg.wait_for_timeout(2500)
    print('3 rời trang bằng back thì hiện (sau 150 ms)',pg.evaluate("sessionStorage.ldSeen")=='1' and pg.evaluate("sessionStorage.ld0")=='0')
    cl.send('Network.emulateNetworkConditions',{'offline':False,'latency':0,'downloadThroughput':-1,'uploadThroughput':-1})
    print('4 trang vừa quay lại không kẹt Đang tải',not pg.evaluate(vis))
    pg.evaluate("PGL.show('x')");pg.wait_for_timeout(1000);n1=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime")
    pg.evaluate("PGL.done()");pg.wait_for_timeout(400);pg.evaluate("PGL.show('y')");pg.wait_for_timeout(100);n2=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime")
    print('5 hiện lại thì chạy từ đầu',n2<n1,round(n1),round(n2))
    # 6 tải lại giữa trang (#119): mọi khung hình trang ở sai chỗ thì lớp phủ phải đục hẳn; lúc gỡ lớp phủ đã ở đúng chỗ
    pg2=b.new_page(viewport={'width':1440,'height':900});pg2.goto(U+'index.html');pg2.wait_for_timeout(1500);pg2.evaluate("scrollTo({top:20000,behavior:'instant'})");pg2.wait_for_timeout(300);Y=pg2.evaluate("scrollY")
    pg2.add_init_script(r"""(()=>{const L=window.__rl=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l);const op=!l.hidden&&!l.classList.contains('out');const bg=c.backgroundColor;const solid=!/rgba\(.*,\s*0?\.\d+\)|color\(.*\/\s*0?\.\d+\)/.test(bg);L.push([Math.round(scrollY),op,solid]);if(!op&&L.length>3)return}requestAnimationFrame(f)};requestAnimationFrame(f)})()""")
    pg2.reload();pg2.wait_for_timeout(4000);L=pg2.evaluate("window.__rl")
    leak=[x for x in L if abs(x[0]-Y)>2 and not (x[1] and x[2])];first_out=next((x for x in L if not x[1]),None)
    print('6 tải lại: không lộ trang ở sai chỗ',not leak and first_out is not None and abs(first_out[0]-Y)<=2,'khung:',len(L),'lộ:',len(leak),'gỡ ở',first_out and first_out[0],'đích',Y)
    # 7 điện thoại chậm (CPU chậm 6 lần, như Android thật) tải lại giữa trang: về đúng chỗ (review #119)
    pg3=b.new_page(viewport={'width':384,'height':719},is_mobile=True,has_touch=True);pg3.goto(U+'index.html');pg3.wait_for_timeout(2000);pg3.evaluate("scrollTo({top:20000,behavior:'instant'})");pg3.wait_for_timeout(300);Y3=pg3.evaluate("scrollY")
    cdp=pg3.context.new_cdp_session(pg3);cdp.send('Emulation.setCPUThrottlingRate',{'rate':6});pg3.reload();pg3.wait_for_timeout(15000)
    cdp.send('Emulation.setCPUThrottlingRate',{'rate':1});y3=pg3.evaluate("scrollY");o3=pg3.evaluate(vis)
    print('7 máy chậm tải lại: về đúng chỗ, gỡ lớp phủ',abs(y3-Y3)<=2 and not o3,'ở',y3,'đích',Y3)
    # 8 chỗ đã lưu vượt cuối trang: gỡ lớp phủ sớm, không giữ đủ 3 giây
    pg3.evaluate("sessionStorage.setItem('apY','99999999')");pg3.reload();pg3.wait_for_timeout(2500)
    print('8 đích vượt cuối trang: gỡ lớp phủ trong 2.5 giây',not pg3.evaluate(vis))
    # 9 (#139, PO 27/11: lớp phủ đục hẳn mọi lúc): tải lại thì lúc rời trang lớp phủ hiện ngay, đục, không blur, không chạy bản đồ nhỏ, chữ của chính trang; bấm liên kết thì hiện dần, cũng đục; mở trang lần đầu cũng đục
    SOLID=lambda c:bool(re.match(r'^rgb\(\d+, \d+, \d+\)$',c))
    pg4=b.new_page(viewport={'width':1440,'height':900});pg4.goto(U+'index.html');pg4.wait_for_function("!document.documentElement.classList.contains('ap-rl')&&document.getElementById('pgLoad').hidden",timeout=15000)
    LAT(pg4,800);pg4.evaluate("addEventListener('beforeunload',()=>setTimeout(()=>{const l=document.getElementById('pgLoad'),c=getComputedStyle(l);sessionStorage.ld9=JSON.stringify([c.opacity,c.transitionDuration,c.backdropFilter,c.backgroundColor,l.querySelector('.pl-t').textContent,getComputedStyle(l.querySelector('.kb-ld')).visibility])},300))")
    pg4.reload();pg4.wait_for_function("!document.documentElement.classList.contains('ap-rl')",timeout=15000);r=pg4.evaluate("JSON.parse(sessionStorage.ld9||'null')")
    ok=bool(r) and r[0]=='1' and r[1]=='0s' and r[2]=='none' and SOLID(r[3]) and r[4]=='Đang mở Bản đồ trực quan' and r[5]=='hidden'
    pg4.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
    c4=pg4.evaluate("(()=>{PGL.show(null,true);PGL.done();PGL.show('x');const l=document.getElementById('pgLoad'),c=getComputedStyle(l);const r=[c.transitionDuration,c.backgroundColor,getComputedStyle(l.querySelector('.kb-ld')).visibility];PGL.done();return r})()")
    print('9 tải lại: hiện ngay, đục, không chạy bản đồ nhỏ, đúng chữ',ok,r,'; PGL.show trực tiếp (nút Thử Đang tải): hiện dần, đục, có bản đồ nhỏ',c4[0]!='0s' and SOLID(c4[1]) and c4[2]=='visible',c4)
    pg6=b.new_page(viewport={'width':1440,'height':900});pg6.add_init_script("requestAnimationFrame(()=>{const l=document.getElementById('pgLoad');window.__f1=l?getComputedStyle(l).backgroundColor:null})");pg6.goto(U+'product.html');pg6.wait_for_timeout(300)
    f1=pg6.evaluate("window.__f1");print('10 mở trang lần đầu: lớp phủ đục',SOLID(f1 or ''),f1);pg6.close()
    # 11 bấm liên kết (#139 lượt 2): trang cũ chỉ hiện chữ trang đích, không chạy bản đồ nhỏ, nền đục
    pg7=b.new_page(viewport={'width':1440,'height':900});pg7.goto(U+'design-system.html');pg7.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
    c7=LAT(pg7,800);pg7.evaluate("addEventListener('beforeunload',()=>setTimeout(()=>{const l=document.getElementById('pgLoad');sessionStorage.ld11=JSON.stringify([getComputedStyle(l.querySelector('.kb-ld')).visibility,getComputedStyle(l).backgroundColor,l.querySelector('.pl-t').textContent])},300))")
    pg7.click('nav.pg-nav a[href="index.html"]');pg7.wait_for_timeout(3000);c7.send('Network.emulateNetworkConditions',{'offline':False,'latency':0,'downloadThroughput':-1,'uploadThroughput':-1});r7=pg7.evaluate("JSON.parse(sessionStorage.ld11||'null')")
    print('11 bấm liên kết: chỉ chữ trang đích, không bản đồ nhỏ, đục',bool(r7) and r7[0]=='hidden' and SOLID(r7[1]) and r7[2]=='Đang mở Bản đồ trực quan',r7)
    # 12 quay lại từ bộ nhớ đệm (headless không có bfcache nên giả lập pageshow persisted): gỡ ngay, không mờ dần; lần hiện sau vẫn hiện dần, có bản đồ nhỏ
    pg7.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
    r12=pg7.evaluate("""(()=>{PGL.show('x');const l=document.getElementById('pgLoad');dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));const a=getComputedStyle(l).opacity;return new Promise(res=>setTimeout(()=>{PGL.show('y');const c=getComputedStyle(l);const r=[a,c.transitionDuration,getComputedStyle(l.querySelector('.kb-ld')).visibility];PGL.done();res(r)},400))})()""")
    print('12 bộ nhớ đệm: gỡ ngay; lần sau hiện dần, có bản đồ nhỏ',r12[0]=='0' and r12[1]!='0s' and r12[2]=='visible',r12)
    # 13 (#139, review lượt 3): thời gian tính từ lúc bắt đầu chuyển trang (performance.now). Trang nhanh: lớp phủ không lần nào hiện (độ đục > 0) trước 150 ms, và gỡ trước 150 ms thì không lần nào hiện. Trang chậm (mạng chậm 800 ms): khung vẽ đầu tiên đã có lớp phủ, không lộ trang thô
    REC="(()=>{const L=window.__v=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l);L.push([Math.round(performance.now()),!l.hidden&&c.visibility==='visible'&&+c.opacity>0,l.classList.contains('out')])}if(performance.now()<6000)requestAnimationFrame(f)};requestAnimationFrame(f)})()"
    pg8=b.new_page(viewport={'width':1440,'height':900});pg8.add_init_script(REC);pg8.goto(U+'product.html');pg8.wait_for_timeout(1700);V=pg8.evaluate("window.__v")
    early=[x for x in V if x[1] and x[0]<150];out=next((x[0] for x in V if x[2]),None);shown=[x for x in V if x[1]]
    print('13a trang nhanh: không hiện trước 150 ms; gỡ trước 150 ms thì không hiện lần nào',not early and (out is None or out>=150 or not shown),'gỡ ở',out,'khung hiện',len(shown));pg8.close()
    pg9=b.new_page(viewport={'width':1440,'height':900});pg9.add_init_script(REC);c9=LAT(pg9,800);pg9.goto(U+'index.html');pg9.wait_for_timeout(6500);V=pg9.evaluate("window.__v")
    print('13b mạng chậm: khung vẽ đầu tiên đã có lớp phủ',bool(V) and V[0][1],[[x[0],'hiện' if x[1] else 'ẩn'] for x in V[:2]])  # không in True/False của từng khung: check.sh coi chữ False là lỗi;pg9.close()
    print(e)
