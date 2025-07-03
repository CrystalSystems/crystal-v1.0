import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initRoutes } from "./routes/initRoutes.js";
import { CORS_ORIGIN } from "../../../shared/constants/index.js";

export async function createApp() {

  const app = express();

  // cors
  app.use(cors({
    origin: CORS_ORIGIN === "true" ? true : CORS_ORIGIN,
    credentials: true
  }));

  // parsers
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  // static
  app.use("/uploads/", express.static("uploads/"));

  // routes
  await initRoutes(app);

  return app;
}
