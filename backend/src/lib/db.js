import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    console.log("connected mongoose", connect.connection.host);
  } catch (error) {
    console.log("error in mongoConnection", error);
  }
};
