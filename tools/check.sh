#!/bin/sh
# Chạy toàn bộ kiểm tra. Dùng: sh tools/check.sh   (thêm -v để in đủ kết quả từng script)
# Đạt thì mỗi script 1 dòng "✓ tên"; lỗi thì "✗ tên" kèm kết quả đầy đủ. Dòng cuối: ĐẠT hoặc LỖI.
# Luật đạt: leak ra OK; err mỗi dòng "W W []"; ov, stp, fz, hl, sc, tip dòng cuối []; geo, zero ra OK; mob2 ra 0; hov không có KHÔNG ĐỔI; ld-a, ld-b (2 phần của ld.py) mỗi phần không có False, dòng cuối [].
# Tốc độ (#69): ld-b (đo 150 ms, 400 ms, sát ngưỡng khi máy bận) chạy trước, chỉ cạnh các script nhẹ; các script nặng chạy song song P cái một lúc (mặc định 4; CHECK_P=1 để chạy lần lượt), lâu trước. Kết quả in theo thứ tự cố định.
# Script chạy riêng khi cần (đọc dòng # DOC: đầu file): dev (ma trận thiết bị), tab, nav, bt, mob, partial, vi_audit, oldnames, axes, circ, gap, clk, fmap, vigap, gloss_gap, shot, gl, glrows, mont, tcand.js, tstat.js.
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D"); V=$1; BAD=0; P=${CHECK_P:-4}; O="$D/.out/chk"
case $P in ''|*[!0-9]*|0) P=1;; esac  # xargs -P 0 là chạy tất cả một lúc: không cho
sh "$D/prep.sh" >/dev/null || { echo "✗ prep"; exit 1; }
rm -rf "$O"; mkdir -p "$O"
(cd "$R" && python3 -m http.server 8765 >/dev/null 2>&1 & echo $! > "$D/.out/srv.pid"); sleep 1
run(){ t=$1; f=${t%%-*}; a=${t#"$f"}; python3 "$D/$f.py" ${a#-} > "$O/$t.txt" 2>&1; }
# Đợt 1: ld-b cạnh các script nhẹ (mỗi cái dưới 5 giây) chạy lần lượt, để máy không bận
run ld-b & for t in leak ov geo zero mob2 stp0; do run $t; done; wait
# Đợt 2: script nặng, lâu trước (đo 28/11, chạy riêng: stp 36, ld-a 30, sc 30, hov 22, fz 14, hl 10, tip 10, err 9 giây)
printf '%s\n' stp ld-a sc hov fz hl tip err | xargs -P "$P" -I{} sh -c 't={}; f=${t%%-*}; a=${t#"$f"}; python3 "$1/$f.py" ${a#-} > "$2/$t.txt" 2>&1' _ "$D" "$O"
kill "$(cat "$D/.out/srv.pid")" 2>/dev/null
ok(){ t=$1; o=$2; l=$(printf '%s\n' "$o" | tail -n 1)
  case $t in
    leak|geo|zero) [ "$l" = "OK" ];;
    err) printf '%s\n' "$o" | awk '$1!=$2||$3!="[]"{f=1} END{exit f}';;
    ov|stp|stp0|fz|hl|sc|tip) [ "$l" = "[]" ];;
    mob2) [ "$l" = "0" ];;
    hov) ! printf '%s\n' "$o" | grep -q "KHÔNG ĐỔI";;
    ld-a|ld-b) [ "$l" = "[]" ] && ! printf '%s\n' "$o" | grep -q "False";;
    *) false;;
  esac; }
for t in leak err ov geo zero mob2 stp stp0 fz hl hov ld-a ld-b sc tip; do
  o=$(cat "$O/$t.txt" 2>/dev/null)
  if [ -n "$o" ] && ok "$t" "$o"; then echo "✓ $t"; [ "$V" = "-v" ] && printf '%s\n' "$o"; else echo "✗ $t"; printf '%s\n' "$o"; BAD=1; fi
done
[ $BAD = 0 ] && echo "ĐẠT" || { echo "LỖI"; exit 1; }
