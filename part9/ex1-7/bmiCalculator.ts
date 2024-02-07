export const calculateBmi = (args: Array<string | number>) : string => {
  const { height, weight } = parseArgs(args);
  const bmi = weight/(height/100)**2;

  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi < 24.9) {
    return "normal weight";
  } else if (bmi < 29.9) {
    return "overweight";
  } else {
    return "obesity";
  }
};

const parseArgs = (args: Array<string | number>) => {
  if (args.length > 2)
    throw new Error("too many arguments");
  else if (args.length < 2)
    throw new Error("not enough arguments");

  const castedArg1 = Number(args[0]);
  const castedArg2 = Number(args[1]);

  if (!isNaN(castedArg1) && !isNaN(castedArg2)) {
    return {
      height: castedArg1, weight: castedArg2
    };
  } else {
    throw new Error("invalid argument type");
  }
};