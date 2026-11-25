# DOC: Thuật ngữ bị dịch sang tiếng Việt trong câu. Phải ra rỗng.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import re,sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)));import terms_pass as t
h=open(_o.path.join(ROOT,'index.html')).read();s,_=t.protect(h,t.KEEP)
txt=re.sub(r'<[^>]+>',' ',s)
d=open(_o.path.join(ROOT,'draw.js')).read();ds=' '.join(re.findall(r"'([^'\n]*)'",d))
for k in t.KEEP: ds=re.sub(re.escape(k),' ',ds,flags=re.I)
W=['nhóm','dự án','phạm vi','chi phí','nguồn lực','rủi ro','chất lượng','khách hàng','lợi ích','tính năng','sản phẩm','giá trị']
for w in W:
  for name,src in (('H',txt),('D',ds)):
    for m in re.finditer(r'(?<![\wÀ-ỹ])'+w+r'(?![\wÀ-ỹ])',src,re.I):
      print(name,w,'|',re.sub(r'\s+',' ',src[max(0,m.start()-50):m.end()+30]))
