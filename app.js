const express = require('express')
const app = express()
const spider = require('./spider.js')

app.get('*', async (req, res, next) => {
	// 部署到服务器的完整URL
	const url = 'https://www.mvi-web.cn' + req.originalUrl
	console.log('请求的完整URL：' + url)
	const content = await spider(url).catch(error => {
		console.log(error)
		res.send('获取html内容失败')
		return
	})
	res.send(content)
})

app.listen(3000, () => {
	console.log('预渲染服务已启动！')
})
