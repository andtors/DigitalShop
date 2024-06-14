import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ProductDetails.css'
import useFlashMessage from '../../hooks/useFlashMessage'

import api from '../../utils/api'

const ProductDetails = () => {

    const [product, setProduct] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const {id} = useParams()
  

    useEffect(() => {
        api.get(`/product/${id}`).then((response) => {
           setProduct(response.data.product)
      
        })
    
    }, [setProduct])
    
    const addProdToCart = async(productId) => {
      let msgText = 'Produto inserido no carrinho!'
      let msgType = 'success'

      const id = {
        productId
      }
      try {
       await api.patch('/user/cart/addproduct', id)
        
    } catch (error) {
        console.log(error.response.data.message)
        msgText = error.response.data.message
        msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
    }
  return (
   
    <div className='container-div'>
        <div className='image-div'>
        <img src={product.image} alt={product.name} />
        </div>
        <div className='other-infos'>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Categoria: {product.category}</p>
        <div className='price-btn'>
        <h2>R$ {product.price}</h2>
        <a className='btn-buy' onClick={(e) => addProdToCart(product._id)}>Comprar</a>
        </div>
        </div>
    </div>
  )
}

export default ProductDetails