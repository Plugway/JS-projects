"use strict";

const  maxChar = 1;

function rabinKarpSearch(text, strToFind, prime, additionalNum)   //Коренная функция
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
    var charIndex, stringHash = 0, textHash = 0, h = 1; //Нужно для корректной работы

    for(var i = 0; i < stringLen; i++)                  //Считаем хеши
    {
        if (i < stringLen - 1)
            h = (h * maxChar) % prime;
        stringHash = (maxChar * stringHash + strToFind.charCodeAt(i)) % prime;
        textHash = (maxChar * textHash + text.charCodeAt(i)) % prime;
    }

    for (var j = 0; j <= textLen - stringLen; j++)      //Магия... Куда же без нее :)
    {
        if(stringHash == textHash)
        {
            comparisonCounter++;
            for (charIndex = 0; charIndex < stringLen; charIndex++)
            {
                if (text.charAt(j + charIndex) != strToFind.charAt(charIndex))
                {
                    collisionCounter++;
                    break;
                }
            }

            if(charIndex == stringLen)
            {
                //на j месте начинается строка, совпадающая с паттерном
                console.log('Найден на ' + (j + additionalNum));
            }
        }

        if (i < (textLen - stringLen))
        {
            textHash = (maxChar * (textHash - text.charCodeAt(j) * h) + text.charCodeAt(j + stringLen)) % prime;
            if (textHash < 0)
                textHash += prime;
        }
    }
    return [comparisonCounter, collisionCounter];
}

function longFinder(textArray, strToFind, prime)        //Работает с массивами строк, используя rabinKarpSearch
{
    var t1 = new Date();                                //Замер времени работы
    var resArr;                                         //Служебная переменная
    var additionalNum = 0;                              //Общий счетчик символов у всех строк,
    var comparisonCounter = 0;                          //сравнений
    var collisionCounter = 0;                           //и коллизий
    for (var i = 0; i < textArray.length; i++)
    {
        var text = textArray[i];
        resArr = rabinKarpSearch(text, strToFind, prime, false, additionalNum);
        comparisonCounter += resArr[0];
        collisionCounter += resArr[1];
        additionalNum += (text.length + 1);
    }
    t1 = new Date() - t1;
    console.log("\nДлина текста: " + (additionalNum - 1) + "\nДлина подстроки: " + strToFind.length);   //Вывод разной инфы
    console.log('Время работы: ' + t1 + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Количество коллизий: ' + collisionCounter);
    console.log('Всего вхождений: ' + (comparisonCounter - collisionCounter));
}

//Пример вызова функции поиска для одной строки
var string = 'ab';
var text = 'ababbbacbeabab';
var prime = 2777;
longFinder([text], string, prime);


//Пример вызова функции для массива строк, разделенных переносом строки
var fs = require('fs');
var path = "E:\\Scriptshit\\textDocs\\input.txt";
var string = 'timer';
var prime = 2777;
var textArray = fs.readFileSync(path).toString().split("\n");
longFinder(textArray, string, prime);
