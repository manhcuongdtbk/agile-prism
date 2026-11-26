#!/bin/sh
# Chạy toàn bộ kiểm tra. Dùng: sh tools/check.sh   (thêm -v để in đủ kết quả từng script)
# Đạt thì mỗi script 1 dòng "✓ tên"; lỗi thì "✗ tên" kèm kết quả đầy đủ. Dòng cuối: ĐẠT hoặc LỖI.
# Luật đạt: leak ra OK; err mỗi dòng "W W []"; ov, stp, fz, hl, sc dòng cuối []; geo, zero ra OK; mob2 ra 0; hov không có KHÔNG ĐỔI; ld không có False, dòng cuối [].
# Script chạy riêng khi cần (đọc dòng # DOC: đầu file): dev (ma trận thiết bị), tab, nav, bt, mob, partial, vi_audit, oldnames, axes, circ, gap, clk, fmap, vigap, gloss_gap, shot, gl, glrows, mont, tcand.js, tstat.js.
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D"); V=$1; BAD=0
sh "$D/prep.sh" >/dev/null || { echo "✗ prep"; exit 1; }
(cd "$R" && python3 -m http.server 8765 >/dev/null 2>&1 & echo $! > "$D/.out/srv.pid"); sleep 1
ok(){ t=$1; o=$2; l=$(printf '%s\n' "$o" | tail -n 1)
  case $t in
    leak|geo|zero) [ "$l" = "OK" ];;
    err) printf '%s\n' "$o" | awk '$1!=$2||$3!="[]"{f=1} END{exit f}';;
    ov|stp|stp0|fz|hl|sc) [ "$l" = "[]" ];;
    mob2) [ "$l" = "0" ];;
    hov) ! printf '%s\n' "$o" | grep -q "KHÔNG ĐỔI";;
    ld) [ "$l" = "[]" ] && ! printf '%s\n' "$o" | grep -q "False";;
  esac; }
for t in leak err ov geo zero mob2 stp stp0 fz hl hov ld sc; do
  o=$(python3 "$D/$t.py" 2>&1)
  if ok "$t" "$o"; then echo "✓ $t"; [ "$V" = "-v" ] && printf '%s\n' "$o"; else echo "✗ $t"; printf '%s\n' "$o"; BAD=1; fi
done
kill "$(cat "$D/.out/srv.pid")" 2>/dev/null
[ $BAD = 0 ] && echo "ĐẠT" || { echo "LỖI"; exit 1; }
