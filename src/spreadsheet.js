import { googleSettings } from "./config"

function getISOdate() {
  let oDate = new Date()  // new Date(2021, 3, 1) ---> testing for the foreach() loop below
  return oDate.getUTCFullYear()+'-'+String(oDate.getUTCMonth()+1).padStart(2, '0')+'-'+String(oDate.getUTCDate()).padStart(2, '0')
}

function convertDate(dInput) {
  let aDate = dInput.split('-')
  return aDate[2]+'.'+aDate[1]+'.'+aDate[0]
}

export function load(callback) { // load the events from the spreadsheet
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: googleSettings.spreadsheetId,
        range: "Sheet1!A2:T",                // Sheet1!A2 ---> first row A1 contains the column names; all filled cells below with "T"!
        valueRenderOption: "FORMATTED_VALUE" // important, see https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption
      })
      .then(
        response => {
          const data = response.result.values
          let events = []
          let currentDate = getISOdate()

          data.forEach(function(event, index, array) {
            if (event[3] > currentDate) {
              events.push(
                {
                  lcid: event[0].padStart(6, "0"), // leading zeros could/will be ignored in the sheet, but we need it!
                  locationName: event[1],
                  language: event[2],
                  date: event[3],
                  time: event[4],
                  formatedDate: convertDate(event[3])
                }
              )
            }
          })
          callback({
            events
          })
        },
        response => {
          callback(false, response.result.error)
        }
      )
  })
}
