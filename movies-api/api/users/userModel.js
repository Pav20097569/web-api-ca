import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


// Password validation regex: at least 8 characters, 1 letter, 1 number, and 1 special character
const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: function(value) {
        return passwordValidator.test(value);  // Validate the password with regex
      },
      message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
    }
  }
});

// Pre-save hook to hash the password before saving it to the database
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
  }
  next();
});

// Method to compare entered password with the stored hashed password
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});


export default mongoose.model('User', UserSchema);
