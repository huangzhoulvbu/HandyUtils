#coding=utf-8
import io
import os
import sys
import itertools
import shutil
import threading
def  ChangeFile(file,err): #处理的csd 
	global G_CHFILE
	File_f = file.replace("\\","/")
	lock.acquire()
	if G_CHFILE.count(File_f)!= 0:#防止重复处理
		return
	else:
		G_CHFILE.append(File_f)
	lock.release()
	f = open(file)
	csd = f.read()#文件内容
	CSD = csd
	f.close()
	if csd :#文件不为空
		Path = 0
		Plist = 0
		Normal = 0
		while Path != -1:
			Path = csd.find("Path=",Path+1)
			isfind = False
			if Path != -1:
				p1 = csd.find("\"",Path)
				p2 = csd.find("\"",p1+1)
				png = csd[p1+1:p2]#图片
				#先找原有的
				Normal = csd.rfind(" Type=",0,Path)
				if Normal == -1:
					err.append(file+"中没找到 Type=\n")
				t1 = csd.find("\"",Normal+1)
				t2 = csd.find("\"",t1+1)
				NO = csd[t1+1:t2]
				Plist = csd.find("Plist=",Normal)
				if Plist == -1:
					err.append(file+"没找到 Plist= \n")
				l1 = csd.find("\"",Plist+1)
				l2 = csd.find("\"",l1+1)
				LIST = csd[l1+1:l2]
				if ".plist" in LIST:
					if os.path.exists("../cocosstudio/"+LIST):
		 				f = open("../cocosstudio/"+LIST)
		 				fi = f.read()
		 				f.close()	
		 				if fi.find(png)!=-1:
		 					isfind = True
		 					NO = "PlistSubImage"
		 					csd = csd[:t1+1]+NO+csd[t2:]
		 				pngnum = 1
		 				while(pngnum<4 and isfind== False):
		 					listtemp = LIST[:LIST.rfind(".plist")]+str(pngnum)+".plist"
		 					# if "niuniu/NiuPoker.plist" == LIST:
		 					# 	print("listtemp = ",listtemp)
		 					# 	print("pngnum = ",pngnum)
		 					# 	print("isfind = ",isfind)
		 					# 	print("png = ",png)
		 					if os.path.exists("../cocosstudio/"+listtemp):
				 				f = open("../cocosstudio/"+listtemp)
				 				fi = f.read()
				 				f.close()	
				 				if fi.find(png)!=-1:
				 					isfind = True
				 					csd = csd[:l1+1]+listtemp+csd[l2:]
				 					NO = "PlistSubImage"
				 					csd = csd[:t1+1]+NO+csd[t2:]

				 			pngnum += 1
		 		else:
		 			if  "Default" in NO:
		 				isfind = True
		 			elif os.path.exists("../cocosstudio/"+png):
		 				NO = "Normal"
		 				csd = csd[:t1+1]+NO+csd[t2:]
		 				isfind = True
		 		if not isfind:
					if ".jpg" in png :
						jpg = FindSanPng(png)
						if len(jpg) == 0:
							err.append("没有找到 "+png+" 相关路径上的jpg!!\n")
						elif len(jpg) == 1:
							csd = csd[:p1+1]+jpg[0]+csd[p2:]
						elif len(jpg)>1 :
							err.append(file+" 里 "+png+ " 路径上存在多张图片:\n")
							for a in range(len(jpg)):
								err.append(str(a)+" "+jpg[a]+"\n")
						Normal = csd.rfind(" Type=",0,Path)
						t1 = csd.find("\"",Normal+1)
						t2 = csd.find("\"",t1+1)
						csd = csd[:t1+1]+"Normal"+csd[t2:]
						Plist = csd.rfind("Plist=",Path)
						l1 = csd.find("\"",Plist+1)
						l2 = csd.find("\"",l1+1)
						csd = csd[:l1+1]+csd[l2:]
					elif ".csd" in png :#处理csd
						#print("../cocosstudio/"+png)
						ChangeFile("../cocosstudio/"+png,err)
					elif ".png" in png:#处理png
						big = FindBigPng(png,err)
						small = FindSanPng(png)
						addpng = []
						hasbig = False
						if big.has_key("png"):
							hasbig = True
							addpng.append(big["png"])
						for s in small:
							addpng.append(s)
						p = png#原来的
						l = LIST#原来的
						no = NO#原来的
						if len(addpng)>1:
							err.append(file+" 里 "+png+ " 路径上存在多张图片:\n")
							for a in range(len(addpng)):
									if hasbig and a == 0:
										err.append(str(a)+" "+big["plist"]+"中 "+addpng[a]+"\n")
									else:
										err.append(str(a)+" "+addpng[a]+"\n")
						elif len(addpng) == 1 :
							p = addpng[0]
							if hasbig:
								l = big["plist"]
								no = "PlistSubImage"
							else:
								l = ""
								no = "Normal"
						elif len(addpng) == 0 :
							err.append(file+"里没找到 "+png+" 相关路径上的图片！\n")
						csd = csd[:p1+1]+p+csd[p2:]
						Normal = csd.rfind(" Type=",0,Path)
						if Normal == -1:
							err.append(file+"里没找到 Type=\n")
						t1 = csd.find("\"",Normal+1)
						t2 = csd.find("\"",t1+1)
						csd = csd[:t1+1]+no+csd[t2:]
						Plist = csd.find("Plist=",Normal)
						if Plist == -1:
							err.append(file+"里没找到 Plist=\n")
						l1 = csd.find("\"",Plist+1)
						l2 = csd.find("\"",l1+1)
						csd = csd[:l1+1]+l+csd[l2:]
		else:
			pathdir = file[file.find("cocosstudio")+ 12:]
			pathdir = pathdir.replace("\\","/")
			path = "./temp/"+pathdir
			if CSD != csd:
				if not os.path.exists(path[:path.rfind("/")]):
					mkdir(path[:path.rfind("/")])
				f = open(path,'w')
				# print(path)
				f.write(csd)
				f.close()
	else:	
		#print(file+"文件为空!\n")
		err.append(file+"文件为空!\n")
	return csd

