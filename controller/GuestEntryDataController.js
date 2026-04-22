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