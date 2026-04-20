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
    host:               process.env.Entry_DB_HOST,
    user:               process.env.Entry_DB_USER,
    password:           process.env.Entry_DB_PASSWORD,
    database:           process.env.Entry_DB_NAME,
    port:               parseInt(process.env.Entry_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});

export const danceStudioDB = mysql.createPool({
    host:               process.env.DanceStudio_DB_HOST,
    user:               process.env.DanceStudio_DB_USER,
    password:           process.env.DanceStudio_DB_PASSWORD,
    database:           process.env.DanceStudio_DB_NAME,
    port:               parseInt(process.env.DanceStudio_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
});

export const buddyWalkDB = mysql.createPool({
    host:               process.env.Buddywalk_DB_HOST,
    user:               process.env.Buddywalk_DB_USER,
    password:           process.env.Buddywalk_DB_PASSWORD,
    database:           process.env.Buddywalk_DB_NAME,
    port:               parseInt(process.env.Buddywalk_DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit:    10,
    connectTimeout:     30000,
    queueLimit:         0,
}); 