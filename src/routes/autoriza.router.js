import express from "express";
import {
  loginPage,
  olvidoPage,
  autorizar,
  olvido,
} from "../controllers/autoriza.controller";

const authRouter = express.Router();

// pages
authRouter.get("/", loginPage);
authRouter.get("/forgot", olvidoPage);

// proc
authRouter.post("/auth", autorizar);
authRouter.post("/forgot", olvido);

export default authRouter;
