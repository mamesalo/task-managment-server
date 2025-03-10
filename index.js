import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5500;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://task-managment-client.vercel.app",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To Mame Task Managment API");
});
app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ DB connection established");
    app.listen(PORT, () => console.log(`✅ Server listening on ${PORT} ✈️`));
  })
  .catch((err) => console.log("DB Error: " + err));
