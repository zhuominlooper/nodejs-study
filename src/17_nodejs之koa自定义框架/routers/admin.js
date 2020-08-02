//引入模块
var Router=require('koa-router')
var personaRouter=require('./admin/personal')
//实例化
var router=new Router()

//配置路由
router.get('/',async(ctx)=>{
      ctx.body='这是admin主页'//向浏览器返回数据
})
router.use('/detail',personaRouter)//配置news模块路由
module.exports=router.routes()//返回路由启动
