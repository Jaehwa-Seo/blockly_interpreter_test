const mongoose  = require("mongoose")

const studiomanagerSchema = new mongoose.Schema({
  password: {
    type    : String,
    trim    : true,
    // required: true,
  },
  id: {
    type: String,
    unique   : true,
    trim: true,
    required : true,
  },
  email: {
    type: String,
    trim: true,
    required : true,
  },
  token: {
    type: [String],
  },
  _3d_model: {
    type: String,
  },
})

const StudioManager = mongoose.model("StudioManager", studiomanagerSchema)

module.exports = StudioManager