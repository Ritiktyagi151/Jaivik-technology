import mongoose from "mongoose";
import logger from "../utils/logger";

/**
 * MongoDB Connection Setup
 * Isme Local aur Production dono ka logic automatic switch hota hai
 */
export const connectDB = async (): Promise<void> => {
  try {
    // TypeScript Fix: Safe environment variable access
    const currentEnv = process.env.NODE_ENV || "development";
    const isProduction = currentEnv === "production";

    // URI select karna
    const mongoURI = isProduction
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI;

    if (!mongoURI) {
      logger.error(`❌ MongoDB URI is not defined for ${currentEnv} mode`);
      process.exit(1);
    }

    // Connection Options for Stability
    const options = {
      maxPoolSize: 10,               
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,        
    };

    // Database connect karna
    const conn = await mongoose.connect(mongoURI, options);

    // FIX: Using currentEnv variable to avoid TS18048 error
    logger.info(`🚀 MongoDB Connected [${currentEnv.toUpperCase()}]: ${conn.connection.host}`);

    // --- Connection Events ---
    
    mongoose.connection.on("error", (err) => {
      logger.error("❌ MongoDB late-stage error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB disconnected! Attempting to reconnect...");
    });

    // --- Graceful Shutdown ---
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("🛑 MongoDB connection closed (App terminated)");
      process.exit(0);
    });

  } catch (error) {
    logger.error("💥 Failed to connect to MongoDB:");
    logger.error(error);
    process.exit(1);
  }
};