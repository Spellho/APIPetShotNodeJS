const express = require('express')
const ControllerCachorro = require('../controllers/cachorro')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', ControllerCachorro.CriarCachorro)
router.get('/', auth, ControllerCachorro.GetCachorros)
router.put('/:id', auth, ControllerCachorro.UpdateCachorro)
router.delete('/:id', auth, ControllerCachorro.DeleteCachorro)

module.exports = router