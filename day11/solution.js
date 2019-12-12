let program = [3,8,1005,8,319,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,28,2,1105,12,10,1006,0,12,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,58,2,107,7,10,1006,0,38,2,1008,3,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,90,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,112,1006,0,65,1,1103,1,10,1006,0,91,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,144,1006,0,32,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,169,1,109,12,10,1006,0,96,1006,0,5,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,201,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,223,1,4,9,10,2,8,5,10,1,3,4,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,257,1,1,9,10,1006,0,87,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,287,2,1105,20,10,1,1006,3,10,1,3,4,10,101,1,9,9,1007,9,1002,10,1005,10,15,99,109,641,104,0,104,1,21102,1,932972962600,1,21101,0,336,0,1106,0,440,21101,838483681940,0,1,21101,0,347,0,1106,0,440,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,3375393987,0,1,21101,394,0,0,1105,1,440,21102,46174071847,1,1,21102,1,405,0,1106,0,440,3,10,104,0,104,0,3,10,104,0,104,0,21101,988648461076,0,1,21101,428,0,0,1106,0,440,21101,0,709580452200,1,21101,439,0,0,1105,1,440,99,109,2,22101,0,-1,1,21101,40,0,2,21102,1,471,3,21102,461,1,0,1106,0,504,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,466,467,482,4,0,1001,466,1,466,108,4,466,10,1006,10,498,1102,0,1,466,109,-2,2105,1,0,0,109,4,1202,-1,1,503,1207,-3,0,10,1006,10,521,21102,1,0,-3,22102,1,-3,1,21201,-2,0,2,21101,0,1,3,21102,540,1,0,1106,0,545,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,568,2207,-4,-2,10,1006,10,568,22101,0,-4,-4,1105,1,636,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,1,587,0,1105,1,545,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,606,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,628,21201,-1,0,1,21101,0,628,0,106,0,503,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0];
console.log(program.length);
// provide 0 if the robot is over a black panel or 1 if the robot is over a white panel
let programpointer = 0;
let panels = new Map();
//init with 0,0
let loc = buildnewpanel(0,0);
let relativebase = 0;

loc.color = "#";
let dirs = ["^",">","v","<"];
panels.set(loc.key, loc);


let robot = {"currentloc":loc, "facing":"^", "panelspainted": 0, "program": program.slice()};

let xmin = 0;
let xmax = 0;
let ymin = 0;
let ymax = 0;

while(true) {
    //run the program and get the output
    let outs = runprog(robot.program, [robot.currentloc.color === "." ? 0 : 1], programpointer, 2, relativebase);
    if(outs.length !== 2) break;
    programpointer = outs[1].pointer;
        
    //if 0, paint it black, if 1 paint it white
    let currentcolor = robot.currentloc.color;
    if(outs[0].output === 0) {
        robot.currentloc.color = "."
    } else robot.currentloc.color = "#";
    if (robot.currentloc.color !== currentcolor) robot.currentloc.painted = true;;

    //0 turn left, 1 turn right
    let curindex = dirs.indexOf(robot.facing);
    if(curindex === -1) {
        console.log("UH OH");
        break;
    }
    if(outs[1].output === 0) {
        curindex--;
        if (curindex === -1) curindex = 3;
    } else {
        curindex++;
        if (curindex === 4) curindex = 0;
    }
    robot.facing = dirs[curindex];
    relativebase = outs[1].relativebase;

    let point = {"x": robot.currentloc.x, "y":robot.currentloc.y};
    switch(robot.facing) {
        case "^":
            point.y++;
            break;
        case ">":
            point.x++
            break;
        case "v":
            point.y--;
            break;
        case "<":
            point.x--;
            break;
    }

    let newpoint = buildnewpanel(point.x, point.y);
    //see if its in the map
    if (panels.has(newpoint.key)) {
        newpoint = panels.get(newpoint.key);
    } else panels.set(newpoint.key, newpoint);
    robot.currentloc = newpoint;

    //check controls
    if(xmin > robot.currentloc.x) xmin = robot.currentloc.x;
    if(xmax < robot.currentloc.x) xmax = robot.currentloc.x;
    if(ymin > robot.currentloc.y) ymin = robot.currentloc.y;
    if(ymax < robot.currentloc.y) ymax = robot.currentloc.y;
}

let panelspainted = 0;
//2212
for (var [k, v] of panels.entries()) {
    if(v.painted) panelspainted++;
}
console.log(panelspainted);

//make some arrays
let output = "";

for(var i = Math.abs(ymin) + ymax; i >= 0; i--) {
    for(var j = 0; j <= Math.abs(xmin) + xmax; j++) {
        let color = ".";
        if(panels.has(`${xmin+j},${ymin+i}`)) color = panels.get(`${xmin+j},${ymin+i}`).color;
        output += color;
    }
    output = output + "\r\n";
}
console.log(output);

function buildnewpanel(x,y) {
    return {"key":`${x},${y}`, "x":x, "y":y, "color":'.', "painted": false};
}

