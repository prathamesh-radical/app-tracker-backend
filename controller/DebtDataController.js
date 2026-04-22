import { danceStudioDB } from "../db/db.js";

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