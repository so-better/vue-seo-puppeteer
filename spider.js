const puppeteer = require('puppeteer')

const spider = (url) => {
	return new Promise((resolve, reject) => {
		var page = null;
		var brower = null;
		//使用puppetee插件启动一个浏览器
		puppeteer.launch({
			args: ['--no-sandbox'],
			dumpio: false, //是否将浏览器进程标准输出和标准错误输入到 process.stdout 和 process.stderr 中
			headless: true, //是否以无头模式运行浏览器，默认为true，设为false时，可以显示可视化浏览器界面
		}).then((result) => {
			brower = result;
			// 开启一个新页面
			return brower.newPage();
		}).then((result) => {
			page = result;
			//打开指定网页
			return page.goto(url, {
				timeout:60000,//连接超时时间，单位ms
				waitUntil: 'networkidle0' //网络空闲说明已加载完毕
			})
		}).then(() => {
			return page.evaluate(() => {
				return document.getElementsByTagName('html')[0].outerHTML;
			});
		}).then((result) => {
			brower.close();
			resolve(result);
		}).catch((error) => {
			reject(error)
		})
	})
}


module.exports = spider;
