import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const getTestToken = (username, userId) => {
    const payload = { username, userId };
    const token = jwt.sign(payload, process.env.JWT_KEY);
    return token;
};
//# sourceMappingURL=test_helpers.js.map