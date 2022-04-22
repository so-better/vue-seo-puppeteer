const express = require('express')
const app = express()
const os = require('os')
const spider = require('./spider.js')
const fs = require('fs') //nodejs的fs对象
const path = require('path') //nodejs的path对象
const FdOp = require('fd-op') //引入fd-op
const fdOp = new FdOp(fs, path) //创建实例对象

app.get('*', async (req, res, next) => {
    // 部署到服务器的完整URL
    let url = 'https://www.mvi-web.cn' + req.originalUrl
    console.log('请求的完整URL：' + url)
    let content = await spider(url).catch(error => {
        console.log(error)
        res.send('获取html内容失败')
        return
    })
    res.send(content)
})

app.listen(3000, () => {
    console.log('预渲染服务已启动！')
})
