let moons = [buildmoon("Io",1,2,-9), buildmoon("Europa",-1,-9,-4), buildmoon("Ganymede",17,6,8), buildmoon("Callisto",12,4,2)];
//let moons = [buildmoon("Io",-1,0,2), buildmoon("Europa",2,-10,-7), buildmoon("Ganymede",4,-8,8), buildmoon("Callisto",3,5,-1)];
//let previousposmap = new Map();
let moonmap = new Map();


for(var i = 0;i < moons.length; i++) {
    calcenergy(moons[i]);
}

//sim 1000 times for p1
let steps = 0;
while(steps < 1000000) {
    applygravity();
    applyvelocity();
    steps++;
    
    let moon0 = moons[0];
    let moon1 = moons[1];
    let moon2 = moons[2];
    let moon3 = moons[3];

    //caculated p2 by hand.
    // 1. analyze output to find how many steps it takes to repeat a given point
    // 2. for each step identified in 1. for each point, find LCM
    // 3. notice 1 is the same for each moon
    
    let moonkey = `${moon1.x}`;
    //let moon1key = `${moon1.x},${moon1.y},${moon1.z}`;
    //let moon2key = `${moon2.x},${moon2.y},${moon2.z}`;
    //let moon3key = `${moon3.x},${moon3.y},${moon3.z}`;

    //look for x patterns
    if(moonmap.has(moonkey)){

        console.log(`key: ${moonkey}`);
    } else moonmap.set(moonkey,true);

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