////////////////////////////////////////////////////////////////////////////////
// 变量的演示
var idx1, idx2	// 一次声明多个遍历，默认值为null
var idx1 = 3, idx3 = 4// 声明多个遍历并赋予初始值
var a = 0
for(var a = 0; i < 10; i++) {// 这里面的a和上面的a属于不同的域
}
dump(a, "a")// 这里打印的a的值为0
////////////////////////////////////////////////////////////////////////////////
// 闭包函数的演示
var a = 1;
function test(b1, b2, b3) {
	var b = b1;
	var bb = b2;
	var bbb = b3;
	function s() {
		var c = 3;
		b += c;
		return b;
	}
	return s;
}
print("开始\n");

var fn = test(3, 4);// 获取函数
for(var i = 0; i < 100; i++) {
	fn();
	fn();
}
print("结果:%d\n", fn());

////////////////////////////////////////////////////////////////////////////////
// 1.syy内容如下
// 默认参数的s使用
function add(x = 1, y = 2, z = 3) {
	return x + y + z
}
dump(add(), "add========>")
return {add:add}// 导出模块方法，可以重新指定名字

////////////////////////////////////////////////////////////////////////////////
// 2.syy 内容如下
// 演示require的用法
var ku1 = require("1")// 导入第一个库
dump(ku1, "ku1")
print("结果:" + ku1.add(4, 5))

////////////////////////////////////////////////////////////////////////////////
// 链表的创建和遍历演示
var i = 3
var ary = [1, 2, 3, 4]
// var ary = new Vector(1, 2, 3, 4) 效果和上面一样，上面只不过是简洁的写法
// var ary = Vector.ctor(1, 2, 3, 4) 本质上是调用Vector的构造函数，效果和上面一行一致

// 普通的遍历
for(var i = 0; i < ary.length; i++) {
	print("数组:%d\n", ary[i])
}
print("i:" + i)

// 遍历数组
var ary = [1, 2, 3, 4, 5]
for(var i, v of ary) {// 用于遍历数组， for of 不支持缺省参数，都必须定义，
	dump(v, "v=====>")
}

// 测试continue
var ary = [1, 2, 3]
for(var i, v of ary) {// 索引和值 不会因为变量名声明为'_'而缺省，内部其实就是遍历实现的，只不过提供了一个方便的写法而已
	if(v == 2) continue
	trace(v)
}

var ary = new Vector(1, 2, 3, 4)// 创建链表
dump(ary, "ary")

dump(ary.back(), "back()")
dump(ary.length, "length")
dump(ary.size(), "size()")
dump(ary.get(2), "get()")
dump(ary.slice(1, -1), "slice()")

dump(ary[1:], "[切片]")

for(var i, v of ary) {
	print("i-->%d, v-->%d\n", i, v)
}

dump(ary, "ary1")
dump(ary.swap(1, 3), "swap()")// 交换元素
dump(ary, "ary2")
dump(ary.remove(1), "remove()")// 删除元素
dump(ary, "ary3")
dump(ary.insert(7, 1), "insert()")// 插入元素
dump(ary, "ary4")
dump(ary.add(8), "add()")// 添加元素
dump(ary, "ary5")
dump(ary.set(666, 0), "set()")// 修改索引处元素
dump(ary, "ary6")
ary.clear()// 清空链表
dump(ary, "ary7")

var vec = new Vector("吕布", 4, "张飞")
dump(ary.indexOf("张飞"), "---->")// 查找 '张飞' 所在的索引位置，结果为:2
////////////////////////////////////////////////////////////////////////////////
// 字符串功能演示，长度都获取，切片的使用等
var s = "Hello World"
print(s.length)
print("%c", s[0])// 获取指定字符
print(s[2: 6])// 切片功能测试
print(s.indexOf('W'))// 搜索w

print("lvbu\n")

