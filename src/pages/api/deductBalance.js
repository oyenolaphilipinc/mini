// pages/api/deductBalance.js

import connectDB from '@/utils/connect';
import TapDetails from './models/tapModel';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const { userId, amount } = req.body;

    try {
      let tapDetails = await TapDetails.findOne({ userId });

      if (!tapDetails) {
        return res.status(404).json({ success: false, message: 'Tap details not found' });
      }

      if (tapDetails.tapBalance < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient balance' });
      }

      // Deduct balance
      tapDetails.tapBalance -= amount;
      await tapDetails.save();
      console.log('tap details saved', tapDetails)

      res.status(200).json({ success: true, data: tapDetails });
    } catch (error) {
      console.error('Error deducting balance:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
