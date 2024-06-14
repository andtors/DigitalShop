import './CartDetails.css'
import api from '../../utils/api'
import { useState, useEffect } from 'react'
import useFlashMessage from '../../hooks/useFlashMessage'
import { Link } from 'react-router-dom'

const CartDetails = () => {

    const [cart, setCart] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const [arrayPrices, setArrayPrices] = useState([])

    async function removeProdCart(productId) {
        let msgText = 'Produto removido do carrinho!'
        let msgType = 'success'

        const id = {
            productId
        }

        try {
            await api.patch('/user/cart/removeproduct', id)

        } catch (error) {
            console.log(error)
            msgText = error
            msgType = 'error'

            setFlashMessage(msgText, msgType)
        }
        return
    }

    async function makeOrder() {
        let msgText = 'Ordem criada com sucesso!'
        let msgType = 'success'

        try {
            await api.post('/order/create')

        } catch (error) {
            console.log(error)
            msgText = error
            msgType = 'error'

            setFlashMessage(msgText, msgType)
        }


        return
    }

    useEffect(() => {
        api.get('/user/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setCart(response.data.cart)
            response.data.cart.map((p) => {
                setArrayPrices(p.price)
            })
        })


    }, [token, removeProdCart])



    return (
        <div className='div-of-body'>

            <h1>Confira os produtos no seu carrinho:</h1>
            {cart.length > 0 ? (
                cart.map((product) => (
                    <div>
                        <div className='cart-product' key={product._id}>
                            <div className='image-other-infos'>
                                <div className='cart-image'>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className='product-name-price'>
                                    <h2 >
                                        {product.name}
                                    </h2>
                                    <Link to={`/product/${product._id}`}>Ver mais detalhes do produto</Link>
                                    <p>R$ {product.price}</p>

                                </div>
                            </div>

                            <div className='div-btn'>
                                <a className='btn-remove-prod' onClick={(e) => removeProdCart(product._id)}>Remover</a>
                            </div>
                        </div>

                    </div>
                ))) : (
                <h2>Não há nenhum produto em seu carrinho</h2>
            )}
            {cart.length > 0 ? (
                <div className='div-order-btn'>
                    <Link to="/orders" className='order-btn' onClick={(e) => makeOrder()}>Finalizar compra!</Link>
                </div>
            ) : (
                <></>
            )}

        </div>

    )
}

export default CartDetails