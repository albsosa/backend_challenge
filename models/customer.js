const { Schema, model } = require('mongoose')

const CustomerSchema = Schema({
  name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
  },
  lastName: {
      type: String,
      required: [true, 'El Apellido es obligatorio'],
      trim: true
  },
  email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true
  },
  password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
  },
  rol: {
      type: String,
      emun: ['SELLER', 'BUYER']
  },
  bestRated: {
    type: Number
},
  state: {
      type: Boolean,
      default: true
  },
})

CustomerSchema.methods.toJSON = function() {
    const { __v, password, _id, ...customer  } = this.toObject()
    customer.uid = _id
    return customer
}

module.exports = model( 'Customer', CustomerSchema )