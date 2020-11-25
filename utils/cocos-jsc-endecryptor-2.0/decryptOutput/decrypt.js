window.__require = function e(t, n, o) {
function i(a, s) {
if (!n[a]) {
if (!t[a]) {
var c = a.split("/");
c = c[c.length - 1];
if (!t[c]) {
var l = "function" == typeof __require && __require;
if (!s && l) return l(c, !0);
if (r) return r(c, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = c;
}
var u = n[a] = {
exports: {}
};
t[a][0].call(u.exports, function(e) {
return i(t[a][1][e] || e);
}, u, u.exports, e, t, n, o);
}
return n[a].exports;
}
for (var r = "function" == typeof __require && __require, a = 0; a < o.length; a++) i(o[a]);
return i;
}({
ADLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "33cb6lNbRZNIbyRH4IvzX8r", "ADLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_label_time = null;
t.m_curTime = 30;
t.m_data = null;
t.m_func = null;
t.order_sn = "";
t.m_flag = 0;
t.m_timeoutHandler = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_adType = Number(e.type);
this.m_data = e.ex_data;
this.m_func = e.func;
delete e.type;
var n = this.seekCompByName(cc.Button, "button");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
this.m_label_time = this.seekCompByName(cc.Label, "label_time");
this.m_label_time.string = String(this.m_curTime);
var o = this.m_manager.getMeta("CHANNEL_ID");
this.sendUrl({
action: "PlayAd",
param: JSON.stringify({
channel_code: o,
position_code: this.m_adType
})
}, function(e) {
if (200 == e.code) {
e = e.data;
var n = {
channel_code: o,
position_code: t.m_adType,
player_id: t.m_manager.m_userData.id,
order_sn: e.order_sn || ""
};
t.order_sn = e.order_sn || "";
if (t.m_data) for (var i in t.m_data) n[i] = t.m_data[i];
t.m_manager.setMusicON(!1);
t.m_manager.setEffectON(!1);
t.m_manager.showrewardAd(n);
} else t.removeFromParent();
}, {
manual_catch: !0
});
this.addEventListener("RewardDidSucceed", this._over.bind(this));
this.addEventListener("onAdClose", function() {
t._changeFlag(2);
});
this.addEventListener("onVideoError", function() {
t.cmdToast("获取广告失败");
t._removeSelf(!1);
});
};
t.prototype._removeSelf = function(e) {
this.m_manager.setMusicON(!0);
this.m_manager.setEffectON(!0);
e && this.m_func(this.m_adType);
this.removeFromParent();
};
t.prototype._changeFlag = function(e) {
var t = this;
this.m_flag |= e;
2 == this.m_flag ? this.m_timeoutHandler = this.createTime(function() {
t._removeSelf(!1);
t.cmdToast("网络不稳定，观看广告失败");
}, 5, !0) : 3 == this.m_flag && this._removeSelf(!0);
};
t.prototype._over = function(e) {
var t = this;
0 != e.string ? this.sendUrl({
action: "PlayAdCallback",
order_sn: this.order_sn
}, function(e) {
t.m_manager.m_userData.video_num--;
t.m_manager.RefreshTheTask(a.default.TASK_TYPE.SEE_THE_VIDEO);
t._changeFlag(1);
}) : this.removeFromParent();
};
t.TYPE = {
SCREEN: 1,
REVENUEOFLINE: 2,
SPEED: 3,
ROTARY: 4,
WATCH_ZP_5: 5,
WATCH_ZP_10: 6,
GOLD: 7,
FREE_SAVE: 8,
FREE_UP: 9
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
AFunction: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2cf44+8rI5DhahninbwMAXx", "AFunction");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./ScriptDefine"), i = function() {
function e(e, t, n, o) {
this.m_local = null;
this.m_script = null;
this.m_script = e;
this.m_startLine = t;
this.m_line = 0;
this.m_stack = [];
this.m_localSize = n;
this.m_localSize > 0 && (this.m_local = []);
}
e.prototype.addParams = function(e) {
for (var t = 0; t < e.length; t++) this.m_local[t] = e[t];
};
e.prototype.addElement = function(e) {
for (var t = 0; t < e.length; t++) this.push(e[t]);
};
e.prototype.getStackTop = function() {
return this.m_stack[this.m_stack.length - 1];
};
e.prototype.callOperater = function(e) {
var t = o.RETURN.RETURN_NORMAL, n = null, i = null, r = 0;
switch (e[0]) {
case o.CODE._JUMP:
this.m_line = e[1];
break;

case o.CODE._GETLOCAL:
var a = e[1];
a > -1 && a < this.m_localSize ? this.push(this.m_local[a]) : t = o.RETURN.RETURN_ERROR;
break;

case o.CODE._PUSHNUMBER:
this.push(this.m_script.getNumbers(e[1]));
break;

case o.CODE._CONSTRUCTPROP:
var s = this.m_script.getStr(e[1]), c = [];
for (r = 0; r < e[2]; r++) c.unshift(this.pop());
t = this.createObj(s, c);
break;

case o.CODE._PUSHSTRING:
this.push(this.m_script.getStr(e[1]));
break;

case o.CODE._PUSHNULL:
this.push(0);
break;

case o.CODE._PUSHFALSE:
this.push(!1);
break;

case o.CODE._PUSHTRUE:
this.push(!0);
break;

case o.CODE._SETLOCAL:
this.m_local[e[1]] = this.pop();
break;

case o.CODE._IFFALSE:
("boolean" === (l = typeof (i = this.pop())) ? i : "number" === l ? 0 != i : null != i && void 0 != i) && (this.m_line = e[1]);
break;

case o.CODE._IFTRUE:
var l;
("boolean" === (l = typeof (i = this.pop())) ? i : "number" === l ? 0 != i : null != i && void 0 != i) || (this.m_line = e[1]);
break;

case o.CODE._IFEQ:
(i = this.pop()) != (n = this.pop()) && (this.m_line = e[1]);
break;

case o.CODE._IFNE:
(i = this.pop()) == (n = this.pop()) && (this.m_line = e[1]);
break;

case o.CODE._IFNGT:
i = this.pop();
(n = this.pop()) <= i && (this.m_line = e[1]);
break;

case o.CODE._EQUALS:
i = this.pop();
n = this.pop();
this.push(n == i);
break;

case o.CODE._LESSEQUALS:
i = this.pop();
n = this.pop();
this.push(n <= i);
break;

case o.CODE._IFNGE:
i = this.pop();
(n = this.pop()) < i && (this.m_line = e[1]);
break;

case o.CODE._IFNLT:
i = this.pop();
(n = this.pop()) >= i && (this.m_line = e[1]);
break;

case o.CODE._LESSTHEN:
i = this.pop();
n = this.pop();
this.push(n < i);
break;

case o.CODE._IFNLE:
i = this.pop();
(n = this.pop()) > i && (this.m_line = e[1]);
break;

case o.CODE._ADD:
i = this.pop();
var u = (n = this.pop()) + i;
this.push(u);
break;

case o.CODE._SUBTRACT:
i = this.pop();
n = this.pop();
this.push(n - i);
break;

case o.CODE._MULTIPLY:
i = this.pop();
n = this.pop();
this.push(n * i);
break;

case o.CODE._NEGATE:
this.push(-1 * this.pop());
break;

case o.CODE._NOT:
var m = this.pop();
this.push(!m);
break;

case o.CODE._POP:
this.m_stack.length > 0 ? this.pop() : t = o.RETURN.RETURN_ERROR;
break;

case o.CODE._DIVIDE:
i = this.pop();
n = this.pop();
this.push(n / i);
break;

case o.CODE._MODULO:
i = this.pop();
n = this.pop();
this.push(n % i);
break;

case o.CODE._BITAND:
i = this.pop();
n = this.pop();
this.push(n & i);
break;

case o.CODE._BITOR:
i = this.pop();
n = this.pop();
this.push(n | i);
break;

case o.CODE._LSHIFT:
i = this.pop();
n = this.pop();
this.push(n << i);
break;

case o.CODE._COERCE_I:
var p = parseInt(this.pop());
p ? this.push(Math.floor(p)) : t = o.RETURN.RETURN_ERROR;
break;

case o.CODE._COERCE_S:
n = this.pop();
this.push("" + n);
break;

case o.CODE._CALLPROPERTY:
for (c = [], r = 0; r < e[2]; r++) c.unshift(this.pop());
var h = this.m_script.getStr(e[1]);
if (this.m_script.doFunction(h)) {
this.m_script.getCurFunc().addParams(c);
t = o.RETURN.RETURN_FUNCTION;
} else t = this.callExFunc(h, c);
break;

case o.CODE._INCLOCAL_I:
n = this.pop();
this.push(n + 1);
break;

case o.CODE._DECREMENT_I:
n = this.pop();
this.push(n - 1);
break;

case o.CODE._DUP:
this.push(this.m_stack[this.m_stack.length - 1]);
break;

case o.CODE._END:
this.m_stack = [];
this.m_local = [];
this.m_localSize = 0;
t = o.RETURN.RETURN_FUNCTION;
break;

case o.CODE._RETURN:
var _ = [];
for (r = 0; r < e[1]; r++) _.push(this.pop());
this.m_script.funcOver(_);
t = this.m_script.getCurFunc() ? o.RETURN.RETURN_FUNCTION : o.RETURN.RETURN_OVER;
break;

case o.CODE._KILL:
delete this.m_local[e[1]];
break;

case o.CODE._BITNOT:
this.push(~this.pop());
break;

case o.CODE._RSHIFT:
i = this.pop();
n = this.pop();
this.push(n >> i);
break;

case o.CODE._GREATERTHAN:
i = this.pop();
n = this.pop();
this.push(n > i);
break;

case o.CODE._GREATEREQUALS:
i = this.pop();
n = this.pop();
this.push(n >= i);
break;

case o.CODE._NOTEQUALS:
i = this.pop();
n = this.pop();
this.push(n != i);
break;

case o.CODE._BITXOR:
i = this.pop();
n = this.pop();
this.push(n ^ i);
break;

default:
t = o.RETURN.RETURN_NO_EXECUTE;
}
return t;
};
e.prototype.callExFunc = function(e, t) {
var n = o.RETURN.RETURN_NO_EXECUTE, i = [];
this.m_script.getAgent() && (n = this.m_script.getAgent().callExFunc(e, t, i));
if (n == o.RETURN.RETURN_NO_EXECUTE) {
n = o.RETURN.RETURN_NORMAL;
if ("trace" == e) ; else if ("dump" == e) ; else if ("tonumber" == e) i[0] = parseInt(t[0]); else if ("tostring" == e) i[0] = t[0].toString(); else {
var r = this.pop();
n = null != r ? this.call(r, e, t, this.m_stack, i) : o.RETURN.RETURN_NO_EXECUTE;
}
}
0 == i.length && i.push(0);
this.addElement(i);
return n;
};
e.prototype.call = function(e, t, n, i, r) {
var a = o.RETURN.RETURN_NORMAL, s = typeof e;
do {
if ("string" == s) {
a = this.callString(e, t, n, i, r);
break;
}
if (e instanceof Array) {
a = this.callArray(e, t, n, i, r);
break;
}
a = this.callMap(e, t, n, i, r);
break;
} while (0);
return a;
};
e.prototype.callString = function(e, t, n, i, r) {
var a = o.RETURN.RETURN_NORMAL;
if ("substr" == t) r.push(e.substring(n[0], n[1])); else if ("split" == t) r.push(e.split(n[0])); else if ("getLength" == t) r.push(e.length); else if ("replace" == t) {
var s = e.replace(n[0], n[1]);
r.push(s);
} else "lastIndexOf" == t && (n[1] ? r.push(e.lastIndexOf(n[0], n[1])) : r.push(e.lastIndexOf(n[0])));
return a;
};
e.prototype.callMap = function(e, t, n, i, r) {
var a = o.RETURN.RETURN_NORMAL;
if ("get" == t) r.push(e[n[0]]); else if ("has" == t) r.push(e.hasOwnProperty(n[0])); else if ("put" == t) e[n[0]] = n[1]; else if ("keys" == t) {
var s = [];
for (var c in e) s.push(c);
r.push(s);
} else if ("remove" == t) delete e[n[0]]; else if ("size" == t) {
var l = 0;
for (var u in e) l++;
r.push(l);
}
return a;
};
e.prototype.callArray = function(e, t, n, i, r) {
var a = o.RETURN.RETURN_NORMAL;
"get" == t ? r.push(e[n[0]]) : "add" == t ? e.push(n[0]) : "size" == t ? r.push(e.length) : "remove" == t && r.push(e.split(n[0]));
return a;
};
e.prototype.runCmd = function() {
for (var e = null, t = 0, n = o.RETURN.RETURN_NORMAL; n == o.RETURN.RETURN_NORMAL; ) {
t = this.m_startLine + this.m_line;
this.m_line = this.m_line + 1;
this.m_script.setLineIdx(t);
e = this.m_script.getCmd(t);
n = this.callOperater(e);
}
return n;
};
e.prototype.createObj = function(e, t) {
var n = o.RETURN.RETURN_NO_EXECUTE;
this.m_script.getAgent() && (n = this.m_script.getAgent().createObj(e, t, this.m_stack));
if (n == o.RETURN.RETURN_NO_EXECUTE) {
n = o.RETURN.RETURN_NORMAL;
"Vector" == e ? this.push([]) : "HashMap" == e ? this.push({}) : n = o.RETURN.RETURN_NO_EXECUTE;
}
return n;
};
e.prototype.pop = function() {
var e = null;
do {
if (this.m_stack.length < 1) break;
e = this.m_stack.pop();
} while (0);
return e;
};
e.prototype.push = function(e) {
this.m_stack.push(e);
};
e.prototype.setFunctionReturn = function(e) {
null == e && (e = 0);
this.m_stack.pop();
this.push(e);
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./ScriptDefine": "ScriptDefine"
} ],
Base: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e18fek7ggxFGpgK49Byuo0y", "Base");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../engine/Manager"), r = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.addTouchEventListener = function(e, n) {
var o = this, i = function() {
var i;
(i = e instanceof cc.Component ? e.node : e).on(cc.Node.EventType.TOUCH_START, function(r) {
o.isInteractable(i) && n(e, t.TouchEventType.began, r);
}, r, !0);
i.on(cc.Node.EventType.TOUCH_MOVE, function(r) {
o.isInteractable(i) && n(e, t.TouchEventType.moved, r);
});
i.on(cc.Node.EventType.TOUCH_END, function(r) {
o.isInteractable(i) && n(e, t.TouchEventType.ended, r);
});
i.on(cc.Node.EventType.TOUCH_CANCEL, function(r) {
o.isInteractable(i) && n(e, t.TouchEventType.canceled, r);
});
}, r = this;
i();
};
t.prototype.isInteractable = function(e) {
var t = e.getComponent(cc.Button);
if (t) return t.interactable;
var n = e.touchEnabled;
return void 0 == n || 0 != n;
};
t.prototype.setNodeVisible = function(e, t) {
for (var n = 0; n < e.length; n++) e[n].active = t == n;
};
t.prototype.setButtonDisabled = function(e, t) {
for (var n = 0; n < e.length; n++) e[n].interactable = t != n;
};
t.prototype.seekAd = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = null);
i.getManager().seekAd(this, e, t, n);
};
t.TouchEventType = {
began: 0,
moved: 1,
ended: 2,
canceled: 3
};
return t;
}(cc.Component);
n.default = r;
cc._RF.pop();
}, {
"../engine/Manager": "Manager"
} ],
BighornTcpAgent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d5463liyL9DDY98snbNFZNn", "BighornTcpAgent");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../engine/Net/TcpClient"), r = e("../engine/Manager"), a = e("../engine/script/ScriptDefine"), s = e("./ScriptManager"), c = e("./Instance"), l = e("../engine/Utils/JSEvent"), u = function(e) {
o(t, e);
function t() {
var t = e.call(this) || this;
t.m_manager = r.getManager();
t.m_state = !0;
t.m_manager.addEventListener("HORN_TCP_LOGIN_SUCC", t, t._onLoginSucc.bind(t));
t.m_manager.addEventListener("HORN_TCP_LOGIN_FAIL", t, t._onLoginFail.bind(t));
return t;
}
t.prototype.releaseSelf = function() {
e.prototype.releaseSelf.call(this);
this.close();
l.default.getInstance().removeEventListenerByTarget(this);
};
t.prototype.onScriptOver = function() {
this.m_tcpManager = null;
};
t.prototype.reconnect = function() {
this.m_tcpManager = new s.default(this, this.m_manager.getHandyScript(c.default.JSON_BIGHORN));
this.m_tcpManager.setName("hornTcp");
};
t.prototype.callExFunc = function(e, n, o) {
var i = a.RETURN.RETURN_NORMAL;
if ("xConnect" == e) this.connect(); else if ("isConnect" == e) o.push(this.isConnect()); else {
if ("getTcpMsg" == e) {
o.push(this.next());
return a.RETURN.RETURN_BREAK_THIS_FRAME;
}
if ("xLogin" == e) {
var r = this.m_manager.m_userData, s = {
cmd: t.HORN_TCP.REQ_LOGIN,
uid: Number(r.id),
skey: r.skey,
app_id: this.m_manager.getMetaInt("app_id")
};
this.send_data(s);
} else if ("xType" == e) {
o.push(typeof n[0]);
i = a.RETURN.RETURN_NORMAL;
} else if ("xDispatchEvent" == e) {
this.m_manager.dispatchEvent(n[0], n[1]);
i = a.RETURN.RETURN_NORMAL;
} else if ("xCloseTcp" == e) {
this.close();
i = a.RETURN.RETURN_NORMAL;
} else i = a.RETURN.RETURN_NO_EXECUTE;
}
return i;
};
t.prototype._onLoginSucc = function() {
this.setGameingState(!0);
};
t.prototype._onLoginFail = function() {
this.setGameingState(!1);
this.m_manager.createTime(this.reconnect.bind(this), 10, !0);
};
t.prototype.onOpen = function() {
this.setResult(0);
};
t.prototype.setResult = function(e) {
if (this.m_tcpManager && this.m_tcpManager.isWait()) {
this.m_tcpManager.setFunctionResult(e);
this.m_tcpManager.changeWaitCount(!1);
}
};
t.prototype.onMsg = function(e) {
e.cmd == t.HORN_TCP.RES_LOGIN_SUCC ? this._onLoginSucc() : e.cmd == t.HORN_TCP.RES_LOGIN_FAIL ? this._onLoginFail() : 1 == e.cmd || 1 == e.type && this.m_manager.dispatchEvent("BigHorn_CHAT", e);
return !0;
};
t.prototype.onError = function() {
this._disconnect(2);
};
t.prototype.onClose = function() {
this._disconnect(2);
};
t.prototype._disconnect = function(e) {
this.m_tcpManager ? this.setResult(e) : this.reconnect();
};
t.prototype.send_data = function(e) {
this._send(e);
};
t.HORN_TCP = {
REQ_LOGIN: 1001,
RES_LOGIN_SUCC: 4001,
RES_LOGIN_FAIL: 4002,
RES_MSG: 4006
};
return t;
}(i.default);
n.default = u;
cc._RF.pop();
}, {
"../engine/Manager": "Manager",
"../engine/Net/TcpClient": "TcpClient",
"../engine/Utils/JSEvent": "JSEvent",
"../engine/script/ScriptDefine": "ScriptDefine",
"./Instance": "Instance",
"./ScriptManager": "ScriptManager"
} ],
BindPhoneLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7e9747fIIFBbIQP4PCX5492", "BindPhoneLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../engine/Utils/UserDefault"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_bg_phone = null;
t.m_phoneNum = "";
t.m_okBtn = null;
t.m_yzmInput = "";
t.yqmtime = 0;
t.m_callBack = null;
return t;
}
t.prototype._clip = function(e) {
var t = "ttzc_invitecode_";
return -1 != e.indexOf(t) ? e.substring(t.length) : "";
};
t.prototype.onCreate = function(e) {
var t = this;
this.m_callBack = e.func;
var n = this.seekNodeByName("bg_phoneBD/btn_close");
this.addTouchEventListener(n, function(e, n) {
if (2 == n) {
t.m_callBack && t.m_callBack(0);
t.removeFromParent();
}
});
this.m_bg_phone = this.seekCompByName(cc.Sprite, "bg_phoneBD");
var o = new cc.Component.EventHandler();
o.target = this.node;
o.component = "BindPhoneLayer";
o.handler = "editingDidEnded";
var i = this.seekCompByName(cc.EditBox, "bg_phoneBD/bg_1/editbox");
i.string = a.default.getInstance().getStringForKey("iphone_code", "");
i.editingDidEnded.push(o);
var r = new cc.Component.EventHandler();
r.target = this.node;
r.component = "BindPhoneLayer";
r.handler = "inputEnding";
this.seekCompByName(cc.EditBox, "bg_phoneBD/bg_2/editbox").editingDidEnded.push(r);
var s = this.seekCompByName(cc.Button, "bg_phoneBD/bg_2/button1");
this.button_verification = s;
this.addTouchEventListener(s, function(e, n) {
2 == n && (11 == t.m_phoneNum.length ? t.sendUrl({
action: "Sms",
param: JSON.stringify({
phone: t.m_phoneNum
})
}, t.onSmsResulet.bind(t)) : t.cmdToast("请输入正确的电话号码"));
});
this.m_okBtn = this.seekCompByName(cc.Button, "bg_phoneBD/button_confirm");
this.m_okBtn.interactable = !1;
this.addTouchEventListener(this.m_okBtn, function(e, n) {
2 == n && ("" != t.m_yzmInput ? t.sendUrl({
action: "BindPhone",
param: JSON.stringify({
phone: t.m_phoneNum,
yzm: t.m_yzmInput
})
}, t.onBindResult.bind(t), {
loading: !0
}) : t.cmdToast("请输入验证码"));
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.onBindResult = function(e) {
if (this.m_callBack) {
this.m_callBack(1);
this.removeFromParent();
}
};
t.prototype.onSmsResulet = function(e) {
this.button_verification.interactable = !1;
this.yqmlabel = this.seekCompByName(cc.Label, "label", this.button_verification.node);
this.yqmlabel.string = "60S";
this.yqmtime = 60;
this.ymqhandler = this.createTime(this.setText.bind(this), 1);
};
t.prototype.setText = function() {
if (this.yqmtime <= 0) {
this.button_verification.interactable = !0;
this.yqmlabel.string = "获取验证码";
if (this.ymqhandler) {
this.removeTime(this.ymqhandler);
this.ymqhandler = null;
}
} else {
this.yqmtime--;
this.yqmlabel.string = this.yqmtime + "S";
}
};
t.prototype.editingDidEnded = function(e) {
this.m_phoneNum = e.string;
11 == e.string.length && a.default.getInstance().setStringForKey("iphone_code", e.string);
};
t.prototype.inputEnding = function(e) {
this.m_yzmInput = e.string;
11 == this.m_phoneNum.length && "" != this.m_yzmInput && (this.m_okBtn.interactable = !0);
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../engine/Utils/UserDefault": "UserDefault"
} ],
CashOutHistoryLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d0cdcnodR1C6oJ2t+YYJ4O6", "CashOutHistoryLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
return t;
}
n = t;
t.prototype.onCreate = function() {
var e = this, t = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(t, function(t, n) {
2 == n && e.removeFromParent();
});
this.sendUrl({
action: "CashList",
param: JSON.stringify({})
}, this.getCashList.bind(this), {
loading: !0
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.getCashList = function(e) {
var t = this, o = this.seekNodeByName("bg_1/scrollview/view/content");
this.m_content = o;
var i, r = e.cashlist;
this.fastInitList(r, 30, function(e) {
var o = Number(e.id);
(i = cc.instantiate(t.m_item)).name = String(o);
i.parent = t.m_content;
t.seekCompByName(cc.Label, "label_time", i).string = e.create_time;
t.seekCompByName(cc.Label, "label_momey", i).string = e.amount + "元";
var r = t.seekCompByName(cc.Label, "label_type", i);
r.string = e.status_name;
var a = t.seekCompByName(cc.Button, "img_help", i);
a.node.active = !1;
if (e.remark) {
a.node.active = !0;
r._forceUpdateRenderData(!0);
a.node.x = r.node.x + r.node.width + 50;
t.addTouchEventListener(a, function() {
t.addLayer(n.LAYER.CashOutHistoryTipLayer, e.remark);
});
}
t.m_content.getComponent(cc.Layout).updateLayout();
});
};
var n;
t.LAYER = {
CashOutHistoryTipLayer: [ 1, "scene/Common/CashOutHistoryTipLayer" ]
};
i([ c(cc.Prefab) ], t.prototype, "m_item", void 0);
return t = n = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
CashOutHistoryTipLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5ce0cxRXoND56jO8WVdspBN", "CashOutHistoryTipLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg/button_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
var o = this.seekCompByName(cc.Label, "bg/label");
o.string = e;
o._forceUpdateRenderData(!0);
if (o.node.height > 380) {
o.node.height = 380;
o.overflow = cc.Label.Overflow.SHRINK;
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
CashOutLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fdec5pKP89Mia0PieduJsYY", "CashOutLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = e("../../engine/Manager"), c = cc._decorator, l = c.ccclass, u = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.btttonList = [];
t.m_pos = 1;
t.ownermb = 0;
t.cashlist = {};
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
var o = this.seekNodeByName("bg_1/button_history");
this.addTouchEventListener(o, function(e, t) {
2 == t && s.getManager().getCurScene().addLayer(a.default.LAYER.CashOutHistoryLayer);
});
for (var i = 1; i < 7; i++) {
var r = this.seekNodeByName("bg_1/button_" + i);
this.btttonList[i] = r;
r.active = !1;
this.addTouchEventListener(r, this.onBtnClick.bind(this));
if (1 != i) {
this.btttonList[i].getChildByName("bg_unselected").active = !0;
this.btttonList[i].getChildByName("bg_selected").active = !1;
} else {
r.getChildByName("bg_unselected").active = !1;
r.getChildByName("bg_selected").active = !0;
}
}
var c = this.seekNodeByName("bg_1/button_tixian");
this.addTouchEventListener(c, this.cashOut.bind(this));
this.recvCashDetail(e);
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.getCashDetail = function() {
this.sendUrl({
action: "CashDetail",
param: JSON.stringify({})
}, this.recvCashDetail.bind(this), {
loading: !0
});
};
t.prototype.cashOut = function(e, t) {
if (2 == t) if (this.cashlist[this.m_pos][0] > this.ownermb) this.cmdToast("余额不足"); else {
this.sendUrl({
action: "CashApply",
param: JSON.stringify({
pos: this.m_pos
})
}, this.recvCashOut.bind(this), {
loading: !0
});
this.seekCompByName(cc.Button, "bg_1/button_tixian").interactable = !1;
}
};
t.prototype.recvCashOut = function(e) {
this.seekCompByName(cc.Button, "bg_1/button_tixian").interactable = !0;
if (1 == e.result) {
this.seekCompByName(cc.Label, "bg_1/lab_balance").string = String("￥" + e.ownermb);
this.ownermb = e.ownermb;
this.cmdToast("提现申请已发送");
this.getCashDetail();
} else this.cmdToast("余额不足");
};
t.prototype.recvCashDetail = function(e) {
this.seekCompByName(cc.Label, "bg_1/lab_balance").string = String("￥" + e.ownermb);
this.ownermb = e.ownermb;
for (var t = 1; t < 7; t++) {
this.btttonList[t].active = !1;
if (1 != t) {
this.btttonList[t].getChildByName("bg_unselected").active = !0;
this.btttonList[t].getChildByName("bg_selected").active = !1;
} else {
this.btttonList[t].getChildByName("bg_unselected").active = !1;
this.btttonList[t].getChildByName("bg_selected").active = !0;
}
}
var n = 0;
this.cashlist = e.cashlist;
for (var o in e.cashlist) {
0 == n && (this.m_pos = Number(o));
n++;
this.btttonList[n].active = !0;
this.btttonList[n].name = o;
this.seekCompByName(cc.Label, "lab_str", this.btttonList[n]).string = e.cashlist[o][0] + "元";
this.seekCompByName(cc.Label, "lab_tip", this.btttonList[n]).string = "实际到账" + e.cashlist[o][1] + "元";
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) for (var n = e.name, o = 1; o < 7; o++) if (n != this.btttonList[o].name) {
this.btttonList[o].getChildByName("bg_unselected").active = !0;
this.btttonList[o].getChildByName("bg_selected").active = !1;
} else {
e.getChildByName("bg_unselected").active = !1;
e.getChildByName("bg_selected").active = !0;
this.m_pos = Number(n);
}
};
return t = i([ l ], t);
}(r.default));
n.default = u;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
CommonTipsLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c5e979ANtJC/ZguwreeopQt", "CommonTipsLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_callback = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_callback = e.func;
this.seekCompByName(cc.Label, "bg_1/lable_content").string = e.content;
var n = this.seekNodeByName("bg_1/button_confirm");
this.addTouchEventListener(n, function(e, n) {
if (2 == n) {
t.m_callback && t.m_callback(1);
t.removeFromParent();
}
});
var o = this.seekNodeByName("bg_1/button_cancle");
this.addTouchEventListener(o, function(e, n) {
if (2 == n) {
t.m_callback && t.m_callback(0);
t.removeFromParent();
}
});
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
Download: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3fca2Hu0adIOIS3UKJY2m2Y", "Download");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Manager"), i = function() {
function e() {
this.m_download = jsb.HttpDownloader.getInstance();
this.m_count = 0;
}
e.getInstance = function() {
null == e.m_instance && (e.m_instance = new e());
return e.m_instance;
};
e.prototype.addDownloadRequest = function(e, t, n, o) {
this.m_download.createRequest(e, t, n, o);
this._changeN(1);
};
e.prototype._changeN = function(e) {
this.m_count = this.m_count + e;
1 == this.m_count ? o.getManager().addToProcess(this) : 0 == this.m_count && o.getManager().removeProcess(this);
};
e.prototype.addSubmitRequest = function(e, t, n) {
this.m_download.createSubmitRequest(e, t, n);
this._changeN(1);
};
e.prototype.process = function(e) {
if (!(this.m_count < 1)) for (;;) {
var t = this.m_download.get();
if (t.length < 1) break;
var n = JSON.parse(t), i = !1;
if (n.flag && "over" == n.flag) {
this._changeN(-1);
i = !0;
}
o.getManager().dispatchEvent(n.tag, n, !1, i);
}
};
e.m_instance = null;
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../Manager": "Manager"
} ],
EnemyListLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7b0d6oVUZRHQIvgfn0xPdj9", "EnemyListLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_enemylist_item = null;
t.m_imgbtn = null;
t.allpick_uid = [];
t.m_list = {};
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("img_enemy/button_enemy"), o = this.m_ud.getStringForKey("StealVegetablesPickId", "[]");
this.allpick_uid = JSON.parse(o);
this.addTouchEventListener(n, function(e, n) {
2 == n && t.showUp(!1);
});
this.m_list = e;
this.showUp(!0, e);
};
t.prototype.getState = function(e) {
var t = !1;
for (var n in this.allpick_uid) if (this.allpick_uid.hasOwnProperty(n)) {
if (this.allpick_uid[n] == e) {
t = !0;
break;
}
}
return t;
};
t.prototype.showUp = function(e, t) {
var n = this;
void 0 === t && (t = null);
var o = this.seekNodeByName("img_enemy");
if (e) {
this.node.active = e;
this.seekCompByName(cc.Label, "img_enemy/bg1/gold").string = a.default.glodConverToString(String(t.today_steal_gold));
this.seekCompByName(cc.Label, "img_enemy/Label").node.active = 0 == t.list.length;
var i = this.seekNodeByName("img_enemy/scrollView/view/content");
i.removeAllChildren();
for (var r = function(e) {
var o = cc.instantiate(s.m_enemylist_item);
s.loadByUrl(function(e) {
if (!e.err) {
n.seekCompByName(cc.Sprite, "img_head", o).spriteFrame = new cc.SpriteFrame(e.ret);
}
}, t.list[e].avatar, "png");
var r = "今日" == t.list[e].tag || "昨日" == t.list[e].tag ? "" : a.default.date_format("MM月dd日", t.list[e].create_time);
s.seekCompByName(cc.Label, "name", o).string = t.list[e].name;
s.seekCompByName(cc.RichText, "info", o).string = "<color=#000000>" + r + a.default.date_format("HH:mm", t.list[e].create_time) + "偷走您<color=#E76626>" + a.default.glodConverToString(String(t.list[e].gold)) + "金币</color>";
s.seekCompByName(cc.Sprite, "img_head/img_today", o).node.active = "今日" == t.list[e].tag;
s.seekCompByName(cc.Sprite, "img_head/img_yestoday", o).node.active = "昨日" == t.list[e].tag;
var c = s.seekCompByName(cc.Button, "button1", o);
c.node.name = String(e);
if (s.getState(t.list[e].farm_player_id)) {
c.node.children[0].getComponent(cc.Sprite).spriteFrame = s.m_imgbtn;
c.interactable = !1;
}
s.addTouchEventListener(c, s.onRevengeClick.bind(s));
o.parent = i;
}, s = this, c = 0; c < t.list.length; c++) r(c);
this.seekCompByName(cc.ScrollView, "img_enemy/scrollView").scrollToTop();
var l = cc.moveBy(.5, cc.v2(o.width - 10, 0));
o.runAction(l);
} else {
var u = cc.callFunc(function() {
n.node.active = e;
});
l = cc.moveBy(.5, cc.v2(10 - o.width, 0));
o.runAction(cc.sequence(l, u));
}
};
t.prototype.onRevengeClick = function(e, t) {
var n = this;
if (2 == t) {
var o = Number(e.node.name), i = this.m_list.list[o].pick_id, r = this.m_list.list[o].farm_player_id;
this.sendUrl({
action: "StealFarm",
param: JSON.stringify({
pick_id: i
})
}, function(e) {
if (1 != e.status) n.cmdToast(e.title); else {
e.farm_player_id = r;
n.addLayer(a.default.LAYER.StealVegetables, e);
}
n.removeFromParent();
}, {
loading: !0
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ l(cc.Prefab) ], t.prototype, "m_enemylist_item", void 0);
i([ l(cc.SpriteFrame) ], t.prototype, "m_imgbtn", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
FreeSaveOrUpLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "db20afob8VLnaM5sJirOWsc", "FreeSaveOrUpLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.allsp = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekCompByName(cc.Sprite, "tip"), o = this.seekCompByName(cc.Label, "tip/bg/label"), i = this.seekNodeByName("img_7"), r = this.seekNodeByName("node1"), a = this.seekNodeByName("node2"), s = this.seekNodeByName("btn1");
this.addTouchEventListener(s, function(e, n) {
2 == n && t.func(1, t);
});
var c = this.seekNodeByName("btn2");
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
t.func(0, t);
t.removeFromParent();
}
});
this.func = e.func;
var l = this.seekCompByName(cc.Label, "bg/name", r), u = this.seekNodeByName("veg", r);
u.removeComponent(cc.Sprite);
var m = u.addComponent(sp.Skeleton), p = e.veg[0];
this.setName(l, p);
this.playAnimationVegetables(m, p);
if (1 == e.type) {
n.spriteFrame = this.allsp[0];
o.string = "保留一颗合成蔬菜";
s.getComponent(cc.Sprite).spriteFrame = this.allsp[2];
c.getComponent(cc.Sprite).spriteFrame = this.allsp[5];
i.active = !1;
a.active = !1;
r.getComponent(cc.Widget).horizontalCenter = 0;
} else if (2 == e.type) {
n.spriteFrame = this.allsp[1];
o.string = "马上升级为高级蔬菜";
s.getComponent(cc.Sprite).spriteFrame = this.allsp[3];
c.getComponent(cc.Sprite).spriteFrame = this.allsp[4];
var h = this.seekCompByName(cc.Label, "bg/name", a), _ = this.seekNodeByName("veg", a);
_.removeComponent(cc.Sprite);
var d = _.addComponent(sp.Skeleton), f = e.veg[1];
this.setName(h, f);
this.playAnimationVegetables(d, f);
}
};
t.prototype.setName = function(e, t) {
e.string = t >= 38 ? this.m_manager.m_shopInfo[t - 1].name : "Lv." + t + " " + this.m_manager.m_shopInfo[t - 1].name;
};
t.prototype.playAnimationVegetables = function(e, t) {
var n = this.m_scene.m_animes[t - 1];
e.skeletonData = n;
e.premultipliedAlpha = !1;
var o = n._skeletonJson.animations;
if (t >= 41 && t <= 45) {
var i = "baoshu" + String([ 2, 4, 1, 5, 3 ][t - 41]);
e.setAnimation(0, i, !0);
} else for (var i in o) {
e.setAnimation(0, i, !0);
break;
}
(38 == t || 39 == t || t >= 41 && t <= 45) && (e.node.y = 20);
};
i([ c(cc.SpriteFrame) ], t.prototype, "allsp", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
GonglveLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9d990FBmRNHaIMRQMhh3XXE", "GonglveLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.m_imgs = [];
t.m_titles = [];
t.m_effect = [];
t.m_method = [];
t.m_btnTitles = [];
t.m_scrollview = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.node.width = cc.winSize.width;
this.node.height = cc.winSize.height;
this.m_effect = [ "可参与每天全服广告收益<color=#de2f22>40%</color>分红。", "回收后<color=#de2f22>100%</color>获得<color=#de2f22>5~50</color>元现金红包。", "收集玫瑰花(红)和玫瑰花(蓝),合成后\n<color=#de2f22>100%</color>获得<color=#de2f22>52</color>元现金红包。", "集齐金木水火土五个摇钱树,合成后\n<color=#de2f22>100%</color>获得分红财神。" ];
this.m_method = [ "1.两个37级蔬菜合成有概率获得。\n2.五行摇钱树合成100%获得。", "1.两个37级蔬菜合成有概率获得。\n2.回收后可领取红包。", "1.两个37级蔬菜合成有概率获得。\n2.玫瑰合体，红包到手。", "1.两个37级蔬菜合成有概率获得。\n2.五行合一，召唤分红财神。" ];
for (var n = 1; n <= 3; n++) {
var o = this.seekCompByName(cc.Button, "bg_2/button" + n);
o.node.name = String(n);
this.addTouchEventListener(o, this.onBtnClick.bind(this));
this.m_btnTitles.push(o.node);
var i = this.seekCompByName(cc.ScrollView, "bg_2/gonglve_" + n);
this.m_scrollview.push(i.node);
}
var r = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(r, function(e, n) {
if (2 == n) {
t.dispatchEvent("close_smlayer");
t.removeFromParent();
}
});
this.createGonglveList();
this.setNodeVisible(this.m_scrollview, 0);
};
t.prototype.onBack = function() {
this.dispatchEvent("close_smlayer");
this.removeFromParent();
return !0;
};
t.prototype.createGonglveList = function() {
var e = this.seekNodeByName("view/content", this.m_scrollview[2]);
e.removeAllChildren();
for (var t = 0; t < this.m_imgs.length; t++) {
var n = cc.instantiate(this.m_item);
this.seekCompByName(cc.Sprite, "img_3", n).spriteFrame = this.m_imgs[t];
this.seekCompByName(cc.Sprite, "title", n).spriteFrame = this.m_titles[t];
var o = this.seekCompByName(cc.RichText, "label_effect", n), i = this.seekCompByName(cc.RichText, "label_method", n), r = this.seekNodeByName("title_method", n);
if (0 == t) {
o.string = this.m_effect[0];
i.string = this.m_method[0];
i.node.y += 30;
r.y += 30;
} else if (1 == t) {
o.string = this.m_effect[1];
i.string = this.m_method[1];
i.node.y += 30;
r.y += 30;
} else if (2 == t || 3 == t) {
o.string = this.m_effect[2];
i.string = this.m_method[2];
} else {
o.string = this.m_effect[3];
i.string = this.m_method[3];
}
n.parent = e;
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
for (var n = Number(e.node.name), o = 0, i = this.m_btnTitles; o < i.length; o++) {
var r = i[o], a = this.seekNodeByName("Background1", r), s = this.seekNodeByName("Background2", r), c = Number(r.name) == n;
a.active = c;
s.active = !c;
}
this.setNodeVisible(this.m_scrollview, n - 1);
}
};
i([ c(cc.Prefab) ], t.prototype, "m_item", void 0);
i([ c(cc.SpriteFrame) ], t.prototype, "m_imgs", void 0);
i([ c(cc.SpriteFrame) ], t.prototype, "m_titles", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
GuideLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "11280fGRcRJmJRkqWdWaQ3d", "GuideLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.speed = 3;
t.noticeInfo = "";
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_manager.noticeInfo.length > 0 && (this.noticeInfo = this.m_manager.noticeInfo);
this.m_data = e;
this.Node_3 = this.seekNodeByName("Node_3");
this.Node_2 = this.seekNodeByName("Node_2");
this.Node_4 = this.seekNodeByName("Node_4");
this.Node_2.active = !1;
this.handAni = this.node.getComponent(cc.Animation);
var n = this.seekCompByName(cc.Sprite, "img_bg"), o = this.seekNodeByName("Button_close");
this.addTouchEventListener(o, function(e, n) {
2 == n && t.removeFromParent();
});
this.material = n.getMaterial(0);
this.bg = n;
this.time = 0;
this.IsAdd = !0;
this.curIndex = 0;
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0);
this.setAniIndex(0);
this.addEventListener("onBuySuccess", this.onDosuccess.bind(this));
this.addEventListener("Sell_success", this.onDosuccess.bind(this));
this.addEventListener("redget_success", this.onDosuccess.bind(this));
this.addEventListener("close_smlayer", this.onDosuccess.bind(this));
this.addEventListener("HTTP_CALLBACK", function(e) {
-1 != e.__URL__.indexOf("action=Merge") && t.onDosuccess();
});
};
t.prototype.onDosuccess = function() {
if (3 == this.curIndex) {
var e = this.m_scene.m_hallLayer.getDescVegetTablePos();
this.m_data[4][0].pos = cc.v2(e.x, e.y);
this.m_data[4][0].handpos = cc.v2(e.x + 30, e.y);
}
this.nextIndex();
};
t.prototype.setAniIndex = function(e) {
var t = this, n = this.m_data[e];
this.curIndex = e;
var o = 0, i = 0, r = n.length, s = 2, c = cc.v2(0, 0), l = [ 0, 0 ], u = [ 0, 0 ], m = [ 10, 10 ], p = [ cc.v2(0, 0), cc.v2(0, 0) ], h = [ 0, 0 ], _ = [ 2, 2 ], d = this.seekNodeByName("img1", this.Node_4), f = this.seekNodeByName("img2", this.Node_4);
d.active = !1;
f.active = !1;
var y = this.seekNodeByName("hand", this.Node_3);
y.active = !1;
this.bg.node.opacity = 6 == e ? 0 : 255;
if (0 == e || 1 == e || 3 == e) {
this.Node_3.setPosition(n[0].handpos.x, n[0].handpos.y);
this.Node_2.active = !0;
this.Node_2.setPosition(n[0].handpos.x - 75, n[0].handpos.y + 75);
var g = cc.v2(n[0].pos.x, n[0].pos.y + n[0].size.height / 2 + 50);
this.Node_4.setPosition(g);
d.active = !0;
var v = 1 == e ? "再次点击按钮购买一个蔬菜" : "点击按钮购买一个蔬菜";
(N = this.seekCompByName(cc.Label, "label", d)).string = v;
N._forceUpdateRenderData(!0);
d.width = N.node.width + 50;
y.active = !1;
this.seekNodeByName("Node_1", this.Node_3).active = !0;
this.handAni.play("hand");
this.Node_3.stopAllActions();
} else if (2 == e) {
this.Node_2.active = !1;
this.Node_4.setPosition(n[0].pos.x, n[0].pos.y + n[0].size.height / 2 + 50);
d.active = !0;
(N = this.seekCompByName(cc.Label, "label", d)).string = "拖动到一起合成一个新植物";
N._forceUpdateRenderData(!0);
d.width = N.node.width + 50;
this.handAni.stop();
this.seekNodeByName("Node_1", this.Node_3).active = !1;
y.active = !0;
this.Node_3.stopAllActions();
var b = cc.sequence(cc.callFunc(function() {
t.Node_3.setPosition(n[0].handpos[0]);
}), cc.delayTime(.5), cc.moveTo(1, n[0].handpos[1]));
this.Node_3.stopAllActions();
this.Node_3.runAction(cc.repeatForever(b));
} else if (4 == e) {
this.Node_2.active = !1;
(g = cc.v2(n[0].pos.x, n[0].pos.y + n[0].range + 50)).x < 280 && (g.x += 200);
this.Node_4.setPosition(g);
d.active = !0;
(N = this.seekCompByName(cc.Label, "label", d)).string = "拖动到下方按钮处回收蔬菜";
N._forceUpdateRenderData(!0);
d.width = N.node.width + 50;
this.handAni.stop();
this.seekNodeByName("Node_1", this.Node_3).active = !1;
y.active = !0;
b = cc.sequence(cc.callFunc(function() {
t.Node_3.setPosition(n[0].handpos);
}), cc.delayTime(.5), cc.moveTo(1, n[1].handpos), cc.delayTime(.5));
this.Node_3.stopAllActions();
this.Node_3.runAction(cc.repeatForever(b));
} else if (5 == e) {
this.Node_3.stopAllActions();
this.Node_3.setPosition(n[0].handpos.x - 30, n[0].handpos.y);
y.active = !1;
this.seekNodeByName("Node_1", this.Node_3).active = !0;
this.handAni.play("hand");
f.active = !0;
this.Node_4.setPosition(n[0].pos.x - 70, n[0].pos.y - 70);
} else if (6 == e) {
this.Node_2.active = !1;
this.Node_3.setPosition(-1e3, 0);
this.Node_3.stopAllActions();
d.active = !0;
var N;
(N = this.seekCompByName(cc.Label, "label", d)).string = "你已经全部学会了，送你一个现金红包";
N._forceUpdateRenderData(!0);
d.width = N.node.width + 50;
this.Node_4.setPosition(n[0].size.width / 2, n[0].size.height / 2 + 300);
} else if (7 == e) {
this.Node_2.active = !1;
this.Node_3.setPosition(-1e3, 0);
this.Node_3.stopAllActions();
this.addLayer(a.default.LAYER.RedPackageLayer);
this.Node_4.setPosition(-3e3, 0);
} else if (8 == e) {
this.Node_3.setPosition(n[0].handpos.x, n[0].handpos.y);
y.active = !1;
this.seekNodeByName("Node_1", this.Node_3).active = !0;
this.handAni.play("hand");
var L = cc.instantiate(d), R = this.seekCompByName(cc.Label, "label", L);
L.parent = d.parent;
var E = d.getPosition();
R.node.parent = d.parent;
L.setPosition(E);
R.node.setPosition(E);
R.string = "点击进入钱包,红包可以提现哦";
L.active = !0;
L.scaleY = -1;
R._forceUpdateRenderData(!0);
L.width = R.node.width + 50;
this.Node_4.setPosition(n[0].pos.x, n[0].pos.y - 200);
}
for (var T = 0; T < r; T++) {
var k = n[T];
s = k.type || 2;
c = k.pos;
if (1 == s) {
k.range = k.range || 200;
o = k.range;
} else {
k.size = k.size || {
width: 128,
height: 256
};
o = k.size.width / 2;
i = k.size.height / 2;
}
k.width = o;
k.height = i;
k.w = 10;
l[T] = o;
u[T] = i;
m[T] = 10;
p[T] = c;
h[T] = k.show;
_[T] = s;
}
for (T = 1; T < 3; T++) {
this.material.setProperty("u_Width" + T, l[T - 1]);
this.material.setProperty("u_Height" + T, u[T - 1]);
this.material.setProperty("u_Pos" + T, [ p[T - 1].x, p[T - 1].y ]);
this.material.setProperty("u_lightW" + T, m[T - 1]);
this.material.setProperty("u_type" + T, _[T - 1]);
this.material.setProperty("u_show" + T, h[T - 1]);
}
this.material.setProperty("u_num", r);
this.bg.setMaterial(0, this.material);
};
t.prototype.onBack = function() {
return !0;
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
this.m_ud.setIntegerForKey("GUIDE_IDX", 2);
this.removeFromParent();
}
};
t.prototype.isOnTouch = function(e) {
for (var t = this.m_data[this.curIndex].length, n = this.m_data[this.curIndex], o = this.time, i = 0, r = 0; r < t; r++) {
var a = n[r].pos, s = n[r].type, c = n[r].width, l = n[r].w, u = n[r].height, m = Math.abs(e.x - a.x), p = Math.abs(e.y - a.y), h = n[r].show;
if (2 == s) {
if (m < c + o * l && p < u + l * o && 1 == h) {
i = r + 1;
break;
}
} else {
if (Math.sqrt(m * m + p * p) < c + o * l && 1 == h) {
i = r + 1;
break;
}
}
}
return i;
};
t.prototype.onTouchBegan = function(e) {
var t = e.touch.getLocation(), n = this.isOnTouch(t);
if (6 == this.curIndex || 7 == this.curIndex) {
n = 0;
this.nextIndex();
}
n > 0 ? 4 == this.curIndex && 2 == n ? this.node._touchListener.setSwallowTouches(!0) : this.node._touchListener.setSwallowTouches(!1) : this.node._touchListener.setSwallowTouches(!0);
};
t.prototype.onTouchMove = function(e) {
e.touch.getLocation();
};
t.prototype.onTouchEnd = function(e) {
var t = e.touch.getLocation(), n = this.isOnTouch(t);
8 == this.curIndex && n && this.nextIndex();
n > 0 || e.setLocation(-1, -1);
};
t.prototype.nextIndex = function() {
if (this.curIndex < 8) this.setAniIndex(this.curIndex + 1); else {
this.noticeInfo.length > 0 && this.addLayer(a.default.LAYER.NOTICE, this.noticeInfo);
this.removeFromParent();
}
};
t.prototype.update = function(e) {
this.material.setProperty("u_time", this.time);
this.bg.setMaterial(0, this.material);
this.IsAdd ? this.time += e * this.speed : this.time -= e * this.speed;
this.time > 1 ? this.IsAdd = !1 : this.time < -1 && (this.IsAdd = !0);
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
GuideQuickenLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ccdbaNmZqxIw44rwXAz5rPS", "GuideQuickenLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.speed = 3;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_data = e;
this.Node_3 = this.seekNodeByName("Node_3");
this.Node_2 = this.seekNodeByName("Node_2");
this.Node_4 = this.seekNodeByName("Node_4");
this.Node_2.active = !1;
this.handAni = this.node.getComponent(cc.Animation);
var n = this.seekCompByName(cc.Sprite, "img_bg"), o = this.seekCompByName(cc.Sprite, "bg_2"), i = this.seekCompByName(cc.RichText, "lable_info", o.node);
i.string = i.string.replace("%d", String(this.m_manager.m_userData.video_num));
var r = this.seekNodeByName("Button_close");
this.addTouchEventListener(r, function(e, n) {
2 == n && t.removeFromParent();
});
this.material = n.getMaterial(0);
this.bg = n;
o.node.active = !1;
this.bg2 = o;
this.time = 0;
this.IsAdd = !0;
this.curIndex = 0;
this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0);
this.setAniIndex(0);
};
t.prototype.onDosuccess = function() {
if (3 == this.curIndex) {
var e = this.m_scene.m_hallLayer.getDescVegetTablePos();
this.m_data[4][0].pos = cc.v2(e.x, e.y);
this.m_data[4][0].handpos = cc.v2(e.x + 30, e.y);
}
this.nextIndex();
};
t.prototype.setAniIndex = function(e) {
var t = this.m_data[e];
this.curIndex = e;
var n = 0, o = 0, i = t.length, r = 2, a = cc.v2(0, 0), s = [ 0, 0 ], c = [ 0, 0 ], l = [ 10, 10 ], u = [ cc.v2(0, 0), cc.v2(0, 0) ], m = [ 0, 0 ], p = [ 2, 2 ], h = this.seekNodeByName("hand", this.Node_3), _ = this.seekNodeByName("img2", this.Node_4), d = this.seekNodeByName("img1", this.Node_4), f = this.seekNodeByName("label", this.Node_4);
h.active = !1;
if (0 == e) {
this.Node_3.setPosition(t[0].handpos.x, t[0].handpos.y);
this.Node_2.active = !0;
this.Node_2.setPosition(t[0].handpos.x - 75, t[0].handpos.y + 75);
var y = cc.v2(t[0].pos.x - 180, t[0].pos.y);
this.Node_4.setPosition(y);
h.active = !1;
this.seekNodeByName("Node_1", this.Node_3).active = !0;
this.handAni.play("hand");
this.Node_3.stopAllActions();
_.active = !1;
this.Node_3.setPosition(t[0].handpos.x, t[0].handpos.y);
h.active = !1;
this.seekNodeByName("Node_1", this.Node_3).active = !0;
this.handAni.play("hand");
} else if (1 == e) {
d.active = !1;
f.active = !1;
_.active = !0;
var g = this.seekNodeByName("btn_speed", this.bg2.node), v = g.convertToWorldSpaceAR(cc.v2(0, 0)), b = g.getContentSize(), N = cc.v2(v.x + 80, v.y - 40);
this.Node_2.setPosition(N.x - 75, N.y + 75);
this.m_data[e][0].pos = v;
this.m_data[e][0].size = b;
this.m_data[e][0].show = 1;
this.m_data[e][0].handpos = N;
this.Node_3.setPosition(N.x, N.y);
this.Node_2.active = !0;
var L = this.bg2.node.y + this.bg2.node.height / 2 + 20;
this.Node_4.setPosition(cc.winSize.width / 2, L);
}
for (var R = 0; R < i; R++) {
var E = t[R];
r = E.type || 2;
a = E.pos;
if (1 == r) {
E.range = E.range || 200;
n = E.range;
} else {
E.size = E.size || {
width: 128,
height: 256
};
n = E.size.width / 2;
o = E.size.height / 2;
}
E.width = n;
E.height = o;
E.w = 10;
s[R] = n;
c[R] = o;
l[R] = 10;
u[R] = a;
m[R] = E.show;
p[R] = r;
}
for (R = 1; R < 3; R++) {
this.material.setProperty("u_Width" + R, s[R - 1]);
this.material.setProperty("u_Height" + R, c[R - 1]);
this.material.setProperty("u_Pos" + R, [ u[R - 1].x, u[R - 1].y ]);
this.material.setProperty("u_lightW" + R, l[R - 1]);
this.material.setProperty("u_type" + R, p[R - 1]);
this.material.setProperty("u_show" + R, m[R - 1]);
}
this.material.setProperty("u_num", i);
this.bg.setMaterial(0, this.material);
};
t.prototype.isOnTouch = function(e) {
for (var t = this.m_data[this.curIndex].length, n = this.m_data[this.curIndex], o = this.time, i = !1, r = 0; r < t; r++) {
var a = n[r].pos, s = n[r].type, c = n[r].width, l = n[r].w, u = n[r].height, m = Math.abs(e.x - a.x), p = Math.abs(e.y - a.y), h = n[r].show;
if (2 == s) {
if (m < c + o * l && p < u + l * o && 1 == h) {
i = !0;
break;
}
} else {
if (Math.sqrt(m * m + p * p) < c + o * l && 1 == h) {
i = !0;
break;
}
}
}
return i;
};
t.prototype.onTouchBegan = function(e) {
var t = e.touch.getLocation();
this.isOnTouch(t);
this.node._touchListener.setSwallowTouches(!0);
};
t.prototype.onTouchMove = function(e) {
e.touch.getLocation();
};
t.prototype.onTouchEnd = function(e) {
var t = this, n = e.touch.getLocation();
if (this.isOnTouch(n)) if (0 == this.curIndex) {
this.bg2.node.active = !0;
this.nextIndex();
} else if (1 == this.curIndex) {
this.dispatchEvent("StartSpeed", 300);
this.sendUrl({
action: "FirstSpeed",
total: 0
}, function(e) {
t.m_manager.m_userData.speed_total++;
t.m_manager.RefreshTheTask(a.default.TASK_TYPE.SPPED_UP);
t.nextIndex();
});
}
};
t.prototype.onBack = function() {
return !0;
};
t.prototype.nextIndex = function() {
this.curIndex < 1 ? this.setAniIndex(this.curIndex + 1) : this.removeFromParent();
};
t.prototype.update = function(e) {
this.material.setProperty("u_time", this.time);
this.bg.setMaterial(0, this.material);
this.IsAdd ? this.time += e * this.speed : this.time -= e * this.speed;
this.time > 1 ? this.IsAdd = !1 : this.time < -1 && (this.IsAdd = !0);
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
HallLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4bb47F8DYFDlaPnv5BnIT4Y", "HallLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r, a = e("../../engine/UILayer"), s = e("../../game/Instance"), c = e("../Common/Popup/TipsLayer"), l = e("../Common/ADLayer"), u = e("../../engine/Utils/UserDefault"), m = e("../../engine/UIBase"), p = e("../../engine/Manager"), h = cc._decorator, _ = h.ccclass, d = h.property;
(function(e) {
e[e.BTN_FAST_BUY = 0] = "BTN_FAST_BUY";
e[e.BTN_FREE_GET_GOLD = 1] = "BTN_FREE_GET_GOLD";
e[e.BTN_RECYCLING = 2] = "BTN_RECYCLING";
})(r || (r = {}));
var f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_lastBuypos = 1;
t.kscnimg = null;
t.m_caidis = null;
t.m_drag_vegetables = null;
t.m_drag_vegetables2 = null;
t.m_vegetables_model = null;
t.m_duration = 5;
t.m_isMoving = !1;
t.m_bottom_btns = [];
t.m_curState = -1;
t.m_second = 0;
t.m_handler_addSpeed = null;
t.m_anime_merge = null;
t.m_btn_js = null;
t.m_anime_js = null;
t.dog = null;
t.dog_duration = 700;
t.dog_runTime = 0;
t.dog_distance = -.6;
t.m_btnMoneyTree = [];
t.m_Panel_cancel = null;
t.m_spriteFrameLvBg = null;
t.m_lastAddMoneyTime = -1;
return t;
}
n = t;
t.prototype.releaseSelf = function() {};
t.prototype.onCreate = function(e) {
var t = this;
this.m_Panel_cancel = this.seekNodeByName("Panel_cancel");
this._enabledVegatables(!0);
var o = this.seekNodeByName("panel1");
this.addTouchEventListener(o, function(e, o) {
2 == o && t.addLayer(n.LAYER.TouchTreeTips);
});
this.m_gold_label = this.seekCompByName(cc.Label, "bg_7/label1");
this.m_caidis = [];
for (var i = 1; i <= 12; i++) {
var a = this.seekCompByName(cc.Sprite, "caidi_" + i);
this.m_caidis.push(a);
}
this.m_drag_vegetables = cc.instantiate(this.m_scene.m_vegetables);
this.m_drag_vegetables.active = !1;
this.m_drag_vegetables.parent = this.node;
this.setVegetablesItemVisible(this.m_drag_vegetables, !1, !0);
var u = this.seekCompByName(cc.Sprite, "img_6", this.m_drag_vegetables);
this.m_spriteFrameLvBg = u.spriteFrame;
this.m_drag_vegetables2 = cc.instantiate(this.m_scene.m_vegetables);
this.m_drag_vegetables2.active = !1;
this.m_drag_vegetables2.parent = this.node;
this.setVegetablesItemVisible(this.m_drag_vegetables2, !1, !1);
for (var m = [ "head", "bg_5_zp/button_zp", "bg_5_phb/button_phb", "bg_5_xx/button_xx", "button_sm", "bg_5_kefu/button_kefu", "bg_5_rw/button_rw", "button_lq", "button_18ji", "button_sy", "button_tc", "button_js", "button_sd", "button_yq", "button_ksgm", "money/button_ti", "day_earnings/button_ling", "button_lqmfjb" ], p = 0, h = m; p < h.length; p++) {
var _ = h[p], d = this.seekNodeByName(_);
this.addTouchEventListener(d, this.onBtnClick.bind(this));
}
this.seekCompByName(cc.Label, "js_animation/img_timing/time").node.active = !1;
var f = this.seekCompByName(cc.Label, "day_earnings/label");
f.string = this.m_manager.m_userData.yesterday_income + "元";
this.addEventListener("yesterday_income", function() {
f.string = t.m_manager.m_userData.yesterday_income + "元";
});
var y = this.seekNodeByName("bg_5_zp/img_9");
y.active = !1;
var g = this.seekNodeByName("bg_5_rw/img_9");
g.active = !1;
this.seekNodeByName("button_tc/img_9").active = !1;
for (var v = 0, b = m = [ "button_ksgm", "button_lqmfjb", "button_hsjb" ]; v < b.length; v++) {
_ = b[v];
this.m_bottom_btns.push(this.seekNodeByName(_));
}
for (i = 1; i <= 5; i++) {
var N = this.seekCompByName(cc.Button, "panel1/btn_" + i);
this.m_btnMoneyTree.push(N);
}
this.m_vegetables_model = [];
var L = [];
for (i = 0; i < 12; i++) L.push(i);
for (i = 0; i < 12; i++) {
var R = s.default.random(0, L.length - 1);
this.m_vegetables_model.push({
lv: 0,
duration: 1 + .2 * s.default.random(0, 20),
time: new Date().getTime()
});
L.splice(R, 1);
}
this.addEventListener("onBuy", function(e) {
var n = t.seekEmptySpace();
if (0 != n) {
t.m_lastBuypos = n;
var o = t.m_manager.m_shopInfo[e - 1].price;
if (s.default.string_cmp(t.m_manager.m_userData.gold, o) < 0) t.dispatchEvent("GOLD_LACK", null, !0); else {
t._enabledVegatables(!1);
var i = {
total: 0,
sid: e,
pos: n
};
t.sendUrl({
action: "Buy",
param: JSON.stringify(i)
}, function(o) {
t._enabledVegatables(!0);
t.createVegetables(e, n - 1);
t.m_manager.m_shopInfo[e - 1].price = o.price;
t.dispatchEvent("onBuySuccess", o.buyshopid);
t.m_manager.playEffect(t.m_scene.buySuccess_sound);
t.setBuyShopId();
t.refIncome();
o.p && o.p > 0 && t.addLayer(s.default.LAYER.FreeSaveOrUpLayer, {
type: 2,
veg: [ e + 1, e ],
func: function(o, i) {
1 == o && t.seekAd(l.default.TYPE.FREE_UP, {
total: 0
}, function(o) {
if (t.UpVegetables(e + 1, n - 1)) {
i.removeFromParent();
t.cmdToast("升级成功");
t.refIncome();
}
});
}
});
});
}
} else t.cmdToast("菜地已满");
});
this.m_anime_js = this.seekCompByName(sp.Skeleton, "js_animation");
this.m_anime_js.node.active = !1;
this.m_btn_js = this.seekCompByName(cc.Button, "button_js");
this.addEventListener("StartSpeed", this.startTimeingSpeed.bind(this));
this.addEventListener("CanSpeedTask", this.canSpeedLayer.bind(this));
this.addEventListener("HTTP_CALLBACK", function(n) {
do {
if (!n || 200 != n.code) return;
-1 != n.__URL__.indexOf("total") && (t.m_lastAddMoneyTime = 0);
if (!(e = n.data)) break;
e.income && t.setIncome();
var o = 0;
if (e.buyshopid) {
t.setBuyShopId();
o |= 1;
}
0 != o && t.switch_bottom_state(r.BTN_FAST_BUY);
e.level && t.setLevelUp(Number(e.level));
} while (0);
});
this.addEventListener("GOLD_CHANGE", function() {
t.m_gold_label.string = s.default.glodConverToString(t.m_manager.m_userData.gold);
t.m_gold_label.node.stopAllActions();
t.m_gold_label.node.scale = 1;
t.m_gold_label.node.runAction(cc.sequence(cc.scaleTo(.1, 1.2), cc.scaleTo(.1, 1)));
if (!t.m_isMoving) {
t.switch_bottom_state(r.BTN_FAST_BUY);
if (t.m_curState != r.BTN_RECYCLING && t.m_curState == r.BTN_FREE_GET_GOLD) {
var e = t.m_manager.m_userData.gold, n = t.m_manager.m_shopInfo[t.m_manager.m_buyshopid - 1].price, o = s.default.string_percent(e, n), i = t.m_bottom_btns[r.BTN_FREE_GET_GOLD], a = t.seekCompByName(cc.ProgressBar, "progressBar", i);
a.progress = o < .01 ? 0 : o;
t.seekCompByName(cc.Label, "label", a.node).string = "金币充能" + String(Math.floor(100 * o)) + "%";
}
}
});
this.addEventListener("USER_LEVEL_UP", function(e) {
if (!(e >= 38)) {
t.addLayer(s.default.LAYER.RewardLayer, {
type: 4,
value: e
});
t.refLevelUpRedPackage();
}
});
this.addEventListener("GOLD_LACK", function() {
var e = t.m_manager.m_userData.level;
e >= 38 ? e = 32 : e -= 5;
var n = t.m_manager.m_shopInfo[Math.max(0, e)].price;
t.addLayer(s.default.LAYER.TipsLayer, {
type: c.default.TYPE.NoCoins,
btnType: c.default.BTN_TYPE.Get,
content: c.default.Content.Get,
num: n,
func: function(e) {
if (1 == e) {
t.seekAd(l.default.TYPE.GOLD, {
total: 0
}, function(e) {
t.removeLayer(s.default.LAYER.TipsLayer);
t.addLayer(s.default.LAYER.RewardLayer, {
type: 2,
value: n
});
});
return !0;
}
}
});
});
this.addEventListener("ZPNUMBS_CHANGE", function() {
y.active = t.m_manager.m_userData.zpnums > 0;
});
this.addEventListener("RWNUMBS_CHANGE", function(e) {
g.active = e > 0;
});
this.m_anime_merge = this.seekCompByName(sp.Skeleton, "anime_merge");
this.m_anime_merge.node.active = !1;
this.m_manager.PlayBgSound(this.m_scene.bg_sound);
this.playDogAnimation();
this.nextFrameExec(function() {
t.onLoginCallBack(e);
});
this.setIncome();
this.addEventListener("RMB_CHANGE", this.setOwnermb.bind(this));
this.setBuyShopId();
this.setLevelUp(Number(this.m_manager.m_userData.level));
this.m_gold_label.string = s.default.glodConverToString(this.m_manager.m_userData.gold);
this.playIncomeBtnAni();
this.dispatchEvent("ZPNUMBS_CHANGE");
this.dispatchEvent("GOLD_CHANGE");
this.dispatchEvent("RMB_CHANGE");
this.addEventListener("StealVegetablesPickId", function(e) {
var n = t.m_ud.getStringForKey("StealVegetablesPickId", "[]"), o = JSON.parse(n);
o.push(e);
t.m_ud.setStringForKey("StealVegetablesPickId", JSON.stringify(o));
});
this.sendUrl({
action: "MissionList",
param: JSON.stringify({
misid: 0,
all: 1
})
}, function(e) {
t.m_manager.setTaskData(e.mission);
});
this.addEventListener("INVITE_RED_CHANGE", function(e) {
t.seekNodeByName("button_yq/img_9").active = e > 0;
});
this.sendUrl({
action: "Invite",
param: JSON.stringify({})
}, function(e) {
var n = 0;
for (var o in e.red) {
1 == e.red[o] && n++;
}
t.m_manager.setInviteRed(n);
}, {
loading: !0
});
};
t.prototype.onBack = function() {
var e = this;
this.msgBox("确定退出游戏?", function(t) {
1 == t && e.addCmd(p.default.CMDS.END_GAME);
});
return !0;
};
t.prototype.refLevelUpRedPackage = function() {
for (var e = new Array(), t = 0, n = [ "button_18ji", "button_lq" ]; t < n.length; t++) {
var o = n[t];
e.push(this.seekNodeByName(o));
}
var i = Number(this.m_manager.m_userData.level), r = this.m_manager.m_userData.cashlevel;
if (r.length > 0) {
var a = Number(r[0]);
if (i >= a) this.setNodeVisible(e, 1); else {
this.setNodeVisible(e, 0);
this.seekCompByName(cc.Label, "bg_6/label", e[0]).string = a + "级可领取";
}
} else this.setNodeVisible(e, 2);
};
t.prototype.setOwnermb = function() {
var e = this.m_manager.m_userData.ownermb;
this.seekCompByName(cc.Label, "money/label").string = String(e) + "元";
};
t.prototype.setBuyShopId = function() {
var e = Number(this.m_manager.m_buyshopid), t = this.seekNodeByName("button_ksgm"), n = this.seekCompByName(cc.Label, "label2", t);
n.string = s.default.glodConverToString(this.m_manager.m_shopInfo[e - 1].price);
this.seekCompByName(cc.Sprite, "img_1", t).spriteFrame = this.m_scene.m_spriteFrames[e - 1];
n = this.seekCompByName(cc.Label, "label", t);
(n = this.seekCompByName(cc.Label, "label", t)).string = "Lv." + e;
};
t.prototype.setLevelUp = function(e) {
this.seekCompByName(cc.Label, "head/img_1/label").string = "Lv." + Math.min(e, 38);
};
t.prototype.refreshScene = function(e) {
var t = 0, n = !0;
for (var o in e) {
var i = Number(e[o]);
this.m_vegetables_model[t].lv != i && this.setVegetables(t, i);
0 != i && (n = !1);
t++;
}
if (n && 1 == this.m_manager.m_userData.level) {
this.setNewGuide();
return !0;
}
};
t.prototype.setNewGuide = function() {
var e, t = this.seekNodeByName("button_ksgm"), n = t.getContentSize(), o = t.convertToWorldSpaceAR(cc.v2(0, 0)), i = cc.view.getVisibleSize(), r = cc.v2(o.x + 80, o.y - 40), a = this.m_caidis[0].node, c = this.m_caidis[1].node, l = a.convertToWorldSpaceAR(cc.v2(0, 0)), u = c.convertToWorldSpaceAR(cc.v2(0, 0)), m = a.getContentSize(), p = c.getContentSize(), h = cc.v2((u.x + l.x) / 2, l.y + 20), _ = cc.size(u.x - l.x + m.width + 5, m.height + 100), d = this.seekNodeByName("button_sm"), f = d.convertToWorldSpaceAR(cc.v2(0, 0)), y = d.getContentSize(), g = cc.v2(f.x + 80, f.y - 40), v = this.seekNodeByName("money/button_ti"), b = v.convertToWorldSpaceAR(cc.v2(0, 0)), N = v.getContentSize(), L = cc.v2(b.x + 80, b.y - 40);
e = [ [ {
type: 2,
pos: o,
size: {
width: n.width,
height: n.height
},
show: 1,
handpos: r
} ], [ {
type: 2,
pos: o,
size: {
width: n.width,
height: n.height
},
show: 1,
handpos: r
} ], [ {
type: 2,
pos: h,
size: {
width: _.width,
height: _.height
},
show: 1,
handpos: [ l, u ]
} ], [ {
type: 2,
pos: o,
size: {
width: n.width,
height: n.height
},
show: 1,
handpos: r
} ], [ {
type: 1,
pos: cc.v2(u.x, u.y + 20),
range: p.width / 2,
show: 1,
handpos: cc.v2(u.x + 30, u.y)
}, {
type: 2,
pos: o,
size: {
width: n.width,
height: n.height
},
show: 1,
handpos: o
} ], [ {
type: 1,
pos: f,
size: {
width: y.width,
height: y.height
},
range: y.width / 2 + 5,
show: 1,
handpos: g
} ], [ {
type: 2,
pos: o,
size: {
width: i.width,
height: i.height
},
show: 0,
handpos: r
} ], [ {
type: 2,
pos: o,
size: {
width: i.width,
height: i.height
},
show: 0,
handpos: r
} ], [ {
type: 1,
pos: b,
size: {
width: N.width,
height: N.height
},
range: N.width / 2 + 5,
show: 1,
handpos: L
} ] ];
this.addLayer(s.default.LAYER.GuideLayer, e);
};
t.prototype.GuideQuicken = function() {
cc.view.getVisibleSize();
var e = this.m_btn_js.node, t = e.convertToWorldSpaceAR(cc.v2(0, 0)), n = e.getContentSize(), o = cc.v2(t.x + 80, t.y - 40), i = [ [ {
type: 1,
pos: t,
size: {
width: n.width,
height: n.height
},
range: n.width / 2,
show: 1,
handpos: o
} ], [ {
type: 2,
pos: t,
size: {
width: n.width,
height: n.height
},
show: 0,
handpos: o
} ] ];
this.addLayer(s.default.LAYER.GuideQuickenLayer, i);
};
t.prototype.switch_bottom_state = function(e) {
e == r.BTN_FAST_BUY && s.default.string_cmp(this.m_manager.m_userData.gold, this.m_manager.m_shopInfo[this.m_manager.m_buyshopid - 1].price) < 0 && (e = r.BTN_FREE_GET_GOLD);
if (this.m_curState != e) {
this.m_curState = e;
this.setNodeVisible(this.m_bottom_btns, e);
}
};
t.prototype.seekEmptySpace = function() {
for (var e = 1, t = 0, n = this.m_vegetables_model; t < n.length; t++) {
if (0 == n[t].lv) return e;
e++;
}
return 0;
};
t.prototype.refreshStateFiveBtn = function(e) {
for (var t = 0, n = this.m_btnMoneyTree; t < n.length; t++) {
var o = n[t];
this.seekNodeByName("Background1", o.node).active = !1;
this.seekNodeByName("Background", o.node).active = !0;
}
for (var i in e) if (e.hasOwnProperty(i)) {
var r = Number(e[i]);
if (r >= 41 && r <= 45) {
var a = this.m_btnMoneyTree[r - 41], s = new Array(), c = this.seekNodeByName("Background1", a.node), l = this.seekNodeByName("Background", a.node);
s.push(l);
s.push(c);
this.setNodeVisible(s, 1);
!0;
}
}
};
t.prototype.onLoginCallBack = function(e) {
var t = this;
e.notice && (this.m_manager.noticeInfo = e.notice);
this.refreshScene(e.myscene) && (e.notice = "");
this.seekCompByName(cc.Label, "head/img_2/label").string = jsb.Utils.parseName(8, e.playinfo.name);
this.refreshStateFiveBtn(e.myscene);
this.seekCompByName(cc.Sprite, "bg_5_xx/img_9").node.active = 1 == Number(this.m_manager.m_userData.message_status);
this.refreshRedTC(Number(this.m_manager.m_userData.steal_surplus_total));
this.loadByUrl(function(e) {
if (!e.err) {
t.seekCompByName(cc.Sprite, "head/img_3").spriteFrame = new cc.SpriteFrame(e.ret);
}
}, this.m_manager.m_userData.avatar, "png");
this.dispatchEvent("StartSpeed", Number(e.second));
Number(e.offtime) > 60 && Number(e.offgold) > 0 && this.addLayer(n.LAYER.OfflineRvnLayer, e.offgold);
e.notice && this.addLayer(s.default.LAYER.NOTICE, e.notice);
this.refLevelUpRedPackage();
};
t.prototype.refreshRedTC = function(e) {
this.seekNodeByName("button_tc/img_9").active = e > 0;
this.m_manager.m_userData.steal_surplus_total = e;
};
t.prototype.canSpeedLayer = function() {
if (this.m_second <= 0) {
this.m_manager.m_userData.speed_guide = 1;
this.addLayer(s.default.LAYER.SpeedLayer);
} else this.cmdToast("正在加速中...");
};
t.prototype.requestIncomeLayerDate = function() {
var e = this;
this.sendUrl({
action: "RebateCollect",
param: JSON.stringify({
phoneNum: u.default.getInstance().getStringForKey("iphone_code", "")
})
}, function(t) {
e.addLayer(s.default.LAYER.IncomeLayer, t);
});
};
t.prototype.requestIncomeDetailLayerDate = function() {
var e = this;
this.sendUrl({
action: "AdIncome"
}, function(t) {
e.sendUrl({
action: "MammonList"
}, function(n) {
var o = {
AdIncome: t,
MammonList: n
};
e.addLayer(s.default.LAYER.IncomeDetailsLayer, o);
});
});
};
t.prototype.formatDate = function(e) {
var t = Math.round((e - 1800) / 3600), n = Math.round((e - 30) / 60) % 60, o = e % 60;
return (t > 0 ? t + "小时" : "") + (n > 0 ? n + "分钟" : "") + (o > 0 ? o + "秒" : "");
};
t.prototype.startTimeingSpeed = function(e) {
var t = this.seekCompByName(cc.Label, "js_animation/img_timing/time");
t.node.active = e > 0;
t.string = this.formatDate(e);
this.m_second = e;
this.m_anime_js.node.active = e > 0;
this.m_btn_js.node.active = e <= 0;
if (e > 0) {
this.m_handler_addSpeed = this.createTime(function() {
this.m_second = this.m_second - 1;
t.string = this.formatDate(this.m_second);
if (this.m_second <= 0) {
this.removeTime(this.m_handler_addSpeed);
this.m_handler_addSpeed = null;
this.setIncome();
t.node.active = !1;
this.m_anime_js.node.active = !1;
this.m_btn_js.node.active = !0;
}
}, 1);
this.setIncome();
}
};
t.prototype.setIncome = function() {
var e = this.m_manager.m_userData.income, t = this.seekCompByName(cc.Label, "bg_7/label2");
this.m_handler_addSpeed && (e = s.default.string_add(e, e));
t.string = s.default.glodConverToString(String(e)) + "/秒";
};
t.prototype.playAnimationVegetables = function(e, t) {
var n = this.m_scene.m_animes[t - 1];
e.skeletonData = n;
var o = n._skeletonJson.animations;
if (t >= 41 && t <= 45) {
var i = "baoshu" + String([ 2, 4, 1, 5, 3 ][t - 41]);
e.setAnimation(0, i, !0);
} else for (var i in o) {
e.setAnimation(0, i, !0);
break;
}
(38 == t || 39 == t || t >= 41 && t <= 45) && (e.node.y = 20);
};
t.prototype.createVegetables = function(e, t) {
var n = !1;
do {
if (e < 1) break;
var o = this.m_caidis[t].node, i = cc.instantiate(this.m_scene.m_vegetables);
i.parent = o;
var r = this.seekCompByName(sp.Skeleton, "anime", i);
this.playAnimationVegetables(r, e);
this.seekCompByName(cc.Label, "font_1", i).node.active = !1;
i.y = 50;
this.refreshLvOfVegetables(i, e);
var a = this.m_vegetables_model[t];
a.lv = e;
a.duration = 1 + .2 * s.default.random(0, 20);
this.addTouchEventListener(i, this.onShuCaiTouch.bind(this));
n = !0;
} while (0);
return n;
};
t.prototype.UpVegetables = function(e, t) {
var n = !1;
do {
if (e < 1) break;
var o = this.m_caidis[t].node.children[0];
if (!o) break;
var i = this.seekCompByName(sp.Skeleton, "anime", o);
this.playAnimationVegetables(i, e);
this.seekCompByName(cc.Label, "font_1", o).node.active = !1;
o.y = 50;
this.refreshLvOfVegetables(o, e);
var r = this.m_vegetables_model[t];
r.lv = e;
r.duration = 1 + .2 * s.default.random(0, 20);
n = !0;
} while (0);
return n;
};
t.prototype.onTouchTCDisplay = function() {
var e = this;
this.sendUrl({
action: "StealFarm",
param: JSON.stringify({})
}, function(t) {
1 != t.status ? e.cmdToast(t.title) : e.addLayer(s.default.LAYER.StealVegetables, t);
});
};
t.prototype.onBtnClick = function(e, t) {
var o = this;
if (2 == t) {
this.m_manager.playEffect(this.m_scene.click_sound);
switch (e.name) {
case "head":
this.addLayer(n.LAYER.SETTING_LAYER);
break;

case "button_zp":
this.addLayer(s.default.LAYER.RotaryTableLayer);
break;

case "button_phb":
this.sendUrl({
action: "Ranking",
param: JSON.stringify({})
}, this.onRankingCallback.bind(this), {
loading: !0
});
break;

case "button_xx":
this.seekCompByName(cc.Sprite, "bg_5_xx/img_9").node.active = !1;
this.sendUrl({
action: "StealFarmMessage",
param: JSON.stringify({})
}, this.onMessageCallback.bind(this), {
loading: !0
});
break;

case "button_sm":
this.addLayer(s.default.LAYER.GonglveLayer);
break;

case "button_kefu":
this.sendUrl({
action: "Customer"
}, function(e) {
o.addLayer(s.default.LAYER.KeFuLayer, e[0]);
});
break;

case "button_rw":
this.sendUrl({
action: "MissionList",
param: JSON.stringify({
misid: 0
})
}, this.onTaskCallback.bind(this), {
loading: !0
});
break;

case "button_lq":
if (11 != (this.m_manager.m_userData.phone || "").length) {
this.addLayer(s.default.LAYER.BindPhoneLayer, {
func: function(e) {
1 == e && o.addLayer(s.default.LAYER.RedPackageLayer);
}
});
this.cmdToast("领取红包前请绑定手机");
} else this.addLayer(s.default.LAYER.RedPackageLayer);
break;

case "button_18ji":
this.cmdToast("目前等级未到");
break;

case "button_sy":
this.requestIncomeLayerDate();
break;

case "button_tc":
this.onTouchTCDisplay();
break;

case "button_js":
this.canSpeedLayer();
break;

case "button_sd":
this.addLayer(s.default.LAYER.ShopLayer, this.m_manager.m_userData.level);
break;

case "button_yq":
this.sendUrl({
action: "Invite",
param: JSON.stringify({})
}, function(e) {
o.addLayer(s.default.LAYER.InviteLayer, e);
}, {
loading: !0
});
break;

case "button_ksgm":
this.dispatchEvent("onBuy", this.m_manager.m_buyshopid, !0);
break;

case "button_ti":
this.sendUrl({
action: "CashDetail",
param: JSON.stringify({})
}, this.onCashoutCallback.bind(this), {
loading: !0
});
break;

case "button_ling":
this.requestIncomeDetailLayerDate();
break;

case "button_lqmfjb":
this.dispatchEvent("GOLD_LACK", null, !0);
}
}
};
t.prototype.onTaskCallback = function(e) {
this.addLayer(s.default.LAYER.TaskLayer, e.mission);
};
t.prototype.onRankingCallback = function(e) {
this.addLayer(s.default.LAYER.ListLayer, e);
};
t.prototype.onCashoutCallback = function(e) {
this.addLayer(s.default.LAYER.CashOutLayer, e);
};
t.prototype.onMessageCallback = function(e) {
this.addLayer(s.default.LAYER.MessageLayer, e);
};
t.prototype.searchCaidiByVegetables = function(e) {
for (var t = 0, n = e.parent, o = 0, i = this.m_caidis; o < i.length; o++) {
if (n == i[o].node) break;
t++;
}
return t;
};
t.prototype.getVegatablesGold = function() {
var e = this.m_vegetables_model[this.m_vegetables_idx_src].lv;
return String(this.m_manager.m_shopInfo[e - 1].baseprice);
};
t.prototype.refreshLvOfVegetables = function(e, t) {
var n = this.seekCompByName(cc.Label, "img_6/label", e);
n.string = String(Number(t) > 38 ? "38" : t);
var o = this.seekCompByName(cc.Sprite, "img_6", e);
o.node.active = t < 38;
if (t >= 41 && t <= 45) {
var i = this.m_btnMoneyTree[t - 41], r = this.seekCompByName(cc.Sprite, "Background1", i.node);
o.spriteFrame = r.spriteFrame;
n.node.active = !1;
o.node.active = !0;
} else {
o.spriteFrame = this.m_spriteFrameLvBg;
n.node.active = !0;
}
};
t.prototype._enabledVegatables = function(e) {
this.m_Panel_cancel.active = !e;
this.m_bottom_btns && this.m_bottom_btns.length > 0 && (this.m_bottom_btns[0].getComponent(cc.Button).interactable = e);
};
t.prototype.onShuCaiTouch = function(e, t, o) {
var i = this;
switch (t) {
case m.default.TouchEventType.began:
this.m_isMoving = !1;
break;

case m.default.TouchEventType.moved:
if (!this.m_isMoving) {
this.m_isMoving = !0;
e.opacity = 100;
this._enabledVegatables(!1);
this.m_drag_vegetables.active = !0;
var a = this.node.convertToNodeSpaceAR(o.getLocation());
this.m_drag_vegetables.position = a;
var c = this.seekCompByName(sp.Skeleton, "anime", this.m_drag_vegetables), u = this.seekCompByName(sp.Skeleton, "anime", e);
c.skeletonData = u.skeletonData;
c.setAnimation(0, u.animation, !0);
this.m_vegetables_idx_src = this.searchCaidiByVegetables(e);
var p = this.m_vegetables_model[this.m_vegetables_idx_src].lv;
this.refreshLvOfVegetables(this.m_drag_vegetables, p);
this.seekCompByName(cc.Label, "label", this.m_bottom_btns[r.BTN_RECYCLING]).string = s.default.glodConverToString(this.getVegatablesGold());
this.switch_bottom_state(r.BTN_RECYCLING);
}
this.m_drag_vegetables.position = this.node.convertToNodeSpaceAR(o.getLocation());
break;

case m.default.TouchEventType.ended:
case m.default.TouchEventType.canceled:
this.m_isMoving = !1;
this.m_drag_vegetables.active = !1;
this.switch_bottom_state(r.BTN_FAST_BUY);
var h = !1;
if (t == m.default.TouchEventType.canceled) {
var _ = function() {
var t = d.node.convertToNodeSpaceAR(o.getLocation()), r = d.getCaidi(t);
if (-1 == r) {
if (d.isRecycling(t)) {
var a = d.m_vegetables_model[d.m_vegetables_idx_src].lv;
if (46 == a) {
d.cmdToast("分红财神无法卖出");
return "break";
}
var c = d.getVegatablesGold(), u = a - 1;
if (40 == a) {
h = !0;
d.sendUrl({
action: "Sell",
param: JSON.stringify({
pos: d.m_vegetables_idx_src + 1,
total: 0
})
}, function(t) {
e.opacity = 255;
i._enabledVegatables(!0);
i.removeVegetables(i.m_vegetables_idx_src);
i.addLayer(s.default.LAYER.RewardLayer, {
type: 1,
value: t.money
});
i.refIncome();
});
} else {
h = !0;
d.addLayer(s.default.LAYER.VegetalbeRecylingLayer, {
add_gold: c,
idx: u,
callback: function(t) {
if (1 == t) i.sendUrl({
action: "Sell",
param: JSON.stringify({
pos: i.m_vegetables_idx_src + 1,
total: 0
})
}, function(t) {
e.opacity = 255;
i._enabledVegatables(!0);
var n = i.getVegatablesGold();
i.showAddGold(s.default.glodConverToString(n));
i.m_manager.userAddGold(n);
i.removeVegetables(i.m_vegetables_idx_src);
i.refreshStateFiveBtn(t.myscene);
i.refIncome();
i.dispatchEvent("Sell_success");
}); else {
e.opacity = 255;
i._enabledVegatables(!0);
}
}
});
}
}
return "break";
}
d.m_vegetables_idx_dec = r;
if (d.m_vegetables_idx_dec == d.m_vegetables_idx_src) return "break";
var m = d.m_vegetables_model[d.m_vegetables_idx_src], p = d.m_vegetables_model[d.m_vegetables_idx_dec], _ = 0;
do {
if (m.lv == p.lv && m.lv < 38) {
_ = 1;
break;
}
if (38 == m.lv && 39 == p.lv || 39 == m.lv && 38 == p.lv) {
_ = 2;
break;
}
if (m.lv != p.lv && m.lv >= 41 && m.lv <= 45 && p.lv >= 41 && p.lv <= 45) {
_ = 3;
break;
}
} while (0);
if (0 != _) {
var f = function() {
if (3 == _) {
d.addLayer(n.LAYER.MergeMoney_Layer, {
light: [ m.lv, p.lv ],
vegetableModel: d.m_vegetables_model,
func: function(t) {
i.m_manager.PlayBgSound(i.m_scene.bg_sound);
if (1 == t) {
h = !0;
var n = JSON.stringify({
pos2: i.m_vegetables_idx_src + 1,
pos1: i.m_vegetables_idx_dec + 1,
total: 0
});
i.sendUrl({
action: "Merge",
param: n
}, function(t) {
e.opacity = 255;
i._enabledVegatables(!0);
i.refreshScene(t.myscene);
i.refreshStateFiveBtn(t.myscene);
});
}
}
});
return "break";
}
var t = JSON.stringify({
pos2: d.m_vegetables_idx_src + 1,
pos1: d.m_vegetables_idx_dec + 1,
total: 0
}), o = d.m_caidis[d.m_vegetables_idx_src].node.children[0];
o.active = !1;
var r = m.lv;
if (1 == _ && m.lv < 37) {
h = !0;
d.sendUrl({
action: "Merge",
param: t
}, function(t) {
i._merge(m.lv + 1, e);
i.refIncome();
var n = t.p;
n && n > 0 && i.addLayer(s.default.LAYER.FreeSaveOrUpLayer, {
type: 9 == n ? 2 : 1,
veg: 9 == n ? [ r + 2, r + 1 ] : [ r ],
func: function(e, t) {
1 == e && i.seekAd(9 == n ? l.default.TYPE.FREE_SAVE : l.default.TYPE.FREE_UP, {
total: 0
}, function(e) {
if (9 == n) {
if (i.UpVegetables(r + 2, i.m_vegetables_idx_dec)) {
t.removeFromParent();
i.refIncome();
}
} else {
if (i.createVegetables(r, i.m_vegetables_idx_src)) {
t.removeFromParent();
i.refIncome();
}
}
});
}
});
});
} else if (1 == _ && 37 == m.lv) {
h = !1;
d.addLayer(n.LAYER.LotteryLayer, {
param: t,
idx: d.m_vegetables_idx_dec,
func: function(t, n) {
if (1 == t) {
var r = n.myscene[String(i.m_vegetables_idx_dec + 1)];
i._merge(r, e);
i.refreshStateFiveBtn(n.myscene);
i.refIncome();
} else {
e.opacity = 255;
i._enabledVegatables(!0);
o.active = !0;
}
}
});
} else {
h = !0;
d.sendUrl({
action: "Merge",
param: t
}, function(t) {
if (2 == _) {
e.opacity = 255;
i._enabledVegatables(!0);
i.removeVegetables(i.m_vegetables_idx_src);
i.removeVegetables(i.m_vegetables_idx_dec);
i.addLayer(s.default.LAYER.RewardLayer, {
type: 1,
value: t.money,
func: function() {
i.setOwnermb();
}
});
} else {
var n = t.myscene[String(i.m_vegetables_idx_dec + 1)];
i._merge(n, e);
i.refreshStateFiveBtn(t.myscene);
}
i.refIncome();
});
}
};
do {
if ("break" === f()) break;
} while (0);
} else {
h = !0;
d.sendUrl({
action: "Move",
param: JSON.stringify({
pos1: d.m_vegetables_idx_src + 1,
pos2: d.m_vegetables_idx_dec + 1
})
}, function() {
e.opacity = 255;
i._enabledVegatables(!0);
i.m_vegetables_model[i.m_vegetables_idx_src] = p;
i.m_vegetables_model[i.m_vegetables_idx_dec] = m;
i.m_caidis[i.m_vegetables_idx_src].node.children[0].parent = i.m_caidis[i.m_vegetables_idx_dec].node;
if (0 != p.lv) {
i.m_caidis[i.m_vegetables_idx_dec].node.children[0].parent = i.m_caidis[i.m_vegetables_idx_src].node;
}
});
}
}, d = this;
do {
if ("break" === _()) break;
} while (0);
}
if (!h) {
e.opacity = 255;
this._enabledVegatables(!0);
}
}
};
t.prototype._merge = function(e, t) {
var n = this, o = this.m_vegetables_model[this.m_vegetables_idx_dec];
this.removeVegetables(this.m_vegetables_idx_src);
var i = this.seekCompByName(sp.Skeleton, "anime", this.m_drag_vegetables2), r = this.seekCompByName(sp.Skeleton, "anime", t);
i.skeletonData = r.skeletonData;
i.setAnimation(0, r.animation, !0);
o.duration = 1 + .2 * s.default.random(0, 20);
o.lv = e;
var a = this.m_caidis[this.m_vegetables_idx_dec].node.children[0];
a.active = !1;
i = this.seekCompByName(sp.Skeleton, "anime", a);
this.playAnimationVegetables(i, o.lv);
this.refreshLvOfVegetables(a, o.lv);
this.m_drag_vegetables.active = !0;
this.m_drag_vegetables2.active = !0;
this.setVegetablesItemVisible(this.m_drag_vegetables, !1, !1);
var c = a.convertToWorldSpaceAR(cc.v2(0, 0));
c = this.node.convertToNodeSpaceAR(c);
this.m_drag_vegetables.position = c;
this.m_drag_vegetables2.position = c;
this.m_drag_vegetables.runAction(cc.sequence(cc.moveBy(.2, -100, 0), cc.moveBy(.2, 100, 0), cc.callFunc(function(e) {
e.active = !1;
})));
this.m_drag_vegetables2.runAction(cc.sequence(cc.moveBy(.2, 100, 0), cc.moveBy(.2, -100, 0), cc.callFunc(function(e, t) {
n.m_anime_merge.node.active = !0;
c.y -= 10;
c.x -= 10;
n.m_anime_merge.node.position = c;
n.m_anime_merge.clearTrack(0);
n.m_anime_merge.setAnimation(0, "hebing_tx", !1);
n.m_anime_merge.setCompleteListener(function(e) {
n.m_anime_merge.node.active = !1;
});
n.m_drag_vegetables2.active = !1;
n.setVegetablesItemVisible(n.m_drag_vegetables, !1, !0);
t.vegetables.active = !0;
n._enabledVegatables(!0);
e.opacity = 255;
}, this, {
vegetables: a
})));
this.m_manager.playEffect(this.m_scene.composeVegetables_sound);
};
t.prototype.getDescVegetTablePos = function() {
return this.m_caidis[this.m_lastBuypos - 1].node.children[0].convertToWorldSpaceAR(cc.v2(0, 0));
};
t.prototype.setVegetablesItemVisible = function(e, t, n) {
void 0 === t && (t = !0);
void 0 === n && (n = !0);
this.seekNodeByName("font_1", e).active = t;
this.seekNodeByName("img_6", e).active = n;
};
t.prototype.removeVegetables = function(e) {
this.m_vegetables_model[e].lv = 0;
this.m_caidis[e].node.children[0].destroy();
};
t.prototype.refIncome = function() {
for (var e = "0", t = 0, n = this.m_vegetables_model; t < n.length; t++) {
var o = n[t];
o.lv < 1 || (e = s.default.string_add(this.m_manager.m_shopInfo[o.lv - 1].income, e));
}
this.m_manager.m_userData.income = e;
this.setIncome();
};
t.prototype.setVegetables = function(e, t) {
if (this.m_vegetables_model[e].lv != t) {
this.m_vegetables_model[e].lv = t;
this.m_caidis[e].node.children[0] && this.removeVegetables(e);
0 != t && this.createVegetables(t, e);
}
};
t.prototype.dogMove = function() {
this.dog_runTime++;
var e = this.dog.getComponent(dragonBones.ArmatureDisplay);
if ("move" == e.animationName) {
if (this.dog.x < -300) {
this.dog.scaleX = -1;
this.dog_distance = -this.dog_distance;
}
if (this.dog.x > 500) {
this.dog.scaleX = 1;
this.dog_distance = -this.dog_distance;
}
this.dog.x = this.dog.x + this.dog_distance;
if (this.dog_runTime >= this.dog_duration) {
this.dog_runTime = 0;
e.playAnimation("stand", 0);
}
}
};
t.prototype.playIncomeBtnAni = function() {
this.seekNodeByName("button_sy/shouyiAni").getComponent(sp.Skeleton).setAnimation(0, "hongbaoui", !0);
};
t.prototype.playDogAnimation = function() {
var e = this.seekNodeByName("dog_anime");
this.dog = e;
var t = e.getComponent(dragonBones.ArmatureDisplay);
t.getArmatureNames();
t.playAnimation("stand", 0);
var n = 0;
t.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, function(e) {
if (e.type === dragonBones.EventObject.LOOP_COMPLETE && "stand" === e.animationState.name && 2 == ++n) {
n = 0;
t.playAnimation("move", 0);
}
}.bind(this));
};
t.prototype.getCaidi = function(e) {
for (var t = -1, n = 0, o = 0, i = this.m_caidis; o < i.length; o++) {
var r = i[o].node, a = this.node.convertToWorldSpaceAR(new cc.Vec2(r.x, r.y));
a.x -= this.node.width / 2;
a.y -= this.node.height / 2;
a.x -= r.width / 2;
a.y -= r.height / 2;
if (new cc.Rect(a.x, a.y, r.width, r.height + .5 * r.height).contains(e)) {
t = n;
break;
}
n++;
}
return t;
};
t.prototype.isRecycling = function(e) {
var t = !1;
do {
var n = this.m_bottom_btns[r.BTN_RECYCLING], o = this.node.convertToWorldSpaceAR(new cc.Vec2(n.x, n.y));
o.x -= this.node.width / 2;
o.y -= this.node.height / 2;
o.x -= n.width / 2;
o.y -= n.height / 2;
if (new cc.Rect(o.x, o.y, n.width, n.height + .5 * n.height).contains(e)) {
t = !0;
break;
}
} while (0);
return t;
};
t.prototype.update = function(e) {
var t = this;
this.dogMove();
do {
if (!this.m_vegetables_model) break;
this.m_lastAddMoneyTime += e;
if (this.m_lastAddMoneyTime > 1) {
this.m_lastAddMoneyTime -= 1;
this.m_manager.userAddGold(this.m_manager.m_userData.income);
this.m_handler_addSpeed && this.m_manager.userAddGold(this.m_manager.m_userData.income);
}
for (var n = void 0, o = 0; o < this.m_vegetables_model.length; o++) {
(n = this.m_vegetables_model[o]).duration -= e;
if (n.duration < 0) {
this.m_handler_addSpeed ? n.duration += this.m_duration / 2 : n.duration += this.m_duration;
if (0 != n.lv) {
for (var i = this.m_caidis[o].node.children[0], r = this.seekCompByName(cc.Label, "font_1", i), a = this.m_manager.m_shopInfo[n.lv - 1].income, c = a, l = 0; l < 4; l++) a = s.default.string_add(a, c);
var u = "+" + s.default.glodConverToString(a);
r.string = u;
var m = r.node;
m.active = !0;
m.opacity = 255;
m.stopAllActions();
m.position = cc.v2(0, 0);
m.runAction(cc.sequence(cc.spawn(cc.moveBy(2, 0, 100), cc.fadeOut(2)), cc.callFunc(function(e) {
e.active = !1;
e.x = e.y = 0;
})));
this.seekNodeByName("anime", i).runAction(cc.sequence(cc.scaleTo(.1, 1.1, 1.1), cc.callFunc(function(e, n) {
t.m_manager.playEffect(t.m_scene.m_sounds);
t.dispatchEvent("GOLD_CHANGE");
}, this, {
income: a
}), cc.scaleTo(.1, 1, 1)));
}
}
}
} while (0);
};
var n;
t.LAYER = {
SETTING_LAYER: [ 0, "scene/Common/UserInfoLayer" ],
OfflineRvnLayer: [ 1, "scene/Common/Popup/OfflineRevenueLayer" ],
MergeMoney_Layer: [ 2, "scene/Common/MergeMoneyTreeLayer" ],
LotteryLayer: [ 3, "scene/Common/LotteryLayer" ],
TouchTreeTips: [ 4, "scene/Common/TouchTreeTipsLayer" ],
SETTING_LAYER2: [ 5, "scene/Common/UserInfoLayer2" ]
};
i([ d({
type: cc.Texture2D
}) ], t.prototype, "kscnimg", void 0);
return t = n = i([ _ ], t);
}(a.default);
n.default = f;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UIBase": "UIBase",
"../../engine/UILayer": "UILayer",
"../../engine/Utils/UserDefault": "UserDefault",
"../../game/Instance": "Instance",
"../Common/ADLayer": "ADLayer",
"../Common/Popup/TipsLayer": "TipsLayer"
} ],
HallScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5d41boqIaNCbp5GNxZZSQFK", "HallScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UIScene"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_spriteFrames = [];
t.m_vegetables = null;
t.m_numberFont = null;
t.m_animes = [];
t.m_sounds = [];
t.bg_sound = null;
t.buySuccess_sound = null;
t.composeVegetables_sound = null;
t.click_sound = null;
t.halllayer = null;
t.marqueeLayer = null;
t.m_hallLayer = null;
return t;
}
t.prototype.onCreate = function(e) {
this.m_hallLayer = this.addLayer(a.default.LAYER.HallLayer, e);
this.addLayer(a.default.LAYER.MarqueeLayer);
};
t.prototype.getResource = function(e) {
return e == a.default.LAYER.HallLayer[1] ? this.halllayer : e == a.default.LAYER.MarqueeLayer[1] ? this.marqueeLayer : void 0;
};
t.prototype.onBackHomeEvent = function() {};
i([ l(cc.SpriteFrame) ], t.prototype, "m_spriteFrames", void 0);
i([ l(cc.Prefab) ], t.prototype, "m_vegetables", void 0);
i([ l(cc.LabelAtlas) ], t.prototype, "m_numberFont", void 0);
i([ l({
type: sp.SkeletonData
}) ], t.prototype, "m_animes", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "m_sounds", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "bg_sound", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "buySuccess_sound", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "composeVegetables_sound", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "click_sound", void 0);
i([ l(cc.Prefab) ], t.prototype, "halllayer", void 0);
i([ l(cc.Prefab) ], t.prototype, "marqueeLayer", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UIScene": "UIScene",
"../../game/Instance": "Instance"
} ],
HelpLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "948bfdEzKRHNK7KeKyRctPJ", "HelpLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("Panel_cancel");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
HttpClient: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3d5b4i0uvVGjrY4dM/ubGPs", "HttpClient");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Manager"), i = function() {
function e(e, t, n) {
n || (n = []);
n.ignore_disconnect && n.loading && (n.loading = null);
this.m_exdata = n;
this.m_eventName = e;
var i = !0, r = "";
for (var a in t) {
var s = t[a];
if (i) {
i = !1;
r += "?";
} else r += "&";
r = r + a + "=" + encodeURI(s);
}
this.m_backUrl = r;
this._refUrl();
n.loading && o.getManager().dispatchEvent("HTTP_SHOW_LOADING", n.loading);
this.send();
}
e.prototype._refUrl = function() {
var e = this.m_exdata.url;
e || (e = o.getManager().m_url);
this.m_url = e + this.m_backUrl;
this.m_url += "&r=" + Math.floor(100 * Math.random());
};
e.prototype.send = function() {
var e = this, t = cc.loader.getXMLHttpRequest();
t.timeout = 1e4;
t.responseType = "arraybuffer";
t.ontimeout = function() {
e._fail({
ret: 1,
desc: "连接超时"
});
};
t.onerror = function() {
e._fail({
ret: 1,
desc: "连接错误"
});
};
t.onreadystatechange = function() {
var n, i = null, r = o.getManager();
do {
if (4 != t.readyState) return;
var a = t.status;
if (!(a >= 200 && a < 400)) {
t.abort();
break;
}
if ((i = r.byteAryToJson(new Uint8Array(t.response))) && 505 == i.ret) {
n = {
ret: i.ret,
desc: i.desc
};
i = null;
}
} while (0);
if (i) {
i.__URL__ = e.m_url;
r.dispatchEvent("HTTP_CALLBACK", i, !0);
if (e.m_eventName) {
var s = !1;
e.m_exdata.hasOwnProperty("manual_catch") && (s = e.m_exdata.manual_catch);
s ? r.dispatchEvent(e.m_eventName, i, !0) : 200 == i.code && r.dispatchEvent(e.m_eventName, i.data, !0);
}
e.m_exdata.ev_key && r.removeEventListener(e.m_exdata.ev_key);
e.m_exdata.loading && r.dispatchEvent("HTTP_SHOW_LOADING", !1);
} else e.m_exdata.ignore_disconnect || e._fail(n);
};
var n = this.m_exdata.post;
if (n) {
t.open("POST", this.m_url, !0);
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.send(n);
} else {
t.open("GET", this.m_url, !0);
t.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
t.send();
}
};
e.prototype._fail = function(e) {
void 0 === e && (e = null);
if (!this.m_exdata.ignore_disconnect) {
var t = o.getManager();
this.m_resendHandler = t.addEventListener("HTTP_RESEND", this, this._onReSend.bind(this));
t.dispatchEvent("HTTP_SEND_FAIL", e);
}
};
e.prototype._onReSend = function(e) {
if (this.m_resendHandler) {
o.getManager().removeEventListener(this.m_resendHandler);
this.m_resendHandler = null;
if (e) {
this._refUrl();
this.send();
}
}
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../Manager": "Manager"
} ],
HttpDefense: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9dcaaZF9t5Ay4UW3xhat2ga", "HttpDefense");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../engine/Manager"), i = e("./Instance"), r = e("./ScriptManager"), a = e("../engine/script/ScriptDefine"), s = function() {
function e() {
this.m_curIdx = null;
this.m_round = null;
this.m_curIdx = 0;
this.m_round = 0;
o.getManager().addEventListener("HTTP_SEND_FAIL", this, this._onHttpSendFail.bind(this));
}
e.prototype.releaseSelf = function() {
o.getManager().removeEventListenerByTarget(this);
};
e.prototype._onHttpSendFail = function(e) {
var t = this;
do {
if (this.m_isOpering) break;
this.m_isOpering = !0;
o.getManager();
if (e && e && 505 == e.ret) {
o.getManager().msgBox("由于您长时间未操作，已经离线，是否重新登录？", function(e) {
o.getManager().replaceScene(i.default.STAGE.LOGIN_SCENE);
}, 0, !1);
break;
}
if (this.m_round > 2) {
o.getManager().msgBox("网络异常，请检查网络连接是否正常，是否再试一次？", function(e) {
t.m_isOpering = null;
if (0 == e) {
o.getManager().dispatchEvent("HTTP_RESEND", !1);
o.getManager().dispatchEvent("HTTP_REFUSE_TO_TRY_AGAIN");
} else t._changeIp();
}, 0, !1);
this.m_round = 0;
break;
}
this._changeIp();
} while (0);
};
e.prototype._changeIp = function() {
this.m_round++;
this.changeIP();
};
e.prototype.changeIP = function() {
this.m_script = new r.default(this, o.getManager().getHandyScript(i.default.JSON_HTTP));
this.m_script.setName("http");
};
e.prototype.onScriptOver = function() {
this.m_script = null;
this.m_isOpering = null;
o.getManager().dispatchEvent("HTTP_RESEND", !0);
};
e.prototype.callExFunc = function(e, t, n) {
var r = a.RETURN.RETURN_NORMAL;
if ("random" == e) n.push(i.default.random(t[0], t[1])); else if ("setIp" == e) {
var s = t[0];
0 == s && (s = null);
o.getManager().m_ip = s;
} else if ("setHttpURL" == e) o.getManager().m_url = t[0]; else if ("getHttpUrl" == e) n.push(o.getManager().getHttpUrlByChannelName()); else if ("getUrlPort" == e) n.push(o.getManager().getTCPPortByChannelName()); else if ("getCurIdx" == e) n.push(this.m_curIdx); else if ("setCurIdx" == e) this.m_curIdx = t[0]; else if ("parseInt" == e) n.push(parseInt(t[0])); else if ("decryption" == e) {
var c = o.getManager().decryption(t[0]);
n.push(c);
} else if ("downText" == e) {
this._downText(t[0]);
this.m_script.changeWaitCount(!0);
r = a.RETURN.RETURN_BREAK_THIS_FRAME;
} else r = a.RETURN.RETURN_NO_EXECUTE;
return r;
};
e.prototype._downText = function(e) {
var t = this, n = cc.loader.getXMLHttpRequest();
n.timeout = 1e4;
n.ontimeout = function() {
t.m_script.setFunctionResult("");
t.m_script.changeWaitCount(!1);
};
n.onerror = function() {
t.m_script.setFunctionResult("");
t.m_script.changeWaitCount(!1);
};
n.onreadystatechange = function() {
var e = "";
do {
if (4 != n.readyState) return;
var o = n.status;
if (!(o >= 200 && o < 300)) {
n.abort();
break;
}
e = n.responseText;
} while (0);
t.m_script.setFunctionResult(e);
t.m_script.changeWaitCount(!1);
};
n.open("GET", e, !0);
n.send();
};
return e;
}();
n.default = s;
cc._RF.pop();
}, {
"../engine/Manager": "Manager",
"../engine/script/ScriptDefine": "ScriptDefine",
"./Instance": "Instance",
"./ScriptManager": "ScriptManager"
} ],
IProcess: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "80741oLnltFFL0LlXOW1fPa", "IProcess");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
IncomeDetailsLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "46f1dt/Dv9MTJgSPU02D/dF", "IncomeDetailsLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
n = t;
t.prototype.onCreate = function(e) {
var t = this, o = e.AdIncome, i = e.MammonList, r = this.seekNodeByName("bg/scrollview/view/content"), s = this.seekNodeByName("item_1", r), c = this.seekNodeByName("item_2", r), l = this.seekNodeByName("bg/item_3");
l.active = !1;
var u = this.seekCompByName(cc.Label, "table1/gg_zrsy", s), m = this.seekCompByName(cc.Label, "table2/gg_lssy", s), p = this.seekCompByName(cc.Label, "bg1/cs_jrcc", c), h = this.seekCompByName(cc.Label, "bg1/cs_zrsy", c), _ = this.seekCompByName(cc.Label, "bg1/layout1/cs_total", c), d = this.seekCompByName(cc.Label, "bg1/layout2/cs_daichan", c), f = this.seekNodeByName("bg/button_close");
this.addTouchEventListener(f, function(e, n) {
2 == n && t.removeFromParent();
});
var y = this.seekNodeByName("img1/btn_fh", c);
this.addTouchEventListener(y, function(e, o) {
2 == o && t.addLayer(n.LAYER.IncomeFHLayer);
});
var g = this.seekNodeByName("img/btn_sy", s);
this.addTouchEventListener(g, function(e, o) {
2 == o && t.addLayer(n.LAYER.IncomeSYLayer);
});
u.string = o.yesterday_ad_amount;
m.string = o.ad_total_amount;
p.string = "今日产出： " + o.mammon_bonus.today_output_total + " 个";
h.string = o.mammon_bonus.apiece_income_amount;
_.string = o.mammon_bonus.network_total;
d.string = o.mammon_bonus.wait_output_total;
this.fastInitList(i.list, 8, function(e) {
var n = cc.instantiate(l);
n.parent = r;
n.active = !0;
n.x = 0;
for (var o = [ e.player_name, "获得一个分红财神", a.default.date_format("yyyy-MM-dd", e.create_time), e.phone, 1 == e.type ? "五福合成" : "随机合成分红财神", a.default.date_format("HH:mm:ss", e.create_time) ], i = 1; i < 7; i++) t.seekCompByName(cc.Label, "label_" + i, n).string = o[i - 1];
r.getComponent(cc.Layout).updateLayout();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
var n;
t.LAYER = {
IncomeFHLayer: [ 0, "scene/Common/IncomeDetails/IncomeFHLayer" ],
IncomeSYLayer: [ 1, "scene/Common/IncomeDetails/IncomeSYLayer" ]
};
return t = n = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
IncomeFHLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b82ccIon9tFML2+JbT/sLUZ", "IncomeFHLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("button_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
IncomeInfoLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "82196OK0wlEm5vJbiZVmQRV", "IncomeInfoLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg_1/button_back");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
IncomeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "81634ieRa1GI4MUq9vxA3On", "IncomeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.ren1 = null;
t.ren2 = null;
t.ren3 = null;
t.lssy1 = null;
t.lssy2 = null;
t.lssy3 = null;
t.lssy4 = null;
t.jrsy1 = null;
t.jrsy2 = null;
t.jrsy3 = null;
t.jrsy4 = null;
t.zrsy1 = null;
t.zrsy2 = null;
t.zrsy3 = null;
t.zrsy4 = null;
return t;
}
n = t;
t.prototype.onCreate = function(e) {
for (var t, n = 0, o = [ "bg/button_close", "bg/table_bg1/l2/btn_lssy_tdgx", "bg/tip2/btn_jrsy", "bg/btn_myTeam", "bg/btn_myIncome", "bg/btn_shareEWM", "bg/button_info", "bg/layout/btn_myteamhelp" ]; n < o.length; n++) {
var i = o[n], r = this.seekNodeByName(i);
this.addTouchEventListener(r, this.onBtnClick.bind(this));
}
this.ren1.string = e.apprentice_total + "人";
this.ren2.string = e.apprentice_son_total + "人";
this.ren3.string = e.team_total + "人";
this.lssy1.string = e.history_rebate.accumulate_amount + "元";
this.lssy2.string = e.history_rebate.apprentice_amount + "元";
this.lssy3.string = e.history_rebate.apprentice_son_amount + "元";
this.lssy4.string = e.history_rebate.team_amount + "元";
this.jrsy1.string = e.today_rebate.accumulate_amount + "元";
this.jrsy2.string = e.today_rebate.apprentice_amount + "元";
this.jrsy3.string = e.today_rebate.apprentice_son_amount + "元";
this.jrsy4.string = e.today_rebate.team_amount + "元";
this.zrsy1.string = e.yesterday_rebate.accumulate_amount + "元";
this.zrsy2.string = e.yesterday_rebate.apprentice_amount + "元";
this.zrsy3.string = e.yesterday_rebate.apprentice_son_amount + "元";
this.zrsy4.string = e.yesterday_rebate.team_amount + "元";
this.invite_url = e.invite_url || "";
for (var a = 1; a < 4; a++) {
t = this.seekNodeByName("bg/layout/btn_" + a);
this.addTouchEventListener(t, this.onBtnClick.bind(this));
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
switch (e.name) {
case "button_close":
this.removeFromParent();
break;

case "btn_lssy_tdgx":
this.addLayer(n.LAYER.PupilDevoteLayer);
break;

case "btn_jrsy":
this.addLayer(n.LAYER.TodayPredictIncomeLayer);
break;

case "btn_myTeam":
this.addLayer(n.LAYER.MyTeamLayer);
break;

case "btn_myIncome":
this.addLayer(n.LAYER.MyIncomeLayer);
break;

case "btn_shareEWM":
this.addLayer(a.default.LAYER.ShareLayer);
break;

case "button_info":
this.addLayer(n.LAYER.IncomeInfoLayer);
break;

case "btn_1":
this.addLayer(n.LAYER.MyTeamLayer, 0);
break;

case "btn_2":
this.addLayer(n.LAYER.MyTeamLayer, 1);
break;

case "btn_3":
this.addLayer(n.LAYER.MyTeamLayer, 2);
break;

case "btn_myteamhelp":
this.addLayer(n.LAYER.IncomeMyTeamLayer);
}
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
var n;
t.LAYER = {
PupilDevoteLayer: [ 0, "scene/Common/Income/PupilDevoteLayer" ],
TodayPredictIncomeLayer: [ 1, "scene/Common/Income/TodayPredictIncomeLayer" ],
MyIncomeLayer: [ 2, "scene/Common/Income/MyIncomeLayer" ],
MyTeamLayer: [ 3, "scene/Common/Income/MyTeamLayer" ],
IncomeInfoLayer: [ 4, "scene/Common/Income/IncomeInfoLayer" ],
IncomeMyTeamLayer: [ 5, "scene/Common/IncomeDetails/IncomeMyTeamLayer" ]
};
i([ l(cc.Label) ], t.prototype, "ren1", void 0);
i([ l(cc.Label) ], t.prototype, "ren2", void 0);
i([ l(cc.Label) ], t.prototype, "ren3", void 0);
i([ l(cc.Label) ], t.prototype, "lssy1", void 0);
i([ l(cc.Label) ], t.prototype, "lssy2", void 0);
i([ l(cc.Label) ], t.prototype, "lssy3", void 0);
i([ l(cc.Label) ], t.prototype, "lssy4", void 0);
i([ l(cc.Label) ], t.prototype, "jrsy1", void 0);
i([ l(cc.Label) ], t.prototype, "jrsy2", void 0);
i([ l(cc.Label) ], t.prototype, "jrsy3", void 0);
i([ l(cc.Label) ], t.prototype, "jrsy4", void 0);
i([ l(cc.Label) ], t.prototype, "zrsy1", void 0);
i([ l(cc.Label) ], t.prototype, "zrsy2", void 0);
i([ l(cc.Label) ], t.prototype, "zrsy3", void 0);
i([ l(cc.Label) ], t.prototype, "zrsy4", void 0);
return t = n = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
IncomeMyTeamLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4a86e7JhtFEGJQNmFryhDQk", "IncomeMyTeamLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("button_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
IncomeSYLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6d9cdNsiE9Isou01Tb4VuBQ", "IncomeSYLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("button_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
Instance: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f0385K6aDxGAb7tQzzQRIyr", "Instance");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r, a = e("../engine/Manager"), s = e("./HttpDefense"), c = e("../scene/Common/Popup/TipsLayer"), l = e("../engine/Utils/UserDefault"), u = e("./BighornTcpAgent"), m = cc._decorator, p = m.ccclass;
m.property;
(function(e) {
e[e.EVENT = 0] = "EVENT";
e[e.TCP_WAIT = 1] = "TCP_WAIT";
e[e.TOAST = 2] = "TOAST";
e[e.INTO_GAME = 4] = "INTO_GAME";
e[e.ADD_LAYER = 5] = "ADD_LAYER";
e[e.CTRL_TCP = 6] = "CTRL_TCP";
})(r || (r = {}));
var h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_url = null;
t.m_ver = "1.0.0";
t.m_verCode = 1;
t.m_userData = null;
t.m_configData = null;
t.m_msgData = [];
t.m_shopInfo = null;
t.m_buyshopid = 0;
t.m_httpDefense = null;
t.m_heartbeat = 10;
t.m_bigHornEnabled = 1;
t.m_bigHornTcp = null;
t.noticeInfo = "";
t.m_taskData = null;
t.m_lastSyncTime = 0;
t.m_onlineTime = -1;
t.m_ip = null;
t.m_lastSeekAdTime = 0;
t.m_inviteRedN = 0;
t.m_projectInfo = null;
t.liuHaiH = 0;
return t;
}
n = t;
t.prototype.reset = function() {
this.m_userData = null;
this.m_configData = null;
this.m_msgData = [];
this.m_shopInfo = null;
this.m_buyshopid = 0;
this.m_heartbeat = 10;
if (this.m_bigHornTcp) {
this.m_bigHornTcp.releaseSelf();
this.m_bigHornTcp = null;
}
this.noticeInfo = "";
this.m_taskData = null;
this.m_lastSyncTime = 0;
this.m_onlineTime = -1;
this.m_lastSeekAdTime = 0;
this.m_inviteRedN = 0;
};
t.prototype.setInviteRed = function(e) {
this.m_inviteRedN = e;
a.getManager().dispatchEvent("INVITE_RED_CHANGE", e);
};
t.prototype.addInviteRed = function(e) {
this.m_inviteRedN += e;
a.getManager().dispatchEvent("INVITE_RED_CHANGE", this.m_inviteRedN);
};
t.prototype.replaceScene = function(e, t) {
void 0 === t && (t = null);
if (-1 != e.indexOf("LoginScene")) {
if (-1 != a.getManager().getCurScene().m_name.indexOf("LoginScene")) {
a.getManager().addCmd(this, a.default.CMDS.END_GAME);
return !0;
}
}
return !1;
};
t.prototype.loadSceneOver = function(e) {
-1 != e.indexOf("LoginScene") && this.reset();
};
t.prototype.setTaskData = function(e) {
this.m_taskData = e;
if (-1 == this.m_onlineTime) {
for (var t = 0, o = 0, i = e; o < i.length; o++) {
(l = i[o]).type == n.TASK_TYPE.ONLINE && (t = Math.max(t, l.progress));
}
this.m_onlineTime = t;
}
for (var r = 0, s = 0, c = this.m_taskData; s < c.length; s++) {
var l;
1 == (l = c[s]).status && r++;
}
a.getManager().dispatchEvent("RWNUMBS_CHANGE", r);
};
t.random = function(e, t) {
var n = t + 1 - e;
return Math.floor(Math.random() * (100 + n)) % n + e;
};
t.prototype.resetHeartBeat = function() {
this.m_configData && (this.m_heartbeat = Number(this.m_configData.heartbeat));
};
t.prototype.onUpdate = function(e) {
if (this.m_userData && this.m_configData) if (this.m_heartbeat > 0) this.m_heartbeat -= e; else {
this.resetHeartBeat();
a.getManager().sendUrl({
action: "Income",
param: JSON.stringify({
total: 0
})
}, null, {
ignore_disconnect: !0
});
}
};
t.prototype.getUpdateMeta = function(e) {
return String(a.getManager().m_jsons[n.JSON_INDEX_INFO].json[e]);
};
t.prototype.getUpdateInt = function(e) {
return Number(a.getManager().m_jsons[n.JSON_INDEX_INFO].json[e]);
};
t.prototype.getMeta = function(e) {
return String(this.m_projectInfo[e]);
};
t.prototype.getMetaInt = function(e) {
return Number(this.m_projectInfo[e]);
};
t.prototype.getHandyScript = function(e) {
return a.getManager().m_jsons[e];
};
t.prototype.userAddGold = function(e) {
var t;
t = 0 == e.indexOf("-") ? n.string_sub(this.m_userData.gold, String(e).substr(1)) : n.string_add(this.m_userData.gold, String(e));
this.setUserGold(t);
};
t.prototype.msgBox = function(e, t, o, i) {
void 0 === t && (t = null);
void 0 === o && (o = 0);
void 0 === i && (i = !0);
this.addLayer(n.LAYER.POPUP, [ t, e, o, i ]);
};
t.prototype.setUserGold = function(e) {
this.m_userData.gold = e;
a.getManager().dispatchEvent("GOLD_CHANGE", null, !0);
};
t.dump = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = 3);
};
t.prototype.cmdToast = function(e) {
var t = a.getManager().getCurScene();
if (t.hasLayer(n.LAYER.ToastLayer)) {
t.getLayer(n.LAYER.ToastLayer).createItem(e);
} else this.addLayer(n.LAYER.ToastLayer, e);
};
t.prototype.addLayer = function(e, t) {
void 0 === t && (t = null);
a.getManager().getCurScene().addLayer(e, t);
};
t.prototype.releaseSelf = function() {
if (this.m_httpDefense) {
this.m_httpDefense.releaseSelf();
this.m_httpDefense = null;
}
this.reset();
};
t.prototype.removeLayer = function(e) {
a.getManager().getCurScene().removeLayer(e);
};
t.prototype.onInitLayer = function(e) {};
t.nums = function(e) {
var t = 0;
for (var n in e) t++;
return t;
};
t.date_format = function(e, t) {
var n = new Date(1e3 * Number(t)), o = function(e) {
return (e < 10 ? "0" : "") + e;
};
return e.replace(/yyyy|MM|dd|HH|mm|ss/g, function(e) {
switch (e) {
case "yyyy":
return o(n.getFullYear());

case "MM":
return o(n.getMonth() + 1);

case "mm":
return o(n.getMinutes());

case "dd":
return o(n.getDate());

case "HH":
return o(n.getHours());

case "ss":
return o(n.getSeconds());
}
});
};
t.prototype.onBigHornChat = function(e) {
if (1 == this.m_bigHornEnabled) {
this.m_msgData.unshift(e.msg);
this.m_msgData.length > 50 && this.m_msgData.splice(this.m_msgData.length - 1, 1);
a.getManager().dispatchEvent("BigHorn_CHAT_CHANGE");
}
};
t.prototype.setBigHornEable = function(e) {
this.m_bigHornEnabled = e ? 1 : 0;
a.getManager().dispatchEvent("BIGHORN_ENABLED", e);
};
t.prototype.getTaskReward = function(e) {
do {
for (var t = !1, n = 0, o = this.m_taskData; n < o.length; n++) {
if ((c = o[n]).id == e) {
c.status = 2;
t = !0;
break;
}
}
if (!t) break;
for (var i = 0, r = 0, s = this.m_taskData; r < s.length; r++) {
var c;
1 == (c = s[r]).status && i++;
}
a.getManager().dispatchEvent("RWNUMBS_CHANGE", i);
} while (0);
};
t.prototype.RefreshTheTask = function(e, t) {
void 0 === t && (t = 1);
for (var o = 0, i = 0, r = this.m_taskData; i < r.length; i++) {
var s = r[i];
if (Number(s.type) == e && 0 == Number(s.status)) {
var c = 1;
s.hasOwnProperty("num") && (c = Number(s.num));
var l = 0;
s.hasOwnProperty("progress") && (l = Number(s.progress));
t < 0 ? l = -1 * t : l += t;
s.progress = l;
if (l >= c) {
s.status = 1;
o++;
}
}
}
if (o > 0) {
for (var u = 0, m = 0, p = this.m_taskData; m < p.length; m++) {
0 != p[m].status && u++;
}
if (u == this.m_taskData.length - 1) for (var h = 0, _ = this.m_taskData; h < _.length; h++) {
s = _[h];
if (Number(s.type) == n.TASK_TYPE.THE_ULTIMATE_TREASURE_CHEST && 0 == Number(s.status)) {
s.status = 1;
break;
}
}
for (var d = 0, f = 0, y = this.m_taskData; f < y.length; f++) {
1 == (s = y[f]).status && d++;
}
a.getManager().dispatchEvent("RWNUMBS_CHANGE", d);
}
};
t.prototype.initBigHorn = function() {
if (!this.m_bigHornTcp) {
var e = this.m_configData.bighorn;
if (e && 1 == e.open) {
this.m_bigHornTcp = new u.default();
this.m_bigHornTcp.setIpPort(e.ip, e.port);
this.m_bigHornTcp.reconnect();
}
this.m_msgData = [];
}
};
t.prototype.AcrossTheDay = function() {
l.default.getInstance().deleteValueForKey("StealVegetablesPickId");
};
t.prototype.onInit = function(e) {
var t = this;
this.m_projectInfo = JSON.parse(a.default.helper({
cmd: "packageInfo",
path: "info.json"
}).trim());
var o = a.default.helper({
cmd: "liuHaiH"
});
this.liuHaiH = Number(o);
var i = this.getUpdateMeta("wxappid"), r = this.getUpdateMeta("universalLink");
a.default.helper({
cmd: "registerWX",
appid: i,
universalLink: r
});
this.m_url = this.getHttpUrlByChannelName();
this.m_ver = this.getMeta("versionName");
a.getManager().addEventListener("BigHorn_CHAT", this, this.onBigHornChat.bind(this));
jsb.onStringEvent = function(e) {
for (var t = 0; t < 3; ) try {
var n = void 0;
if (1 == t) e = (e = (e = e.replace(/\n/g, "\\n")).replace(/\r/g, "\\r")).replace(/\t/g, "\\t"); else if (2 == t) {
var o = e.indexOf('"cmd"');
if (-1 == o) break;
if (-1 == (o = e.indexOf(":", o))) break;
if (-1 == (o = e.indexOf('"', o))) break;
o++;
var i = e.indexOf('"', o), r = e.substring(o, i);
a.getManager().dispatchEvent(r, {});
break;
}
var s = (n = JSON.parse(e)).cmd;
delete n.cmd;
a.getManager().dispatchEvent(s, n);
break;
} catch (e) {} finally {
t++;
}
};
this.m_httpDefense = new s.default();
var c = {};
c[n.LAYER.POPUP[1]] = e[0];
c[n.LAYER.ProgressLayer[1]] = e[1];
c[n.LAYER.ToastLayer[1]] = e[2];
c[n.LAYER.LoadLayer[1]] = e[3];
c[n.LAYER.ShowAddMoney[1]] = e[4];
c[n.LAYER.NOTICE[1]] = e[5];
a.getManager()._pushLoadRes(c);
a.getManager().addEventListener("HTTP_SHOW_LOADING", this, function(e) {
e ? t.addLayer(n.LAYER.LoadLayer) : t.removeLayer(n.LAYER.LoadLayer);
});
"android" == a.default.platform() && a.getManager().addEventListener("KEYCODE_BACK", this, function() {
a.getManager().getCurScene().onBack();
});
a.getManager().addEventListener("onAdClose", this, function() {
t.m_lastSeekAdTime = new Date().getTime();
});
a.getManager().addEventListener("HTTP_REFUSE_TO_TRY_AGAIN", this, function() {
a.getManager().replaceScene(n.STAGE.LOGIN_SCENE);
});
a.getManager().addEventListener("HTTP_CALLBACK", this, function(e) {
do {
if (!e) break;
if (200 != e.code) {
100201 == e.code ? t.msgBox(e.desc, function() {
a.getManager().replaceScene(n.STAGE.LOGIN_SCENE);
}, 1, !1) : t.cmdToast(e.desc);
break;
}
var o = e.data;
if (!o) break;
if (o.playinfo) {
var i = l.default.getInstance(), r = i.getIntegerForKey("MORNING_TIME", 0), s = t.morningTime(Number(o.playinfo.update_time));
if (s != r) {
i.setIntegerForKey("MORNING_TIME", s);
t.AcrossTheDay();
}
t.m_lastSyncTime = Number(o.playinfo.update_time);
t.m_userData = o.playinfo;
t.resetHeartBeat();
t.m_userData.level = Math.max(1, Number(t.m_userData.level));
t.m_userData.zpnums = 0;
t.m_userData.daycash = o.daycash ? Number(t.m_userData.daycash) : 0;
o.yesterday_income && (t.m_userData.yesterday_income = o.yesterday_income);
o.cashlevel && (t.m_userData.cashlevel = o.cashlevel);
o.roulette && (t.m_userData.roulette = o.roulette);
t.m_userData.ownermb = 0;
if (o.configData) {
t.m_configData = o.configData;
var c = o.configData.cdn;
if (c) {
var u = l.default.getInstance();
if ("" == u.getStringForKey("IP_URL", "") || 1 == c.refresh) {
u.setStringForKey("IP_URL", c.url);
u.setStringForKey("zoneIP", c.zone.toString());
}
}
}
t.initBigHorn();
}
o.gold && t.setUserGold(o.gold);
if (o.ownermb) {
var m = Number(o.ownermb);
if (m != t.m_userData.ownermb) {
a.getManager().dispatchEvent("RMB_CHANGE");
t.m_userData.ownermb = m;
}
}
if (o.yesterday_income) {
var p = Number(o.yesterday_income);
if (p != t.m_userData.yesterday_income) {
a.getManager().dispatchEvent("yesterday_income");
t.m_userData.yesterday_income = p;
}
}
o.income && t.setIncome(o.income);
o.zpnums && (t.m_userData.zpnums = Number(o.zpnums));
o.level && t.setLevelUp(Number(o.level));
o.myshoprice && t.setShopInfo(o.myshoprice);
if (o.baseprice) for (var h = 0, _ = 0, d = o.baseprice; _ < d.length; _++) {
var f = d[_];
t.m_shopInfo[h++].baseprice = f;
}
o.buyshopid && (t.m_buyshopid = o.buyshopid);
} while (0);
var y = e.__URL__;
if (-1 != y.indexOf("action=Merge&")) t.RefreshTheTask(n.TASK_TYPE.MERGE); else if (-1 != y.indexOf("action=Income&") && 200 == e.code && t.m_lastSyncTime > 0) {
var g = Math.floor((Number(e.data.sync_time) - t.m_lastSyncTime) / 60);
t.RefreshTheTask(n.TASK_TYPE.ONLINE, -(g + t.m_onlineTime));
}
-1 != y.indexOf("total") && t.resetHeartBeat();
});
return n.STAGE.LOGIN_SCENE;
};
t.prototype.showAddGold = function(e) {
a.getManager().getCurScene().addLayer(n.LAYER.ShowAddMoney, e);
};
t.prototype.setIncome = function(e) {
this.m_userData.income = e;
};
t.prototype.setLevelUp = function(e) {
e = Math.max(1, Number(e));
if (this.m_userData.level != e) {
this.m_userData.level = e;
a.getManager().dispatchEvent("USER_LEVEL_UP", e);
}
};
t.prototype.setShopInfo = function(e) {
this.m_shopInfo = e;
};
t.prototype.getHttpUrlByChannelName = function() {
return "http://api.yile77.com/api.php";
};
t.prototype.getTCPPortByChannelName = function() {
return 16918;
};
t.prototype.decryption = function(e) {
for (var t = {}, n = 0, o = 0, i = [ "a7Y", "9YY", "MWK", "MWk", "yHJ", "d4U", "HDc", "sKu", "Rf0", "Xkx", "LFR", "QX9", "LOA", "jZh", "Xnr", "BVO", "4cp", "In3", "Kon", "ctp", "vaH", "TYR", "phX", "KAv", "yY0", "BhB", "5l3", "uLT", "ZV7", "otk", "RqR", "u9T", "skb", "whB", "KN3", "iAh", "kKe", "haP", "B9l", "ppM", "Ojw", "D3n", "Aln", "p2P", "9Gp", "YOZ", "HhW", "mz6", "4ya", "BzM", "Kly", "jg1", "7Dh", "s1i", "ugQ", "wbq", "nzu", "S4H", "Ze9", "ZrK", "qrK", "uHR", "fzF", "SrO", "1oA", "9Vy", "B1t", "rNq", "DoV", "RA8", "VYa", "NWZ", "RKt", "oCo", "FA2", "x9b", "uqk", "sRx", "c74", "WKA", "PQ5", "P4j", "Nv4", "0V7", "r4H", "5xq", "m9k", "jz7", "nmc", "Bnc", "fk5", "LpW", "iWW", "G7f", "IhY", "QW8", "yy8", "sjJ", "WSF", "VSz", "YzS", "j1Y", "22T", "LWm", "oVB", "LJE", "V2R", "Hhl", "0fD", "Y2h", "oQT", "Rgm", "2Cf", "Ixs", "MB8", "MJU", "vB1", "WBY", "xC9", "vbc", "TsZ", "sgx", "F2n", "Lvk", "akI", "gFL", "SDw", "yLE" ]; o < i.length; o++) {
t[i[o]] = n;
n++;
}
e.substr(0, 3);
for (var r = e.length, a = [], s = 0, c = Math.floor(r / 3), l = [], u = 0; u < c; u++) {
var m = e.substr(s, 3);
l.push(String.fromCharCode(t[m]));
s += 3;
}
for (var p = "", h = 0, _ = l; h < _.length; h++) {
p += _[h];
}
a.push(p);
return a;
};
t.prototype.onSendUrl = function(e, t) {
null == t.ignore_ver && (e.ver = this.m_ver);
if (this.m_userData) {
e.uid = this.m_userData.id;
if (!this.m_userData.skey) throw "没有skey." + JSON.stringify(e);
e.skey = this.m_userData.skey;
}
};
t.glodConverToString = function(e) {
if (e.length < 4) return e;
for (var t = String(e), n = t = t.trim(), o = t.length, i = !1, r = 0, a = [ [ 45, 42, "j" ], [ 42, 39, "i" ], [ 39, 36, "h" ], [ 36, 33, "g" ], [ 33, 30, "f" ], [ 30, 27, "e" ], [ 27, 24, "d" ], [ 24, 21, "c" ], [ 21, 18, "b" ], [ 18, 15, "a" ], [ 15, 12, "T" ], [ 12, 9, "B" ], [ 9, 6, "M" ], [ 6, 3, "K" ] ]; r < a.length; r++) {
var s = a[r];
if (o > s[1]) {
var c = o - s[1];
n = t.substr(0, c) + "." + t.substr(c, 1) + s[2];
i = !0;
break;
}
if (i) break;
}
return n;
};
t.string_percent = function(e, t) {
var n = 0;
do {
if (Math.max(t.length, e.length) < 10) {
n = Number(e) / Number(t);
break;
}
var o = t.length - e.length;
if (o > 2) break;
if (o < 0) {
n = 100;
break;
}
o = Math.min(t.length, e.length) - 3;
n = Number(e.substring(0, e.length - o)) / Number(t.substring(0, t.length - o));
} while (0);
return n;
};
t.string_cmp = function(e, t) {
var n = 0;
do {
e = this.remove_left_zero(String(e).trim());
t = this.remove_left_zero(String(t).trim());
var o = e.length, i = o - t.length;
if (0 != i) {
n = i;
break;
}
for (var r = 0; r < o; r++) {
var a = Number(e.charAt(r)), s = Number(t.charAt(r));
if (a != s) {
0 != (i = a - s) && (n = i);
break;
}
}
} while (0);
return n;
};
t.string_sub = function(e, t) {
var n = this.string_cmp(e, t);
if (0 == n) return "0";
e = this.remove_left_zero(String(e).trim());
t = this.remove_left_zero(String(t).trim());
var o = n < 0;
if (o) {
var i = e;
e = t;
t = i;
}
for (var r = "", a = e.length, s = t.length, c = Math.max(a, s), l = 1, u = 0; u < c; u++) {
var m = 0;
u < a && (m = Number(e.charAt(a - (u + 1))));
var p = 0;
u < s && (p = Number(t.charAt(s - (u + 1))));
var h = m - p - (1 == l ? 0 : 1);
0 == (l = h < 0 ? 0 : 1) && (h += 10);
r = h + r;
}
r = this.remove_left_zero(r);
o && (r = "-" + r);
return r;
};
t.remove_left_zero = function(e) {
for (var t = 0, n = 0; n < e.length && "0" == e.charAt(n); n++) t++;
t > 0 && (e = e.substr(t));
return e;
};
t.string_add = function(e, t) {
e = this.remove_left_zero(String(e).trim());
t = this.remove_left_zero(String(t).trim());
for (var n = "", o = e.length, i = t.length, r = Math.max(o, i), a = 0, s = 0; s < r; s++) {
var c = 0;
s < o && (c = Number(e.charAt(o - (s + 1))));
var l = 0;
s < i && (l = Number(t.charAt(i - (s + 1))));
var u = c + l + a;
a = u >= 10 ? 1 : 0;
n = (u %= 10) + n;
}
1 == a && (n = "1" + n);
return n;
};
t.prototype.copyToCilp = function(e) {
a.default.helper({
cmd: "copy",
string: e
});
};
t.prototype.createQRCode = function(e, t, n) {
var o;
do {
var i = l.default.getInstance().getStringForKey(e, ""), r = jsb.fileUtils, s = r.getWritablePath() + e;
o = s + "/haha.jpg";
if (t == i) break;
r.removeDirectory(s);
r.createDirectory(s);
var c = "152", u = "152";
if (n) {
c = n.width;
u = n.height;
}
var m = {
cmd: "qrcode",
width: c,
height: u,
url: t,
path: o
}, p = a.default.platform();
if ("android" == p) jsb.CMiscHelper.InteractiveFunction(JSON.stringify(m)); else {
if ("ios" != p) {
o = null;
break;
}
jsb.IOSHelper.InteractiveFunction(JSON.stringify(m));
}
l.default.getInstance().setStringForKey(e, t);
} while (0);
return o;
};
t.prototype.getClip = function() {
return "";
};
t.prototype.seekAd = function(e, t, o, i) {
var r = this;
void 0 === o && (o = null);
void 0 === i && (i = null);
do {
var s = Math.floor((new Date().getTime() - this.m_lastSeekAdTime) / 1e3);
if (s < 15) {
this.cmdToast("广告冷却中，剩余" + (15 - s) + "秒");
break;
}
if (this.m_userData.video_num < 1) {
this.m_userData.invite_num > 0 ? a.getManager().getCurScene().addLayer(n.LAYER.TipsLayer, {
type: c.default.TYPE.Tips,
btnType: c.default.BTN_TYPE.Use,
content: c.default.Content.Use,
num: this.m_userData.invite_num,
func: function(n) {
if (1 == n) {
(o = o || {}).p = t;
e.sendUrl({
action: "InviteCard",
param: JSON.stringify(o)
}, function(e) {
r.m_userData.invite_num = e.invite_num;
i && i(t);
});
}
}
}) : a.getManager().getCurScene().addLayer(n.LAYER.TipsLayer, {
type: c.default.TYPE.Tips,
btnType: c.default.BTN_TYPE.Confirm,
content: c.default.Content.Confirm
});
break;
}
e.addLayer(n.LAYER.ADLayer, {
type: t,
ex_data: o,
func: i
});
} while (0);
};
t.prototype.shareToWx = function(e, t, n, o, i, r, s) {
void 0 === e && (e = 1);
void 0 === t && (t = 0);
void 0 === n && (n = "");
void 0 === o && (o = "");
void 0 === i && (i = "");
void 0 === r && (r = "");
void 0 === s && (s = "");
if (1 == this.m_configData.sharetype) a.default.helper({
cmd: "share_img",
path: i,
is_assets: !1
}); else {
var c = this.m_configData.wxappid, l = Math.floor(Math.random() * c.length), u = c[Math.min(l, c.length - 1)];
a.default.helper({
cmd: "shareToWX",
type: e,
towhere: t,
title: n,
text: o,
path: i,
url: r,
appid: u
});
}
};
t.prototype.encodeName = function(e) {
return e.substring(1, e.length - 1);
};
t.prototype.parseName = function(e, t, n) {
void 0 === n && (n = !0);
if (!t || e < 1) return "";
for (var o = t.length, i = 0, r = 0; i < o && e > 0 && !(e < (r = t.charCodeAt(i) < 256 ? 1 : 2)); ) {
e -= r;
i++;
}
var a = t.substr(0, i);
i < o && n && (a += "...");
return a;
};
t.prototype.showrewardAd = function(e) {
var t = this.m_configData.csj_adIds, n = e.position_code - 1;
n >= t.length && (n = 0);
var o = t[n];
a.default.helper({
cmd: "setAdId",
code: Number(o)
});
a.default.helper({
cmd: "showRewardAd",
data: JSON.stringify(e)
});
};
t.prototype.createTime = function(e, t, n) {
void 0 === n && (n = null);
n ? this.scheduleOnce(e, t) : this.schedule(e, t, cc.macro.REPEAT_FOREVER, 0);
return e;
};
t.prototype.removeTime = function(e) {
this.unschedule(e);
};
t.prototype.morningTime = function(e) {
return e - (e + 28800) % 86400;
};
var n;
t.JSON_INDEX_INFO = 0;
t.JSON_BIGHORN = 1;
t.JSON_LOGIN = 2;
t.JSON_HTTP = 3;
t.TASK_TYPE = {
LOGIN: 1,
MERGE: 2,
SPPED_UP: 3,
ROTARY_TABLE: 4,
ONLINE: 5,
SEE_THE_VIDEO: 6,
STEALING_FOOD: 7,
THE_ULTIMATE_TREASURE_CHEST: 8
};
t.STAGE = {
LOGIN_SCENE: "scene/Login/LoginScene",
HALL_SCENE: "scene/Hall/HallScene"
};
t.LAYER = {
ProgressLayer: [ 100, "scene/Common/ProgressLayer" ],
POPUP: [ 101, "scene/Common/PopUpLayer" ],
ToastLayer: [ 102, "scene/Common/ToastLayer" ],
TaskLayer: [ 103, "scene/Common/TaskLayer" ],
ShopLayer: [ 104, "scene/Common/ShopLayer" ],
LoadLayer: [ 105, "scene/Common/LoadLayer" ],
ListLayer: [ 106, "scene/Common/ListLayer" ],
RotaryTableLayer: [ 107, "scene/Common/RotaryTableLayer" ],
GuideLayer: [ 108, "scene/Common/GuideLayer" ],
RewardLayer: [ 109, "scene/Common/RewardLayer" ],
ShowAddMoney: [ 110, "scene/Common/ShowAddMoney" ],
SpeedLayer: [ 111, "scene/Common/Popup/SpeedLayer" ],
VegetalbeRecylingLayer: [ 112, "scene/Common/Popup/VegetableRecyclingLayer" ],
ADLayer: [ 114, "scene/Common/ADLayer" ],
LoginGameLayer: [ 115, "scene/Common/LoginGameLayer" ],
RedPackageLayer: [ 116, "scene/Common/RedPackageLayer" ],
InviteLayer: [ 117, "scene/Common/InviteLayer" ],
CashOutLayer: [ 118, "scene/Common/CashOutLayer" ],
CashOutHistoryLayer: [ 119, "scene/Common/CashOutHistoryLayer" ],
TipsLayer: [ 120, "scene/Common/Popup/TipsLayer" ],
GonglveLayer: [ 121, "scene/Common/GonglveLayer" ],
IncomeLayer: [ 122, "scene/Common/Income/IncomeLayer" ],
IncomeDetailsLayer: [ 123, "scene/Common/IncomeDetails/IncomeDetailsLayer" ],
SearchTarget: [ 125, "scene/Common/StealVegetables/SearchTargetLayer" ],
StealVegetables: [ 126, "scene/Common/StealVegetables/StealVegetablesLayer" ],
MessageLayer: [ 127, "scene/Common/MessageLayer" ],
NOTICE: [ 128, "scene/Common/NoticeLayer" ],
GuideQuickenLayer: [ 129, "scene/Common/GuideQuickenLayer" ],
HallLayer: [ 130, "scene/Hall/HallLayer" ],
MarqueeLayer: [ 131, "scene/Common/MarqueeLayer" ],
ShareLayer: [ 132, "scene/Common/ShareLayer" ],
LoginLayer: [ 133, "scene/Login/LoginLayer" ],
UpdateLayer: [ 134, "scene/Login/UpdateLayer" ],
BindPhoneLayer: [ 135, "scene/Common/BindPhoneLayer" ],
FreeSaveOrUpLayer: [ 136, "scene/Common/FreeSaveOrUpLayer" ],
KeFuLayer: [ 137, "scene/Common/KeFuLayer" ]
};
return t = n = i([ p ], t);
}(cc.Component);
n.default = h;
cc._RF.pop();
}, {
"../engine/Manager": "Manager",
"../engine/Utils/UserDefault": "UserDefault",
"../scene/Common/Popup/TipsLayer": "TipsLayer",
"./BighornTcpAgent": "BighornTcpAgent",
"./HttpDefense": "HttpDefense"
} ],
InviteLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "910d6UaCeRB44M2/cJi+5vh", "InviteLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.redicon = [];
t.txtbgicon = [];
t.gqani = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(t, this.clickButton.bind(this));
var n = this.seekNodeByName("bg_1/img_bg1/img_bg3/button_invitefriend");
this.addTouchEventListener(n, this.clickButton.bind(this));
this.m_red = [];
this.m_gbg = [];
for (var o = 1; o < 8; o++) {
var i = this.seekNodeByName("bg_1/img_bg1/img_bg2/img_bg3/img_red" + o);
this.m_red.push(i);
var r = this.seekNodeByName("bg_1/img_bg1/img_bg2/img_bg3/img_g" + o);
this.m_gbg.push(r);
}
this.quannum = this.seekCompByName(cc.Label, "bg_1/img_bg1/img_bg3/label2");
this.quannum.string = this.m_manager.m_userData.invite_num + "张";
this.InviteState(e);
};
t.prototype.InviteState = function(e) {
this.m_reddata = e;
var t = 0, n = 0;
for (var o in e.red) {
1 == e.red[o] && t++;
this.refRedState(this.m_red[n], {
state: e.red[o],
index: o,
gbg: this.m_gbg[n],
idx: n
});
n++;
}
this.m_manager.setInviteRed(t);
};
t.prototype.refRedState = function(e, t) {
var n = this.seekNodeByName("img_3", e), o = this.seekNodeByName("label", n);
if (2 == t.state) {
t.gbg.active = !1;
o.active = !1;
e.getComponent(cc.Sprite).spriteFrame = this.redicon[0];
(i = n.getComponent(cc.Sprite)).spriteFrame = this.txtbgicon[1];
i.sizeMode = cc.Sprite.SizeMode.TRIMMED;
i.type = cc.Sprite.Type.SIMPLE;
} else if (1 == t.state) {
o.active = !1;
t.gbg.active = !0;
e.getComponent(cc.Sprite).spriteFrame = this.redicon[0];
var i;
(i = n.getComponent(cc.Sprite)).spriteFrame = this.txtbgicon[2];
i.sizeMode = cc.Sprite.SizeMode.TRIMMED;
i.type = cc.Sprite.Type.SIMPLE;
e.index = t.index;
e.idx = t.idx;
if (e.isinit) e.getComponent(cc.Button).interactable = !0; else {
this.addTouchEventListener(e, this.ClickRed.bind(this));
e.isinit = !0;
}
} else {
o.active = !0;
t.gbg.active = !1;
o.getComponent(cc.Label).string = "邀请" + t.index + "个好友";
e.getComponent(cc.Sprite).spriteFrame = this.redicon[1];
n.getComponent(cc.Sprite).spriteFrame = this.txtbgicon[0];
}
};
t.prototype.ClickRed = function(e, t) {
if (2 == t) {
this.m_clickpos = e.index;
this.m_clickidx = e.idx;
this.sendUrl({
action: "InviteReceive",
param: JSON.stringify({
pos: Number(this.m_clickpos)
})
}, this.ClickRedCallback.bind(this), {
loading: !0
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.ClickRedCallback = function(e) {
var t = this, n = this.m_clickidx, o = this.m_red[n], i = this.m_gbg[n], r = this.seekNodeByName("img_3", o), s = this.seekNodeByName("label", r);
i.active = !1;
s.active = !1;
o.getComponent(cc.Sprite).spriteFrame = this.redicon[0];
r.getComponent(cc.Sprite).spriteFrame = this.txtbgicon[1];
this.addLayer(a.default.LAYER.RewardLayer, {
type: 1,
value: e.money,
func: function() {
t.dispatchEvent("RMB_CHANGE");
}
});
o.getComponent(cc.Button).interactable = !1;
this.m_manager.m_userData.invite_num = e.invite_num;
this.quannum.string = this.m_manager.m_userData.invite_num + "张";
this.m_manager.addInviteRed(-1);
this.m_reddata.red[this.m_clickpos] = 2;
var c = !0;
for (var l in this.m_reddata.red) if (2 != this.m_reddata.red[l]) {
c = !1;
break;
}
c && this.sendUrl({
action: "Invite",
param: JSON.stringify({})
}, function(e) {
t.InviteState(e);
}, {
loading: !0
});
};
t.prototype.clickButton = function(e, t) {
if (2 == t) {
var n = e.name;
"button_close" == n ? this.removeFromParent() : "button_invitefriend" == n && this.addLayer(a.default.LAYER.ShareLayer);
}
};
i([ l(cc.SpriteFrame) ], t.prototype, "redicon", void 0);
i([ l(cc.SpriteFrame) ], t.prototype, "txtbgicon", void 0);
i([ l(sp.SkeletonData) ], t.prototype, "gqani", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
JSEvent: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a3bb50z+4FKDanrYHheQ5NM", "JSEvent");
var o = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("../Manager"), r = cc._decorator, a = r.ccclass, s = (r.property, function() {
function e() {
this.m_events = {};
this.m_cmds = [];
this.m_count = 0;
}
t = e;
e.getInstance = function() {
t.m_instance || (t.m_instance = new t());
return t.m_instance;
};
e.destoryInstance = function() {
t.m_instance = null;
};
e.prototype.dispatchEvent = function(e, t, n, o) {
void 0 === n && (n = !0);
void 0 === o && (o = !1);
if (n) {
var i = "_" + e, r = this.m_events[i];
if (r) {
for (var a = 0, s = r; a < s.length; a++) {
var c = s[a];
c[1] && c[1](t);
}
for (var l = r.length - 1; l >= 0; l--) r[l][3] && r.splice(l, 1);
0 == r.length && delete this.m_events[i];
}
o && delete this.m_events[i];
} else this.m_cmds.push([ e, t, o ]);
};
e.prototype.addEventListener = function(e, t, n, o) {
void 0 === o && (o = !1);
var i = "_" + e, r = this.m_events[i];
if (!r) {
r = [];
this.m_events[i] = r;
}
var a = this.getNextIdx();
r.push([ t, n, a, o ]);
this._changeN(!0);
return a;
};
e.prototype.removeEventListenerByTarget = function(e) {
var t = [];
for (var n in this.m_events) {
for (var o = (a = this.m_events[n]).length - 1; o >= 0; o--) {
if (a[o][0] == e) {
a.splice(o, 1);
this._changeN(!1);
break;
}
}
a.length < 1 && t.push(n);
}
for (var i = 0, r = t; i < r.length; i++) {
var a = r[i];
delete this.m_events[a];
}
};
e.prototype.removeEventListener = function(e) {
for (var t in this.m_events) for (var n = this.m_events[t], o = 0; o < n.length; o++) {
if (n[o][2] == e) {
n.splice(o, 1);
this._changeN(!1);
return;
}
}
};
e.prototype.process = function(e) {
for (var t; this.m_cmds.length > 0; ) {
t = this.m_cmds.shift();
this.dispatchEvent(t[0], t[1], !0, t[2]);
}
};
e.prototype._changeN = function(e) {
this.m_count = this.m_count + (e ? 1 : -1);
1 == this.m_count ? i.getManager().addToProcess(this) : 0 == this.m_count && i.getManager().removeProcess(this);
};
e.prototype.getNextIdx = function() {
for (;;) {
var e = i.default.random(0, 1e4) + "_" + i.default.random(0, 1e4), t = !1;
for (var n in this.m_events) {
if (n == e) {
t = !0;
break;
}
for (var o = 0, r = this.m_events[n]; o < r.length; o++) {
if (r[o][2] == e) {
t = !0;
break;
}
}
if (t) break;
}
if (!t) return e;
}
};
var t;
e.m_instance = null;
return e = t = o([ a ], e);
}());
n.default = s;
cc._RF.pop();
}, {
"../Manager": "Manager"
} ],
KeFuLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e810fn98rlCG4EiRdbCpdF3", "KeFuLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../engine/Manager"), s = cc._decorator.ccclass, c = function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_data = e;
for (var n = 0, o = [ "img_wxbg/btn_copy", "Panel_cancel", "img_wxbg/btn_save", "img_wxbg/btn_close" ]; n < o.length; n++) {
var i = o[n], r = this.seekNodeByName(i);
this.addTouchEventListener(r, this.onClick.bind(this));
}
var s = this.seekNodeByName("img_wxbg/img_wxurl");
s.active = !1;
var c = this.m_manager.createQRCode("kefu_ewm", this.m_data.kefu.wxurl || "www.baidu.com", {
width: s.width + "",
height: s.height + ""
});
if (c && jsb.fileUtils.isFileExist(c)) {
this.m_ewm = c;
this.loadByUrl(function(e) {
if (e.err) cc.error(e.err); else {
s.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e.ret);
s.active = !0;
}
}, c);
}
if ("ios" == a.default.platform()) {
this.addEventListener("save_imgsuccess", function(e) {
"1" == e.string ? t.cmdToast("保存成功") : t.cmdToast("保存失败");
});
this.addEventListener("getPHAuth", function(e) {
"1" == e.string ? t._saveimg() : t.cmdToast("保存图片失败");
});
}
};
t.prototype._saveimg = function() {
var e = {
cmd: "save_img",
path: this.m_ewm
}, t = a.default.helper(e);
"android" == a.default.platform() && t && this.cmdToast("图片已保存~");
};
t.prototype.onClick = function(e, t) {
if (2 == t) {
var n = e.name;
if ("Panel_cancel" == n || "btn_close" == n) this.removeFromParent(); else if ("btn_copy" == n) {
var o = this.m_data.kefu.wx || "";
this.m_manager.copyToCilp(o);
this.cmdToast("已复制到剪贴板~");
} else if ("btn_save" == n) {
var i = a.default.platform();
if ("android" == i) this._saveimg(); else if ("ios" == i) {
var r = Number(a.default.IOSHelper({
cmd: "checkPHAuth"
}));
3 == r ? this._saveimg() : 0 == r ? a.default.IOSHelper({
cmd: "getPHAuth"
}) : this.cmdToast("请授予访问相册权限，才能保存图片");
}
}
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default);
n.default = c;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer"
} ],
Layer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "c4705VpncVNr5YHfcxm7pCo", "Layer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../engine/UIBase"), a = e("../engine/Manager"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.getMeta = function(e) {
return a.getManager().getMeta(e);
};
t.prototype.getMetaInt = function(e) {
return a.getManager().getMetaInt(e);
};
t.prototype.changeTable = function(e) {
void 0 === e && (e = null);
a.getManager().getCurScene().changeTable(e);
};
t.prototype.cmdToast = function(e) {
a.getManager().cmdToast(e);
};
t.prototype.send_data = function(e) {
a.getManager().getCurScene().m_tcp.send_data(e);
};
t.prototype.getChatStr = function(e) {
return a.getManager().getCurScene().getChatStr(e);
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../engine/Manager": "Manager",
"../engine/UIBase": "UIBase"
} ],
ListLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "325919fDLNBMrRykyBCpcHO", "ListLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_rankimgs = [];
t.m_perfabs = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekCompByName(cc.Button, "button_close");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
n = this.seekCompByName(cc.Button, "button");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.addLayer(a.default.LAYER.ShareLayer);
});
var o = this.seekNodeByName("ScrollView/view/content");
this.setMyItem(e.myrank, this.seekNodeByName("item"));
var i = e.ranklist;
this.fastInitList(i, 8, function(e) {
t.createItem(o, e, t.m_perfabs[1]);
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.setMyItem = function(e, t) {
var n, o = this, i = [];
this.seekCompByName(cc.Label, "label_name", t).string = e.name;
this.loadByUrl(function(e) {
if (!e.err) {
o.seekCompByName(cc.Sprite, "img_photobg", t).spriteFrame = new cc.SpriteFrame(e.ret);
}
}, e.avatar, "png");
this.seekCompByName(cc.Label, "bg_2/label", t).string = "Lv." + (Number(e.level) > 38 ? "38" : e.level);
this.seekCompByName(cc.Label, "label_money", t).string = a.default.glodConverToString(String(e.gold_all));
var r = this.seekNodeByName("bg_6", t);
n = r ? this.seekCompByName(cc.Sprite, "bg_6/img_3", t) : this.seekCompByName(cc.Sprite, "img_3", t);
var s = this.seekNodeByName("bg_5", t), c = 2;
e.rank = Number(e.rank);
if (e.rank < 4 && e.rank > 0) {
c = 0;
n.spriteFrame = this.m_rankimgs[e.rank - 1];
} else if (0 != e.rank) {
c = 1;
this.seekCompByName(cc.Label, "label", s).string = e.rank;
}
i.push(n.node);
i.push(s);
if (r) {
var l = this.seekCompByName(cc.Label, "bg_6/label", t);
l.node.active = 0 == e.rank;
if (0 == e.rank) {
c = 2;
i.push(l.node);
}
}
this.setNodeVisible(i, c);
};
t.prototype.createItem = function(e, t, n) {
var o, i, r = this, s = [];
(o = cc.instantiate(n)).parent = e;
this.seekCompByName(cc.Label, "label_name", o).string = t.name;
this.loadByUrl(function(e) {
if (!e.err) {
r.seekCompByName(cc.Sprite, "img_photobg", o).spriteFrame = new cc.SpriteFrame(e.ret);
}
}, t.avatar, "png");
this.seekCompByName(cc.Label, "bg_2/label", o).string = "Lv." + (Number(t.level) > 38 ? "38" : t.level);
this.seekCompByName(cc.Label, "label_money", o).string = a.default.glodConverToString(String(t.gold_all));
var c = this.seekNodeByName("bg_6", o);
i = c ? this.seekCompByName(cc.Sprite, "bg_6/img_3", o) : this.seekCompByName(cc.Sprite, "img_3", o);
var l = this.seekNodeByName("bg_5", o), u = 2;
t.rank = Number(t.rank);
if (t.rank < 4 && t.rank > 0) {
u = 0;
i.spriteFrame = this.m_rankimgs[t.rank - 1];
} else if (0 != t.rank) {
u = 1;
this.seekCompByName(cc.Label, "label", l).string = t.rank;
}
s.push(i.node);
s.push(l);
if (c) {
var m = this.seekCompByName(cc.Label, "bg_6/label", o);
m.node.active = 0 == t.rank;
if (0 == t.rank) {
u = 2;
s.push(m.node);
}
}
this.setNodeVisible(s, u);
};
i([ l(cc.SpriteFrame) ], t.prototype, "m_rankimgs", void 0);
i([ l(cc.Prefab) ], t.prototype, "m_perfabs", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
LoadLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ff183IsmlFM+KbOLSJo01ZJ", "LoadLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
LoginGameLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "55928oGpi1H7oWU6ouuFIft", "LoginGameLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../engine/Utils/UserDefault"), s = e("../../game/Instance"), c = e("../../engine/Manager"), l = cc._decorator, u = l.ccclass, m = (l.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_bg_phone = null;
t.m_phoneNum = "";
t.m_okBtn = null;
t.m_yzmInput = "";
t.m_clipContent = "";
t.reqfailnum = 0;
return t;
}
t.prototype._clip = function(e) {
var t = "ttzc_invitecode_";
return -1 != e.indexOf(t) ? e.substring(t.length) : "";
};
t.prototype.onCreate = function(e) {
var t = this;
this.m_bg_phone = this.seekCompByName(cc.Sprite, "bg_phoneBD");
this.m_bg_phone.node.active = !1;
var n = this.seekCompByName(cc.Button, "button_login");
this.wxbtn = n;
if ("android" == c.default.platform()) {
this.addEventListener("GET_COPY", function(e) {
n.node.active = !0;
t.m_clipContent = t._clip(e.string);
c.default.JNIHelper({
cmd: "requestADPermission"
});
});
n.node.active = !1;
}
var o = c.default.helper({
cmd: "getcopy"
});
this.m_clipContent = this._clip(o);
this.addEventListener("WXLOGIN_CODE", function(e) {
var n = e.string || "";
t.wxbtn.interactable = !0;
"" == n && "null" == n || t.sendLoginPhone("", n);
});
var i = this.m_ud.getStringForKey("WX_OPENID", "");
if ("" != i) {
this.wxbtn.interactable = !1;
this.sendLoginPhone(i, "");
}
this.addTouchEventListener(n, function(e, n) {
if (2 == n) {
var o = t.m_ud.getStringForKey("WX_OPENID", "");
"" == o ? t.reqWXCode() : t.sendLoginPhone(o, "");
}
});
};
t.prototype.initBindPhoneInfo = function() {
var e = this;
this.m_bg_phone.node.active = !0;
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "LoginGameLayer";
t.handler = "editingDidEnded";
var n = this.seekCompByName(cc.EditBox, "bg_phoneBD/bg_1/editbox");
n.string = a.default.getInstance().getStringForKey("iphone_code", "");
n.editingDidEnded.push(t);
this.m_okBtn = this.seekCompByName(cc.Button, "bg_phoneBD/button_confirm");
this.m_okBtn.interactable = !1;
this.addTouchEventListener(this.m_okBtn, function(t, n) {
2 == n && (e.m_phoneNum.length > 0 ? e.sendUrl({
action: "Login",
param: JSON.stringify({
phone: e.m_phoneNum,
invitecode: e.m_clipContent
})
}, e.onLoginResulet.bind(e), {
loading: !0,
manual_catch: !0
}) : e.cmdToast("请输入正确的手机号!"));
});
var o = new cc.Component.EventHandler();
o.target = this.node;
o.component = "BindPhoneLayer";
o.handler = "inputEnding";
this.seekCompByName(cc.EditBox, "bg_phoneBD/bg_2/editbox").editingDidEnded.push(o);
var i = this.seekCompByName(cc.Button, "bg_phoneBD/bg_2/button1");
this.button_verification = i;
this.addTouchEventListener(i, function(t, n) {
2 == n && (11 == e.m_phoneNum.length ? e.sendUrl({
action: "Sms",
param: JSON.stringify({
phone: e.m_phoneNum
})
}, e.onSmsResulet.bind(e)) : e.cmdToast("请输入正确的电话号码"));
});
};
t.prototype.sendLoginPhone = function(e, t) {
var n = this.m_manager.getMeta("CHANNEL_ID"), o = c.default.platform();
this.sendUrl({
action: "LoginPhone",
param: JSON.stringify({
openid: e,
code: t,
invitecode: this.m_clipContent,
channel_id: n,
platform: o,
phonemac: "",
phoneimei: "",
phoneimsi: ""
})
}, this.onLoginResulet.bind(this), {
loading: !0,
manual_catch: !0
});
};
t.prototype.reqWXCode = function() {
this.wxbtn.interactable = !1;
c.default.helper({
cmd: "wxlogin"
});
};
t.prototype.onLoginResulet = function(e) {
if (200 == e.code) {
c.default.helper({
cmd: "copy",
string: ""
});
e.data.playinfo.openid && this.m_ud.setStringForKey("WX_OPENID", e.data.playinfo.openid || "");
this.replaceScene(s.default.STAGE.HALL_SCENE, e.data);
} else if (400 == e.code) {
if (this.reqfailnum <= 3) this.reqWXCode(); else {
this.cmdToast("申请授权失败请稍后再试~");
this.wxbtn.interactable = !0;
this.reqfailnum = 0;
}
this.reqfailnum++;
} else this.wxbtn.interactable = !0;
};
t.prototype.onSmsResulet = function(e) {
this.button_verification.interactable = !1;
this.yqmlabel = this.seekCompByName(cc.Label, "label", this.button_verification.node);
this.yqmlabel.string = "60S";
this.yqmtime = 60;
this.ymqhandler = this.createTime(this.setText.bind(this), 1);
};
t.prototype.setText = function() {
if (this.yqmtime <= 0) {
this.button_verification.interactable = !0;
this.yqmlabel.string = "获取验证码";
if (this.ymqhandler) {
this.removeTime(this.ymqhandler);
this.ymqhandler = null;
}
} else {
this.yqmtime--;
this.yqmlabel.string = this.yqmtime + "S";
}
};
t.prototype.editingDidEnded = function(e) {
this.m_phoneNum = e.string;
11 == e.string.length && a.default.getInstance().setStringForKey("iphone_code", e.string);
};
t.prototype.inputEnding = function(e) {
this.m_yzmInput = e.string;
11 == this.m_phoneNum.length && "" != this.m_yzmInput && (this.m_okBtn.interactable = !0);
};
return t = i([ u ], t);
}(r.default));
n.default = m;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer",
"../../engine/Utils/UserDefault": "UserDefault",
"../../game/Instance": "Instance"
} ],
LoginLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b31daMnWN1DwKs/AE/MGuCK", "LoginLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = e("../../game/ScriptManager"), c = e("../../engine/script/ScriptDefine"), l = e("../../engine/Manager"), u = e("../../engine/Utils/UserDefault"), m = cc._decorator, p = m.ccclass, h = (m.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_Text_maxim = null;
t.m_UIupdate = null;
t.m_UIprocess = null;
t.m_processBar = null;
t.m_txt_v = null;
t.m_updateProcess = null;
t.m_updateText = null;
t.m_updateKB = null;
t.m_barLight = null;
t.m_barLight2 = null;
t.m_barWidth = null;
t.m_updateManager = null;
t.m_maxim = null;
t.m_processInfos = null;
t.m_processText = null;
t.m_downloading = null;
t.m_offset = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_Text_maxim = this.seekNodeByName("Text_maxim");
this.m_UIupdate = this.seekNodeByName("Panel_update");
this.m_UIprocess = this.seekNodeByName("Panel_process");
this.m_processBar = this.seekCompByName(cc.ProgressBar, "LoadingBar_1", this.m_UIprocess);
this.m_processBar.progress = 0;
this.m_txt_v = this.seekCompByName(cc.Label, "Text_v");
this.m_updateProcess = this.seekCompByName(cc.ProgressBar, "LoadingBar_1", this.m_UIupdate);
this.m_updateProcess.progress = 0;
this.m_updateText = this.seekCompByName(cc.Label, "Text_1", this.m_UIupdate);
this.m_updateKB = this.seekCompByName(cc.Label, "Text_kb", this.m_UIupdate);
this.m_barWidth = this.m_updateProcess.node.getContentSize().width;
this.refVersionInfo();
this.m_processText = this.seekCompByName(cc.Label, "Text_info", this.m_UIprocess);
this.m_updateManager = new s.default(this, this.m_manager.getHandyScript(a.default.JSON_LOGIN));
this.m_updateManager.setName("login");
this.m_processInfos = [ "初始化游戏中...", "检测更新中...", "登录游戏中..." ];
"android" == l.default.platform() && this.addEventListener("INSTALL_APK", function(e) {
t.setResult(e);
});
};
t.prototype.updateProcess = function(e) {
this.m_processText.string = this.m_processInfos[e - 1];
this.m_processBar.progress = e / 3;
};
t.prototype.onUpdate = function(e, t, n, o) {
var i = this, r = l.default.platform(), a = {};
a.code = e;
a.verName = t;
a.script_version = 6;
a.apk_code = o;
a.package_name = this.m_manager.getMeta("packageName");
a.channel_ver = this.m_manager.getMeta("packageVersionCode");
a.app_id = this.m_manager.getMetaInt("app_id");
a.language = "js";
if ("android" == r) a.sp_type = "1_1_1"; else if ("ios" == r) {
a.sp_type = "0_0_0";
a.phone_sp_type = -1;
}
a.channel_id = this.m_manager.getMeta("CHANNEL_ID");
a.mm_channel_id = a.channel_id;
a.channel_name = this.m_manager.getMeta("CHANNEL_NAME");
a.app_info = n;
a.platform = r;
this.sendUrl({
action: "Update",
param: JSON.stringify(a)
}, function(e) {
var t = i.getMeta("packageVersionName"), n = i.getMeta("packageVersionCode");
u.default.getInstance().setStringForKey("IOS_VERSION_INFO", t + "." + n);
i.m_updateManager.setFunctionResult(e);
i.m_updateManager.changeWaitCount(!1);
});
};
t.prototype.refVersionInfo = function() {
this.m_manager.m_ver = this.m_ud.getStringForKey("versionName", this.m_manager.getMeta("versionName"));
this.m_manager.m_verCode = parseInt(this.m_ud.getStringForKey("versionCode", this.m_manager.getMeta("versionCode")));
this.m_ud.setStringForKey("versionName", this.m_manager.m_ver);
this.m_ud.setStringForKey("versionCode", this.m_manager.m_verCode.toString());
this.m_txt_v.string = this.m_manager.m_ver + "." + this.m_manager.m_verCode;
};
t.prototype.startGame = function() {
this.addLayer(a.default.LAYER.LoginGameLayer);
this.removeFromParent();
};
t.prototype.httpCallBack = function(e) {
this.m_updateManager.setFuncResult(e || !1);
};
t.prototype.setProcess = function(e) {
this.m_updateProcess.progress = e / 100;
};
t.prototype.UpdateMsgBox = function(e, t, n, o, i, r) {
this.addLayer(a.default.LAYER.UpdateLayer, {
func: r,
updateinfo: t,
oldversioninfo: n,
newversioninfo: o,
isForce: i
});
};
t.prototype.setTip = function(e) {
this.m_updateText.string = e;
};
t.prototype.showProgressBar = function(e) {
this.m_UIupdate.active = e;
this.m_UIprocess.active = !e;
};
t.prototype.onIntoTable = function(e) {
this.setResult(e);
};
t.prototype.setResult = function(e) {
if (this.m_updateManager.isWait()) {
this.m_updateManager.setFunctionResult(e);
this.m_updateManager.changeWaitCount(!1);
}
};
t.prototype._getCopy = function(e) {
if (this.m_clipHandler) {
this.removeEventListener(this.m_clipHandler);
this.m_clipHandler = null;
}
e || (e = "");
this.setResult(e);
};
t.prototype._onHttpReset = function() {
if (this.m_httpResetHandler) {
this.removeEventListener(this.m_httpResetHandler);
this.m_httpResetHandler = null;
}
this.m_updateManager.changeWaitCount(!1);
};
t.prototype.callExFunc = function(e, t, n) {
var o = c.RETURN.RETURN_NORMAL;
if ("tonumber" == e) n.push(parseInt(t[0])); else if ("hasInstallPermission" == e) n.push(l.default.helper({
cmd: "hasInstallPermission"
})); else if ("getInstallPermission" == e) {
n.push(l.default.helper({
cmd: "getInstallPermission"
}));
o = c.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("install" == e) {
jsb.CMiscHelper.installApk(t[0]);
o = c.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("checkPermission" == e) n.push(l.default.helper({
cmd: "checkPermission",
permission: t[0]
})); else if ("requestPermission" == e) {
l.default.helper({
cmd: "requestPermission",
permission: t[0]
});
o = c.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("updateRequest" == e) {
this.onUpdate(t[0], t[1], t[2], t[3]);
o = c.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("setVersionInfo" == e) this.setVersionInfo(t[0], t[1]); else if ("updateProcess" == e) this.updateProcess(t[0]); else if ("setTip" == e) this.setTip(t[0]); else if ("showProgressBar" == e) this.showProgressBar(t[0]); else if ("setProcess" == e) this.setProcess(t[0]); else if ("setUserData" == e) {
var i = t[0], r = i.cdn;
if (r) {
if ("" == this.m_ud.getStringForKey("IP_URL", "") || 1 == r.refresh) {
this.m_ud.setStringForKey("IP_URL", r.url);
this.m_ud.setStringForKey("zoneIP", r.zone.toString());
}
}
this.m_manager.m_userData = i;
} else if ("getUserData" == e) n.push(this.m_manager.m_userData); else if ("enabledOffset" == e) t[0] ? this.enabledDownloadOffset(!0, t[1], t[2], t[3]) : this.enabledDownloadOffset(!1); else if ("downloading" == e) this.m_downloading = t[0]; else if ("setOffset" == e) {
this.m_offset = t[0];
this.refProcess2(0);
} else if ("xRestart" == e) {
this.addCmd(l.default.CMDS.RESTART);
o = c.RETURN.RETURN_BREAK_THIS_FRAME;
} else o = c.RETURN.RETURN_NO_EXECUTE;
o == c.RETURN.RETURN_BREAK_THIS_FRAME && this.m_updateManager.changeWaitCount(!0);
return o;
};
t.prototype.enabledDownloadOffset = function(e, t, n, o) {
void 0 === t && (t = null);
void 0 === n && (n = null);
void 0 === o && (o = null);
this.m_enabledOffset = e;
if (e) {
this.m_offset = 0;
this.m_total = t;
this.m_rate = o;
this.m_barOffset = n;
} else {
this.m_offset = null;
this.m_total = null;
this.m_rate = null;
this.m_barOffset = null;
}
};
t.prototype.refProcess2 = function(e, t) {
void 0 === t && (t = null);
var n;
if (this.m_enabledOffset) {
n = (e = this.m_offset + e) * this.m_rate / this.m_total + this.m_barOffset;
this.m_updateProcess.progress = n / 100;
this.m_downloading ? this.m_updateKB.string = Math.floor(e / 1024) + "KB/" + Math.floor(this.m_total / 1024) + "KB" : this.m_updateKB.string = Math.floor(100 * e / this.m_total) + "%";
} else {
n = 100 * e / t;
this.m_updateProcess.progress = n / 100;
this.m_downloading ? this.m_updateKB.string = Math.floor(e / 1024) + "KB/" + Math.floor(t / 1024) + "KB" : this.m_updateKB.string = Math.floor(100 * e / t) + "%";
}
};
t.prototype.setVersionInfo = function(e, t) {
var n = this.m_ud.getStringForKey("zoneIP", "0");
this.m_txt_v.string = e + "." + t + "." + n;
this.m_manager.m_ver = e;
this.m_manager.m_verCode = t;
var o = this.m_ud;
o.setStringForKey("versionName", this.m_manager.m_ver);
o.setStringForKey("versionCode", this.m_manager.m_verCode.toString());
};
t.prototype.resetGame = function() {
this.addCmd(l.default.CMDS.RESTART);
};
return t = i([ p ], t);
}(r.default));
n.default = h;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer",
"../../engine/Utils/UserDefault": "UserDefault",
"../../engine/script/ScriptDefine": "ScriptDefine",
"../../game/Instance": "Instance",
"../../game/ScriptManager": "ScriptManager"
} ],
LoginScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "43976xlXRlOapfyMCwhzL2W", "LoginScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UIScene"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_loginGameLayer = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.nextFrameExec(function() {
t.addLayer(a.default.LAYER.LoginLayer);
});
};
t.prototype.getResource = function(e) {
if (e == a.default.LAYER.LoginGameLayer[1]) return this.m_loginGameLayer;
};
i([ l(cc.Prefab) ], t.prototype, "m_loginGameLayer", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UIScene": "UIScene",
"../../game/Instance": "Instance"
} ],
LotteryLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ad799H/g99HX6p+Q1a5VLY1", "LotteryLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.m_sounds = [];
t.m_itemList = [];
t.m_callBack = null;
t.m_params = null;
t.m_idx = 0;
t.m_data = null;
t.m_idxList = [ 41, 43, 44, 45, 46, 38, 39, 40, 42 ];
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_callBack = e.func;
this.m_params = e.param;
this.m_idx = e.idx;
var n = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(n, function(e, n) {
if (2 == n) {
if (t.roll) {
t.removeTime(t.roll);
t.roll = null;
}
t.m_callBack(0, null);
t.removeFromParent();
}
});
for (var o = 1; o < 10; o++) {
var i = cc.instantiate(this.m_item), r = this.m_idxList[o - 1];
this.refreshAnimeOfVegetables(i, r);
var a = this.seekNodeByName("bg_1/node_" + o);
i.parent = a;
this.m_itemList.push(i);
}
var s = this.seekNodeByName("bg_1/btn_start");
this.addTouchEventListener(s, this.onStartClick.bind(this));
};
t.prototype.Lottery = function(e) {
this.m_manager.playEffect(this.m_sounds[0]);
for (var t = 0; t < this.m_itemList.length; t++) {
var n = this.seekCompByName(cc.Sprite, "img_4", this.m_itemList[t]).node;
if (e == t) {
n.stopAllActions();
n.active = !0;
n.opacity = 255;
} else n.runAction(cc.fadeOut(.2));
}
};
t.prototype.refreshAnimeOfVegetables = function(e, t) {
var n = this.seekCompByName(sp.Skeleton, "anime", e), o = this.m_scene.m_animes[t - 1];
n.skeletonData = o;
var i = o._skeletonJson.animations;
if (t >= 41 && t <= 45) {
var r = "baoshu" + String([ 2, 4, 1, 5, 3 ][t - 41]);
n.animation = r;
n.node.y = -20;
var a = this.m_scene.m_hallLayer.m_btnMoneyTree[t - 41], s = this.seekCompByName(cc.Sprite, "Background1", a.node), c = this.seekCompByName(cc.Sprite, "img_6", e);
c.spriteFrame = s.spriteFrame;
c.node.active = !0;
} else {
for (var r in i) {
n.animation = r;
break;
}
if (46 == t) {
n.node.y = -52;
n.node.x = -15;
} else if (40 == t) {
n.node.scale = .7;
n.node.y = -55;
n.node.x = -15;
} else n.node.x = -15;
}
};
t.prototype.onStartClick = function(e, t) {
var n = this;
2 == t && this.sendUrl({
action: "Merge",
param: this.m_params
}, function(e) {
var t = n.seekCompByName(cc.Button, "bg_1/btn_start"), o = n.seekCompByName(cc.Button, "bg_1/button_close");
t.interactable = !1;
o.interactable = !1;
n.m_data = e;
for (var i = Number(e.myscene[String(n.m_idx + 1)]), r = 0, a = 0; a < n.m_idxList.length; a++) if (i == n.m_idxList[a]) {
r = a + 1;
break;
}
var s = 0, c = 18 + r;
n.roll = n.createTime(function() {
s > 8 && (s = 0);
this.Lottery(s);
c--;
if (4 == ++s) {
this.removeTime(this.roll);
this.roll = null;
this.roll = this.createTime(function() {
s > 8 && (s = 0);
this.Lottery(s);
s++;
if (5 == --c) {
this.removeTime(this.roll);
this.roll = null;
this.roll = this.createTime(function() {
s > 8 && (s = 0);
this.Lottery(s);
s++;
if (0 == --c) {
this.removeTime(this.roll);
this.roll = null;
this.prizeAction(r, i);
}
}, .3);
}
}, .1);
}
}, .3);
});
};
t.prototype.prizeAction = function(e, t) {
var n = this, o = this.seekNodeByName("bg_1"), i = this.seekNodeByName("bg_1/node_prize"), r = cc.instantiate(this.m_item);
this.refreshAnimeOfVegetables(r, t);
var s = this.seekNodeByName("bg_1/node_" + e);
r.parent = o;
r.x = s.x;
r.y = s.y;
r.z = 1;
r.angle = 10;
var c = -(r.y - r.height / 2 + 360), l = cc.moveBy(.4, cc.v2(0, c)), u = cc.callFunc(function() {
r.x = 1e5;
r.y = 1e5;
}), m = cc.delayTime(.2), p = cc.callFunc(function() {
r.angle = 0;
r.x = i.x;
r.y = i.y + 100;
n.m_manager.playEffect(n.m_sounds[1]);
}), h = cc.moveBy(.2, cc.v2(0, -100)), _ = cc.moveBy(.2, cc.v2(0, 20)), d = cc.moveBy(.2, cc.v2(0, -20)), f = cc.delayTime(.5), y = cc.callFunc(function() {
n.addLayer(a.default.LAYER.RewardLayer, {
type: 4,
value: t,
func: function(e) {
n.m_callBack(1, n.m_data);
n.removeFromParent();
}
});
});
r.runAction(cc.sequence(l, u, m, p, h, _, d, f, y));
};
i([ l(cc.Prefab) ], t.prototype, "m_item", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "m_sounds", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
Manager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9c03fKNQGRKP4c2C0ZJnDQN", "Manager");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./Utils/JSEvent"), a = e("../game/Instance"), s = e("./Utils/Sound"), c = e("./Net/HttpClient"), l = e("./Net/Download");
n.getManager = function() {
return h.getInstance();
};
var u = cc._decorator, m = u.ccclass, p = u.property, h = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_jsons = [];
t.m_layerPrefabs = [];
t.m_cmds = null;
t.m_process = null;
t.m_curScene = null;
t.m_event = null;
t.m_count = 0;
t.m_delay = 0;
t.m_sound = null;
t.m_loadingN = 0;
t.m_loadingP = 0;
return t;
}
n = t;
t.getInstance = function() {
return n.m_instance;
};
t.prototype.onLoad = function() {
n.m_instance = this;
cc.game.addPersistRootNode(this.node);
this.launch();
};
t.prototype.launch = function() {
this.m_cmds = [];
this.m_process = [];
this.addCmd(this, n.CMDS.INIT);
};
t.prototype.getCurScene = function() {
return this.m_curScene;
};
t.prototype.addCmd = function(e, t, n, o) {
void 0 === n && (n = null);
void 0 === o && (o = !1);
n || (n = []);
n.unshift(t);
n.unshift(e);
o ? this.m_cmds.unshift(n) : this.m_cmds.push(n);
};
t.prototype.removeCmdByTarget = function(e) {
for (var t = 0; t < this.m_cmds.length; ) this.m_cmds[t][0] == e ? this.m_cmds.splice(t, 1) : t++;
};
t.prototype.update = function(e) {
this.onUpdate(e);
if (this.m_delay > 0) this.m_delay -= 1; else {
for (var t = this.m_process.length - 1; t >= 0; t--) {
var n = this.m_process[t];
n && n.process && n.process(e);
}
for (;this.m_cmds.length > 0 && 0 == this.m_count; ) {
var o = this.m_cmds.shift();
if (o && this._runCmd(o)) break;
}
}
};
t.prototype.addEventListener = function(e, t, n, o) {
void 0 === o && (o = !1);
return this.m_event.addEventListener(e, t, n, o);
};
t.prototype.getRandomEventName = function() {
return this.m_event.getNextIdx();
};
t.prototype.removeEventListener = function(e) {
this.m_event.removeEventListener(e);
};
t.prototype.removeEventListenerByTarget = function(e) {
this.m_event.removeEventListenerByTarget(e);
};
t.prototype.dispatchEvent = function(e, t, n, o) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
void 0 === o && (o = !1);
this.m_event.dispatchEvent(e, t, n, o);
};
t.prototype.addToProcess = function(e) {
this.m_process.push(e);
};
t.prototype.removeProcess = function(e) {
for (var t in this.m_process) {
if (this.m_process[t] == e) {
this.m_process.splice(parseInt(t), 1);
break;
}
}
};
t.prototype.seekNodeByName = function(e, t) {
var n;
n = "string" == typeof e ? -1 != e.indexOf("/") ? e.split("/") : [ e ] : e;
for (var o = 0; o < n.length; o++) t = t.getChildByName(n[o]);
return t;
};
t.prototype.getLoadResByName = function(e) {
return this.m_prefabs && this.m_prefabs[e] ? this.m_prefabs[e] : null;
};
t.prototype._runCmd = function(e) {
switch (e[1]) {
case n.CMDS.REPLACE_SCENE:
this._replaceScene(e[2], e[3]);
break;

case n.CMDS.INIT:
this._onInit();
break;

case n.CMDS.RESTART:
this.releaseSelf();
jsb.fileUtils.purgeCachedEntries()
cc.game.restart();
break;

case n.CMDS.PAUSE:
this.changeN(!0);
break;

case n.CMDS.RESUME:
this.changeN(!1);
break;

case n.CMDS.DELAY:
this.m_delay = e[2];
break;

case n.CMDS.END_GAME:
cc.game.end();
break;

case n.CMDS.CALL_FUNC:
e[2](e[3]);
break;

case n.CMDS.PUSH_LAYER:
this.m_curScene.pushLayer(e[2], e[3], e[4]);
}
return !0;
};
t.prototype.changeN = function(e) {
this.m_count += e ? 1 : -1;
};
t.prototype._onInit = function() {
var e = this;
this.m_sound = s.default.getInstance();
this.m_event = r.default.getInstance();
this.m_count = 0;
this.m_delay = 0;
this.m_loadingN = 0;
this.m_loadingP = 0;
this.m_prefabs = {};
cc.game.on(cc.game.EVENT_HIDE, function(t) {
e.onBackHomeEvent(!1);
});
cc.game.on(cc.game.EVENT_SHOW, function(t) {
e.onBackHomeEvent(!0);
});
this.addEventListener("showLoading", this, this.onShowLoading.bind(this));
var t = this.onInit(this.m_layerPrefabs);
this._loadSceneOver(t);
};
t.platform = function() {
return cc.sys.platform == cc.sys.ANDROID ? "android" : cc.sys.platform == cc.sys.IPHONE ? "ios" : void 0;
};
t.prototype.onBackHomeEvent = function(e) {
var t = this.getCurScene();
t && t.onBackHomeEvent(e);
};
t.prototype.onDestory = function() {
this.m_event = null;
};
t.prototype.setMusicON = function(e) {
this.m_sound.setMusicON(e);
};
t.prototype.setEffectON = function(e) {
this.m_sound.setEffectON(e);
};
t.prototype.getMusicON = function() {
return this.m_sound.getMusicON();
};
t.prototype.getEffectON = function() {
return this.m_sound.getEffectON();
};
t.prototype.soundOper = function(e) {
this.m_sound.oper(e);
};
t.prototype.getSoundBackMusic = function() {
return this.m_sound.getBackMusic();
};
t.prototype.soundIsPlaying = function() {
return this.m_sound.isPlaying();
};
t.prototype.PlayBgSound = function(e) {
return this.m_sound.PlayBgSound(e);
};
t.prototype.playEffect = function(e, t) {
void 0 === t && (t = !1);
return this.m_sound.playEffect(e, t);
};
t.prototype.stopEffect = function(e) {
this.m_sound.stopEffect(e);
};
t.prototype.setMusicVolume = function(e) {
this.m_sound.setMusicVolume(e);
};
t.prototype.getMusicVolume = function() {
return this.m_sound.getMusicVolume();
};
t.prototype.getEffectsVolume = function() {
return this.m_sound.getEffectsVolume();
};
t.prototype.setEffectsVolume = function(e) {
this.m_sound.setEffectsVolume(e);
};
t.prototype.showLoading = function(e) {
do {
this.m_loadingN += e ? 1 : -1;
if (!(this.m_loadingN >= 0 && this.m_loadingN <= 1)) break;
this.dispatchEvent("showLoading", 1 == this.m_loadingN);
} while (0);
};
t.prototype._pushLoadRes = function(e) {
for (var t in e) this.m_prefabs[t] = e[t];
};
t.prototype._replaceScene = function(e, t) {
this.reloadSceneResource(e, t);
};
t.prototype.reloadSceneResource = function(e, t) {
var n = this;
void 0 === t && (t = null);
this.changeN(!0);
if (cc.loader.getRes(e)) this._onEnterScene(e, t); else {
this.showLoading(!0);
cc.director.preloadScene(e, function(e, t, n) {
var o = e / t;
this.setLoadProgress(o);
}.bind(this), function(o, i) {
n.showLoading(!1);
if (o) throw o;
n._onEnterScene(e, t);
});
}
};
t.prototype._onEnterScene = function(e, t) {
var n = this;
this.m_sound.clear();
if (this.m_curScene) {
this.m_curScene._onRelease();
this.m_curScene = null;
}
cc.director.loadScene(e, function() {
n.changeN(!1);
n._loadSceneOver(e, t);
});
};
t.prototype._loadSceneOver = function(e, t) {
void 0 === t && (t = null);
this.loadSceneOver(e);
var n = cc.director.getScene().getChildByName("Canvas"), o = e.lastIndexOf("/");
if (-1 != o) {
o++;
e = e.substr(o);
}
var i = n.getComponent(e);
i.m_name = e;
this.m_curScene = i;
i._onInit(t);
};
t.prototype.setLoadProgress = function(e) {
if (this.m_loadingP != e) {
this.dispatchEvent("setProgress", e, !0);
this.m_loadingP = e;
}
};
t.prototype.replaceScene = function(t, o) {
void 0 === o && (o = null);
if (!e.prototype.replaceScene.call(this, t, o)) {
this.addCmd(this, n.CMDS.REPLACE_SCENE, [ t, o ]);
return !0;
}
};
t.prototype.onShowLoading = function(e) {
var t = this.getCurScene();
t && (e ? t.addLayer(a.default.LAYER.ProgressLayer) : t.removeLayer(a.default.LAYER.ProgressLayer));
};
t.prototype.byteAryToJson = function(e) {
for (var t = "", n = 0; n < e.length; n++) {
var o = e[n], i = 0;
if (0 != (128 & (o ^= 16))) {
i++;
if (0 != (192 & o)) {
i++;
0 != (32 & o) && i++;
}
}
if (i > 0) {
for (var r = 255, a = 0; a < i; a++) r &= ~(1 << 7 - a);
var s = r & (16 ^ e[n]);
for (a = 1; a < i; a++) {
var c = e[n + a];
s <<= 6;
s |= 63 & (c ^= 16);
}
t += String.fromCharCode(s);
n += i - 1;
} else t += String.fromCharCode(o);
}
t = t.substring(t.indexOf("{"), t.length);
return JSON.parse(t);
};
t.prototype.JsonToByteAry = function(e, t) {
void 0 === t && (t = !0);
for (var n = null, o = JSON.stringify(e), i = [], r = 0; r < o.length; r++) {
var a = o.charCodeAt(r);
if (t) if (a > 256) {
for (var s = this.unicodeToUtf8(a), c = 0; c < s.length; c++) s[c] ^= 16;
i = i.concat(s);
} else i.push(16 ^ a); else a > 256 ? i = i.concat(this.unicodeToUtf8(a)) : i.push(a);
}
if (t) {
var l = i.length;
i.unshift(l >> 24 & 255);
i.unshift(l >> 16 & 255);
i.unshift(l >> 8 & 255);
i.unshift(255 & l);
n = new Uint8Array(i);
} else n = new Uint8Array(i);
return n;
};
t.prototype.unicodeToUtf8 = function(e) {
var t = [];
if (0 <= e && e <= 127) t.push(e); else if (128 <= e && e <= 2047) {
t.push(192 | 31 & e >> 6);
t.push(128 | 63 & e);
} else if (2048 <= e && e <= 55295 || 57344 <= e && e <= 65535) {
t.push(224 | 15 & e >> 12);
t.push(128 | 63 & e >> 6);
t.push(128 | 63 & e);
}
return t;
};
t.prototype.sendUrl = function(e, t, n) {
void 0 === n && (n = null);
n || (n = []);
this.onSendUrl && this.onSendUrl(e, n);
new c.default(t, e, n);
};
t.addDownloadRequest = function(e, t, n, o) {
this.m_download || (this.m_download = l.default.getInstance());
n = n || 30;
this.m_download.addDownloadRequest(e, t, n, o);
};
t.addSubmitRequest = function(e, t, n) {
this.m_download || (this.m_download = l.default.getInstance());
this.m_download.addSubmitRequest(e, t, n);
};
t.JNIHelper = function(e) {
return jsb.CMiscHelper.InteractiveFunction(JSON.stringify(e));
};
t.helper = function(e) {
var t = n.platform();
return "android" == t ? jsb.CMiscHelper.InteractiveFunction(JSON.stringify(e)) : "ios" == t ? jsb.IOSHelper.InteractiveFunction(JSON.stringify(e)) : void 0;
};
t.IOSHelper = function(e) {
return jsb.IOSHelper.InteractiveFunction(JSON.stringify(e));
};
var n;
t.CMDS = {
INIT: 100,
REPLACE_SCENE: 101,
PUSH_LAYER: 104,
DELAY: 106,
RESTART: 107,
PAUSE: 108,
RESUME: 109,
END_GAME: 110,
CALL_FUNC: 112,
USER_ID: 200
};
t.m_instance = null;
i([ p(cc.JsonAsset) ], t.prototype, "m_jsons", void 0);
i([ p(cc.Prefab) ], t.prototype, "m_layerPrefabs", void 0);
return t = n = i([ m ], t);
}(a.default);
n.default = h;
cc._RF.pop();
}, {
"../game/Instance": "Instance",
"./Net/Download": "Download",
"./Net/HttpClient": "HttpClient",
"./Utils/JSEvent": "JSEvent",
"./Utils/Sound": "Sound"
} ],
MarqueeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a7b14UnHQhJTLkspwzrprqi", "MarqueeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.auto_hide = !0;
t.m_enable = !0;
t.m_cannext = !0;
return t;
}
t.prototype.onCreate = function() {
this.m_txts = [];
this.Panel_2 = this.seekNodeByName("Panel_2");
this.m_view_Panel = this.seekNodeByName("Panel_zj", this.Panel_2);
this.m_richtext = this.seekNodeByName("RichText");
this.show(!1);
this.addEventListener("BIGHORN_ENABLED", this.onBigHornEnabled.bind(this));
this.addEventListener("BigHorn_CHAT_CHANGE", this.onChatChange.bind(this));
};
t.prototype.onChatChange = function() {
this.m_enable && this.nextInfo();
};
t.prototype.onBigHornEnabled = function(e) {
e ? this.show(!0) : this.show(!1);
this.m_enable = e;
};
t.prototype.show = function(e) {
if (e != this.m_show) {
this.m_show = e;
this.Panel_2.active = e;
if (!e) {
for (var t = 0, n = this.m_txts; t < n.length; t++) {
n[t].removeFromParent();
}
this.m_txts = [];
}
}
};
t.prototype.onBack = function() {
return !1;
};
t.prototype.moveOver = function() {
this.m_manager.m_msgData.length < 1 && this.m_txts.length < 1 && this.show(!1);
};
t.prototype.nextInfo = function() {
if (this.m_manager.m_msgData.length > 0 && this.m_cannext) {
this.show(!0);
this.m_cannext = !1;
this.initCurOne(this.m_manager.m_msgData.splice(-1, 1)[0]);
}
};
t.prototype.initCurOne = function(e) {
var t, n = (t = cc.instantiate(this.m_richtext)).getComponent(cc.RichText);
if (Array.isArray(e)) {
var o = "";
for (var i in e) {
var r = e[i];
if (r.number) for (var a = String(r.number), s = a.length, c = 0; c < s - 1; c++) {
o = o + '<img src="' + a.substr(c, 1) + '"/>';
} else if (r.text) {
var l = r.outlineColor || "0xFFFFFF";
l = l.replace("0x", "#");
var u = r.outlineSize || 0, m = r.fontSize || 28, p = r.color || "0xFFFFFF";
p = p.replace("0x", "#");
o = 0 == u ? o + "<size=" + m + "><color=" + p + ">" + r.text + "</color></size>" : o + "<outline color=" + l + " width=" + u + "><size=" + m + "><color=" + p + ">" + r.text + "</color></size></outline>";
t.opacity = r.opacity || 255;
} else r.filePath && (o = o + '<img src="' + r.filePath + '"/>');
}
n.string = o;
}
this.m_view_Panel.addChild(t);
var h = t.getBoundingBox().width, _ = this.m_view_Panel.getContentSize().width;
t.setPosition(cc.v2(_, 0));
t.setAnchorPoint(cc.v2(0, .5));
var d = (h + _) / _ * 4;
t.runAction(cc.sequence(cc.delayTime(d - 3.8), cc.callFunc(function(e) {
this.m_cannext = !0;
this.nextInfo();
}.bind(this))));
t.runAction(cc.sequence(cc.moveTo(d, cc.v2(-h, 0)), cc.callFunc(function(e) {
e.removeFromParent();
for (var t in this.m_txts) {
var n = parseInt(t);
if (this.m_txts[n] == e) {
this.m_txts.splice(n, 1);
this.moveOver();
break;
}
}
}.bind(this))));
this.m_txts.push(t);
};
i([ c(cc.Boolean) ], t.prototype, "auto_hide", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
MergeMoneyTreeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "54c13JQLzND+4ddFRtj0Z8k", "MergeMoneyTreeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgMoneyTree = null;
t.m_imgsTree = [];
t.bg_sound = null;
t.m_nodeMoneyTree = [];
t.m_callBack = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_callBack = e.func;
for (var n = 1; n <= 5; n++) {
var o = this.seekNodeByName("img_4/panel1/node_" + n);
this.m_nodeMoneyTree.push(o);
}
this.m_manager.PlayBgSound(this.bg_sound);
for (var i = [ 0, 0, 0, 0, 0 ], r = [ 2, 4, 1, 5, 3 ], a = 0, s = e.vegetableModel; a < s.length; a++) {
if ((d = s[a]).lv >= 41 && d.lv <= 45) {
var c = Number(d.lv) - 41;
i[c] = 1;
o = this.m_nodeMoneyTree[c];
this.seekNodeByName("tree", o).active = !1;
var l = cc.instantiate(this.m_imgMoneyTree);
l.parent = o;
var u = this.seekCompByName(sp.Skeleton, "anime", l), m = "baoshu" + String(r[c]);
u.setAnimation(0, m, !0);
this.seekCompByName(cc.Sprite, "anime/tree_name", l).spriteFrame = this.m_imgsTree[c];
}
}
for (var p = 0, h = 0, _ = i; h < _.length; h++) {
var d;
if (0 == (d = _[h])) {
p = 1;
break;
}
}
var f = this.seekCompByName(cc.Button, "img_4/btn_merge");
f.interactable = 0 == p;
this.addTouchEventListener(f, function(e, n) {
if (2 == n) {
t.m_callBack(1);
t.removeFromParent();
}
});
this.seekCompByName(sp.Skeleton, "img_4/anime").setAnimation(0, "yaoqianshu" + (0 == p ? 2 : 1), !0);
this.seekCompByName(cc.Sprite, "img_4/img_2").node.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(0, cc.v2(0, -20))).repeatForever());
this.seekCompByName(cc.Label, "img_3/money").string = String(this.m_manager.m_userData.apiece_income_amount);
var y = this.seekNodeByName("Panel_cancel");
this.addTouchEventListener(y, function(e, n) {
if (2 == n) {
t.m_callBack(0);
t.removeFromParent();
}
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ c(cc.Prefab) ], t.prototype, "m_imgMoneyTree", void 0);
i([ c(cc.SpriteFrame) ], t.prototype, "m_imgsTree", void 0);
i([ c({
type: cc.AudioClip
}) ], t.prototype, "bg_sound", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
MessageLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "34cd7dEapVLdYhLbsaYpgar", "MessageLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_enemylist_item = null;
t.m_imgbtn = null;
t.m_list = {};
t.allpick_uid = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.m_ud.getStringForKey("StealVegetablesPickId", "[]");
this.allpick_uid = JSON.parse(n);
var o = this.seekNodeByName("bg_1/btn_close");
this.addTouchEventListener(o, function(e, n) {
2 == n && t.removeFromParent();
});
this.m_list = e.list;
this.seekCompByName(cc.Label, "bg_1/Label").node.active = 0 == e.list.length;
this.seekNodeByName("bg_1/scrollView/view/content").removeAllChildren();
if (this.m_list.length && this.m_list.length > 0) {
for (var i = this.seekNodeByName("bg_1/scrollView/view/content"), r = function(e) {
var n = cc.instantiate(s.m_enemylist_item);
s.loadByUrl(function(e) {
if (!e.err) {
t.seekCompByName(cc.Sprite, "img_head", n).spriteFrame = new cc.SpriteFrame(e.ret);
}
}, s.m_list[e].avatar, "png");
var o = "今日" == s.m_list[e].tag || "昨日" == s.m_list[e].tag ? "" : a.default.date_format("MM月dd日", s.m_list[e].create_time);
s.seekCompByName(cc.Label, "name", n).string = s.m_list[e].name;
s.seekCompByName(cc.RichText, "info", n).string = "<color=#000000>" + o + a.default.date_format("HH:mm", s.m_list[e].create_time) + "偷走您<color=#E76626>" + a.default.glodConverToString(String(s.m_list[e].gold)) + "金币</color>";
s.seekCompByName(cc.Sprite, "img_head/img_today", n).node.active = "今日" == s.m_list[e].tag;
s.seekCompByName(cc.Sprite, "img_head/img_yestoday", n).node.active = "昨日" == s.m_list[e].tag;
var r = s.seekCompByName(cc.Button, "button1", n);
r.node.name = String(e);
if (s.getState(s.m_list[e].farm_player_id)) {
r.node.children[0].getComponent(cc.Sprite).spriteFrame = s.m_imgbtn;
r.interactable = !1;
}
s.addTouchEventListener(r, s.onRevengeClick.bind(s));
n.parent = i;
}, s = this, c = 0; c < this.m_list.length; c++) r(c);
this.seekCompByName(cc.ScrollView, "bg_1/scrollView").scrollToTop();
}
};
t.prototype.getState = function(e) {
var t = !1;
for (var n in this.allpick_uid) if (this.allpick_uid.hasOwnProperty(n)) {
if (this.allpick_uid[n] == e) {
t = !0;
break;
}
}
return t;
};
t.prototype.onRevengeClick = function(e, t) {
var n = this;
if (2 == t) {
var o = Number(e.node.name), i = this.m_list[o].pick_id, r = this.m_list[o].farm_player_id;
this.sendUrl({
action: "StealFarm",
param: JSON.stringify({
pick_id: i
})
}, function(e) {
if (1 != e.status) n.cmdToast(e.title); else {
e.farm_player_id = r;
n.addLayer(a.default.LAYER.StealVegetables, e);
}
n.removeFromParent();
}, {
loading: !0
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ l(cc.Prefab) ], t.prototype, "m_enemylist_item", void 0);
i([ l(cc.SpriteFrame) ], t.prototype, "m_imgbtn", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
MyIncomeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1629dXMwPxN8I7Lca8lcmBe", "MyIncomeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.page = null;
t.pageNum = 1;
return t;
}
t.prototype.onCreate = function(e) {
for (var t = 0, n = [ "bg/button_close", "bg/btn_clickLeft", "bg/btn_clickRight" ]; t < n.length; t++) {
var o = n[t], i = this.seekNodeByName(o);
this.addTouchEventListener(i, this.onBtnClick.bind(this));
}
this.onBtnClickPage(1);
};
t.prototype.createList = function(e) {
var t = this.seekNodeByName("bg/ScrollView/view/content");
t.removeAllChildren();
if (e.list.length > 0) for (var n = 0; n < e.list.length; n++) {
var o = cc.instantiate(this.m_item);
this.seekCompByName(cc.Label, "date", o).string = e.list[n].collect_date;
this.seekCompByName(cc.Label, "sy", o).string = e.list[n].apprentice_amount;
this.seekCompByName(cc.Label, "gx", o).string = e.list[n].apprentice_son_amount;
this.seekCompByName(cc.Label, "tdgx", o).string = e.list[n].team_amount;
this.seekCompByName(cc.Label, "total", o).string = e.list[n].accumulate_amount;
o.parent = t;
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
switch (e.name) {
case "button_close":
this.removeFromParent();
break;

case "btn_clickLeft":
this.onBtnClickPage(1);
break;

case "btn_clickLeft":
this.onBtnClickPage(2);
}
}
};
t.prototype.onBtnClickPage = function(e) {
var t = this;
1 == e ? this.pageNum > 1 && this.pageNum-- : this.pageNum++;
this.sendUrl({
action: "RebateList",
param: JSON.stringify({
page: this.pageNum,
page_size: "10"
})
}, function(e) {
if (e.total < t.pageNum) e.total > 0 && (t.pageNum = e.total); else {
t.page.string = t.pageNum + "";
t.createList(e);
}
var n = t.seekNodeByName("bg/btn_clickLeft"), o = t.seekNodeByName("bg/btn_clickRight");
n.active = t.pageNum > 1;
o.active = t.pageNum > 1;
t.page.node.active = t.pageNum > 1;
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ c(cc.Prefab) ], t.prototype, "m_item", void 0);
i([ c(cc.Label) ], t.prototype, "page", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
MyTeamLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "52f4cfx7nBEsLGMO0bGyo0w", "MyTeamLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.page = null;
t.m_spriteFrames = [];
t.pageNum = 1;
t.clickType = 1;
t.m_leftbtn = null;
t.m_rightbtn = null;
t.m_sel = -1;
t.m_btns = [];
return t;
}
t.prototype.onCreate = function(e) {
for (var t = 0, n = [ "bg/button_close", "bg/layout/btn1", "bg/layout/btn2", "bg/layout/btn3", "bg/layout/btn4", "bg/btn_clickLeft", "bg/btn_clickRight" ]; t < n.length; t++) {
var o = n[t], i = this.seekNodeByName(o);
this.addTouchEventListener(i, this.onBtnClick.bind(this));
}
this.m_leftbtn = this.seekNodeByName("bg/btn_clickLeft");
this.m_rightbtn = this.seekNodeByName("bg/btn_clickRight");
for (var r = 1; r <= 4; r++) this.m_btns.push(this.seekCompByName(cc.Button, "bg/layout/btn" + r));
var a = [ 1, 2, 4, 3 ][e] || 1;
this.onBtnTouch(a);
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.createList = function(e) {
this.seekNodeByName("bg/ScrollView");
var t = this.seekNodeByName("bg/ScrollView/view/content");
t.removeAllChildren();
var n = {
"徒弟": 0,
"徒孙": 1,
"团队": 2
};
if (e.list.length > 0) for (var o = 0; o < e.list.length; o++) {
var i = cc.instantiate(this.m_item);
this.seekCompByName(cc.Label, "name", i).string = e.list[o].user_name;
this.seekCompByName(cc.Label, "date", i).string = e.list[o].create_time;
this.seekCompByName(cc.Label, "level", i).string = e.list[o].level + "级";
var r = this.seekCompByName(cc.Sprite, "img_1", i);
r.spriteFrame = this.m_spriteFrames[n[e.list[o].team_level_name]];
r.node.active = 4 == this.clickType;
if (r.node.active) {
this.seekCompByName(cc.Label, "name", i).node.x = -480;
this.seekCompByName(cc.Label, "date", i).node.x = -480;
}
i.parent = t;
}
t.getComponent(cc.Layout).updateLayout();
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
switch (e.name) {
case "button_close":
this.removeFromParent();
break;

case "btn1":
this.onBtnTouch(1);
break;

case "btn2":
this.onBtnTouch(2);
break;

case "btn3":
this.onBtnTouch(3);
break;

case "btn4":
this.onBtnTouch(4);
break;

case "btn_clickLeft":
this.onBtnClickPage(1);
break;

case "btn_clickRight":
this.onBtnClickPage(2);
}
}
};
t.prototype.onBtnTouch = function(e) {
var t = this;
if (this.m_sel != e) {
this.m_sel = e;
this.pageNum = 1;
this.setButtonDisabled(this.m_btns, e - 1);
this.clickType = 3 == e ? 4 : 4 == e ? 3 : e;
this.sendUrl({
action: "MineTeam",
param: JSON.stringify({
type: this.clickType + "",
page: this.pageNum,
page_size: "10"
})
}, function(e) {
t.createList(e);
var n = t.seekNodeByName("bg/btn_clickLeft"), o = t.seekNodeByName("bg/btn_clickRight"), i = e.pages.page_count > 1;
n.active = !1;
o.active = i;
t.page.node.active = i;
i && (t.page.string = e.pages.page + " / " + e.pages.page_count);
});
}
};
t.prototype.onBtnClickPage = function(e) {
var t = this;
1 == e ? this.pageNum-- : this.pageNum++;
this.sendUrl({
action: "MineTeam",
param: JSON.stringify({
type: this.clickType + "",
page: this.pageNum,
page_size: "10"
})
}, function(e) {
t.pageNum = e.pages.page;
t.page.string = e.pages.page + " / " + e.pages.page_count;
t.createList(e);
t.m_leftbtn.active = e.pages.page > 1;
t.m_rightbtn.active = e.pages.page < e.pages.page_count;
});
};
i([ c(cc.Prefab) ], t.prototype, "m_item", void 0);
i([ c(cc.Label) ], t.prototype, "page", void 0);
i([ c(cc.SpriteFrame) ], t.prototype, "m_spriteFrames", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
NoticeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fd02cKSroZKgqPOqq2ZGYN5", "NoticeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekCompByName(cc.Button, "bg/button");
this.addTouchEventListener(n, function(n, o) {
if (2 == o) {
e.func && e.func(0);
t.removeFromParent();
}
});
this.seekCompByName(cc.Label, "bg/scrollview/view/content/lable_1").string = e;
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
OfflineRevenueLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d3277O0LKpFQpAewTICNiIF", "OfflineRevenueLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = e(".././ADLayer"), c = cc._decorator, l = c.ccclass, u = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_gold = 0;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_gold = Number(e);
this.seekCompByName(cc.Label, "bg_2/img_3/label_money").string = "+" + a.default.glodConverToString(e);
var n = this.seekCompByName(cc.RichText, "bg_2/lable_info");
n.string = n.string.replace("%d", String(this.m_manager.m_userData.video_num));
var o = this.seekNodeByName("bg_2/button_close");
this.addTouchEventListener(o, function(n, o) {
if (2 == o) {
t.showAddGold(a.default.glodConverToString(e));
t.removeFromParent();
}
});
var i = this.seekNodeByName("bg_2/btn_freeGet");
this.addTouchEventListener(i, function(e, n) {
2 == n && t.seekAd(s.default.TYPE.REVENUEOFLINE, {
total: 0,
offgold: t.m_gold
}, function(e) {
var n = String(3 * t.m_gold);
t.addLayer(a.default.LAYER.RewardLayer, {
type: 2,
value: n
});
t.removeFromParent();
});
});
};
return t = i([ l ], t);
}(r.default));
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance",
".././ADLayer": "ADLayer"
} ],
PopUpLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "10c29k0dPBAyKB2H3VcI5UD", "PopUpLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
n = t;
t.prototype.onCreate = function(e) {
this.seekCompByName(cc.Label, "sprite_bg2/lab_text").string = e[1];
this.m_callBack = e[0];
for (var t = 1; t <= 2; t++) {
var o = this.seekCompByName(cc.Button, "sprite_bg2/btn_" + t);
this.addTouchEventListener(o, this.onBtnClick.bind(this));
}
if (e[2] == n.MSG_OK) {
this.seekNodeByName("sprite_bg2/btn_2").active = !1;
this.seekNodeByName("sprite_bg2/btn_1").x = 0;
}
if (e[3]) {
var i = this.seekCompByName(cc.Sprite, "Panel_cancel");
this.addTouchEventListener(i, this.onBtnClick.bind(this));
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
this.removeFromParent();
var n = e.node.name;
if (("btn_1" == n || "btn_2" == n) && this.m_callBack) {
var o = n.slice(n.length - 1, n.length), i = parseInt(o) - 1;
this.m_callBack(0 == i ? 1 : 0);
}
}
};
t.prototype.onBack = function() {
this.removeFromParent();
this.m_callBack(0);
return !0;
};
var n;
t.MSG_OKCANCEL = 0;
t.MSG_OK = 1;
return t = n = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
ProgressLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "88c14jmB4xMyarmQE+rSokl", "ProgressLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_label = null;
t.m_process = null;
return t;
}
t.prototype.onCreate = function(e) {
this.m_label = this.seekCompByName(cc.Label, "label");
this.addEventListener("setProgress", this.onProcess.bind(this));
};
t.prototype.onProcess = function(e) {
this.m_label.string = "资源加载中" + Math.floor(100 * e) + "%";
};
t.prototype.releaseSelf = function() {};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
PupilDevoteLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "adc84MaOAtGwbtlFR8GQ3vu", "PupilDevoteLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg/btn_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
RedPackageLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5bd13m6LfhBhKht8JuIrdbh", "RedPackageLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = a.property, l = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_nodes = [];
t.m_sounds = null;
t.m_anime_caidai = null;
return t;
}
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.onCreate = function(e) {
var t = this;
this.m_manager.playEffect(this.m_sounds);
for (var n = 0, o = [ "panel1", "panel2" ]; n < o.length; n++) {
var i = o[n];
this.m_nodes.push(this.seekNodeByName(i));
}
this.setNodeVisible(this.m_nodes, 0);
this.m_anime_caidai = this.seekCompByName(sp.Skeleton, "anime");
this.m_anime_caidai.node.active = !1;
this.m_anime_caidai.setCompleteListener(function(e) {
t.m_anime_caidai.node.active = !1;
});
var r = this.seekCompByName(cc.Button, "panel1/button");
this.addTouchEventListener(r, function(e, n) {
if (2 == n) if (t.m_manager.m_userData.cashlevel.length > 0) t.sendUrl({
action: "CashLevel",
param: JSON.stringify({
lv: t.m_manager.m_userData.cashlevel[0]
})
}, function(e) {
t.m_nodes[1].setScale(0);
t.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function(e, n) {
t.setNodeVisible(t.m_nodes, 1);
t.m_nodes[1].runAction(cc.scaleTo(.5, 1));
}, t), cc.callFunc(function(e, n) {
t.m_anime_caidai.node.active = !0;
t.m_anime_caidai.clearTrack(0);
t.m_anime_caidai.setAnimation(0, "hongbao_tx", !1);
}, t)));
t.m_manager.m_userData.cashlevel.shift();
t.m_scene.m_hallLayer.setOwnermb(e.ownermb);
t.seekCompByName(cc.Label, "panel2/label").string = String(e.money);
var n = t.seekCompByName(cc.Button, "panel2/button2");
t.addTouchEventListener(n, function() {
t.m_scene.m_hallLayer.refLevelUpRedPackage();
t.dispatchEvent("redget_success");
t.removeFromParent();
});
}); else {
t.cmdToast("等级不够");
t.dispatchEvent("redget_success");
t.removeFromParent();
}
});
};
i([ c({
type: cc.AudioClip
}) ], t.prototype, "m_sounds", void 0);
return t = i([ s ], t);
}(r.default);
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
RewardLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "1e180I9nXNDF4xzXAGYVWMm", "RewardLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_data = null;
t.m_imgsTree = [];
t.m_sounds = null;
t.m_animes = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_manager.playEffect(this.m_sounds);
this.m_data = e;
for (var n = [], o = 1; o <= 5; o++) n.push(this.seekNodeByName("panel" + o));
this.setNodeVisible(n, e.type - 1);
var i = n[e.type - 1];
switch (e.type) {
case 1:
var r = this.seekCompByName(cc.Label, "bg_2/label", i), s = String(e.value);
-1 == s.indexOf(".") && s.length < 3 && (s += ".0");
r.string = s;
var c = this.seekCompByName(cc.Button, "button", i);
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
t.m_manager.showAddGold(t.m_data.value);
t._end();
}
});
break;

