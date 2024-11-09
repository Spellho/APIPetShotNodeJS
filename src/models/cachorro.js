const database = require('../config/database')

class ModelCachorro {
    constructor() {
        this.model = database.db.define('cachorro', {
             id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
             name: {
                type: database.db.Sequelize.STRING
            },
             race: {
                type: database.db.Sequelize.STRING,
            }
        })
    }
}

module.exports = new ModelCachorro().model