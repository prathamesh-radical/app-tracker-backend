import { rgMoneyLenderDB } from "../db/db.js";

export const Moneylender = async (req, res) => {
    try {
        rgMoneyLenderDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "moneylenders fetched successfully", success: true, moneylender: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MoneylenderUsersData = async (req, res) => {
    try {
        rgMoneyLenderDB.query("SELECT * FROM money_records", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "moneylenders users data fetched successfully", success: true, moneylenderlist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT 
    b.*,
    COUNT(DISTINCT u.id) as userCount
FROM banks b
LEFT JOIN users u ON b.id = u.bank_id
WHERE 
    b.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    OR 
    u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY b.id
ORDER BY b.created_at DESC
        `;

        rgMoneyLenderDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching active users count",
                    success: false
                });
            }

            res.status(200).json({
                message: "Active moneylenders count (Registration or User Activity) fetched successfully",
                success: true,
                moneylenderactiveCount: result,
                period: "Last 30 Days"
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const Moneylendersettings = async (req, res) => {
    try {
        rgMoneyLenderDB.query("SELECT * FROM app_settings", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "moneylenders settings fetched successfully", success: true, moneylendersettings: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};