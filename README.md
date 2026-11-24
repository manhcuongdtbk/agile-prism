# Agile Prism

Hiểu Agile bằng hình. Bản đồ trực quan để ôn PMI-ACP, bằng tiếng Việt.

Trang tĩnh: HTML, CSS, JavaScript thuần, không cần cài gì. `build.sh` chỉ chép file vào `dist/`.

| Nhánh | Môi trường | Ai xem |
|---|---|---|
| `dev` (mặc định) | Development, có thêm trang Sản phẩm và Design system | Chủ sản phẩm |
| `staging` | Staging, như Development | Persona thử trước |
| `main` | Production | Người đọc |

Mỗi issue 1 nhánh `loại/số-mô-tả`, Pull request vào `dev` kèm "Closes #số". Luồng: nhánh issue → `dev` → `staging` → `main`. Phiên bản 0.x tới khi ra mắt công khai. Ghi thay đổi ở `CHANGELOG.md`.

Không liên quan và không được PMI bảo trợ. PMI, PMI-ACP, PMP, PMBOK là nhãn hiệu của Project Management Institute, Inc.

## Kiểm tra

`sh tools/check.sh` chạy toàn bộ kiểm tra (cần Python, Playwright, npm). Từng script có dòng `# DOC:` ở đầu nói nó kiểm gì. `tools/` không có trong bản đăng.
