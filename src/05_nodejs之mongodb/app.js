
const {MongoClient}=require('mongodb')//引入实例

//定义数据库连接地址
const url="mongodb://127.0.0.1:27017"

//定义要操作的数据库
const dbName="looperinfo"

//实例化连接对象
//只创建一个
var client=new MongoClient(url,{ useUnifiedTopology: true })

//每次使用创建
MongoClient.connect(url,(err,client)=>{
    //do

    client.close()
})

//连接数据库
client.connect(err=>{
    if(err){
        console.log("连接失败",err)
        return
    }
    console.log("连接成功")
    let db=client.db(dbName)
    //操作
      
    //查找数据
     db.collection("user").find({"name":"looperzhuo"}).limit(10).toArray((err,data)=>{//异步
         console.log(data)
         client.close();//用完关闭
     })
     //插入数据
    //  db.collection("user").insert({"name":"looperzhuo","age":25},(err,data)=>{
    //      console.log("添加数据成功:"+data)
    //      client.close();//用完关闭
    //  })
     //修改数据
       db.collection("user").update({"name":"looperzhuo"},{$set:{"age":255}},(err,data)=>{
           if(err){
               console.log("修改失败",err)
           }
          // console.log(data)
           client.close();//用完关闭
       })

    //删除数据
    //删除一条或者多条
    db.collection("user").deleteOne({"age":255},(err,data)=>{
        if(err){
            console.log("删除失败:",err)
        }
        console.log(data)
        client.close();//用完关闭
    })   

})