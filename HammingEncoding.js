"use strict";
function convert(num)
{
    switch (num)
    {
        case 4:
            return 2;
        case 2:
            return 3;
        case 3:
            return 4;
        default:
            return num;
    }
}

function hEncode(s)
{
    var r1 = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[3])) % 2;
    var r2 = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2])) % 2;
    var r3 = (parseInt(s[0]) + parseInt(s[2]) + parseInt(s[3])) % 2;
    var rm = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2]) + parseInt(s[3]) + r1 + r2 + r3) % 2;
    return "Encode result\n" + s + r1 + r2 + r3 + rm;
}

function hDecode(s)
{
    var cf = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[3]) + parseInt(s[4])) % 2;
    var cs = (parseInt(s[0]) + parseInt(s[1]) + parseInt(s[2]) + parseInt(s[5])) % 2;
    var ct = (parseInt(s[0]) + parseInt(s[2]) + parseInt(s[3]) + parseInt(s[6])) % 2;
    if (cf === 0 && cs === 0 && ct === 0)
        return "Decode result\nNo errors\n" + 'Output: ' + s.substring(0, 4);
    var epos = cf.toString() + cs.toString() + ct.toString();
    epos = convert(6 - (parseInt(epos, 2) - 1));

    var fixed = s.substring(0, epos) + (s[epos] === '1' ? '0' : '1') + s.substring(epos + 1);
    var cfo = (parseInt(fixed[0]) + parseInt(fixed[1]) + parseInt(fixed[2]) + parseInt(fixed[3]) + parseInt(fixed[4]) + parseInt(fixed[5]) + parseInt(fixed[6])) % 2;
    if (cfo !== parseInt(s[7]))
        return "Decode result:\nTwo errors";
    return "Decode result\n" + "Error pos: " + epos + "\nFixed: " + fixed + '\nOutput: ' + fixed.substring(0, 4);
}

var input = '1000';
console.log(hEncode(input));

var input2 = '11111110';
console.log( hDecode(input2));
