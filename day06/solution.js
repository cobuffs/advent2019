var fs = require('fs');
var planets = fs.readFileSync('input1.txt').toString().split("\n");
let solarsystem = new Map();
let systemcenter = null;

planets.forEach(planet => {
    planet = planet.split(")");
    let planetkey = planet[0];
    let orbiterkey = planet[1];
    let rootplanet;
    let orbiter;

    if(!solarsystem.has(planetkey)) {
        rootplanet = { "planet" : planetkey, "orbits" : null};
        solarsystem.set(planetkey, rootplanet);
    } else {
        rootplanet = solarsystem.get(planetkey);
    }

    if(!solarsystem.has(orbiterkey)) {
        orbiter = { "planet" : orbiterkey, "orbits" : rootplanet};
        solarsystem.set(orbiterkey, orbiter);
    } else {
        orbiter = solarsystem.get(orbiterkey);
        orbiter.orbits = rootplanet;
    }
});

//count orbits in the 
let sum = 0;
solarsystem.forEach( (planet, key) => {
    let directorb = planet.orbits;
    let previous = null;
    while(directorb !== null) {
        sum++;
        previous = directorb.planet;
        directorb = directorb.orbits;
    }
    if(systemcenter === null) systemcenter = previous;
    else if (systemcenter !== previous) {
        //console.log(previous);
    }
} );

//find orbital transfers between YOU and SAN
let me = solarsystem.get("YOU");
//get santa's orbit
let santa = solarsystem.get("SAN");
let workingnode = me.orbits;

//go up until we hit a place that can see SAN 
//build my path to the COM
let mypath = [];
let santapath = [];
while(true) {
    if(workingnode.orbits === null) break;
    workingnode = workingnode.orbits;
    mypath.push(workingnode.planet)
}
workingnode = santa.orbits;
while(true) {
    santapath.push(workingnode.planet)
    if(workingnode.orbits === null) break;
    workingnode = workingnode.orbits;
}

//we've got our path and santa's path. the unique elements should be the jumps we have to make
//let jumps =[...new Set(mypath.concat(santapath))];
let santapointer = santapath.length - 1;
let mypointer = mypath.length - 1;
while (true) {
    //if they are the same move the pointer
    if(santapath[santapointer] !== mypath[mypointer]) {
        //last shared node is
        console.log("last node is " + santapath[santapointer+1] + " " + mypath[mypointer + 1]);
        console.log("current node is " + santapath[santapointer] + " " + mypath[mypointer]);
        break;
    }
    else {
        santapointer--;
        mypointer--;
    }
}

//pointers are the ones we can ignore because they are shared
//[K,J,E,D,C,B,COM]
//[I,D,C,B,COM]

//take the pointers, add 1 to each for 0 based, and 1 for the late shared element that you have to traverse
console.log(santapointer + mypointer + 3);