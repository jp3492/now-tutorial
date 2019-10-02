import auth from '../../api_services/auth'

module.exports = async (req, res) => {
  const user = await auth(req, res)
  res.json({ name: user })
}