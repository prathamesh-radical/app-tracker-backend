import { debtDB, entryBookDB, mechDB, moneyDB } from "../db/db.js";

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