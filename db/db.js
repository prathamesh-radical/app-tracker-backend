import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const debtDB = mysql.createPool({
    host: process.env.DEBT_DB_HOST,
    user: process.env.DEBT_DB_USER,
    password: process.env.DEBT_DB_PASSWORD,
    database: process.env.DEBT_DB_NAME,
    port: process.env.DEBT_DB_PORT,
});

export const mechDB = mysql.createPool({
    host: process.env.MECH_DB_HOST,
    user: process.env.MECH_DB_USER,
    password: process.env.MECH_DB_PASSWORD,
    database: process.env.MECH_DB_NAME,
    port: process.env.MECH_DB_PORT,
});

export const moneyDB = mysql.createPool({
    host: process.env.MONEY_DB_HOST,
    user: process.env.MONEY_DB_USER,
    password: process.env.MONEY_DB_PASSWORD,
    database: process.env.MONEY_DB_NAME,
    port: process.env.MONEY_DB_PORT,
});

export const entryBookDB = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});