var s = new String("Hello World")// 等同于  var s = "Hello World"
dump(s.size(), "size()")// 输出长度
dump(s.length, "length")// 通过属性获取长度，速度比size()快些
print("%c", s.at(6))// 获取指定索引处字符
dump(s.indexOf("or"), "indexOf(string)")
dump(s.indexOf('W'), "indexOf(char)")

s = "Hello Hello"
dump(s.indexOf("lo", 6))// 从位置6处开始查找"o"
dump(s.indexOf('o', 6))// 从位置6处开始查找字符'o'

dump(s.lastIndexOf("lo"), "lastIndexOf1")// 从后往前查找字符
dump(s.lastIndexOf('o'), "lastIndexOf2")// 从后往前查找字符

dump(s.lastIndexOf("lo", 6), "lastIndexOf3")// 从后往前查找字符
dump(s.lastIndexOf('o', 6), "lastIndexOf4")// 从后往前查找字符

dump(s.substr(2, 4), "substr");// 截取子字符串,第二个参数表结束索引
dump(s.subString(2, 4), "subString");// 截取子字符串，第二个参数表示长度

dump(s.replaceAll("lo", "**"), "replaceAll")// 替换出现的lo

dump(s.replace(3, 2, "**"), "replace")// 3开始往后两个字符替换成**

dump(s.insert("**", 3), "insert")// 指定索引处插入字符串
dump(s.remove(3, 6), "remove")// 删除指定范围内的字符

dump(s.hashCode(), "hashCode")// 删除前后空格
dump(s.upper(), "upper")// 转大写

dump(s.slice(1, -1), "slice")// 切片
dump(s[1:-1], "[1:-1]")// 切片

s = "Hello"
dump(s.lower(), "lower")// 将所有字符转成小写
s = "   wahah   "
dump(s.trim(), "trim")// 删除前后空格

s = "Hello World"
dump(s.matchingFind("W", "o"), "matchingFind")// 找到W后，再找o
s = "Hello World Hello World"
dump(s.split(" "), "split")// 拆分
dump(s.matchingFind("W", "o", 10), "matchingFind")// 从索引10处开始找，找到W后，再找o

s = "H08k75D31"
dump(s.replaceReg("\d*", "*"), "replaceReg")// 正则表达式替换
s = "HELLO hello"
dump(s.replaceReg("h\w*o", "*****", false), "replaceReg")// 无视大小写

var vec = ["Hello","123", "World"]
dump(s.concat(vec), "concat")// 连接数组

s = "中国WaHaha"
dump(s.countSpace(), "countSpace")//UTF8编码才有意义

////////////////////////////////////////////////////////////////////////////////
// 获取控制台参数信息
dump(os.args(), "args")// 打印控制台参数
dump(os.path(), "path")//获取环境变量
dump(os.platform(), "platform")//获取操作系统

////////////////////////////////////////////////////////////////////////////////
// 哈希表的创建、遍历演示
var hash = {name:2 > 3 ? "lvbu" : "guanyu", age:30}

// 直接调用构造键值必须成对匹配
// var hash = new HashMap("name", 2 > 3 ? "lvbu" : "guanyu", "age", 30)// 功能和上面一行一致
// var hash = HashMap.ctor("name", 2 > 3 ? "lvbu" : "guanyu", "age", 30) 本质都是调用HashMap的静态方法ctor进行构造

dump(hash, "hash")

// 普通的遍历
var iter = hash.nextNode()// 获取哈希表的迭代器
while(iter) {// 如果迭代器不为null，表示还有东西可迭代
	dump(iter.key, "key")// 获取key属性
	dump(iter.value, "value")// 获取value属性
	iter = hash.nextNode(iter)
}

var hash = {name:"吕布", age:"35"}
for(var k, v in hash) {// 遍历表, k为键，v为值
	dump(k, "key");
	dump(v, "value");
}

var hash = {a:1, b:2, c:3, d:4}
for(var k, v in hash) {
	if(k == 'c') continue
	dump(v, k)
}

