#!/bin/sh
# Chuẩn bị bản kiểm tra: tools/.out/_t.html dùng font trên máy, không cần mạng.
set -e
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D"); O="$D/.out"; F="$O/fonts"
mkdir -p "$O/shots"
if [ ! -d "$F/package" ]; then
  mkdir -p "$F" && (cd "$F" && npm pack -s @fontsource/be-vietnam-pro >/dev/null && tar xzf fontsource-be-vietnam-pro-*.tgz)
fi
(cd "$F/package" && cat 400.css 500.css 600.css 700.css) | sed "s#url(./files/#url(file://$F/package/files/#g" > "$O/font.css"
python3 - "$R" "$O" <<'P'
import re,sys
r,o=sys.argv[1],sys.argv[2]
h=open(r+'/index.html').read()
h=re.sub(r'<link[^>]*fonts\.googleapis\.com[^>]*>','<link rel="stylesheet" href="file://'+o+'/font.css">',h)
h=re.sub(r'<link[^>]*fonts\.gstatic\.com[^>]*>','',h)
h=h.replace('href="site.css"','href="file://'+r+'/site.css"')
for js in ('core.js','draw.js','terms.js'): h=h.replace('src="'+js+'"','src="file://'+r+'/'+js+'"')
open(o+'/_t.html','w').write(h)
P
echo "prep xong: $O/_t.html"
