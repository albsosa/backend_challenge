const { Schema, model } = require('mongoose')

const OrderSchema = Schema({
    customer: {
        type: Schema.ObjectId,
        ref: 'Customer'
    }, 
    products: [{
      product: {
        type: Schema.ObjectId,
        ref: 'Product'
      },
      amount: Number
    }],
    total: {
      type: Number
    },
    status: {
      type: String,
      required: true,
      emun: ['CREATED', 'SENT', 'CANCELLED', 'DELIVERED']
    },
    state: {
      type: Boolean,
      default: true,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date().toISOString()
    },
    deliveryDate: {
      type: Date
    }
})

OrderSchema.methods.toJSON = function() {
  const { __v, _id, ...data  } = this.toObject()
  data.uid = _id
  return data
}

module.exports = model( 'Order', OrderSchema )
