/*
 * Name: Samuel Affolder
 * Date: 12/02/2021
 *
 * This is the JS for webscraping and formatting the US sub 4 list data.
 */
const request= require("request-promise")
const cheerio= require("cheerio");

request("https://trackandfieldnews.com/u-s-sub-400-milers-club-chronologically/", (error, response, html) => {
    if(!error && response.statusCode==200) {
        const $= cheerio.load(html);

        const datarow= $(".listline");
        const output= datarow.find("td").text();
        $(".listline").each((i, data) => {
          // Need to add in where I will save this data test
            const item= $(data).text();
            console.log(item);
        })
    }

});