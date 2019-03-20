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
                            output += ('#(' + (n % 255).toString() + ')' + seqStr.charAt(0));
                        else
                            output += ('#(' + 255 + ')' + seqStr.charAt(0));
                    }
                else
                    for(var k = 0; k < Math.floor(n/259)+1; k++)
                    {
                        if(!(k + 1 < Math.floor(n / 259) + 1))
                            output += ('#(' + (n % 255 - 4).toString() + ')' + seqStr.charAt(0));
                        else
                            output += ('#(' + 255 + ')' + seqStr.charAt(0));
                    }
                i += n;
            }
            else if (input.charAt(i) === '#')
            {
                seqStr = input.substring(i);
                n = countSeq(seqStr);
                output += ('#(' + n + ')' + seqStr.charAt(0));
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

var input = 'AAA#AAAA##AAAAA###((((((((############################################################################################################################################################################################################################################################################################################################################################################################';
var output = encode(input);
console.log(output);
