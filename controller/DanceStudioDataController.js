import { danceStudioDB } from "../db/db.js";

export const DanceStudioUsersData = async (req, res) => {
    try {
        danceStudioDB.query("SELECT * FROM registration", (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching values", success: false });
            }
            res.status(200).json({ message: "Dance studio entries fetched successfully", success: true, danceStudioList: result });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};