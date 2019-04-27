"use strict";

const CMAX = 256;

function badCharHeuristic(strToFind, strToFindSize, badChars)
{
    for (var i = 0; i < CMAX; i++)
        badChars[i] = -1;
    for (i = 0; i < strToFindSize; i++)
        badChars[strToFind.charCodeAt(i)] = i;
}

function search(text, strToFind)
{
    var m = strToFind.length;
    var n = text.length;

    var badChars = [CMAX];

    badCharHeuristic(strToFind, m, badChars);

    for (var s = 0; s <= n - m;)
    {
        for (var j = m - 1; j >= 0 && strToFind[j] == text[s + j]; j--){}

        if (j < 0)
        {
            //console.log("Found at " + s);
            outArr.push(s);
            if (s+m < n)
                s += m - badChars[text.charCodeAt(s+m)];
            else
                s += 1;
        }
        else
            s += Math.max(1, j - badChars[text.charCodeAt(s+j)]);
    }
}

var outArr = [];
var text = 'abcccsba';
var strToFind = 'sb';
search(text, strToFind);
console.log(outArr);
