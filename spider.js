const puppeteer = require('puppeteer')
const WSE_LIST = require('./puppeteer-pool.js')
const spider = async url => {
	const tmp = Math.floor(Math.random() * WSE_LIST.length)
	const browserWSEndpoint = WSE_LIST[tmp]
	const browser = await puppeteer.connect({
		browserWSEndpoint
	})
	const page = await browser.newPage()
	await page.goto(url, {
		timeout: 0, //连接超时时间，单位ms
		waitUntil: 'networkidle0' //网络空闲说明已加载完毕
	})
	const html = await page.evaluate(() => {
		return document.getElementsByTagName('html')[0]?.outerHTML
	})
	await page.close()
	return html
}
module.exports = spider
