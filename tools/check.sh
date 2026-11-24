#!/bin/sh
# Chạy toàn bộ kiểm tra. Dùng: sh tools/check.sh
# Kết quả đạt: fz ra [] (2 dòng []); err ra [] và scrollWidth bằng bề rộng; ov, mob2 ra 0 dòng lỗi; geo, zero ra OK; stp không lỗi; hov không có KHÔNG ĐỔI; ld toàn True.
# Script chạy riêng khi cần (đọc dòng # DOC: đầu file): nav, bt, mob, partial, vi_audit, oldnames, axes, circ, gap, clk, fmap, vigap, gloss_gap, shot, gl, glrows, mont, tcand.js, tstat.js.
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D")
sh "$D/prep.sh" || exit 1
(cd "$R" && python3 -m http.server 8765 >/dev/null 2>&1 & echo $! > "$D/.out/srv.pid"); sleep 1
python3 "$D/leak.py" || echo "LỘ TÊN CÔNG CỤ"
for t in err ov geo zero mob2 stp fz hov ld; do echo "== $t"; python3 "$D/$t.py"; done
kill "$(cat "$D/.out/srv.pid")" 2>/dev/null
