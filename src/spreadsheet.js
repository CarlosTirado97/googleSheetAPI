const { GoogleSpreadsheet } = require('google-spreadsheet')

const credencials = require('./json/credenciales.json')

let googleID = "1P4YyaTYQtmqzZnbbsvIF6HXLMx3jbVRMlgnpEz84IYI"

async function accederGoogleSheet() {

    const documento = new GoogleSpreadsheet(googleID)
    await documento.useServiceAccountAuth(credencials)
    await documento.loadInfo()

    const sheet = documento.sheetsByIndex[0]
    const registros = await sheet.getRows()

    return registros
   
}

async function agregarASheet(info) {
    
    const documento = new GoogleSpreadsheet(googleID)
    await documento.useServiceAccountAuth(credencials)
    await documento.loadInfo()

    const sheet = documento.sheetsByIndex[0]
    
    let range = 'A2:C3'
    
    await sheet.loadCells(range)

    let rangoIndex = getArrayRanges(range)
    
    for (let x = 0; x < rangoIndex[1].length;x++) {
        for (let y = 0; y < rangoIndex[0].length;y++) {
            const cell = sheet.getCellByA1(`${abecedario[y]}${rangoIndex[1][x]}`)
            cell.value = Object.values(info[x])[y]
        }    
    }  
    
    await sheet.saveUpdatedCells() 
   
}


function getArrayRanges(range) {
    const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    
    let rangeparts = range.split(':')

    let LS = abecedario.indexOf(rangeparts[0][0])
    let SC = rangeparts[0][1]
    let LF = abecedario.indexOf(rangeparts[1][0])
    let FC = rangeparts[1][1]
    let rangoIndex = []

    for (let x = LS; x <= LF;x++ ) {
        if (!rangoIndex[0]) {
            rangoIndex[0] = []
        }
        rangoIndex[0].push(abecedario[x])
    }
    for (let x = SC; x <= FC;x++ ) {
        if (!rangoIndex[1]) {
            rangoIndex[1] = []
        }
        rangoIndex[1].push(x)
    }

    return rangoIndex
}


module.exports = {
    accederGoogleSheet,
    agregarASheet
}