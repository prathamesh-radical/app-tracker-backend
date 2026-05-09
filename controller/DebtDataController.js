import { debtDB } from "../db/db.js";

export const Debtors = async (req, res) => {
    try {
        debtDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "debtors fetched successfully", success: true, debtors: result });
        });
    } catch (error) {
        console.error("Unexpected error in Debtors controller:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT 
                COUNT(*) as productiveUsersCount
            FROM users
            WHERE entries > 0 
            AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        debtDB.query(query, (err, result) => {
            if (err) {
                console.error("Error fetching active users count:", err);
                return res.status(500).json({ 
                    message: "Error fetching statistics", 
                    success: false 
                });
            }

            const stats = result[0];
            res.status(200).json({
                message: "Active user statistics (Last 30 Days) fetched successfully",
                success: true,
                debtactiveUsers: stats.productiveUsersCount
            });
        });
    } catch (error) {
        console.error("Unexpected error in GetActiveUsersCount:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};