function runprog(program, inputs, programpointer, outs, relativebase) {
    let inputpointer = 0;
    let terminate = false;
    //let relativebase = 0;
    let loops = 0;
    let rout = [];
    for(var i = programpointer; i < program.length && !terminate;) {
        //console.log(`${++loops}, ${i}`);
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
                //param1 = program[++i];
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                sum = param1v + param2v;
                param3 = accessinstruction(program, ++i);;
                if(param3mode === 1) {
                    if(param3 >= program.length) growprogram(program, param3);
                    program[param3] = sum;
                }
                else program[getindex(param3mode, param3, program, relativebase)] = sum;
                i++;
                break;
            case 2:
                //Opcode 2 works exactly like opcode 1, except it multiplies the two inputs instead of adding them
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                product = param1v * param2v;
                param3 = accessinstruction(program, ++i);
                if(param3mode === 1) {
                    if(param3 >= program.length) growprogram(program, param3);
                    program[param3] = product;
                }
                else program[getindex(param3mode, param3, program, relativebase)] = product;
                i++;
                break;
            case 3:
                //Opcode 3 takes a single integer as input and saves it to the position given by its only parameter
                param1 = accessinstruction(program, ++i);
                switch(param1mode) {
                    case 0:
                        if(param1 >= program.length) growprogram(program, param1);
                        program[param1]  = inputs[inputpointer++];
                        break;
                    case 1:
                        break;
                    case 2:
                        if((relativebase + param1) >= program.length) growprogram(program, (relativebase + param1));
                        program[param1 + relativebase] = inputs[inputpointer++];
                        break;
                }
                i++;
                break;
            case 4:
                //Opcode 4 outputs the value of its only parameter
                param1 = program[++i];
                param1v = getvalue(param1mode, param1, program, relativebase);
                i++;
                //console.log({"output": param1v, "pointer": i});
                rout.push({"output": param1v, "pointer": i, "relativebase": relativebase});
                break;
            case 5:
                //if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                if(param1v !== 0) i = param2v;
                else i++;
                if(i >= program.length) growprogram(program, i);
                break;
            case 6:
                //if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                if(param1v === 0) i = param2v;
                else i++;
                break;
            case 7:
                //if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                param3 = accessinstruction(program, ++i);
                if(param3mode === 1) {
                    if(param3 >= program.length) growprogram(program, param3);
                    program[param3] = param1v < param2v ? 1 : 0;
                }
                else program[getindex(param3mode, param3, program, relativebase)] = param1v < param2v ? 1 : 0;
                i++;
                break;
            case 8:
                param1 = accessinstruction(program, ++i);
                param1v = getvalue(param1mode, param1, program, relativebase);
                param2 = accessinstruction(program, ++i);
                param2v = getvalue(param2mode, param2, program, relativebase);
                param3 = accessinstruction(program, ++i);
                if(param3mode === 1) {
                    if(param3 >= program.length) growprogram(program, param3);
                    program[param3] = param1v === param2v ? 1 : 0; 
                }
                else program[getindex(param3mode, param3, program, relativebase)] = param1v === param2v ? 1 : 0; 
                i++;
                break;
            case 9:
                //opcode 9 adjusts the relative base by the value of its only parameter. The relative base increases (or decreases, if the value is negative) by the value of the parameter.
                param1 = accessinstruction(program, ++i);
                
                switch(param1mode) {
                    case 0:
                        if(param1 >= program.length) growprogram(program, param1);
                        relativebase += program[param1];
                        break;
                    case 1:
                        relativebase += param1;
                        break;
                    case 2:
                        if((relativebase + param1) >= program.length) growprogram(program, (relativebase + param1));
                        relativebase += program[(relativebase + param1)];
                        break;
                }
                i++;
                break;
            case 99:
                terminate = true;
                //console.log("HALT");
                //rout.push({"output": "HALT", "pointer": i});
                return {"output": "HALT", "pointer": i, "relativebase": relativebase};
                break;
        }
        if(rout.length === outs) return rout;

    }
    return {"output": "DONE", "pointer": 0};
}

function getvalue(parammode, param, program, relativebase) {
    switch(parammode) {
        case 0:
            if(param >= program.length) growprogram(program, param);
            return program[param];
        case 1:
            //if(param >= program.length) growprogram(program, param);
            return param;
        case 2:
            if((relativebase + param) >= program.length) growprogram(program, (relativebase + param));
            return program[relativebase + param];
    }
}

function accessinstruction(program, index) {
    if(index >= program.length) {
        growprogram(program, index);
    }
    return program[index];
}

function getindex(parammode, param, program, relativebase) {
    switch(parammode) {
        case 0:
            if(param >= program.length) growprogram(program, param);
            return param;
        case 1:
            if(param >= program.length) growprogram(program, param);
            return param;
        case 2:
            if((relativebase + param) >= program.length) growprogram(program, (relativebase + param));
            return relativebase + param;
    }
}

function growprogram(program, newindex) {
    for(var i = program.length; i <= newindex; i++) {
        program.push(0);
    }
}