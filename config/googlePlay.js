import { google } from "googleapis";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let authClient = null;

export const getAuth = async () => {
    if (authClient) return authClient;

    const keyFilePath = join(__dirname, "../google-play-key.json");
    const keyFile = JSON.parse(readFileSync(keyFilePath, "utf8"));

    authClient = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: [
            "https://www.googleapis.com/auth/androidpublisher",
            "https://www.googleapis.com/auth/playdeveloperreporting"
        ],
    });

    return authClient;
};

export const androidpublisher = google.androidpublisher("v3");