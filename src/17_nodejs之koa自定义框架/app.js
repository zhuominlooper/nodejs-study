//引入模块
var Router=require('koa-router')
var Koa=require('koa')
var adminRouter=require('./routers/admin')
var newsRouter=require('./routers/news')
var Render=require('koa-art-template')
//实例化
var app=new Koa()
var router=new Router()

Render(app,{
    root:__dirname+'/views/admin',//视图位置
    extname:'.html',//后缀名
    debug:false
})


//配置路由  

router.use('/admin',adminRouter)//配置admin模块路由
router.use('/news',newsRouter)//配置news模块路由

app.use(router.routes()).use(router.allowedMethods())

//监听端口
console.log("启动成功")
app.listen(3000)
