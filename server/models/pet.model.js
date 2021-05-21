const mongoose = require('mongoose');


const PetSchema = new mongoose.Schema({
  name: {
    type: String, unique: true,
    required: [ true, "Name is required." ],
    minlength: [ 3, "Name must be a minimum of 3 characters." ]
  },
  
  type: {
    type: String,
    required: [ true, "Type is required." ],
    minlength: [ 3, "Type must be a minimum of 3 characters." ]
  },

  desc: {
    type: String,
    required: [ true, "Description is required." ],
    minlength: [ 3, "Description must be a minimum of 3 characters." ]
  },

  skill1: {
    type: String,
  },

  skill2: {
    type: String,
  },

  skill3: {
    type: String,
  },

  likes: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });


module.exports = mongoose.model("Pet", PetSchema);