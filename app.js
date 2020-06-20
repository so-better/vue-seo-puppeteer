var express = require('express');
var app = express();
var spider = require("./spider.js")

app.get('*',async function(req, res){
    // 部署到服务器的完整URL
    var url = req.protocol + '://'+ req.hostname + req.originalUrl;
	console.log('请求的完整URL：'+ url);
	
	var content = await spider(url);
	res.send(content);
});

app.listen(3000, function () {
  console.log('预渲染服务已启动！');
});
