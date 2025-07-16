import { connectDB } from "./mongoose";

(async () => {
	try {
		await connectDB();
		console.log("✅ [MongoDB] Connected at startup");
	} catch (err) {
		console.error("❌ [MongoDB] Failed to connect at startup", err);
	}
})();
