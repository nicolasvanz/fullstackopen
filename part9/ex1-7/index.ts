import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const bmi = calculateBmi([Number(req.query.height), Number(req.query.weight)]);
    res.json({
      weight : req.query.weight,
      height : req.query.height,
      bmi
    });
  } catch (error) {
    res.status(404).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});