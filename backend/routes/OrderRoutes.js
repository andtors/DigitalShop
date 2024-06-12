const expreess = require('express')
const router = expreess.Router()
const OrderController = require('../controllers/OrderController')
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, OrderController.createOrder)
router.get('/', verifyToken, OrderController.getAllOrders)
router.get('/:id', verifyToken, OrderController.getOrderById)

module.exports = router