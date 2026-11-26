# DOC: Chụp MỌI chỗ dùng 1 thành phần (theo selector CSS) ở MacBook 1440 và S23U dọc 384×719, ghép 1 ảnh mỗi selector để Developers tự xem trước PR giao diện (#123, DoD mục 3). Mỗi hàng: MacBook bên trái, S23U bên phải, có nhãn số thứ tự. Dùng: python3 tools/shot.py [n=12] SELECTOR… (vd `.sc-x` `#f-cfd` `[data-fz]`; tên trần không khớp thẻ nào thì coi là id). Ảnh ở tools/.out/shots/<tên>.png. In: tên, số chỗ tìm thấy, số chỗ đã chụp, số chỗ ẩn, lỗi JS.
import os as _o,sys;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
from playwright.sync_api import sync_playwright
from PIL import Image,ImageDraw
DEV=[('MacBook',1440,800,False),('S23U dọc',384,719,True)]
args=sys.argv[1:];N=12
if args and args[0].startswith('n='):N=int(args[0][2:]);args=args[1:]
if not args:print('Dùng: python3 tools/shot.py [n=12] SELECTOR…');sys.exit(1)
UNHIDE="s=>{for(let e of document.querySelectorAll(s)){while(e){if(e.hidden)e.hidden=false;if(e.tagName==='DETAILS')e.open=true;e=e.parentElement}}}"
def grab(p,w,h,mob,sel):
    b=p.chromium.launch();pg=b.new_page(viewport={'width':w,'height':h},is_mobile=mob,has_touch=mob)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(T);pg.wait_for_timeout(1200)
    pg.evaluate("document.querySelector('nav.top')&&(document.querySelector('nav.top').style.position='static')")
    if pg.locator(sel).count()==0 and sel.replace('-','').replace('_','').isalnum():sel='#'+sel
    pg.evaluate(UNHIDE,sel);pg.wait_for_timeout(200)
    loc=pg.locator(sel);tot=loc.count();ims=[];hid=0
    for k in range(tot):
        if len(ims)>=N:break
        e=loc.nth(k)
        if not e.is_visible():hid+=1;continue
        e.scroll_into_view_if_needed();pg.wait_for_timeout(120);bb=e.bounding_box()
        if not bb or bb['width']<1 or bb['height']<1:hid+=1;continue
        x=max(0,bb['x']-16);y=max(0,bb['y']-40);cw=min(w-x,bb['width']+32);ch=min(bb['height']+80,h)
        f=_o.path.join(OUT,'shots','_tmp.png');pg.screenshot(path=f,clip={'x':x,'y':y,'width':cw,'height':ch});ims.append((k,Image.open(f).copy()))
    b.close();return tot,ims,hid,errs
import glob
_F=(glob.glob('/usr/share/fonts/**/DejaVuSans.ttf',recursive=True)+glob.glob('/usr/share/fonts/**/*.ttf',recursive=True)+[None])[0]
from PIL import ImageFont
FONT=ImageFont.truetype(_F,14) if _F else ImageFont.load_default()
def label(im,t):
    o=Image.new('RGB',(max(im.width,int(FONT.getlength(t))+8),im.height+22),'white');o.paste(im,(0,22));ImageDraw.Draw(o).text((4,3),t,fill=(180,30,90),font=FONT);return o
with sync_playwright() as p:
    for sel in args:
        cols=[];info=[]
        for name,w,h,mob in DEV:
            tot,ims,hid,errs=grab(p,w,h,mob,sel);info.append(f'{name}: {tot} chỗ, chụp {len(ims)}, ẩn {hid}, lỗi JS {errs}')
            cols.append({k:label(im if im.width<=1000 else im.resize((1000,int(im.height*1000/im.width))),f'{name} · {sel} #{k+1}') for k,im in ims})
        keys=sorted(set(cols[0])|set(cols[1]));rows=[];LW=max([i.width for i in cols[0].values()]+[0]);G=20 if LW else 0
        for k in keys:
            a,c=cols[0].get(k),cols[1].get(k)
            r=Image.new('RGB',(LW+G+(c.width if c else 0) or 1,max(a.height if a else 0,c.height if c else 0)),'white')
            if a:r.paste(a,(0,0))
            if c:r.paste(c,(LW+G,0))
            rows.append(r)
        n=sel.strip('#.[]').replace(' ','_').replace('=','-').replace('"','')[:30]
        if rows:
            W=max(r.width for r in rows);H=sum(r.height+12 for r in rows);o=Image.new('RGB',(W,H),(235,235,240));y=0
            for r in rows:o.paste(r,(0,y));y+=r.height+12
            out=_o.path.join(OUT,'shots',n+'.png');o.save(out)
        else:out='(không có ảnh)'
        print(sel,'|',' | '.join(info),'|',out)
