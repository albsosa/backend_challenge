const mongoose = require('mongoose')
const dbConnection = async() => {
    try {
        mongoose.set('strictQuery', true)  
        await mongoose.connect( process.env.MONGODB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        console.log('online database')
    } catch (error) {
        console.log(error)
        throw new Error('Error when starting the database')
    }
}

module.exports = {
    dbConnection
}
