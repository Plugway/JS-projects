"use strict";

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rabinKarpSearch(text, strToFind, prime, additionalNum, outCounter)   //Коренная функция
{
    /*text - строка, в которой ищем
    * strToFind - ну тут понятно все
    * prime - простое число, чем больше - тем меньше коллизии
    * enabledFunctions - включает вывод инфы в консоль прямо из этой функции
    * additionalNum - добавляет это число если сравниваем несколько строк и !enabledFunctions
    * */
    var textLen = text.length;
    var stringLen = strToFind.length;
    var comparisonCounter = 0, collisionCounter = 0;    //Счетчики
    var charIndex, stringHash = 0, textHash = 0; //Нужно для корректной работы
    //var power = Math.floor(Math.log(s)/Math.log(2));
    var someNum = getRandom(1, prime - 2);       //Math.pow(2, getRandom(1, power));
    var powedSomeNum = Math.pow(someNum, stringLen - 1);

    for(var i = 0; i < stringLen; i++)                  //Считаем хеши
    {
        stringHash += strToFind.charCodeAt(i) * Math.pow(someNum, stringLen - i - 1);
        textHash += text.charCodeAt(i) * Math.pow(someNum, stringLen - i - 1);
        if (i == stringLen - 1)
        {
            stringHash = stringHash % prime;
            textHash = textHash % prime;
        }
    }

    for (var j = 0; j <= textLen - stringLen; j++)      //Магия... Куда же без нее :)
    {
        if(stringHash == textHash)
        {
            comparisonCounter++;
            for (charIndex = 0; charIndex < stringLen; charIndex++)
            {
                if (text[j + charIndex] != strToFind[charIndex])
                {
                    collisionCounter++;
                    break;
                }
            }

            if(charIndex == stringLen)
            {
                //на j месте начинается строка, совпадающая с паттерном
                if (outCounter < 10)
                {
                    outCounter++;
                    console.log('Найден на промежутке [' + (j + additionalNum) + ' : ' + (j + additionalNum + strToFind.length - 1) + ']');
                }
            }
        }

        if (i < (textLen - stringLen))
        {
            textHash = ((textHash - text.charCodeAt(j) * powedSomeNum) * someNum + text.charCodeAt(j + stringLen)) % prime;
            if (textHash < 0)
                textHash += prime;
        }
    }
    return [comparisonCounter, collisionCounter, outCounter];
}

function longFinder(textArray, strToFind, prime)        //Работает с массивами строк, используя rabinKarpSearch
{
    var t1 = new Date();                                //Замер времени работы
    var resArr;                                         //Служебная переменная
    var additionalNum = 0;                              //Общий счетчик символов у всех строк,
    var comparisonCounter = 0;                          //сравнений
    var collisionCounter = 0;                           //и коллизий
    var outCounter = 0;
    for (var i = 0; i < textArray.length; i++)
    {
        var text = textArray[i];
        resArr = rabinKarpSearch(text, strToFind, prime, additionalNum, outCounter);
        comparisonCounter += resArr[0];
        collisionCounter += resArr[1];
        outCounter = resArr[2];
        additionalNum += (text.length + 1);
    }
    t1 = new Date() - t1;
    console.log('\nДлина текста: ' + (additionalNum - 1) + '\nДлина подстроки для поиска: ' + strToFind.length);   //Вывод разной инфы
    console.log('Подстрока: ' + strToFind);
    console.log('Время работы: ' + t1 + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Количество коллизий: ' + collisionCounter);
    console.log('Всего вхождений: ' + (comparisonCounter - collisionCounter));
}

//Пример вызова функции поиска для одной строки
/*
var string = 'c';
var text = ['acb', 'acb'];
var prime = 2777;
longFinder(text, string, prime);
*/

//Пример вызова функции для массива строк, разделенных переносом строки

function runHashNew(string, path)
{
    var fs = require('fs');
    var prime = 2777;
    var textArray = fs.readFileSync(path).toString().split('\n');
    longFinder(textArray, string, prime);
}
var string = 'work';
var path = 'E:\\Scriptshit\\textDocs\\input.txt';
