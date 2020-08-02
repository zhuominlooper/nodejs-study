//nodejs中的fs模块主要用于文件操作
//内置模块
// const fs = require('fs') //引入fs模块，内置方法异步的

const {
    resolve
} = require("path")
const {
    rejects
} = require("assert")
const fs = require("fs")

// //fs.stat检查是文件还是目录
// fs.stat('./modules', (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         if (data.isDirectory()) {
//             console.log("此文件是目录")
//         }
//         if (data.isFile()) {
//             console.log("此文件是文件")
//         }
//     }
// })

// // //fs.mkdir创建目录,如果存在则报错
// // fs.mkdir('./A',(err)=>{
// //     if(err){
// //         console.log(err)//file already exists
// //     }
// // })

// // //fs.writeFile,创建文件，并写入内容
// // //如果文件存在，则会覆盖内容
// // fs.writeFile('./A/index.html',"你好nodejs,我是looper",(err)=>{
// //     if(err){
// //         console.log(err)
// //     }
// // })

// //fs.appendFile,追加内容
// //若不存在文件则创建
// // fs.appendFile('./A/append.html',"你好nodejs,我是looperqwe",(err)=>{
// //     if(err){
// //         console.log(err)
// //     }
// // })

// //fs.readFile,读取文件内容
// //默认读出来是buffer字节
// fs.readFile('./A/append.html', {
//     encoding: 'utf-8'
// }, (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     if (data) {
//         console.log("读取的内容:", data)
//     }
// })

// //fs.readdir,以数组的形式读取当前的目录
// //读取出的包含文件和目录
// fs.readdir('./', (err, data) => {
//     if (err) {
//         console.log(err)
//     }
//     if (data) {
//         console.log('读取的目录：', data) //[ 'A', 'app.js', 'modules', 'README.md', 'tempCodeRunnerFile.js' ]
//     }
// })

// //fs.rmdir,删除目录
// //fs.unlik,删除文件
// //可能存在没有权限
// fs.rmdir('./A', (err) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log("目录删除成功")
// })
// fs.unlink('./modules/', (err) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//   console.log('文件删除成功')
// })



//实践
//获取wwwroot下的所以目录，不包括文件
//思路
//1.获取该目录下的所以文件遍历
//2.判断是否是目录，在添加
//3.解决异步问题
// let fileArr=[]
// fs.readdir('./wwwroot/',(err,fileArray)=>{
//     if(err){
//         console.log(err)
//     }
//     if(fileArray){
//         for(let i=0;i<fileArray.length;i++){
//             console.log('循环开始')
//             fs.stat('./wwwroot/'+fileArray[i],(err,data)=>{//由于是异步的，放在队列里最后执行，所以此时fileArr为[]
//                 console.log('进入判断')
//                 if(data.isDirectory()){
//                     fileArr.push(fileArray[i])
//                 }
//             })          
//         }
//         console.log('由于异步原因，wwwroot下的目录为空:',fileArr)
//     }
// })

// //改进，递归实现
// let dirArr=[];
// fs.readdir('./wwwroot/',(err,fileArray)=>{
//     (function getDir(i){
//         if(i==fileArray.length){
//             console.log('执行完成')
//             console.log(dirArr)
//             return
//         }
//         fs.stat('./wwwroot/'+fileArray[i],(err,data)=>{
//             if(data.isDirectory()){
//                  dirArr.push(fileArray[i])
//             }
//         }) 
//         console.log('递归')
//         getDir(i+1)
//     })(0)//使用递归自自行函数封装异步方法，转为同步实现
//     console.log('由于立即执行函数封装了异步执行，wwwroot下的目录为:',dirArr)
//})

//以流的方式写入数据和读出数据
//相对是大文件的时候使用
fs.writeFile('./app.txt', '', (err) => {
    console.log('文件创建成功')
})
//以流的方式写入内容
var str = ''
for (let i = 0; i < 1000; i++) {
    str += '我在学习nodejs\n'
}
var writeStream = fs.createWriteStream('./app.txt')
writeStream.write(str) //写入内容
writeStream.end()
writeStream.on('finish', () => {
    console.log('文件写入完成')
}) //使用了end方法才会触发完成事件

//以流的方式读出
// var readStr = ''
// var readStream = fs.createReadStream('./app.txt')
// readStream.on('data', (chunk) => { //分批次读取
//     readStr += chunk
// })
// readStream.on('end', (chunk) => {
//     console.log('读取文件完成')
//     console.log(111, readStr)
// })
// readStream.on('error', (err) => {
//     console.log('错误：', err)
// })

//使用管道流去复制文件
//把一个文件内容写入到另外文件
//管道流pipe
var readPipe=fs.createReadStream('./test.rar')
var writePipe=fs.createWriteStream('./A/demo.rar')
readPipe.pipe(writePipe)
console.log('文件复制完成')