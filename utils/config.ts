import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

let MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_URI_TEST;
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_URI_DEVELOPMENT;
} else if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.MONGODB_URI_PRODUCTION;
} else {
  throw new Error('no node environment defined');
}

export default {
  PORT,
  MONGODB_URI,
};
