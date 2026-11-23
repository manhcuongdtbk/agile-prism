# DOC: Thuật ngữ trong Glossary của APG 2 mà Glossary của trang chưa có. Cần /home/claude/apg2.txt (đọc PDF trong Project). Có thể khớp sai vì tên khác dạng.
import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import re,json
a=open('/home/claude/apg2.txt').read();a=a[a.index('\nGlossary\nacceptance'):a.index('\nIndex\n',a.index('\nGlossary\nacceptance'))]
L=a.split('\n');names=[]
for i,l in enumerate(L[1:],1):
    pv=L[i-1].rstrip()
    m=re.match(r'([A-Za-z][^.]{1,70}?)\. [A-Z]',l)
    if m and (pv.endswith('.') or pv.endswith('Glossary') or re.match(r'Glossary \d+$',pv)): names.append(m.group(1).strip())
s=open(_o.path.join(ROOT,'terms.js')).read();T=json.loads(s[s.index('['):s.rindex(']')+1])
have=set()
for t in T:
    for x in [t['t'],t.get('ab','')]+t.get('al',[]):
        if x: have.add(x.lower())
def norm(n):
    ab=re.findall(r'\(([^)]+)\)',n);base=re.sub(r'\s*\([^)]*\)','',n).strip().lower()
    return base,[x.lower() for x in ab]
miss=[]
for n in names:
    b,ab=norm(n)
    if b in have or any(x in have for x in ab) or b.rstrip('s') in have or b+'s' in have: continue
    miss.append(n)
print(len(names),'mục trong APG 2 Glossary,',len(miss),'chưa có:');print(' | '.join(miss))