case 2:
var l = this.seekCompByName(sp.Skeleton, "anime", i), u = e.changeAnimate ? this.m_animes[1] : this.m_animes[0];
l.skeletonData = u;
var m = u._skeletonJson.animations;
for (var p in m) {
l.setAnimation(0, p, !0);
break;
}
(r = this.seekCompByName(cc.Label, "bg_3/label", i)).string = a.default.glodConverToString(e.value);
c = this.seekCompByName(cc.Button, "button", i);
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
t.m_manager.showAddGold(a.default.glodConverToString(t.m_data.value));
t._end();
}
});
break;

case 3:
r = this.seekCompByName(cc.Label, "bg_2/bg_3/label", i);
var h = Number(e.value) - 1, _ = this.m_manager.m_shopInfo[h], d = Number(e.value) > 38 ? "38" : e.value;
r.string = "Lv." + d + " " + _.name;
this.seekCompByName(cc.Sprite, "bg_2/img_1", i).spriteFrame = this.m_scene.m_spriteFrames[h];
c = this.seekCompByName(cc.Button, "button", i);
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
t.cmdToast("炫耀功能有待实现");
t._end();
}
});
c = this.seekCompByName(cc.Button, "button1", i);
this.addTouchEventListener(c, function(e, n) {
2 == n && t._end();
});
break;

