import mongoose from 'mongoose';
import type { PotModel } from '../types/index.js';

const potSchema = new mongoose.Schema<PotModel>({
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

potSchema.set('toJSON', {
  transform: (document, returnedObj: any) => {
    const id = returnedObj._id.toString();
    returnedObj.id = id;
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  },
});

const Pot = mongoose.model('Pot', potSchema);

export default Pot;
