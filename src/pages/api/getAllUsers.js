import connectDB from "@/utils/connect";
import { getAllUsers } from "./controllers/users";


connectDB()
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await getAllUsers();
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}