"use strict";

function findShortestIndex(strArr)      //Выводит индекс первой кратчайшей строки в массиве строк
{
    var minLen = 10000000;
    var minLenIndex = 0;
    for (var s in strArr)
    {
        if (strArr[s].length < minLen)
        {
            minLen = strArr[s].length;
            minLenIndex = s;
        }
    }
    return minLenIndex;
}

function bruteFinder(text, strToFind, additionalNum)
{
    var comparisonCounter = 0;
    var entryCounter = 0;
    for (var i = 0; i < text.length - strToFind[findShortestIndex(strToFind)].length + 1; i++)
    {
        for (var v in strToFind)
        {
            var inner = strToFind[v];
            if (i + inner.length > text.length)
                continue;
            var counter = 0;
            for (var j = 0; j < inner.length; j++)
            {
                comparisonCounter++;
                if (text[i + j] == inner[j])
                    counter++;
            }
            if (counter == inner.length)
            {
                console.log('Найден ' + inner + ' на промежутке [' + (i+additionalNum) + ' : ' + (i + additionalNum + inner.length - 1) + ']');
                entryCounter++;
            }
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
    console.log("\nДлина текста: " + (additionalNum - 1) + "\nКоличество ключевых слов: " + strToFind.length);   //Вывод разной инфы
    console.log('\nСлово:Длина');
    for (var n in strToFind)
    {
        console.log(strToFind[n] + ':' + strToFind[n].length);
    }
    console.log('\nВремя работы: ' + t1 + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Всего вхождений: ' + entryCounter);
}
//Поиск по текстовому файлу
var fs = require('fs');
var path = "E:\\Scriptshit\\textDocs\\input.txt";
var string = ['loh'];
var textArray = fs.readFileSync(path).toString().split("\n");
bruteFinderLong(textArray, string);

//Поиск по строке
var stringArr = ['ab', 'a', 'acb'];
var text = ['ababbbacbeabab'];
bruteFinderLong(text, stringArr);
