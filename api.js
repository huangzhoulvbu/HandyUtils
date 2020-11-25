命令行
	handy20 <脚本路径>
参数:
	-d 不运行脚本，当只需要编译成cyy时用到，默认是运行
	-c 不生成cyy编译脚本，默认是生成的，这样解释器检测到cyy的修改时间大于.syy的修改时间，直接加载cyy文件运行，省去编译环节
	-a 生成字节码文件，查看syy编译后的样子，检查编译是否正确时用到，默认不会启用


// 全局变量
// 错误，抛出异常时使用
var ERROR:Integer  // 致命错误，程序会直接结束，try catch无法捕获
// 警告
var WARNING:Integer// trycatch能捕获，如果未捕获程序依旧停止运行
// 通知
var NOTICE:Integer// try catch无法捕获，只是输出信息，既不会触发try catch，也不会停止程序运行

// 打印，会自动换行，支持打印多个对象，都会换行
function trace(...) {}

// 格式化打印，需要自己控制换行 print("%d", 3)  print(1, 2, 3) 两种写法都支持，第一个是字符串，底层就会认为是格式化输出
function print(...) {}

/* 格式化输出
	obj:待打印的对象
	tip:提示信息
	depth:打印的深度
*/
function dump(obj:Object, tip:String = "", depth:Integer):void {}

// 导入模块函数
function require(path:String):Object {}

// 获取当前调用栈信息
function trackback():String {}

/* 抛出异常
	error_level:错误等级，缺省时默认为 WARNING警告
		ERROR  // 致命错误
		WARNING // 警告
		NOTICE // 通知
*/
function throw(err:String, error_level:Integer = WARNING):void {}

// 执行shell方法，返回0表示成功
function system(cmd:String):Integer {}

// 接受输入, len可接受的内容长度
function input(len:Integer = 32):String {}

// 接受输入字符
function getchar():Integer {}

// 待回收的容器个数
function gccount():Integer {}

/* 基础对象 
	里面的方法内存管理方法不建议去调用，除非你知道自己在干什么
	否则容易出现内存泄漏的问题。
*/
class Object {
	/* 返回对象唯一索引 */
	function id():Integer {}
	/* 释放对象*/
	function release():void {}
	/* 持有对象 */
	function retain():void {}
	/* 自动释放*/
	function autoRelease():void {}
	/* 持有次数 */
	function retainCount():Integer {}

	/* 对象转换成字符串 */
	function toString():String {}

	/* 比较两个对象是否相等 */
	function equal(obj:Object):Boolean {}
}

class Sound {
	// 播放声音
	static function play(path:String):void {}
}

class os {
	/* 获取控制台参数 */
	static function args() {}
	/* 根据名字获取环境变量，没找到返回null */
	static function getevn(name:String):String {}
	/* 获取当前平台
		return:
			windows
			apple
			linux
			unknow:未知系统
	*/
	static function platform():string {}
}

/* 不可变数组，数组一旦创建，无法修改
*/
class Array extends Object {
	/* 数组长度 */
	public length:Integer

	/* 初始化数组元素
	*/
	function ctor(...) {}

	/* 从数组中搜索对象所在的索引位置，未找到返回-1
		obj:被搜索对象
		formIndex:起始索引，缺省为0
		return:未找到将返回-1
	*/
	function indexOf(obj:Object, formIndex:Integer = 0):Integer {
	}

	/* 删除数组的第一个元素，并返回该元素
	*/
	function shift():Object {
	}

	/* 切片，返回数组中某一范围内的元素，并返回一个新数组
		start:起始索引，暂不支持负数
		end:结束索引，暂不支持负数
		return:当下标越界时，返回null
	*/
	function slice(start:Integer, end:Integer):Array {
	}

	/* 返回数组元素个数 */
	function length():Integer {
	}

	/* 获取索引处对象 
		idx:索引位置
		return:下标越界时，将返回null
	*/
	function get(idx:Integer):Object {
	}

	/* 返回第一个元素 */
	function top():Object {
	}

	/* 将参数中指定的元素与数组中的元素连接，并创建新的数组。
		ary:需要被连接的数组对象
	*/
	function concat(ary:Array):void {
	}

	/* 删除数组中最后一个元素，并返回该元素的值。
	*/
	function pop():Object {
	}

	/* 将一个或多个元素添加到数组的结尾，并返回该数组的新长度。
	*/
	function push(obj:Object):Boolean {
	}

