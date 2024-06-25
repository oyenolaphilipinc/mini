import TapDetails from "./models/tapModel";
import connectDB from "@/utils/connect";


export default async function handler(req, res) {
  await connectDB();

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const tapDetails = await TapDetails.create({ userId });
    res.status(201).json(tapDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
