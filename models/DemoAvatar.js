const mongoose  = require("mongoose")

const demoAvatarSchema = new mongoose.Schema({
  _3d_model: {
    type: String,
  },
})

const DemoAvatar = mongoose.model("DemoAvatar", demoAvatarSchema)

module.exports = DemoAvatar