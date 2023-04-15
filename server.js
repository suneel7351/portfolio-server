import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

dotenv.config({ path: "./.env" });
export const app = express();
const PORT = process.env.PORT || 8989;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const { connection } = await mongoose.connect(process.env.URI);

console.log(`Database is connect with ${connection.host}`);

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECERET,
});
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
