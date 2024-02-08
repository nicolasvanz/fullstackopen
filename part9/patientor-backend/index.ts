import express from "express";
import cors from "cors";

const app = express();
app.use(cors())

app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});