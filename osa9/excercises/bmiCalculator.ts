const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height/100) ** 2);
    if (bmi > 40) {
        return "Obese Class III (Very severely obese)";
    }
    else if (bmi > 35) {
        return "Obese Class II (Severely obese)";
    }
    else if (bmi > 30) {
        return "Obese Class I (Moderately obese)";
    }
    else if (bmi > 25) {
        return "Overweight";
    }
    else if (bmi > 18.5) {
        return "Normal (healthy weight)";
    }
    else if (bmi > 16) {
        return "Underweight";
    }
    else if (bmi > 15) {
        return "Severely underweight";
    }
    else {
        return "Very severely underweight";
    }
};

export { calculateBmi };

// const argHeight: number = Number(process.argv[2])
// const argWeight: number = Number(process.argv[3])
// console.log(calculateBmi(argHeight, argWeight))
