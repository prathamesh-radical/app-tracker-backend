import express from 'express';
import cors from 'cors';
import { buddyWalkDB, danceStudioDB, debtDB, entryBookDB, mechDB, moneyDB } from './db/db.js';
import AuthRoute from './routes/AuthRoute.js';
import DebtDataRoute from './routes/DebtDataRoute.js';
import GetMechanicRoute from './routes/MechanicDataRoute.js';
import GetMoneyCollectRoute from './routes/MoneyCollectDataRoute.js';
import GetGuestEntryRoute from './routes/GuestEntryDataRoute.js';
import GetDanceStudioRoute from './routes/DanceStudioDataRoute.js';
import GetBuddyWalkRoute from './routes/BuddyWalkDataRoute.js';

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

danceStudioDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Dance Studio:', err);
    } else {
        console.log('DB Connected to Dance Studio');
    }
});

buddyWalkDB.getConnection((err) => {
    if (err) {
        console.log('DB Connection Failed for Buddy Walk:', err);
    } else {
        console.log('DB Connected to Buddy Walk');
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello App Tracking");
});

app.use('/api/auth', AuthRoute);
app.use('/api', DebtDataRoute);
app.use('/api', GetMechanicRoute);
app.use('/api', GetMoneyCollectRoute);
app.use('/api', GetGuestEntryRoute);
app.use('/api', GetDanceStudioRoute);
app.use('/api', GetBuddyWalkRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});