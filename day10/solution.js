const fs = require('fs');
const inputs = fs.readFileSync('input.txt').toString().split("\n");

let asteroidbelt = new Array();
let asteroidlocs = new Map();
let asteroidkeys = new Array();

for(var i = 0; i < inputs.length; i++) {
    asteroidbelt.push(inputs[i].split(""));
}

//[y][x]

//need to consider every asteroid
for(var y = 0; y < asteroidbelt.length; y++) {
    for (var x = 0; x < asteroidbelt[y].length; x++) {
        if (asteroidbelt[y][x] === "#") {
            asteroidlocs.set(`${x},${y}`, {"x": x, "y": y, "los": 0, "slopemap": new Map()} );
            asteroidkeys.push(`${x},${y}`);
        }
    }
}
let base = null;

//for every asteroid, generate the slope to every other asteroid. when the slope is the same, we can start eliminating so that we only see the first one we hit up, down, left or right
for(var i = 0; i < asteroidkeys.length; i++) {
    let point1 = asteroidkeys[i]
    let v1 = asteroidlocs.get(point1);
    let x1 = v1.x;
    let y1 = v1.y;
    for(var j = 0; j < asteroidkeys.length; j++) {
        let point2 = asteroidkeys[j];
        if(point2 === point1) continue;
        let v2 = asteroidlocs.get(point2);
        //handle undefined slope
        let x2 = v2.x;
        let y2 = v2.y;
        let rise = y2-y1;
        let run = x2-x1;
        let slopes = null;
        let reducedkey = reduce(rise,run);
        if(v1.slopemap.has(reducedkey)) {
            slopes = v1.slopemap.get(reducedkey);
            slopes.points.push({"x":x2, "y": y2});
        } else {
            slopes = {"rise": rise, "run": run, "points": [{"x":x2, "y": y2}]};
        }
        v1.slopemap.set(reduce(rise,run), slopes);
    }
    if(base === null || v1.slopemap.size > base.slopemap.size) base = v1;
}
    
function reduce(num,den){
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = Math.abs(gcd(num,den));
    return `${num/gcd}, ${den/gcd}`;
}

function reduce2(num,den){
    var gcd = function gcd(a,b){
        return b ? gcd(b, a%b) : a;
    };
    gcd = Math.abs(gcd(num,den));
    return [num/gcd, den/gcd];
}
//blow some shit up
//go around 360 degrees and blow up the closes asteroid to us. when we blow up the 200th asteroid, stop.
let destroyedasteroids = 0;
let laserit = builditeratorforlaser();
let loop = 0;
    
while(destroyedasteroids < 200) {
    let consider = laserit[loop % laserit.length];
    let reducedrr = reduce2(consider.rise, consider.run);
    findpointtodestroy(reducedrr[0], reducedrr[1]);
    loop++;
}

function findpointtodestroy(rise,run) {
    let key = reduce(rise,run);
    //get points on that slope
    if(base.slopemap.has(key)) {
    //find the one closest and kill it
        let possibles = base.slopemap.get(key).points;
        let distance = 9999;
        let index = 0;
        let removedpoint = null;
        for(var i = 0; i < possibles.length; i++) {
            if(mdistance(base.x, base.y, possibles[i].x, possibles[i].y) < distance) {
                distance = mdistance(base.x, base.y, possibles[i].x, possibles[i].y);
                index = i;
                removedpoint = possibles[i];
            }
        }
        destroyedasteroids++;
        possibles.splice(index,1); 
        console.log(removedpoint);
    }
}

function mdistance(x1,y1,x2,y2)
{
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}

function builditeratorforlaser() {
    let quad1 = [];
    let quad2 = [];
    let quad3 = [];
    let quad4 = [];
    let laserit = [];

    //for every slope in the base, decide which quad it belongs to
    for (var [k, v] of base.slopemap.entries()) {
        //quad 1 - neg y, positive x
        if(v.rise < 0 && v.run > 0) {
            quad1.push({"point":k, "rise": v.rise, "run": v.run, "slope": v.rise/v.run});
        } else if(v.rise > 0 && v.run > 0) {
            //quad 2 - positive y, positive x
            quad2.push({"point":k, "rise": v.rise, "run": v.run, "slope": v.rise/v.run});
        } else if(v.rise > 0 && v.run < 0) {
            //quad 3 - positive y, negative x
            quad3.push({"point":k, "rise": v.rise, "run": v.run, "slope": v.rise/v.run});
        } else if(v.rise < 0 && v.run < 0) {
            //quad 4 - neg y, neg x
            quad4.push({"point":k, "rise": v.rise, "run": v.run, "slope": v.rise/v.run});
        }
    }

    //add edge cases
    quad1.push({"point":"0, -1", "rise": -1, "run": 0, "slope": -100});
    quad2.push({"point":"0, 1", "rise": 0, "run": 1, "slope": 0});
    quad3.push({"point":"1, 0", "rise": 1, "run": 0, "slope": 100});
    quad4.push({"point":"-1, 0", "rise": 0, "run": -1, "slope": 0});

    quad1.sort((a,b) => { return Math.abs(b.slope) - Math.abs(a.slope); });
    quad2.sort((a,b) => { return Math.abs(a.slope) - Math.abs(b.slope); });
    quad3.sort((a,b) => { return Math.abs(b.slope) - Math.abs(a.slope); });
    quad4.sort((a,b) => { return Math.abs(a.slope) - Math.abs(b.slope); });
    laserit = [quad1, quad2, quad3, quad4];
    return laserit.flat();
}

console.log(base.slopemap.size);