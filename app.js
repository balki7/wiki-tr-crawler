const fs = require("fs");
const cheerio = require("cheerio");
const crawler = require("./crawler");

let initialUrl = 'http://www.wikizero.biz/index.php?q=aHR0cHM6Ly90ci53aWtpcGVkaWEub3JnL3dpa2kvRWtvbm9taQ';

crawler.getContent(initialUrl, (url, body) => {
    if(body) {
        const $ = cheerio.load(body);
        let language = $('html').attr('lang');
        if('tr' == language) {
            $('#Galeri').parent().next().remove();
            $('#Galeri').parent().remove();
            $('#Ayrıca_bakınız').parent().next().remove();
            $('#Ayrıca_bakınız').parent().remove();
            $('#Dış_bağlantılar').parent().next().remove();
            $('#Dış_bağlantılar').parent().remove();
            $('#Kaynakça').parent().next().remove();
            $('#Kaynakça').parent().remove();
            $('#Notlar').parent().remove();
            $('.external, .dablink, .noprint, .mw-jump-link, .metadata, .toccolours, .toc, .mw-editsection, img, .navbox, .reflist, .references, .catlinks, noscript, .printfooter').remove();
            $('#siteSub').remove();

            if ($('#bodyContent').text()) {
                let title = $('title').text().replace(' - Vikipedi', '');
                fs.writeFile('./data/' + title, $('#bodyContent').text(), {encoding: 'utf8'}, () => {
                    console.info("Written to file : " + title);
                });
            }
        }
    }
}, () => {
    debugger;
});
