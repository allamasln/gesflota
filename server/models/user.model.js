const constants = require('../constants');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Nombre de usuario requerido',
    unique: true
  },
  password: {
    type: String,
    required: 'Password requerida',
  },
  nif: {
    type: String,
    required: 'Identificación del propietario requerida',
  },
  phone: {
    type: String,
    required: 'Teléfono requerido',
  },
  role: {
    type: String,
    enum: [constants.ROLE_VEHICLE_OWNER, constants.MECHANIC],
    default: constants.ROLE_VEHICLE_OWNER
  }
}, { timestamps: true });


userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret.password;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
  }
};


userSchema.pre('save', function(next) {
  
  if (this.isModified('password')) {
    console.log("holass");
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
