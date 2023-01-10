const { response } = require("express")
const { Order } = require("../models")
const moment = require('moment')

const ordersGet = async (req, res = response) => {
  const { limit = 5, from = 0, status= '' } = req.query
  let query = ''
  if(status === 'OUTOFDATE') {    
    const today = moment()
    query = { state : true, $or: [{ status: "CREATED" }, { status: "SENT" }], $and: [{ deliveryDate: { $lt: today }  }] }
  }
  else if(status) query = { state : true, status }
  else query = { state : true }
  const [ total, orders ] = await Promise.all([
    Order.countDocuments(query),
    Order.find(query)
    .populate('customer', 'name')
    .populate({ path: 'products.product', model: 'Product'})
    .skip( Number( from ) )
    .limit(Number( limit ))
])

res.json({
  total,
  orders
})
}

const orderGet = async (req, res = response) => {
  const { id } = req.params
  const order = await Order.findById(id)
  .populate('customer', 'name')
  .populate({ path: 'products.product', model: 'Product'})
  res.json(order)
}


const ordersPost = async(req, res = response) => {
  const { ...body } = req.body
  // const orderDB = await Order.findOne({ name: body.name })
  // if(orderDB) return res.status(409).json({ message: `La orden ${orderDB?.name} ya existe...`})
  const data = {
    ...body,
    // name: body.name.toUpperCase(),
  }
  const order = new Order( data)
  await order.save()
  res.status(201).json({ message: 'Success', order })
}

const orderPut = async( req, res = response ) => {
  const { id } = req.params
  const { ...data } = req.body
  const order = await Order.findByIdAndUpdate(id, data, { new: true })
  res.json(order)
}

const orderDelete = async( req, res = response ) => {
  const { id } = req.params
  const order = await Order.findByIdAndUpdate(id, { state: false }, { new: true })
  res.json(order)

}



module.exports = {
  ordersGet,
  orderGet,
  orderPut, 
  ordersPost,
  orderDelete
}