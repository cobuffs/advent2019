var fs = require('fs');
//var testops = fs.readFileSync('input1.txt').toString().split("\n");
//testops = testops[0].split(',');
var noun = 0;
var verb = 0;
for(var j = 0; j < 100; j++){ 
    for(var k = 0; k < 100; k++){
        var noun = j;
        var verb = k;
        var testops = [1,noun,verb,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,13,19,1,9,19,23,2,13,23,27,2,27,13,31,2,31,10,35,1,6,35,39,1,5,39,43,1,10,43,47,1,5,47,51,1,13,51,55,2,55,9,59,1,6,59,63,1,13,63,67,1,6,67,71,1,71,10,75,2,13,75,79,1,5,79,83,2,83,6,87,1,6,87,91,1,91,13,95,1,95,13,99,2,99,13,103,1,103,5,107,2,107,10,111,1,5,111,115,1,2,115,119,1,119,6,0,99,2,0,14,0];
        for(var i = 0;i < testops.length; i = i+4) {
            var instruction = parseInt(testops[i],10);
            if(instruction == 1) {
                //add
                let index1 = parseInt(testops[i+1],10);
                let index2 = parseInt(testops[i+2],10);
                let destination = parseInt(testops[i+3],10);
                testops[destination] = testops[index1] + testops[index2];
            } else if(instruction == 2) {
                //multiple
                let index1 = parseInt(testops[i+1],10);
                let index2 = parseInt(testops[i+2],10);
                let destination = parseInt(testops[i+3],10);
                testops[destination] = testops[index1] * testops[index2];
            } else if(instruction == 99) {
                //end
                if(testops[0] === 19690720) {
                    console.log(100*noun+verb);
                }
                break;
            } else {
                console.log("problem");
            }
        }
        
    }
}
for(var i = 0;i < testops.length; i = i+4) {
    var instruction = parseInt(testops[i],10);
    if(instruction == 1) {
        //add
        let index1 = parseInt(testops[i+1],10);
        let index2 = parseInt(testops[i+2],10);
        let destination = parseInt(testops[i+3],10);
        testops[destination] = testops[index1] + testops[index2];
    } else if(instruction == 2) {
        //multiple
        let index1 = parseInt(testops[i+1],10);
        let index2 = parseInt(testops[i+2],10);
        let destination = parseInt(testops[i+3],10);
        testops[destination] = testops[index1] * testops[index2];
    } else if(instruction == 99) {
        //end
        console.log("0: " + testops[0]);
        break;
    } else {
        console.log("problem");
    }
}
