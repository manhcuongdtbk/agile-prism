# DOC: Thư viện cho vi_audit.py: bỏ phần không phải câu văn và các cụm tiếng Việt được phép (KEEP). Không chạy riêng.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import re
# KEEP: cụm được phép. Tìm kiếm sản phẩm là tên Feature đã chốt trong câu chuyện. 2 cụm sau là bản dịch đặt cạnh tên gốc (Manifesto, MVP)
KEEP=['có giá trị','giá trị cốt lõi','tiến độ','nhóm thuật ngữ','chất lượng code','Tìm kiếm sản phẩm','Sản phẩm/phần mềm chạy tốt','sản phẩm khả dụng tối thiểu']
def protect(h,keep):
    s=re.sub(r'<(script|style|svg|code)\b.*?</\1>',' ',h,flags=re.S)
    s=re.sub(r'<(span|div) class="en">.*?</\1>',' ',s,flags=re.S)
    s=re.sub(r'<(dfn)\b[^>]*>.*?</dfn>',' ',s,flags=re.S)
    s=re.sub(r'<span class="(?:dn|tkn)[^"]*">.*?</span>',' ',s,flags=re.S)
    s=re.sub(r'<(?:aside)\b.*?</aside>',' ',s,flags=re.S)
    for k in keep: s=re.sub(re.escape(k),' ',s,flags=re.I)
    return s,None
