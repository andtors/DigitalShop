const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const verifyToken = require('../helpers/verify-token')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/checkuser', verifyToken, UserController.getUser)
router.patch('/cart/addproduct', verifyToken, UserController.addProdToCart)
router.patch('/cart/removeproduct', verifyToken, UserController.removeProdCart)
router.patch('/:id', verifyToken, UserController.editUser)

module.exports = router