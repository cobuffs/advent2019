const fs = require('fs');
const inputs = fs.readFileSync('sample0.txt').toString().split("\n");

let elementmap = new Map();
let corecounts = new Map();
let rawcounts = new Map();

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
        "ore": null,
        "total": 0
    };

    for(var j = 0; j < consumables.length; j++) {
        let consumable = consumables[j].split(" ");
        if(consumable[1] === "ORE") {
            value.ore = parseInt(consumable[0],10);
            corecounts.set(value.element,0);
        }
        else {
            value.reaction.push({"n":parseInt(consumable[0],10), "element":consumable[1]});
        }
    }
    elementmap.set(value.element, value);

}

//go through every consumable and build a count of materials needed
for (let [k, v] of elementmap) {
    if(v.ore === null && v.reaction) {
        for(var i = 0; i < v.reaction.length; i++){
            let consumable = v.reaction[i];
            let elemc = 0;
            if(rawcounts.has(consumable.element)) {
                elemc = rawcounts.get(consumable.element);
                elemc += consumable.n;
            } else {
                elemc += consumable.n;
            }
            rawcounts.set(consumable.element, elemc);
        }
    }
}

//find what is required to make fueld and get the number of ore
//want to flatten into an array of {quantities, element}
let fuel = elementmap.get("FUEL");
//seems like we need to stage them somehow to be more efficient later. queue up all reactions for a particular element and do them all at once. 
//basically break down everything into raw materials
let flattenedcalc = tocores(1,"FUEL");

//now we have the required core elements. need to understand their production
let orereq = 0;
for (let [k, v] of corecounts) {
    let coreelement = elementmap.get(k);
    let newsum = Math.ceil(v / coreelement.n) * coreelement.n;
    corecounts.set(k, newsum);
    console.log(`core:${k}, newcount:${newsum}`);
    orereq += (newsum / coreelement.n) * coreelement.ore;
}
console.log(`ORE: ${orereq}`);

function stagereactions(depth, elementk) {

}

function tocores(depth, elementk) {
    let element = elementmap.get(elementk);
    if(element.ore !== null) {
        let corec = corecounts.get(element.element);
        corecounts.set(element.element, corec + depth);
        return null;
    } else {
        for(var i = 0; i < element.reaction.length; i++) {
            let elem = element.reaction[i];
            console.log(`depth: ${Math.ceil(depth / element.n) * elem.n}, elemn: ${elem.n}, elem: ${elem.element}`);
            tocores( Math.ceil(depth / element.n) * elem.n, elem.element);
        }
    }
}



// function getcalcforelement(depth, elementk) {
//     let element = elementmap.get(elementk);
//     let formula = [];
//     let result = {"yield": element.n, "formula":formula};
//     //base case tells us for n ore, we get x of an element
//     if(element.ore !== null) {
//         //console.log(`core element found: ${element.ore} ore yields ${element.n} of ${element.element}`);
//         result.element = element.element;
//         result.amount = depth;
//         let sum = corecounts.get(element.element);
//         corecounts.set(element.element, sum + depth);
//         return {"coreelement": element.element, "amount": depth};
//     }
//     for(var i = 0; i < element.reaction.length; i++) {
//         formula.push({"elementn":element.reaction[i].element, "yield": element.reaction[i].n, "element": getcalcforelement(element.reaction[i].n * depth, element.reaction[i].element) });
//     }
//     return result;
// }