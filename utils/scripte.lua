print("please input errorLogs path:")
local st = io.read()

function changeMD5ByError()
	print("脚本开始")
	local isFind = false
	local infojson = ""
	local file = io.open(st,"r")
	if file==nil then
		print("您指定的文件不存在,请检测文件路径!!")
		file:close()
		return
	end
	local str = file:read("*a")
	print(str.."--打印出读取的文件结果")  --打印出读取的文件结果
	file:close()

	local s = string.gsub(str,"\\n","\n")
	s = string.gsub(s,"\\t","")
	s = string.gsub(s,"\\\"","")
	s = string.gsub(s,"+"," ")
	s = string.gsub(s,"/"," ")
	s = string.gsub(s,".bin",".lua")

	local outfile = io.open(st,"w")
	if outfile== nil then
		print("创建文件失败")
		outfile:close()
		return
	end
	outfile:write(s)
	outfile:close()

	file = io.open(st,"r")
	if file==nil then
		print("您指定的文件不存在,请检测文件路径!!")
		file:close()
		return
	end
	local tb = {}
	for line in file:lines() do
		local x = string.find(line,".lua")
		if x then
			local str = string.sub(line,x-32,x-1)
			tb[str] = 1
		end
	end
	file:close()

	local fileMd5 = io.open("../md5Paths.json","r")
	if fileMd5 == nil then
		print("找不到该文件！")
		fileMd5:close()
		return
	end
	local tbres = {}  --真实路径
	for line in fileMd5:lines() do
		for k,v in pairs(tb) do
			local x = string.find(line,"\""..k.."\"")
			if x then
				local str = string.sub(line,1,x-2)
				table.insert(tbres, str)
				break
			end
		end	
	end
	fileMd5:close()

	file = io.open(st,r)
	if file==nil then
		print("您指定的文件不存在,请检测文件路径!!")
		file:close()
		return
	end
	str = file:read("*a")
	local i = 1
	for k,v in pairs(tb) do
		str = string.gsub(str,k,tbres[i])
		i = i+1
	end
	
	outfile = io.open(st,"w")
	if outfile== nil then
		print("创建文件失败")
		outfile:close()
		return
	end
	outfile:write(str)
	outfile:close()
	print("sucsses!")
	io.read()
end
changeMD5ByError()
print("转换完成，按任意键结束")

-- print(string.len("d82b24ab503cef21656074b7cb93f12e"))
