const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    /*first_name: String,
    last_name: String,
    email: String,
    saldo: Boolean,
    role: String*/
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    saldo: {
      type:Boolean,
      required: true
    },
    role: {
      type: String,
      required: true
    }
    
})

module.exports = {
  userSchema
}