	/* 删除数组中第一个元素，并返回该元素。
	*/
	function shift():Object {
	}

	/* 给数组添加元素
	*/
	function insert(start:Integer, obj:Object):Boolean {
	}

	/* 从数组中删除元素
	*/
	function remove(start:Integer, len:Integer = 1):Boolean {
	}

	/* 交换两个元素
	*/
	function swap(i:Integer, j:Integer):Boolean {
	}

	/* 设置指定索引位置元素
	*/
	function set(idx:Integer, obj:Object):Boolean {
	}
}

/* 不可变链表，一旦创建，后续无法改变
*/
class Vector extends Object {
	/* 基础使用方法
		var vec = [0, 1, 2]// 创建数组
		vec[0] = 3// 下标访问元素
		trace(vec[-1])// 访问最后一个元素
		for(var i, v of vec) {// 遍历链表
			// i表示索引、v表示元素值
		}
		trace(vec[0:-1])// 切片，负数表示从后往前索引，前后都可以缺省
		trace(vec[:])// 第一个参数缺省表示第一个索引，第二个参数缺省表示末尾索引
	*/

	/* 链表长度 */
	public length:Integer

	/* 创建一个由可变参数组成的链表
	*/
	function ctor(...) {
	}

	/* 返回末尾元素
	*/
	function back():Object {
	}

	/* 返回链表长度 
	*/
	function size():Integer {
	}

	/* 返回指定索引处元素
	*/
	function get(idx:Integer):Object {
	}

	/* 搜索指定的对象
		找到返回对应的索引，没有找到返回-1
	*/
	function indexOf(obj:Object):Integer {
	}


	/* 切片函数，返回索引指定范围元素构成的新链表
		idx:起始索引，负数从链表末尾往前计数
		end:结束索引，负数从链表末尾往前计数
		return 当索引越界或前面索引大于后面索引，则返回null
	*/
	function slice(idx:Integer, end:Integer):Vector {
	}
	/* 交换指定索引处元素位置
	*/
	function swap(i:Integer, j:Integer):Boolean {
	}

	/* 清空链表 
	*/
	function clear() {
	}

	/* 删除指定元素
	*/
	function remove(idx:Integer):Boolean {
	}

	/* 插入元素至链表指定索引处，当索引越界, 将元素添加到末尾 
	*/
	function insert(obj:Object, idx:Integer):Boolean {
	}

	/* 添加元素至链表末尾
	*/	
	function add(obj:Object):Boolean {
	}

	/* 设置元素 */
	function set(obj:Object, idx:Integer):Boolean {
	}
}


/* 哈希表迭代类
*/
class HashMapIterator extends Object {
	/* 返回键 */
	public key:String = ""
	/* 返回值 */
	public value:String = ""
}

/*
	哈希表
*/
class HashMap extends Object {
	/* 基础使用方法
		var map = {name:"吕布"}// 创建数组
		var key = "age"
		map[key] = 3// 添加一个键值对 age:3
		map["age"] = 3// 和上面效果一样
		map.age = 3// 和上文效果一样
		map.age++// 年龄累加
		trace(map.age)// 打印键对应的值
		for(var k, v in map) {// 遍历链表
			// k表示键、v表示值
		}
	*/

	/* 可变参数，(键/值)必须成对出现*/
	function ctor(...) {}

	/* 返回哈希表长度 */
	function length():Integer {}

	/* 返回表的实际容量 */
	function capaticy():Integer {}

	/* 检测表是否为空 */
	function isEmpty():Boolean {}

	/* 迭代，获取下一个节点 
		iter:为null时，表示获取第一个节点
		return:返回null表示哈希表已经遍历完毕
	*/
	function nextNode(iter:HashMapIterator = null):HashMapIterator {}

	/* 检测哈希表内是否包含指定key */
	function have(key:String):Boolean {}

	/* 返回key对应的值 */
	function get(key:String):Boolean {}
	/* 压入键值对，当键存在时，替换值*/
	function put(key:String, value:Object):void {}

	/* 删除键对应的节点 */
	function remove(key:String):void {}

	/* 清空哈希表 */
	function clear():void {}
}

class String extends Object {
	// 获取长度属性
	public length:Integer = 0

	/* 返回字符串长度 */
	function length():Integer {}

	/* 两个字符串是否相等 */
	function equals(s:String):Boolean {}

	/*比较字符串，并返回结果*/
	function compare(str:String):Integer{}

