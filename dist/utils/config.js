import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI_PRODUCTION;
export default {
    PORT,
    MONGODB_URI,
};
//# sourceMappingURL=config.js.map