#####

####
def FindBigPng(string,err): #找大图
	#print(u"FindBigPng     " + str)
	dir = {}#图片路径

	idx = []
	str_ch = string.replace("/","_")
	png = []
	end = len(string)
	while end>=0 and str_ch.rfind("_",0,end) != -1 :#取出_的下标
		idxtemp = str_ch.rfind("_",0,end)
		idx.append(idxtemp)
		end = idxtemp-1
	lentemp = str_ch.count("_")
	while lentemp > 0 :
		tuptemp = list(itertools.combinations(idx,lentemp)) #取出所有组合
		for t in tuptemp :
			strtemp = ChangeStr(str_ch,t,"/")
			png.append(strtemp)
		lentemp -= 1 
	for i in idx:
		for num in range(0,4):#plist最多4张
			plist = ""
			if num == 0:
				plist = str_ch[:i]+".plist"
			else:
				plist = str_ch[:i]+str(num)+".plist"
			if os.path.exists("../cocosstudio/res/"+plist):
			 	f = open("../cocosstudio/res/"+plist)
			 	fi = f.read()
			 	if fi.find(str_ch)!=-1:
			 		if dir.has_key("png"):
			 			err.append("在"+dir["plist"]+" 和res/"+plist+" 中都存在"+dir["png"])
			 		else:	
				 		dir["png"]=(str_ch)#添加装换后的图片路径
						dir["plist"] = "res/"+plist#添加plist
	return dir
				

