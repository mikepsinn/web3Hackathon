const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN


module.exports = {
  signup,
  login
};

async function signup(req, res) {
  if (req.body.accessToken === ACCESS_TOKEN) {
    try {
      const user = new User(req.body);
      await user.save();
      const token = createJWT(user);
      res.status(200).json({ token });
    } catch (err) {
      console.log('catch error', err)
      if (err.keyPattern.employeeId) {
        return res.status(455).json();
      } else {
        return res.status(400).json()
      }
    }
  } else {
    return res.status(401).json({ err: 'access token invalid' })
  }
}

async function login(req, res) {
  console.log(req.body)
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({ err: 'bad credentials' });
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {

      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: 'bad credentials' });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: '24h' }
  );
}
