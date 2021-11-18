const Trial = require('../models/trial');
const Client = require('../models/client')
const SECRET = process.env.SECRET;


module.exports = {
  addClient,

};

async function addClient(req, res) {
  try {
    const client = await new Client({
      user: req.user._id,
      walletAddress: req.body.walletAddress,
      clientName: req.body.name,
    })
    await client.trials.push({
      trialIdentification: req.body.trialIdentification,
      percentageCompleted: req.body.percentageParticipated
    })
    await client.save();
    const trial = await Trial.findOne({ _id: req.body.trialIdentification })
    await trial.clients.push(client._id)
    await trial.save()
    res.status(201).json({ msg: 'client added successfully' });
  } catch (err) {
    console.log('catch error', err)
    return res.status(400).json(err);
  }
}
