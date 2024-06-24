import connectDB from "@/utils/connect";
import { updateOnlineStatus } from "./controllers/Tap";


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, status } = req.body;

        try {
            const updatedTapDetails = await updateOnlineStatus(userId, status);
            res.status(200).json({ success: true, data: updatedTapDetails });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}