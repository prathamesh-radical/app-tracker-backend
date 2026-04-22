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