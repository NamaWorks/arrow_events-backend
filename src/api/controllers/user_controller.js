const { deleteImgCloudinary } = require("../../utils/delete_img_cloudinary");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user_model");
const bcrypt = require("bcrypt")



const getUsers = async (req, res, next) => {
  try {
    // const allUsers = await User.find()
    const allUsers = await User.find({active : true})
    return res.status(200).json(allUsers)
  } catch (err) {
    return res.status(400).json(`error at getUsers: ${err}`)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json(`error at geUserById: {err}`)
  }
}

const userLogin = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findOne({username: req.body.username})

      if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
          const token = generateSign(user._id)
          return res.status(200).json({user, token})
        } else {return res.status(400).json(`error at login`)}
      } else { return res.status(400).json(`error at login`)}

  } catch (err) {
    return res.status(400).json(`error at login: ${err}`)
  }
}

const userSignUp = async (req, res, next) => {
  try {
    const newUser = new User({
      ...req.body
    })
    if(req.file){
      newUser.profilePicture = req.file.path
  }
    const userDuplicated = await User.findOne({email:req.body.email})
    if(userDuplicated){return res.status(400).json(`that email is already in use`)}
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (err) {
    return res.status(400).json(`error at userSignup: ${err}`)
    
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userToDelete = await User.findById(id)
    if(userToDelete.profilePicture){await deleteImgCloudinary(userToDelete.profilePicture)}

    const userDeleted = await User.findByIdAndDelete(id)

    return res.status(200).json(userDeleted)
  } catch (err) {
    return res.status(400).json(`error at deleteUser: ${err}`)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const originalUser = await User.findById(id)
    if(originalUser.profilePicture){deleteImgCloudinary(originalUser.profilePicture)}
    
    console.log(req.body)

      const newUser = new User({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 10),
        profilePicture: req.body.profilePicture,
        active: req.body.active,
      })

      newUser._id = id
      if(req.file){newUser.profilePicture = req.file.path}
      const updatedUser = await User.findByIdAndUpdate(id, newUser, {new:true})
      return res.status(200).json(updatedUser)
    

  } catch (err) {
    return res.status(400).json(`error ar updateUser: ${err}`)
  }
}

module.exports = { getUsers, userLogin, userSignUp, deleteUser, updateUser, getUserById }