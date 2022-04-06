const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapping(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://intranet.cad.go.th/CAD_LOOP/CAD_ANNIVERSARY/index_65.php');
    //#categorytab1 > option:nth-child(1)
    //let catElements = await page.waitForSelector('#categorytab1 > option:nth-child(1)');
    //let text = await page.evaluate(catElements=>catElements.textContent,catElements);
    const text = await page.evaluate(() => Array.from(document.querySelectorAll('input[id*="option_text_"]'), element => [element.id,element.value]));
    //console.log(text);
    writeText(text);
    await browser.close();
   
}

function writeText(getText){
    let regEx = /\\\w/g;
    let textParse = JSON.stringify(getText);
    let text = textParse.replace(regEx,'');
    //let textParse = Object.assign({}, getText); // {0:"a", 1:"b", 2:"c"}
    //console.log(textParse);
    
    fs.writeFile('wishText.txt', text, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });
}

scrapping();
