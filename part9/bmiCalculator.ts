interface bmiCalculationValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): bmiCalculationValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided numbers were not numbers');
    }
}

type Result = string | number;

export const bmiCalc = (a: number, b: number): Result => {
    const calc = (b / (a*a)) *10000;

    if(calc < 18.5){
        return `Your BMI is ${calc} and you are Underweight`;
    } else if (calc >= 18.5 && calc <= 24.9){
        return `Your BMI is ${calc} and you are Normal (healthy weight)`;
    } else if (calc > 24.9 && calc <= 29.9){
        return `Your BMI is ${calc} and you are Overweight`;
    } else {
        return `Your BMI is ${calc} and you are Obese`;
    }
}

try{
    const { value1, value2 } = parseArguments(process.argv);
    console.log(bmiCalc(value1, value2));
} catch (error) {
    console.log('Something bad happened, message: ', error.message);
}