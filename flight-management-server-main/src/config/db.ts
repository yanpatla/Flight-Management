import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://yanpatla2:root@cluster0.nbdln.mongodb.net/test"
    );
    const url = `${connection.connection.host}: ${connection.connection.port}`;
    console.log(`Connectado en ${url}`);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
