#coding=utf-8
import zipfile 
import os 
import shutil
import sys
import json
import re
import hashlib
reload(sys)
sys.setdefaultencoding('utf8')
def dirlist(path, allfile):  
    filelist =  os.listdir(path)
    for filename in filelist:  
        filepath = os.path.join(path, filename)  
        if os.path.isdir(filepath):
            dirlist(filepath, allfile)
        else:  
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
def un_zip(file_name,dirname):  
    print u"解压中"
    zip_file = zipfile.ZipFile("./"+file_name)
    for names in zip_file.namelist():  
        zip_file.extract(names,"./temp/"+dirname)  
    zip_file.close()
def main():
    runfile = sys.argv[1]
    groupname = runfile.split("_")[0]
    isenterprice = runfile.split("_")[1] == "E"

    config = open("./build/config.json")
    ff = config.read()
    config.close()
    ff = re.sub("//.*\s","",ff)
    configdata = json.loads(ff)
    if not  configdata["ios"].has_key(groupname):
        print groupname,u"组名不存在"
        sys.exit(0)
    if  not configdata["ios"][groupname].has_key('channel_id'):
        print  groupname,u"组下的channel_id不存在"
        sys.exit(0)
    chanel = configdata["ios"][groupname]["channel_id"]
    certificate = ""
    plist = ""
    mobileprovision = ""
    if isenterprice:
        if  not configdata["ios"][groupname].has_key('enterprice_certificate'):
            print  groupname,u"组下的enterprice_certificate不存在"
            sys.exit(0)
        certificate = configdata["ios"][groupname]["enterprice_certificate"]["name"]
        plist = configdata["ios"][groupname]["enterprice_certificate"]["plist"]
        mobileprovision = configdata["ios"][groupname]["enterprice_certificate"]["mobileprovision"]
    else:
        if  not configdata["ios"][groupname].has_key('certificate'):
            print  groupname,u"组下的certificate不存在"
            sys.exit(0)
        certificate = configdata["ios"][groupname]["certificate"]["name"]
    # print certificate
    chanellist= []
    for li in chanel:
        # print li
        for i in range(li["s"],li["e"]+1):
            chanellist.append(i)
    # print chanellist
    if os.path.isdir("./temp"):
        shutil.rmtree("./temp")
        os.mkdir("./temp")
    else:
        os.mkdir("./temp")
    allfile= []
    dirlist("./src/", allfile)
    filelist = []
    dirnamelist = []
    for file in allfile:
        if ".ipa" in file:
            file = os.path.split(file)[1]
            filelist.append(file)
            dirname = file[:file.rfind(".ipa")]
            dirnamelist.append(dirname)
            if os.path.isdir("./temp/"+dirname):
                shutil.rmtree("./temp/"+dirname)
                os.mkdir("./temp/"+dirname)
            else:
                os.mkdir("./temp/"+dirname)

            un_zip("src/"+file,dirname)
            # print u"解压成功"
    for i in range(0,len(filelist)):
        dirname = dirnamelist[i]
       
        allfile2 = []
        dirlist("./temp/"+dirname, allfile2)
        midname = ""#目录名
        for name in allfile2:
            if "embedded.mobileprovision" in name:
                midname =  os.path.dirname(name)
                break
        # print u"替换文件..."
        if isenterprice:
            shutil.copyfile("./"+mobileprovision,midname+"/embedded.mobileprovision")
        # print mobileprovision
        os.system('cp $HANDY_HOME/utils/plutil ./')
        os.system('plutil -convert json ' +midname+'/Info.plist')#转成可读的
        info = open(midname+"/Info.plist")
        ff = info.read()
        infodata = json.loads(ff)
        oldchanel = infodata['CHANNEL_ID']
        info.close()
        os.system('plutil -convert xml1 ' +midname+'/Info.plist')
        print(oldchanel)
        for id in chanellist:
            shutil.rmtree(midname+"/_CodeSignature")
            # plutil -c xml1 com.apple.SpringBoard.plist
            # print midname+'/info.plist'
            os.system('plutil -replace CHANNEL_ID -string '+ str(id)+" " +midname+'/Info.plist')
            # print('plutil -replace CHANNEL_ID ' +midname+'/Info.plist11111')
            # print certificate
            if isenterprice:
                # print isenterprice
                # print plist
                tempstr = 'codesign -f -s "'+certificate + '" --entitlements ./' + plist +" "+midname
                # print tempstr
            else:
                tempstr = 'codesign -f -s "'+certificate + '" ' +midname
            os.system(tempstr)
            newpackname = dirname.replace(str(oldchanel),str(id))
            print newpackname
            newpack = zipfile.ZipFile("./temp/"+newpackname+".ipa","w",zipfile.ZIP_DEFLATED)  #ZIP_STORED模式不会压缩
            allfile3 = []
            dirlist("./temp/"+dirname, allfile3)
            for name2 in allfile3:
                name2 = name2.replace("\\","/")
                if "Payload/" in name2:
                    # print name2+"_____"
                    name3 = name2[name2.rfind("Payload/")+8:]  
                    newpack.write(name2,"./Payload/"+name3)
            newpack.close()
            newpack2 = open("./temp/"+newpackname+".ipa","rb")
            data = newpack2.read()
            newpack2.close()
            md5 = hashlib.md5(data).hexdigest()
            newpackname2 = newpackname[:newpackname.rfind("_")]+md5
            shutil.copyfile("./temp/"+newpackname+".ipa","./out/"+newpackname2+".ipa")
            os.remove("./temp/"+newpackname+".ipa")
        shutil.rmtree("./temp/"+dirname)
        os.remove("./plutil")
        # os.remove("./temp/"+newpackname+".ipa")

       
main()