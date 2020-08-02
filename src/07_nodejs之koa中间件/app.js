//引入模块
var Koa=require('koa')
var Router=require('koa-router')
//实例化
var app=new Koa()
var router=new Router()

//应用级中间件
//匹配任何路由
//匹配之前都会调用这个方法，
//localhost://3000/xxx都会匹配到
//相当于路由拦截器
//中间件总是先执行
//中间件和路由的执行顺序为：从外到内，从内到外，洋葱模型
app.use(async (ctx,next)=>{
  ctx.body="应用及中间件"//如果路由中没有向页面输出，则采用应用级中间件的输出，status=200
  console.log(new Date().toString())
  await next()//路由匹配完后继续向下匹配，不然一直匹配“这是中间件”
  //路由匹配完后继续往下执行
  console.log(ctx.status)
  //错误处理中间件
  if(ctx.status==404){
      ctx.body="404页面不存在"
  }else{
    ctx.body="200页面存在"
  }
})

//配置路由
router.get('/',async(ctx)=>{
      ctx.body='这是首页'//向浏览器返回数据
}).get('/news',async(ctx,next)=>{
    console.log("这是新闻页1")})
    //await next()//匹配到/news之后，继续向下匹配
// }).get('/news',async(ctx)=>{
//     ctx.body="这是新闻页2"
// })
.get('/contentnew/:name',async(ctx)=>{//动态路由配置/xxx形式
    ctx.body="这是新闻详情页,name是："+ctx.params.name
})

app.use(router.routes())//启动路由，必须
app.use(router.allowedMethods())//配置信息

//监听端口
console.log("启动成功")
app.listen(3000)
