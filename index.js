/*
 * Name: Samuel Affolder
 * Date: 12/02/2021
 *
 * This is the JS for webscraping and formatting the US sub 4 list data.
 */
"use strict"

// Setting up the excel sheet to save the data to
const Excel= require("exceljs")
let workbook= new Excel.Workbook();
let worksheet= workbook.addWorksheet("sub4Data")
worksheet.columns = [
  {header: "NAME", key: "name"},
  {header: "TIME", key: "time"},
  {header: "CITY", key: "city"},
  {header: "DATE", key: "date"}
]

// Will hold all JSON data
let runData = [];

// For webscraping
const request= require("request-promise")
const cheerio= require("cheerio");

// Request the html from tnfn website
request("https://trackandfieldnews.com/u-s-sub-400-milers-club-chronologically/", (error, response, html) => {
    if(!error && response.statusCode==200) {
        const $= cheerio.load(html);
        // Parse through each row and split data to needed format
        $(".listline").each((i, data) => {
            const item= $(data).text();
            let rowData= item.split("\n");
            let athleteData= {name:rowData[1], time:rowData[2], city:rowData[3], date:rowData[4]};
            runData.push(athleteData);
        })
    }
    // Add the JSON data into the Excel file
    runData.forEach((e, index) => {
      worksheet.addRow({...e});
    });

    // Writes a new Excel file
    workbook.xlsx.writeFile("sub4Data.xlsx")
});