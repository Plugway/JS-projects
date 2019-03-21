"use strict";


function isSequence(str)
{
    var count = 1;
    var etalon = str.charAt(0);
    for (var j = 1; j < str.length; j++)
    {
        if(str.charAt(j) === etalon)
            count++;
    }
    return count === str.length;
}

function countSeq(seqStr)
{
    var etalon = seqStr.charAt(0);
    for (var count = 1;; count++)
    {
        if (seqStr.charAt(count) !== etalon)
            break;
    }
    return count;
}
function encode(input)
{
    var output = '';
    for (var i = 0; i < input.length;)
    {
        if (input.length - i >= 4)
        {
            var seqStr = input.substring(i, i + 4);
            if(isSequence(seqStr))
            {
                seqStr = input.substring(i);
                var n = countSeq(seqStr);
                if (seqStr.charAt(0) === '#')
                    for(var k = 0; k < Math.floor(n/255)+1; k++)
                    {
                        if(!(k + 1 < Math.floor(n / 255) + 1))
                            output += ('#' + String.fromCharCode((n % 255)) + seqStr.charAt(0));
                        else
                            output += ('#' + String.fromCharCode(255) + seqStr.charAt(0));
                    }
                else
                    for(var l = 0; l < Math.floor(n/259)+1; l++)
                    {
                        if(!(l + 1 < Math.floor(n / 259) + 1))
                            output += ('#' + String.fromCharCode ((n % 255 - 4)) + seqStr.charAt(0));
                        else
                            output += ('#' + String.fromCharCode( 255) + seqStr.charAt(0));
                    }
                i += n;
            }
            else if (input.charAt(i) === '#')
            {
                seqStr = input.substring(i);
                n = countSeq(seqStr);
                output += ('#' + String.fromCharCode ((n-1)) + seqStr.charAt(0));
                i += n;
            }
            else
            {
                output += input.charAt(i);
                i++;
            }
        }
        else
        {
            output += input.charAt(i);
            i++;
        }
    }
    return output;
}


function expand(symbol, num)
{
    var out = '';
    for (var i = 0; i < num; i++)
        out += symbol;
    return out;
}

function decode(input)
{
    var output = '';
    for (var i = 0; i < input.length; i++)
    {
        if (input.charAt(i) === '#')
        {
            var n = input.charCodeAt(i + 1);
            if (input.charAt(i + 2) !== '#')
                n += 4;
            if (input.charAt(i + 1) === '￼')
                n = 255;
            output += expand(input.charAt(i + 2), n);
            i += 2;
        }
        else
            output += input.charAt(i);
    }
    return output;
}
var input = '';
var output = encode(input);
var input1 = output;
var output1 = decode(input1);
console.log(output);
console.log(output1);
