const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema(
  {
    username:{type: String, required: false, unique: true},
    email:{type:String, required: true, unique: true},
    password: {type: String, required: true},
    profilePicture:{type: String, required: false},
    role:{type: String, required: true, default:'user'},
    active: {type: Boolean, default: true}
    // attendingEvents:[{type: mongoose.Types.ObjectId, ref: 'events'}]
},{
  timestamps: true,
  collection: "users"
}
)

userSchema.pre("save", function(){
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model("users", userSchema, "users")

module.exports = User