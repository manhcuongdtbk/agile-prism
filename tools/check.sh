#!/bin/sh
# Chạy toàn bộ kiểm tra. Dùng: sh tools/check.sh
# Kết quả đạt: err ra [] và scrollWidth bằng bề rộng; ov, mob2 ra 0 dòng lỗi; hov không có KHÔNG ĐỔI; ld toàn True.
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D")
sh "$D/prep.sh" || exit 1
(cd "$R" && python3 -m http.server 8765 >/dev/null 2>&1 & echo $! > "$D/.out/srv.pid"); sleep 1
for t in err ov mob2 hov ld; do echo "== $t"; python3 "$D/$t.py"; done
kill "$(cat "$D/.out/srv.pid")" 2>/dev/null
