import connectDB from "@/utils/connect";
import { levelUp } from "./controllers/Tap";



connectDB()
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId } = req.body;

        try {
            const updatedTapDetails = await levelUp(userId);
            res.status(200).json({ success: true, data: updatedTapDetails });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}