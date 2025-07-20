import mongoose from "mongoose";
import {
    MONGO_BASE_URI,
    MONGO_DB_NAME
} from "../../../shared/constants/index.js";

export async function connectDB() {

    mongoose.set("strictQuery", true);
    /* ⚠️ Important: MongoDB security.
    In a production environment, you need to enable authorization and create an administrator with a password to close access to the database for outsiders. */
    const fullUri = `${MONGO_BASE_URI}/${MONGO_DB_NAME}`;

    try {
        await mongoose.connect(fullUri);
        console.log("\n   🔥 DB connected");
    } catch (error) {
        console.error("  ❌ DB error -", error);
        process.exit(1);
    }
}
