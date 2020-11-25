#coding=utf-8
####### 命令行  -u生成 update.zip文件  -j解密src下差异luac文件
import zipfile 
import os 
import shutil
import sys
import re
import json
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
    # file_name = os.path.split(file_name)[1]
    # file_name = file_name[:file_name.rfind(".ipa")]
    print "In the decompression"

    zip_file = zipfile.ZipFile("./"+file_name)
    # file_name= os.path.splitext(file_name)[0]
    # G_DIR.append("./tempzip/"+file_name + "_files###") 
    # if os.path.isdir("./tempzip/"+file_name + "_files###"): 
    #     pass  
    # else:  
    #     mkdir("./tempzip/"+file_name + "_files###")  
    for names in zip_file.namelist():  
        zip_file.extract(names,"./"+dirname)  
    zip_file.close()
def main():
   
    if os.path.isdir("./out"):
        shutil.rmtree("./out")
        os.mkdir("./out")
    else:
        os.mkdir("./out")
    allfile= []
    dirlist("./", allfile)
    filelist = []
    dirnamelist = []
    for file in allfile:
        if ".ipa" in file:
            file = os.path.split(file)[1]
            ft = file.split("_")
            err = True
            if ft[0] == "BoLe" or ft[0] == "HuoXing" or ft[0] == "BoBei": 
                err = False
            if err :
                print "err not BoLe HuoXing BoBei "
                exit(0)
            filelist.append(file)
            dirname = file[:file.rfind(".ipa")]
            dirnamelist.append(dirname)
            if os.path.isdir("./"+dirname):
                shutil.rmtree("./"+dirname)
                os.mkdir("./"+dirname)
            else:
                os.mkdir("./"+dirname)

            un_zip(file,dirname)
            print "Unpack the success"
    for i in range(0,len(filelist)):
        dirname = dirnamelist[i]
       
        allfile2 = []
        dirlist("./"+dirname, allfile2)
        midname = ""
        for name in allfile2:
            if "embedded.mobileprovision" in name:
                os.remove(name)
                midname =  os.path.dirname(name)
                break
        print "Replace the file..."
        shutil.rmtree(midname+"/_CodeSignature")
        shutil.copyfile("./inhousemobileprovision.mobileprovision",midname+"/embedded.mobileprovision")
        # os.rename(midname+ "/inhousemobileprovision.mobileprovision",midname+"/embedded.mobileprovision")
        print "...The signature..."
        os.system('codesign -f -s "iPhone Distribution: CityArk Inc." --entitlements ./Entitlements.plist ' +midname)
        print "...packaging..."
        newpack = zipfile.ZipFile("./out/new_"+dirnamelist[i]+".ipa","w",zipfile.ZIP_DEFLATED)  #ZIP_STORED模式不会压缩
        allfile3 = []
        dirlist("./"+dirname, allfile3)
        for name2 in allfile3:
            name2 = name2.replace("\\","/")
            if "Payload/" in name2:
                # print name2+"_____"
                name3 = name2[name2.rfind("Payload/")+8:]  
                newpack.write(name2,"./Payload/"+name3)
        newpack.close()
        shutil.rmtree("./"+dirname)
main()