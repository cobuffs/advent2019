let program = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,32,43,225,101,68,192,224,1001,224,-160,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1001,118,77,224,1001,224,-87,224,4,224,102,8,223,223,1001,224,6,224,1,223,224,223,1102,5,19,225,1102,74,50,224,101,-3700,224,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,1102,89,18,225,1002,14,72,224,1001,224,-3096,224,4,224,102,8,223,223,101,5,224,224,1,223,224,223,1101,34,53,225,1102,54,10,225,1,113,61,224,101,-39,224,224,4,224,102,8,223,223,101,2,224,224,1,223,224,223,1101,31,61,224,101,-92,224,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1102,75,18,225,102,48,87,224,101,-4272,224,224,4,224,102,8,223,223,1001,224,7,224,1,224,223,223,1101,23,92,225,2,165,218,224,101,-3675,224,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,8,49,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,226,226,224,1002,223,2,223,1005,224,329,1001,223,1,223,1007,677,226,224,1002,223,2,223,1006,224,344,1001,223,1,223,108,677,226,224,102,2,223,223,1006,224,359,1001,223,1,223,7,226,226,224,1002,223,2,223,1005,224,374,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,404,1001,223,1,223,1107,677,226,224,1002,223,2,223,1005,224,419,1001,223,1,223,108,226,226,224,102,2,223,223,1006,224,434,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,449,1001,223,1,223,1108,677,226,224,102,2,223,223,1005,224,464,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,479,1001,223,1,223,1008,226,226,224,102,2,223,223,1005,224,494,101,1,223,223,7,677,226,224,1002,223,2,223,1005,224,509,101,1,223,223,8,226,677,224,1002,223,2,223,1006,224,524,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,539,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,554,101,1,223,223,1108,677,677,224,102,2,223,223,1006,224,569,101,1,223,223,1107,226,677,224,102,2,223,223,1005,224,584,1001,223,1,223,8,677,226,224,1002,223,2,223,1006,224,599,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,614,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,629,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,644,101,1,223,223,8,677,677,224,102,2,223,223,1005,224,659,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,674,101,1,223,223,4,223,99,226];
let input = 5;
runprog(program);

function runprog(program) {
    let terminate = false;
    for(var i = 0; i < program.length && !terminate;) {
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
                program[param1] = input;
                i++;
                break;
            case 4:
                //Opcode 4 outputs the value of its only parameter
                param1 = program[++i];
                param1v = param1mode === 0 ? program[param1] : param1;
                console.log(param1v);
                i++;
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
                console.log("terminated");
                break;
        }

    }
}