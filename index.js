import express from 'express';
import cors from 'cors';
import { buddyWalkDB, danceStudioDB, debtDB, entryBookDB, mechDB, moneyDB } from './db/db.js';
import AuthRoute from './routes/AuthRoute.js';
import GetMechanicRoute from './routes/MechanicDataRoute.js';
import GetMoneyCollectRoute from './routes/MoneyCollectDataRoute.js';
import GetGuestEntryRoute from './routes/GuestEntryDataRoute.js';
import GetDanceStudioRoute from './routes/DanceStudioDataRoute.js';
import GetBuddyWalkRoute from './routes/BuddyWalkDataRoute.js';
import GetDebtDataRoute from './routes/DebtDataRoute.js';

const app = express();
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "3000", 10);

const dbPools = [
    { name: 'Mechanic', pool: mechDB },
    { name: 'Debtors', pool: debtDB },
    { name: 'Money', pool: moneyDB },
    { name: 'Entry Book', pool: entryBookDB },
    { name: 'Dance Studio', pool: danceStudioDB },
    { name: 'Buddy Walk', pool: buddyWalkDB }
];

const checkConnections = async () => {
    const results = await Promise.allSettled(
        dbPools.map(db => 
            db.pool.promise().getConnection()
                .then(conn => {
                    conn.release();
                    return { name: db.name, status: 'success' };
                })
                .catch(err => {
                    throw { name: db.name, error: err.message };
                })
        )
    );

    const errors = results
        .filter(r => r.status === 'rejected')
        .map(r => `${r.reason.name}: ${r.reason.error}`);

    if (errors.length === 0) {
        console.log('✅ All DB Connected Successfully');
    } else {
        console.log('❌ DB Connection Issues Found:');
        errors.forEach(err => console.error(`   - ${err}`));
    }
};

checkConnections();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello App Tracking");
});

app.use('/api/auth', AuthRoute);
app.use('/api', GetDebtDataRoute);
app.use('/api', GetMechanicRoute);
app.use('/api', GetMoneyCollectRoute);
app.use('/api', GetGuestEntryRoute);
app.use('/api', GetDanceStudioRoute);
app.use('/api', GetBuddyWalkRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});