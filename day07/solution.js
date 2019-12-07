const program = [3,8,1001,8,10,8,105,1,0,0,21,38,63,76,93,118,199,280,361,442,99999,3,9,101,3,9,9,102,3,9,9,101,4,9,9,4,9,99,3,9,1002,9,2,9,101,5,9,9,1002,9,5,9,101,5,9,9,1002,9,4,9,4,9,99,3,9,101,2,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,1002,9,5,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99];
//const program = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
//const program = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

let signals = [];
let phasecombinations = [];

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
  
    permute(inputArr)
  
    return result;
}

//phasecombinations = permutator([0,1,2,3,4]);
phasecombinations = permutator([5,6,7,8,9]);

for(var i = 0; i < phasecombinations.length; i++){
    let ampaprog = program.slice();
    let ampbprog = program.slice();
    let ampcprog = program.slice();
    let ampdprog = program.slice();
    let ampeprog = program.slice();

    let phasesetting = phasecombinations[i];
    let ampeout = {"output":-1, "pointer": 0};
    let ampaout = {"output":-1, "pointer": 0};
    let ampbout = {"output":-1, "pointer": 0};
    let ampcout = {"output":-1, "pointer": 0};
    let ampdout = {"output":-1, "pointer": 0};

    ampaout = runprog(ampaprog, [phasesetting[0], ampeout.output === -1 ? 0 : ampeout.output], ampaout.pointer);
    ampbout = runprog(ampbprog, [phasesetting[1],ampaout.output], ampbout.pointer);
    ampcout = runprog(ampcprog, [phasesetting[2],ampbout.output], ampcout.pointer);
    ampdout = runprog(ampdprog, [phasesetting[3],ampcout.output], ampdout.pointer);
    ampeout = runprog(ampeprog, [phasesetting[4],ampdout.output], ampeout.pointer);

    //run each amplifier
    while(true) {
        ampaout = runprog(ampaprog, [ampeout.output === -1 ? 0 : ampeout.output], ampaout.pointer);
        if(ampaout.output === "HALT") break;
        ampbout = runprog(ampbprog, [ampaout.output], ampbout.pointer);
        ampcout = runprog(ampcprog, [ampbout.output], ampcout.pointer);
        ampdout = runprog(ampdprog, [ampcout.output], ampdout.pointer);
        ampeout = runprog(ampeprog, [ampdout.output], ampeout.pointer);
    }
    signals.push(ampeout.output);
    //console.log("halted!");

}

//find the max
let max = 0
for (var i = 0; i < signals.length; i++) {
    if(signals[i] > max) max = signals[i];
}
console.log(max);

function runprog(program, inputs, programpointer) {
    let inputpointer = 0;
    let terminate = false;
    for(var i = programpointer; i < program.length && !terminate;) {
        let instruction = program[i].toString();
        //ABCDE - DE is 2 digit Opscode, C is mode of 1st param, B mode of 2nd param, A mode 3rd param
        //add 0's until it is 5 digits
        while(instruction.length !== 5) {
            instruction = "0" + instruction;
        }
        let opscode = parseInt(instruction.substring(3),10);
        let param1mode = parseInt(instruction.substring(2,3),10);
        let param2mode = parseInt(instruction.substring(1,2),10);
        let param3mode = parseInt(instruction.substring(0,1),10);

        switch(opscode) {
            case 1:
                //Opcode 1 adds together numbers read from two positions and stores the result in a third position
                var param1 = program[++i];
                var param1v = param1mode === 0 ? program[param1] : param1;
                var param2 = program[++i];
                var param2v = param2mode === 0 ? program[param2] : param2;
                var sum = param1v + param2v;
                var param3 = program[++i];
                program[param3] = sum;
                i++;
                break;
            case 2:
                //Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                param2 = program[++i];
                param2v = param2mode === 0 ? program[param2] : param2;
                product = param1v * param2v;
                param3 = program[++i];
                program[param3] = product;
                i++;
                break;
            case 3:
                //Opcode 3 takes a single integer as input and saves it to the position given by its only parameter
                param1 = program[++i];
                program[param1] = inputs[inputpointer++];
                i++;
                break;
            case 4:
                //Opcode 4 outputs the value of its only parameter
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                i++;
                //console.log({"output": param1v, "pointer": i});
                return {"output": param1v, "pointer": i};
                break;
            case 5:
                //if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                param2 = program[++i];
                param2v = param2mode === 0 ? program[param2] : param2;
                if(param1v !== 0) i = param2v;
                else i++;
                break;
            case 6:
                //if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                param2 = program[++i];
                param2v = param2mode === 0 ? program[param2] : param2;
                if(param1v === 0) i = param2v;
                else i++;
                break;
            case 7:
                //if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                param2 = program[++i];
                param2v = param2mode === 0 ? program[param2] : param2;
                param3 = program[++i];
                program[param3] = param1v < param2v ? 1 : 0;
                i++;
                break;
            case 8:
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                param2 = program[++i];
                param2v = param2mode === 0 ? program[param2] : param2;
                param3 = program[++i];
                program[param3] = param1v === param2v ? 1 : 0;                    i++;
                break;
            case 99:
                terminate = true;
                //consoleconsole.log("terminated");
                return {"output": "HALT", "pointer": i};;
                break;
        }

    }
}