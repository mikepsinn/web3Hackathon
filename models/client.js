const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Trial = require('../models/trial')



const SALT_ROUNDS = 6;

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientName: { type: String, lowercase: true, required: true },
  walletAddress: { type: String, required: true, unique: true },
  mintToken: { type: Boolean, default: false },
  ipfs: { type: String },
  trials: [{
    trialIdentification: { type: mongoose.Schema.Types.ObjectId, ref: 'Trial' },
    percentageCompleted: { type: Number },
  }]
}, {
  timestamps: true
});

clientSchema.set('toJSON', {
  transform: function (doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.name;
    return ret;
  }
});
/// in controller

// this is if you populate the user
clientSchema.set('toObject', {
  transform: (doc, ret, opt) => {
    delete ret.name;
    return ret;
  }
});


// DO NOT DEFINE instance methods with arrow functions, 
// they prevent the binding of this
clientSchema.pre('save', function (next) {
  const client = this;
  if (!client.isModified('name')) return next();
  bcrypt.hash(client.name, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    client.name = hash;
    next();
  });
});

clientSchema.methods.compareName = function (tryName, cb) {
  console.log(cb, ' this is cb')
  bcrypt.compare(tryName, this.name, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Client', clientSchema);
