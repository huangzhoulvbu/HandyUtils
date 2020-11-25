#coding=utf-8
import re 
import os
import sys
def dirlist(path, allfile):  
	filelist =  os.listdir(path)
	for filename in filelist:  
		filepath = os.path.join(path, filename)  
		if os.path.isdir(filepath):
			dirlist(filepath, allfile)
		else:  
			allfile.append(filepath) 
	return allfile

def adddebug(File):
	#######添加 debug 
	#print(u"处理文件 "+File)

	# 改成从外部传入需要优化的

	p = re.compile("(((?<=\n)\s*?dump\s*?\()|((?<=\n)\s*?print\s*\())")
	#p = re.compile("dump([\s\S]*?)\n")

	f = open(File,"r+")
	file = f.read()

	all = p.finditer(file)
	M =[]
	for m in all:
		M.append(m)
	M.reverse()
	# print(M)
	#print(len(M))
	if len(M)>0:
		for m in M:
			# p2 = re.compile("^\s*")
			# me = p2.match(m.group())
			# if me:
			# 	file = file[:m.start()]+me.group()+"--"+m.group()+me.group()+file[m.end():]
			# else:
			str = m.group() 
			if str.find("dump") == -1:
				str =str[str.find("print"):]
			else:
				str =str[str.find("dump"):]
			file = file[:m.start()]+"--"+str+file[m.end():]
	#######
	"""----------------------------------------------------""" 
	############删除重复的
	# lenth = 1
	# while(lenth>0):
	# 	#print("lenth= ",lenth)
	# 	p3 = re.compile("--\[\[IF\s*debug\s*THEN\]\]\s*--\[\[IF\s*debug\s*THEN\]\]\s*(dump\([\s\S]*?\n|print\([\s\S]*?\n)+\s*--\[\[END\]\]\s*--\[\[END\]\]")
	# 	all2 = p3.finditer(file)
	# 	M2 = []
	# 	for m in all2:
	# 		M2.append(m)
	# 	M2.reverse()
	# 	lenth = len(M2)
	# 	if lenth>0 :
	# 		for m in M2:
	# 			p4 = re.compile("--\[\[IF\s*debug\s*THEN\]\]\s*(dump\([\s\S]*?\n|print\([\s\S]*?\n)+\s*--\[\[END\]\]")
	# 			me = p4.search(m.group())
	# 			file = file[:m.start()]+me.group()+file[m.end():]
	############
	f.seek(0)
	f.truncate()
	f.write(file)
	f.close()
##########################################################################################
def main():	
	##print(u"请输入要处理的文件:") 
	##df = raw_input()
	##print(u"处理中.....")
	# for f in sys.argv:
	# 	print(f)
	# if len(sys.argv)!=2:
	# 	print(u"参数错误,请输入路径参数")
	# 	sys.exit(0)


	# 获取长度
	# len = len(sys.argv)

	# "^\s*(dump|print)\(.*$"


	for i in range(2,len(sys.argv)):
         print ("序号：%s   值：%s" % (list.index(i) + 1, i))
	# "(((?<=\n)\s*?dump\s*?\()|((?<=\n)\s*?print\s*\())"

	df = sys.argv[1]
    #print(df)
	df.replace("\\", "/")
	# if "*" in df:
	allfile = []
	#path  = df[:df.rfind("*")-1]
	dirlist(df,allfile)
	for file in allfile:
		if ".lua" in file:
			adddebug(file)
	# else:
	# 	adddebug(df)
	



	
	#print(u"处理完毕！！")
main()
