const express = require('express')
const ControllerUsuario = require('../controllers/usuario')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', ControllerUsuario.CreateUsuario)
router.post('/login', ControllerUsuario.Login)
router.get('/', auth, ControllerUsuario.GetUsuarios)
router.put('/:id', auth, ControllerUsuario.UpdateUsuario)
router.delete('/:id', auth, ControllerUsuario.DeleteUsuario)

module.exports = router