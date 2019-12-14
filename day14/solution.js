const fs = require('fs');
const inputs = fs.readFileSync('sample1.txt').toString().split("\r\n");

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
for(var i = 0; i < fuel.reaction.length; i++) {
    //need to keep going until we get to an ore total
}


function getcalcforelement(elementk) {
    let element = elementmap.get(elementk);
    let formula = [];
    //base case tells us for n ore, we get x of an element
    if(element.ore !== null) return formula.push({"nore":element.ore, "yields":element.n});
    for(var i = 0; i < element.reaction.length; i++) {
        formula.push(getcalcforelement(element.reaction.element));
    }
}