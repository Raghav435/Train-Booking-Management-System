import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/train.js";

dotenv.config();

const app = express();

// Middleware to parse JSON body data
app.use(express.json());

// Using CORS
app.use(
  cors({
    origin: [process.env.API_URL, "http://localhost:3000"],
  })
);

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("[DB] Connection Success");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Route for handling train data and bookings
app.use("/api/train", router);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
