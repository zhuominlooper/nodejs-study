//引入模块
var Koa=require('koa')
var Router=require('koa-router')
var session=require('koa-session')
//实例化
var app=new Koa()
var router=new Router()

//配饰session
app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge:10000,//过期时间
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: false, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** 每次请求时候强行设置 */
  renew: false, /** 请求时候如果即将过期，则重新设置*/
  secure: false, /** (boolean) secure cookie，是否支持https */
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}; 
app.use(session(CONFIG, app));

//配置路由
router.get('/',async(ctx)=>{
      ctx.session.name='looper-zhuo'
      ctx.body='这是首页'//向浏览器返回数据
}).get('/news',async(ctx)=>{

}).get('/contentnew',async(ctx)=>{//动态路由配置/xxx形式
  if(ctx.session.name){
    ctx.body="获取到session"+ctx.session.name
  }
  else{
    ctx.body="没有获取到session"
  }
})

app.use(router.routes())//启动路由，必须
app.use(router.allowedMethods())//配置信息

//监听端口
console.log("启动成功")
app.listen(3000)