// 根据自己的需求来，如果未访问键/值，那么可以使用'_'告知编译器无需定义键对应的变量
for(var _, _ in hash) {// 当变量名为_时，表示缺省
	print("111\n")
	// print(_)// '_'变量是未定义的，这样去访问会报错。
}

var t = new HashMap("name", "吕布", "age", 30)
dump(t, "t")

dump(t.size(), "size()")// 通过方法访问长度
dump(t.isEmpty(), "isEmpty()")// 表是否为空
dump(t.have("name"), "have()")// 检测是否包含某个key
dump(t.get("name"), "get()")// 获取key对应的值
dump(t["age"], "[\"age\"]=>")// 获取key对应的值

var iter = t.nextNode()
while(iter) {
	dump(iter.key, "key")// 通过方法访问
	dump(iter.value, "value")// 通过属性名访问
	iter = t.nextNode(iter)
}

// 本质和上面的遍历一样，只不过下面这种写法更方便快捷
for(var key, value in t) {
	dump(key, "key")
	dump(value, "value")
}

// 可变哈希表测试
var t = {name:"关羽", age:54}// 等同于 var t = new MutableHashMap("name", "关羽", "age", 54)
t.speed = 97
// t.put("speed", 97) 效果和上面一样，这样写有些麻烦
dump(t, "t")
t.remove("age")
dump(t, "t1")
t.clear()
dump(t, "t2")

////////////////////////////////////////////////////////////////////////////////
// 函数的连续调用演示
function func1() {
	var this1 = this
	var a = 2
	function func2() {
		var this2 = this
		var a = 3
		function func3() {
			print("this1:%d, this2:%d", this1.a, this2.a)
		}	
		return func3
	}
	return func2
}
func1()()()// 调用了func2

////////////////////////////////////////////////////////////////////////////////
// 类、创建实例的演示
// 如何定义类
class CPerson {
	var m_name = ""// 获取名字
	var m_age = 0// 定义年龄
	
	function ctor(name, age) {// 构造函数
		print("CPerson 被构造\n")
		m_name = name
		this.m_age = age// 当名字和外面一致时，可以使用this指针
	}

	function run() {// 跑
		print("%s %d 跑路中\n", this.m_name, this.m_age)
	}

	function test(x, y) {
		dump(x, "---x")
		dump(y, "---y")
	}
}

var p = new CPerson("关羽", 30)
p.run()// 调用方法

p = new CPerson("张飞", 27)
p.run()// 调用方法

////////////////////////////////////////////////////////////////////////////////
// 实现类的静态方法，以及调用，构造实例对象
class CA {
	static var s_count = 0
	var m_name;// 成员变量都需要挪到构造函数中去提前初始化，需要编译器操作一波

	function talk() {// 没有this指针的就是静态函数
		print("%s 说话, %d\n", this.m_name, s_count)// 访问静态方法
	}
	// 类声明内，不能出现 var、function其他的关键字，所有变量都必须修饰
	function ctor(name) {// 无需添加this指针，ctor为特殊的函数，不要用static去修饰，不要有返回值
		print("CA 被构造\n")
		m_name = name
	}

	static function run() {// 声明了static，就表示为静态方法
		print("%d 跑起来\n", s_count)// 访问静态方法
		s_count++// 累加
	}
}

var i = 0;
while(i < 10) {
	CA.run()// 通过类名调用静态方法
	i++
}

var b = new CA("吕布");
b.talk()// 调用成员方法
b.run()// 可以通过对象来调用类的静态方法

////////////////////////////////////////////////////////////////////////////////
// 继承的演示
class CA {
	static var s_count = 1
	var m_name// 成员变量都需要挪到构造函数中去提前初始化，需要编译器操作一波
	// 类声明内，不能出现 var、function其他的关键字，所有变量都必须修饰
	function ctor(name) {// 无需添加this指针，ctor为特殊的函数，不要用static去修饰，不要有返回值
		print("CA 被构造\n")
		m_name = name
	}

