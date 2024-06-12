const mongoose = require('mongoose')
const dbConn = process.env.DB_CONNECT

async function main(){
    await mongoose.connect(`${dbConn}`)
    console.log('Conectou ao banco!')
}

main().catch((err) => console.log(err))

module.exports = mongoose