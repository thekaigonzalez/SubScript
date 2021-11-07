const subscript_parser = require("./subscript_parser")
const deepslate = require("DeepSlate");
const SubSAST = subscript_parser.GenAST

function b_println(args) {
    console.log(args[0])
}

var mod = {
    "std": {
        "println": b_println,
        "argv": process.argv,
        "basic": "Test"
    }
}

function EvaluatorAST(str) {
    let ast = SubSAST(str);
    if (ast.val != null && typeof deepslate.traverse(mod, ast.val.accessor) == "function") {
        // console.log(ast.val.accessor)
        return deepslate.traverse(mod, ast.val.accessor)(ast.val.argv) || null
    } else if (ast.val != null && typeof deepslate.traverse(mod, ast.val.accessor) != 'function') {
        return deepslate.traverse(mod, ast.val.accessor)
    }
}

module.exports.Eval = EvaluatorAST