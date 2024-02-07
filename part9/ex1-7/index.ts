import express, { Request, Response, NextFunction } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
// import { calculateExercises } from "./exerciseCalculator"

const app = express();
app.use(express.json())

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
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const exerciseInputValidator = (req: Request, res: Response, next: NextFunction) => {
  const { target, daily_exercises } = req.body
  const missingParametersMessage = { error: "parameters missing"}
  const malformattedParametersMessage = { error: "malformatted parameters" }
  let errorLog

  if (!target || !daily_exercises)
    errorLog = missingParametersMessage
  else if (isNaN(Number(target)))
    errorLog = malformattedParametersMessage  
  else
    for (let i = 0; i < daily_exercises.length; i++)
      if (isNaN(Number(daily_exercises[i]))) {
        errorLog = malformattedParametersMessage
        break
      }      
  
  if (errorLog) {
    res.status(400).json(errorLog)
  } else {
    next()
  }
}

app.post("/exercises", exerciseInputValidator, (req, res) => {
  try {
    const { target, daily_exercises } = req.body
    res.json(calculateExercises(daily_exercises, target))
  } catch (error) {
    res.status(400).send({ error })
  }
})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});