#!/bin/sh
# Cloudflare Pages chạy file này ở mỗi lần deploy. Nhánh main (production) không có design-system.html.
set -e
rm -rf dist && mkdir dist
cp index.html site.css core.js draw.js terms.js logo.svg favicon.svg dist/
if [ "$CF_PAGES_BRANCH" != "main" ]; then cp design-system.html product.html dist/; fi
# Bản thử không cho máy tìm kiếm đánh chỉ mục
if [ "$CF_PAGES_BRANCH" != "main" ]; then printf '/*\n  X-Robots-Tag: noindex\n' > dist/_headers; fi
echo "built for branch ${CF_PAGES_BRANCH:-local}"
