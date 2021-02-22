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
        { CVE: 'Carlos Fernando Tirado Páez', PARTIDA: 'Carlos', IMPORTE: 100.50 },
        { CVE: 2, PARTIDA: 'Fernando', IMPORTE: 1540.50 }
    ]
    const singleInfo = 'Arre pues'
    googleSheet.agregarASheet(singleInfo)
    res.redirect('/')
}

module.exports = {
    obtenerData,
    formNuevo,
    agregar
}