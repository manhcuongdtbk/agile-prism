# DOC: Tablet Lenovo Legion Y700 gen 2 (khoảng 582x931 CSS px) đứng, nằm, và 800x1280 đứng, nằm: không lỗi JS, không tràn ngang (luật của mob2.py), liệt kê hình phải cuộn ngang mà không có nút "⤢ Xem cả hình". Đạt: mỗi dòng ra [] [] [] [].
import os as _o,re,sys;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
MOB=re.search(r"JS=r'''(.*?)'''",open(_o.path.join(ROOT,'tools','mob2.py')).read(),re.S).group(1)
SCR=r'''()=>[...document.querySelectorAll('[id^="f-"]')].filter(c=>{const s=c.querySelector(':scope>svg.fig');return s&&c.scrollWidth>c.clientWidth+1&&!(c.previousElementSibling&&c.previousElementSibling.classList.contains('fz-b')&&c.previousElementSibling.offsetParent)}).map(c=>c.id+':'+c.clientWidth+'/'+c.scrollWidth)'''
VPS=[(582,931),(931,582),(800,1280),(1280,800)]
if len(sys.argv)>1:VPS=[tuple(map(int,a.split('x'))) for a in sys.argv[1:]]
with sync_playwright() as p:
    b=p.chromium.launch()
    for W,H in VPS:
        pg=b.new_page(viewport={'width':W,'height':H},is_mobile=True,has_touch=True,device_scale_factor=2.75);e=[];pg.on('pageerror',lambda x:e.append(str(x)))
        pg.goto(T);pg.wait_for_timeout(1500)
        sw=pg.evaluate('document.documentElement.scrollWidth');ov=pg.evaluate(MOB);sc=pg.evaluate(SCR)
        print(f'{W}x{H}',[] if sw==W else ['TRÀN NGANG',sw],e,[x for x in ov][:8],sc)
        pg.close()
