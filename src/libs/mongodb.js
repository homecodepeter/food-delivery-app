import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected Successfully")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectMongoDB;