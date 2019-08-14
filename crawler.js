const Crawler = require("crawler");

let validUrlRegex = new RegExp(/^http:\/\/www.wikizero.biz\/([\w#!:.?+=&%@!\-\/])*$/);

let getContent = (url, crawlCallback, callback) => {
    let c = new Crawler({
        maxConnections : 10,
        skipDuplicates: true,
        skipEventRequest: false,
        callback : (error, res, done) => {
            if(error){
                console.error(error);
            } else{
                let $ = res.$;

                try {
                    $('.noprint, .mw-jump-link, .metadata, .toccolours, .toc, .mw-editsection, img, #Ayrıca_bakınız, #Kaynak.C3.A7a, #Dış_bağlantılar, .references, .catlinks, noscript, .printfooter').remove();

                    $('#bodyContent a').each((i, elem) => {
                        let href = $(elem).attr('href');
                        let childUrl = url + href;
                        if (childUrl != url) {
                            if(validUrlRegex.test(childUrl)) {
                                c.queue(childUrl.replace(url, ''));
                            }
                            else{
                                console.error("Omit : " + childUrl);
                            }
                        }
                    });

                    crawlCallback(res.request.uri.href, res.body);
                }
                catch(err){
                    //console.error(err);
                }
            }
            done();
        }
    });

    if(url && url.length > 0) {
        c.queue(url);
    }

    c.on('drain', () => {
        callback();
    });
};

module.exports.getContent = getContent;