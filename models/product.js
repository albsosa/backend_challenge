const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    }, 
    state: {
      type: Boolean,
      default: true,
      required: true
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    cost: {
      type: Number,
      default: 0
    },
    qualification: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
    },
    available: { type: Boolean, default: true }
})

ProductSchema.methods.toJSON = function() {
  const { __v, _id, state, ...data  } = this.toObject()
  data.uid = _id
  return data
}

module.exports = model( 'Product', ProductSchema )
