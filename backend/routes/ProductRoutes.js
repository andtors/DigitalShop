const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.post('/add', ProductController.addProduct)
router.delete('/delete', ProductController.removeProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)

module.exports = router