case 4:
(u = this.seekCompByName(sp.Skeleton, "anime")).node.active = !1;
var f = Number(e.value) > 38 ? 38 : Number(e.value), y = (r = this.seekCompByName(cc.Label, "bg_2/bg_3/label", i), 
this.seekCompByName(sp.Skeleton, "bg_2/anime_tssc", i)), g = (l = this.seekCompByName(cc.Sprite, "img_6", y.node), 
this.m_scene.m_animes[Number(e.value) - 1]);
y.skeletonData = g;
m = g._skeletonJson.animations;
var v = Number(e.value);
if (v >= 41 && v <= 45) {
p = "baoshu" + String([ 2, 4, 1, 5, 3 ][v - 41]);
y.setAnimation(0, p, !0);
l.spriteFrame = this.m_imgsTree[v - 41];
l.node.active = !0;
} else {
for (var p in m) {
y.setAnimation(0, p, !0);
break;
}
l.node.active = !1;
}
r.string = v >= 38 ? this.m_manager.m_shopInfo[v - 1].name : "Lv." + f + " " + this.m_manager.m_shopInfo[f - 1].name;
c = this.seekCompByName(cc.Button, "button", i);
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
t.cmdToast("炫耀功能有待实现");
6 == f && 0 == t.m_manager.m_userData.speed_total && t.m_scene.m_hallLayer.GuideQuicken();
t._end();
}
});
c = this.seekCompByName(cc.Button, "button1", i);
this.addTouchEventListener(c, function(e, n) {
if (2 == n) {
6 == f && 0 == t.m_manager.m_userData.speed_total && t.m_scene.m_hallLayer.GuideQuicken();
t._end();
}
});
var b = this.seekCompByName(cc.RichText, "bg_7/richtext", i);
b.string = b.string.replace("$LV", String(38 - f));
38 == f && (b.node.active = !1);
var N = this.seekCompByName(cc.ProgressBar, "bg_7/progressBar", i), L = f / 38;
N.progress = L;
(r = this.seekCompByName(cc.Label, "label", N.node)).string = Math.floor(100 * L) + "%";
(r = this.seekCompByName(cc.Label, "bg_7/label", i)).string = this.m_manager.m_userData.apiece_income_amount;
break;

