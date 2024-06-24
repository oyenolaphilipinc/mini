import UserDetails from "../models/userModel";


const getUser = async (userId) => {
    try {
        const user = await UserDetails.findOne({ userId });
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Error fetching user");
    }
};

const getAllUsers = async () => {
    try {
        const users = await UserDetails.find({});
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
    }
};

export { getUser, getAllUsers };
