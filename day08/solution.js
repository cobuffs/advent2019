const fs = require('fs');
const inputs = fs.readFileSync('input.txt').toString().split("\n");

const input = inputs[0];11
const inputarr = input.split('');
const width = 25;
const height = 6;
let imagelayers = new Array();

for(var i = 0; i < inputarr.length; i++) {
    if(i % (width*height) === 0) {
        //need a new layer
        imagelayers.push(initlayer());
    }

    let layernum = Math.floor(i / (width*height));
    let remainder = i % (width*height); //0 - 149
    let column = remainder % width; //0 - 24
    let row = Math.floor(remainder / width); //0 - 5

    let layer = imagelayers[layernum];
    layer[row][column] = parseInt(inputarr[i],10);
    //console.log(`[${row}][${column}] of layer ${layernum} is ${layer[row][column]}`);

}

function initlayer() {
    let layer = new Array(height);
    for(var i = 0; i < layer.length; i++) {
        layer[i] = new Array(width);
    }
    return layer;
}

console.log(input.length);

//find the layer that contains the fewest 0 digits. On that layer, what is the number of 1 digits multiplied by the number of 2 digits?

//which layer has the fewest 0 digits
let minZero = 100000000;
let layern = -1;

for(var i = 0; i < imagelayers.length; i++) {
    let count = countforlayer(imagelayers[i],0);
    if(count < minZero) {
        minZero = count;
        layern = i;
    }
}

let check = countforlayer(imagelayers[layern], 1) * countforlayer(imagelayers[layern], 2);

console.log(`zero count ${minZero} in layer ${layern}. p1 is ${check}\r\n`);
printlayer(buildpicture());

function countforlayer(layer, n) {
    let sum = 0;
    for(var i = 0; i < layer.length; i++) {
        for(var j = 0; j < layer[i].length; j++) {
            if(n === layer[i][j]) sum++;
        }
    }
    return sum;
}

//0 is black, 1 is white, and 2 is transparent.


function buildpicture() {
    let picture = initlayer();
    for(var i = 0; i < picture.length; i++) {
        for(var j = 0; j < picture[i].length; j++) {
            //dig through layers until we hit a 0 or 1
            for(var d = 0; d < imagelayers.length; d++) {
                let layer = imagelayers[d];
                if (layer[i][j] === 1) {
                    picture[i][j] = 1;
                    break;
                } else if (layer[i][j] === 0) {
                    picture[i][j] = " "
                    break;
                }
            }
        }
    }
    return picture;
}

function printlayer(layer) {
    let output = "";
    for(var i = 0; i < layer.length; i++) {
        for(var j = 0; j < layer[i].length; j++) {
            output = output+layer[i][j];
        }
        output = output + '\r\n'
    }
    output = output + '\r\n'
    console.log(output);
}