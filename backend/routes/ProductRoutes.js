const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const verifyToken = require('../helpers/verify-token')


router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.post('/add', verifyToken, ProductController.addProduct)
router.delete('/delete', verifyToken, ProductController.removeProduct)
router.patch('/:id', verifyToken, ProductController.editProduct)

module.exports = router