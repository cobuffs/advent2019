let moons = [buildmoon("Io",1,2,-9), buildmoon("Europa",-1,-9,-4), buildmoon("Ganymede",17,6,8), buildmoon("Callisto",12,4,2)];
//let moons = [buildmoon("Io",-1,0,2), buildmoon("Europa",2,-10,-7), buildmoon("Ganymede",4,-8,8), buildmoon("Callisto",3,5,-1)];
//let previousposmap = new Map();

for(var i = 0;i < moons.length; i++) {
    calcenergy(moons[i]);
}

//sim 1000 times for p1
let steps = 0;
while(true) {
    applygravity();
    applyvelocity();
    steps++;

}

//console.log(calctotalenergy());

function applygravity() {
    //for each pair of moons, update the velocities
    for(var i = 0; i < moons.length; i++) {
        for(var j = i+1; j < moons.length; j++){
            let moon1 = moons[i];
            let moon2 = moons[j];
            //updates xs
            if(moon1.x < moon2.x) {
                moon1.vx += 1;
                moon2.vx -= 1;
            } else if (moon1.x > moon2.x) {
                moon1.vx -= 1;
                moon2.vx += 1;
            }
            //update ys
            if(moon1.y < moon2.y) {
                moon1.vy += 1;
                moon2.vy -= 1;
            } else if (moon1.y > moon2.y) {
                moon1.vy -= 1;
                moon2.vy += 1;
            }
            //update zs
            if(moon1.z < moon2.z) {
                moon1.vz += 1;
                moon2.vz -= 1;
            } else if (moon1.z > moon2.z) {
                moon1.vz -= 1;
                moon2.vz += 1;
            }
        }
    }
}

function applyvelocity() {
    for(var i = 0; i < moons.length; i++) {
        let moon = moons[i];
        moon.x += moon.vx;
        moon.y += moon.vy;
        moon.z += moon.vz;
        //console.log(`pos=<x= ${moon.x}, y=${moon.y}, z=${moon.z}>, vel=<x= ${moon.vx}, y=${moon.vy}, z=${moon.vz}>`);
        calcenergy(moon);

    }
}

function calcenergy(moon) {
    moon.pot = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    moon.kin = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
    moon.total = moon.pot * moon.kin;
}

function calctotalenergy() {
    let sum = 0;
    for(var i = 0; i < moons.length; i++) {
        let moon = moons[i];
        sum += moon.total;
    }
    return sum;
}

function buildmoon(name,x,y,z) {
    return {"name":name, "x":x, "y":y, "z": z, "vx":0, "vy":0, "vz":0};
}