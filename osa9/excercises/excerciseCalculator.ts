interface excerciseResult { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface excerciseRating {
    rating: number,
    ratingDescription: string
}

const determineRating = (percentAchieved: number): excerciseRating => {
    if (percentAchieved > 1){
        return {
            rating: 3,
            ratingDescription: 'good, keep going'
        }
    }
    else if (percentAchieved > 0.6){
        return {
            rating: 2,
            ratingDescription: 'not too bad but could be better'
        }
    }
    else{
        return {
            rating: 1,
            ratingDescription: 'utter failure'
        }
    }

}

const calculateExcercises = (lengths: number[], target: number): excerciseResult => {
    const hourSum = lengths.reduce((a, b) => a + b, 0);
    const targetSum = target * lengths.length;
    const percentAchieved = hourSum / targetSum;
    const rating = determineRating(percentAchieved);

    return {
        periodLength: lengths.length,
        trainingDays: lengths.filter(day => day > 0).length,
        success: lengths.every(day => day > target),
        rating: rating.rating,
        ratingDescription: rating.ratingDescription,
        target: target,
        average: hourSum / lengths.length
    }
}

const argTarget: number = Number(process.argv[2])
const argLengths: number[] = process.argv.slice(3).map(x => Number(x))
console.log(calculateExcercises(argLengths, argTarget))