	/* 获取指定位置字符 */
	function at(idx:Integer):Integer {}

	/* 从前往后开始搜索字符串 */
	function indexOf(s:Char|String, start:Integer = 0):Integer {}

	/* 从尾往前查找字符|字符串 
		return:查找失败，返回-1
	*/
	function lastIndexOf(char:Char|String, start:Integer = 0):Integer {}

	/* 截取子字符串 
		start:起始位置
		end:结束位置(不包含)，缺省直接到文件尾
		截取失败，返回null
	*/
	function substr(start:Integer, end:Integer = 0):String {}

	/* 截取子字符串
		start:起始位置
		len:长度，缺省直接到文件尾
	*/
	function subString(start:Integer, len:String = 0):String {}

	/* 替换所有出现的字符串
		str:搜索字符串
		repl:替换成字符串
		return:替换失败，返回null
	*/
	function replaceAll(str:String, repl:String):String {}

	/* 替换字符串 */
	function replace(start:Integer, len:Integer, repl:String):String {}

	/* 插入字符串 */
	function insert(str:String, idx:Integer):Boolean {}

	/* 删除字符串 */
	function remove(start:Integer, end:Integer):String {}

	/* 删除指定索引处字符 */
	function del(idx:Integer):String {}

	/* 修改指定位置字符，不建议使用，会修改原始字符串*/
	function set(char:Integer, idx:Integer):Boolean {}

	/* 去除字符串的前后空格 */
	function trim():String {}

	/* 获取字符串的哈希值 */
	function hashCode():Integer {}

	/* 字符串转换成大写*/
	function upper():String {}

	/* 将字符串转换成小写*/
	function lower():String {}

	/* 匹配查找 */
	function matchingFind(begin:String, end:String, start:Integer = 0):Integer {}

	/* 支持正则的替换 */
	function replaceReg(src:String, dsc:String, iCase:Boolean = true):String {}

	/* 查找匹配正则的字符串 
		无法匹配时会抛出异常
	*/
	function matchReg(reg:String):Vector {}

	/* 将链表元素连接成一个字符串 */
	static function createWithBytes(vec:Vector):String {}

	/* 切片 */
	function slice(idx:Integer, idx1:Integer):String {}

	/* 拆分 */
	function split(split:String):Vector {}

	/*统计字符串占位 中文2位，英文1位*/
	function countSpace():Integer {}
}

/* 浮点数封装类
*/
class Double extends Object {
	function ctor(inte:Integer|String|Double) {}

	/* 字符串转整形
	*/
	static function parseFloat(str:String):Double {}
}

/* 整形封装类
*/
class Integer extends Object {
	function ctor(inte:Integer|String|Double) {}

	/* 字符串转整形
	*/
	static function parseInt(str:String):Integer {}

	/* 数字转字符串
	*/
	static function parseStr(i:Integer):String {}
}

// 流，虚函数，无法直接实例化
class ByteStream extends Object {
	// 长度属性
	public length:Integer = 0

	/* 设置读取指针位置
	*/
	function setPosition(pos:Integer):void {}

	/* 获取读取位置
	*/
	function getPosition():Integer {}

	/* 获取字节数组长度
	*/
	function size():Integer {}

	/* 读取字节
	*/
	function readByte():Integer {}

	/* 写入字节,超出部分会舍弃
	*/
	function writeByte(i:Integer):void {}

	/* 读取短整形
	*/
	function readShort(turn:Boolean = false):Integer {}

	/* 写入短整形
	*/
	function writeShort(i:Integer, turn:Boolean = false):void {}

	/* 自动根据长度写入整形数据
	*/
	function writeInteger(number:Integer):void {}

	/* 和writeInteger匹配使用
	*/
	function readInteger():Integer {}

	/* 读取4字节整形数据
	*/
	function readInt(turn:Boolean = false):Integer {}

	/* 和readInt匹配使用
	*/
	function writeInt(i:Integer, turn:Boolean = false):void {}

	/* 读取字符串，遇到文件尾或者0结束
	*/
	function readString():String {}

	/* 写入字符串，末尾会写入0 
	*/
	function writeString(str:String):void {}

	/* 读取字符串，遇到\n(不包含)时结束, \r也不包含在内
	*/
	function readLine():String {}

	/* 读取指定长度的字符串
	*/
	function readStringWithSize(size:Integer):String {}

	/* 写入指定长度的字符串 
	*/
	function writeStringWithSize(str:String, size:Integer):void {}
}

