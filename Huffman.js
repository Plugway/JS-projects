"use strict";

function BinaryHeap(scoreFunction)
{
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        this.content.push(element);
        this.bubbleUp(this.content.length - 1);
    },

    pop: function() {
        var result = this.content[0];
        var end = this.content.pop();
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    },

    size: function() {
        return this.content.length;
    },

    bubbleUp: function(n) {
        var element = this.content[n], score = this.scoreFunction(element);
        while (n > 0) {
            var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN];
            if (score >= this.scoreFunction(parent))
                break;
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    },

    sinkDown: function(n) {
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);
        while(true) {
            var child2N = (n + 1) * 2, child1N = child2N - 1;
            var swap = null;
            if (child1N < length) {
                var child1 = this.content[child1N],
                    child1Score = this.scoreFunction(child1);
                if (child1Score < elemScore)
                    swap = child1N;
            }
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
            }
            if (swap == null) break;
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
};
//----------------------------------------------------------------------------------------------------------------------
function HuffmanEncoding(str) {
    var countChars = {};
    for (var i = 0; i < str.length; i++)
        if (str[i] in countChars)
            countChars[str[i]]++;
        else
            countChars[str[i]] = 1;

    var h = new BinaryHeap(function(x){return x[0];});
    for (var ch in countChars)
        h.push([countChars[ch], ch]);

    while (h.size() > 1) {
        var pair1 = h.pop();
        var pair2 = h.pop();
        h.push([pair1[0]+pair2[0], [pair1[1], pair2[1]]]);
    }

    var tree = h.pop();
    this.encoding = {};
    if ((typeof tree != 'undefined'))
        this.generateEncoding(tree[1], "");
}

HuffmanEncoding.prototype.generateEncoding = function(ary, prefix) {
    if (ary instanceof Array) {
        this.generateEncoding(ary[0], prefix + "0");
        this.generateEncoding(ary[1], prefix + "1");
    }
    else {
        this.encoding[ary] = prefix;
    }
};

HuffmanEncoding.prototype.inspect_encoding = function() {
    for (var ch in this.encoding) {
        console.log("'" + ch + "': " + this.encoding[ch]);
    }
};

HuffmanEncoding.prototype.decode = function(encoded) {
    var rev_enc = {};
    for (var ch in this.encoding)
        rev_enc[this.encoding[ch]] = ch;
    var decoded = "";
    var pos = 0;
    while (pos < encoded.length) {
        var key = "";
        while (!(key in rev_enc)) {
            key += encoded[pos];
            pos++;
        }
        decoded += rev_enc[key];
    }
    return decoded;
};

HuffmanEncoding.prototype.encode = function (text)
{
    var encoded = '';
    if (this.encoding[text[0]] == '')
        this.encoding[text[0]] = '0';
    for (var i = 0; i < text.length; i++)
    {
        encoded += this.encoding[text[i]];
    }
    return encoded;
};

function toBinary(str)
{
    var out = '';
    for(var ch in str)
    {
        out += str.charCodeAt(ch).toString(2);
    }
    return out;
}

function f(str)
{
    var outStr = '';
    for (var i = 0; i < str.length; i+=8)
    {
        outStr += String.fromCharCode(parseInt(str.substr(i, 8),2));
    }
    return outStr;
}

var fs = require('fs');
var path = 'E:\\Scriptshit\\textDocs\\input4.txt';
var text = fs.readFileSync(path).toString();
//var text = 'deliberations13oath8923h89H*(#@H*($Y@*)34-3jr-923jawed';
var huff = new HuffmanEncoding(text);
huff.inspect_encoding();
var v = toBinary(text);
var e = huff.encode(text);
var p = Math.round ((1 - e.length/v.length)*10000)/100;
//console.log('Input: ' + text);
//console.log('Encoded: ' + e);
console.log('Encoded: ' + f(e));
//console.log('Non encoded: ' + v);
//console.log('Encoded length: ' + e.length);
//var abc = '1011101101100111111011011101101011100111010111110001011001111011001001000000100011101011110110010011110011000111011001001111100001011110010100010000110000101111001010011101001000001011101010000100111111100010001101101111101111001100010001001101000011010111';
console.log('Huffman more efficient by ' + (isNaN(p) ? 0 : p) + '%');
var t = huff.decode(e);
console.log('Text length: ' + text.length);
console.log('Decoded length: ' + t.length);
//console.log('Decoded: ' + t);
console.log("Input and decoded messages match? " + (text == t ? 'Yes' : 'No'));
