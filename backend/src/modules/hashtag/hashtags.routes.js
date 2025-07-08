import express from "express";
import { controller } from "./index.js";

const router = express.Router();

router.get("/",
    controller.getHashtags
);

export default router;