// 字节数组
class ByteArray extends ByteStream {
	// 获取长度属性
	public length:Integer

	function ctor() {}

	// 初始化容量
	function ctor(capacity:Integer) {}

	// 通过字节缓存创建字节数组
	function ctor(buf:void*, size:Integer) {}

	/* 清理内容，不会改变容量
	*/
	function clear() {}

	/* 写入另一个字节数组
		bytes:待写入的字节数组
		offset:基于源字节数组的偏移量
		length:写入多少字节
	*/
	function writeBytes(bytes:ByteArray, offset:Integer = 0, length:Integer = 0):void {}

	/* 读取一个字节数组
	*/
	function readBytes(offset:Integer, length:Integer):ByteArray {}

	/* 读取字节数组，从当前位置读取一个字节数组
		len:读取的字节长度
	*/
	function readByteArray(len:Integer) {}

	/* 设置字节，
		pos:索引位置
		value:字节型数据
	*/
	function setByte(pos:Integer, value:Integer):void {}

	/* 获取指定位置处字节
		pos:索引位置
	*/
	function getByte(pos:Integer):Integer {}

	/* 转换成字符串
	*/
	function toStr():String {}

	/* 读取一个文件，本身的数据会丢失，最好是建立个新的字节数组进行此操作 */
	function open(path:String):Integer {}

	/* 将字节数组存储到指定路径
		path:路径
	*/
	function save(path:String):Integer {}

	/* 压缩
	*/
	function compress():ByteArray {}

	/* 解压
	*/
	function uncompress(dataLen:Integer):ByteArray {}

	/* 解密
	*/
	function xxtea(key:String, encrypt:Boolean, offset:Integer = 0, type:Integer = 0) {}
}

/* 文件操作类
*/
class File extends ByteStream {
	function ctor() {}

	/* 打开文件
	*/
	function open(path:String, isWrite:Boolean):Boolean {}

	/*关闭文件
	*/
	function close() {}
}

/* 文件工具类
*/
class FileUtils extends Object {
	// 文件类型编码类型
	// 通过 dump(FileUtils.ANSI, "FileUtils.ANSI") 访问即可
	enum Encode {
		UNKNOW = 0,// 不进行编码
		ANSI = 1,// GBK编码，window上常用
		UNICODE_LE = 2,// unicode编码，小端
		UNICODE_BE = 3,// unicode编码，大端
		UTF8 = 4,// utf-8编码，带 bom文件标志
		UTF8_NOBOM = 5,// utf-8编码，不带bom标志
		AUTO = 6,// 自动编码为平台支持的编码
	}

	// 文件移动复制相关，不建议直接使用数值，不方便后续移植
	enum FILE_OPER_FLAG {
		COVER = 1,			// 目标文件存在，则覆盖
		AUTO_MKDIR = 2		// 目标文件所属目录不存在，自动创建
	}

	// 文件夹遍历相关
	enum DIR_LIST_FLAG {
		DL_FILE = 1, // 结果包含文件路径
		DL_FOLDER = 2,// 结果包含文件夹路径
		DL_SUB_FOLDER = 4,// 遍历子文件夹
	}

	/* 拆分路径 
	*/
	static function splitPath(input:String):Vector {}

	/* 检测路径是否为绝对路径
	*/
	static function isAbsolutePath(input:String):Boolean {}

	/* 根据可搜索目录转换成存在的文件全路径
	*/
	static function getfullpath(path):String {}

	/* 添加可搜索目录
		isInsert:是否插入到最开始，搜索优先级最高
	*/
	static function addSearchDir(dir:String, isInsert:Boolean = false):void {}

	/* 检测文件/目录是否存在
	*/
	static function exist(path:Stirng):Boolean {}

	/* 检测目录是否存在
	*/
	static function direxist(path:String):Boolean {}

	/* 获取当前工作目录
	*/
	static function getcwd():String {}

	/* 设置当前工作目录
	*/
	static function setcwd(dir:String):void {}

	/* 基于dir路径，转换成绝对路径 
		dir:一般都是工作目录
		path:相对路径
	*/
	static function fullpath(dir:String, path:String):String {}

	/* 复制文件
	注意，目标文件存在的话，会被删除，目标文件所属目录不存在时，会自动创建
	flag:复制时选项，默认都启用，见 FILE_OPER_FLAG值的组合
		COVER、目标文件存在，则覆盖
		AUTO_MKDIR、目标文件所属目录不存在，自动创建
	
		可能抛出异常
	*/
	static function copyfile(src:String, dsc:String, flag:FILE_OPER_FLAG = FileUtils.COVER|FileUtils.AUTO_MKDIR):void {}

