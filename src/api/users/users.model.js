import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('users', UsersSchema);