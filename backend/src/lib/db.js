import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://aryanm3124:7iXzS1Rd5tqIQgKd@cluster0.ee1qd.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0", // Enclosed the URI string in quotes
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message); // Added better error logging
    process.exit(1); // Exit the process if the database connection fails
  }
};