	/* 复制目录
	注意，如果目标文件夹存在的话，会被直接删除
	flag:复制目录时选项
		COVER、目标目录存在时，先删除

		复制失败，会抛出异常
		可能抛出异常
	*/
	static function copytree(src:String, dsc:String, flag:FILE_OPER_FLAG = FileUtils.COVER):void {}

	/* 创建目录
	创建目录失败，会抛出异常
		可能抛出异常
	*/
	static function mkdir(dir:String):void {}

	/* 递归删除目录，即使目录不为空也能删除
		可能抛出异常
	*/
	static function rmdir(dir:String):void {}

	/* 文件改名
		src:文件路径
		dsc:新的文件名，当文件存在，更名会失败
		可能抛出异常
	*/
	static function rename(src:String, dsc:String):void {}

	/* 删除文件
		可能抛出异常
	*/
	static function remove(path:String):void {}

	/* 文件移动，dsc指定的文件存在时，会删除
		flag:复制时选项，默认都启用，见FILE_OPER_FLAG
		return:
			32:源和目标路径一致
			33:删除源文件失败
		可能抛出异常
	*/
	static function movefile(src:String, dsc:String, flag:FILE_OPER_FLAG = FileUtils.COVER|FileUtils.AUTO_MKDIR):void {}

	/* 移动目录，当dsc目录存在时，会先删除再移动src
		return:
			21:删除源目录失败
			其他值见copytree
		可能抛出异常
	*/
	static function movetree(src:String, dsc:String):void {}

	/* 遍历文件夹，默认只遍历子文件夹内所有文件
		path:待遍历的目录
		files:存放符合条件的路径
		flag:标记，默认是会处理下面的三种情况，见 DIR_LIST_FLAG
			FileUtils.DL_FILE, // 结果包含文件路径
			FileUtils.DL_FOLDER,// 结果包含文件夹路径
			FileUtils.DL_SUB_FOLDER,// 遍历子文件夹
		reg:正则表达式，符合正则表达式的才符合条件
		可能抛出异常
	*/
	static function dirlist(path:String, files:Vector, reg:String = null, flag:DIR_LIST_FLAG = FileUtils.DL_FILE|FileUtils.DL_SUB_FOLDER):void {}

	/* 获取文件的编码
		return:见 FileUtils.Encode
		可能抛出异常
	*/
	static function getFileEncoding(path:String):Encode {}

	/* 比较两个目录，差异信息存放到map内
		可能抛出异常
	*/
	static function diff(dir1:String, dir2:String):HashMap {}

	/* 读取文件
		win:返回ANSI编码
		mac、linux:返回UTF-8编码
		encode:取值见 FileUTils.Encode，缺省为AUTO自动根据文件的编码读取内容， UNKNOW:不处理，直接读
		return:打开失败，返回null
		可能抛出异常
	*/
	static function readfile(path:String, encode:Encode = FileUtils.AUTO):String {}

	/* 写入文件
		encode:取值见 FileUTils.Encode，缺省为 UNKNOW:不进行编码操作，直接存储
		可能抛出异常
	*/
	static function writefile(path:String, content:String, encode:Encode = FileUtils.AUTO):void {}

	/* 比较两个文件的修改时间
		如果path1的修改时间小于path2文件的修改时间，返回-1
		相等返回0
		大于返回1
	*/
	static function compareFileModifyTime(path1:String, path2:String):Integer;
}

class Json {
	/* 解析字符串成对象
		可能会抛出异常
	*/
	static function parse(input:String):Object {}

	/* 对象转成字符串 
		format:是否格式化字符串
	*/
	static function toString(obj:Object, format:Boolean = true):String {}
}

class MD5 {
	/* 计算文件的MD5
	*/
	static function MD5Cal(path:String):String {}

	/* 计算字符串的MD5
	*/
	static function MD5Str(str:String):String {}
}

class Utils {
	/* 检测字符串能否转成数字 
	*/
	static function isNumber(str:String):Boolean {}

	/* 十六进制字符串转数字，转换失败会抛出异常 */
	static function toHex(str:String):Integer {}

	/* 八进制字符串转换成数字 
	*/
	static function toHex8(str:String):Integer {}
}