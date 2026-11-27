# DOC: Tooltip thuật ngữ không đọng lại (#116, góp ý PO 26/11): S23U chạm thuật ngữ thì mở Glossary, không có tooltip; đóng Glossary vẫn không có tooltip. MacBook bấm thuật ngữ, đóng Glossary (bấm Đóng bằng chuột) thì không còn tooltip. Bàn phím Tab tới thuật ngữ thì vẫn hiện. Đạt: dòng cuối [].
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));T="file://"+_o.path.join(ROOT,"tools",".out","_t.html")
from playwright.sync_api import sync_playwright
bad=[]
vis=lambda pg:pg.evaluate("()=>{const t=document.querySelector('.tip');return !!t&&!t.hidden}")
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,w,h,m in [('S23U dọc',384,719,True),('MacBook',1440,800,False)]:
        pg=b.new_page(viewport={'width':w,'height':h},is_mobile=m,has_touch=m);pg.goto(T);pg.wait_for_timeout(1500)
        t=pg.locator('main [data-t]:visible').nth(5);t.scroll_into_view_if_needed();pg.wait_for_timeout(150)
        u0=t.evaluate('e=>getComputedStyle(e).textDecorationColor')
        (t.tap() if m else t.click());pg.wait_for_timeout(400)
        if pg.locator('#glD').is_hidden():bad.append([name,'bấm thuật ngữ không mở Glossary'])
        if vis(pg):bad.append([name,'Glossary mở mà tooltip vẫn hiện'])
        c=pg.locator('#glClose, #glD .dr-h button').first
        (c.tap() if m else c.click());pg.wait_for_timeout(400)
        if vis(pg):bad.append([name,'đóng Glossary thì tooltip hiện lại'])
        if not m:pg.mouse.move(5,h-5);pg.wait_for_timeout(200)
        if t.evaluate('e=>getComputedStyle(e).textDecorationColor')!=u0:bad.append([name,'đóng Glossary thì thuật ngữ còn gạch chân hồng'])
        if not m:
            h8=pg.locator('main [data-t]:visible').nth(8);h8.scroll_into_view_if_needed();pg.wait_for_timeout(300);h8.hover();pg.wait_for_timeout(200)
            if not vis(pg):bad.append([name,'rê chuột lên thuật ngữ không hiện tooltip'])
            pg.mouse.move(5,h-5);pg.keyboard.press('Escape');pg.evaluate("document.activeElement&&document.activeElement.blur()")
            t.scroll_into_view_if_needed();pg.wait_for_timeout(300);t.focus();pg.keyboard.press('Shift+Tab');pg.keyboard.press('Tab');pg.wait_for_timeout(200)
            if not vis(pg):bad.append([name,'Tab bằng bàn phím tới thuật ngữ không hiện tooltip'])
        pg.close()
print(bad)
