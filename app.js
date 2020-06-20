var express = require('express');
var app = express();
var spider = require("./spider.js")

app.get('*',async function(req, res,next){
    // 部署到服务器的完整URL
    var url = 'https://www.mvi-web.cn' + req.originalUrl;
	console.log('请求的完整URL：'+ url);
	var content = await spider(url).catch((error)=>{
		console.log('获取html内容失败')
		console.log(error);
	});
	res.send(content);
});

app.listen(3000, function () {
  console.log('预渲染服务已启动！');
});
