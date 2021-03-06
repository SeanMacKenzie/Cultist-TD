var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var ObjectId = mongoose.SchemaTypes.ObjectId
const SALT_FACTOR = 10


var schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() },
    currentLevel: { type: Number, default: 1 }
    // in this schema we will need some parameters that will allow us to keep track of how they peformed or what level they have progressed to
})

schema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    }
  });
});

schema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err || !isMatch) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  })
};

module.exports = mongoose.model('User', schema)