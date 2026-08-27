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
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT * FROM users WHERE entries > 0  AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY created_at DESC
        `;

        debtDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching statistics",
                    success: false
                });
            }

            res.status(200).json({
                message: "Active user statistics (Last 30 Days) fetched successfully",
                success: true,
                debtactiveUsers: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};