"use strict";

const MAXS = 500;
const MAXC = 26;

var out = new Array(MAXS).fill(0);
var f = new Array(MAXS).fill(-1);
var g = [];
for (var i = 0; i < MAXS; i++) {
    g[i] = [];
    for (var j = 0; j < MAXC; j++) {
        g[i][j] = -1;
    }
}


function buildMatchingMachine(arr, k)
{
    var states = 1;

    for (var i = 0; i < k; ++i)
    {
        const word = arr[i];
        var currentState = 0;

        for (var j = 0; j < word.length; ++j)
        {
            var ch = word.charCodeAt(j) - 'a'.charCodeAt(0);

            if (g[currentState][ch] == -1)
                g[currentState][ch] = states++;

            currentState = g[currentState][ch];
        }

        out[currentState] |= (1 << i);//!!!!!!!!!!!!!!!!!!!!!!Math.pow(2, i)
    }

    for(var ch = 0; ch < MAXC; ++ch)
        if (g[0][ch] == -1)
            g[0][ch] = 0;
    var queue = [];

    for (var ch = 0; ch < MAXC; ++ch)
    {
        if (g[0][ch] != 0)
        {
            f[g[0][ch]] = 0;
            queue.push(g[0][ch]);
        }
    }
    while (queue.length)
    { 
        var state = queue.shift();//!!!!!!!!!!!!!!!

        for (var ch = 0; ch <= MAXC; ++ch)
        {
            if (g[state][ch] != -1)
            {
                var failure = f[state];

                while(g[failure][ch] == -1)
                {
                    failure = f[failure];
                }

                failure = g[failure][ch];
                f[g[state][ch]] = failure;
                out[g[state][ch]] |= out[failure];
                if (typeof g[state][ch] != 'undefined')
                    queue.push(g[state][ch]);
            }
        }
    }
    return states;
}

function findNextState(currentState, nextInput)
{
    var answer = currentState;
    var ch = nextInput.charCodeAt(0) - 'a'.charCodeAt(0);

    while (g[answer][ch] == -1)
    {
        answer = f[answer];
    }
    return g[answer][ch];
}

function findWordsAhoCor(text, wordsToFindArr, k)
{
    buildMatchingMachine(wordsToFindArr, k);

    var currentState = 0;

    for (var i = 0; i < text.length; ++i)
    {
        currentState = findNextState(currentState, text.charAt(i));

        if(out[currentState] == 0)
            continue;

        for (var j = 0; j < k; ++j)
        {
            if (out[currentState] & (1 << j))
            {
                console.log(arr[j] + ' ' + (i - arr[j].length + 1) + ' до ' + i);
            }
        }
    }
}

var arr = ["a", "ab", "ed"];
var text = 'aababced';
var k = arr.length;

findWordsAhoCor(text, arr, k);
