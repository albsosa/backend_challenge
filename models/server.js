const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app  = express()
        this.port = process.env.PORT

        this.paths = {
            customers:   '/api/customers',
            products:   '/api/products',
            orders: '/api/orders'
        }

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }


    middlewares() {

        // CORS
        this.app.use( cors() )

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio Público
        this.app.use( express.static('public') )

    }

    routes() {
        this.app.use( this.paths.customers, require('../routes/customers'))
        this.app.use( this.paths.products, require('../routes/products'))
        this.app.use( this.paths.orders, require('../routes/orders'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port )
        })
    }

}

module.exports = Server
