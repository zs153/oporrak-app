import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from 'path'

// import rutas main
import mainRouter from "./routes/main.router";
// import rutas admin
import adminRouter from "./routes/admin.router";
// import rutas user
import userRouter from "./routes/user.router";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

// main routes
app.use("/", mainRouter);
// admin routes
app.use("/admin", adminRouter);
// user routes
app.use("/user", userRouter);

export default app;
