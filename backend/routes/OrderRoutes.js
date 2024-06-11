const expreess = require('express')
const router = expreess.Router()
const OrderController = require('../controllers/OrderController')

router.post('/create', OrderController.createOrder)
router.get('/', OrderController.getOrders)

module.exports = router