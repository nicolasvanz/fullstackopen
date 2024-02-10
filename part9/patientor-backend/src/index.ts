import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnosesRouter";

const app = express();
app.use(cors());

app.use("/api/diagnoses", diagnosesRouter);

app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});