import { moneyDB } from "../db/db.js";

export const Moneycollect = async (req, res) => {
    try {
        moneyDB.query("SELECT * FROM banks", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "moneycollects fetched successfully", success: true, moneycollect: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MoneycollectUsersData = async (req, res) => {
    try {
        moneyDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "moneycollects users data fetched successfully", success: true, moneycollectlist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT COUNT(DISTINCT b.id) as activeBankCount
            FROM banks b
            LEFT JOIN users u ON b.id = u.bank_id
            WHERE 
                b.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                OR 
                u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        moneyDB.query(query, (err, result) => {
            if (err) {
                console.error("Error fetching active money-collect statistics:", err);
                return res.status(500).json({ 
                    message: "Error fetching active users count", 
                    success: false 
                });
            }

            const count = result[0].activeBankCount;

            res.status(200).json({ 
                message: "Active banks count (Registration or User Activity) fetched successfully", 
                success: true, 
                smartactiveCount: count,
                period: "Last 30 Days"
            });
        });
    } catch (error) {
        console.error("Unexpected error in MoneyCollect engagement count:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};