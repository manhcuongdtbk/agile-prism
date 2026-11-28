# DOC: Chặn lộ tên công cụ làm cùng trong các file đăng lên Production (D32), chặn khái niệm "ngoài slide" quay lại (D76) và dòng đồng tác giả trong commit chưa đẩy lên dev (D06). Phải ra OK.
import codecs,re,subprocess,os,sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pat=re.compile('(?i)'+codecs.decode('pynhqr|nagucbvp','rot13'))
old=re.compile(r'(?i)\bslide\b|\bic\.?ext\b|\b(nt|co|nt-s)[ .]ext\b|svext|\bEXT\(')  # D76: nội dung là của product, không phân biệt slide
files=['index.html','404.html','site.css','core.js','draw.js','terms.js']
bad=[]
for f in files:
    try: t=open(os.path.join(R,f),encoding='utf-8').read()
    except Exception: continue
    for i,l in enumerate(t.split('\n'),1):
        if pat.search(l): bad.append(f'{f}:{i}')
        if old.search(l): bad.append(f'{f}:{i} còn khái niệm trong slide / ngoài slide (D76, #175)')
# Commit chưa đẩy lên dev (D06): không có dòng đồng tác giả, dòng phiên làm việc, tên công cụ
r=subprocess.run(['git','-C',R,'rev-parse','--verify','-q','origin/dev'],capture_output=True,text=True)
if r.returncode!=0:
    print('CẢNH BÁO: không có origin/dev, bỏ qua kiểm commit',file=sys.stderr)
else:
    m=subprocess.run(['git','-C',R,'log','origin/dev..HEAD','--format=%h %B'],capture_output=True,text=True,timeout=20).stdout
    for l in m.split('\n'):
        if re.match(r'(?i)^\s*(co-authored-by|claude-session):',l) or pat.search(l): bad.append('commit: '+l.strip()[:80])
print('\n'.join(bad) or 'OK');sys.exit(1 if bad else 0)
