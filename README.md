
# GoogleSheetScrapeLogger
A dirt simple way to scrape and log data using Google Sheets


1. Use GoogleSheet's IMPORT* functions to import some data into a Google Sheet.

For this example, I am importing views from a Youtube video.

`=value(REGEXREPLACE(text(importxml("https://www.youtube.com/watch?v=OnNM51QWrWA","//*[contains(@class, 'watch-view-count')]"),0)," view(s)?",""))`

|FunctionName|Description|
|--|--|
| IMPORTXML`IMPORTXML(url, xpath_query)` | Imports data from any of various structured data types including XML, HTML, CSV, TSV, and RSS and ATOM XML feeds. [Learn more](https://support.google.com/docs/answer/3093342) |
| IMPORTHTML`IMPORTHTML(url, query, index)` | Imports data from a table or list within an HTML page.  [Learn more](https://support.google.com/docs/answer/3093339) |
| IMPORTFEED`IMPORTFEED(url, [query], [headers], [num_items])`| Imports a RSS or ATOM feed.  [Learn more](https://support.google.com/docs/answer/3093337) |
| IMPORTDATA`IMPORTDATA(url)`| Imports data at a given url in .csv (comma-separated value) or .tsv (tab-separated value) format.  [Learn more](https://support.google.com/docs/answer/3093335) |
| IMPORTRANGE`IMPORTRANGE(spreadsheet_url, range_string)`| Imports a range of cells from a specified spreadsheet.  [Learn more](https://support.google.com/docs/answer/3093340) |

2.  Create a new Tab on your sheet - Leave it named as `Sheet2`
3.  Go to Tools > Script-Editor
4.  Replace the default code in Code.gs with the below. This copies data from `Sheet1` to `Sheet2`

```
function copyRange() 
{
  var ss = SpreadsheetApp.getActive()
  var now = new Date();
  var timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  var mysheet = ss.getSheetByName('Sheet2') // default Tab Name
  ss.setActiveSheet(mysheet);
  var lastRow=ss.getLastRow()
  Logger.log(lastRow)
  var lastCol=ss.getLastColumn()
  Logger.log(lastCol)
  var data = ss.getSheetByName('Sheet1').getRange('A1').getValues() // default Tab Name
  // This formats the date as Greenwich Mean Time in the format
  // year-month-dateThour-minute-second.
  var formattedDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd'T'HH:mm:ss");
  Logger.log(formattedDate);
  Logger.log(data)
  ss.getSheetByName('Sheet2').appendRow([formattedDate,data[0][0]]) // Enters Current Date/Time and the Current Value from Sheet1

}
```

5. Name the Script >> Save the script (`floppy disk` menu icon) >> Run the Script (`play menu` icon) >> Accept all permissions.

6. Configure Triggers to run this script as per some schedule.
![image](https://user-images.githubusercontent.com/4397663/40270559-c1465200-5b4c-11e8-9ea4-47ab002f30ac.png)


7. FIN. Use [datastudio.google.com](http://datastudio.google.com) to create charts and dashboards for your data stream.

![image](https://user-images.githubusercontent.com/4397663/40270697-19602a4a-5b4f-11e8-8a52-717f180fa318.png)

