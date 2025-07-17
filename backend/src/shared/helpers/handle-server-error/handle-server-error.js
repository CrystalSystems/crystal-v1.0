export const handleServerError = (res, error, context = null) => {
    const stack = new Error().stack;
    const caller = context || (stack?.split('\n')[2]?.match(/at (\w+)/)?.[1]) || "UnknownContext";
    console.error(`❌ ${caller}:`, error);
    res.status(500).json({ message: "Server error" });
}


