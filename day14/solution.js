const fs = require('fs');
const inputs = fs.readFileSync('sample0.txt').toString().split("\n");

let elementmap = new Map();

for(var i = 0; i < inputs.length; i++) {
    //split on the => to get the reaction
    let reaction = inputs[i].split(" => ")

    //split on the , to get the formulas
    let consumables = reaction[0].split(", ");
    let yield = reaction[1].split(" ");
    let yieldq = parseInt(yield[0],10);
    let element = yield[1];
    let value = {
        "element": element,
        "n": yieldq,
        "reaction": [],
        "ore": null
    };

    for(var j = 0; j < consumables.length; j++) {
        let consumable = consumables[j].split(" ");
        if(consumable[1] === "ORE") value.ore = parseInt(consumable[0],10);
        else value.reaction.push({"n":parseInt(consumable[0],10), "element":consumable[1]});
    }

    elementmap.set(value.element, value);

}

//find what is required to make fueld and get the number of ore
//want to flatten into an array of {quantities, element}
let fuel = elementmap.get("FUEL");
let fuelcalc = [];
let flattenedcalc = getcalcforelement(1,"FUEL");
console.log("done");

function getcalcforelement(n, elementk) {
    let element = elementmap.get(elementk);
    if(!elementmap.has(elementk)) console.log(`${elementk} doesn't exist`);
    let formula = [];
    //base case tells us for n ore, we get x of an element
    if(element.ore !== null) {
        //console.log(`core element found: ${element.ore} ore yields ${element.n} of ${element.element}`);
        return {"baseelement":element.element, "nore":element.ore, "yields":element.n};
    }
    for(var i = 0; i < element.reaction.length; i++) {
        formula.push({"n": element.reaction[i].n, "element": getcalcforelement(element.reaction[i].n, element.reaction[i].element) });
    }
    return formula;
}