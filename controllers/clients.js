const User = require('../models/user');
const Client = require('../models/client')
const SECRET = process.env.SECRET;


module.exports = {
  addClient,

};

async function addClient(req, res) {
  console.log(req.body)
  const client = new Client(req.body);
  try {
    await Client.findByIdAndUpdate(client._id, { user: req.user._id })
    await client.save();
    res.status(201).json({ msg: 'client added successfully' });
  } catch (err) {
    console.log('catch error', err)
    return res.status(400).json(err);
  }
}
