
//初始化一个ndoejs 服务器
//并获取url中的参数
const url=require('url')//引入url模块，处理参数
const http=require('http')//引入http模块，用于创建服务
const { userInfo } = require('os')

http.createServer((request,response)=>{
    console.log(request.method)//请求的方式
    if(request.url!='/favicon.ico'){
        let info=url.parse(request.url)//输出请求的url等信息
        console.log(info)
        let urlInfo=url.parse(request.url,true).query//获取url的参数，转换成对象
        console.log(`名字是${userInfo.name}`)
    }
    response.writeHead(200,{"Content-type":"text/html;charset=utf-8"})
    response.write("第一次创建一个nodejs服务")//向浏览器输出内容
    response.end()//结束响应
}).listen(3000)//设置端口