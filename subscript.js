const subscript = require("./src/subscript_eval")

const prompt = require("prompt-sync")();

console.log("SubScript Interactive Console v1.0")

while (true) {
    const code = prompt(">>>")
    console.log(subscript.Eval(code))
}