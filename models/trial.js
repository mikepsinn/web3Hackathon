const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    clients: Array,
    name: { type: String, lowercase: true, required: true, unique: true },
}, {
    timestamps: true
});


module.exports = mongoose.model('Trial', trialSchema);





// CLIENT

// {
//     user who created: id
//     walletAddress: 'string'
//     trials: [
//         {
//             trialName: ID,
//             percentageCompleted: 
//         }
//     ]
// }