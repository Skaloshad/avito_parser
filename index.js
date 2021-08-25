const fs = require('fs');
const puppeteer = require('puppeteer');
const Parser = require('./Parser');

(async () => {
   let browser = await puppeteer.launch({
      headless: false,
      //slowMo: 100,
      devtools: true
   });
   
   let parser = new Parser(browser);
   await parser.init();
   let result = await parser.getRes();
   console.log(result)
   /*et page = await browser.newPage();
   await page.goto(`https://www.avito.ru/moskva_i_mo/igry_pristavki_i_programmy/igrovye_pristavki-ASgBAgICAUSSAsoJ?p=1&q=sony+playstation+5`);*/
})();

/*(async () => {

   let res = [];

   let browser = await puppeteer.launch({
      headless: false,
      //slowMo: 100,
      devtools: true
   });

   let page = await browser.newPage();
   await page.setDefaultNavigationTimeout(60000);
   await page.setViewport({
      width: 1400,
      height: 900
   })

   let flag = true;
   let pageNum = 1;
   

   try {
      await getPage(page, res, flag, pageNum);
   } catch (e) {
      console.log(e);
      console.log('dfsdfsd')

      if (e.name == 'TimeoutError') {
         await browser.close();
      } else {
         await browser.close();
      }
   }
})();

async function getPage(page, res, flag, pageNum) {
   while (flag) {
      await page.goto(`https://www.avito.ru/moskva_i_mo/igry_pristavki_i_programmy/igrovye_pristavki-ASgBAgICAUSSAsoJ?p=${pageNum}&q=sony+playstation+5`)
      await page.waitForSelector('div[data-marker="item"]')

      let html = await page.evaluate(async () => {
         let p = []

         try {
            let divs = document.querySelectorAll('div[data-marker="item"]')

            divs.forEach(div => {

               let id = div.dataset.itemId;
               let url = div.querySelector('a[itemprop="url"]')
               let name = div.querySelector('h3[itemprop="name"]')
               let price = div.querySelector('meta[itemprop="price"]')
               let priceCurrency = div.querySelector('meta[itemprop="priceCurrency"')
               let description = div.querySelector('div[class^="iva-item-description"] > div')
               let date = div.querySelector('div[data-marker="item-date"]')
               let priceLower = div.querySelector('span[class^="price_lower"]')
               let delivery = div.querySelector('svg[class^="delivery-icon-icon"]')
               let improved = div.querySelector('div[class^="styles-arrow"]')
               let geo = div.querySelector('div[class^="geo-georeferences"] > span')

               let obj = {
                  id,
                  link: url.href,
                  name: name ? name.innerHTML : 'Нету имени',
                  title: url.title,
                  description: description ? description.innerHTML : 'Нету описания',
                  price: price.content,
                  priceCurrency: priceCurrency.content,
                  date: date ? date.innerHTML : 'Нету даты',
                  priceLower: priceLower ? true : false,
                  delivery: delivery ? true : false,
                  improved: improved ? true : false,
                  geo: geo ? geo.innerHTML : 'Нету информации'
               }
               p.push(obj)
            })

            console.log(p)

         } catch (e) {
            console.log(e)
            console.log('111111')
         }
         return p;
      }, { waitUntil: 'div[data-marker="item"]' })

      await res.push(html)
      console.log(html.length)

      for (let i in res) {
         if (res[i].length === 0) flag = false
      }

      flag = false

      pageNum++
   }
   res = res.flat()
   console.log(res[0])
}
*/