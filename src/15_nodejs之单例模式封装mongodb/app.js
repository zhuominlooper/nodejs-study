//引入模块
var Koa=require('koa')
var Router=require('koa-router')
var DB=require('./modules/db')
//实例化
var app=new Koa()
var router=new Router()

//配置路由
router.get('/',async(ctx)=>{
    console.time('首页耗时')
    let db=DB.getDbInstance() 
   let data=await db.find('user',{"name":"looperzhuo"})
   console.timeEnd('首页耗时')
   console.log('数据为',data)
    ctx.body='这是首页'+data[0].name//向浏览器返回数据
}).get('/news',async(ctx)=>{
    console.time('新闻页耗时')
    let db=DB.getDbInstance() 
    let data=await db.find('user',{"name":"looperzhuo"})
    console.timeEnd('新闻页耗时')
    console.log('数据为',data)
     ctx.body='这是新闻页'+data[0].name//向浏览器返回数据
})

app.use(router.routes())//启动路由，必须
app.use(router.allowedMethods())//配置信息

//监听端口
console.log("启动成功")
app.listen(3000)