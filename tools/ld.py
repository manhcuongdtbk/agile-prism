# DOC: (tham số a hoặc b: chỉ chạy phần a phép 1–8 hoặc phần b phép 9–15) Kiểm Đang tải cả trang qua máy chủ thử (check.sh tự mở máy chủ thử ở cổng 8765). Mọi dòng phải ra True. Gồm: tải xong thì ẩn, bấm liên kết sang trang khác thì hiện, rời trang bằng back thì hiện, quay lại từ bộ nhớ đệm (bfcache) thì ẩn, mỗi lần hiện chuyển động chạy lại từ đầu.
import re,os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from playwright.sync_api import sync_playwright
PART=sys.argv[1] if len(sys.argv)>1 else ''  # check.sh chạy song song 2 phần: ld.py a, ld.py b (#69); không tham số = cả 2
U='http://localhost:8765/'
def LAT(pg,ms):
    c=pg.context.new_cdp_session(pg);c.send('Network.enable');c.send('Network.setCacheDisabled',{'cacheDisabled':bool(ms)});c.send('Network.emulateNetworkConditions',{'offline':False,'latency':ms,'downloadThroughput':-1,'uploadThroughput':-1});return c
# Rời trang thì lớp phủ chờ 150 ms mới hiện (#139, PO 28/11): đo trạng thái trang cũ sau 300 ms, mạng giả chậm 800 ms để trang cũ còn sống
vis="(()=>{const l=document.getElementById('pgLoad');return !!l&&!l.hidden&&!l.classList.contains('out')})()"
# Chờ theo điều kiện thay vì chờ cố định (#69): đi tiếp ngay khi điều kiện đạt, quá hạn thì trả False (giữ đúng mốc thời gian của phép kiểm cũ)
def W(pg,js,t):
    try: pg.wait_for_function(js,timeout=t);return True
    except Exception: return False
