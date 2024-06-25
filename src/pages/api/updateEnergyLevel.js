import { updateEnergyLevel } from "./controllers/Tap";
import connectDB from "@/utils/connect";



export default async function handler(req, res) {
    await connectDB()
    if (req.method === 'POST') {
        const { userId, amount } = req.body;

        try {
            const updatedTapDetails = await updateEnergyLevel(userId, amount);
            res.status(200).json({ success: true, data: updatedTapDetails });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}