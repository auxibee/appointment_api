const { generateToken } = require('../shared/utils/token');
const AuthService = require('./auth.service');

const Service = new AuthService();

async function newUserHandler(req, res) {
  const { email, password } = req.body;
  const user = await Service.createUser(email, password);
 
  res.status(201).json({ email : user.email, id: user.id });
}

async function loginHandler(req, res) {
  const { email, password } = req.body;
  const user = await Service.loginUser(email, password);
  const token = await generateToken(user.email)
  
  res.json({id:user.id, email: user.email, token });
}

module.exports = { newUserHandler, loginHandler };