####
####
def FindSanPng(str,tes = 0): #找散图 可处理jpg
	#print(u"FindSanPng     " + str)
	png=[]#图片路径
	cpng = []#存在的图片路径	
	idx = []
	end = len(str)
	str_ch = str.replace("/","_")
	if tes == 0:
		big = "res/"+str_ch    #特殊大图
		if os.path.exists("../cocosstudio/"+big):
			cpng.append(big)
	#print(str_ch)
	if str_ch.find("res_") == 0 :   #特殊散图
		san = str_ch.replace("res_","",1)
		png2 = FindSanPng(san,1)
		png = png+png2
	while end>=0 and str_ch.rfind("_",0,end) != -1 :#取出_的下标
		idxtemp = str_ch.rfind("_",0,end)
		idx.append(idxtemp)
		end = idxtemp-1
	lentemp = str_ch.count("_")
	#print(idx)
	while lentemp > 0 :
		tuptemp = list(itertools.combinations(idx,lentemp)) #取出所有组合
		#print("tuptemp")
		#print(tuptemp)
		for t in tuptemp :
			#print(t)
			strtemp = ChangeStr(str_ch,t,"/")
			png.append(strtemp)
		lentemp -= 1 
	#print("png")
	#print(png)
	for p in png :
		if os.path.exists("../cocosstudio/"+p):
			#print(u"存在"+p)
			cpng.append(p)
	#print("cpng")
	#print(cpng)
	return cpng
				

####
####
def ChangeStr(str,tup,ch):#将str的 (tuple下标转为ch)
	for i in tup:
		str = (i == 0) and (ch + str[1:]) or (str[:i]+ch+str[i+1:])   
	return str
####
####
def mkdir(path):  
    if not os.path.isdir(path):  
        mkdir(os.path.split(path)[0])  
    else:  
        return  
    os.mkdir(path)
####
####遍历文件
def dirlist(path, allfile):  
	filelist =  os.listdir(path)
	for filename in filelist:  
		filepath = os.path.join(path, filename)  
		if os.path.isdir(filepath):
			dirlist(filepath, allfile)
		else:  
			allfile.append(filepath) 
	return allfile 
####
def thread_change(file,err):
	for f in file:
		ChangeFile(f,err)

################################################
# G_ISBIG = -1
lock = threading.Lock()
G_TEMPERR =[]
G_CHFILE = []#已处理的csd
if os.path.exists("./error.txt"):
	os.remove("./error.txt")
G_ERROR = open("./error.txt","a")
if os.path.exists("./temp"):
	shutil.rmtree("./temp")
print(u"处理中....")
ALL =[]
allfile = []
dirlist("../cocosstudio",ALL)
for f in ALL:
	if ".csd" in f:
		f= f.replace("\\","/")
		allfile.append(f)
num = len(allfile)/4
ALLFILE = []
th =[]
if num>0:
	for i in range(4):
		ALLFILE.append([])
		G_TEMPERR.append([])
		if i == 3:
			for n in range(3*num,len(allfile)):
				ALLFILE[i].append(allfile[n])
		else:
			for n in range(num):
				ALLFILE[i].append(allfile[i*num+n])
		th1 = threading.Thread(target=thread_change,args=(ALLFILE[i],G_TEMPERR[i]))
		th1.start()
		th.append(th1)
	for h in th:
		h.join()
else:
	for f in allfile:
		csd = ChangeFile(f)
for errl in G_TEMPERR:
	for err in errl:
		G_ERROR.write(err)
G_ERROR.close()
G_ERROR = open("./error.txt","r")
err = G_ERROR.read()
G_ERROR.close()
if  not (err == "\xef\xbb\xbf" or err == ""):
	print(u"产生了一些错误未处理请查看当前目录下的error.txt文件!!!!")
print(u"处理完毕！！！！！！！！！！！！！！！")
if os.path.exists("./temp"):
	print(u"是否同步到cocosstudio目录下(y/n)?")
	Y = raw_input()
	if Y == "y" or Y == "Y" :
		allfile2 = []#temp下
		dirlist("./temp",allfile2)
		for f in allfile2:
			f = f.replace("\\","/")
			F  = f[f.find("temp/")+5:]
			shutil.copyfile("./temp/"+F, "../cocosstudio/"+F)
################################################