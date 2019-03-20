"use strict";

function fromFloat(input)
{
    switch(input)
    {
        case '00000000000000000000000000000000':
            return 0;
            break;
        case '10000000000000000000000000000000':
            return -0;
            break;
        case '01111111100000000000000000000000':
            return Infinity;
            break;
        case '11111111100000000000000000000000':
            return -Infinity;
            break;
    }
    if (input.length !== 32 || input === '01111111110000000000000000000000')
        return NaN;
    var sign = input.substring(0, 1), exponent = input.substring(1, 9), mantissa = input.substring(9, input.left);
    exponent = parseInt(exponent, 2) - 127;
    mantissa = parseInt(mantissa, 2)/Math.pow(2, 23) + 1;

    return Math.pow(-1, sign) * mantissa * Math.pow(2, exponent);
}

function toFloat(input)
{
    switch(input)
    {
        case 0:
            return '00000000000000000000000000000000';
            break;
        case -0:
            return '10000000000000000000000000000000';
            break;
        case Infinity:
            return '01111111100000000000000000000000';
            break;
        case -Infinity:
            return '11111111100000000000000000000000';
            break;
    }
    if(isNaN(input))
        return NaN;
    var result, exp, max, min, interval,M;
    if(input < 0)
    {
        result = '1';
        input *= -1;
    }
    else
        result = '0';

    for(var i = -126;; i++)
    {
        if(Math.pow(2, i) > input)
        {
            max = Math.pow(2, i);
            min = Math.pow(2, i-1);
            exp = i+126;
            for(var n = 8 - exp.toString(2).length; n > 0; n--)
                result += '0';
            break;
        }
    }
    result += exp.toString(2);

    interval = (input - min)/(max-min);
    M = (Math.round(Math.pow(2, 23) * interval)).toString(2);
    for(var j = 0; j < 23 - M.length; j++)
        result += '0';
    result += M;
    return result;
}
var input = 123.45678;
var output = toFloat(input);
var input1 = output;
var output1 = fromFloat(input1);
console.log(output, output1);
