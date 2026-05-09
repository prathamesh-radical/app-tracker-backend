import { mechDB } from "../db/db.js";

export const Mechanic = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM admins", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "mechanics fetched successfully", success: true, mechanic: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MechanicUsersData = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM bills", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Mechanics users data fetched successfully", success: true, mechaniclist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MechanicServicesData = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM services", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Mechanics services data fetched successfully", success: true, serviceslist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT COUNT(DISTINCT a.id) as activeRecentCount 
            FROM admins a
            INNER JOIN bills b ON a.id = b.admin_id
            WHERE b.date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        mechDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Error fetching active users count", 
                    success: false 
                });
            }

            const count = result[0].activeRecentCount;
            res.status(200).json({ 
                message: "Recently active mechanics fetched successfully", 
                success: true, 
                mechanicactiveUsers: count,
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