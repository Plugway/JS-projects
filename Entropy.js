"use strict";
function log(number, base)
{
    return Math.log(number)/Math.log(base);
}

function textAnalize(input)
{
    var A = {};
    for (var i in input)
    {
        var char = input.charAt(i);
        if(A[char] === undefined)
            A[char] = 1;
        else
            A[char] += 1;
    }
    return A;
}

function frequencyCalc(A)
{
    for(var i in A)
    {
        A[i] = A[i]/input.length;
    }
}
function len(A)
{
    var count = 0;
    for (var i in  A)
    {
        count += 1;
    }
    return count;
}
function entropy(A, base, len)//A.length, 2
{
    if(len === 1)
        return 0;
    var entropy = 0;
    for(var i in A)
    {
        entropy += A[i]*log(A[i], base);
    }
    return -entropy;
}

var input = '';
var A = textAnalize(input);
frequencyCalc(A);
var lend = len(A);
console.log( entropy(A, lend, lend));
console.log( entropy(A, 2, lend));
