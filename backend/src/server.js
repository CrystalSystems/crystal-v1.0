import express from "express";
import cors from "cors";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const port = 3000;
import {
  postRoutes,
  userRoutes,
  hashtagRoutes,
  likedRoutes
} from "./routes/index.js";
import cookieParser from 'cookie-parser';
import { PRODUCTION_STATUS } from "./constants/index.js";

const app = express();

// application mode
app.use(
  cors({
    origin: true,
    credentials: !PRODUCTION_STATUS,
  })
);
// /application mode

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// /parsers

app.listen(port, (error) => {
  error ?
    console.log("Server error -", error) :
    console.log("Server is running");
});

app.use(
  postRoutes,
  userRoutes,
  hashtagRoutes,
  likedRoutes
);

// express.static
app.use("/uploads/", express.static("uploads/"));
// /express.static

// database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crystal")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB error -", error));
// /database Connection
