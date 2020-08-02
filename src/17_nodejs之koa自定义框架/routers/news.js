//引入模块
var Router=require('koa-router')
//实例化
var router=new Router()

//配置路由
//router.prefix('news')
router.get('/',async(ctx)=>{
      ctx.body='这是news主页'//向浏览器返回数据
}).get('/detail',async(ctx)=>{
    ctx.body="这是news的详情页"
})
module.exports=router.routes()//返回路由启动
