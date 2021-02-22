const { GoogleSpreadsheet } = require('google-spreadsheet')

const credencials = require('./json/credenciales.json')

let googleID = "1qQyellsaJpNPMT7yaVLXsy2-l79OU3sDGrgkI4L-wnc"

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
    
    let range = 'F7:F17' 
    
    await sheet.loadCells(range)
    const {ranges} = getRanges(range)

    if (ranges.SC < ranges.FC) {
        addToManyCells(sheet,range,info)
    } else {
        addToSingleCell(sheet,range,'Carlos Fernando Tirado Páez')
    }  
    
    await sheet.saveUpdatedCells() 
}

function addToManyCells(sheet,range,info) {
    let {rangoIndex} = getRanges(range)
    
    for (let x = 0; x < rangoIndex[1].length;x++) {
        for (let y = 0; y < rangoIndex[0].length; y++) {
            const cell = sheet.getCellByA1(`${rangoIndex[0][y]}${rangoIndex[1][x]}`)
            cell.value = Object.values(info[x])[y]
        }    
    }
}

function addToSingleCell(sheet,singleCell,value) {
    const cell = sheet.getCellByA1(singleCell)
    cell.value = value
}

function getRanges(range) {
    const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];

    let rangeparts = range.split(':')
    let LS = abecedario.indexOf(rangeparts[0][0])
    let SC = Number(rangeparts[0].slice(1,rangeparts[0].length))
    let LF = abecedario.indexOf(rangeparts[1][0])
    let FC = Number(rangeparts[1].slice(1, rangeparts[1].length))

    let ranges = {LS,SC,LF,FC}

    let rangoIndex = getArrayRanges(ranges,abecedario)
    
    return {ranges,rangoIndex}
}

function getArrayRanges({LS,SC,LF,FC},abecedario) {
    //const abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z"];
    
    let rangoIndex = []

    for (let x = LS; x <= LF;x++ ) {
        if (!rangoIndex[0]) {
            rangoIndex[0] = []
        }
        rangoIndex[0].push(abecedario[x])
    }
    for (let x = SC; x <= FC;x++) {
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