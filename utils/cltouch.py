#coding=utf-8
####### 命令行  -u生成 update.zip文件  -j解密src下差异luac文件
import zipfile 
import os 
import filecmp
import shutil
import sys
import re
import json
import hashlib
def dirlist(path, allfile):  
    filelist =  os.listdir(path)
    for filename in filelist:  
        filepath = os.path.join(path, filename)  
        if os.path.isdir(filepath):
            dirlist(filepath, allfile)
        else:  
            allfile.append(filepath) 
    return allfile
# def mkdir(path):  
#     if not os.path.isdir(path):  
#         mkdir(os.path.split(path)[0])  
#     else:  
#         return  
#     os.mkdir(path)
# def un_zip(file_name):  
#     global G_DIR
#     zip_file = zipfile.ZipFile("./"+file_name)
#     file_name= os.path.splitext(file_name)[0]
#     G_DIR.append("./tempzip/"+file_name + "_files###") 
#     if os.path.isdir("./tempzip/"+file_name + "_files###"): 
#         pass  
#     else:  
#         mkdir("./tempzip/"+file_name + "_files###")  
#     for names in zip_file.namelist():  
#         zip_file.extract(names,"./tempzip/"+file_name + "_files###/")  
#     zip_file.close()
# def get_zip_dir(path):
#     path = path.replace("\\","/")
#     path2 = path[:path.rfind("assets/")+7]
#    # print(os.path.relpath(path,path2))
#     return os.path.relpath(path,path2)
# def cmpcode(file1,file2):#比较版本
#     #版本_1.0.0.24
#     p = re.compile("(?<=\d\.\d\.\d\.)\d")
#     m1 = p.search(file1)
#     m2 = p.search(file2)
#     # print "m1:",m1.group(),"m2:",m2.group()
#     isbig = False
#     if not m1:
#         print(file1+u"版本解析错误（x.x.x.x）")
#         sys.exit(0)
#     elif not m2:
#         print(file2+u"版本解析错误（x.x.x.x）")
#         sys.exit(0)
#     elif m1 == m2:
#         print(u"版本解析错误两个apk版本相同!!!")
#     else:
#         isbig = m1.group()>m2.group()
#     #print(m1.group(),m2.group(),isbig)
#     return isbig
# def analyze_Dir(Dir):#解析路径
#     try:
#         name = Dir.decode("utf-8")
#         # print("utf-8")
#     except UnicodeError:
#         try:
#             name = Dir.decode("GBK")
#             # print("GBK")
#         except UnicodeError:
#             print(u"路径解码错误！！非utf-8 和 GBK")
#             sys.exit(0)
#     return name
#def writefile(path,i):#i =1 or 2
def clfile(File):
    #print(File)
   
    f = open(File,"r+")
    file = f.read()
    F = file
    f.close()
    # p1 = re.compile("[\.\[\]\w]+?:convertToWorldSpaceAR\(cc\.p\(.*?\)\)")
    # m1 = p.search(file)
    # if m1:
        # for m in m1:
    #         p2 = re.compile("[\.\w]*?:")
    # print(m1)

    file=re.sub("([\.\[\]\w]+?:getTouchMovePosition\(\))",r"self.resourceNode_:convertToNodeSpace(\1)",file)
    file=re.sub("([\.\[\]\w]+?:getTouchBeganPosition\(\))",r"self.resourceNode_:convertToNodeSpace(\1)",file)
    file=re.sub("([\.\[\]\w]+?):convertToWorldSpaceAR\((cc\.p\(.*?\))\)",r"self:convertToWorldSpaceAR(\1,\2)",file)
    if "PageTurn" in File:
        file=re.sub('([\.\[\]\w]+?|panel:getChildByName\("Image_photo"\)):convertToWorldSpace\((cc\.p\(.*?\))\)',r"self.m_UIManager:getCurScene():convertToWorldSpace(\1,\2)",file)
    else:
        file=re.sub('([\.\[\]\w]+?|panel:getChildByName\("Image_photo"\)):convertToWorldSpace\((cc\.p\(.*?\))\)',r"self:convertToWorldSpace(\1,\2)",file)
    if F != file:
        f = open(File,"r+")
        f.write(file)
        f.close()
    # m1 = p.findall(file)
    # if m1:
    #     # for m in m1:
    # #         p2 = re.compile("[\.\w]*?:")
    #     print(m1)
   
