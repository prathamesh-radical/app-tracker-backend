import { buddyWalkDB } from "../db/db.js";

export const GetUsersData = async (req, res) => {
    try {
        buddyWalkDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "BuddyWalk user data fetched successfully", success: true, stepslist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetGroupData = async (req, res) => {
    try {
        buddyWalkDB.query("SELECT * FROM grp", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "BuddyWalk group data fetched successfully", success: true, grouplist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetGroupMemberData = async (req, res) => {
    try {
        buddyWalkDB.query("SELECT * FROM group_members", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "BuddyWalk group member data fetched successfully", success: true, groupmemberlist: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetUsersStepsData = async (req, res) => {
    try {
        buddyWalkDB.query("SELECT * FROM steps", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "BuddyWalk steps data fetched successfully", success: true, steps: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT COUNT(DISTINCT u.id) as activeUserCount
            FROM users u
            LEFT JOIN steps s ON u.id = s.user_id
            WHERE 
                u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                OR 
                s.step_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        `;

        buddyWalkDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    message: "Error fetching active users count", 
                    success: false 
                });
            }

            const count = result[0].activeUserCount;

            res.status(200).json({ 
                message: "Recently active BuddyWalk users fetched successfully", 
                success: true, 
                buddyactiveCount: count,
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