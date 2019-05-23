'use strict';

function mod(x, y) {
    return (x % y + y) % y;
}
function caesarBreak(text, logging) {
    var output = {text:'', shift: 0};
    var entropies = getAllEntropies(text);
    entropies.sort(function(x, y) {
        // Compare by lowest entropy, break ties by lowest shift
        if (x[1] != y[1])
            return x[1] - y[1];
        else
            return x[0] - y[0];
    });
    // Decrypt using lowest entropy shift
    var bestShift = entropies[0][0];
    output.text = caesarDecrypt(text, bestShift);
    output.shift = bestShift.toString();
    if (logging)
    {
        console.log('shift|entropy');
        for (var t = 0; t < entropies.length; t++)
        {
            console.log(`${entropies[t][0]}  ${entropies[t][1]}`);
        }
    }
    return output;
}
function getAllEntropies(str) {
    var result = [];
    for (var i = 0; i < 26; i++)
        result.push([i, getEntropy(caesarDecrypt(str, i))]);
    return result;
}
/*var ENGLISH_FREQS = [
    0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406,
    0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074,
];*/
function getEntropy(str) {
    var sum = 0;
    var ignored = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if      (65 <= c && c <=  90) sum += Math.log(ENGLISH_FREQS[c - 65]);  // Uppercase
        else if (97 <= c && c <= 122) sum += Math.log(ENGLISH_FREQS[c - 97]);  // Lowercase
        else ignored++;
    }
    return -sum / Math.log(2) / (str.length - ignored);
}
function caesarDecrypt(str, shift)
{
    var result = '';
    for (var i = 0; i < str.length; i++)
    {
        var c = str.charCodeAt(i);
        if      (65 <= c && c <=  90) result += String.fromCharCode(mod(c - 65 - shift, 26) + 65);  // Uppercase
        else if (97 <= c && c <= 122) result += String.fromCharCode(mod(c - 97 - shift, 26) + 97);  // Lowercase
        else result += str.charAt(i);  // Copy
    }
    return result;
}
function caesarEncrypt(str, shift)
{
    if (shift < 0)
        return caesarEncode(str, shift + 26);
    var output = '';
    for (var i = 0; i < str.length; i ++)
    {
        var c = str[i];
        if (c.match(/[a-z]/i))
        {
            var code = str.charCodeAt(i);
            if ((code >= 65) && (code <= 90))
                c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            else if ((code >= 97) && (code <= 122))
                c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        output += c;
    }
    return output;
}
function getFrequencies(path)
{
    var freq = new Array(26).fill(0);
    var fs = require('fs');
    var text = fs.readFileSync(path).toString().replace(/[^a-zA-Z]/g, '').toLowerCase();
    for (var i = 0; i < text.length; i++)
    {
        freq[text.charCodeAt(i)-97] += 1;
    }
    for (var j in freq)
    {
        freq[j] = freq[j]/text.length;
    }
    return freq;
}

var path = 'E:\\Scriptshit\\textDocs\\frequency.txt';  //текст для частотного анализа
var ENGLISH_FREQS = getFrequencies(path);
var message = 'mama';     //сообщение
var shift = 7;            //сдвиг
var encrypted = caesarEncrypt(message, shift);
var decrypted = caesarBreak(encrypted, false);
console.log(encrypted + ':' + shift);
console.log(decrypted.text + ':' + decrypted.shift);