	function talk() {// 没有this指针的就是静态函数
		print("%s 说话, %d\n", this.m_name, s_count)// 访问静态方法
	}

	static function run() {// 声明了static，就表示为静态方法
		print("%d 跑起来\n", s_count)// 访问静态方法
		s_count++// 累加
	}
}

class CB extends CA {// 继承
	static var s_id = 2// 定义id
	var m_age;// 成员变量
	function ctor(name, age) {// 构造
		super(name);// 显示的调用父类构造方法
		print("CB 被构造\n")
		this.m_name = name// 属性赋值
		m_age = age
	}

	function talk() {// 重载实例方法
		print("%s 说话, %d, %d\n", this.m_name, CA.s_count, this.m_age)// 访问静态方法
	}
}

CA.run()// 修改静态变量试试
var b = new CB("吕布", 30)
b.talk()
//b::run();// 这样调用静态方法应该是可取的

////////////////////////////////////////////////////////////////////////////////
// 成员函数包装，使其能在别处调用，需要实现一个handle方法进行包装
function handle(obj, func) {
	return function(...) {
		return func(obj, ...)
	}
}

class CA {
	var m_name;
	function ctor(name) {
		m_name = name;// 构造函数内，可以通过 m_name去访问成员变量，this可以省略
	}

	function func1(x, y) {
		dump(x + y, this.m_name) // 普通成员函数内，访问成员变量，this指针不能省略
	}

	function func2() {
		return {func:handle(this, func1)}
	}

	function func3() {
		return handle(this, func1)
	}
}

var ca = new CA("吕布")

var obj = ca.func2()// 获取包装后的函数
obj.func(3, 4)// 调用成员方法，this指针问题？

var obj2 = ca.func3()
obj2(7, 8)
////////////////////////////////////////////////////////////////////////////////
// 子类重写父类方法，需要调用被重写的方法演示
class CA {
	static function talk() {
		trace("CA talk") 
	} 

	function run() {
		print("CA run\n")
		this.test()// 这里实现了多态，会调用CB的test方法
	}

	function test() { 
		trace("CA test")
	}
}
 
class CB extends CA {
	static function talk() {
		CA.talk()// 调用父类的静态方法
		trace("CB talk")
	}

	function test() {
		trace("CB test")
	}

	function run() {
		super.run()// 调用父类run方法
		print("CB run\n")
	}
}

CB.talk()// 子类重载父类方法，如果实现调用子类方法呢？

var b = new CB()
b.run()
////////////////////////////////////////////////////////////////////////////////
// 函数指针的传递
function sort(ary, func) {
	var size = ary.length
	for(var i = 0; i < size - 1; i++) {
		for(var j = i + 1; j < size; j++) {
			if(!func(ary[i], ary[j])) {// 返回true就交换
				ary.swap(i, j)
			}
		}
	}
}

function _sort(a, b) {
	return a < b// 升序排列
}

var ary = [8, 4, 2, 7, 6, 3, 1]
dump(ary, "ary")
sort(ary, _sort)
dump(ary, "ary")

////////////////////////////////////////////////////////////////////////////////
// 转义符的演示
print("娃\"哈哈\n")
////////////////////////////////////////////////////////////////////////////////
// 开关的演示，case后可跟表达式
switch(4 + "5") {
case 1:
	print("1\n")
	break
case 2+3:
	print("2\n")
	break
case 4+"5":
	print("3\n")
	break
case "5" + 6:
	print("4\n")
	break
default:
	print("default\n")
	break
}

////////////////////////////////////////////////////////////////////////////////
// 运算符的演示
var a = -0.5
a+=3
dump(a, "a")

dump(true, "true");
dump(false, "false");

