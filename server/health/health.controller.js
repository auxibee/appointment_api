async function checkApiHealth(req, res) {
  res.json({ message: 'okay' });
}

module.exports = { checkApiHealth };
