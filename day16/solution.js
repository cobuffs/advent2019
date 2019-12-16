let input = "59731816011884092945351508129673371014862103878684944826017645844741545300230138932831133873839512146713127268759974246245502075014905070039532876129205215417851534077861438833829150700128859789264910166202535524896960863759734991379392200570075995540154404564759515739872348617947354357737896622983395480822393561314056840468397927687908512181180566958267371679145705350771757054349846320639601111983284494477902984330803048219450650034662420834263425046219982608792077128250835515865313986075722145069152768623913680721193045475863879571787112159970381407518157406924221437152946039000886837781446203456224983154446561285113664381711600293030463013";

let sample0 = "80871224585914546619083218645595";
let sample1 = "19617804207202209144916044189917";
let sample2 = "69317163492948606335995924319873";
let sample3 = "12345678"

let offset = 5973181;

let pattern = [0,1,0,-1];

let inputarr = input.split('');
console.log(inputarr.length);
inputarr = inputarr.map(v => parseInt(v,10));

//run for 4 phases
let phasestorun = 100;
for(var i = 0; i < phasestorun; i++) {
    let phasearr = [];
    for(var j = 1; j <= inputarr.length; j++) {
        //for every element
        //generate pattern
        let pattern = generatepatter(j);
        let row = "";
        let sum = 0;
        for(var k = 0; k < inputarr.length; k++) {
            let element = inputarr[k];
            row += `${element}*${pattern[(k+1)%pattern.length]} + `;
            sum += (element * pattern[(k+1)%pattern.length]);
        }
        phasearr.push(Math.floor(Math.abs(sum) % 10));
        //console.log(row);
    }
    inputarr = phasearr;
}
console.log(inputarr);

function generatepatter(elementn) {
    let newarr = [];
    for(var i = 0; i < pattern.length; i++){
        for(var j = 0; j < elementn; j++){
            newarr.push(pattern[i]);
        }
    }
    return newarr;
}
