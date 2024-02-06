interface calculateExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating = number

const calculateExercises = (exercises: Array<number>, target: number): calculateExerciseResult => {
  const getRating = (avg: number): Rating => {
    const index = avg/target

    if (index > 1) {
      return 3
    } else if (index > 0.5) {
      return 2
    } else {
      return 1
    }
  }
  const getRatingDescription = (rating: Rating): string => {
    switch(rating) {
      case 3:
        return "well done! you reached the goal"
      case 2:
        return "good, but could be better"
      case 1:
        return "you should dedicate more"
      default:
        throw new Error("rating out of range")
    }
  }

  const periodLength = exercises.length
  const trainingDays = exercises.reduce((acc, curr) => curr === 0 ? acc : acc + 1, 0)
  const average = exercises.reduce((acc, curr) => acc + curr, 0) / exercises.length
  const success = average >= target
  const rating = getRating(average)
  const ratingDescription = getRatingDescription(rating)
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))