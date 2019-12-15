const fs = require('fs');
const inputs = fs.readFileSync('input.txt').toString().split("\n");

let elementmap = new Map();
let corecounts = new Map();
let excessmap = {};

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
        value.reaction.push({"n":parseInt(consumable[0],10), "element":consumable[1]});
    }
    elementmap.set(value.element, value);

}

//go through every consumable and build a count of materials needed
// for (let [k, v] of elementmap) {
//     if(v.ore === null && v.reaction) {
//         for(var i = 0; i < v.reaction.length; i++){
//             let consumable = v.reaction[i];
//             let elemc = 0;
//             if(rawcounts.has(consumable.element)) {
//                 elemc = rawcounts.get(consumable.element);
//                 elemc += consumable.n;
//             } else {
//                 elemc += consumable.n;
//             }
//             rawcounts.set(consumable.element, elemc);
//         }
//     }
// }

//find what is required to make fueld and get the number of ore
//want to flatten into an array of {quantities, element}
//let fuel = elementmap.get("FUEL");
//seems like we need to stage them somehow to be more efficient later. queue up all reactions for a particular element and do them all at once. 
//basically break down everything into raw materials

//now we have the required core elements. need to understand their production
console.log(mineormake(1,"FUEL"));

let ore = 0;
let previousore = 0;
let targetore = 1000000000000;
let startfuel = 1000000
let increment = startfuel;
let fuel = startfuel;

while (true) {
    previousore = ore;
    console.log(`checking ${fuel}` );
    ore = mineormake(fuel, "FUEL");
    console.log(`${fuel} uses ${ore} ore` );
    if (previousore >= targetore && ore <= targetore && increment == 1) {
        break;
    }

    if (ore < targetore) {
        if (ore - previousore > previousore) {
            increment *= 2;
        }
        fuel += increment;
    } else {
        increment = Math.ceil(increment/2);
        fuel -= increment;
    }
}
//2074844 too high



function mineormake(amount, elementk) {
    let ore = 0
    let element = elementmap.get(elementk);
    let ratio = Math.ceil(amount / element.n);
    for(var i = 0; i < element.reaction.length; i++) {
        let elem = element.reaction[i];
        let newn = elem.n * ratio;
        //console.log(`Working with ${elem.element}. Need ${newn}`);
        if(elem.element === "ORE") ore += newn;
        else {
            excessmap[elem.element] = excessmap[elem.element] || 0;
            if (excessmap[elem.element] < newn) {
                ore += mineormake(newn - excessmap[elem.element], elem.element);
            }
            excessmap[elem.element] = excessmap[elem.element] - newn;
        }
    }
    excessmap[elementk] = (excessmap[elementk] || 0) + (ratio * element.n);
    return ore;
}

// function tocores(depth, elementk) {
//     let element = elementmap.get(elementk);
//     //console.log(`Trying to make ${element.n} ${element.element} at depth ${depth}`);
//     console.log(`Need to make ${depth} ${elementk} in batches of ${element.n}`);
//     //check for excess production
//     if(depth > element.n && depth % element.n !== 0) {
//         //will have excess
//         //put them in the bank
//         console.log(`Banking ${depth%element.n} ${element.element}`);
//         if(excessmap.has(element.element)) { 
//             let elemexcess = excessmap.get(element.element);
//             excessmap.set(element.element, elemexcess += (depth % element.n));
//         } else excessmap.set(element.element, (depth % element.n));
//     }
//     if(element.ore !== null) {
//         let corec = corecounts.get(element.element);
//         corecounts.set(element.element, corec + depth);
//         return null;
//     } else {
//         //check production
//         for(var i = 0; i < element.reaction.length; i++) {
//             let elem = element.reaction[i];
//             let amountneeded = elem.n;
//             //check my reserves
//             if(excessmap.has(elem.element)) { 
//                 let elemexcess = excessmap.get(elem.element);
//                 console.log(`Found some ${elem.element} in the bank: ${elemexcess} banked and need ${amountneeded}`);
//                 while(elemexcess > 0 && amountneeded > 0) {
//                     amountneeded--;
//                     elemexcess--;
//                 }
//                 excessmap.set(elem.element, elemexcess);

//             }
//             if (amountneeded > 0) {
//                 console.log(`depth: ${Math.ceil(depth / element.n) * amountneeded}, elemn: ${amountneeded}, elem: ${elem.element}`);
            
//                 tocores(Math.ceil(depth / element.n) * amountneeded, elem.element);
//             }
//         }
//     }
// }



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