import { getTapDetailsByUserId } from "./controllers/Tap";
import connectDB from "@/utils/connect";

connectDB()
export default async function handler(req, res) {
    const { userId } = req.query;

    if (req.method === 'GET') {
        try {
            const tapDetails = await getTapDetailsByUserId(userId);
            if (!tapDetails) {
                return res.status(404).json({ success: false, message: 'Tap details not found' });
            }
            res.status(200).json({ success: true, data: tapDetails });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}