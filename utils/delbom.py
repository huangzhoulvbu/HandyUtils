#coding=utf-8
#import io
import os
import sys
import codecs
#sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
# def print_zw(str):
#  	print(str.decode('utf-8').encode('gbk','ignore'))
####


#####

####

				

####
####

				

####
####

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
	#print(filelist)
	#print("filelist")
	for filename in filelist:  
		filepath = os.path.join(path, filename)  
		#print(filepath+"   path")
		if os.path.isdir(filepath):
			#print(filepath+"          dir")
			# expath = "./temp/"+filepath[filepath.find("cocosstudio")+ 12:]
			# #print("expath")
			# #print(expath)
			# if not os.path.exists(expath):#在当前目录下创建相应目录
			# 	#print_zw("创建了目录"+expath)
			# 	mkdir(expath)
			dirlist(filepath, allfile)
		else:  
			#print(filepath+"          file")
			#print("path"+path)
			# if not os.path.exists("./"+path[path.find("cocosstudio")+11:]):
			# 	#print_zw("创建了目录"+"./temp/"+path[path.find("cocosstudio")+11:])
			# 	mkdir("./temp/"+path[path.find("cocosstudio")+11:])
			allfile.append(filepath) 
	#print(allfile)
	return allfile 
####


################################################
# if os.path.exists("./error.txt"):
# 	os.remove("./error.txt")
# G_ERROR = open("./error.txt","a")


#print(u"请输入要处理的路径?")
if len(sys.argv)!=2:
	print(u"参数错误,请输入路径参数")
	sys.exit(0)
path = sys.argv[1]
#path = raw_input()
allfile = []
path = path.replace("\\","/")
dirlist("./"+path, allfile)
for file in allfile:
	if ".plist" in file:
		F = open(file,"r")
		f = F.read()
		F.close()
		if f[:3] == codecs.BOM_UTF8:
			f = f[3:]
			#print(f)
			F = open(file,"w")
			F.write(f)
			F.close()
			#G_ERROR.write(file+"\n")
#G_ERROR.close()	
print(u"处理完毕！！！！！！！！！！！！！！！")

################################################