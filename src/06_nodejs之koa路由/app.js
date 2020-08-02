//引入模块
var Koa=require('koa')
var Router=require('koa-router')
//实例化
var app=new Koa()
var router=new Router()

//配置路由
router.get('/',async(ctx)=>{
      ctx.body='这是首页'//向浏览器返回数据
}).get('/news',async(ctx)=>{
    //获取get路由传参数
    console.log(ctx.query)//对象
    console.log(ctx.querystring)//字符串
    console.log(ctx.request.url)//字符串
    ctx.body="这是新闻页"
}).get('/contentnew/:name',async(ctx)=>{//动态路由配置/xxx形式
      console.log(ctx.params)
    ctx.body="这是新闻详情页,name是："+ctx.params.name
})

app.use(router.routes())//启动路由，必须
app.use(router.allowedMethods())//配置信息

//监听端口
console.log("启动成功")
app.listen(3000)
