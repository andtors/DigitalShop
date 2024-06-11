const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.post('/add', ProductController.addProduct)



module.exports = router