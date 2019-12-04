let min = 246540;
let max = 787419;
let possibles = 0;
for (var i = min; i <= max; i++) {
    //check rules
    // It is a six-digit number.
    // The value is within the range given in your puzzle input.
    // Two adjacent digits are the same (like 22 in 122345).
    // Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
    //turn it into an array
    let digits = (""+i).split("");
    let decrease = false;
    let adjacent = false;
    let nums = new Map();
    for(var j = 0; j < digits.length - 1; j++) {
        if(parseInt(digits[j],10) > parseInt(digits[j+1],10)) {
            decrease = true;
            break;
        }
        if(parseInt(digits[j],10) === parseInt(digits[j+1],10)) {
            if(nums.has(digits[j])) {
                var count = nums.get(digits[j]) + 1;
                nums.set(digits[j], count);
            } else {
                nums.set(digits[j], 2);
            }
        }
    }
    if(!decrease) {
        nums.forEach((v,k,m) => {
            if(v === 2) adjacent = true;
        });
        if(adjacent) possibles++;
    }
    //if(!decrease && adjacent) possibles++;
}
console.log(possibles);
