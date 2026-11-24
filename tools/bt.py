# DOC: Nút Quay lại: nhảy đi rồi quay về đúng chỗ.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1440,'height':900})
    e=[];pg.on('pageerror',lambda x:e.append(str(x)))
    pg.goto(T);pg.wait_for_timeout(800)
    def t(name,sel,pre=None):
        pg.evaluate("scrollTo(0,0)");pg.wait_for_timeout(300)
        if pre: pre()
        loc=pg.locator(sel).first;loc.scroll_into_view_if_needed();pg.wait_for_timeout(300)
        y0=pg.evaluate("scrollY");loc.click();pg.wait_for_timeout(3200)
        vis=pg.is_visible('#backChip');y1=pg.evaluate("scrollY")
        ok=None
        if vis:
            pg.click('#backChip');pg.wait_for_timeout(1500);ok=abs(pg.evaluate("scrollY")-y0)<5
        print(name,'moved',int(y1-y0),'chip',vis,'returned',ok)
    t('toc','#tong-quan a[href="#s4-3"]')
    t('ref chip','#s1-5 a.ref')
    t('inline link','#s2-5 a[href="#s6-6"]')
    t('pill 6.5','#s6-5 td.wh a')
    t('pmp pill','#s6-6 .pills a')
    def hov(): pg.hover('nav.top .nvw:nth-of-type(4) a.nv');pg.wait_for_timeout(200)
    t('nav dropdown','nav.top .nvw:nth-of-type(4) .nvd a >> nth=3',hov)
    t('nav part','nav.top a.nv[href="#phan-5"]')
    print(e)
