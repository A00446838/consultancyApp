import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const userSchema = new mongoose.Schema({
  index: {type: String, index: true, default: uuidv4},
  email: { type: String, unique: true, lowercase: true, trim: true },
  isVerified: { type: Boolean, default: false },
  password: String,
  role: String,
  isDeleted: { type: Boolean, default: false },
  lastLoginTime: Date,
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
