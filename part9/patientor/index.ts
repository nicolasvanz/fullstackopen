import express from "express";

const app = express();

app.get("/api/ping", (_req, res) => {
  console.log("ping");
  res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});