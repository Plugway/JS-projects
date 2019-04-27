"use strict";
/*
var s = 3000;

var k = Math.floor(Math.log(s)/Math.log(2));

console.log(k);
*/
/*
var x = 2;
//var m = 1;
var code = 255;
var sum = 0;

for (var m = 0; m < 10000; m++)
{
    for (var i = 1; i < m; i++)
    {
        if (m == 1017)
            var f = 0;
        sum += code * Math.pow(x, m - i);
        if (sum == Infinity)
        {
            console.log(m);
            break;
        }
    }
    if (sum == Infinity)
        break;
    sum = 0;
}
*/

function preprocessSuffixHeuristic(shift, bpos, pat, m)
{
    var i = m;
    var j = m + 1;

    bpos[i] = j;

    while (i > 0)
    {
        while (j <= m && pat[i - 1] != pat[j - 1])
        {
            if (shift[j] == 0)
                shift[j] = j - i;
            j = bpos[j];
        }

        i--;
        j--;
        bpos[i] = j;
    }
}

function preprocessCase2(shift, bpos, pat, m)
{
    var i, j;
    j = bpos[0];
    for(i = 0; i <= m; i++)
    {
        if(shift[i] == 0)
            shift[i] = j;
        if (i == j)
            j = bpos[j];
    }
}

function search(text, pat)
{
    var s = 0;
    var j;
    var m = pat.length;
    var n = text.length;
    var bpos = [m + 1];
    var shift = [m + 1];

    for (var i = 0; i < m + 1; i++)
        shift[i] = 0;

    preprocessSuffixHeuristic(shift, bpos, pat, m);
    preprocessCase2(shift, bpos, pat, m);

    while (s <= n - m)
    {
        j = m - 1;

        while (j >= 0 && pat[j] == text[s + j])
        {
            j--;
        }

        if (j < 0)
        {
            console.log('Found at ' + s);
            s += shift[0];
        }
        else
            s += shift[j + 1];
    }
}

//var outArr = [];
var text = 'abcccsba';
var strToFind = 'sb';
search(text, strToFind);
//console.log(outArr);
