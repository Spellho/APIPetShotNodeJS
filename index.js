const express = require('express')
const routerCachorro = require('./src/routers/cachorro')
const routerCliente = require('./src/routers/cliente')
const routerUsuario = require('./src/routers/usuario')

const database = require('./src/config/database')

const app = express()
app.use(express.json())
app.use("/cachorro", routerCachorro)
app.use("/cliente", routerCliente)
app.use("/usuario", routerUsuario)

const PORT = 3000

database.db
    .sync({ force: true })
    .then((_) => {
        console.info("Banco conectado com sucesso")
        app.listen(PORT, () => {
            console.info(`Servidor rodando na porta ${PORT}`)
        })
    })
    .catch((e) => {
        console.error(`Conexão falhou: ${e}`)
    })