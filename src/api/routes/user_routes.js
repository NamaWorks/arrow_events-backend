const { isAuth } = require("../../middleware/auth");
const { upload, configCloudinary } = require("../../middleware/files-users.middleware");
const { isAdmin } = require("../../middleware/is-admin");
const { getUsers, userLogin, userSignUp, deleteUser, updateUser, getUserById } = require("../controllers/user_controller");

const userRouter = require("express").Router()
configCloudinary()

userRouter.get("/all", getUsers)
userRouter.get("/:id", getUserById)
userRouter.post("/new", upload.single('profilePicture'), userSignUp)
userRouter.post("/login", userLogin)
userRouter.put("/update/:id", [isAuth], upload.single('profilePicture'), updateUser)
userRouter.delete("/remove/:id", [isAuth], deleteUser)

module.exports = userRouter
