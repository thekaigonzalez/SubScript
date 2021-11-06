const subscript_parser = require("./subscript_parser")
const deepslate = require("DeepSlate.js");
const SubSAST = subscript_parser.GenAST

function b_println(args) {
    console.log(args[0])
    return "null"
}

var mod = {
    "std": {
        "println": b_println
    }
}

function EvaluatorAST(str) {
    let ast = SubSAST(str);
    if (ast.val != null) {
        // console.log(ast.val.accessor)
        return deepslate.traverse(mod, ast.val.accessor)(ast.val.argv)
    }
}

module.exports.Eval = EvaluatorAST