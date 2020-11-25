#coding=utf-8
import sys
import os
import copy
import shutil
import re
def DoFile(allfile):
	#print allfile
	if len(allfile) == 0 :
		return
	ALLFile = copy.deepcopy(allfile)
	for i in range(0,len(ALLFile)):#
			ALLFile[i] = ALLFile[i].replace("\\","/")
			allfile[i] = allfile[i].replace("\\","/")
			allfile[i] = allfile[i][allfile[i].rfind("/")+1:]##文件名
	if G_MOS == 1:
		lenth = len(allfile[0])
		publicmax = ""
		for i in range(0,lenth):
			public = allfile[0][:i]
			ispublic = True
			for obj in allfile:
				if public not in obj:
					ispublic = False
			if ispublic:
				publicmax = len(publicmax)<len(public) and public or publicmax
			else:
				publen = len(publicmax)
				for i in range(0,len(allfile)):#
					allfile[i] = allfile[i][publen:]
				break
		for n in range(0,len(ALLFile)):
			file = ALLFile[n][:ALLFile[n].rfind("/")+1]+allfile[n]
			os.rename(ALLFile[n],file)
	elif G_MOS == 2:
		for n in range(0,len(ALLFile)):
			file = ALLFile[n][:ALLFile[n].rfind("/")+1]+G_qname+allfile[n]
			os.rename(ALLFile[n],file)
	elif G_MOS == 3:
		for n in range(0,len(ALLFile)):
			if G_isre :
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+re.sub(G_str,G_rstr,allfile[n])
			else:
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+allfile[n].replace(G_str,G_rstr)
			os.rename(ALLFile[n],file)
	elif G_MOS == 4:
		for n in range(0,len(ALLFile)):
			hz = os.path.splitext(allfile[n])[1]
			file=""
			if G_qname :
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+G_qname+"img_"+str(n+1)+hz
			else:
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+"img_"+str(n+1)+hz
			print ALLFile[n],file
			os.rename(ALLFile[n],file)
	elif G_MOS == 5:
		for n in range(0,len(ALLFile)):
			hz = os.path.splitext(allfile[n])[1]
			file=""
			if G_qname in allfile[n] :
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+allfile[n][:allfile[n].find(G_qname)]+hz
				os.rename(ALLFile[n],file)
	elif G_MOS == 6:
		for n in range(0,len(ALLFile)):
			hz = os.path.splitext(allfile[n])[1]
			file=""
			if G_qname in allfile[n] :
				l = len(G_qname)
				file = ALLFile[n][:ALLFile[n].rfind("/")+1]+allfile[n][allfile[n].find(G_qname):]
				os.rename(ALLFile[n],file)
	elif G_MOS == 7:
		f = open(G_dir+"/in.txt")
		ff = f.read()
		f.close()
		if os.path.isdir(G_dir+"/out"):
			pass
		else:
			os.mkdir(G_dir+"/out")
		r1 = re.compile(r'\w*\s*')
		alldata =r1.findall(ff)
		print alldata
		print G_dir
		for n in range(0,len(ALLFile)):
			# print n
			for a in alldata:
				# print a
				a = a.replace(" ","")
				if a == "":
					continue
				if a in ALLFile[n]:
					# print "aaaa"
					if os.path.exists(G_dir+"/out/"+allfile[n]):
						os.remove(G_dir+"/out/"+allfile[n])	
					shutil.copyfile(ALLFile[n],G_dir+"/out/"+allfile[n])
					os.remove(ALLFile[n])
					break
	elif G_MOS == 8:
		f = open(G_dir+"/out.txt",'w')
		for name in allfile:
			f.write(name+"\n")
		f.close()
	elif G_MOS == 9:
		hz = ALLFile[n][ALLFile[n].rfind("."):]
		if G_isre :
			file = ALLFile[n][:ALLFile[n].rfind(".")+1]+re.sub(G_str,G_rstr,hz)
		else:
			file = ALLFile[n][:ALLFile[n].rfind(".")+1]+hz.replace(G_str,G_rstr)
		os.rename(ALLFile[n],file)
			
			
def dirlist(path):  
	allfile = []
	filelist =  os.listdir(path)
	for filename in filelist:  
		filepath = os.path.join(path, filename)  
		if os.path.isdir(filepath):
			dirlist(filepath)
		else:  
			allfile.append(filepath) 
	DoFile(allfile)
def main():
	print(u"要处理的模式（默认1）：\n1、删除相同前缀\n2、添加前缀\n3、替换相应字符串\n4、自动命名(img_xx)\n5、删除指定字符串之后的字符串\n6、删除指定字符串之前的字符串\n7、挑出包含指定名字文件(in.txt 空格隔开)\n8、获取目录下的所有文件名(out.txt)\n9、修改后缀")
	num = raw_input()
	global G_isre
	G_isre = False
	# if num == '0':
	# 	print(u"要处理的模式（默认1）：\n1、删除相同前缀\n2、添加前缀\n3、替换相应字符串\n4、自动命名(img_xx)\n5、删除指定字符串之后的字符串\n6、删除指定字符串之前的字符串\n7、挑出包含指定名字文件(in.txt 空格隔开)")
	# 	num = raw_input()
	# 	G_isre = True
	global G_MOS
	global G_qname
	global G_str
	global G_rstr
	global G_dir
	if num == '1' :
		G_MOS = 1
	elif num == '2':
		G_MOS = 2
		print(u"请输入添加的前缀：")
		G_qname = raw_input()
	elif num == '3':
		G_MOS = 3
		print(u"请输入要替换的字符串：")
		G_str = raw_input()
		if 're:' in G_str:
			G_str = G_str.replace("re:","")
			G_isre = True
		print(u"请输入替换的字符串：")
		G_rstr = raw_input()
		if 're:' in G_rstr:
			G_rstr = G_rstr.replace("re:","")
	elif num == '4':
		G_MOS = 4
		print(u"请输入添加的前缀：")
		G_qname = raw_input()
	elif num == '5':
		G_MOS = 5
		print(u"请输入指定字符串：")
		G_qname = raw_input()
	elif num == '6':
		G_MOS = 6
		print(u"请输入指定字符串：")
		G_qname = raw_input()
	elif num == '7':
		G_MOS = 7
		# print(u"准备好in.txt...")
		# G_qname = raw_input()
	elif num == '8':
		G_MOS = 8
	elif num == '9':
		G_MOS = 9
		print(u"请输入要替换的后缀：")
		G_str = raw_input()
		if 're:' in G_str:
			G_str = G_str.replace("re:","")
			G_isre = True
		print(u"请输入替换的后缀：")
		G_rstr = raw_input()
	else:
		G_MOS = '1'
	print(u"请输入处理路径：")
	dir = raw_input()
	dir = dir.rstrip()
	G_dir = dir
	dirlist(dir)
	
		
##############################	
G_MOS = 1	
G_qname = ""
main()