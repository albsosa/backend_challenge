const { Customer, Product} = require('../models')

const emailExists = async( email = '' ) => {

  const existsEmail = await Customer.findOne({ email })
  if ( existsEmail ) {
      throw new Error(`El correo: ${ email }, ya está registrado`)
  }
}

const existsUserById = async( id ) => {

  const existsCustomer = await Customer.findById(id)
  if ( !existsCustomer ) {
      throw new Error(`El id no existe ${ id }`)
  }
}

const productExists = async( id ) => {

  const productExists = await Product.findById(id)
  if ( !productExists) {
      throw new Error(`El id no existe ${ id }`)
  }
}

module.exports = {
  emailExists,
  existsUserById,
  productExists
}