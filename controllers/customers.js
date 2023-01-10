const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const { Customer } = require('../models')

const customersGet = async(req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query
  const query = { state: true }

  const [ total, customers ] = await Promise.all([
    Customer.countDocuments(query),
      Customer.find(query)
          .skip( Number( from ) )
          .limit(Number( limit ))
  ])

  res.json({
      total,
      customers
  })
}

const customersBestRated = async (req = request, res = response) => {
  const query = { state: true, rol: 'SELLER' }

  const customer = await Customer.findOne(query).sort( { bestRated: -1 } )
  
  res.json(customer)
}

const customersPut = async(req, res = response) => {

  const { id } = req.params
  const { _id, password, email, ...leftover } = req.body

  if ( password ) {
      const salt = bcryptjs.genSaltSync()
      leftover.password = bcryptjs.hashSync( password, salt )
  }

  const customer = await Customer.findByIdAndUpdate( id, leftover )

  res.json(customer)
}

const customersPost = async(req, res = response) => {
  const { name, lastName, email, password, rol, bestRated } = req.body
  const customer = new Customer({ name, lastName, email, password, rol, bestRated })
  const salt = bcryptjs.genSaltSync()
  customer.password = bcryptjs.hashSync( password, salt )
  await customer.save()

  res.json({
    customer
  })
}

const customersDelete = async(req, res = response) => {
  const { id } = req.params
  const customer = await Customer.findByIdAndUpdate( id, { state: false } )
  res.json({customer})
}

module.exports = {
  customersGet,
  customersBestRated,
  customersPut,
  customersPost,
  customersDelete
}  