const Trial = require('../models/trial');
const Client = require('../models/client')
const SECRET = process.env.SECRET;


module.exports = {
  addClient,
  mintToken

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

async function mintToken(req, res) {

  try {
    const client = await Client.findOneAndUpdate({ walletAddress: req.body.wallet }, { $set: { mintToken: true, ipfs: req.body.url } }, { new: true })
    await client.save()
    console.log(client)
    return res.status(201).json({ msg: 'Token Minted for Client - Success' })
  } catch (err) {
    res.status(400).json(err)
  }
}
