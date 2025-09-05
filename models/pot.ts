import mongoose from 'mongoose';

const potSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  theme: {
    type: String,
    required: true,
  },
});

const Pot = mongoose.model('Pot', potSchema);

export default Pot;
