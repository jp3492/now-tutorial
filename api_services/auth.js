import Verifier from 'verify-cognito-token'

const User = require('../models/user')

const cognitoPool = "eu-central-1_dIWJ035GS"

const params = {
  region: 'eu-west-1',
  userPoolId: cognitoPool
}

const verifier = new Verifier(params);

export default async (req, res) => {
  const { accesstoken, cognitoid } = req.headers
  let verified
  try {
    verified = await verifier.verify(accesstoken)
  } catch (error) {
    res.status(400)
    return res.send({
      message: 'Couldnt verify accesstoken',
      error
    })
  }
  if (!verified) {
    res.status(401)
    res.send({ message: "You shall not pass - 'Gandalf'(long time ago)" })
  } else {
    try {
      const user = await User.findOne({ cognitoId: cognitoid })
      return user._id
    } catch (error) {
      res.status(404)
      res.send({
        error,
        message: "User not found in database"
      })
    }
  }
}