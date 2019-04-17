"use strict";

function bruteFinder(text, strToFind, additionalNum)
{
    var comparisonCounter = 0;
    var entryCounter = 0;
    for (var i = 0; i < text.length - strToFind.length + 1; i++)
    {
        var counter = 0;
        for (var j = 0; j < strToFind.length; j++)
        {
            comparisonCounter++;
            if (text.charAt(i + j) == strToFind.charAt(j))
                counter++;
        }
        if (counter == strToFind.length)
        {
            console.log('Найден на ' + (i+additionalNum));
            entryCounter++;
        }
    }
    return [comparisonCounter, entryCounter];
}

function bruteFinderLong(textArray, strToFind)
{
    var t1 = new Date();                                //Замер времени работы
    var resArr;                                         //Служебная переменная
    var additionalNum = 0;                              //Общий счетчик символов у всех строк,
    var comparisonCounter = 0;                          //сравнений
    var entryCounter = 0;
    for (var i = 0; i < textArray.length; i++)
    {
        var text = textArray[i];
        resArr = bruteFinder(text, strToFind, additionalNum);
        comparisonCounter += resArr[0];
        entryCounter += resArr[1];
        additionalNum += (text.length + 1);
    }
    t1 = new Date() - t1;
    console.log("\nДлина текста: " + (additionalNum - 1) + "\nДлина подстроки: " + strToFind.length);   //Вывод разной инфы
    console.log('Время работы: ' + t1 + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Всего вхождений: ' + entryCounter);
}
var fs = require('fs');
var path = "E:\\Scriptshit\\textDocs\\input.txt";
var string = 'timer';
var textArray = fs.readFileSync(path).toString().split("\n");
bruteFinderLong(textArray, string);

var string = 'ab';
var text = 'ababbbacbeabab';
bruteFinderLong([text], string);
