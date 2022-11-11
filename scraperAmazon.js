const puppeteer = require('puppeteer');

const scrap_Amazon = async (query) => {
    console.log("Empieza el scraping");
    //Lanzamos puppeteer (headless false abre la ventana para verlo)
    const browser = await puppeteer.launch({headless: false});

    //Lanzamos el navegador
    const page = await browser.newPage();

    //Le decimos a qué web vamos
    await page.goto('https://www.amazon.es/');

    //Ponemos la vista tamaño pantalla
    await page.setViewport({width:1440, height:614});

    //Localizamos botón aceptar cookies y clickamos
    await page.click('#sp-cc-accept');

    //Localizamos y rellenamos el formulario
    await page.type('#twotabsearchtextbox', 'Star wars');

    //Clickamos en el botón de buscar
    await page.click('#nav-search-submit-button');

    //Esperamos a que aparezca el selector que queremos
    // await page.waitForSelector('.rush-component');

    // const urls = await page.evaluate( () => {
    //     const elements = document.querySelectorAll('.rush-component a')
    //     console.log('Voy por aquí')
        
    //     const links = [];
    //     for(let element of elements) {
    //         links.push(element.href);
    //         if (links.length === 5)
    //         break;
    //     }
    //     console.log('Esto son links', links)
    //     return links;
    // });
    
    // // console.log("Esto son enlaces", enlaces.length)
    // // const urls = enlaces.slice(0, 5);
    // console.log("Esto son urls", urls)
    // const ofertas = [];
    // for(let url of urls){
    //     await page.goto(url);
    //     await page.waitForSelector('h1');

    //     const oferta = await page.evaluate(()=>{
    //         const tmp = {};
    //         tmp.title = document.querySelector('h1').innerText;
    //         tmp.company = document.querySelector('h2').innerText;
    //         tmp.salary = document.querySelector('dd:nth-of-type(4n)').innerText;
    //         tmp.url = window.location.href;
    //         return tmp
    //     });
    //     ofertas.push(oferta);
    // }
    // console.log("Scrap Domestika conseguido!")
    // await browser.close();
    // console.log(ofertas)
    // return ofertas
};

scrap_Amazon()