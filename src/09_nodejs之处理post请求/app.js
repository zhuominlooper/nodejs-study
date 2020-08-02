//引入模块
var Koa = require('koa')
var Router = require('koa-router')
var views = require('koa-views')
const path = require('path')
const common=require('./common')
var bodyParser=require('koa-bodyparser')//post请求的中间件

//实例化
var app = new Koa()
var router = new Router()

//使用map配置后缀名需要html
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
}))

//获取post参数的第三方插件
app.use(bodyParser())

//放置公共的数据，在任何路由里都可以使用
app.use(async (ctx,next)=>{
    ctx.state.info="looper"
    ctx.state.name="zhuo"
    await next()
})

router.get('/', async (ctx) => {
    await ctx.render('index',{
    })
})
// router.post('/post', async (ctx) => {//采用原生的nodejs实现post请求
//      let info=await common(ctx)
//      ctx.body="post数据的是："+info

// })
router.post('/post', async (ctx) => {//采用原生的nodejs实现post请求
    console.log(ctx.request) 
    ctx.body=ctx.request.body

})

app.use(router.routes()) //启动路由，必须
app.use(router.allowedMethods()) //配置信息

//监听端口
console.log("启动成功")
app.listen(3000)