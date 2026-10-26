import sys,glob,os
from PIL import Image
for d in sorted(glob.glob('out/*/')):
    files=sorted(glob.glob(d+'slide-*.png'))
    tw,th=540,675;g=24
    cols=4;rows=2
    im=Image.new('RGB',(cols*tw+(cols+1)*g,rows*th+(rows+1)*g),(40,40,40))
    for k,f in enumerate(files):
        t=Image.open(f).convert('RGB').resize((tw,th),Image.LANCZOS)
        r,c=divmod(k,cols)
        im.paste(t,(g+c*(tw+g),g+r*(th+g)))
    name=d.rstrip('/').split('/')[-1]
    im.save(f'out/{name}-apercu.jpg',quality=85)
    print(name)
