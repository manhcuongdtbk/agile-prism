# DOC: Sinh product.html (trang Sản phẩm, chỉ ở staging) từ san-pham.md (đường dẫn là tham số đầu tiên), cùng khung với design-system.html (hero, thanh trang, mục lục, card). Chạy sau mỗi lần sửa san-pham.md.
import sys
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import re,markdown
src=open(sys.argv[1] if len(sys.argv)>1 else _o.path.join(ROOT,'..','san-pham.md')).read()
title=re.search(r'^# (.+)$',src,re.M).group(1);src=re.sub(r'^# .+\n','',src,1)
body=markdown.markdown(src,extensions=['tables']).replace('<table>','<table class="t">')
parts=re.split(r'(?=<h2>)',body);intro,secs=parts[0],parts[1:]
toc='';cards=''
for k,p in enumerate(secs):
    h=re.match(r'<h2>(?:(\d+)\.\s*)?(.*?)</h2>',p);num=h.group(1) or str(k);name=h.group(2);rest=p[h.end():]
    sid=f'pd-{num}';toc+=f'<a href="#{sid}"><b>{num}</b>{re.sub("<[^>]+>","",name)}</a>'
    rest=rest.replace('<h3>','<p class="eyebrow" style="margin-top:20px">').replace('</h3>','</p>')
    cards+=f'<section class="card" id="{sid}">\n  <div class="card-head"><span class="num">{num}</span><h3>{name}</h3></div>\n  {rest}</section>\n'
html=f'''<!DOCTYPE html>
<html lang="vi"><head>
<meta name="robots" content="noindex, nofollow"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sản phẩm – Agile Prism</title><link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="site.css">
</head>
<body class="ds">
<div id="pgLoad" class="pg-load" role="status" aria-live="polite"><div class="pl-box"><span class="kb-ld" aria-hidden="true"><i></i><i></i><i></i></span><span class="pl-t">Đang mở Sản phẩm</span></div></div>
<header class="hero wrap">
  <a class="brand" href="index.html" aria-label="Agile Prism, về trang chính"><img src="logo.svg" alt="" width="40" height="40"><span><b>Agile Prism</b><small>Hiểu Agile bằng hình. Ôn PMI-ACP</small></span></a>
  <h1>Sản phẩm</h1>
  <div class="meta">{intro}</div>
  <nav class="pg-nav" aria-label="Các trang"><a href="index.html">Bản đồ trực quan</a><a href="product.html" aria-current="page">Sản phẩm</a><a href="design-system.html">Design system</a></nav>
  <nav class="ds-toc" aria-label="Mục lục trang Sản phẩm">{toc}</nav>
</header>
<main class="wrap">
{cards}</main>
<script src="core.js"></script><script>PGL.done()</script>
</body></html>'''
open(_o.path.join(ROOT,'product.html'),'w').write(html);print(len(html))
