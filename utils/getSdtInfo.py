#coding=utf-8
import re 
import os
import sys
import json
import urllib
# reload(sys)
# sys.setdefaultencoding('utf8')
# import datetime
# def dirlist(path, allfile):  
# 	filelist =  os.listdir(path)
# 	for filename in filelist:  
# 		filepath = os.path.join(path, filename)  
# 		if os.path.isdir(filepath):
# 			dirlist(filepath, allfile)
# 		else:  
# 			allfile.append(filepath) 
# 	return allfile

codefile = open("../build/channels.json")
ff = codefile.read()
ff = re.sub("//.*\s","",ff)
codefiledata = json.loads(ff)
code = codefiledata["versionInfo"]["cailai"]["versionCode"]
print u"当前版本:" + code
# code =  13 #sys.argv[1].split("_")[0]
url = "http://down.syhanyuneducation.com/api.php?ver=1.0.0&action=GetSdtDiff&app_id=8001&param={%22check_code%22:"+code+"}"
page = urllib.urlopen(url)
# # print page
htmlcode = page.read()
# r1 = re.compile(r'"\d{8}"')
# alldata =r1.findall(htmlcode) 
config = open("./build/code.txt","w")
# ff = config.read()
# print htmlcode
config.write(htmlcode)
config.close()

# ff = re.sub(r"(?<=\n)\s*//","\n",ff)
# print ff
# ff = re.sub("//.*\n","\n",ff)
# configdata = json.loads(ff)
# for i in configdata:
# print ff2

# "sgyl-80030107":{
#             "name":"时光娱乐",
#             "CHANNEL_ID":"80030107",    
#             "package_name":"com.KidRegal.a21305",    
#             "icon":"sgyl.png",
#             "reference_file":[
#                 "android/cailai.json",
#                 "common/cailai.json"
#             ],
#             "game_list":[
#                 "pk_common",
#                 "pdk"
#             ]
#         },
# for game in configdata.keys():
# 	print configdata[game]
# if len(alldata)>0:
# 	for id in alldata:
# 		for name in configdata.keys():
# 			if id in name:
# 				print  configdata[name]
# def getinfo(channel_id,data):
	# info = {"package_name":"","CHANNEL_ID":"","icon":"game_name":"","sdt_name":""}

