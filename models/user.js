const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: 'player' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

// userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);
