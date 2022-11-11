const puppeteer = require('puppeteer');

const scrap_Domestika=async (query) => {
    console.log("Empieza scrap Domestika");
    if(!query){
        query= "full stack"
    }
    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage();

    await page.goto('https://www.domestika.org/es/jobs');

    await page.setViewport({width:1440, height:614});

    await page.type('#query', query)

    await page.click('.ais-SearchBox-submit');
    await page.waitForSelector('.job-item');

    const urls = await page.evaluate( () => {
        const elements = document.querySelectorAll('.job-item .row .col-md-6 h2 a')
        
        const links = [];
        for(let element of elements) {
            links.push(element.href);
        }
        return links;
    });

    console.log("Esto son urls", urls)
    const ofertas = [];
    for(let url of urls){
        await page.goto(url);
        await page.waitForSelector('h1');

        const oferta = await page.evaluate(()=>{
            const tmp = {};
            tmp.title = document.querySelector('h1').innerText;
            tmp.company = document.querySelector('h2').innerText;
            tmp.salary = document.querySelector('dd:nth-of-type(4n)').innerText;
            tmp.url = window.location.href;
            return tmp
        });
        ofertas.push(oferta);
    }
    console.log("Scrap Domestika conseguido!")
    await browser.close();
    console.log(ofertas)
    return ofertas
};

scrap_Domestika()