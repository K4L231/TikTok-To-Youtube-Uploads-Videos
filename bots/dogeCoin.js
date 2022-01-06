
// setInterval(run, [600000]);
run()
function run(){
(async () => {
  const puppeteer = require('puppeteer-extra')
  const  StealthPlugin = require ('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({
      'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
  });
    await page.evaluateOnNewDocument(() => {
      delete navigator.__proto__.webdriver;
    });


  await page.goto('https://www.tiktok.com/tag/Dogecoin?lang=en', {
      waitUntil: 'networkidle0',
      timeout: 0
    });
  const fs = require('fs');
  const jsonString = fs.readFileSync("./json/dogeCoin.json");
  const data = JSON.parse(jsonString);
  const dataSet = new Set(data);
  console.log(data.length)

    await page.setDefaultNavigationTimeout(0); 
    await scrollDown(data.length);
    await page.waitForTimeout(5000)

    for(let i = 0; i < (data.length * 10) + 100; i = i + 10){
      let vidInfo = await page.evaluate((i) => {
        let vidLink = document.querySelector('.tiktok-1gs7l3h-DivItemContainer.e1z53d07').querySelectorAll('div')[i].querySelector('a').href
        let vidName = document.querySelectorAll('.tiktok-1gs7l3h-DivItemContainer.e1z53d07')[i].querySelectorAll('div')[7].innerText
        return {
          vidName,
          vidLink
        }
      },i)
      let title = vidInfo.vidName
      let link = vidInfo.vidLink
      if(dataSet.has(title)){
        continue;
      } else {
        pushData(vidInfo.vidName, link)
        return;
      }
      
    }

    async function pushData(title, link){

      data.push(title);
      fs.writeFile ("./json/dogeCoin.json", JSON.stringify(data), function(err){
          if (err) throw err;
          console.log('data saved');
            }
          );
      await downloadVideo(title, link);
    }
    
    async function downloadVideo(title, link){
        const page1 = await browser.newPage();
        // await page1._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './downloads'});
        await page1.goto('https://ssstik.io/en', {
        waitUntil: 'load',
        timeout: 0
      });

      const path = require('path');
      const downloadPath = path.resolve('C:/Users/PC/Documents/javascript fun/yt/downloads');
      await page1._client.send('Page.setDownloadBehavior', {
          behavior: 'allow',
          downloadPath: downloadPath 
      });
      
        console.log(title, link);
        await page1.focus('input[type="text"]');
        await page1.keyboard.type(link)
        await page1.waitForTimeout(2000)
        await page1.click('#submit')
        await page1.waitForTimeout(10000)
        await page1.click('div.result_overlay > a')
        await page1.waitForTimeout(5000)
        await page1.keyboard.press('Enter');
        await page1.waitForTimeout(30000)
      uploadVideo(title);
    }

    async function uploadVideo(title){

    const page3 = await browser.newPage()
    await page3.setExtraHTTPHeaders({
        'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
    });
    await page3.goto('https://youtube.com', {
      waitUntil: 'networkidle0',
      timeout: 0
    });
    await page3.waitForTimeout(5000)
    page3.evaluate(() => {
            
    document.querySelector('tp-yt-paper-dialog').querySelector('#content').querySelectorAll('div')[1].querySelectorAll('div')[4].querySelectorAll('div')[1].querySelectorAll('ytd-button-renderer')[1].click()
    document.querySelectorAll('tp-yt-paper-button')[1].click();
    })
    await page3.waitForTimeout(5000);
    await page3.focus('input[type="email"]');
    await page3.keyboard.type("Bbzkoksx@gmail.com");
    await page3.waitForTimeout(2500);
    await page3.evaluate(() => {
        document.querySelectorAll('button')[2].click()
    })

    await page3.waitForTimeout(2500);
    await page3.focus('input[type="password"]');
    await page3.keyboard.type("123tugaidys");
    await page3.waitForTimeout(2000);
    await page3.evaluate(() => {
        document.querySelectorAll('button')[1].click()
    })
    await page3.waitForTimeout(10000)
    await page3.evaluate(() => {
      document.querySelectorAll('button')[0].click()
  })
    await page3.waitForTimeout(10000)
    await page3.evaluate(() => {
    document.querySelectorAll('button')[9].click()})
    await page3.waitForTimeout(10000)
    await page3.evaluate(() => {document.querySelector('ytd-compact-link-renderer').querySelector('#endpoint').click()})
    await page3.waitForTimeout(20000)

    const [button] = await page3.$x("//div[contains(., 'Select files')]");

    const [fileChooser] = await Promise.all([
        page3.waitForFileChooser(),
        await button.click()
        ]);

      const content = [];
      fs.readdirSync('./downloads').forEach(file => { 
      content.push(file);
      }); 
      console.log(content[0])

    await fileChooser.accept(['./downloads/' + content[0]]);

    await page3.waitForTimeout(25000)
  
    const text_box = await page3.$x("//*[@id=\"textbox\"]");
    await text_box[1].type('#shorts');
      await page3.waitForTimeout(5000)

    await text_box[0].click()
     for(let i = 0; i < 20; i++){
      await page3.keyboard.press('Backspace')
     }
    await text_box[0].type(title);
    let charToDelete = 0;
    if(title.length > 100){
      charToDelete = title.length - 100;
    }
    for(let j = 0; j < charToDelete; j++){
     await page3.keyboard.press('Backspace')
    }

    try{
      var sourceUrls = "./downloads/";
      fs.unlinkSync(sourceUrls + content[0]);
     }catch(err){
      console.log(err);
     }
      
    await page3.waitForTimeout(5000)
    
    await page3.evaluate(() => {
        document.querySelectorAll('tp-yt-paper-radio-button')[1].click()
        document.querySelector('#next-button').click()
    })
    await page3.waitForTimeout(1000)
    
    await page3.evaluate(() => {
        document.querySelector('#next-button').click()
    })
    await page3.waitForTimeout(1000)
    
    await page3.evaluate(() => {
        document.querySelector('#next-button').click()
    })
    await page3.waitForTimeout(1000)
    
    await page3.evaluate(() => {
        document.querySelectorAll('tp-yt-paper-radio-button')[3].click()
    })
    await page3.waitForTimeout(5000)
    await page3.evaluate(() => {
      document.querySelector('#done-button').click()
  })
  console.log("uploaded")
  await page3.waitForTimeout(15000)
    
    await browser.close()
    }


async function scrollDown(length){
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  console.log('Gonna scroll for ' + Math.round((length / 10) + 1))
  for(let i = 0; i < Math.round((length / 10) + 1); i++){
    await page.evaluate(() => new Promise((resolve) => {
      var scrollTop = -1;
      const interval = setInterval(() => {
        window.scrollBy(0, 100);
        if(document.documentElement.scrollTop !== scrollTop) {
          scrollTop = document.documentElement.scrollTop;
          return;
        }
        clearInterval(interval);
        resolve();
      }, 10);
    }));
    await sleep(5000)
  }
}



})();

}