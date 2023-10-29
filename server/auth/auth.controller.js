const AuthService = require('./auth.service');

const Service = new AuthService();

async function newUserHandler(req, res) {
  const { email, password } = req.body;
  await Service.createUser(email, password);
  res.status(201).json({ message: 'created' });
}

module.exports = { newUserHandler };
