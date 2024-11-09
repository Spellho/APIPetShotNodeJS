const ServiceUsuario = require('../services/usuario')

class ControllerUsuario {
    async GetUsuarios(req, res) {
        try {
            const usuarios = await ServiceUsuario.GetUsuarios()
            res.send({msg:usuarios})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async CreateUsuario(req, res) {
        try {
            const { email, password, role } = req.body

            const usuario = await ServiceUsuario.CreateUsuario(email, password, role)
            res.send({msg:usuario})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async CreateUsuarioCliente(req, res) {
        try {
            const { email, password } = req.body

            const usuario = await ServiceUsuario.CreateUsuarioCliente(email, password)
            res.send({msg:usuario})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async UpdateUsuario(req, res) {
        try {
            const id = req.params.id
            const { email, password, role } = req.body
            const usuario = await ServiceUsuario.UpdateUsuario(id, email, password, role)
            res.send({msg:usuario})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async DeleteUsuario(req, res) {
        try {
            const id = req.params.id
            await ServiceUsuario.DeleteUsuario(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body
            const token = await ServiceUsuario.Login(email, password)
            res.status(200).send({token})
        } catch (error) {
            res.status(500).send({msg:error.message})
        }
    }
}

module.exports = new ControllerUsuario()