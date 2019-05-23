"use strict";

function IsDelimiter(c)
{
    return ' ='.indexOf(c) != -1;
}
function IsOperator(c)
{
    return '+-/*^'.indexOf(c) != -1;
}
function IsDigit(c)
{
    return '1234567890'.indexOf(c) != -1;
}
function GetPriority(c)
{
    const priorities = {
        '+':2,
        '-':2,
        '*':3,
        '/':3,
        '^':4};
    if (priorities.hasOwnProperty(c))
        return priorities[c];
    else
        return -1;
}
function GetAssociativity(c)
{
    const priorities = {
        '+':'Left',
        '-':'Left',
        '*':'Left',
        '/':'Left',
        '^':'Right'};
    if (priorities.hasOwnProperty(c))
        return priorities[c];
    else
        return 'none';
}

function toPostfix(input)
{
    input = input.replace(/\s+/g, '');
    var stack = [];
    var token;
    var postfix = '';
    var o1, o2;
    stack.peek = function () {
        return this[this.length - 1];
    };
    
    for (var i = 0; i < input.length; i++)
    {
        token = input[i];
        if (IsDigit(token))
        {
            postfix += token;
            if (!IsDigit(input[i+1]))
                postfix += ' ';
        }
        else if (IsOperator(token)) 
        {
            if (!('(' == input[i+1] || IsDigit(input[i+1])) || !(')' == input[i-1] || IsDigit(input[i-1])))
                throw Error(`Operator error: ${token} is waiting for second exp.`);
            o1 = token;
            o2 = stack.peek();
            while (IsOperator(o2) && ((GetAssociativity(o1) == "Left" && (GetPriority(o1) <= GetPriority(o2)) || (GetAssociativity(o1) == "Right" && (GetPriority(o1) < GetPriority(o2))))))
            {
                postfix += o2 + ' ';
                stack.pop();
                o2 = stack.peek();
            }
            stack.push(o1);
        }
        else if (token == '(')
            stack.push(token);
        else  if (token == ')')
        {
            if (stack.indexOf('(') == -1)
                throw Error(`Bracket error: ${')'} is not opened.`);
            while (stack.peek() != '(')
            {
                postfix += stack.pop() + ' ';
            }
            stack.pop();
        }
    }
    while (stack.length > 0)
    {
        var char = stack.pop();
        if (char == '(')
            throw Error(`Bracket error: ${char} is not closed.`);
        postfix += char + ' ';
    }
    if (postfix[postfix.length - 1] == ' ')
        postfix = postfix.substr(0, postfix.length - 1);
    return postfix;
}
const Associativity = {
    /** a / b / c = (a / b) / c */
    left: 0,
    /** a ^ b ^ c = a ^ (b ^ c) */
    right: 1,
    /** a + b + c = (a + b) + c = a + (b + c) */
    both: 2,
};
const operators = {
    '+': { precedence: 2, associativity: Associativity.both },
    '-': { precedence: 2, associativity: Associativity.left },
    '*': { precedence: 3, associativity: Associativity.both },
    '/': { precedence: 3, associativity: Associativity.left },
    '^': { precedence: 4, associativity: Associativity.right },
};
class NumberNode {
    constructor(text) { this.text = text; }
    toString() { return this.text; }
}
class InfixNode {
    constructor(fnname, operands) {
        this.fnname = fnname;
        this.operands = operands;
    }
    toString(parentPrecedence = 0) {
        const op = operators[this.fnname];
        const leftAdd = op.associativity === Associativity.right ? 0.01 : 0;
        const rightAdd = op.associativity === Associativity.left ? 0.01 : 0;
        if (this.operands.length !== 2) throw Error("invalid operand count");
        const result = this.operands[0].toString(op.precedence + leftAdd)
            +` ${this.fnname} ${this.operands[1].toString(op.precedence + rightAdd)}`;
        if (parentPrecedence > op.precedence) return `( ${result} )`;
        else return result;
    }
}
function toInfix(tokens) {
    const stack = [];
    //console.log(`input = ${tokens}`);
    for (const token of tokens.split(" ")) {
        if (token in operators) {
            const op = operators[token], arity = 2; // all of these operators take 2 arguments
            if (stack.length < arity) throw Error("stack error");
            stack.push(new InfixNode(token, stack.splice(stack.length - arity)));
        } else stack.push(new NumberNode(token));
        //console.log(`read ${token}, stack = [${stack.join(", ")}]`);
    }
    if (stack.length !== 1) throw Error("stack error " + stack);
    return stack[0];
}

var infix = '3-5*(8+4)';
var postfix = toPostfix(infix);
console.log(postfix);
console.log(toInfix(postfix).toString());
