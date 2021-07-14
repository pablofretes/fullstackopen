interface ResultsTraining {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

interface exerciseCalculatorValues {
    value1: Array<number>;
    value2: number;
}

const parseArgumentsExcersice = (args: Array<string>): exerciseCalculatorValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[args.length - 1])
    const array = args.slice(2, -1).map((item) => Number(item))

    if (!isNaN(target) && !array.some(isNaN)){
        return {
            value1: array,
            value2: target
        }
    } else {
        throw new Error('Provided values were not numbers');
    }
}

const calculateExercises = (array: Array<number>, target: number): ResultsTraining => {
    const sum = array.reduce((counter, item) => {
        return counter + item;
    }, 0)/array.length

    const isSuccess = () => {
        if(sum >= target){
            return true;
        } else {
            return false;
        }
    }

    const ratingNumber = () => {
        if(sum >= target){
            return 3;
        } else if(sum < target && sum > target/2){
            return 2;
        } else {
            return 1;
        }
    }

    const ratingDescript = () => {
        if(ratingNumber() === 3){
            return 'Well done! You have accomplished your goal';
        } else if (ratingNumber() === 2){
            return 'Not bad, but you can do much better!';
        } else {
            return 'That sucked';
        }
    }
    
    return {
        periodLength: array.length,
        trainingDays: array.filter(d => d > 0).length,
        target: target,
        average: sum,
        success: isSuccess(),
        rating: ratingNumber(),
        ratingDescription: ratingDescript()
    }
}

try{
    const { value1, value2 } = parseArgumentsExcersice(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error) {
    console.log('Something bad happened, message: ', error.message);
}