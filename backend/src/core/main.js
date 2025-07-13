import {
    createApp,
    connectDB,
    startServer
} from "./engine/index.js";

async function roast() {
    const app = await createApp();
    await connectDB();
    await startServer(app);
}

roast();
