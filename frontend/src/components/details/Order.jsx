import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../../utils/api"

import './Order.css'

const Order = () => {

    const [order, setOrder] = useState({})
    const [products, setProducts] = useState([])
    const [address, setAddress] = useState("")
    const { id } = useParams()

    useEffect(() => {
        api.get('/order', id).then((response) => {
            setOrder(response.data.orders[`${id}`])
            setProducts(response.data.orders[`${id}`].user.product)
            setAddress(response.data.orders[`${id}`].user.address)
        })

    }, [])


    return (
        
            <div className="main-div-orderid">
                {order && (
                    <div key={order._id}>
                        <h2>Ordem n° {order._id}</h2>
                        <p>Endereço de entrega: <span>{address}</span></p>
                        <p>Data do pedido: <span>{order.createdAt}</span></p>
                        <p>Total: <span>R$ {order.totalprice}</span></p>
                        <h2>Produtos</h2>
                    </div>

                )}
                {products.length > 0 && (
                    products.map((p) => (
                        <div className="sub-main-div" key={p._id}>
                            <div className="div-price-name-image">
                                <div className="orderid-image">
                                    <img src={p.image} alt={p.name} />
                                </div>
                            </div>

                            <div className="orderid-name">
                                <p>{p.name}</p>
                            </div>
                            <div className="orderid-price">
                                <p>R$ {p.price}</p>
                            </div>
                        </div>

                    ))

                )}

            </div>
        
    )
}

export default Order