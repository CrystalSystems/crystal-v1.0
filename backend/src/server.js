import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import { registerRoutes } from "./routes/index.js";
import { PRODUCTION_STATUS } from "./constants/index.js";

mongoose.set('strictQuery', true);

const app = express();
const port = 3000;

app.listen(port, (error) => {
  error ?
    console.log("Server error -", error) :
    console.log("Server is running");
});

// application mode
app.use(
  cors({
    origin: true,
    credentials: !PRODUCTION_STATUS,
  })
);

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// static
app.use("/uploads/", express.static("uploads/"));

// routes
registerRoutes(app);

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crystal")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB error -", error));
