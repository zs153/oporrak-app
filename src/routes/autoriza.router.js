import express from "express";
import {
  loginPage,
  autorizar,
} from "../controllers/autoriza.controller";

const authRouter = express.Router();

// pages
authRouter.get("/", loginPage);

// proc
authRouter.post("/auth", autorizar);

export default authRouter;
