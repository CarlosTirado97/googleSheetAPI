const app = require('./app')

app.listen(3000, (err) => {
    if (err) return console.log(err)
    
    console.log('Servidor corriendo en el puerto 3000')
})