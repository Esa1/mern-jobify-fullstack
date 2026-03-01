import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

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

// Get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

// Create job
app.post("/api/v1/jobs", (req, res) => {
  console.log("create job");
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: "please provide company and position" });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  console.log(jobs);
  res.status(200).json({ job });
});

const port = process.env.port || 5100;

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
