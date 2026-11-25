import os as _o;ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)));OUT=_o.path.join(ROOT,"tools",".out");T="file://"+_o.path.join(OUT,"_t.html")
import sys
from PIL import Image
ims=[Image.open(p) for p in sys.argv[2:]];W=max(i.width for i in ims)
H=sum(i.height for i in ims)+10*len(ims);o=Image.new('RGB',(W,H),'white');y=0
for i in ims:o.paste(i,(0,y));y+=i.height+10
s=min(1,1400/W);o=o.resize((int(W*s),int(H*s)));o.save(sys.argv[1])
