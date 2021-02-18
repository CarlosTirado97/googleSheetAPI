const router = require('express').Router()

const {
    obtenerData,
    formNuevo,
    agregar
} = require('../controllers/google.controller')

router.get('/', obtenerData)
router.get('/form', formNuevo)
router.post('/agregar',agregar)

module.exports = router