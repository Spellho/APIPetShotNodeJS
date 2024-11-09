const database = require('../config/database')

class ModelCliente {
    constructor() {
        this.model = database.db.define('cliente', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idusuario: {
                type: database.db.Sequelize.INTEGER,
                unique: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            phone: {
                type: database.db.Sequelize.STRING,
                unique: true
            }
        })
    }
}

module.exports = new ModelCliente().model