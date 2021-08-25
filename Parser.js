class Parser {

   browser;
   page;
   link = `https://www.avito.ru/moskva_i_mo/igry_pristavki_i_programmy/igrovye_pristavki-ASgBAgICAUSSAsoJ?p=1&q=sony+playstation+5`;
   pages = 3;
   res = [];

   constructor(browser) {
      this.browser = browser;
   }

   async init() {
      await this.createPage();
      await this.goToPage();
   }

   async createPage() {
      this.page = await this.browser.newPage();
   }

   async goToPage() {
      await this.page.goto(this.link);
   }

   async scrabData() {
      await this.page.waitForSelector('div[data-marker="item"]')

      let html = await this.page.evaluate(async () => {
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

      await this.res.push(html)
   }

   async getRes() {
      await this.scrabData();
      return this.res;
   }
  
}

module.exports = Parser;