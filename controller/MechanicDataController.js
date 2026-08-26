import { google } from "googleapis";
import { androidpublisher, getAuth } from "../config/googlePlay.js";
import { mechDB } from "../db/db.js";

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keyFilePath = join(__dirname, "../service-account-key.json");
const credentials = JSON.parse(readFileSync(keyFilePath, "utf8"));

export const Mechanic = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM admins", (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error fetching values", success: false });
            }
            res
                .status(200)
                .json({
                    message: "mechanics fetched successfully",
                    success: true,
                    mechanic: result,
                });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MechanicUsersData = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM bills", (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error fetching values", success: false });
            }
            res
                .status(200)
                .json({
                    message: "Mechanics users data fetched successfully",
                    success: true,
                    mechaniclist: result,
                });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const MechanicServicesData = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM services", (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error fetching values", success: false });
            }
            res
                .status(200)
                .json({
                    message: "Mechanics services data fetched successfully",
                    success: true,
                    serviceslist: result,
                });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const GetActiveUsersCount = async (req, res) => {
    try {
        const query = `
            SELECT 
    a.id,
    a.shop_name,
    a.firstName,
    a.lastName,
    a.email,
    a.contact,
    a.profile_url,
    a.currency,
    a.country,
    a.country_code,
    a.created_at,
    a.is_premium,
    COUNT(b.bill_id) as billCount,
    MAX(b.date) as lastBillDate
FROM admins a
INNER JOIN bills b ON a.id = b.admin_id
WHERE b.date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY a.id
ORDER BY lastBillDate DESC
        `;

        mechDB.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error fetching active users count",
                    success: false,
                });
            }

            res.status(200).json({
                message: "Recently active mechanics fetched successfully",
                success: true,
                mechanicactiveUsers: result,
                period: "Last 30 Days",
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const MechanicSubscriptionData = async (req, res) => {
    try {
        mechDB.query("SELECT * FROM subscription_history", (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error fetching values", success: false });
            }
            res
                .status(200)
                .json({
                    message: "Subscriptions fetched successfully",
                    success: true,
                    mechanicpremium: result,
                });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const VerifySubscription = async (req, res) => {
    try {
        const { packageName, subscriptionId, token } = req.body;
        const authClient = await getAuth();

        const result = await androidpublisher.purchases.subscriptions.get({
            auth: authClient,
            packageName: packageName,
            subscriptionId: subscriptionId,
            token: token,
        });

        const subscription = result.data;

        const isActive = subscription.autoRenewing;
        const expiryTime = new Date(parseInt(subscription.expiryTimeMillis));

        const premiumData = {
            isActive: isActive,
            expiryDate: expiryTime,
            orderId: subscription.orderId,
        };

        res.json({
            success: true,
            premiumData: premiumData,
        });
    } catch (error) {
        console.error('Subscription verification failed:', error);
        res.status(400).json({ success: false, error: error.message });
    }
}

const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ['https://www.googleapis.com/auth/androidpublisher']
});

export const GetAllSubscriptions = async (req, res) => {
    try {
        const { packageName, token } = req.query;

        if (!token) {
            return res.status(400).json({
                success: false,
                error: "purchase token is required",
            });
        }

        const authClient = await getAuth();

        const result = await androidpublisher.purchases.subscriptionsv2.get({
            auth: authClient,
            packageName: packageName || "com.peccular.mechanic",
            token,
        });

        return res.status(200).json({
            success: true,
            data: result.data,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
};

export const GetAllSubscriptionsByOrderIds = async (req, res) => {
    try {
        const { orderIds, packageName } = req.body;

        if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
            return res.status(400).json({ message: 'Order IDs array is required' });
        }

        const authClient = await getAuth();

        const subscriptionPromises = orderIds.map(orderId =>
            androidpublisher.orders.get({
                auth: authClient,
                packageName: packageName,
                orderId: orderId,
            }).catch(error => ({
                error: true,
                orderId: orderId,
                message: error.message
            }))
        );

        const results = await Promise.all(subscriptionPromises);

        const subscriptionData = results.map((result, index) => {
            if (result.error) {
                return {
                    orderId: orderIds[index],
                    error: result.message
                };
            }
            return {
                orderId: orderIds[index],
                data: result.data,
                ...result.data
            };
        });

        return res.status(200).json({
            success: true,
            data: subscriptionData,
            totalOrders: subscriptionData.length
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching subscriptions',
            error: error.message
        });
    }
};