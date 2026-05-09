import { entryBookDB } from "../db/db.js";

export const GuestEntry = async (req, res) => {
    try {
        entryBookDB.query("SELECT * FROM registration", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Guest entries fetched successfully", success: true, guestEntries: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GuestEntryUsersData = async (req, res) => {
    try {
        entryBookDB.query("SELECT * FROM visitor", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Visitor entries fetched successfully", success: true, visitorslist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT COUNT(DISTINCT r.id) as activeAdminCount
            FROM registration r
            LEFT JOIN visitor v ON r.id = v.user_id
            WHERE 
                r.date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                OR 
                v.datetime >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        entryBookDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Error fetching active users count", 
                    success: false 
                });
            }

            const count = result[0].activeAdminCount;

            res.status(200).json({ 
                message: "Recently active guest-entry admins fetched successfully", 
                success: true, 
                guestactiveUsers: count,
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