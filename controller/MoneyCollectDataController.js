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