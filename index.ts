import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const url = process.env.MONGODB_URI_DEV;
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('Server is running on PORT: ', PORT);
  console.log('Connecting to databas..');

  try {
    await mongoose.connect(url!);
    console.log('connected to mongoDb');
  } catch (error) {
    console.error(error);
  }
});
