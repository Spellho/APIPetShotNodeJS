const ServiceCachorro = require('../services/cachorro')

class ControllerCachorro {
    async GetCachorros(req, res) {
        try {
            const cachorros = await ServiceCachorro.GetCachorros()
            res.send({msg:cachorros})
        } catch(error) {
            res.status(500).send({msg:error.message})
        }
    }

    async CriarCachorro(req, res) {
        try {
            const name = req.body.name
            const race = req.body.race
            const cachorro = await ServiceCachorro.CriarCachorro(name, race)
            res.send({msg:cachorro})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async UpdateCachorro(req, res) {
        try {
            const id = req.params.id
            const name = req.body.name
            const race = req.body.race
            const cachorro = await ServiceCachorro.UpdateCachorro(id, name, race)
            res.send({msg:cachorro})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async DeleteCachorro(req, res) {
        try {
            const id = req.params.id
            const cachorro = await ServiceCachorro.DeleteCachorro(id)
            res.status(204).send({msg:cachorro})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }
}

module.exports = new ControllerCachorro()