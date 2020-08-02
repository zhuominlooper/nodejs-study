//引入模块
var Router=require('koa-router')
//实例化
var router=new Router()
var DB=require('../../commons/mongondb/db').getDbInstance()//创建db对象
//配置路由
router.get('/',async(ctx,)=>{
    ctx.body='进入到个人详情子页'//向浏览器返回数据
})
router.get('/delete',async(ctx)=>{
      await ctx.render('delete')
      ctx.body='这是admin个人删除页'//向浏览器返回数据
}).get('/add',async(ctx)=>{
    await ctx.render('add')
    ctx.body="这是admin的个人添加页"
}).get('/update',async(ctx)=>{
    await ctx.render('update')
    ctx.body="这是admin的个人更新页"
})
.get('/detail',async(ctx)=>{
    let data=  await DB.find('user',{"name":"looperzhuo"})
    console.log('数据:',data)
    await ctx.render('find',{data})
})
module.exports=router.routes()//返回路由启动