def main():
    allfile= []
    dirlist("./", allfile)
    for f in allfile:
        f=f.replace("\\","/")
        if "/app/" in f:
            clfile(f)
    # G_JIEMI = False#是否解密
    # G_YASUO = False#是否压缩update
   #  for a in range(len(sys.argv)):
   #      m = sys.argv[a]
   #      if "-j" == m or "-J" == m:
   #          G_JIEMI=True
   #      if "-u" == m or "-U" == m:
   #          G_YASUO=True
   # # print(G_JIEMI,G_YASUO)
   #  if os.path.exists("./tempzip"):
   #      shutil.rmtree("./tempzip")
   #  if os.path.exists("./diff"):
   #      shutil.rmtree("./diff")
   #  if os.path.exists("./update.zip"):
   #      os.remove("./update.zip")
   #  allfile= []
   #  dirlist("./", allfile)
   #  for file in allfile[:]:
   #      if not ".apk" in file:
   #          allfile.remove(file)
   #          if "update_" in file:
   #              os.remove(file)
   #  if len(allfile)!= 2:
   #      print(u"apk文件不为2！")
   #      sys.exit(0)
   #  else:
   #      #解析路径
   #      NAME = []
   #      for i in range(len(allfile)):
   #          allfile[i] = analyze_Dir(allfile[i])
   #          NAME.append(os.path.basename(allfile[i]))
   #      #比较版本版本大的放前面
   #      isbig = cmpcode(NAME[0],NAME[1])
   #      file1 = NAME[0]
   #      NAME[0] = isbig and NAME[0] or NAME[1]
   #      NAME[1] = isbig and NAME[1] or file1
   #      for na in NAME:
   #          un_zip(na)
   #  #   比较文件
   #  F1 = []
   #  F2 = []
   #  DIFF1 = {"change":[],"add":[],"del":[]}#差异文件
   #  DIFF2 = {"change":[]}
   #  dirlist(G_DIR[0], F1)
   #  dirlist(G_DIR[1], F2)
   #  for f in F1:
   #      fname = f[f.find("_files###"):]
   #      isfind =False
   #      ff2 = ""
   #      for f2 in F2:
   #          if fname in f2:
   #              isfind =True
   #              ff2 = f2
   #              break
   #      if isfind:
   #          issame =filecmp.cmp(f,ff2)
   #          F2.remove(ff2)
   #          if not issame:
   #              DIFF1["change"].append(f)
   #              DIFF2["change"].append(f2)
   #      else:
   #          #print(f)
   #          DIFF1["add"].append(f)
   #  if len(F2)>0:
   #      DIFF1["del"].append(f2)
   #  for df in DIFF1["change"]:
   #      writefile(df,1)
   #  for df in DIFF1["add"]:
   #      writefile(df,1)
   #  for df in DIFF1["del"]:
   #      writefile(df,2)
   #  for df in DIFF2["change"]:
   #      writefile(df,2)
   #  if G_JIEMI:
   #      if os.path.exists("./diff/1/assets/src"):
   #          #有差异
   #          #update = zipfile.ZipFile("./update","w",zipfile.ZIP_DEFLATED)  #ZIP_STORED模式不会压缩
   #          #print(u"检测到src目录下有差异...")
   #          os.system("%HANDY_HOME%/utils/win\handy %HANDY_HOME%/win32/xxteaLuac.cyy ./diff/1/assets/src 6XianQ2an ZhiShao6GZF /z /e")
   #          os.system("%HANDY_HOME%/utils/win\handy %HANDY_HOME%/win32/xxteaLuac.cyy ./diff/2/assets/src 6XianQ2an ZhiShao6GZF /z /e")
   #  else:
   #      if G_YASUO:
   #          if os.path.exists("./diff/1/assets/src") or os.path.exists("./diff/1/assets/res"):
   #              #print(u"检测到src目录下有差异...")
   #              update = zipfile.ZipFile("./update.zip","w",zipfile.ZIP_DEFLATED)  #ZIP_STORED模式不会压缩
   #              js1 = open("./update.json",'wb')
   #              updatefile = []
   #              for c in DIFF1["change"]:
   #                  c = c.replace("\\","/")
   #                 # print(c)
   #                  if "/assets/" in c:
   #                      update.write(c,get_zip_dir(c))
   #                      updatefile.append(get_zip_dir(c))
   #              for a in DIFF1["add"]:
   #                  a = a.replace("\\","/")
   #                  if "/assets/" in a:
   #                      update.write(a,get_zip_dir(a))
   #                      updatefile.append(get_zip_dir(a))

   #              dd1 = json.dumps(updatefile)
   #              js1.write(dd1)
   #              js1.close()
   #              if len(DIFF1["del"])>0:
   #                  df = DIFF1["del"]
   #                  js = open("./delPaths.json",'wb')
   #                  delfile = []
   #                  for d in DIFF1["del"]:
   #                      if "/assets/" in d:
   #                          d=d.replace("\\","/")
   #                          delfile.append(get_zip_dir(d))
   #                  dd2 = json.dumps(delfile)
   #                  js.write(dd2)
   #                  js.close()
   #                  # update.write("./delPaths.json","./delPaths.json")
   #              update.close()
   #              update = open("./update.zip","rb")
   #              md5 = hashlib.md5(update.read()).hexdigest()
   #              size = os.path.getsize("./update.zip")
   #              update.close()
   #              newname ="update_"+md5+"_"+str(size)+".zip"
   #              os.rename("./update.zip","./"+newname)
   #              print(u"生成"+newname+u"完成")
   #          else:
   #              print(u"res和src无差别！！！")
G_DIR=[]
#print(sys.getfilesystemencoding())
main()