var a = 100
var b = 50
var c = false;
dump(a + b, "a+b")
dump(a - b, "a-b")
dump(a * b,"a*b")
dump(a / b,"a/b")
dump(a % b,"a%b")
dump(a++, "a++")
dump(a--,"a--")

dump(a == b,"a==b")
dump(a != b,"a!=b")
dump(a > b,"a > b")
dump(a < b,"a < b")
dump(a >= b,"a >= b")
dump(a <= b,"a <= b")
dump(a && b || c,"a && b")
dump(a || b,"a || b")
dump(!a,"!a")
dump(a & b,"a & b")
dump(a | b,"a | b")
dump(a ^ b,"a ^ b")
dump(~a,"~a")

a = 2
b = 1
dump(a << b,"a << b")
dump(a >> b,"a >> b")

dump(a += 1,"a += 1")
dump(a -= 1,"a -= 1")
dump(a *= 2,"a *= 2")
dump(a /= 2,"a /= 2")
dump(a %= 1,"a %= 1")

a = 2
dump(a <<= 1,"a <<= 1")
dump(a >>= 1,"a >>= 1")
dump(a &= 1,"a &= 1")
dump(a ^= 1,"a ^= 1")
dump(a |= 1,"a |= 1")

dump(a == 3,"a==3")

print("%d", 0xFF00)

var t = 512
dump((t & 0xFF00) >> 8, "T")// 无法识别十六进制
dump((t & 65280) >> 8, "T")// 编译报错

////////////////////////////////////////////////////////////////////////////////
// 比较运算符的演示
var a = 1;
var b = 1;
if(a < b) {
	print("小于\n");
} else if(a > b) {
	print("大于\n");
} else if(a >= b) {
	print("大于等于\n");
} else if(a <= b) {
	print("小于等于\n");
} else if(a != b) {
	print("不等于\n");
} else if(a == b) {
	print("等于\n");
}

if(a < b) {
	print("小于\n");
} 
if(a > b) {
	print("大于\n");
} 
if(a >= b) {
	print("大于等于\n");
} 
if(a <= b) {
	print("小于等于\n");
} 
if(a != b) {
	print("不等于\n");
} 
if(a == b) {
	print("等于\n");
}

////////////////////////////////////////////////////////////////////////////////
// 异常捕获演示
var a = 2
function test() {
	try {
		a += 3
		dump(a, "normal a")
		return a
	} catch(err) {
		// err.desc 错误描述
		// err.code 错误级别
		/*USER_ERROR 1// 用户触发的致命错误，触发捕获异常，没有捕获会终止程序的执行
		USER_WARING 2// 用户警告
		USER_NOTICE 4// 通知

		ERROR  32// 系统错误
		WARNING 64// 系统警告
		NOTICE 128// 系统通知*/

		if(err & 32) {/// 表示系统错误
			dump(err.desc, "系统错误")// 输出错误信息
		}

		dump(err, "err")
		a += 4
		dump(a, "catch a")
		return a
	} finally {
		++a
		dump(a, "finally a")
		return a
	}
	return 0
}

dump(test(), "test输出的结果")
dump(a++, "main自加后a")

////////////////////////////////////////////////////////////////////////////////
// 调用堆栈演示
function func() {
	var count = 0
	function inline() {
		count++
		print(trackback())// 获取当前堆栈信息
	}
	return inline
}

var func2 = func()
func2()

////////////////////////////////////////////////////////////////////////////////
// 主动抛出异常测试
var a = 2
function test_throw() {
	throw("自定义异常抛出");	
}
function test() {
	try {
		a += 3
		dump(a, "normal a")
		test_throw()
		return a
	} catch(err) {
		dump(err, "err")
		a += 4
		dump(a, "catch a")
		return ++a
	} finally {
		++a
		dump(a, "finally a")
		return a
	}
	return 0
}
dump(test(), "test输出的结果")

