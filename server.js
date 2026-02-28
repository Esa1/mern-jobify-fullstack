import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";

//console.log("NODE_ENV=");
//console.log(process.env.NODE_ENV);
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

const port = process.env.port || 5100;

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
