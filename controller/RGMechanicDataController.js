import { rgMechDB } from "../db/db.js";

export const GetUsers = async (req, res) => {
    try {
        rgMechDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Users fetched successfully", success: true, rgmechanic: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT 
    u.*
FROM users u
WHERE u.is_deleted = 0 
AND u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY u.created_at DESC
        `;

        rgMechDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching statistics",
                    success: false
                });
            }

            res.status(200).json({
                message: "Active user statistics (Last 30 Days) fetched successfully",
                success: true,
                rgmechanicactiveUsers: result
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};