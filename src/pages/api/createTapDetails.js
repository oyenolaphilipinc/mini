import { createTapDetails } from "./controllers/Tap";
import connectDB from "@/utils/connect";


export default async (req, res) => {
  await connectDB();

  if (req.method === 'POST') {
    const { userId } = req.body;

    try {
      const tapDetails = await createTapDetails(userId);
      res.status(200).json(tapDetails);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create or fetch tap details' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
