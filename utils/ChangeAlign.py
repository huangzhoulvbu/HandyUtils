#coding=utf-8
####### 命令行  -u生成 update.zip文件  -j解密src下差异luac文件
# import zipfile 
import os 
import shutil
import sys
import re
import json
import codecs
reload(sys)
sys.setdefaultencoding('utf8')
def dirlist(path, allfile):  
    filelist =  os.listdir(path)
    for filename in filelist:  
        filepath = os.path.join(path, filename)  
        if os.path.isdir(filepath):
            dirlist(filepath, allfile)
        else:  
            if filepath[-7:] == ".prefab" or filepath[-5:] == ".fire":
                print filepath
                allfile.append(filepath) 
    return allfile
def mkdir(path):
    print path
    if not os.path.isdir(path):  
        print path
        mkdir(os.path.split(path)[0])  
    else:  
        return  
    os.mkdir(path)
# def un_zip(file_name,dirname):  
#     # file_name = os.path.split(file_name)[1]
#     # file_name = file_name[:file_name.rfind(".ipa")]
#     print u"解压中"

#     zip_file = zipfile.ZipFile("./"+file_name)
#     # file_name= os.path.splitext(file_name)[0]
#     # G_DIR.append("./tempzip/"+file_name + "_files###") 
#     # if os.path.isdir("./tempzip/"+file_name + "_files###"): 
#     #     pass  
#     # else:  
#     #     mkdir("./tempzip/"+file_name + "_files###")  
#     for names in zip_file.namelist():  
#         zip_file.extract(names,"./"+dirname)  
#     zip_file.close()
def doFile(path):
    print "doFile" + path
    f = open(path)
    readData =f.read()
    f.close()
    filedata = json.loads(readData)
    nodeidx = []#node的idx
    isfirst = True
    for i in range(len(filedata)):
        item = filedata[i]
        if item["__type__"] == "cc.Node":
            nodeidx.append(i)
            # print  "add____" + str(i)
        elif item["__type__"] == "cc.StudioWidget" or item["__type__"] == "cc.Widget":
            if item["_alignFlags"] == 12 and item["_isAbsLeft"] == False and item["_isAbsBottom"] == False:#对齐模式是左下百分比的转为中心百分比
                item["_isAbsHorizontalCenter"] = False
                item["_isAbsVerticalCenter"] = False
                item["_alignFlags"] = 18
                # print nodeitem

                nodeitem = filedata[nodeidx[len(nodeidx)-1]]
                parentitem = filedata[nodeidx[len(nodeidx)-2]]
                # print u"节点"+nodeitem["_name"]+u"的父节点"+parentitem["_name"]
                if not  parentitem:
                    # print u"没有父节点了"
                    # print nodeitem 
                    return
                # contentSize = parentitem["_contentSize"]
                Psize = parentitem["_contentSize"]
                Pposition = parentitem["_position"]
                PanchorPoint = parentitem["_anchorPoint"]
                Pscale = parentitem["_scale"]
                # if nodeitem["_name"] == "AtlasLabel_rate":
                #     print nodeitem
                position = nodeitem["_position"]
                size = nodeitem["_contentSize"]
                anchorPoint = nodeitem["_anchorPoint"]
                scale = nodeitem["_scale"]
                # nodeitem["_anchorPoint"] = {"__type__": "cc.Vec2","x":0.5,"y":0.5}#将锚点设为0.5,0.5
                #自己偏移的xy
                x = position["x"]- (anchorPoint["x"]-0.5)*size["width"]*scale["x"]
                y = position["y"]- (anchorPoint["y"]-0.5)*size["height"]*scale["y"]
                #父节点偏移的xy
                Px = (PanchorPoint["x"]-0.5)*Psize["width"]
                Py = (PanchorPoint["y"]-0.5)*Psize["height"]

                xx = x+Px
                yy = y+Py
                # nodeitem["_position"] = {"__type__": "cc.Vec3", "x":x,"y": y,"z": 0}#设置position
                bfbx = xx/Psize["width"]
                bfby = yy/Psize["height"]
                item["_verticalCenter"] = bfby
                item["_horizontalCenter"] = bfbx

                # print "xxx___"+str(bfbx)+"yyyy"+str(bfby)
                # if (nodeitem["_name"] == "Panel_player1"):
                #     print "x"+str(x)
                #     print "y"+str(y)
                #     print "Px"+str(Px)
                #     print "Py"+str(Py)
                #     print "w"+str(Psize["width"])
                #     print "h"+str(Psize["height"])
                # if nodeitem["_name"] == "AtlasLabel_rate":
                #     print "22222"
                #     print nodeitem
        elif item["__type__"] == "cc.PrefabInfo":
            i = nodeidx.pop()
            # print  "remove____" + str(i)
        # path.find("src/")
        # path2 = path[path.find("src/")+4:]
        f = codecs.open(path,"w",encoding="utf-8")
        json.dump(filedata,f, ensure_ascii=False,sort_keys=True, indent=4, separators=(',', ':'))
        # f.write(writedata)
        f.close()
def main():
    # if os.path.isdir("./out"):
    #     shutil.rmtree("./out")
    #     os.mkdir("./out")
    # else:
    #     os.mkdir("./out")
    print("please input file or dir:")
    path = raw_input()
    allfile= []
    dirlist(path, allfile)
    for file in allfile:
        doFile(file)
    
    # filelist = []
    # dirnamelist = []
    # for file in allfile:
    #     if ".ipa" in file:
    #         file = os.path.split(file)[1]
    #         filelist.append(file)
    #         dirname = file[:file.rfind(".ipa")]
    #         dirnamelist.append(dirname)
    #         if os.path.isdir("./"+dirname):
    #             shutil.rmtree("./"+dirname)
    #             os.mkdir("./"+dirname)
    #         else:
    #             os.mkdir("./"+dirname)

    #         un_zip(file,dirname)
    #         print u"解压成功"
    # for i in range(0,len(filelist)):
    #     dirname = dirnamelist[i]
       
    #     allfile2 = []
    #     dirlist("./"+dirname, allfile2)
    #     midname = ""
    #     for name in allfile2:
    #         if "embedded.mobileprovision" in name:
    #             os.remove(name)
    #             midname =  os.path.dirname(name)
    #             break
    #     print u"替换文件..."
    #     shutil.rmtree(midname+"/_CodeSignature")
    #     shutil.copyfile("./inhousemobileprovision.mobileprovision",midname+"/embedded.mobileprovision")
    #     # os.rename(midname+ "/inhousemobileprovision.mobileprovision",midname+"/embedded.mobileprovision")
    #     print u"...签名..."
    #     os.system('codesign -f -s "iPhone Distribution: CityArk Inc." --entitlements ./Entitlements.plist ' +midname)
    #     print u"...打包..."
    #     newpack = zipfile.ZipFile("./out/new_"+dirnamelist[i]+".ipa","w",zipfile.ZIP_DEFLATED)  #ZIP_STORED模式不会压缩
    #     allfile3 = []
    #     dirlist("./"+dirname, allfile3)
    #     for name2 in allfile3:
    #         name2 = name2.replace("\\","/")
    #         if "Payload/" in name2:
    #             # print name2+"_____"
    #             name3 = name2[name2.rfind("Payload/")+8:]  
    #             newpack.write(name2,"./Payload/"+name3)
    #     newpack.close()
    #     shutil.rmtree("./"+dirname)
main()