import TapDetails from "../models/tapModel";


const getTapDetailsByUserId = async (userId) => {
    try {
        const tapDetails = await TapDetails.findOne({ userId });
        return tapDetails;
    } catch (error) {
        console.error("Error fetching tap details:", error);
        throw new Error("Error fetching tap details");
    }
};

const updateBalance = async (userId) => {
    try {
        const updatedTapDetails = await TapDetails.findOneAndUpdate(
            { userId },
            { $inc: { tapBalance: 1 } },
            { new: true }
        );
        return updatedTapDetails;
    } catch (error) {
        console.error("Error updating balance:", error);
        throw new Error("Error updating balance");
    }
};


const levelUp = async (userId) => {
    try {
        const updatedTapDetails = await TapDetails.findOneAndUpdate(
            { userId },
            { $inc: { level: 1 } },
            { new: true }
        );
        return updatedTapDetails;
    } catch (error) {
        console.error("Error leveling up:", error);
        throw new Error("Error leveling up");
    }
};


const updateOnlineStatus = async (userId, status) => {
    try {
        const updatedTapDetails = await TapDetails.findOneAndUpdate(
            { userId },
            { online: status },
            { new: true }
        );
        return updatedTapDetails;
    } catch (error) {
        console.error("Error updating online status:", error);
        throw new Error("Error updating online status");
    }
};


const updateEnergyLevel = async (userId, decrementAmount, refillTime) => {
    try {
        // Find the user tap details
        const tapDetails = await TapDetails.findOne({ userId });
        if (!tapDetails) throw new Error("User not found");

        // Decrement the tap energy
        let newEnergyLevel = tapDetails.tapEnergy - decrementAmount;

        if (newEnergyLevel < 0) {
            newEnergyLevel = 0;
        }

        // Update the energy level
        const updatedTapDetails = await TapDetails.findOneAndUpdate(
            { userId },
            { tapEnergy: newEnergyLevel },
            { new: true }
        );

        // If energy level reaches zero, set a timeout to refill energy
        if (newEnergyLevel === 0) {
            setTimeout(async () => {
                await TapDetails.findOneAndUpdate(
                    { userId },
                    { tapEnergy: 750 } // Assuming the full energy level is 750
                );
                console.log(`Energy refilled for user: ${userId}`);
            }, refillTime);
        }

        return updatedTapDetails;
    } catch (error) {
        console.error("Error updating energy level:", error);
        throw new Error("Error updating energy level");
    }
};

const createTapDetails = async (userId) => {
  try {
    // Check for existing tap details
    const existingDetails = await TapDetails.findOne({ userId });

    if (existingDetails) {
      // If details exist, return them
      return existingDetails;
    } else {
      // If no details exist, create new ones with default values
      const newTapDetails = new TapDetails({
        userId,
        tapBalance: 0,
        tapEnergy: 750,
        level: 1,
        online: false,
      });

      // Save the new tap details to the database
      await newTapDetails.save();

      // Return the newly created tap details
      return newTapDetails;
    }
  } catch (error) {
    console.error('Error in createTapDetails:', error);
    throw new Error('Unable to create or fetch tap details');
  }
};



export {
    getTapDetailsByUserId,
    updateBalance,
    updateEnergyLevel,
    updateOnlineStatus,
    levelUp,
    createTapDetails
}
