import mongoose from 'mongoose';


const MONGO_URI = process.env.MONGO_URI || ''

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default connectDB;
