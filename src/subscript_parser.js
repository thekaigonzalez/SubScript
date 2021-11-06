// SubScript parser

let TK_OP = '('
let TK_CL = ')';
let TK_SEP = ','
let TK_SPACE = ' '
let TK_ASSIGN = '='
let TK_STRCHAR = "'"

let STATE_TRAILING = 199
let STATE_RESET = 0
let STATE_EXPECT = 777
let STATE_IDLE = -1


function SSAst(string) {
    let buf = "";

    let accessF = "";

    let key = "";

    let iskey = false;

    let arch = 0;
    
    let state = STATE_IDLE

    let args = [];

    for ( let i = 0; i < string.length; ++ i ) {
        if (string[i] == TK_OP) {
            accessF = "";
            // console.log("Buffer: " + buf)
            state = STATE_TRAILING
            accessF = buf;
            // console.log(accessF)
            buf = "";
        } else if (string[i] == TK_CL && state == STATE_TRAILING) {
            if (buf.length > 0) {
                // console.log(buf + " arg")
                args.push(buf);
                buf = ""
                state = STATE_RESET
            }
            state = STATE_RESET
            break;
        } else if (string[i] == TK_SEP && state == STATE_TRAILING) {
            args.push(buf);
            buf = "";
        } else if (string[i] == TK_SPACE && state == STATE_IDLE) {
            key = buf;
            state = STATE_TRAILING
            iskey = true;
            buf = "";
        } else if (string[i] == TK_ASSIGN && state == STATE_TRAILING && iskey) { /* it's an assignment */
           accessF = buf;
           buf = ""; 
        } else if (string[i] == TK_STRCHAR && state != 999) {
            arch = state
            state = 999
        } else if (string[i] == TK_STRCHAR && state == 999) {
            state = arch
        }
        else {
            buf = buf + string[i];
        }
    }
    if (buf.length > 0 && state == STATE_TRAILING) {
        args.push(buf.trim());
        buf = "";
    } 
    else if (buf.length > 0 && state == STATE_EXPECT && iskey) {
        state = STATE_RESET
        let val = buf;
        buf = "";

        return {
            "assign": {
                "value": val.trim(),
                "name": accessF.trim()
            }
        }
    }
    return {
        "val": {
            "accessor": accessF.trim(),
            "argv": args
        }
    }
}

module.exports.GenAST = SSAst