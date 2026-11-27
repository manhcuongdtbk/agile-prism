#!/bin/sh
# Đưa nhánh hiện tại lên GitHub: chạy check.sh, chỉ khi ra ĐẠT (thoát 0) mới đẩy nhánh, tạo PR và merge (D70, Retro Sprint 4).
# Dùng: sh tools/ship.sh "Tên PR" tệp-thân-PR [nhánh đích, mặc định dev] [merge|squash, mặc định squash]
# Không đạt thì dừng, không đẩy, không tạo PR. In số PR và mã commit mới của nhánh đích.
set -e
T=$1; B=$2; BASE=${3:-dev}; M=${4:-squash}
[ -n "$T" ] && [ -f "$B" ] || { echo "Dùng: sh tools/ship.sh \"Tên PR\" tệp-thân-PR [dev] [squash]"; exit 2; }
D=$(cd "$(dirname "$0")" && pwd); R=$(dirname "$D"); cd "$R"
BR=$(git rev-parse --abbrev-ref HEAD)
[ "$BR" != "$BASE" ] || { echo "✗ đang ở nhánh $BASE, tạo nhánh riêng trước (D26)"; exit 1; }
[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "✗ còn thay đổi chưa commit"; exit 1; }
sh tools/check.sh > tools/.out/ship-check.txt 2>&1 || { tail -n 30 tools/.out/ship-check.txt; echo "✗ check.sh không đạt: không đẩy, không tạo PR"; exit 1; }
python3 tools/leak.py > /dev/null || { echo "✗ leak.py không đạt"; exit 1; }
git -c push.negotiate=true push -q -u origin "$BR" 2>&1 | grep -v '^remote' || true
REPO=$(git config --get remote.origin.url | sed -E 's#.*github.com[:/]##; s#\.git$##')
N=$(gh api "repos/$REPO/pulls" -f title="$T" -f head="$BR" -f base="$BASE" -F body=@"$B" --jq .number)
sleep 3
gh api -X PUT "repos/$REPO/pulls/$N/merge" -f merge_method="$M" --jq .merged > /dev/null
echo "✓ PR #$N merge vào $BASE: $(gh api "repos/$REPO/commits/$BASE" --jq .sha | cut -c1-7)"
