#!/bin/sh
# DOC: Dựng môi trường đầu Sprint bằng 1 lệnh, sau khi clone: sh tools/setup.sh
# Đặt git user và hook commit-msg (D06), cài Playwright và Chromium nếu thiếu, tải font, rồi chạy check.sh. Dòng cuối ĐẠT là xong.
# Kiến thức APG 2, PMBOK 8, ECO 2026: tìm trong Project knowledge (D54), hình trong sách xem bản gốc trên Google Drive (D57). Không chép PDF vào máy.
set -e
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D")
git -C "$R" config user.name "Manh Cuong"
git -C "$R" config user.email "31042644+manhcuongdtbk@users.noreply.github.com"
git -C "$R" config core.hooksPath tools/hooks   # bỏ dòng đồng tác giả khỏi commit (D06)
python3 -c "import playwright" 2>/dev/null || pip install -q playwright --break-system-packages
ls ~/.cache/ms-playwright 2>/dev/null | grep -q chromium || playwright install chromium >/dev/null 2>&1
echo "môi trường xong: $(git -C "$R" rev-parse --abbrev-ref HEAD) $(git -C "$R" rev-parse --short HEAD)"
sh "$D/check.sh"
