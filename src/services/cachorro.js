const ModelCachorro = require('../models/cachorro')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class ServiceCachorro {
    async GetCachorros() {
        return ModelCachorro.findAll()
    }

    async CriarCachorro(name, race) {
        if(!name || !race) {
            throw new Error("Todos os dados são obrigatórios!")
        }
        return ModelCachorro.create({ name, race })
    }

    async UpdateCachorro(id, name, race) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        const cachorro = await ModelCachorro.findByPk(id)
        if(!cachorro) {
            throw new Error("Cachorro não encontrado")
        }
        cachorro.name = name || cachorro.name
        cachorro.race = race || cachorro.race

        cachorro.save()
        return cachorro
    }

    async DeleteCachorro(id) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        return ModelCachorro.destroy({ where: { id } })
    }
}

module.exports = new ServiceCachorro()