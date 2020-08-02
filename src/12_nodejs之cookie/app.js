//引入模块
var Koa = require('koa')
var Router = require('koa-router')
//实例化
var app = new Koa()
var router = new Router()

//配置路由
router.get('/', async (ctx) => {
    //不支持中文，可以通过base64去转换
    // ctx.cookies.set("name", Buffer.from("卓-looper").toString('base64'), {
    //     maxAge: 900000, //设置过期时间
    //     path: '/news', //只有该路径下可以访问cookie
    //     httpOnly: false, //是否只在服务端访问
    //     //domain,不设置，默认就是当前的域下都可以访问
    // }) //设置相同的key会覆盖
    ctx.body = '这是首页，已经设置了cookie' //向浏览器返回数据
}).get('/news', async (ctx) => {
    if (ctx.cookies.get('name')) {
        var name = Buffer.from(ctx.cookies.get('name'), 'base64').toString()
        ctx.body = "获取的cookie值是：" + name
    } else {
        ctx.body = '没有获取到cookie'
    }

}).get('/contentnew', async (ctx) => { //动态路由配置/xxx形式
    if (ctx.cookies.get('name')) {
        ctx.body = "获取的cookie值是：" + ctx.cookies.get('name')
    } else {
        ctx.body = '没有获取到cookie'
    }
})

app.use(router.routes()) //启动路由，必须
app.use(router.allowedMethods()) //配置信息

//监听端口
console.log("启动成功")
app.listen(3000)