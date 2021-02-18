let googleSheet = require('../spreadsheet')

const obtenerData = async(req, res) => {
    registros = await googleSheet.accederGoogleSheet()

    res.render('index',{registros})
}

const formNuevo = (req, res) => {
    res.render('form')
}

const agregar = (req, res) => {
    const info = [
        { CVE: 1, Partida: 'CIMENTACION', Importe: 100.50 },
        { CVE: 2, Partida: 'PINTURA', Importe: 1540.50 }
    ]
    googleSheet.agregarASheet(info)
    res.redirect('/')
}

module.exports = {
    obtenerData,
    formNuevo,
    agregar
}