case 5:
c = this.seekCompByName(cc.Button, "button", i);
this.addTouchEventListener(c, function(e, n) {
2 == n && t._end();
});
}
};
t.prototype._end = function() {
this.m_data.func && this.m_data.func();
this.removeFromParent();
};
i([ l(cc.SpriteFrame) ], t.prototype, "m_imgsTree", void 0);
i([ l({
type: cc.AudioClip
}) ], t.prototype, "m_sounds", void 0);
i([ l({
type: sp.SkeletonData
}) ], t.prototype, "m_animes", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
RotaryTableLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3f9fa1ShTFIFLvYLTGjrndd", "RotaryTableLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = e("./ADLayer"), c = e("../Common/Popup/TipsLayer"), l = cc._decorator, u = l.ccclass, m = l.property, p = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgs = [];
t.m_rewardTipsImgs = [];
t.m_sound = null;
t.m_imgRewardTips = null;
t.m_prizeids = [ 2, 0, 5, 4, 6, 1, 7, 3 ];
t.m_idx = 0;
t.m_bet = 0;
return t;
}
t.prototype.setLight = function(e) {
var t = this, n = this.seekCompByName(cc.Sprite, "bg_3/bg_4");
n.node.stopAllActions();
n.node.runAction(cc.sequence(cc.delayTime(e), cc.callFunc(function(e) {
var n = e.getComponent(cc.Sprite);
++t.m_idx;
t.m_idx %= 2;
n.spriteFrame = t.m_imgs[t.m_idx];
})).repeatForever());
};
t.prototype.onCreate = function(e) {
var t = this;
this._setZpNum(this.m_manager.m_userData.zpnums);
var n = this.seekNodeByName("bg_3/button_close");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
this.m_imgRewardTips = this.seekCompByName(cc.Sprite, "bg_3/img_rewardTips");
this.m_imgRewardTips.node.active = !1;
var o = Number(this.m_manager.m_userData.roulette_id);
if (5 == o || 6 == o) {
this.m_imgRewardTips.spriteFrame = this.m_rewardTipsImgs[5 == o ? 0 : 1];
this.m_imgRewardTips.node.active = !0;
}
this.m_bg = this.seekCompByName(cc.Sprite, "bg_3/bg_1");
this.m_bg.node.angle = a.default.random(0, 360);
for (var i = this.m_manager.m_userData.roulette, r = 0, s = 0, c = [ 1, 5, 0, 7, 3, 2, 4, 6 ]; s < c.length; s++) {
var l = c[s];
this.seekCompByName(cc.Label, "bg_3/bg_1/label" + r).string = i[l];
r++;
}
var u = this.seekCompByName(cc.Button, "bg_3/button");
this.addTouchEventListener(u, function(e, n) {
if (2 == n) {
t.m_imgRewardTips.node.active = !1;
if (t.m_manager.m_userData.zpnums < 1) t._addZpNum(); else {
e.interactable = !1;
var o = t.seekCompByName(cc.Button, "bg_3/button_close");
o.interactable = !1;
var i = t.seekCompByName(cc.Button, "bg_3/bg_22/button");
i.interactable = !1;
t.sendUrl({
action: "Roulette",
param: JSON.stringify({
total: 0
})
}, function(n) {
t.m_manager.m_userData.zpnums = Number(n.nums);
t._setZpNum(n.nums);
t.m_manager.m_userData.roulette_id = Number(n.prizeid);
t.m_bg.node.angle = 45 * (t.m_prizeids[Number(n.prizeid) - 1] + 1) + (a.default.random(0, 30) - 15);
t.setLight(.3);
t.m_manager.playEffect(t.m_sound);
t.m_bg.node.runAction(cc.sequence(cc.rotateBy(4, -3960).easing(cc.easeSineOut()), cc.callFunc(function() {
t.setLight(.6);
t._over(n);
}), cc.delayTime(.2), cc.callFunc(function(e, t) {
for (var n = 0, o = t; n < o.length; n++) {
o[n].interactable = !0;
}
}, t, [ e, o, i ])));
t.m_manager.RefreshTheTask(a.default.TASK_TYPE.ROTARY_TABLE);
});
t.setLight(.6);
}
}
});
u = this.seekCompByName(cc.Button, "bg_3/bg_22/button");
this.addTouchEventListener(u, function(e, n) {
2 == n && t._addZpNum();
});
};
t.prototype._addZpNum = function() {
var e = this;
this.addLayer(a.default.LAYER.TipsLayer, {
type: c.default.TYPE.Tips,
btnType: c.default.BTN_TYPE.FreeGet,
content: c.default.Content.FreeGet,
num: 5,
func: function(t) {
if (1 == t) {
e.seekAd(s.default.TYPE.ROTARY, {}, function() {
e.removeLayer(a.default.LAYER.TipsLayer);
e.m_manager.m_userData.zpnums += 5;
e._setZpNum(e.m_manager.m_userData.zpnums);
e.cmdToast("转盘卷数量增加5");
});
return !0;
}
}
});
};
t.prototype._setZpNum = function(e) {
this.seekCompByName(cc.Label, "bg_3/bg_22/label").string = "转盘卷x" + e;
this.dispatchEvent("ZPNUMBS_CHANGE");
};
t.prototype._over = function(e) {
var t = this, n = this.m_scene, o = Number(e.prizeid);
switch (o) {
case 1:
case 2:
case 3:
this.addLayer(a.default.LAYER.RewardLayer, {
type: 2,
value: e.add_gold
});
break;

case 4:
n.m_hallLayer.createVegetables(Number(e.sid), Number(e.pos - 1));
this.m_manager.m_userData.income = a.default.string_add(this.m_manager.m_userData.income, this.m_manager.m_shopInfo[e.sid - 1].income);
n.m_hallLayer.setIncome();
this.addLayer(a.default.LAYER.RewardLayer, {
type: 3,
value: e.sid
});
n.m_hallLayer.refIncome();
break;

case 5:
case 6:
this.m_bet = 5 == o ? 5 : 10;
this.addLayer(a.default.LAYER.TipsLayer, {
type: c.default.TYPE.Tips,
btnType: c.default.BTN_TYPE.Double,
content: c.default.Content.Double,
num: this.m_bet,
func: function(e) {
if (1 == e) {
t.seekAd(5 == o ? s.default.TYPE.WATCH_ZP_5 : s.default.TYPE.WATCH_ZP_10, null, function(e) {
t.removeLayer(a.default.LAYER.TipsLayer);
t.m_imgRewardTips.spriteFrame = t.m_rewardTipsImgs[5 == t.m_bet ? 0 : 1];
t.m_imgRewardTips.node.active = !0;
});
return !0;
}
}
});
break;

case 7:
this.m_manager.m_userData.invite_num++;
this.addLayer(a.default.LAYER.RewardLayer, {
type: 5
});
break;

case 8:
var i = String(e.money);
this.addLayer(a.default.LAYER.RewardLayer, {
type: 1,
value: i,
func: function() {
t.m_scene.m_hallLayer.setOwnermb();
}
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ m(cc.SpriteFrame) ], t.prototype, "m_imgs", void 0);
i([ m(cc.SpriteFrame) ], t.prototype, "m_rewardTipsImgs", void 0);
i([ m({
type: cc.AudioClip
}) ], t.prototype, "m_sound", void 0);
return t = i([ u ], t);
}(r.default);
n.default = p;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance",
"../Common/Popup/TipsLayer": "TipsLayer",
"./ADLayer": "ADLayer"
} ],
Scene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "336763JVkJB9b1sYW1CEW0L", "Scene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../engine/UIBase"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.getMeta = function(e) {
return this.m_manager.getMeta(e);
};
t.prototype.getMetaInt = function(e) {
return this.m_manager.getMetaInt(e);
};
t.prototype.cmdToast = function(e) {
this.m_manager.cmdToast(e);
};
t.prototype.onBackHomeEvent = function(e) {
if (e) {
if (1 != this.m_homeCount) return;
this.m_homeCount = !1;
do {
if (0 == this.m_homeBool) break;
var t = new Date().getTime() - this.m_pauseTime;
t > 3e5 || t > 15 || this.shortResume();
} while (0);
this.dispatchEvent("CHECK_PASTEBOARD");
} else {
if (1 == this.m_homeCount) return;
this.m_homeCount = !0;
this.m_pauseTime = new Date().getTime();
}
};
t.prototype.shortResume = function() {};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../engine/UIBase": "UIBase"
} ],
ScriptDefine: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "78e36eXzkhKn7jSumiut2fb", "ScriptDefine");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.YY_VERSION = 2;
(function(e) {
e[e.RETURN_BREAK_THIS_FRAME = 0] = "RETURN_BREAK_THIS_FRAME";
e[e.RETURN_ERROR = 1] = "RETURN_ERROR";
e[e.RETURN_NORMAL = 2] = "RETURN_NORMAL";
e[e.RETURN_NO_EXECUTE = 3] = "RETURN_NO_EXECUTE";
e[e.RETURN_FUNCTION = 4] = "RETURN_FUNCTION";
e[e.RETURN_OVER = 5] = "RETURN_OVER";
})(n.RETURN || (n.RETURN = {}));
(function(e) {
e[e._ADD = 0] = "_ADD";
e[e._SUBTRACT = 1] = "_SUBTRACT";
e[e._MULTIPLY = 2] = "_MULTIPLY";
e[e._DIVIDE = 3] = "_DIVIDE";
e[e._BITAND = 4] = "_BITAND";
e[e._BITOR = 5] = "_BITOR";
e[e._CALLPROPERTY = 6] = "_CALLPROPERTY";
e[e._COERCE_I = 7] = "_COERCE_I";
e[e._COERCE_S = 8] = "_COERCE_S";
e[e._CONVERT_I = 9] = "_CONVERT_I";
e[e._LSHIFT = 10] = "_LSHIFT";
e[e._INCLOCAL_I = 11] = "_INCLOCAL_I";
e[e._DECREMENT_I = 12] = "_DECREMENT_I";
e[e._DUP = 13] = "_DUP";
e[e._SETLOCAL = 14] = "_SETLOCAL";
e[e._GETLOCAL = 15] = "_GETLOCAL";
e[e._IFFALSE = 16] = "_IFFALSE";
e[e._IFTRUE = 17] = "_IFTRUE";
e[e._IFEQ = 18] = "_IFEQ";
e[e._IFNE = 19] = "_IFNE";
e[e._IFNGE = 20] = "_IFNGE";
e[e._IFNGT = 21] = "_IFNGT";
e[e._IFNLE = 22] = "_IFNLE";
e[e._IFNLT = 23] = "_IFNLT";
e[e._JUMP = 24] = "_JUMP";
e[e._KILL = 25] = "_KILL";
e[e._LABEL = 26] = "_LABEL";
e[e._MODULO = 27] = "_MODULO";
e[e._NEGATE = 28] = "_NEGATE";
e[e._NOT = 29] = "_NOT";
e[e._POP = 30] = "_POP";
e[e._PUSHFALSE = 31] = "_PUSHFALSE";
e[e._PUSHTRUE = 32] = "_PUSHTRUE";
e[e._PUSHINT = 33] = "_PUSHINT";
e[e._PUSHSTRING = 34] = "_PUSHSTRING";
e[e._PUSHNULL = 35] = "_PUSHNULL";
e[e._RETURN = 36] = "_RETURN";
e[e._END = 37] = "_END";
e[e._CONSTRUCTPROP = 38] = "_CONSTRUCTPROP";
e[e._FUNCTION = 39] = "_FUNCTION";
e[e._LESSTHEN = 40] = "_LESSTHEN";
e[e._EQUALS = 41] = "_EQUALS";
e[e._LESSEQUALS = 42] = "_LESSEQUALS";
e[e._BITNOT = 43] = "_BITNOT";
e[e._RSHIFT = 44] = "_RSHIFT";
e[e._GREATERTHAN = 45] = "_GREATERTHAN";
e[e._GREATEREQUALS = 46] = "_GREATEREQUALS";
e[e._NOTEQUALS = 47] = "_NOTEQUALS";
e[e._BITXOR = 48] = "_BITXOR";
e[e._PUSHNUMBER = 49] = "_PUSHNUMBER";
})(n.CODE || (n.CODE = {}));
cc._RF.pop();
}, {} ],
ScriptManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9122falqo1KArY3dOBsJJOf", "ScriptManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../engine/Manager"), i = e("./Instance"), r = e("../engine/script/ScriptDefine"), a = e("../engine/script/ScriptPerform"), s = e("../engine/Utils/UserDefault"), c = e("../engine/Utils/JSEvent"), l = e("../engine/Utils/ZipManager"), u = function() {
function e(e, t, n, i) {
void 0 === n && (n = null);
void 0 === i && (i = null);
this.m_agent = e;
this.m_waitCount = 0;
this.m_manager = o.getManager();
this.m_ZipManager = l.default.getInstance();
this.m_writablePath = jsb.fileUtils.getWritablePath();
this.m_ud = s.default.getInstance();
this.doScript(t, n, i);
o.getManager().addToProcess(this);
}
e.prototype.setName = function(e) {
this.m_name = e;
};
e.prototype.releaseResource = function() {
o.getManager().removeProcess(this);
};
e.prototype.process = function() {
if (0 == this.m_waitCount && this.m_script) for (var e = void 0; 0 == this.m_waitCount; ) if ((e = this.m_script.process()) != r.RETURN.RETURN_NORMAL) {
if (e != r.RETURN.RETURN_BREAK_THIS_FRAME) {
this.m_script.getResult();
delete this.m_script;
this.releaseResource();
this.m_agent && this.m_agent.onScriptOver && this.m_agent.onScriptOver(this.m_name);
}
break;
}
};
e.prototype.isWait = function() {
return 0 != this.m_waitCount;
};
e.prototype.changeWaitCount = function(e) {
this.m_waitCount = this.m_waitCount + (e ? 1 : -1);
};
e.prototype.doScript = function(e, t, n) {
this.m_script = new a.default(this);
this.m_script.loadCyy(e);
this.m_script.doFunction(t || "main");
n && this.m_script.getCurFunc().addParams(n);
};
e.prototype.setFunctionResult = function(e) {
this.m_script && this.m_script.setFunctionResult(e);
};
e.prototype.setFuncResult = function(e) {
this.setFunctionResult(e);
this.changeWaitCount(!1);
};
e.prototype.onSayCallback = function(e) {
this.setFunctionResult(e);
this.changeWaitCount(!1);
};
e.prototype.removeDownEv = function() {
if (this.m_downloadHandler) {
this.m_manager.removeEventListener(this.m_downloadHandler);
delete this.m_downloadHandler;
}
};
e.prototype.download = function(e, t, n) {
this.removeDownEv();
var i = c.default.getInstance().getNextIdx();
this.m_downloadHandler = this.m_manager.addEventListener(i, this, this.onDownLoad.bind(this));
o.default.addDownloadRequest(e, n + t, 15, i);
};
e.prototype.onDownLoad = function(e) {
if ("over" == e.flag) {
this.setFunctionResult({
code: e.code,
desc: e.desc
});
this.changeWaitCount(!1);
} else if (this.m_agent && this.m_agent.refProcess2) {
var t = e.progress, n = e.total;
this.m_agent.refProcess2(t, n);
}
};
e.prototype.onUnzip = function(e) {
if (2 == e.cmd) this.m_agent && this.m_agent.refProcess2 && this.m_agent.refProcess2(e.progress, e.total); else {
if (this.m_unzipHandler) {
this.m_manager.removeEventListener(this.m_unzipHandler);
delete this.m_unzipHandler;
}
this.setFunctionResult(e);
this.changeWaitCount(!1);
}
};
e.prototype.AnimationOver = function() {
this.changeWaitCount(!1);
};
e.prototype.MsgBoxOkCancel = function(e, t) {
this.m_manager.msgBox(e, t, 0, !1);
};
e.prototype.MsgBoxOk = function(e, t) {
this.m_manager.msgBox(e, t, 1, !1);
};
e.prototype.callExFunc = function(e, t, n) {
var a = r.RETURN.RETURN_NORMAL;
if ("time" == e) {
var c = new Date().getSeconds();
n.push(c);
} else if ("isApp" == e) n.push(!0); else if ("xToast" == e) {
var l = t[0];
l && 0 != l && this.m_manager.cmdToast([ l ]);
a = r.RETURN.RETURN_NORMAL;
} else if ("xDispatchEvent" == e) {
o.getManager().dispatchEvent(t[0], t[1]);
a = r.RETURN.RETURN_NORMAL;
} else if ("xShowLoad" == e) {
var u = o.getManager().getCurScene();
t[0] ? u.addLayer(i.default.LAYER.LoadLayer, t[0]) : u.removeLayer(i.default.LAYER.LoadLayer);
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("getIpsUrl" == e) n.push(this.m_ud.getStringForKey("IP_URL", "")); else if ("say" == e) {
this.changeWaitCount(!0);
var m = t[0];
2 == m ? this.MsgBoxOkCancel(t[1], this.onSayCallback.bind(this)) : 3 == m ? this.MsgBoxOk(t[1], this.onSayCallback.bind(this)) : 4 == m ? this.m_agent.UpdateMsgBox(t[1], t[2], t[3], t[4], t[5], this.onSayCallback.bind(this)) : 5 == m && o.getManager().getCurScene().addLayer(i.default.LAYER.NOTICE, {
text: t[1],
func: this.onSayCallback.bind(this)
});
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("quit" == e) {
o.getManager().addCmd(this, o.default.CMDS.END_GAME);
this.changeWaitCount(!0);
} else if ("setKey" == e) this.m_ud.setStringForKey(t[0], t[1]); else if ("delKey" == e) this.m_ud.deleteValueForKey(t[0]); else if ("getKey" == e) {
var p = t[1];
p || (p = "");
var h = this.m_ud.getStringForKey(t[0], p);
n.push(h);
} else if ("download" == e) {
var _ = t[2];
_ || (_ = this.m_writablePath);
this.download(t[0], t[1], _);
this.changeWaitCount(!0);
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("writablePath" == e) n.push(this.m_writablePath); else if ("isFileExist" == e) n.push(jsb.fileUtils.isFileExist(t[0])); else if ("getZipFileTotal" == e) n.push(jsb.ZipManager.getZipFileTotal(t[0])); else if ("unzip" == e) {
var d = o.getManager(), f = d.getRandomEventName();
this.m_unzipHandler = d.addEventListener(f, this, this.onUnzip.bind(this));
this.m_ZipManager.addUnZipRequest(t[0], t[1], f);
this.changeWaitCount(!0);
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("getHomePath" == e) n.push(jsb.CMiscHelper.getHomePath()); else if ("platform" == e) n.push(o.default.platform()); else if ("getFileMd5" == e) {
var y = jsb.MD5.MD5Cal(t[0]);
n.push(y);
} else if ("removeFile" == e) {
var g = jsb.fileUtils, v = t[0];
g.isFileExist(v) && g.removeFile(v);
} else if ("removeDirectory" == e) {
g = jsb.fileUtils, v = t[0];
g.isFileExist(v) && g.removeDirectory(v);
} else if ("readJson" == e) n.push(JSON.parse(jsb.fileUtils.getStringFromFile(t[0]))); else if ("openURL" == e) cc.sys.openURL(t[0]); else if ("packageVerName" == e) n.push(o.getManager().getMeta("packageVersionName")); else if ("packageVerCode" == e) n.push(o.getManager().getMeta("packageVersionCode")); else if ("startGame" == e) {
this.releaseResource();
this.m_agent.startGame();
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("parseInt" == e) n.push(parseInt(t[0])); else if ("versionName" == e) n.push(o.getManager().getMeta("versionName")); else if ("versionCode" == e) n.push(o.getManager().getMeta("versionCode")); else if ("resetGame" == e) {
this.releaseResource();
this.m_agent.resetGame();
a = r.RETURN.RETURN_BREAK_THIS_FRAME;
} else if ("flush" == e) s.default.getInstance().flush(); else {
a = r.RETURN.RETURN_NO_EXECUTE;
this.m_agent && this.m_agent.callExFunc && (a = this.m_agent.callExFunc(e, t, n));
}
return a;
};
e.prototype.createObj = function(e, t, n) {
return r.RETURN.RETURN_NO_EXECUTE;
};
return e;
}();
n.default = u;
cc._RF.pop();
}, {
"../engine/Manager": "Manager",
"../engine/Utils/JSEvent": "JSEvent",
"../engine/Utils/UserDefault": "UserDefault",
"../engine/Utils/ZipManager": "ZipManager",
"../engine/script/ScriptDefine": "ScriptDefine",
"../engine/script/ScriptPerform": "ScriptPerform",
"./Instance": "Instance"
} ],
ScriptPerform: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "59533SNaI1GhKHT1PpdycDk", "ScriptPerform");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./AFunction"), i = e("./ScriptDefine"), r = function() {
function e(e, t) {
void 0 === t && (t = !0);
this.m_agent = e;
this.m_funcTag = {};
this.m_funcStack = [];
}
e.prototype.setLineIdx = function(e) {
this.m_curLine = e;
};
e.prototype.getLineIdx = function() {
return this.m_curLine;
};
e.prototype.getCurLine = function(e) {
return this.m_lines[e];
};
e.prototype.getNumbers = function(e) {
return this.m_numbers[e];
};
e.prototype.getStr = function(e) {
return this.m_strings[e];
};
e.prototype.getCmd = function(e) {
return this.m_cmdQueue[e];
};
e.prototype.getAgent = function() {
return this.m_agent;
};
e.prototype.getCurFunc = function() {
return this.m_curFunc;
};
e.prototype.loadCyy = function(e) {
var t = e;
(t = t.json).version;
this.m_numbers = t.numbers;
for (var n = 0, o = 0, r = this.m_numbers; o < r.length; o++) {
var a = r[o];
this.m_numbers[n++] = Number(a);
}
this.m_strings = t.strings;
this.m_cmdQueue = t.cmd;
for (var s = 0; s < this.m_cmdQueue.length; s++) this.m_cmdQueue[s][0] == i.CODE._FUNCTION && (this.m_funcTag[this.m_strings[this.m_cmdQueue[s][1]]] = {
line: s + 1,
stackLen: this.m_cmdQueue[s][2]
});
this.m_lines = t.lines;
return !0;
};
e.prototype.doFunction = function(e) {
var t = !1;
do {
if (!this.m_funcTag[e]) break;
var n = this.m_funcTag[e];
this.m_curFunc = new o.default(this, n.line, n.stackLen, e);
this.m_funcStack.push(this.m_curFunc);
t = !0;
} while (0);
return t;
};
e.prototype.funcOver = function(e) {
this.m_funcStack.pop();
if (this.m_funcStack.length > 0) {
this.m_curFunc = this.m_funcStack[this.m_funcStack.length - 1];
e && this.m_curFunc.addElement(e);
} else {
this.m_result = e;
this.m_curFunc = null;
}
};
e.prototype.getResult = function() {
return this.m_result && this.m_result.length > 0 ? this.m_result[0] : 0;
};
e.prototype.process = function(e) {
void 0 === e && (e = 0);
var t = i.RETURN.RETURN_NORMAL;
do {
if (!this.m_curFunc) break;
for (;t == i.RETURN.RETURN_NORMAL || t == i.RETURN.RETURN_FUNCTION; ) t = this.m_curFunc.runCmd();
t == i.RETURN.RETURN_ERROR && this.printStack();
} while (0);
return t;
};
e.prototype.setFunctionResult = function(e) {
this.m_curFunc.setFunctionReturn(e);
};
e.prototype.getRunLine = function() {
return this.m_lines[this.m_funcStack[this.m_funcStack.length - 1].m_line];
};
e.prototype.printStack = function() {
for (var e, t = this.m_funcStack.length - 1; t >= 0; t--) (e = this.m_funcStack[t]).m_startLine + e.m_line - 1;
};
return e;
}();
n.default = r;
cc._RF.pop();
}, {
"./AFunction": "AFunction",
"./ScriptDefine": "ScriptDefine"
} ],
SearchTargetLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "a98fabeMllEPL+mUNIUF5q/", "SearchTargetLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
for (var t = this, n = this.seekCompByName(cc.Sprite, "bg_3/img_2"), o = cc.v2(n.node.x, n.node.y), i = [], r = 26; r > 0; r--) {
var s = 50 * Math.cos(r) + o.x, c = 50 * Math.sin(r) + o.y;
i.push(cc.v2(s, c));
}
var l = cc.cardinalSplineTo(6, i, 0);
n.node.runAction(l.repeatForever());
this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(e, o) {
t.sendUrl({
action: "StealFarm",
param: JSON.stringify({})
}, function(e) {
if (1 != e.status) t.cmdToast(e.title); else {
n.node.stopAllActions();
t.addLayer(a.default.LAYER.StealVegetables, e);
}
t.removeFromParent();
}, {
loading: !0
});
}, this)));
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
ShareLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "88219K+BIRGdor49O8Uty2b", "ShareLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../engine/Manager"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgs = [];
t.selIdx = 0;
return t;
}
t.prototype.onCreate = function(e) {
for (var t = this, n = 0, o = [ "bg/img_bg2/btn_save", "bg/img_bg2/btn_wx", "bg/img_bg2/btn_pyq", "bg/img_bg2/btn_copy", "bg/btn_close" ]; n < o.length; n++) {
var i = o[n], r = this.seekNodeByName(i);
this.addTouchEventListener(r, this.onClickBtn.bind(this));
}
for (var s = 0; s < 3; s++) {
var c = this.seekNodeByName("bg/ScrollView/view/content/img_bg" + (s + 1));
this.m_imgs.push(c);
c.tag2 = s;
this.addTouchEventListener(c, this.onClickImg.bind(this));
}
this.onClickImg(this.m_imgs[0], 2);
var l = function(e) {
u.loadByUrl(function(n) {
if (!n.err) {
t.seekCompByName(cc.Sprite, "head/head_img", t.m_imgs[e]).spriteFrame = new cc.SpriteFrame(n.ret);
}
}, u.m_manager.m_userData.avatar, "png");
u.seekCompByName(cc.Label, "invitate_num", u.m_imgs[e]).string = u.m_manager.m_userData.invite_code || "";
}, u = this;
for (s = 0; s < 3; s++) l(s);
var m = this.seekNodeByName("ewm", this.m_imgs[0]), p = this.m_manager.createQRCode("Share_ewm", this.m_manager.m_configData.invite_url || "", {
width: m.width + "",
height: m.height + ""
});
p && jsb.fileUtils.isFileExist(p) && this.loadByUrl(function(e) {
if (e.err) cc.error(e.err); else for (var n = 0; n < 3; n++) {
var o = t.seekNodeByName("ewm", t.m_imgs[n]);
o.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e.ret);
o.active = !0;
}
}, p);
if ("ios" == a.default.platform()) {
this.addEventListener("save_imgsuccess", function(e) {
"1" == e.string ? t.cmdToast("保存成功") : t.cmdToast("保存失败");
});
this.addEventListener("getPHAuth", function(e) {
"1" == e.string ? t._saveimg() : t.cmdToast("保存图片失败");
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype._saveimg = function() {
var e = this, t = this.createImageFile("share_card");
this.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
var n = {
cmd: "save_img",
path: t
}, o = a.default.helper(n);
"android" == a.default.platform() && o && e.cmdToast("图片已保存~");
})));
};
t.prototype.onClickBtn = function(e, t) {
var n = this;
if (2 == t) {
var o = e.name;
if ("btn_close" == o) this.removeFromParent(); else if ("btn_save" == o) {
var i = a.default.platform();
if ("android" == i) this._saveimg(); else if ("ios" == i) {
var r = Number(a.default.IOSHelper({
cmd: "checkPHAuth"
}));
3 == r ? this._saveimg() : 0 == r ? a.default.IOSHelper({
cmd: "getPHAuth"
}) : this.cmdToast("请授予访问相册权限，才能保存图片");
}
} else if ("btn_wx" == o) {
var s = this.createImageFile("share_card");
this.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
n.m_manager.shareToWx(2, 0, "", "", s);
})));
} else if ("btn_pyq" == o) {
var c = this.createImageFile("share_card");
this.node.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
n.m_manager.shareToWx(2, 1, "", "", c);
})));
} else if ("btn_copy" == o) {
this.m_manager.copyToCilp(this.m_manager.m_configData.invite_url || "");
this.cmdToast("已复制到剪贴板~");
}
}
};
t.prototype.onClickImg = function(e, t) {
if (2 == t) {
var n = e.tag2;
this.selIdx = n;
for (var o = 0; o < 3; o++) {
this.seekNodeByName("img_get", this.m_imgs[o]).active = n == o;
}
}
};
t.prototype.createImageFile = function(e) {
e = e + this.selIdx + ".jpg";
var t = this.m_imgs[this.selIdx], n = new cc.Node();
n.parent = t;
var o = n.addComponent(cc.Camera);
o.alignWithScreen = !1;
o.orthoSize = t.height / 2;
var i = new cc.RenderTexture(), r = cc.game._renderContext;
i.initWithSize(t.width, t.height, r.STENCIL_INDEX8);
o.targetTexture = i;
o.render(t);
var a = i.readPixels();
a = this.filpYImage(a, i.width, i.height);
var s = jsb.fileUtils.getWritablePath() + e;
jsb.saveImageData(a, i.width, i.height, s);
n.parent = null;
return s;
};
t.prototype.filpYImage = function(e, t, n) {
for (var o = new Uint8Array(t * n * 4), i = 4 * t, r = 0; r < n; r++) for (var a = (n - 1 - r) * t * 4, s = r * t * 4, c = 0; c < i; c++) o[s + c] = e[a + c];
return o;
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer"
} ],
ShopLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7916b2Y/DZCbJQC0WXF/UMM", "ShopLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.m_curId = 0;
t.m_buying = !1;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.m_level = e > 38 ? 38 : e;
this.m_goldMoney = this.seekCompByName(cc.Label, "bg_1/bg_3/label");
this.m_goldMoney.string = a.default.glodConverToString(this.m_manager.m_userData.gold);
this.addEventListener("GOLD_CHANGE", function() {
t.m_goldMoney.string = a.default.glodConverToString(t.m_manager.m_userData.gold);
});
var n = this.seekNodeByName("bg_1/scrollview/view/content");
this.m_content = n;
for (var o, i = [], r = 0, s = this.m_manager.m_shopInfo; r < s.length; r++) {
var c = s[r];
Number(c.id) <= 37 && i.push(c);
}
this.fastInitList(i, Math.max(7, Math.min(37, this.m_level - 1)), function(e) {
var n = Number(e.id);
(o = cc.instantiate(t.m_item)).name = String(n);
o.parent = t.m_content;
var i = t.seekCompByName(cc.Sprite, "bg_2/img_1", o);
i.spriteFrame = t.m_scene.m_spriteFrames[n - 1];
var r = t.seekCompByName(cc.Label, "label", o);
r.string = e.name;
t.seekCompByName(cc.Label, "bg_4/label", o).string = "LV." + n;
var s = n <= Math.max(1, t.m_level - 4), c = t.seekCompByName(cc.Button, "button_gm", o);
c.node.active = s;
var l = t.seekCompByName(cc.Button, "button_lock", o);
l.node.active = !s;
if (t.m_level < n) {
i.srcBlendFactor = 0;
r.string = "????";
}
var u = t.seekCompByName(cc.Label, "label_bkgm", o);
if (n >= 34) {
u.node.active = !0;
c.node.active = !1;
l.node.active = !1;
} else u.node.active = !1;
(r = t.seekCompByName(cc.Label, "label", c.node)).string = a.default.glodConverToString(e.price);
(r = t.seekCompByName(cc.Label, "label", l.node)).string = Math.max(1, n + 4) + "级解锁";
t.addTouchEventListener(c, function(e, n) {
if (2 == n) {
var o = Number(e.node.parent.name);
t.m_curId = o;
var i = t.m_manager.m_shopInfo[t.m_curId - 1].price;
if (a.default.string_cmp(t.m_manager.m_userData.gold, i) < 0) t.dispatchEvent("GOLD_LACK", null, !0); else if (!t.m_buying) {
t.m_buying = !0;
t.dispatchEvent("onBuy", o, !0);
}
}
});
t.m_content.getComponent(cc.Layout).updateLayout();
});
if (this.m_level > 7) {
var l = Math.max(1, this.m_level - 7) - 1, u = this.seekCompByName(cc.ScrollView, "bg_1/scrollview");
u.scrollTo(cc.v2(0, 1 - o.height * l / (this.m_content.height - u.node.height)));
}
var m = this.seekNodeByName("button_close");
this.addTouchEventListener(m, function(e, n) {
2 == n && t.removeFromParent();
});
this.addEventListener("onBuySuccess", function(e) {
t.m_buying = !1;
if (0 != t.m_curId) {
if (e != t.m_level) {
t.m_level = e;
t.seekNodeByName(t.m_level + "/button_gm", t.m_content).active = !0;
t.seekNodeByName(t.m_level + "/button_lock", t.m_content).active = !1;
}
var n = t.m_manager.m_shopInfo[t.m_curId - 1].price, o = t.seekNodeByName(t.m_curId + "/button_gm", t.m_content);
t.seekCompByName(cc.Label, "label", o).string = a.default.glodConverToString(n);
t.m_level = e;
}
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ l(cc.Prefab) ], t.prototype, "m_item", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
ShowAddMoney: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "871be3iGChDqZQ0Uea9ydWH", "ShowAddMoney");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this.seekCompByName(cc.Label, "font_1");
t.string = "+" + e;
t.node.runAction(cc.spawn(cc.moveBy(1, cc.v2(0, 300)), cc.fadeOut(1)));
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
Sound: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "21317TgF/xNZqrciQZSIaxF", "Sound");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("./UserDefault"), i = function() {
function e() {
this.m_musicOn = !0;
this.m_soundOn = !0;
this.m_ud = null;
this.m_backMusicPath = null;
this.m_effectFlag = null;
this.m_ud = o.default.getInstance();
this.m_effectFlag = {};
cc.audioEngine.setMusicVolume(this.getMusicVolume());
cc.audioEngine.setEffectsVolume(this.getEffectsVolume());
this.m_musicOn = 1 == this.m_ud.getIntegerForKey("musicon", 1);
this.m_soundOn = 1 == this.m_ud.getIntegerForKey("soundon", 1);
}
e.getInstance = function() {
e.m_instance || (e.m_instance = new e());
return e.m_instance;
};
e.prototype.getMusicON = function() {
return this.m_musicOn;
};
e.prototype.getEffectON = function() {
return this.m_soundOn;
};
e.prototype.setMusicON = function(e) {
if (this.m_musicOn != e) {
this.m_musicOn = e;
this.m_ud.setIntegerForKey("musicon", e ? 1 : 0);
e ? cc.audioEngine.playMusic(this.m_backMusicPath, !0) : this.m_backMusicPath && cc.audioEngine.stopMusic();
}
};
e.prototype.clear = function() {
this.m_effectFlag = {};
};
e.prototype.setEffectON = function(e) {
if (this.m_soundOn != e) {
this.m_soundOn = e;
this.m_ud.setIntegerForKey("soundon", e ? 1 : 0);
e || cc.audioEngine.stopAllEffects();
}
};
e.prototype.setMusicVolume = function(e) {
cc.audioEngine.setMusicVolume(e);
this.m_ud.setFloatForKey("musicVolume", e);
this.m_ud.flush();
};
e.prototype.getMusicVolume = function() {
return this.m_ud.getFloatForKey("musicVolume", .5);
};
e.prototype.getEffectsVolume = function() {
return this.m_ud.getFloatForKey("soundVolume", 1);
};
e.prototype.setEffectsVolume = function(e) {
cc.audioEngine.setEffectsVolume(e);
this.m_ud.setFloatForKey("soundVolume", e);
this.m_ud.flush();
};
e.prototype.PlayBgSound = function(e) {
this.m_backMusicPath = e;
if (this.m_musicOn) return cc.audioEngine.playMusic(e, !0);
};
e.prototype.playEffect = function(e, t) {
void 0 === t && (t = !1);
if (this.m_soundOn) {
var n = e.name;
this.m_effectFlag[n] || (this.m_effectFlag[n] = 0);
var o = new Date().getTime();
if (!(o - this.m_effectFlag[n] < 100)) {
this.m_effectFlag[n] = o;
return cc.audioEngine.playEffect(e, t);
}
}
};
e.prototype.stopEffect = function(e) {
e && cc.audioEngine.stopEffect(e);
};
e.prototype.oper = function(e) {
0 == e ? cc.audioEngine.pauseMusic() : 1 == e ? cc.audioEngine.resumeMusic() : 2 == e ? cc.audioEngine.stopMusic() : 5 == e ? cc.audioEngine.pauseAllEffects() : 6 == e ? cc.audioEngine.stopAllEffects() : 7 == e && cc.audioEngine.resumeAllEffects();
};
e.prototype.getBackMusic = function() {
return this.m_backMusicPath;
};
e.prototype.isPlaying = function() {
return cc.audioEngine.isMusicPlaying();
};
e.m_instance = null;
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"./UserDefault": "UserDefault"
} ],
SpeedLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "42c11EUsQBA/KI+8zalc28s", "SpeedLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = e(".././ADLayer"), c = cc._decorator, l = c.ccclass, u = c.property, m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_spriteFrames = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg_2/button_close");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
var o = this.seekCompByName(cc.RichText, "bg_2/lable_info");
o.string = o.string.replace("%d", String(this.m_manager.m_userData.video_num));
var i = this.seekNodeByName("bg_2/btn_speed"), r = 0 == this.m_manager.m_userData.speed_total;
i.getComponent(cc.Sprite).spriteFrame = this.m_spriteFrames[r ? 0 : 1];
this.addTouchEventListener(i, function(e, n) {
if (2 == n) if (r) {
t.sendUrl({
action: "FirstSpeed",
total: 0
}, function(e) {
t.dispatchEvent("StartSpeed", 300);
t.m_manager.m_userData.speed_total++;
t.removeFromParent();
t.m_manager.RefreshTheTask(a.default.TASK_TYPE.SPPED_UP);
});
} else t.seekAd(s.default.TYPE.SPEED, {
total: 0
}, function(e) {
t.dispatchEvent("StartSpeed", 300);
t.removeFromParent();
t.m_manager.RefreshTheTask(a.default.TASK_TYPE.SPPED_UP);
});
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
i([ u(cc.SpriteFrame) ], t.prototype, "m_spriteFrames", void 0);
return t = i([ l ], t);
}(r.default);
n.default = m;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance",
".././ADLayer": "ADLayer"
} ],
StealVegetablesLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0280abwk19CDIhDZ3iNQH1a", "StealVegetablesLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_vegetables = null;
t.m_animes = [];
t.m_caidis = null;
t.m_data = {};
t.m_Panel_cancel = null;
t.m_bottom_btns = [];
t.m_dog = null;
t.dog_distance = 4;
t.m_labelTips = null;
t.m_handler = null;
t.farm_player_id = 0;
return t;
}
n = t;
t.prototype.onCreate = function(e) {
var t = this;
this.m_data = e.player;
this.refreshPlayerInfo(e.player);
this.farm_player_id = e.farm_player_id;
for (var n = [ "bg_sm/button_sm", "button_home", "img_tiao_1/button_home", "button_enemy" ], o = 0, i = n; o < i.length; o++) {
var r = i[o], a = this.seekNodeByName(r);
this.addTouchEventListener(a, this.onBtnClick.bind(this));
}
this.seekCompByName(cc.Sprite, "img_tiao_1").node.active = !1;
n = [ "button_confirm", "button_next" ];
for (var s = this.seekCompByName(cc.Sprite, "img_tiao_2"), c = 0, l = n; c < l.length; c++) {
r = l[c];
var u = this.seekNodeByName(r, s.node);
this.m_bottom_btns.push(u);
this.addTouchEventListener(u, this.onBtnClick.bind(this));
}
var m = this.seekCompByName(cc.RichText, "richtext_desc", s.node), p = this.m_manager.m_userData.steal_surplus_total;
m.string = "<color=#535c79>点击上面任意土地，摘走上面蔬菜\n<color=#e76626>(今日还可摘菜" + p + "次)</c>";
this.setNodeVisible(this.m_bottom_btns, 0);
s.node.active = !1;
this.m_caidis = [];
for (var h = 1; h <= 12; h++) {
var _ = this.seekCompByName(cc.Sprite, "caidi_" + h);
this.m_caidis.push(_);
var d = this.seekCompByName(cc.Sprite, "img_1", _.node);
d.node.name = String(h);
this.addTouchEventListener(d, this.onCaidiTouch.bind(this));
}
this.m_Panel_cancel = this.seekNodeByName("Panel_cancel");
this._enabledVegatables(!1);
this.m_dog = this.seekNodeByName("anime_dog");
this.m_labelTips = this.seekCompByName(cc.Label, "img_qp/label_content", this.m_dog);
this.m_dog.active = !1;
var f = this.seekCompByName(cc.Sprite, "img_left_down"), y = (f.node.position, this.seekCompByName(cc.Sprite, "img_right_up")), g = (f.node.position, 
f.node.getContentSize()), v = y.node.getContentSize(), b = this.node.getContentSize();
this.node.runAction(cc.sequence(cc.callFunc(function(e) {
f.node.runAction(cc.moveTo(.4, cc.v2(-(b.width / 2 - g.width / 2), 0)));
y.node.runAction(cc.moveTo(.4, cc.v2(b.width / 2 - v.width / 2, 0)));
}), cc.delayTime(.5), cc.callFunc(function(e) {
t.m_dog.active = !0;
f.node.stopAllActions();
y.node.stopAllActions();
f.node.x = -b.width / 2 + g.width / 2;
y.node.x = b.width / 2 - v.width / 2;
f.node.runAction(cc.moveTo(.6, cc.v2(-b.width / 2 - g.width / 2, 0)));
y.node.runAction(cc.moveTo(.6, cc.v2(b.width / 2 + v.width / 2, 0)));
}), cc.delayTime(.6), cc.callFunc(function(e, n) {
t.m_dog.getComponent(dragonBones.ArmatureDisplay).playAnimation("move", 0);
t.seekCompByName(cc.Sprite, "img_tiao_2").node.active = !0;
})));
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.onCaidiTouch = function(e, t) {
var n = this;
if (2 == t) {
this._enabledVegatables(!1);
this.sendUrl({
action: "StealFarmDraw",
param: JSON.stringify({
farm_player_id: this.m_data.player_id,
scene_serial_num: e.node.name,
anonymous: this.m_data.anonymous
})
}, function(t) {
e.node.runAction(cc.sequence(cc.scaleTo(.2, .2, 1), cc.callFunc(function(e, t) {
n.farm_player_id ? n.dispatchEvent("StealVegetablesPickId", n.farm_player_id) : n.dispatchEvent("StealVegetablesPickId", n.m_data.player_id);
t.img.node.active = !1;
var o = t.img.node.convertToWorldSpaceAR(cc.v2(0, 0));
o = n.node.convertToNodeSpaceAR(o);
var i = n.seekCompByName(sp.Skeleton, "anime_open");
i.node.x = o.x - 20;
i.node.y = o.y - 30;
i.clearTrack(0);
i.node.active = !0;
i.setAnimation(0, "fanpai", !1);
i.setCompleteListener(function(e) {
i.node.active = !1;
if (n.m_handler) {
n.removeTime(n.m_handler);
n.m_handler = null;
n.m_labelTips.node.parent.stopAllActions();
n.m_labelTips.node.parent.active = !1;
}
var o = Number(t.data.player.level), r = o > 0 ? 1 : 0, a = n.seekCompByName(sp.Skeleton, "anime");
a.node.position = i.node.position;
a.node.x = a.node.x - 40;
a.node.y = a.node.y - 50;
var s = n.m_animes[r];
a.clearTrack(0);
a.skeletonData = s;
var c = s._skeletonJson.animations;
for (var l in c) {
a.setAnimation(0, l, o > 0);
break;
}
n.refreshAllCaidi(t.data.player);
n.refreshInfoDown(t.data.player);
});
}, n, {
img: e,
data: t
})));
n.m_manager.RefreshTheTask(a.default.TASK_TYPE.STEALING_FOOD);
});
}
};
t.prototype.refreshAllCaidi = function(e) {
var t = this, n = 0, o = 1 == Number(e.anonymous) ? e.my_scene : this.m_data.my_scene;
for (var i in o) {
if (n != e.scene_serial_num - 1) {
var r = Number(o[i]), a = this.seekCompByName(cc.Sprite, String(n + 1), this.m_caidis[n].node);
a.node.runAction(cc.sequence(cc.scaleTo(.2, .2, 1), cc.callFunc(function(e, n) {
n.img.node.active = !1;
t.createVegetables(n.lv, n.pos, 0);
}, this, {
img: a,
lv: r,
pos: n
})));
}
n++;
}
this.createVegetables(e.level, e.scene_serial_num - 1, Number(e.income_gold));
};
t.prototype.refreshInfoDown = function(e) {
var t = this;
if (e.level > 0) {
var n = e.scene_serial_num - 1, o = cc.instantiate(this.m_caidis[n].node.children[1]), i = this.seekCompByName(sp.Skeleton, "anime", o);
this.m_scene.m_hallLayer.playAnimationVegetables(i, e.level);
var r = this.seekCompByName(cc.Label, "font_1", o);
r.node.stopAllActions();
r.node.active = !1;
var a = this.m_caidis[n].node.children[1].convertToWorldSpaceAR(cc.v2(0, 0));
a = this.node.convertToNodeSpaceAR(a);
o.position = a;
o.active = !0;
o.parent = this.node;
var s = this.seekNodeByName("node", this.m_dog).convertToWorldSpaceAR(cc.v2(0, 0));
s = this.node.convertToNodeSpaceAR(s);
o.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.moveTo(1, cc.v2(s.x, s.y)), cc.scaleTo(1, .4)), cc.callFunc(function(n) {
n.scale = .4;
n.position = s;
n.action = !0;
t.m_labelTips.string = "哇塞，能卖个好价钱。";
t.m_labelTips.node.parent.active = !0;
t.refreshTiaoDown(e);
})));
} else {
this.m_labelTips.string = "郁闷，我要再接再厉。";
this.m_labelTips.node.parent.active = !0;
this.refreshTiaoDown(e);
}
};
t.prototype.refreshTiaoDown = function(e) {
var t = Number(e.surplus_num);
this.m_scene.m_hallLayer.refreshRedTC(t);
var n, o = Number(e.level), i = a.default.glodConverToString(String(e.income_gold)), r = o > 0 ? this.m_manager.m_shopInfo[o - 1].name : "", s = (0 == o ? "<color=#535c79>摘菜失败，什么也没有\n" : o > 37 ? "<color=#535c79>摘走<color=#39a539>" + r + "</color>，获得金币<color=#e76626>" + i + "\n" : "<color=#535c79>摘走<color=#39a539>Lv." + o + " " + r + "</color>，获得金币<color=#e76626>" + i + "\n") + (t > 0 ? "<color=#e76626>(今日还可摘菜" + t + "次)</c>" : "<color=#e76626>(今日摘菜次数已用完，回家休息吧)</c>");
if (t > 0) {
this.setNodeVisible(this.m_bottom_btns, 1);
n = this.seekCompByName(cc.RichText, "img_tiao_2/richtext_desc");
this.seekCompByName(cc.Sprite, "img_tiao_2").node.active = !0;
} else {
this.seekCompByName(cc.Sprite, "img_tiao_2").node.active = !1;
n = this.seekCompByName(cc.RichText, "img_tiao_1/richtext_desc");
this.seekCompByName(cc.Sprite, "img_tiao_1").node.active = !0;
}
n.string = s;
};
t.prototype.createVegetables = function(e, t, n) {
if (!(e <= 0)) {
var o = this.m_caidis[t].node, i = cc.instantiate(this.m_vegetables);
i.parent = o;
var r = this.seekCompByName(sp.Skeleton, "anime", i);
this.m_scene.m_hallLayer.playAnimationVegetables(r, e);
i.y = 50;
this.m_scene.m_hallLayer.refreshLvOfVegetables(i, e);
var s = this.seekCompByName(cc.Label, "font_1", i), c = "+" + a.default.glodConverToString(String(n));
s.string = c;
s.node.active = n > 0;
if (n > 0) {
this.m_manager.userAddGold(String(n));
s.node.stopAllActions();
s.node.position = cc.v2(0, 0);
s.node.runAction(cc.sequence(cc.spawn(cc.moveBy(2, 0, 100), cc.fadeOut(2)), cc.callFunc(function(e) {
e.active = !1;
e.x = e.y = 0;
})));
}
}
};
t.prototype.onBtnClick = function(e, t) {
if (2 == t) {
switch (e.name) {
case "button_sm":
this.addLayer(n.LAYER.Help);
break;

case "button_home":
this.removeFromParent();
break;

case "button_enemy":
this.showImgEnemy();
break;

case "button_confirm":
this.seekCompByName(cc.Sprite, "img_tiao_2").node.active = !1;
break;

case "button_next":
this.m_scene.m_hallLayer.onTouchTCDisplay();
this.removeFromParent();
}
}
};
t.prototype.refreshPlayerInfo = function(e) {
var t = this;
this.seekCompByName(cc.Label, "head/img_2/label").string = jsb.Utils.parseName(8, e.name);
this.seekCompByName(cc.Label, "head/img_1/label").string = "Lv." + (Number(e.level) > 38 ? "38" : e.level);
this.loadByUrl(function(e) {
if (!e.err) {
t.seekCompByName(cc.Sprite, "head/img_3").spriteFrame = new cc.SpriteFrame(e.ret);
}
}, e.avatar, "png");
};
t.prototype.showImgEnemy = function() {
var e = this;
this.sendUrl({
action: "StealFarmMessage",
param: {}
}, function(t) {
e.m_enemylist ? e.m_enemylist.showUp(!0, t) : e.m_enemylist = e.addLayer(n.LAYER.EnemyListLayer, t);
}, {
loading: !0
});
};
t.prototype._enabledVegatables = function(e) {
this.m_Panel_cancel.active = !e;
};
t.prototype.dogMove = function() {
var e = this, t = this.m_dog.getComponent(dragonBones.ArmatureDisplay);
if ("move" == t.animationName) {
this.m_dog.x = this.m_dog.x + this.dog_distance;
if (this.m_dog.x >= -62) {
this._enabledVegatables(!0);
t.playAnimation("stand", 0);
this.m_labelTips.string = "还看，快点下手摘菜。";
this.m_handler = this.createTime(function() {
var e = this;
this.m_labelTips.node.parent.active = !0;
this.m_labelTips.node.parent.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(t) {
e.m_labelTips.node.parent.active = !1;
})));
}, 5);
this.m_labelTips.node.parent.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(t) {
e.m_labelTips.node.parent.active = !1;
}), cc.delayTime(5), cc.callFunc(function(t) {
e.m_labelTips.node.parent.active = !0;
})).repeatForever());
}
}
};
t.prototype.update = function(e) {
this.dogMove();
};
var n;
t.LAYER = {
Help: [ 0, "scene/Common/StealVegetables/HelpLayer" ],
EnemyListLayer: [ 1, "scene/Common/StealVegetables/EnemyListLayer" ]
};
i([ l(cc.Prefab) ], t.prototype, "m_vegetables", void 0);
i([ l({
type: sp.SkeletonData
}) ], t.prototype, "m_animes", void 0);
return t = n = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
TaskLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d6e17Fhi4hJz4ZknnMZ4XYI", "TaskLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r, a = e("../../engine/UILayer"), s = e("../../game/Instance"), c = cc._decorator, l = c.ccclass, u = c.property;
(function(e) {
e[e.TASK_LOGIN = 1] = "TASK_LOGIN";
e[e.TASK_MERGE = 2] = "TASK_MERGE";
e[e.TASK_SPEED_UP = 3] = "TASK_SPEED_UP";
e[e.TASK_ROTARY_TABLE = 4] = "TASK_ROTARY_TABLE";
e[e.TASK_ONLINE = 5] = "TASK_ONLINE";
e[e.TASK_WATCH = 6] = "TASK_WATCH";
e[e.TASK_STEAL = 7] = "TASK_STEAL";
e[e.TASK_BOX = 8] = "TASK_BOX";
})(r || (r = {}));
var m = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgs = [];
t.m_item = null;
t.m_data = [];
t.m_show = [];
t.m_btnBox = null;
t.m_nodeBox = null;
t.m_isBox = 0;
t.m_label = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
this.m_nodeBox = this.seekNodeByName("bg_1/node_box");
this.seekCompByName(sp.Skeleton, "anime", this.m_nodeBox).setAnimation(0, "baoxiang01", !0);
this.m_label = this.seekCompByName(cc.Label, "img_qp/label_content", this.m_nodeBox);
this.m_btnBox = this.seekCompByName(cc.Button, "button_lq", this.m_nodeBox);
this.m_btnBox.node.active = !1;
this.addTouchEventListener(this.m_btnBox, function(e, n) {
if (2 == n) {
t.m_btnBox.interactable = !1;
t.seekCompByName(sp.Skeleton, "anime_click", t.m_btnBox.node).node.active = !1;
t.m_isBox = 1;
var o = t.seekCompByName(sp.Skeleton, "anime", t.m_nodeBox);
o.setAnimation(0, "baoxiang02", !1);
o.setCompleteListener(function(n) {
t.rqstRewardTask(e);
});
}
});
this.m_data = e;
this.createTaskList();
};
t.prototype.rqstRewardTask = function(e) {
for (var t, n = this, o = Number(e.node.name), i = 0, r = this.m_data; i < r.length; i++) {
var a = r[i];
if (a.id == o) {
t = a;
break;
}
}
1 == t.status && this.sendUrl({
action: "Mission",
param: JSON.stringify({
misid: t.id
})
}, function(e) {
n.addLayer(s.default.LAYER.RewardLayer, {
type: 2,
value: e.add_gold,
changeAnimate: 1 == n.m_isBox,
func: function() {
n.refreshTaskList();
}
});
n.m_manager.getTaskReward(t.id);
}, {
loading: !0
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.refreshTaskList = function() {
var e = this;
this.sendUrl({
action: "MissionList",
param: JSON.stringify({
misid: 0
})
}, function(t) {
e.m_data = t.mission;
e.createTaskList();
}, {
loading: !0
});
};
t.prototype.createTaskList = function() {
for (var e = this, t = this.m_data.length, n = 0; n < t; n++) 1 == this.m_data[n].status ? this.m_data[n].lv = 3 : 0 == this.m_data[n].status ? this.m_data[n].lv = 2 : this.m_data[n].lv = 1;
this.m_data.sort(function(e, t) {
return e.lv > t.lv ? -1 : e.lv == t.lv ? 0 : 1;
});
var o = this.seekNodeByName("bg_1/scrollview/view/content");
o.removeAllChildren();
this.fastInitList(this.m_data, 5, function(t) {
if (Number(t.type) == r.TASK_BOX) {
if (1 == (l = Number(t.status))) {
e.m_label.string = "宝箱已激活，点击打开";
e.seekNodeByName("anime_click/hand", e.m_btnBox.node).runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 20)), cc.moveBy(0, cc.v2(0, -20))).repeatForever());
} else if (2 == l) {
e.seekCompByName(sp.Skeleton, "anime", e.m_nodeBox).node.active = !1;
}
e.seekCompByName(cc.Sprite, "img_qp", e.m_nodeBox).node.active = 2 != l;
e.seekCompByName(cc.Sprite, "img_open", e.m_nodeBox).node.active = 2 == l;
e.m_btnBox.node.name = String(t.id);
e.m_btnBox.node.active = 1 == l;
} else {
var n = cc.instantiate(e.m_item);
n.parent = o;
e.seekCompByName(cc.Sprite, "img_3", n).spriteFrame = e.m_imgs[Number(t.type) - 1];
e.seekCompByName(cc.Label, "bg_4/label", n).string = s.default.glodConverToString(t.rewardgold);
e.seekCompByName(cc.Label, "label", n).string = t.name;
e.seekCompByName(cc.ProgressBar, "progressBar", n).progress = t.progress / t.num;
e.seekCompByName(cc.Label, "progressBar/label", n).string = t.progress + "/" + t.num;
var i = e.seekCompByName(cc.Button, "button_lq", n), a = e.seekCompByName(cc.Button, "button_qw", n), c = e.seekCompByName(cc.Label, "label_flag", n), l = Number(t.status);
i.node.active = 1 == l;
c.node.active = 2 == l;
var u = Number(t.type);
0 != l || u != r.TASK_MERGE && u != r.TASK_SPEED_UP && u != r.TASK_ROTARY_TABLE && u != r.TASK_STEAL ? a.node.active = !1 : a.node.active = !0;
i.node.name = String(t.id);
a.node.name = String(t.id);
e.addTouchEventListener(i, function(t, n) {
2 == n && e.rqstRewardTask(t);
});
e.addTouchEventListener(a, function(t, n) {
if (2 == n) {
for (var o, i = Number(t.node.name), a = 0, c = e.m_data; a < c.length; a++) {
var l = c[a];
if (l.id == i) {
o = l;
break;
}
}
if (!(o.progress >= o.num)) {
switch (Number(o.type)) {
case r.TASK_MERGE:
e.removeFromParent();
break;

case r.TASK_SPEED_UP:
if (e.m_scene.m_hallLayer.m_second <= 0) {
e.dispatchEvent("CanSpeedTask");
e.removeFromParent();
} else e.cmdToast("正在加速中...");
break;

case r.TASK_ROTARY_TABLE:
e.addLayer(s.default.LAYER.RotaryTableLayer);
e.removeFromParent();
break;

case r.TASK_STEAL:
e.m_scene.m_hallLayer.onTouchTCDisplay();
e.removeFromParent();
break;

case r.TASK_ONLINE:
case r.TASK_WATCH:
e.removeFromParent();
}
}
}
});
}
});
};
i([ u(cc.SpriteFrame) ], t.prototype, "m_imgs", void 0);
i([ u(cc.Prefab) ], t.prototype, "m_item", void 0);
return t = i([ l ], t);
}(a.default);
n.default = m;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
TcpClient: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2c60dpwkjpEBpNH9R62V8hO", "TcpClient");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Manager"), i = function() {
function e() {
this.m_waitCount = 0;
this.m_responses = [];
this.m_client = null;
this.m_through = null;
this.m_gameing = !1;
}
e.prototype.getThrough = function() {
return null;
};
e.prototype.isGame = function() {
return !0;
};
e.prototype.changeN = function(e) {
this.m_waitCount = this.m_waitCount + (e ? 1 : -1);
};
e.prototype.setIpPort = function(e, t) {
this.m_url = "ws://" + e + ":" + t;
};
e.prototype.clearRead = function() {
this.m_responses = [];
};
e.prototype.clearSend = function() {};
e.prototype.isConnect = function() {
return null != this.m_client;
};
e.prototype.close = function() {
if (this.m_client) {
this.releaseHander();
this.m_client.onclose = null;
this.m_client.onmessage = null;
this.m_client.onopen = null;
this.m_client.onerror = null;
this.m_client = null;
}
};
e.prototype.releaseHander = function() {
if (this.m_handler) {
o.getManager().removeTime(this.m_handler);
this.m_handler = null;
}
};
e.prototype.connect = function() {
var t = this;
this.close();
this.m_through || (this.m_through = this.getThrough());
this.m_responses = [];
this.m_client = new WebSocket(this.m_url);
this.m_client.binaryType = "arraybuffer";
this.m_client.onopen = function(n) {
t.onInsertQueue(e.response_cmd.CONNECT_OK_RES);
t.m_handler = o.getManager().createTime(function() {
t._send({
cmd: 1
});
}, 5);
};
this.m_client.onclose = function(n) {
t.releaseHander();
t.onInsertQueue(e.response_cmd.DISCONNECT_RES);
};
this.m_client.onmessage = function(n) {
if (t.isGame()) for (var i = new Uint8Array(n.data), r = 0; r < i.length; ) {
var a = 0;
a |= i[r + 3] << 24;
a |= i[r + 2] << 16;
a |= i[r + 1] << 8;
a |= i[r + 0];
r += 4;
var s = i.slice(r, r + a);
t.onInsertQueue(e.response_cmd.RECV_DATA_OK_RES, o.getManager().byteAryToJson(s));
r += a;
} else t.onInsertQueue(e.response_cmd.RECV_DATA_OK_RES, JSON.parse(n.data));
};
this.m_client.onerror = function(n) {
t.onInsertQueue(e.response_cmd.CONNECT_ERROR_RES);
};
return !0;
};
e.prototype.setGameingState = function(e) {
if (this.m_gameing != e) {
this.m_gameing = e;
if (e) o.getManager().addToProcess(this); else {
o.getManager().removeProcess(this);
this.m_responses = [];
}
}
};
e.prototype._send = function(e) {
if (!this.m_client) return !1;
this.m_client.send(o.getManager().JsonToByteAry(e));
return !0;
};
e.prototype.onInsertQueue = function(t, n) {
void 0 === n && (n = null);
if (this.m_gameing && t == e.response_cmd.RECV_DATA_OK_RES) {
var o = n.cmd;
if (1 == o) ; else if (this.m_through) for (var i = 0, r = this.m_through; i < r.length; i++) {
if (r[i] == o) {
this.runAction({
cmd: t,
data: n
});
return !1;
}
}
}
this.m_responses.push({
cmd: t,
data: n
});
return !0;
};
e.prototype.runAction = function(t) {
var n = !1, o = t.cmd;
if (o == e.response_cmd.CONNECT_OK_RES) this.onOpen(); else if (o == e.response_cmd.RECV_DATA_OK_RES) n = this.onMsg(t.data); else if (o == e.response_cmd.CONNECT_ERROR_RES) this.onError(t.data); else if (o == e.response_cmd.DISCONNECT_RES) {
this.onClose();
this.releaseSelf();
n = !0;
}
return n;
};
e.prototype.process = function() {
for (;0 == this.m_waitCount && this.m_responses.length > 0 && !this.runAction(this.m_responses.shift()); ) ;
};
e.prototype.next = function() {
return this.m_responses.length > 0 && this.m_responses.shift();
};
e.prototype.onOpen = function() {};
e.prototype.onError = function(e) {};
e.prototype.onClose = function() {};
e.prototype.onMsg = function(e) {
return !1;
};
e.prototype.releaseSelf = function() {
o.getManager().removeProcess(this);
this.close();
};
e.response_cmd = {
CONNECT_OK_RES: 0,
RECV_DATA_OK_RES: 1,
CONNECT_ERROR_RES: 2,
DISCONNECT_RES: 3
};
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../Manager": "Manager"
} ],
TipsLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "920e9eKHjtDxpfvRWmWxHAj", "TipsLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgs = [];
t.m_gold = "";
t.m_callBack = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.seekCompByName(cc.Sprite, "bg/img_title").spriteFrame = this.m_imgs[e.type];
var n = this.seekCompByName(cc.RichText, "bg/lable_content");
if (1 == e.type) {
this.m_gold = String(e.num);
n.string = e.content.replace("%d", a.default.glodConverToString(this.m_gold));
} else e.num ? n.string = e.content.replace("%d", String(e.num)) : n.string = e.content;
this.seekCompByName(cc.Sprite, "bg/button/Background").spriteFrame = this.m_imgs[e.btnType + 2];
this.m_callBack = e.func;
var o = this.seekCompByName(cc.Button, "bg/button");
o.node.name = String(e.btnType);
this.addTouchEventListener(o, function(e, n) {
if (2 == n) {
var o = !1;
t.m_callBack && (o = t.m_callBack(1));
o || t.removeFromParent();
}
});
var i = this.seekCompByName(cc.RichText, "bg/lable_info");
i.string = i.string.replace("%d", String(this.m_manager.m_userData.video_num));
if (3 == e.btnType || 4 == e.btnType) {
i.node.active = !1;
o.node.y -= 40;
}
var r = this.seekNodeByName("bg/button2");
this.addTouchEventListener(r, function(e, n) {
if (2 == n) {
t.removeFromParent();
t.m_callBack && t.m_callBack(0);
}
});
};
t.prototype.onBack = function() {
this.removeFromParent();
this.m_callBack && this.m_callBack(0);
return !0;
};
t.TYPE = {
Tips: 0,
NoCoins: 1
};
t.BTN_TYPE = {
FreeGet: 0,
Get: 1,
Double: 2,
Use: 3,
Confirm: 4
};
t.Content = {
FreeGet: "<color=#9497b0 > 观看视频可获得 < color=#e9793b >%d次 < color=#9497b0>转盘次数</c >",
Get: "<color=#9497b0 > 观看视频获得 < color=#e9793b >%d < color=#9497b0>金币</c >",
Double: "<color=#9497b0 > 观看视频下次奖励翻 < color=#e9793b >%d < color=#9497b0>倍</c >",
Use: "<color=#535c79 > 今日视频次数已达上限，使用邀请券可达到同样效果\n< color=#9497b0>(剩余邀请券: < color=#ca4646 >%d < color=#9497b0>张)</c >",
Confirm: "<color=#9497b0 > 今日视频次数已达上限，无法观看 </c >"
};
i([ l(cc.SpriteFrame) ], t.prototype, "m_imgs", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
ToastLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "45c7dLu2mNNDJv87u0JCF/1", "ToastLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_item = null;
t.m_items = [];
return t;
}
t.prototype.onCreate = function(e) {
this.m_item = this.seekNodeByName("sprite_bg");
this.m_item.active = !1;
this.createItem(e);
this.node.zIndex = 1;
};
t.prototype.createItem = function(e) {
var t, n = this, o = this.m_item.y;
if (5 == this.m_items.length) {
(t = this.m_items.shift()).stopAllActions();
t.opacity = 255;
t.y = o;
} else {
(t = cc.instantiate(this.m_item)).parent = this.m_item.parent;
t.x = 0;
t.active = !0;
}
this.seekCompByName(cc.Label, "label", t).string = e;
for (var i = 0, r = 0, a = this.m_items; r < a.length; r++) {
var s = a[r], c = cc.moveTo(.2, cc.v2(0, 85 * (this.m_items.length - i) + o));
i++;
s.stopActionByTag(222);
c.setTag(222);
s.runAction(c);
}
this.m_items.push(t);
var l = cc.sequence(cc.delayTime(4), cc.fadeOut(1), cc.callFunc(function(e) {
for (var t = 0, o = 0, i = n.m_items; o < i.length; o++) {
if (i[o] == e) {
n.m_items.splice(t, 1);
0 == n.m_items.length && n.removeFromParent();
break;
}
t++;
}
e.destroy();
}));
l.setTag(111);
t.runAction(l);
};
t.prototype.onBack = function() {
return !1;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
TodayPredictIncomeLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "45f305CjGpOlKVniTXEKnKx", "TodayPredictIncomeLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("bg/btn_ok");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer"
} ],
TouchTreeTipsLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "841d6EORz1G/ZIJECve1DdV", "TouchTreeTipsLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = cc._decorator, s = a.ccclass, c = (a.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekNodeByName("Panel_cancel");
this.addTouchEventListener(n, function(e, n) {
2 == n && t.removeFromParent();
});
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
return t = i([ s ], t);
}(r.default));
n.default = c;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer"
} ],
UIBase: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0dd07aIWNhL/LmPhni01Xzg", "UIBase");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./Manager"), r = e("./Utils/UserDefault"), a = e("../game/Base"), s = e("./Utils/JSEvent"), c = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_manager = null;
t.m_ud = null;
return t;
}
t.prototype.onCreate = function(e) {};
t.prototype.releaseSelf = function() {};
t.prototype._onInit = function(e) {
this.m_manager = i.default.getInstance();
this.m_ud = r.default.getInstance();
this.onCreate(e);
};
t.prototype._onRelease = function() {
s.default.getInstance().removeEventListenerByTarget(this);
this.m_manager.removeCmdByTarget(this);
this.releaseSelf();
};
t.prototype.convertToWorldSpaceAR = function(e) {
var t = e.convertToWorldSpaceAR(cc.v2(0, 0));
return this.node.convertToNodeSpaceAR(t);
};
t.prototype.convertToWorldSpace = function(e) {
var t = e.convertToWorldSpace(cc.v2(0, 0));
return this.node.convertToNodeSpace(t);
};
t.prototype.seekCompByName = function(e, t, n) {
void 0 === n && (n = null);
return this.seekNodeByName(t, n).getComponent(e);
};
t.prototype.seekNodeByName = function(e, t) {
void 0 === t && (t = null);
return this.m_manager.seekNodeByName(e, t || this.node);
};
t.prototype.searchNodeByName = function(e, t) {
void 0 === t && (t = null);
null == t && (t = this.node);
if (t.name == e) return t;
var n = t.children;
for (var o in n) {
var i = n[o];
if (null != i) {
var r = this.searchNodeByName(e, i);
if (null != r) return r;
}
}
};
t.prototype.addEventListener = function(e, t) {
return this.m_manager.addEventListener(e, this, t);
};
t.prototype.addEventListenerOnce = function(e, t) {
return this.m_manager.addEventListener(e, this, t, !0);
};
t.prototype.removeEventListener = function(e) {
this.m_manager.removeEventListener(e);
};
t.prototype.dispatchEvent = function(e, t, n) {
void 0 === t && (t = !0);
void 0 === n && (n = !1);
i.getManager().dispatchEvent(e, t, n);
};
t.prototype.dispatchEventOnce = function(e, t, n) {
void 0 === t && (t = !0);
void 0 === n && (n = !1);
i.getManager().dispatchEvent(e, t, n, !0);
};
t.prototype.getLoadResByName = function(e) {
return this.m_manager.getLoadResByName(e);
};
t.prototype.addCmd = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
i.getManager().addCmd(this, e, t, n);
};
t.prototype.replaceScene = function(e, t) {
void 0 === t && (t = null);
this.m_manager.replaceScene(e, t);
};
t.prototype.nextFrameExec = function(e, t) {
void 0 === t && (t = null);
this.addCmd(i.default.CMDS.CALL_FUNC, [ e, t ]);
};
t.prototype.msgBox = function(e, t, n, o) {
void 0 === t && (t = null);
void 0 === n && (n = 0);
void 0 === o && (o = !0);
this.m_manager.msgBox(e, t, n, o);
};
t.prototype.getResource = function(e) {
return null;
};
t.prototype.addLayer = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
};
t.prototype.sendUrl = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = null);
null == n && (n = []);
var o = s.default.getInstance().getNextIdx();
t && (n.ev_key = this.addEventListener(o, t));
this.m_manager.sendUrl(e, o, n);
};
t.prototype.fastInitList = function(e, t, n) {
for (var o = 0, i = 0, r = e; i < r.length; i++) {
var a = r[i];
o < t ? n(a) : this.nextFrameExec(n, a);
o++;
}
};
t.prototype.createTime = function(e, t, n) {
void 0 === n && (n = null);
n ? this.scheduleOnce(e, t) : this.schedule(e, t, cc.macro.REPEAT_FOREVER, 0);
return e;
};
t.prototype.showAddGold = function(e) {
this.m_manager.showAddGold(e);
};
t.prototype.removeTime = function(e) {
this.unschedule(e);
};
t.prototype.loadByUrl = function(e, t, n) {
void 0 === n && (n = null);
if (t && 0 != t.length) {
var o = s.default.getInstance().getNextIdx();
this.addEventListener(o, e);
n ? cc.loader.load({
url: t,
type: n
}, function(e, t) {
i.getManager().dispatchEvent(o, {
err: e,
ret: t
}, !1, !0);
}) : cc.loader.load(t, function(e, t) {
i.getManager().dispatchEvent(o, {
err: e,
ret: t
}, !1, !0);
});
} else e({
err: new Error("url is undefine")
});
};
return t;
}(a.default);
n.default = c;
cc._RF.pop();
}, {
"../game/Base": "Base",
"./Manager": "Manager",
"./Utils/JSEvent": "JSEvent",
"./Utils/UserDefault": "UserDefault"
} ],
UILayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e7cd3jQBdBIwqJVjKGndB4k", "UILayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./Manager"), a = e("../game/Layer"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.addLayer = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
return this.m_scene.addLayer(e, t, n);
};
t.prototype.removeLayer = function(e) {
this.m_scene.removeLayer(e);
};
t.prototype.getLayer = function(e) {
return this.m_scene.getLayer(e);
};
t.prototype.onBack = function() {
return !1;
};
t.prototype.cancelCallback = function(e) {
1 == e && this.m_manager.addCmd(this, r.default.CMDS.END_GAME);
};
t.prototype.hasLayer = function(e) {
return this.m_scene.hasLayer(e);
};
t.prototype.removeFromParent = function() {
this.m_scene.removeLayer([ this.m_id ]);
};
t.prototype.preloadEffect = function(e) {
this.m_scene.preloadEffect(e);
};
t.prototype.unloadEffect = function(e) {
this.m_scene.unloadEffect(e);
};
t.prototype.PlayBgSound = function(e, t) {
void 0 === t && (t = null);
this.m_scene.PlayBgSound(e, t);
};
t.prototype.playEffect = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = null);
return this.m_scene.playEffect(e, t, n);
};
t.prototype.stopEffect = function(e) {
this.m_scene.stopEffect(e);
};
return t = i([ c ], t);
}(a.default));
n.default = l;
cc._RF.pop();
}, {
"../game/Layer": "Layer",
"./Manager": "Manager"
} ],
UIScene: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6de59xU7fNCNqgT9ca5R8o0", "UIScene");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = e("./Manager"), r = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_name = null;
t.m_modeling = !1;
return t;
}
t.prototype._onInit = function(t) {
this.m_layers = [];
this.m_layerStack = [];
e.prototype._onInit.call(this, t);
};
t.prototype._onRelease = function() {
this.m_manager.soundOper(2);
this.m_manager.soundOper(6);
for (var t in this.m_layers) {
this.m_layers[t]._onRelease();
}
e.prototype._onRelease.call(this);
};
t.prototype.transformBgSoundPath = function(e, t) {
return null;
};
t.prototype.getBackground = function() {
return null;
};
t.prototype.transformEffectPath = function(e, t) {
return null;
};
t.prototype.onBack = function() {
for (var e = this.m_layerStack.length - 1; e >= 0 && !this.getLayer([ this.m_layerStack[e] ]).onBack(); ) e--;
};
t.prototype.addLayer = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
if (n) do {
if (this.m_modeling) break;
this.m_modeling = !0;
this.m_layerInfoStack || (this.m_layerInfoStack = []);
this.m_layerInfoStack.push([ e, t ]);
return;
} while (0);
var o = this.getLoadResByName(e[1]);
o || (o = this.getResource(e[1]));
if (o) return this._onLoadLayer(e, t, n, o);
this.m_manager.addCmd(this, i.default.CMDS.PUSH_LAYER, [ e, t, n ]);
return null;
};
t.prototype.removeLayer = function(e) {
e && this._removeLayer(e[0]);
};
t.prototype.getLayer = function(e) {
if (e) {
for (var t = 0, n = this.m_layers; t < n.length; t++) {
var o = n[t];
if (o.m_id == e[0]) return o;
}
return null;
}
};
t.prototype.hasLayer = function(e) {
if (!e) return !1;
for (var t = 0, n = this.m_layers; t < n.length; t++) {
if (n[t].m_id == e[0]) return !0;
}
return !1;
};
t.prototype.getTopLayer = function() {
if (this.m_layerStack.length < 1) return null;
var e = this.m_layerStack[this.m_layerStack.length - 1];
return this.getLayer([ e ]);
};
t.prototype._removeLayer = function(e) {
for (var t = 0; t < this.m_layerStack.length; t++) if (this.m_layerStack[t] == e) {
this.m_layerStack.splice(t, 1);
break;
}
var n = !1;
for (t = 0; t < this.m_layers.length; t++) {
var o = this.m_layers[t];
if (o.m_id == e) {
n = o.m_isModel;
this._releaseLayer(o);
this.m_layers.splice(t, 1);
break;
}
}
do {
if (!n) break;
if (!this.m_layerInfoStack || this.m_layerInfoStack.length < 1) break;
var i = this.m_layerInfoStack.shift();
this.addLayer(i[0], i[1], !0);
} while (0);
};
t.prototype._releaseLayer = function(e) {
e._onRelease();
e.node.destroy();
};
t.prototype.PlayBgSound = function(e, t) {
void 0 === t && (t = null);
var n = this.transformBgSoundPath(e, t);
null != n && (e = n);
do {
var o = (e = "sound/" + e).lastIndexOf(".");
if (-1 == o) break;
e = e.substr(0, o);
} while (0);
var i = this.getLoadResByName(e);
if (i) return this.m_manager.PlayBgSound(i);
};
t.prototype.playEffect = function(e, t, n) {
void 0 === t && (t = null);
void 0 === n && (n = !1);
var o = this.transformEffectPath(e, t);
null != o && (e = o);
do {
var i = (e = "sound/" + e).lastIndexOf(".");
if (-1 == i) break;
e = e.substr(0, i);
} while (0);
var r = this.getLoadResByName(e);
if (r) return this.m_manager.playEffect(r, n);
};
t.prototype.stopEffect = function(e) {
this.m_manager.stopEffect(e);
};
t.prototype._onLoadLayer = function(e, t, n, o) {
var r = e[0], a = e[1], s = cc.instantiate(o);
s.parent = this.node;
var c = a.lastIndexOf("/");
if (-1 != c) {
c++;
a = a.substr(c);
}
var l = s.getComponent(a);
l.m_id = r;
l.m_scene = this;
l.m_isModel = n;
this.hasLayer(e) && this.removeLayer(e);
this.m_layers.push(l);
this.m_layerStack.push(r);
l.node.getComponent(cc.Widget) || l.node.addComponent(cc.Widget);
var u = l.node.getComponent(cc.Widget);
u.isAlignTop = u.isAlignBottom = u.isAlignLeft = u.isAlignRight = !0;
"ios" == i.default.platform() ? u.top = this.m_manager.liuHaiH > 0 ? 100 : 0 : u.top = 0;
u.bottom = u.left = u.right = 0;
this._updateAlignment(l.node);
this.m_manager.onInitLayer(l);
l._onInit(t);
this.m_modeling = !1;
return l;
};
t.prototype._updateAlignment = function(e) {
do {
var t = e.getComponent(cc.Widget);
t && t.updateAlignment();
if (e.childrenCount < 1) break;
for (var n = 0, o = e.children; n < o.length; n++) {
var i = o[n];
this._updateAlignment(i);
}
} while (0);
};
t.prototype.pushLayer = function(e, t, n) {
var o = this, i = e[1], r = cc.loader.getRes(i);
if (r) this._onLoadLayer(e, t, n, r); else {
this.m_manager.showLoading(!0);
cc.loader.loadRes(i, cc.Prefab, function(e, t, n) {
var i = e / t;
o.m_manager.setLoadProgress(i);
}, function(i, r) {
o.m_manager.showLoading(!1);
if (i) throw i;
o._onLoadLayer(e, t, n, r);
});
}
};
return t;
}(e("../game/Scene").default);
n.default = r;
cc._RF.pop();
}, {
"../game/Scene": "Scene",
"./Manager": "Manager"
} ],
UpdateLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "21eacl2kIlNfp356ay+CdeY", "UpdateLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../engine/Manager"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekCompByName(cc.Button, "sprite_bg2/btn_1");
this.addTouchEventListener(n, function(n) {
e.func && e.func(1);
t.removeFromParent();
});
n = this.seekCompByName(cc.Button, "sprite_bg2/btn_2");
this.addTouchEventListener(n, function(n) {
e.isForce && t.addCmd(a.default.CMDS.END_GAME);
e.func && e.func(0);
t.removeFromParent();
});
var o = this.seekCompByName(cc.Label, "sprite_bg2/label_oldVersion");
o.string = o.string.replace("%s", e.oldversioninfo);
(o = this.seekCompByName(cc.Label, "sprite_bg2/label_newVersion")).string = o.string.replace("%s", e.newversioninfo);
(o = this.seekCompByName(cc.Label, "sprite_bg2/ScrollView1/view/content/lab_text")).string = e.updateinfo;
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer"
} ],
UserDefault: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b1336vrCe5FRob3xnAb1Ald", "UserDefault");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function() {
function e() {}
e.getInstance = function() {
e.m_instance || (e.m_instance = new e());
return e.m_instance;
};
e.prototype.setStringForKey = function(e, t) {
cc.sys.localStorage.setItem(e, t);
};
e.prototype.getStringForKey = function(e, t) {
var n = cc.sys.localStorage.getItem(e);
null == n && (n = t);
return n;
};
e.prototype.setIntegerForKey = function(e, t) {
cc.sys.localStorage.setItem(e, t);
};
e.prototype.getIntegerForKey = function(e, t) {
var n = cc.sys.localStorage.getItem(e);
return n ? parseInt(n) : t;
};
e.prototype.deleteValueForKey = function(e) {
cc.sys.localStorage.removeItem(e);
};
e.prototype.setFloatForKey = function(e, t) {
this.setStringForKey(e, t.toString());
};
e.prototype.getFloatForKey = function(e, t) {
return parseFloat(this.getStringForKey(e, t.toString()));
};
e.prototype.flush = function() {};
e.m_instance = null;
return e;
}();
n.default = o;
cc._RF.pop();
}, {} ],
UserInfoLayer2: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "89cf67Nu0xGiofougnFD/mY", "UserInfoLayer2");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = e("../../engine/Manager"), c = cc._decorator, l = c.ccclass, u = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_input = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.seekCompByName(cc.Label, "bg_1/label_name").string = this.m_manager.m_userData.name;
this.seekCompByName(cc.Label, "bg_1/label_id").string = "ID:" + this.m_manager.m_userData.id;
this.seekCompByName(cc.Label, "bg_1/bg_2/label_lv").string = (Number(this.m_manager.m_userData.level) > 38 ? "38" : this.m_manager.m_userData.level) + "级";
this.loadByUrl(function(e) {
if (!e.err) {
t.seekCompByName(cc.Sprite, "bg_1/node_face/head").spriteFrame = new cc.SpriteFrame(e.ret);
}
}, this.m_manager.m_userData.avatar, "png");
var n = this.seekCompByName(cc.Sprite, "bg_1/bg_2/img_1"), o = Number(this.m_manager.m_userData.level) - 1;
n.spriteFrame = this.m_scene.m_spriteFrames[o];
var i = this.m_manager.m_shopInfo[o];
this.seekCompByName(cc.Label, "bg_1/bg_2/label_name").string = i.name;
for (var r = [ "bg_1/bg_61/check_sound", "bg_1/bg_62/check_music" ], c = 0, l = r; c < l.length; c++) {
var u = l[c], m = this.seekCompByName(cc.Toggle, u);
if ("bg_1/bg_61/check_sound" == u) {
m.isChecked = !this.m_manager.getMusicON();
m.target.active = this.m_manager.getMusicON();
} else {
m.isChecked = !this.m_manager.getEffectON();
m.target.active = this.m_manager.getEffectON();
}
this.addTouchEventListener(m, function(e, n) {
if (2 == n) {
var o = e.isChecked;
e.target.active = !o;
"check_sound" == e.node.name ? t.m_manager.setMusicON(!o) : t.m_manager.setEffectON(!o);
}
});
}
for (var p = 0, h = r = [ "bg_1/btn_close", "bg_1/button_quit" ]; p < h.length; p++) {
u = h[p], m = this.seekCompByName(cc.Button, u);
this.addTouchEventListener(m, function(e, n) {
if (2 == n) {
switch (e.node.name) {
case "btn_close":
t.removeFromParent();
break;

case "button_service":
t.addLayer(a.default.LAYER.KeFuLayer);
break;

case "button_quit":
t.msgBox("确定退出游戏吗?", function(e) {
1 == e && t.addCmd(s.default.CMDS.END_GAME);
});
break;

case "button_help":
t.onBtnTouchHelp();
break;

case "btn_copy":
t.m_manager.copyToCilp(String(t.m_manager.m_userData.invite_code));
t.cmdToast("已复制到剪贴板~");
break;

case "btn_input":
t.seekNodeByName("Panel_cancel2").active = !0;
t.seekNodeByName("bg_2").active = !0;
break;

case "btn_ok":
if ("" == t.m_input) {
t.cmdToast("请输入邀请码！");
return;
}
t.sendUrl({
action: "Bind",
param: JSON.stringify({
code: t.m_input
})
}, function(e) {
var n = t.seekCompByName(cc.Label, "bg_1/label_shifu/invitation");
t.m_manager.m_userData.parent_name = e.parent_name;
n.string = t.m_manager.m_userData.parent_name;
t.m_manager.m_userData.bind_invite_status = 1;
n.node.active = !0;
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_2").active = !1;
t.seekNodeByName("bg_1/label_shifu/btn_input").active = !1;
});
break;

case "btn_cancel":
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_2").active = !1;
break;

case "btn_back":
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_3").active = !1;
}
}
});
}
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.onBtnTouchHelp = function() {
var e = this.seekNodeByName("bg_1/label_get_channel").active;
this.seekNodeByName("bg_1/label_get_channel").active = !e;
this.seekNodeByName("bg_1/richtext_intro").active = !e;
this.seekNodeByName("bg_1/progressBar").active = !e;
this.seekNodeByName("bg_1/richtext_help1").active = e;
this.seekNodeByName("bg_1/richtext_help2").active = e;
this.seekNodeByName("bg_1/richtext_help3").active = e;
};
t.prototype.inputEnding = function(e) {
this.m_input = e.string;
};
return t = i([ l ], t);
}(r.default));
n.default = u;
cc._RF.pop();
}, {
"../../engine/Manager": "Manager",
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
UserInfoLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "107b17XihNL75XyhHzViP8U", "UserInfoLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../engine/UILayer"), a = e("../../game/Instance"), s = cc._decorator, c = s.ccclass, l = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_input = null;
return t;
}
t.prototype.onCreate = function(e) {
var t = this;
this.seekCompByName(cc.Label, "bg_1/label_name").string = this.m_manager.m_userData.name;
this.seekCompByName(cc.Label, "bg_1/label_id").string = "ID:" + this.m_manager.m_userData.id;
this.seekCompByName(cc.Label, "bg_1/bg_2/label_lv").string = (Number(this.m_manager.m_userData.level) > 38 ? "38" : this.m_manager.m_userData.level) + "级";
this.seekCompByName(cc.Label, "bg_1/label_invitation/invitation").string = this.m_manager.m_userData.invite_code;
var n = this.seekCompByName(cc.Label, "bg_1/label_shifu/invitation"), o = this.seekCompByName(cc.Button, "bg_1/label_shifu/btn_input");
if (1 == this.m_manager.m_userData.bind_invite_status) {
0 == this.m_manager.m_userData.parent_name.length && (this.seekNodeByName("bg_1/label_shifu").active = !1);
n.string = this.m_manager.m_userData.parent_name;
n.node.active = !0;
o.node.active = !1;
} else {
n.node.active = !1;
o.node.active = !0;
}
this.loadByUrl(function(e) {
if (!e.err) {
t.seekCompByName(cc.Sprite, "bg_1/node_face/head").spriteFrame = new cc.SpriteFrame(e.ret);
}
}, this.m_manager.m_userData.avatar, "png");
var i = this.seekCompByName(cc.Sprite, "bg_1/bg_2/img_1"), r = Number(this.m_manager.m_userData.level) - 1;
i.spriteFrame = this.m_scene.m_spriteFrames[r];
var s = this.m_manager.m_shopInfo[r];
this.seekCompByName(cc.Label, "bg_1/bg_2/label_name").string = s.name;
for (var c = [ "bg_1/bg_61/check_sound", "bg_1/bg_62/check_music" ], l = 0, u = c; l < u.length; l++) {
var m = u[l], p = this.seekCompByName(cc.Toggle, m);
if ("bg_1/bg_61/check_sound" == m) {
p.isChecked = !this.m_manager.getMusicON();
p.target.active = this.m_manager.getMusicON();
} else {
p.isChecked = !this.m_manager.getEffectON();
p.target.active = this.m_manager.getEffectON();
}
this.addTouchEventListener(p, function(e, n) {
if (2 == n) {
var o = e.isChecked;
e.target.active = !o;
"check_sound" == e.node.name ? t.m_manager.setMusicON(!o) : t.m_manager.setEffectON(!o);
}
});
}
for (var h = 0, _ = c = [ "bg_1/btn_close", "bg_1/label_invitation/invitation/btn_copy", "bg_1/label_shifu/btn_input", "bg_1/button_quit", "bg_1/button_help", "bg_2/btn_ok", "bg_2/btn_cancel", "bg_3/btn_back" ]; h < _.length; h++) {
m = _[h], p = this.seekCompByName(cc.Button, m);
this.addTouchEventListener(p, function(e, n) {
if (2 == n) {
switch (e.node.name) {
case "btn_close":
t.removeFromParent();
break;

case "button_quit":
t.msgBox("确定退出登录吗?", function(e) {
if (1 == e) {
t.m_ud.setStringForKey("iphone_code", "");
t.m_ud.setStringForKey("WX_OPENID", "");
t.m_manager.replaceScene(a.default.STAGE.LOGIN_SCENE);
}
});
break;

case "button_help":
t.onBtnTouchHelp();
break;

case "btn_copy":
t.m_manager.copyToCilp(String(t.m_manager.m_userData.invite_code));
t.cmdToast("已复制到剪贴板~");
break;

case "btn_input":
t.seekNodeByName("Panel_cancel2").active = !0;
t.seekNodeByName("bg_2").active = !0;
break;

case "btn_ok":
if ("" == t.m_input) {
t.cmdToast("请输入邀请码！");
return;
}
t.sendUrl({
action: "Bind",
param: JSON.stringify({
code: t.m_input
})
}, function(e) {
var n = t.seekCompByName(cc.Label, "bg_1/label_shifu/invitation");
t.m_manager.m_userData.parent_name = e.parent_name;
n.string = t.m_manager.m_userData.parent_name;
t.m_manager.m_userData.bind_invite_status = 1;
n.node.active = !0;
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_2").active = !1;
t.seekNodeByName("bg_1/label_shifu/btn_input").active = !1;
});
break;

case "btn_cancel":
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_2").active = !1;
break;

case "btn_back":
t.seekNodeByName("Panel_cancel2").active = !1;
t.seekNodeByName("bg_3").active = !1;
}
}
});
}
var d = this.m_manager.m_userData.level / 38, f = this.seekCompByName(cc.ProgressBar, "bg_1/progressBar");
f.progress = d;
var y = this.seekCompByName(cc.Label, "label", f.node), g = Math.floor(100 * d);
y.string = (g > 100 ? 100 : g) + "%";
};
t.prototype.onBack = function() {
this.removeFromParent();
return !0;
};
t.prototype.onBtnTouchHelp = function() {
var e = this.seekNodeByName("bg_1/label_get_channel").active;
this.seekNodeByName("bg_1/label_get_channel").active = !e;
this.seekNodeByName("bg_1/richtext_intro").active = !e;
this.seekNodeByName("bg_1/progressBar").active = !e;
this.seekNodeByName("bg_1/richtext_help1").active = e;
this.seekNodeByName("bg_1/richtext_help2").active = e;
this.seekNodeByName("bg_1/richtext_help3").active = e;
};
t.prototype.inputEnding = function(e) {
this.m_input = e.string;
};
return t = i([ c ], t);
}(r.default));
n.default = l;
cc._RF.pop();
}, {
"../../engine/UILayer": "UILayer",
"../../game/Instance": "Instance"
} ],
VegetableRecyclingLayer: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9a8abkT+EFHgbjxtV3Tqq61", "VegetableRecyclingLayer");
var o = this && this.__extends || function() {
var e = function(t, n) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
})(t, n);
};
return function(t, n) {
e(t, n);
function o() {
this.constructor = t;
}
t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o());
};
}(), i = this && this.__decorate || function(e, t, n, o) {
var i, r = arguments.length, a = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a);
return r > 3 && a && Object.defineProperty(t, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../../../engine/UILayer"), a = e("../../../game/Instance"), s = cc._decorator, c = s.ccclass, l = s.property, u = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.m_imgsTree = [];
return t;
}
t.prototype.onCreate = function(e) {
var t = this, n = this.seekCompByName(cc.Sprite, "bg_1/img_vegetable");
n.spriteFrame = this.m_scene.m_spriteFrames[e.idx];
var o = this.seekCompByName(cc.Sprite, "img_6", n.node), i = e.idx + 1;
if (i >= 41 && i <= 45) {
o.spriteFrame = this.m_imgsTree[i - 41];
o.node.active = !0;
} else o.node.active = !1;
this.seekCompByName(cc.Label, "bg_1/img_3/label_money").string = "+" + a.default.glodConverToString(e.add_gold);
this.m_callBack = e.callback;
var r = this.seekNodeByName("bg_1/btn_confirm");
this.addTouchEventListener(r, function(e, n) {
if (2 == n && t.m_callBack) {
t.m_callBack(1);
t.removeFromParent();
}
});
var s = this.seekNodeByName("bg_1/button_close");
this.addTouchEventListener(s, function(e, n) {
if (2 == n) {
t.m_callBack && t.m_callBack(0);
t.removeFromParent();
}
});
};
i([ l(cc.SpriteFrame) ], t.prototype, "m_imgsTree", void 0);
return t = i([ c ], t);
}(r.default);
n.default = u;
cc._RF.pop();
}, {
"../../../engine/UILayer": "UILayer",
"../../../game/Instance": "Instance"
} ],
ZipManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9c4a90exw1E3ZkklLC9WjhJ", "ZipManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = e("../Manager"), i = function() {
function e() {
this.m_zip = jsb.ZipManager.getInstance();
this.m_count = 0;
}
e.getInstance = function() {
e.m_instance || (e.m_instance = new e());
return e.m_instance;
};
e.prototype.addUnZipRequest = function(e, t, n) {
jsb.fileUtils.createDirectory(t);
this.m_zip.unZip(n, e, t);
this._changeN(1);
};
e.prototype._changeN = function(e) {
this.m_count = this.m_count + e;
1 == this.m_count ? o.getManager().addToProcess(this) : 0 == this.m_count && o.getManager().removeProcess(this);
};
e.prototype.process = function() {
for (;;) {
var e = this.m_zip.get();
if (!e) break;
var t = JSON.parse(e);
o.getManager().dispatchEvent(t.tag, t);
0 != t.cmd && 1 != t.cmd || this._changeN(-1);
}
};
e.m_instance = null;
return e;
}();
n.default = i;
cc._RF.pop();
}, {
"../Manager": "Manager"
} ],
use_reversed_rotateBy: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "057d3YBGwdOTqUYYtBMJ6qb", "use_reversed_rotateBy");
cc.RotateBy._reverse = !0;
cc._RF.pop();
}, {} ]
}, {}, [ "use_reversed_rotateBy", "IProcess", "Manager", "Download", "HttpClient", "TcpClient", "UIBase", "UILayer", "UIScene", "JSEvent", "Sound", "UserDefault", "ZipManager", "AFunction", "ScriptDefine", "ScriptPerform", "Base", "BighornTcpAgent", "HttpDefense", "Instance", "Layer", "Scene", "ScriptManager", "ADLayer", "BindPhoneLayer", "CashOutHistoryLayer", "CashOutHistoryTipLayer", "CashOutLayer", "CommonTipsLayer", "FreeSaveOrUpLayer", "GonglveLayer", "GuideLayer", "GuideQuickenLayer", "IncomeInfoLayer", "IncomeLayer", "MyIncomeLayer", "MyTeamLayer", "PupilDevoteLayer", "TodayPredictIncomeLayer", "IncomeDetailsLayer", "IncomeFHLayer", "IncomeMyTeamLayer", "IncomeSYLayer", "InviteLayer", "KeFuLayer", "ListLayer", "LoadLayer", "LoginGameLayer", "LotteryLayer", "MarqueeLayer", "MergeMoneyTreeLayer", "MessageLayer", "NoticeLayer", "PopUpLayer", "OfflineRevenueLayer", "SpeedLayer", "TipsLayer", "VegetableRecyclingLayer", "ProgressLayer", "RedPackageLayer", "RewardLayer", "RotaryTableLayer", "ShareLayer", "ShopLayer", "ShowAddMoney", "EnemyListLayer", "HelpLayer", "SearchTargetLayer", "StealVegetablesLayer", "TaskLayer", "ToastLayer", "TouchTreeTipsLayer", "UserInfoLayer", "UserInfoLayer2", "HallLayer", "HallScene", "LoginLayer", "LoginScene", "UpdateLayer" ]);