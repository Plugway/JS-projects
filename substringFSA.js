"use strict";

const MAXS = 200;   //Максимальное число состояний сравнивающей машины.
                    //В теории должно быть равно сумме количеств символов во всех ключевых строках
const MAXC = 257;    //Максимальное число символов в алфавите входной строки

var out = new Array(MAXS).fill(0);      //i-ый элемент будет равен 1,
                                                // если слово с индексом i присутствует в текущем состоянии машины(wat??)
var f = new Array(MAXS).fill(-1);
var g = [];                                     //GoTo таблица - двумерный массив с -единичками
for (var i = 0; i < MAXS; i++) {
    g[i] = [];
    for (var j = 0; j < MAXC; j++) {
        g[i][j] = -1;
    }
}
/*
Создает таблицу GoTo
arr - массив слов
k - количество элементов(слов) в arr
Возвращает число состояний машины
States are numbered 0 up to the return value - 1, inclusive.??
 */
function buildMatchingMachine(arr, k)
{
    var states = 1;     //1 пушо мы изначально находимся в 0 состоянии

    for (var i = 0; i < k; ++i)     //Получаем значения для goto и заполняем таблицу. Что то наподобие постройки дерева
    {
        var word = arr[i];
        var currentState = 0;
        for (var j = 0; j < word.length; ++j)   //Вставить все символы текущего слова в arr[]
        {
            let ch = word.charCodeAt(j);

            if (g[currentState][ch] == -1)      //Если состояния не существует, заполняем
                g[currentState][ch] = states++;

            currentState = g[currentState][ch];
        }
        out[currentState] |= (1 << i);//!!!!!!!!!!!!!!!!!!!!!!Math.pow(2, i) || Добавляем текущее слово в вывод
    }

    //Для всех символов у которых в g состояние 0, добавляем в goto
    for(let ch = 0; ch < MAXC; ++ch)
        if (g[0][ch] == -1)
            g[0][ch] = 0;

    //Считаем failure
    var queue = []; //типа очередь
    // Бежим по всем возможным вводам
    for (let ch = 0; ch < MAXC; ++ch)
    {
        // Все узлы глубины 1 в failure == 0.
        if (g[0][ch] != 0)
        {
            f[g[0][ch]] = 0;
            queue.push(g[0][ch]);
        }
    }

    while (queue.length)
    {
        // Вытаскиваем элемент из очереди
        var state = queue.shift();//!!!!!!!!!!!!!!!

        //Для удаленного состояния ищем failure для тех символов где goto не определен
        for (var ch = 0; ch <= MAXC; ++ch)
        {
            //Если goto определена для ch и state
            if (g[state][ch] != -1)
            {
                //Ищем failure state или удаленный
                var failure = f[state];

                //Ищем самый глубокий узел
                while(g[failure][ch] == -1)
                {
                    failure = f[failure];
                }

                failure = g[failure][ch];
                f[g[state][ch]] = failure;
                //Объединяем выходные значения
                out[g[state][ch]] |= out[failure];
                //Записываем узел следующего уровня в очередь
                if (typeof g[state][ch] != 'undefined')
                    queue.push(g[state][ch]);
            }
        }
    }
    return states;
}
//Возвращает следующее состояние машины с помощью goto и failure
// currentState - Текущее состояние машины в промежутке [0, statesNum - 1]
// nextInput - следующий символ
function findNextState(currentState, nextInput)
{
    var answer = currentState;
    var ch = nextInput.charCodeAt(0);
    //Если goto не определен используем failure
    if (typeof answer == 'undefined')
        return 0;
    while (g[answer][ch] == -1)
    {
        answer = f[answer];
    }
    return g[answer][ch];
}
// Находит совпадения слов
function findWordsAhoCor(text, wordsToFindArr, k)
{
    var outCounter = 0;
    var entryCounter = 0;
    var comparisonCounter = 0;
    var t1 = new Date();
    var t2 = new Date();
    //Подготовка
    buildMatchingMachine(wordsToFindArr, k);
    t1 = new Date() - t1;
    var currentState = 0;

    //Бежим по тексту и находим вхождения
    for (var i = 0; i < text.length; ++i)
    {
        currentState = findNextState(currentState, text.charAt(i));

        if(out[currentState] == 0)
            continue;
        //Совпадение найдено
        for (var j = 0; j < k; ++j)
        {
            comparisonCounter++;
            if (out[currentState] & (1 << j))
            {
                if (outCounter < 10)
                {
                    outCounter++;
                    console.log('Найден ' + wordsToFindArr[j] + ' на промежутке [' + (i - wordsToFindArr[j].length + 1) + ':' + i + ']');
                }
                entryCounter++;
            }
        }
    }
    t2 = new Date() - t2;
    console.log("\nДлина текста: " + text.length + "\nКоличество ключевых слов: " + k);
    console.log('\nСлово:Длина');
    for (var n in wordsToFindArr)
    {
        console.log(wordsToFindArr[n] + ':' + wordsToFindArr[n].length);
    }
    console.log('\nВремя создания автомата: ' + t1 + ' мс' + '\nОбщее время работы: ' + t2 + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Всего вхождений: ' + entryCounter);

}

/*
var arr = ["a"];
var text = 'bac';
var k = arr.length;
findWordsAhoCor(text, arr, k);
*/

function runAutomatone(stringArr, path)
{
    var fs = require('fs');
    var k = stringArr.length;
    var text = fs.readFileSync(path).toString().toLowerCase();
    findWordsAhoCor(text, stringArr, k);
}

runAutomatone(['work'], 'E:\\Scriptshit\\textDocs\\input.txt');
// - 'a'.charCodeAt(0) 
