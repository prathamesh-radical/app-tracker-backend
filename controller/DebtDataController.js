import { debtDB } from "../db/db.js";

export const Debtors = async (req, res) => {
    try {
        debtDB.query("SELECT * FROM users", (err, result) => {
            if (err) {
                console.log("Error fetching debtors:", err);
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "debtors fetched successfully", success: true, debtors: result });
        });
    } catch (error) {
        console.error("Unexpected error in Debtors controller:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};