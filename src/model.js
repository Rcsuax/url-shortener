import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  _id :Number,
  "url": {
    type: String,
    required: true
  }
});

export default mongoose.model('Url',urlSchema);
