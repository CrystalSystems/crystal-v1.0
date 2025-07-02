import mongoose from "mongoose";
import {
    MONGO_URI_BASE,
    MONGO_DB_NAME
} from "../../../shared/constants/index.js";

export async function connectDB() {

    mongoose.set("strictQuery", true);
    const fullUri = `${MONGO_URI_BASE}/${MONGO_DB_NAME}`;

    try {
        await mongoose.connect(fullUri);
        console.log("\n   🔥 DB connected");
    } catch (error) {
        console.error("  ❌ DB error -", error);
        process.exit(1);
    }
}
