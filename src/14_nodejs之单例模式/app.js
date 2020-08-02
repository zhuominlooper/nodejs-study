//通过立即执行函数和闭包实现懒汉式单例模式
//只有当调用timeTool()时进行实例的实例化，这就是惰性单例的应用，不在js加载时就进行实例化创建， 
//而是在需要的时候再进行单例的创建. 如果再次调用， 那么返回的永远是第一次实例化后的实例对象。
let timeTool = (() =>{
    let _instance = null;    
    function init() {
      this.name = '处理时间工具库',
      this.getISODate = function() {
        return new Date().toISOString();
      }
    }  
    return function() { //通过必报保存单例    
      if(!_instance) {
        console.log("开始创建单例模式") 
        _instance = new init();
      }
      else{
        console.log("通过单例模式返回已经创建好的实例") 
      }
      return _instance;
    }
  })()//立即执行函数
  let instance1 = timeTool();
  let instance2 = timeTool();
  console.log(instance1 === instance2); //true

  //字面量单例模式
  //由于字面量使用let只能创建一个实例，所以也是最简单的单例
  let Obj={
    name:'looper',
    age:18
  }

  //es6实现单例
   class ObjInstance{
     static getInstence(){
       if(!ObjInstance.instance){
         console.log('创建数据库实例')
        ObjInstance.instance=new ObjInstance()
       }else{
        console.log('实例已经创建，直接返回')
       }
        return  ObjInstance.instance
     }

    constructor(){
      this.connect()
    }
    connect(){
       console.log('数据库开始连接')
    }
  }
  var objInstance1=ObjInstance.getInstence()
  var objInstance2=ObjInstance.getInstence()