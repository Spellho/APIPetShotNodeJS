const ModelCliente = require('../models/cliente')
const usuario = require('./usuario')
const ServiceUsuario = require('./usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class ServiceCliente {
    async GetClientes() {
        return ModelCliente.findAll()
    }

    async CreateCliente(name, phone, email, password) {
        if(!name || !phone || !email || !password) {
            throw new Error("Todos os dados são obrigatórios!")
        }
        const usuario = await ServiceUsuario.CreateUsuarioCliente(email, password)
        const idusuario = usuario.id
        return ModelCliente.create({ name, phone, idusuario })
    }

    async UpdateCliente(id, name, phone, email, password) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        const cliente = await ModelCliente.findByPk(id)
        const usuario = await ServiceUsuario.UpdateUsuarioCliente(cliente.idusuario, email, password)
        if(!cliente) {
            throw new Error("Cliente não encontrado")
        }
        cliente.name = name || cliente.name
        cliente.phone = phone || cliente.phone

        cliente.save()
        return cliente
    }

    async DeleteCliente(id) {
        if(!id) {
            throw new Error("Favor informar o id")
        }
        const cliente = await ModelCliente.findByPk(id)
        ServiceUsuario.DeleteUsuario(cliente.id)
        return ModelCliente.destroy({ where: { id } })
    }
}

module.exports = new ServiceCliente()