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
        console.error("Unexpected error in RG Mechanic controller:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        // Removed 'entries > 0' and replaced it with logical columns from your schema
        const query = `
            SELECT 
                COUNT(*) as productiveUsersCount
            FROM users
            WHERE is_deleted = 0 
            AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        rgMechDB.query(query, (err, result) => {
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
                rgmechanicactiveUsers: stats ? stats.productiveUsersCount : 0
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