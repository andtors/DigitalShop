import './OrderDetails.css'
import { useState, useEffect } from 'react'
import api from '../../utils/api'
import { Link } from 'react-router-dom'


const OrderDetails = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const [orders, setOrders] = useState([])

    useEffect(() =>{
        api.get('/order').then((response) => {
            setOrders(response.data.orders)
        })

    }, [token])

    function getIndex(id) {
        return orders.findIndex(obj => obj._id === id)
    }
    
  return (
    <div className='order-main-div'>
        
        <h1>Confira suas ordens:</h1>
        <p>Clique no n° da ordem para ver os detalhes da compra</p>
        {orders.length > 0 ? (
           orders.map((order) => (
            <div className='div-order' key={order._id}>
                
                <div className='order-number'>
                    <p>Número da ordem: <Link to={`/order/${getIndex(order._id)}`}>{order._id}</Link></p>
                    <p>Data do pedido: <span>{order.createdAt}</span></p>
                </div>
                <div className='total-price'>
                    <p>Valor total: <span>R$ {order.totalprice}</span></p>  
                </div>
            </div>
           
           ))
        ) : (
            <>
            <h2>Não há ordens feitas até o momento</h2>
            </>
        )}
    </div>
  )
}

export default OrderDetails