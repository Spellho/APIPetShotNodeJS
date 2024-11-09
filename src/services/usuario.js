const ModelUsuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT = 10

class ServiceUsuario {
    async GetUsuarios() {
        return ModelUsuario.findAll()
    }

    async CreateUsuario(email, password, role) {
        if(!email || !password || !role) {
            throw new Error("Todos os dados são obrigatórios!")
        }
        if(role > 1 || role < 0) {
            throw new Error("Role inválida")
        }
        const hashSenha = await bcrypt.hash(password, SALT)
        return ModelUsuario.create({ email, password: hashSenha, role})
    }

    async CreateUsuarioCliente(email, password) {
        if(!email || !password) {
            throw new Error("Todos os dados são obrigatórios!")
        }
        const hashSenha = await bcrypt.hash(password, SALT)
        return ModelUsuario.create({ email, password: hashSenha, role: 1})
    }

    async UpdateUsuario(id, email, password, role) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        const usuario = await ModelUsuario.findByPk(id)
        if(!usuario) {
            throw new Error("Usuario não encontrado")
        }
        usuario.email = email || usuario.email
        usuario.password = password? await bcrypt.hash(password, SALT) : usuario.password
        usuario.role = role || usuario.role

        usuario.save()
        return usuario
    }

    async UpdateUsuarioCliente(id, email, password) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        const usuario = await ModelUsuario.findByPk(id)
        if(!usuario) {
            throw new Error("Usuario não encontrado")
        }
        usuario.email = email || usuario.email
        usuario.password = password? await bcrypt.hash(password, SALT) : usuario.password

        usuario.save()
        return usuario
    }

    async DeleteUsuario(id) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        return ModelUsuario.destroy({ where: { id } })
    }

    async Login(email, password) {
        if(!email || !password) {
            throw new Error("Email ou senha inválido!")
        }

        const usuario = await ModelUsuario.findOne({ where: { email } })

        if(!usuario) {
            throw new Error("Email ou senha inválido!")
        }

        const senhaValida = bcrypt.compare(password, usuario.password)

        if(!senhaValida) {
            throw new Error("Email ou senha inválido!")
        }

        return jwt.sign({ id: usuario.id, }, 'segredo', { expiresIn: 60 * 60 })
    }
}

module.exports = new ServiceUsuario()