////////////////////////////////////////////////////////////////////////////////
// 匿名函数演示
function sort(ary, func) {
	var size = ary.length;
	for(var i = 0; i < size - 1; i++) {
		for(var j = i + 1; j < size; j++) {
			if(!func(ary[i], ary[j])) {// 返回true就交换
				ary.swap(i, j)
			}
		}
	}
}

var ary = new Vector(8, 4, 2, 7, 6, 3, 1);
dump(ary, "ary")
sort(ary, function(a, b) {
	return a < b;// 升序排列
})
dump(ary, "ary")

////////////////////////////////////////////////////////////////////////////////
// 可变参数功能演示
function func2(a, ...) {
	dump(a, "a===>")

	var ex_params = ...

	var ary = [ex_params]
	dump(ary, "ary=====================>>>>>>>>>")
}

function test(...) {// 可变参数列表
	var ary = [1, ..., 2]
	dump(ary, "ary")
	func2("test", ...)// 可变参数作为参数传递
}
test(1, 2, 3)

////////////////////////////////////////////////////////////////////////////////
// 全局函数演示
trace("hello world")

// 全局函数测试
trace("刘备")// 自动换行
trace("关羽", "张飞")// 打印多个
print("吕布\n")// 必须\n才会换行
print("吕布手下:%s/%s\n", "张辽", "高顺")

dump(["夏侯惇", "独目苍狼，虽伤亦勇"], "个人信息")// 格式化输出对象信息

////////////////////////////////////////////////////////////////////////////////
// 垃圾回收压力测试，循环引用释放演示
var idx1 = 0;
var idx2 = 1;
for(var i = 0; i < 100; i++) {
	// 故意制造循环引用，检测垃圾回收靠谱否
	//var idx = i << 2;
	var a = [idx1]
	var b = [idx2]

	a.add(b)
	b.add(a)

	a = null
	b = null

	idx1 += 2;
	idx2 += 2;
	dump(idx1, "======idx=======>");

	dump(gccount(), "gccount")// 打印活着的容器对象个数
}

////////////////////////////////////////////////////////////////////////////////
// Object对象测试，大部分都是继承自Object
var i = 1

dump(i.id(), "id()")// id一样表示为同一个对象
i.retain()// 增加引用计数器
dump(i.retainCount(), "retainCount()")// 获取引用计数器
i.release()// 减少引用计数器
dump(i.retainCount(), "retainCount()")

dump(i.equal(1), "equal()")// 其实== 也是调用的这个方法

var ary = [1, 2, 3]
dump(ary.toString(), "toString()")

////////////////////////////////////////////////////////////////////////////////
// 数组的演示，本质是个数组，而Vector是个链表
var ary = new Array(1, 2, 3)
dump(ary, "ary")

dump(ary.indexOf(3), "indexOf()")
dump(ary.indexOf(4), "indexOf()")

ary.shift()
dump(ary, "ary")

var ary = new Array(0, 1, 2, 3, 4, 5)
dump(ary, "ary2")
dump(ary.slice(1, -1), "slice(1, -1)")
dump(ary[2:-2], "[2:-2]")

dump(ary.length, "length")// 通过属性获取长度
dump(ary.size(), "size()")// 通过函数获取长度

dump(ary[3], "[3]=>")// 获取索引处元素
dump(ary.get(2), "get()")// 获取索引处元素
dump(ary.back(), "back()")// 获取第一个元素


var ary = new Array(0, 1, 2, 3, 4, 5)
dump(ary, "ary")
var ary2 = new Array(6, 7, 8)
dump(ary2, "ary2")

ary.concat(ary2)
dump(ary, "ary3")

dump(ary.pop(), "pop()")// 删除末尾元素，并返回
dump(ary, "ary4")

dump(ary.push(9), "push()")// 追加元素至数组末尾
dump(ary, "ary5")

dump(ary.unshift(66), "unshift()")// 往数组头插入元素
dump(ary, "ary6")

