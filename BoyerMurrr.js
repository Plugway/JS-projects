"use strict";

const CMAX = 256;

function badCharHeuristic(strToFind, strToFindSize, badChars)
{
    for (var i = 0; i < CMAX; i++)
        badChars[i] = -1;
    for (i = 0; i < strToFindSize; i++)
        badChars[strToFind.charCodeAt(i)] = i;
}

function suffixHeuristic(shift, bpos, strToFind, m)
{
    var i = m;
    var j = m + 1;
    bpos[i] = j;
    while (i > 0)
    {
        while(j <= m && strToFind[i - 1] != strToFind[j - 1])
        {
            if (shift[j] == 0)
                shift[j] = j - i;
            j = bpos[j];
        }
        i--;
        j--;
        bpos[i] = j;
    }
    //------------------------
    j = bpos[0];
    for(i = 0; i <= m; i++)
    {
        if(shift[i] == 0)
            shift[i] = j;
        if (i == j)
            j = bpos[j];
    }
}

function search(text, strToFind)
{
    var m = strToFind.length;
    var n = text.length;
    var bpos = [m + 1];
    var shift = [m + 1];

    for (var i = 0; i < m + 1; i++)
        shift[i] = 0;
    suffixHeuristic(shift, bpos, strToFind, m);

    var badChars = [CMAX];
    badCharHeuristic(strToFind, m, badChars);

    for (var s = 0; s <= n - m;)
    {
        for (var j = m - 1; j >= 0 && strToFind[j] == text[s + j]; j--){}

        if (j < 0)
        {
            //console.log("Found at " + s);
            outArr.push(s);

            s += Math.max ((s+m < n)? m - badChars[text.charCodeAt(s+m)] : 1, shift[0]);
        }
        else
            s += Math.max(Math.max(1, j - badChars[text.charCodeAt(s+j)]), shift[j + 1]);
    }
}

var outArr = [];
var text = 'abcccsba';
var strToFind = 'a';
search(text, strToFind);
console.log(outArr);
