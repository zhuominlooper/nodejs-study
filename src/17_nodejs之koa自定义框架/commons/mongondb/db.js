let dbConfig = require('../config/dbconfig') //db配置
const {
    MongoClient
} = require('mongodb') //引入实例
var client = new MongoClient(dbConfig.connectDb, {
    useUnifiedTopology: true
})

class DbOption {
    static getDbInstance() {
        if (!DbOption.instance) {
            console.log('创建数据库实例')
            DbOption.instance = new DbOption()
        } else {
            console.log('实例已经创建，直接返回')
        }
        return DbOption.instance
    }
    constructor() {
        this.dbClient = '' //解决多次连接问题
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (this.dbClient) {
                resolve(this.dbClient)
            } else {
                client.connect((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        this.dbClient = client.db(dbConfig.dbName)
                        resolve(this.dbClient)
                    }
                })
            }

        })
    }

    find(dbName, data) { //获取数据
        return new Promise((resolve, reject) => {
            console.log('查找数据')
            this.connect().then((db) => {
                console.time('查数据')
                db.collection(dbName).find(data).toArray((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                        console.timeEnd('查数据')
                    }
                })
            })
        })

    }
    insert(name, data) { //插入数据
        return new Promise((resolve, reject) => {
            console.log('插入数据')
            this.connect().then((db) => {
                db.collection(name).insert(data).toArray((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        })
    }
    delete(dbName, data) { //删除数据
        return new Promise((resolve, reject) => {
            console.log('删除数据')
            this.connect().then((db) => {
                db.collection(name).deleteOne(data, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        })
    }
    update(dbName, oldData, newData) { //更新数据
        return new Promise((resolve, reject) => {
            console.log('更新数据')
            this.connect().then((db) => {
                db.collection(dbName).update(oldData, {
                    $set: newData
                }, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        })
    }
}

module.exports = DbOption