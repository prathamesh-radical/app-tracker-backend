import mysql from 'mysql2';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

dns.setDefaultResultOrder('ipv4first');

export const mechDB = mysql.createPool({
    host:               process.env.MECH_DB_HOST,
    user:               process.env.MECH_DB_USER,
    password:           process.env.MECH_DB_PASSWORD,
    database:           process.env.MECH_DB_NAME,
    port:               parseInt(process.env.MECH_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});

export const debtDB = mysql.createPool({
    host:               process.env.DEBT_DB_HOST,
    user:               process.env.DEBT_DB_USER,
    password:           process.env.DEBT_DB_PASSWORD,
    database:           process.env.DEBT_DB_NAME,
    port:               parseInt(process.env.DEBT_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});

export const moneyDB = mysql.createPool({
    host:               process.env.MONEY_DB_HOST,
    user:               process.env.MONEY_DB_USER,
    password:           process.env.MONEY_DB_PASSWORD,
    database:           process.env.MONEY_DB_NAME,
    port:               parseInt(process.env.MONEY_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});

export const entryBookDB = mysql.createPool({
    host:               process.env.DB_HOST,
    user:               process.env.DB_USER,
    password:           process.env.DB_PASSWORD,
    database:           process.env.DB_NAME,
    port:               parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});