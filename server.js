// packages
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

// routers
import jobRouter from "./routes/jobRouter.js";

if (process.env.NODE_ENV === "development") {
  //  console.log("still running morgan");
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

app.use("/api/v1/jobs", jobRouter);

// Not found middleware for handling non-existing routes
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error middleware for handling errors happened or throwned inside an existing route controller
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.port || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}...`);
  });
} catch {
  console.log(console.error());
  process.exit(1);
}
