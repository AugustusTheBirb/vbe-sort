import PyPDF2
import codecs
from os import listdir
from os.path import isfile, join
from tkinter import *
from functools import partial

def refresh(p=""):
    global idx
    idx +=1
    
    global canvas
    canvas.delete('all')
    img = PhotoImage(file=r"final/"+year+"/"+images[idx])
    canvas.create_image(20,20, anchor=NW, image=img)
    root.update()
    root.update_idletasks()
    
    if (year[5]=="1"):tem = "g"
    else: tem = "k"
    global d
    if str(d.get(str(idx+1))) in "ABCD":
        outas.write(year[0:4]+tem+"1-"+str(idx+1).zfill(2)+".png ")
        outas.write(p+" ")
        outas.write(str(d.get(str(idx+1)))+"\n")
  
    print(idx)
    if (idx>28): 
        outas.close() 
        root.destroy()
        return None
    root.mainloop()
    



onlyfiles = [f for f in listdir("egzaminai/") if isfile(join("egzaminai/", f))]
for fi in onlyfiles:
    print(fi)
    year = fi[0:6]
    pdfFileObj = open('egzaminai/'+year+ '.pdf', 'rb')
    pdfReader = PyPDF2.PdfReader(pdfFileObj)
    ans = []
    c = 1 

    outas = open(year+".txt","w")

    pdfFileObj = open('atsakymai/'+year+"a.pdf", 'rb')
    pdfReader = PyPDF2.PdfReader(pdfFileObj)
    page = pdfReader.pages[0]
    a = page.extract_text().split("\n")
    d = {}
    for i in range(len(a)):
        if ("1 2 3" in a[i]):
            l=i
            break
    t1 = a[l].split(" ")
    t2 = a[l+2].split(" ")
    for i in range(len(t1)):
        if(t1[i]!=" " and t1[i]!="" and "a" not in t1[i]): d.update({t1[i]:t2[i]})
    t1 = a[l+4].split(" ")
    t2 = a[l+5].split(" ")
    for i in range(len(t1)):
        d.update({t1[i]:t2[i]})
    t1 = a[l+7].split(" ")
    t2 = a[l+8].split(" ")
    for i in range(len(t1)):
        d.update({t1[i]:t2[i]})
    print("\n")
    

    
    for i in range(len(d)):
          images = [f for f in listdir(r"final/"+year) if isfile(join(r"final/"+year, f))]
     
    temos = ['kinematics', 'forces', 'momentum/collisions', 'energy/work', 'molecular', 'thermodynamics', 'waves(not_light)', 'linear_optics', 'wave_optics','capacitors','pendulums', 'quantum/photoeffect', 'atom_physics', 'astronomy', 'theory']
    root = Tk()

    idx = 0
    canvas = Canvas(root, width = 1800, height = 800)
    canvas.pack()
    for i in range(len(temos)):
        o = Button(root, text = temos[i], command=partial(refresh, i),  bg='SkyBlue1', height=4, width=16 )
        if (i<=len(temos)/2): o.pack(side='left')
        else: o.pack(side='right')
    pdfFileObj.close()
    img = PhotoImage(file=r"final/"+year+"/"+images[idx])
    canvas.create_image(20,20, anchor=NW, image=img)
    
    
    root.mainloop()
    

    