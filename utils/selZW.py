#coding=utf-8
import re 
import os
import io
def dirlist(path, allfile):  
	filelist =  os.listdir(path)
	for filename in filelist:  
		filepath = os.path.join(path, filename)  
		if os.path.isdir(filepath):
			dirlist(filepath, allfile)
		else:  
			allfile.append(filepath) 
	return allfile
def findZW(File,ZW):
	#######添加 debug 
	print(u"处理文件 "+File)
	# p = re.compile("((?<=\n)\s*?dump\([\s\S]*?\n|(?<=\n)\s*?print\([\s\S]*?\n)+")
	# #p = re.compile("dump([\s\S]*?)\n")

	f = io.open(File, mode='r',encoding='utf-8')
	file = f.read()
	f.close()
	p3 = re.compile(r'"[\s\S]*?(?<!\\)"|\'[\s\S]*?(?<!\\)\'')
	m = p3.findall(file)
	for it in m:
		arr = bytearray(it, encoding='utf8')
		for ch in arr:
			if ch&128 >=128:
				# print(it)
				ZW[it]=it
				break 
##########################################################################################
def main():	
	# flaji= open("laji.json")
	# ff = flaji.read()
	# flaji.close()
	# lj = json.loads(ff)
	# print(u"请输入要处理的文件:") 
	# df = raw_input()
	# print(u"处理中.....")
	# df.replace("\\","/")
	# if "*" in df:
	# 	allfile = []
	# 	path  = df[:df.rfind("*")-1]
	# 	dirlist(path,allfile)
	# 	for file in allfile:
	# 		islaji = False
	# 		for i in lj:
	# 			if i in file:
	# 				islaji=True
	# 		if  islaji:
	# 			addlaji(file)
	# 		else:
	# 			print(u"跳过"+file)
	# else:
	# 	islaji = False
	# 	for i in lj:
	# 		if i in df:
	# 			islaji=True
	# 		if  islaji:
	# 			addlaji(df)
	# 		else:
	# 			print(df+u"不是垃圾文件！")
	if os.path.exists("./zw.txt"):
		os.remove("./zw.txt")
	f=io.open("./zw.txt","w",encoding='utf-8')
	allfile= []
	ZW = {}
	dirlist("./src/",allfile)
	for file in allfile:
		if ".lua" in file:
			findZW(file,ZW)
	for zw in ZW:
		f.write(zw+"\n")
	print(u"处理完毕！！")
main()