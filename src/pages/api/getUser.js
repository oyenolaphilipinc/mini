import connectDB from "@/utils/connect";
import { getUser} from "./controllers/users";



export default async function handler(req, res) {
    const { userId } = req.query;
    await connectDB()

    if (req.method === 'GET') {
        try {
            const user = await getUser(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}