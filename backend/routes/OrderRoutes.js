const expreess = require('express')
const router = expreess.Router()
const OrderController = require('../controllers/OrderController')

router.post('/create', OrderController.createOrder)
router.get('/', OrderController.getAllOrders)
router.get('/:id', OrderController.getOrderById)

module.exports = router