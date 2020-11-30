//650
let input = "59731816011884092945351508129673371014862103878684944826017645844741545300230138932831133873839512146713127268759974246245502075014905070039532876129205215417851534077861438833829150700128859789264910166202535524896960863759734991379392200570075995540154404564759515739872348617947354357737896622983395480822393561314056840468397927687908512181180566958267371679145705350771757054349846320639601111983284494477902984330803048219450650034662420834263425046219982608792077128250835515865313986075722145069152768623913680721193045475863879571787112159970381407518157406924221437152946039000886837781446203456224983154446561285113664381711600293030463013";
let input0 = input;
let sample = "03036732577212944063491565474664";
let sample0 = sample;



let offset = 303673;

let pattern = [0,1,0,-1];
//actual input is input repeated 10k times :(
for(var i = 0; i < 9; i++){
    sample = sample + sample0;
}

let inputarr = sample.split('');
inputarr = inputarr.map(v => parseInt(v,10));

let phasestorun = 100;
for(var i = 0; i < phasestorun; i++) {
    let phasearr = [];
    for(var j = 1; j <= inputarr.length; j++) {
        //for every element
        //generate pattern
        let pattern = generatepatter(j);
        let row = "";
        let sum = 0;
        //we really only need to look at elements that do not have a 0 multiplier. whats the easiest way to do this?
        //also, we should be able to break down the calculation into sections based on our pattern so that we get a full set
        for(var k = 0; k < inputarr.length; k++) {
            let element = inputarr[k];
            row += `${element}*${pattern[(k+1)%pattern.length]} + `;
            sum += (element * pattern[(k+1)%pattern.length]);
        }
        phasearr.push(Math.floor(Math.abs(sum) % 10));
        //if(j % 1000000 === 0) console.log(`Element ${j} completed!`);
        console.log(row);
    }
    console.log(`Phase complete! ${phasearr.join("")}`);
    inputarr = phasearr;
}
console.log(inputarr.join(""));

//39563579 is too low

function generatepatter(elementn) {
    let newarr = [];
    for(var i = 0; i < pattern.length; i++){
        for(var j = 0; j < elementn; j++){
            newarr.push(pattern[i]);
        }
    }
    return newarr;
}
