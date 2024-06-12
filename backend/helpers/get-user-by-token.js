const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getToken = require('../helpers/get-token')

const getUserByToken = async(req) => {

    const token =  getToken(req)

    if(!token){
        return res.status(401).json({message: 'Acesso negado!'})
    }

    const decoded = jwt.verify(token, 'digitalshop')

    const userId = decoded.id

    const user = await User.findOne({_id: userId})

    return user
}

module.exports = getUserByToken