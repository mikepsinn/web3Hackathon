// const User = require('../models/user');
const Client = require('../models/client')
const Trial = require('../models/trial')
module.exports = {
    addTrial,
    getTrials,
    findClients

};

async function addTrial(req, res) {
    console.log(req.body)
    const trial = new Trial({ user: req.user._id, name: req.body.name });
    try {
        console.log(trial)
        await trial.save()
        res.status(201).json({ msg: 'trial added successfully' });
    } catch (err) {
        return res.status(400).json(err);
    }
}

async function getTrials(req, res) {
    const trials = await Trial.find({})
    try {
        res.status(200).json({ trials })
    } catch (err) {
        return res.status(400).json(err)
    }
}

async function findClients(req, res) {
    const trial = await Trial.findById(req.params.id)
    try {
        clients = await Client.find({ _id: { $in: trial.clients } })
        res.status(200).json({ clients })
    } catch (err) {
        return res.status(400).json(err)
    }
}