dump(ary.insert(2, 77), "insert()")// 插入元素至索引处
dump(ary, "ary7")

dump(ary.remove(1, 2), "remove()")// 从索引1处开始删除2两个元素
dump(ary, "ary8")

dump(ary.swap(2, 3), "swap()")// 交换两个元素
dump(ary, "ary9")

dump(ary.set(1, 88), "set()")// 设置元素
dump(ary, "ary10")

ary[3] = 99// 设置索引处元素
dump(ary[3], "[3]=>")// 访问索引处元素 

for(var i, v of ary) {// 遍历数组
	print("i=>%d, v=>%d\n", i, v)
}

////////////////////////////////////////////////////////////////////////////////
// 浮点数的演示
var d1 = new Double(1)
dump(d1, "d1")
var d2 = new Double("3.14")
dump(d2, "d2")
var d3 = new Double(3.1415926)
dump(d3, "d3")

dump(Double.parseFloat("123.234"), "parseFloat()")
/* 结果如下:
d1 = 1
d2 = 3.14
d3 = 3.14159
parseFloat() = 123.234
*/

var i1 = new Integer(1)
dump(i1, "i1")
var i2 = new Integer("2")
dump(i2, "i2")
var i3 = new Integer(4.6)
dump(i3, "i3")

dump(Integer.parseInt("345"), "parseInt")

/* 结果如下:
i1 = 1
i2 = 2
i3 = 4
parseInt = 345
*/

////////////////////////////////////////////////////////////////////////////////
// Json的解析和转字符串
var s = "{\"name\":\"lvbu\"}"
var t = Json.parse(s)
dump(t, "parse")
for(var k, v in t) {
	print("k=>%s\n", k)
	dump(v, "v")
}

dump(Json.toString(t), "toString")
dump(Json.toString(t, false), "toString")

////////////////////////////////////////////////////////////////////////////////
// 字节数组，父类ByteStream的测试
var ary = new ByteArray()
ary.writeString("关羽\n张飞\n赵云\n马超\n黄忠\n");
ary.writeByte(1)
ary.writeShort(2)
ary.writeShort(2, true)
ary.writeInteger(3)
ary.writeInt(4)
ary.writeInt(4, true)
ary.writeString("Hello")
ary.writeStringWithSize("WaHaHa", 2)

dump(ary.save("1.bin"), "save()")


var ary = new ByteArray()
dump(ary.open("1.bin"), "open()")
dump(ary.length, "length")
dump(ary.size(), "size()")

for(var i = 0; i < 4; i++) {
	dump(ary.readLine(), "i=>" + i)// 读取一行
}
dump(ary.readString(), "readString()")

dump(ary.readByte(), "readByte()")
dump(ary.readShort(), "readShort()")
dump(ary.readShort(true), "readShort(true)")
dump(ary.readInteger(), "readInteger")
dump(ary.readInt(), "readInt")

ary[0] = 9// 设置0索引处值为9
dump(ary[0], "[0]=>")// 获取0号位置字节值

var pos = ary.getPosition()
for(var i = 0; i < 3; i++) {// 通过设置读指针，实现多次读取
	ary.setPosition(pos)
	dump(ary.readInt(true), "readInt(true)")
}

dump(ary.readString(), "readString")
dump(ary.readStringWithSize(2), "readStringWithSize")

// 字节数组测试
dump(ary, "ary")
ary.clear()
dump(ary, "ary")


var ary2 = new ByteArray()
ary2.writeString("Hello")

dump(ary2.toStr(), "toStr")

var ary = new ByteArray()
ary.writeBytes(ary2, 1, 3)
dump(ary, "ary")

ary.setPosition(0)// 注意下标越界的问题
dump(ary.readBytes(0, ary.length), "ary3")
ary.setPosition(0)// 注意下标越界的问题
dump(ary.readBytes(), "ary3")// 都缺省，从当前指针处读到文件尾

