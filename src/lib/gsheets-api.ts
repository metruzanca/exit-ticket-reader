
export async function getSheet(sheetId: string, sheetTitle: string) {
    const apiUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}`;
    
    return fetch(apiUrl)
      .then(res => res.text()) // its not json
      .then(text => text.substring(47).slice(0,-2)) // Gets rid of weird wrapper
      .then(data => JSON.parse(data)) // Now we've got json
}