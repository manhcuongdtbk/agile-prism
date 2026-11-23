# DOC: Chặn lộ tên công cụ làm cùng trong mọi file của repo (danh sách từ mã hoá rot13). Phải ra OK.
import codecs,re,subprocess,os,sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pat=re.compile('(?i)'+codecs.decode('pynhqr|nagucbvp','rot13'))
files=subprocess.run(['git','ls-files'],cwd=R,capture_output=True,text=True).stdout.split()
bad=[]
for f in files:
    try: t=open(os.path.join(R,f),encoding='utf-8').read()
    except Exception: continue
    for i,l in enumerate(t.split('\n'),1):
        if pat.search(l): bad.append(f'{f}:{i}')
print('\n'.join(bad) or 'OK');sys.exit(1 if bad else 0)