////////////////////////////////////////////////////////////////////////////////
// 字节数组，压缩/解压缩、加解密 测试
var ary = new ByteArray()
ary.writeString("滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。")
var ary33 = ary.compress()// 压缩

// 压缩测试
var ary44 = new ByteArray()
ary44.writeInteger(ary33.length)
ary44.writeBytes(ary33)
ary44 = ary44.xxtea("zhishao8gezifu", true)
dump(ary44.save("2.bin"), "save2")


var ary4 = new ByteArray()
ary4.open("2.bin")
ary4 = ary4.xxtea("zhishao8gezifu", false)
var length = ary4.readInteger()// 获取压缩前长度
var ary5 = ary4.readBytes()
var ary6 = ary5.uncompress(length)
dump(ary6.toStr(), "toStr")

////////////////////////////////////////////////////////////////////////////////
// 文件测试，父类ByteStream内的方法已经在41里测试过，这里不再赘叙
var file = new File()
dump(file.open("1.txt", true), "open")
file.writeString("关羽\n张飞\n赵云\n马超\n黄忠\n")
file.close()

file.open("1.txt", false)
for(var i = 0; i < 5; i++) {
	dump(file.readLine(), "i=>" + i)
}
file.close()

////////////////////////////////////////////////////////////////////////////////
// 文件工具类测试
var c = "c:/work/1.txt"
var vec = FileUtils.splitPath(c)
dump(vec, "vec")

dump(FileUtils.isAbsolutePath(c), "isAbsolutePath")

var desktop = "C:/Users/huangzhou/Desktop"
FileUtils.addSearchDir(desktop)// 添加搜索目录，并且在桌面创建一个test.txt文件

FileUtils.writefile("test.txt", "稍纵即逝")
var path = FileUtils.getfullpath("test.txt")
dump(path, "getfullpath")// 当前目录或者handy的安装目录找文件，找到返回全路径，否则返回null


dump(FileUtils.exist(path), "exist")// 检测文件/目录是否存在
dump(FileUtils.direxist(desktop), "direxist")// 检测目录是否存在
dump(FileUtils.getcwd(), "getcwd")// 获取当前目录

// 组成绝对路径，不会检测文件是否存在
dump(FileUtils.fullpath(FileUtils.getcwd(), "../../test.txt"), "fullpath")

dump(FileUtils.copyfile("1.txt", "2.txt"), "copyfile")
dump(FileUtils.copytree("workspace", "workspace2"), "copytree")

dump(FileUtils.mkdir("1/2/3"), "mkdir")

dump(FileUtils.rename("1", "344"), "rename")
dump(FileUtils.rmdir("344"), "rmdir")
dump(FileUtils.rename("1.txt", "2.txt"), "rename")
dump(FileUtils.remove("2.txt"), "remove")

dump(FileUtils.movefile("3.txt", "2.txt"), "movefile")
dump(FileUtils.movetree("workspace2", "workspace3"), "movetree")
var files = []
FileUtils.dirlist("workspace", files)
dump(files, "files")

dump(FileUtils.getFileEncoding("config.h"), "getFileEncoding")

if(os.platform() == "windows") { 
	FileUtils.setcwd("F:/Coco2dWorkspace/pigMonkey")// 设置工作目录
} else {
	FileUtils.setcwd("/Users/huangzhou/Documents/cocos2d_workspace/pigMonkey");
}
dump(FileUtils.diff("ttlg/assets/scripts", "ttzc/assets/scripts"), "diff")

FileUtils.setcwd("")// 恢复初始的工作目录

dump(FileUtils.writefile("test.txt", "滚滚长江东逝水，浪花淘尽英雄，是非成败转头空，青山依旧在，几度夕阳红，白发渔樵江渚上，古今多少事，都付笑谈中。"), "writefile")
dump(FileUtils.readfile("test.txt"), "readfile")
