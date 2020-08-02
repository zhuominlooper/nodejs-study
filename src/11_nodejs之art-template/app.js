//引入模块
var Koa=require('koa')
var Router=require('koa-router')
var Render=require('koa-art-template')
//实例化
var app=new Koa()
var router=new Router()

//使用art-tempalte模板
Render(app,{
    root:__dirname+'/views/',//视图位置
    extname:'.html',//后缀名
    debug:false
})


//配置路由
router.get('/',async(ctx)=>{
  let  app={
        name:'looper',
        h:'<h2>这是一个html标签</h2>',
        list:[111,222,333],
        num:20
    }
    await ctx.render('index',{
        app
    })

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
