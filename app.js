var express = require('express');
var app = express();
var spider = require("./spider.js")

app.get('*', async (req, res, next) => {
	// 部署到服务器的完整URL
	var url = 'https://www.mvi-web.cn' + req.originalUrl;
	console.log('请求的完整URL：' + url);
	var content = await spider(url).catch((error) => {
		console.log(error);
		res.send('获取html内容失败');
		return;
	});
	res.send(content);
});

app.listen(3000, () => {
	console.log('预渲染服务已启动！');
});
