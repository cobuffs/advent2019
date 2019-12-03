var fs = require('fs');
var inputs = fs.readFileSync('input1.txt').toString().split("\n");

let wire1 = inputs[0].split(',');
let wire2 = inputs[1].split(',');
let mindist = -1;
let minsteps = -1;

var knownpoints = new Map();
var collisions = [];
knownpoints.set("0,0", {"x":0,"y":0,"type":"o"});

//build wire 1 path
buildit(wire1, "1");
buildit(wire2, "2");


function buildit(wire, name) {
    let curx = 0;
    let cury = 0;
    let steps = 0;
    for(var i = 0; i < wire.length; i++) {
        //break up the input
        var direction = wire[i].substr(0,1);
        var mag = parseInt(wire[i].substr(1),10);
        for(var j = 1; j <= mag; j++){
            steps++;
            var xdir = 1;
            var ydir = 1;
            //figure out the direction   
            if (direction === "L") {
                curx = curx - 1;
            } else if (direction === "D"){
                cury = cury - 1;
            } else if (direction === "U") {
                cury = cury + 1;
            } else {
                //R
                curx = curx + 1;
            }
            let key = curx + "," + cury;
            let type = name;
            if(knownpoints.has(key)) {
                //make sure its crossing the other wire and not itself
                let point = knownpoints.get(key);
                if(point.type !== name) {
                    //collision
                    let mdist = mdistance(0,0,curx,cury);
                    let stepsum = point.steps + steps;
                    let newpoint = {"x":curx, "y":cury, "type":"X", "mdist":mdist, "msteps": stepsum};
                    if(mdist < mindist || mindist === -1) mindist = mdist;
                    if(stepsum < minsteps || minsteps === -1) minsteps = stepsum;
                    collisions.push(newpoint);
                    knownpoints.set(key,newpoint);
                }
            } else {
                let newpoint = {"x":curx,"y":cury,"type":name,"steps":steps};
                knownpoints.set(key,newpoint);
            }
        }
    }
}

console.log(minsteps);
function mdistance(x1,y1,x2,y2)
{
    return Math.abs(x2-x1) + Math.abs(y2-y1);
}