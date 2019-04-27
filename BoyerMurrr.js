
const CMAX = 256;

function badCharHeuristic(str, size, badChar)
{
    for (var i = 0; i < CMAX; i++)
        badChar[i] = -1;
    for (i = 0; i < size; i++)
        badChar[str.charCodeAt(i)] = i;
}

function search(txt, pat)
{
    var m = pat.length;
    var n = txt.length;

    var badChar = [CMAX];

    badCharHeuristic(pat, m, badChar);

    var s = 0;

    while (s <= n - m)
    {
        var j = m-1;

        while (j >= 0 && pat[j] == txt[s + j])
        {
            j--;
        }

        if (j < 0)
        {
            console.log("Patterns occur at shift = " + s);
            if (s+m < n)
                s += m - badChar[txt.charCodeAt(s+m)];
            else
                s += 1;
        }
        else
            s += Math.max(1, j - badChar[txt.charCodeAt(s+j)]);
    }
}

var text = 'abcccsba';
var strToFind = 'sb';
search(text, strToFind);
