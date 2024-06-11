const User = require("../api/models/user_model");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    !token ? res.status(400).json(`you are not authorised`) : console.log(`you are authorised`)

    const parsedToken = token.replace("Bearer ", "")
    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    user.password = null
    req.user = user
    next()

  } catch (err) {
    return res.status(400).json(`you are not authorised: ${err}`)
  }
}

module.exports = { isAuth }