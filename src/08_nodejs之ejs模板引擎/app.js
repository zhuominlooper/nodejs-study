//引入模块
var Koa = require('koa')
var Router = require('koa-router')
var views = require('koa-views')
const path = require('path')
const { nextTick } = require('process')
//实例化
var app = new Koa()
var router = new Router()

//使用map配置后缀名需要html
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}))

//放置公共的数据，在任何路由里都可以使用
app.use(async (ctx,next)=>{
    ctx.state.info="looper"
    ctx.state.name="zhuo"
    await next()
})

router.get('/', async (ctx) => {
    await ctx.render('index',{
        titleTest:'你好ejs',
        template:'<h2>我是模板不转义</h2>',
        templateTest:'<h2>我是模板我转义了</h2>',
        list:[1,2,3,4]
    })
})
app.use(router.routes()) //启动路由，必须
app.use(router.allowedMethods()) //配置信息

//监听端口
console.log("启动成功")
app.listen(3000)