HID='!('+vis+')'
GONE="document.getElementById('pgLoad').hidden"  # đã gỡ hẳn (thuộc tính hidden), không chỉ đang mờ dần
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900});e=[];pg.on('pageerror',lambda x:e.append(str(x)))
    if PART in ('','a'):  # phần a: phép 1–8 (mở, rời, quay lại, tải lại giữa trang)
        for u in ('index.html','design-system.html','product.html'):
            pg.goto(U+u);print('1 tải xong thì ẩn',u,W(pg,HID,1500))
        pg.goto(U+'design-system.html');W(pg,GONE,15000)
        pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ld0=(document.getElementById('pgLoad').hidden?'0':'1');setTimeout(()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')},300)})")
        cl=LAT(pg,800);pg.click('nav.pg-nav a[href="index.html"]');pg.wait_for_url('**/index.html');W(pg,"!!sessionStorage.ldSeen",2500)
        print('2 bấm liên kết thì hiện ở trang cũ (sau 150 ms, không hiện ngay)',pg.evaluate("sessionStorage.ldSeen")=='1' and pg.evaluate("sessionStorage.ld0")=='0')
        W(pg,GONE,15000);pg.evaluate("sessionStorage.ldSeen=''");pg.evaluate("window.addEventListener('beforeunload',()=>{sessionStorage.ld0=(document.getElementById('pgLoad').hidden?'0':'1');setTimeout(()=>{sessionStorage.ldSeen=(document.getElementById('pgLoad').hidden?'0':'1')},300)})")
        pg.go_back();pg.wait_for_url('**/design-system.html');W(pg,"!!sessionStorage.ldSeen",2500)
        print('3 rời trang bằng back thì hiện (sau 150 ms)',pg.evaluate("sessionStorage.ldSeen")=='1' and pg.evaluate("sessionStorage.ld0")=='0')
        cl.send('Network.emulateNetworkConditions',{'offline':False,'latency':0,'downloadThroughput':-1,'uploadThroughput':-1})
        print('4 trang vừa quay lại không kẹt Đang tải',not pg.evaluate(vis))
        pg.evaluate("PGL.show('x')");pg.wait_for_timeout(600);n1=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime-document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].effect.getComputedTiming().delay")
        pg.evaluate("PGL.done()");pg.wait_for_timeout(400);pg.evaluate("PGL.show('y')");pg.wait_for_timeout(100);n2=pg.evaluate("document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].currentTime-document.querySelector('#pgLoad .kb-ld i').getAnimations()[0].effect.getComputedTiming().delay")
        print('5 hiện lại thì chạy từ đầu',n2<n1,round(n1),round(n2))
        # 6 tải lại giữa trang (#119): mọi khung hình trang ở sai chỗ thì lớp phủ phải đục hẳn; lúc gỡ lớp phủ đã ở đúng chỗ
        pg2=b.new_page(viewport={'width':1440,'height':900});pg2.goto(U+'index.html');W(pg2,GONE,15000);pg2.evaluate("scrollTo({top:20000,behavior:'instant'})");pg2.wait_for_timeout(300);Y=pg2.evaluate("scrollY")
        pg2.add_init_script(r"""(()=>{const L=window.__rl=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l);const op=!l.hidden&&!l.classList.contains('out');const bg=c.backgroundColor;const solid=!/rgba\(.*,\s*0?\.\d+\)|color\(.*\/\s*0?\.\d+\)/.test(bg);L.push([Math.round(scrollY),op,solid]);if(!op&&L.length>3)return}requestAnimationFrame(f)};requestAnimationFrame(f)})()""")
        pg2.reload();W(pg2,"(window.__rl||[]).some(x=>!x[1])",4000);pg2.wait_for_timeout(200);L=pg2.evaluate("window.__rl")
        leak=[x for x in L if abs(x[0]-Y)>2 and not (x[1] and x[2])];first_out=next((x for x in L if not x[1]),None)
        print('6 tải lại: không lộ trang ở sai chỗ',not leak and first_out is not None and abs(first_out[0]-Y)<=2,'khung:',len(L),'lộ:',len(leak),'gỡ ở',first_out and first_out[0],'đích',Y)
        # 7 điện thoại chậm (CPU chậm 6 lần, như Android thật) tải lại giữa trang: về đúng chỗ (review #119)
        pg3=b.new_page(viewport={'width':384,'height':719},is_mobile=True,has_touch=True);pg3.goto(U+'index.html');W(pg3,GONE,15000);pg3.evaluate("scrollTo({top:20000,behavior:'instant'})");pg3.wait_for_timeout(300);Y3=pg3.evaluate("scrollY")
        cdp=pg3.context.new_cdp_session(pg3);cdp.send('Emulation.setCPUThrottlingRate',{'rate':6});pg3.reload();W(pg3,"!document.documentElement.classList.contains('ap-rl')&&"+HID,15000);pg3.wait_for_timeout(500)
        cdp.send('Emulation.setCPUThrottlingRate',{'rate':1});y3=pg3.evaluate("scrollY");o3=pg3.evaluate(vis)
        print('7 máy chậm tải lại: về đúng chỗ, gỡ lớp phủ',abs(y3-Y3)<=2 and not o3,'ở',y3,'đích',Y3)
        # 8 chỗ đã lưu vượt cuối trang: gỡ lớp phủ sớm, không giữ đủ 3 giây
        pg3.evaluate("sessionStorage.setItem('apY','99999999')");pg3.reload()
        print('8 đích vượt cuối trang: gỡ lớp phủ trong 2.5 giây',W(pg3,HID,2500))
    if PART in ('','b'):  # phần b: phép 9–15 (đục, chữ, bản đồ nhỏ, 150 ms, 400 ms)
        # 9 (#139, PO 27/11: lớp phủ đục hẳn mọi lúc): tải lại thì lúc rời trang lớp phủ hiện, đục, không mờ dần, có bản đồ nhỏ, chữ của chính trang; bấm liên kết thì hiện dần, cũng đục; mở trang lần đầu cũng đục
        SOLID=lambda c:bool(re.match(r'^rgb\(\d+, \d+, \d+\)$',c))
        pg4=b.new_page(viewport={'width':1440,'height':900});pg4.goto(U+'index.html');pg4.wait_for_function("!document.documentElement.classList.contains('ap-rl')&&document.getElementById('pgLoad').hidden",timeout=15000)
        LAT(pg4,800);pg4.evaluate("addEventListener('beforeunload',()=>setTimeout(()=>{const l=document.getElementById('pgLoad'),c=getComputedStyle(l);sessionStorage.ld9=JSON.stringify([c.opacity,c.transitionDuration,c.backdropFilter,c.backgroundColor,l.querySelector('.pl-t').textContent,getComputedStyle(l.querySelector('.kb-ld')).visibility])},300))")
        pg4.reload();pg4.wait_for_function("!document.documentElement.classList.contains('ap-rl')",timeout=15000);r=pg4.evaluate("JSON.parse(sessionStorage.ld9||'null')")
        ok=bool(r) and r[0]=='1' and r[1]=='0s' and r[2]=='none' and SOLID(r[3]) and r[4]=='Đang mở Bản đồ trực quan' and r[5]=='visible'
        pg4.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
        c4=pg4.evaluate("(()=>{PGL.show(null,true);PGL.done();PGL.show('x');const l=document.getElementById('pgLoad'),c=getComputedStyle(l);const r=[c.transitionDuration,c.backgroundColor,getComputedStyle(l.querySelector('.kb-ld')).visibility];PGL.done();return r})()")
        print('9 tải lại: hiện ngay, đục, có bản đồ nhỏ, đúng chữ',ok,r,'; PGL.show trực tiếp (nút Thử Đang tải): hiện dần, đục, có bản đồ nhỏ',c4[0]!='0s' and SOLID(c4[1]) and c4[2]=='visible',c4)
        pg6=b.new_page(viewport={'width':1440,'height':900});pg6.add_init_script("requestAnimationFrame(()=>{const l=document.getElementById('pgLoad');window.__f1=l?getComputedStyle(l).backgroundColor:null})");pg6.goto(U+'product.html');pg6.wait_for_timeout(300)
        f1=pg6.evaluate("window.__f1");print('10 mở trang lần đầu: lớp phủ đục',SOLID(f1 or ''),f1);pg6.close()
        # 11 bấm liên kết (#139 lượt 2): trang cũ hiện chữ trang đích, có bản đồ nhỏ, nền đục
        pg7=b.new_page(viewport={'width':1440,'height':900});pg7.goto(U+'design-system.html');pg7.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
        c7=LAT(pg7,800);pg7.evaluate("addEventListener('beforeunload',()=>setTimeout(()=>{const l=document.getElementById('pgLoad');sessionStorage.ld11=JSON.stringify([getComputedStyle(l.querySelector('.kb-ld')).visibility,getComputedStyle(l).backgroundColor,l.querySelector('.pl-t').textContent])},300))")
        pg7.click('nav.pg-nav a[href="index.html"]');pg7.wait_for_url('**/index.html');W(pg7,"!!sessionStorage.ld11",3000);c7.send('Network.emulateNetworkConditions',{'offline':False,'latency':0,'downloadThroughput':-1,'uploadThroughput':-1});r7=pg7.evaluate("JSON.parse(sessionStorage.ld11||'null')")
        print('11 bấm liên kết: chữ trang đích, có bản đồ nhỏ, đục',bool(r7) and r7[0]=='visible' and SOLID(r7[1]) and r7[2]=='Đang mở Bản đồ trực quan',r7)
        # 12 quay lại từ bộ nhớ đệm (headless không có bfcache nên giả lập pageshow persisted): gỡ ngay, không mờ dần; lần hiện sau vẫn hiện dần, có bản đồ nhỏ
        pg7.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
        r12=pg7.evaluate("""(()=>{PGL.show('x');const l=document.getElementById('pgLoad');dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true}));const a=getComputedStyle(l).opacity;return new Promise(res=>setTimeout(()=>{PGL.show('y');const c=getComputedStyle(l);const r=[a,c.transitionDuration,getComputedStyle(l.querySelector('.kb-ld')).visibility];PGL.done();res(r)},400))})()""")
        print('12 bộ nhớ đệm: gỡ ngay; lần sau hiện dần, có bản đồ nhỏ',r12[0]=='0' and r12[1]!='0s' and r12[2]=='visible',r12)
        # 13 (#139, review lượt 3): thời gian tính từ lúc bắt đầu chuyển trang (performance.now). Trang nhanh: lớp phủ không lần nào hiện (độ đục > 0) trước 150 ms, và gỡ trước 150 ms thì không lần nào hiện. Trang chậm (mạng chậm 800 ms): khung vẽ đầu tiên đã có lớp phủ, không lộ trang thô
        REC="(()=>{const L=window.__v=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l);L.push([Math.round(performance.now()),!l.hidden&&c.visibility==='visible'&&+c.opacity>0,l.classList.contains('out')])}if(performance.now()<6000)requestAnimationFrame(f)};requestAnimationFrame(f)})()"
        pg8=b.new_page(viewport={'width':1440,'height':900});pg8.add_init_script(REC);pg8.goto(U+'product.html');W(pg8,"(window.__v||[]).some(x=>x[2])||performance.now()>1700",1700);pg8.wait_for_timeout(100);V=pg8.evaluate("window.__v")
        early=[x for x in V if x[1] and x[0]<150];out=next((x[0] for x in V if x[2]),None);shown=[x for x in V if x[1]]
        print('13a trang nhanh: không hiện trước 150 ms; gỡ trước 150 ms thì không hiện lần nào',not early and (out is None or out>=150 or not shown),'gỡ ở',out,'khung hiện',len(shown));pg8.close()
        pg9=b.new_page(viewport={'width':1440,'height':900});pg9.add_init_script(REC);c9=LAT(pg9,800);pg9.goto(U+'index.html');W(pg9,"(window.__v||[]).length>=2",6500);V=pg9.evaluate("window.__v")
        print('13b mạng chậm: khung vẽ đầu tiên đã có lớp phủ',bool(V) and V[0][1],[[x[0],'hiện' if x[1] else 'ẩn'] for x in V[:2]]);pg9.close()  # không in True/False của từng khung: check.sh coi chữ False là lỗi
        # 14 (#139, PO 28/11): đã hiện thì giữ ít nhất 400 ms tính từ lúc người đọc bắt đầu thấy (review lượt 4: đo theo khung thấy được, không theo công thức của code)
        REC2="(()=>{const L=window.__v=[];const f=()=>{const l=document.getElementById('pgLoad');if(l){const c=getComputedStyle(l),k=l.querySelector('.kb-ld');L.push([Math.round(performance.timeOrigin+performance.now()),!l.hidden&&c.visibility==='visible'&&+c.opacity>0,l.classList.contains('out'),!!k&&getComputedStyle(k).visibility==='visible'])}if(performance.now()<6000)requestAnimationFrame(f)};requestAnimationFrame(f)})()"
        # 14a bấm liên kết, mạng giả chậm 250 ms: trang cũ hiện chữ; trang mới hiện tiếp y hệt từ khung đầu (không bản đồ nhỏ), gỡ không sớm hơn 380 ms sau lúc trang cũ hiện
        pg10=b.new_page(viewport={'width':1440,'height':900});pg10.goto(U+'product.html');pg10.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
        pg10.add_init_script(REC2);c10=LAT(pg10,250);pg10.click('nav.pg-nav a[href="design-system.html"]');pg10.wait_for_url('**/design-system.html');W(pg10,"(window.__v||[]).some(x=>x[2])",3000);V=pg10.evaluate("window.__v");pls=pg10.evaluate("window.__pls")
        out=next((x[0] for x in V if x[2]),None);vis=[x for x in V if x[1] and not x[2]]
        print('14a chuyển trang: trang mới hiện tiếp từ khung đầu, giữ đủ 400 ms',bool(pls) and bool(V) and V[0][1] and all(x[3] for x in vis) and out is not None and out-pls>=380,'trang cũ hiện lúc',pls,'gỡ sau',out and pls and out-pls,'ms');pg10.close()
        # 14b mở thẳng 1 trang, mạng giả chậm 250 ms: từ khung thấy được đầu tiên tới lúc gỡ từ 380 ms trở lên (hoặc không hiện lần nào)
        pg11=b.new_page(viewport={'width':1440,'height':900});pg11.add_init_script(REC2);c11=LAT(pg11,250);pg11.goto(U+'design-system.html');W(pg11,"(window.__v||[]).some(x=>x[2])||performance.now()>3000",3000);V=pg11.evaluate("window.__v")
        vis=[x for x in V if x[1] and not x[2]];out=next((x[0] for x in V if x[2]),None)
        print('14b mở trang: đã hiện thì giữ đủ 400 ms',not vis or (out is not None and out-vis[0][0]>=380),'hiện',vis and vis[0][0]-V[0][0],'gỡ sau',vis and out and out-vis[0][0],'ms');pg11.close()
        # 15 (#139, review lượt 5): mạng giả chậm 800 ms, bấm liên kết: cả 5 chuyển động của bản đồ nhỏ ở khung đầu trang mới chạy tiếp từ đúng hình trang cũ để lại lúc bị gỡ (lệch dưới 120 ms), không chạy lại từ đầu, không nhảy theo giờ thật
        PH="(()=>{const k=document.querySelector('#pgLoad .kb-ld');return k?k.getAnimations({subtree:true}).map(a=>a.currentTime-a.effect.getComputedTiming().delay):null})()"
        pg12=b.new_page(viewport={'width':1440,'height':900});pg12.goto(U+'product.html');pg12.wait_for_function("document.getElementById('pgLoad').hidden",timeout=15000)
        pg12.evaluate("addEventListener('pagehide',()=>{sessionStorage.phOld=JSON.stringify("+PH+")})")
        pg12.add_init_script("requestAnimationFrame(function f(){const k=document.querySelector('#pgLoad .kb-ld');const A=k&&k.getAnimations({subtree:true});if(A&&A.length===5&&!window.__ph)window.__ph=[JSON.parse(sessionStorage.phOld||'null'),A.map(a=>a.currentTime-a.effect.getComputedTiming().delay)];else if(!window.__ph)requestAnimationFrame(f)})")
        c12=LAT(pg12,800);pg12.click('nav.pg-nav a[href="design-system.html"]');pg12.wait_for_url('**/design-system.html');W(pg12,"!!window.__ph",3500);ph=pg12.evaluate("window.__ph")
        ok=bool(ph) and ph[0] and len(ph[0])==5 and len(ph[1])==5;dd=[round(abs(((n-o)+1300)%2600-1300)) for o,n in zip(ph[0],ph[1])] if ok else None
        print('15 mạng chậm: bản đồ nhỏ chạy tiếp từ hình trang cũ',bool(ok) and max(dd)<120,'lệch từng chuyển động (ms)',dd);pg12.close()
    print(e)
