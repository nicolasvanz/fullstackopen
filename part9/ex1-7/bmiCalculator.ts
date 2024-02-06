const calculateBmi = (height: number, weight: number) : string => {
  const bmi = weight/(height/100)**2

  if (bmi < 18.5) {
    return "underweight"
  } else if (bmi < 24.9) {
    return "normal weight"
  } else if (bmi < 29.9) {
    return "overweight"
  } else {
    return "obesity"
  }
}

const parseArgs = () => {
  const args = process.argv

  if (args.length > 4)
    throw new Error("too many arguments")
  else if (args.length < 4)
    throw new Error("not enough arguments")

  const castedArg1 = Number(args[2])
  const castedArg2 = Number(args[3])
  
  if (!isNaN(castedArg1) && !isNaN(castedArg2)) {
    return {
      arg1: castedArg1, arg2: castedArg2
    }
  } else {
    throw new Error("invalid argument type")
  }
}

const { arg1, arg2 } = parseArgs()
console.log(calculateBmi(arg1, arg2))