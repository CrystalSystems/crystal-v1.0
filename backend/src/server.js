import express from "express";
import cors from "cors";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const port = 4444;
import {
  postRoutes,
  userRoutes,
  hashtagRoutes,
  likedRoutes
} from "./routes/index.js";
import {
  productionStatus
} from "./applicationMode/index.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
const app = express();
// cookie
// add cookie settings
// /application mode
productionStatus ?
  app.use(cors())
  :
  app.use(cors({ credentials: true, origin: "http://localhost:8200" }));
// /application mode
// /add cookie settings
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
// /cookie
app.use(express.json());
app.listen(port, (err) => {
  err ?
    console.log("Server error -", err) :
    console.log("Server is running");
});
app.use(
  postRoutes,
  userRoutes,
  hashtagRoutes,
  likedRoutes);
// express.static
app.use("/uploads/", express.static("uploads/"));
// /express.static
// database Connection
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/crystal"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error -", err));
// /database Connection
