const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const clientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, lowercase: true, required: true },
  walletAddress: { type: String, required: true, unique: true },
  percentageParticipated: { type: Number, reqiored: true }
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
  // 'this' will be set to the current document
  const client = this;
  // check to see if the user has been modified, if not proceed 
  // in the middleware chain
  if (!client.isModified('name')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(client.name, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    client.name = hash;
    next();
  });
});

clientSchema.methods.compareName = function (tryName, cb) {
  console.log(cb, ' this is cb')
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryName, this.name, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Client', clientSchema);
