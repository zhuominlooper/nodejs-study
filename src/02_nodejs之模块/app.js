
//使用exports导出
var testA=require('./modules/a')//默认找a.js
console.log(testA.A.post())

//module.exports导出
var testB=require('./modules/b')//默认找b.js
console.log(testB.post())

//在node_modules里导出,文件和js要同级
//var testC=require('./node_modules/c/index')//普通引入
//var testC=require('c/index')//在node_modules下，直接可以写文件名和js文件
var testC=require('c')//在node_modules下，并且是index.js，就可以写文件名，我们看到系统模块引入的就是这个道理
var http=require('http')
console.log(testC.C.post())

//如果js文件不是index.js,又需要以文件夹方式引入
//需要添加packsge.json去配置(main属性)
var testD=require('mypackage')
console.log(testD.D.post())
