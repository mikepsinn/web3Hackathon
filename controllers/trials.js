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
    // console.log(trial.clients[0])
    let clients = trial.clients.map(async (client) => {
        await Client.findById(client).lean()
    })
    console.log(clients)

    res.status(200).json('yay')
}

//     console.log('-------------->', clients)

//     console.log(trial)
//     res.json('yay')
// }