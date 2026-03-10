import express from 'express';
import cors from 'cors';
import { debtDB, entryBookDB, mechDB, moneyDB } from './db/db.js';
import GetRoutes from './routes/GetdataRoute.js';
import AuthRoute from './routes/AuthRoute.js';

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);

debtDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Debtors:', err);
    } else {
        console.log('DB Connected to Debtors');
    }
});

mechDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Mechanic:', err);
    } else {
        console.log('DB Connected to Mechanic');
    }
});

moneyDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Money:', err);
    } else {
        console.log('DB Connected to Money');
    }
});

entryBookDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Entry Book:', err);
    } else {
        console.log('DB Connected to Entry Book');
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello App Tracking");
});

app.use('/api/auth', AuthRoute);
app.use('/api', GetRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});