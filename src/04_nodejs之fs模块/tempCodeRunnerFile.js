const fs = require('fs') //引入fs模块，内置方法异步的

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