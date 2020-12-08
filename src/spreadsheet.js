import config from "./config"

function convertDate(dInput) {
  let aDate = dInput.split('-')
  return aDate[2]+'.'+aDate[1]+'.'+aDate[0]
}

export function load(callback) { // load the events from the spreadsheet
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Sheet1!A2:T",                // Sheet1!A2 ---> first row A1 contains the column names; all filled cells below with "T"!
        valueRenderOption: "FORMATTED_VALUE" // important, see https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption
      })
      .then(
        response => {
          const data = response.result.values
          let events =
            data.map(event => ({
              lcid: event[0].padStart(6, "0"), // leading zeros could/will be ignored in the sheet, but we need it!
              locationName: event[1],
              language: event[2],
              date: event[3],
              time: event[4],
              formatedDate: convertDate(event[3])
            })) || []
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
