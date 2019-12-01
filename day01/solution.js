var fs = require('fs');
var modules = fs.readFileSync('input1.txt').toString().split("\n");
var sum = 0;
// Specifically, to find the fuel required for a module, take its mass, divide by three, 
// round down, and subtract 2.

// Fuel itself requires fuel just like a module - take its mass, divide by three, round down, 
// and subtract 2. However, that fuel also requires fuel, and that fuel requires fuel, 
// and so on. 
// Any mass that would require negative fuel should instead be treated as if it requires zero fuel; 
// the remaining mass, if any, is instead handled by wishing really hard, which has no mass and is 
// outside the scope of this calculation.

modules.forEach(module => {
    let fuel = parseInt(module);
    while(true) {
        fuel = Math.floor(fuel/3) - 2;
        if (fuel > 0) sum += fuel;
        else break;
    }
});

console.log(sum);