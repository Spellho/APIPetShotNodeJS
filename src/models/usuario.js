const database = require('../config/database')

class ModelUsuario {
    constructor() {
        this.model = database.db.define('usuario', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: database.db.Sequelize.STRING,
                unique: true
            },
            password: {
                type: database.db.Sequelize.STRING
            },
            role: {
                type: database.db.Sequelize.INTEGER
            }
        })
    }
}

module.exports = new ModelUsuario().model