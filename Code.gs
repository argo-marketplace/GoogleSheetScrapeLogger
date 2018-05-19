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
