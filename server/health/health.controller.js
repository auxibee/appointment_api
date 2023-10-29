async function checkApiHealth(req, res) {
  res.json({ message: 'working....' });
}

module.exports = { checkApiHealth };
