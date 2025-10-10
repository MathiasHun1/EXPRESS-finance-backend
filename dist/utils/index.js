import { email } from 'zod';
import dotenv from 'dotenv';
import { Resend } from 'resend';
dotenv.config();
export const calculateBalance = (transactions, pots) => {
    const income = transactions
        ? transactions.reduce((total, transaction) => {
            return total + (transaction.amount > 0 ? transaction.amount : 0);
        }, 0)
        : 0;
    const expenses = transactions
        ? transactions.reduce((total, transaction) => {
            return total + (transaction.amount <= 0 ? transaction.amount : 0);
        }, 0) * -1
        : 0;
    const moneyInPots = pots
        ? pots.reduce((total, pot) => {
            return total + pot.total;
        }, 0)
        : 0;
    return {
        income,
        expenses,
        current: income - expenses - moneyInPots,
    };
};
export const transFormExampleTransactions = (transactions) => {
    return transactions.map((tr) => {
        const month = new Date(tr.date).getMonth();
        const currentMonth = new Date().getMonth();
        if (month === 7) {
            const newDate = new Date(tr.date);
            newDate.setMonth(currentMonth);
            return {
                ...tr,
                date: newDate,
            };
        }
        return tr;
    });
};
export const sendVerification = async (email, token) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const serverUrl = process.env.NODE_ENV === 'development' ? process.env.SERVER_URL_DEVELOPMENT : process.env.SERVER_URL_PRODUCTION;
    console.log('Runs from function body');
    try {
        console.log('Before send');
        const response = await resend.emails.send({
            from: 'budgetappforfree@gmail.com', // or a verified sender like you@yourdomain.com
            to: email,
            subject: 'Verify your email',
            html: `<a href="${serverUrl}/verify-email?token=${token}">Click here to verify your email</a>`,
        });
        console.log('after send: ', response);
        console.log('✅ Verification email sent:', email);
    }
    catch (err) {
        console.error('❌ Email send failed:', err);
    }
};
//# sourceMappingURL=index.js.map