import { email } from 'zod';
import type { PotModel, TransactionModel } from '../types/index.js';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

dotenv.config();

export const calculateBalance = (transactions: TransactionModel[], pots: PotModel[]) => {
  const income = transactions
    ? transactions.reduce((total: number, transaction: any) => {
        return total + (transaction.amount > 0 ? transaction.amount : 0);
      }, 0)
    : 0;

  const expenses = transactions
    ? transactions.reduce((total: number, transaction: any) => {
        return total + (transaction.amount <= 0 ? transaction.amount : 0);
      }, 0) * -1
    : 0;

  const moneyInPots = pots
    ? pots.reduce((total: number, pot: any) => {
        return total + pot.total;
      }, 0)
    : 0;

  return {
    income,
    expenses,
    current: income - expenses - moneyInPots,
  };
};

export const transFormExampleTransactions = (transactions: TransactionModel[]) => {
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

export const sendVerification = async (email: string, token?: string) => {
  // Create a transporter for SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  await transporter.verify();
  console.log('Server is ready to take our messages');

  const serverUrl = process.env.NODE_ENV === 'development' ? process.env.SERVER_URL_DEVELOPMENT : process.env.SERVER_URL_PRODUCTION;
  try {
    const info = await transporter.sendMail({
      from: 'budgetappforfree@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Budget app email verification', // Subject line
      text: 'Hello world?', // plain text body
      html: `<a href="${serverUrl}/verify-email?token=${token}">Click here to verify your email</a>`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('Error while sending mail', err);
  }
};
