"use strict";

const  maxChar = 1;

function rabinKarpSearch(text, strToFind, prime)
{
    var t = new Date();
    var textLen = text.length;
    var stringLen = strToFind.length;
    var comparisonCounter = 0, collisionCounter = 0;
    var charIndex, stringHash = 0, textHash = 0, h = 1;

    console.log("Длина текста: " + textLen + "\nДлина подстроки: " + stringLen);

    for(var i = 0; i < stringLen; i++)
    {
        if (i < stringLen - 1)
            h = (h * maxChar) % prime;
        stringHash = (maxChar * stringHash + strToFind.charCodeAt(i)) % prime;
        textHash = (maxChar * textHash + text.charCodeAt(i)) % prime;
    }
    for (var j = 0; j <= textLen - stringLen; j++)
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
                console.log('Найден на ' + j);
            }
        }

        if (i < (textLen - stringLen))
        {
            textHash = (maxChar * (textHash - text.charCodeAt(j) * h) + text.charCodeAt(j + stringLen)) % prime;
            if (textHash < 0)
                textHash += prime;
        }
    }
    
    t = new Date() - t;
    console.log('Время работы: ' + t + ' мс');
    console.log('Количество сравнений: ' + comparisonCounter);
    console.log('Количество коллизий: ' + collisionCounter);
}

var string = 'timer';
var text = 'In the world of microcontrollers (MCUs), sometimes things go wrong. If a program goes haywire or into an infinite loop, it needs a way to check and see if things are still running. In “the old days,” the Windows operating system would occasionally crash (experience a fatal error) and put up what was called the Blue Screen of Death (BSoD) where after it would reboot to prevent damage to the computer such as writing over vital boot code or similarly dangerous events. (The BSoD happens much less often these days.) Embedded systems are different from desktop computers, however, in that there is rarely going to be a human around who will know how to reboot the failing device. Watchdog timers (WDTs), or watchdogs, are circuits external to the processor that can detect and trigger a processor reset (and/or another event) if necessary. The MCU checks in with the watchdog timer at a set interval to show that it’s still on the job. Like a bomb, the watchdog timer is set to count down and if it times out, it resets the MCU, dumping programs and rebooting the MCU and probably other areas in the system that work in tandem with the MCU. But as long as the MCU is running, it will continue to ping the watchdog to reset the timer. It’s best to keep a watchdog external and unreachable by MCU code. A watchdog can be an external component in a separate package from the integrated circuit (IC) that houses the MCU (best), or a watchdog can be found inside the IC but on a different circuit from the MCU, however a WDT that’s dependent on the same resources as the MCU might not be a good idea for obvious reasons.';
var prime = 2777;

rabinKarpSearch(text, string, prime);
