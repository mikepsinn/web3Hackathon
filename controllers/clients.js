const Trial = require('../models/trial');
const Client = require('../models/client')
const SECRET = process.env.SECRET;


module.exports = {
  addClient,
  mintToken,
  checkPayment,
  transferFunds

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

async function checkPayment(req, res) {
  try {
    const client = await Client.findById(req.body._id)
    if (client.paid == true) {
      return res.status(200).json({ paid: true })
    } else if (client.paid == false) {
      return res.status(200).json({ paid: false })
    } else {
      return res.status(201).json({ paid: undefined })
    }
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

async function transferFunds(req, res) {
  try {
    const client = await Client.findByIdAndUpdate(req.body._id, { $set: { paid: true } }, { new: true })
    await client.save()
    return res.status(200).json({ nsg: 'Funds Sent' })
  } catch (err) {
    console.log('error', err)
    res.status(400).json({ msg: 'failed to update client in DB' })
  }
}