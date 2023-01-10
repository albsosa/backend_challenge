const { response } = require("express")
const { Product, Order } = require("../models")


const productsGet = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query
  const query = { state : true }
  
  const [ total, products ] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
        .populate('customer', 'name')
        .skip( Number( from ) )
        .limit(Number( limit ))
        
])

res.json({
    total,
    products
})
}

const productHighOrLow = async (req, res = response) => {
  const query = { state : true }
  const { get = 'high' } = req.query
  
  const [ products ] = await Promise.all([
    Product.find(query)
        .sort({'qualification': get=== 'high'? -1 : 1})
        .limit(1)
        
])

res.json({
  products
})
}

const productBestSelling = async (req, res = response) => {
  const { id } = req.params
  const orders = await Order.aggregate(
    [
        { 
            $unwind : "$products"
        },
        { 
          $project : {
              "id_product" : "$products.product", 
              "amount" : "$products.amount"
          }
        },  
        { 
          $group : { 
              "_id" : "$id_product", 
              "count" : { 
                  "$sum" : "$amount"
              }
          }
        },
        { 
          $sort : { 
            "count" : -1
          }
        },
        { $limit : 1 }
    ]
)
  product = await Product.findById(orders[0]._id).populate('customer', 'name')
  res.json(product)
}

const productGet = async (req, res = response) => {
  const { id } = req.params
  const product = await Product.findById(id).populate('customer', 'name')
  res.json(product)
}

const productPost = async(req, res = response) => {
  const {state,  ...body } = req.body
  const productDB = await Product.findOne({ name: body.name })
  if(productDB) return res.status(409).json({ message: `El producto ${productDB?.name} ya existe...`})
  const data = {
    ...body,
    name: body.name.toUpperCase(),
  }
  const product = new Product( data)
  await product.save()
  res.status(201).json({ message: 'Success', product })
}

const productPut = async( req, res = response ) => {
  const { id } = req.params
  const { state, ...data } = req.body
  if(data.name) data.name = data.name.toUpperCase()
  const product = await Product.findByIdAndUpdate(id, data, { new: true })
  res.json(product)
}

const productDelete = async( req, res = response ) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })
  res.json(product)

}


module.exports = {
  productsGet,
  productGet,
  productHighOrLow,
  productBestSelling,
  productPost,
  productPut,
  productDelete
}