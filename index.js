#!/usr/bin/env node
const fs = require('fs');//for writing log
const path = require('path');//for finding path
const notifier = require('node-notifier'); // for notifiction
const player = require('play-sound')(opts = {}); // for sound

//color pallet
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    red: "\x1b[31m",   // work color
    green: "\x1b[32m", // break color
    cyan: "\x1b[36m",  // info color
    yellow: "\x1b[33m" // warning color
};

// 1. Take the number from coming into user
const sessionCount = Number(process.argv[2]);

// If there is not number input, show warning
if (!sessionCount) {
    console.log("Please enter how many sessions do you want to study. Example: ./index.js 3");
    process.exit(1);
}

// 2. Main Program Flow
async function main() {
    console.log(`${colors.cyan}Total ${sessionCount} sets Pomodoro starting!${colors.reset}\n`);

    for (let i = 1; i <= sessionCount; i++) {
        
        // Work 
        // Work progress bar is will be shown here
        await startTimer(25, `Set ${i}/${sessionCount}: Study`, "gong.mp3", colors.red); 

        //last set check
        if (i === sessionCount) {
            console.log(`${colors.bright}Work Done! Nice Work!.${colors.reset}`);
            sendNotification("Congrats!, You finished all sets!")
            playSound("harp.mp3")
            break;
        }

        // work break
        if (i % 4 === 0) {
            console.log(`${colors.cyan}☕ Long Break Time!${colors.reset}`);
            await startTimer(25, "Long Break", "harp.mp3", colors.green);
        } else {
            console.log(`${colors.cyan}🧘 Short Break Time!${colors.reset}`);
            await startTimer(5, "Short Break", "harp.mp3", colors.green);
        }
    }
}

// Timer function, progress bar will be come in here
// Now it waits 1 sec. for test
async function startTimer(minutes, label, soundFile, colorCode) {
    const totalSeconds = minutes * 60;

    console.log(`\n${colorCode}>>> ${label} is starting (${minutes} min)${colors.reset}`);

    for (let i = 0; i <= totalSeconds; i++){
        
        const percent = i / totalSeconds;   
        const bar = createProgressBar(percent, 30);

        const remaining = totalSeconds - i;
        const min = Math.floor(remaining / 60);
        const sec = remaining % 60;

        process.stdout.write(`\r${colorCode}${label}: ${bar} ${min}min ${sec}sec ${colors.reset}`);

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log("");

    playSound(soundFile);

    sendNotification("Pomodoro Timer", `${label} done!`);

    logSession(label, minutes);

    console.log(`${colors.bright}✅ ${label} done. Saved. ${colors.reset}\n`);
}

function createProgressBar(percent, length) {
    const filledLength = Math.floor(length * percent);
    const emptyLength = length - filledLength;

    const filled = "█".repeat(filledLength); 
    const empty = "░".repeat(emptyLength); 

    return `[${filled}${empty}]`;
}

function playSound(fileName) {
    player.play(fileName, function(err){
        if (err) {
            console.log(`Filename (${fileName}) can't be play right now:`, err); 
        }
    });
}

function logSession(type, duration) {
    const now = new Date(); // format: 2025-12-25 14:30
    const timeString = now.toISOString().replace('T', ' ').substring(0, 16);

    // csv format: Date, Type, Duration(min)
    const logEntry = `${timeString},${type},${duration}\n`;
    const logFile = path.join(__dirname, 'history.csv');

    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.log(colors.yellow + "Log cannot be saved!" + colors.reset);
    })
}

function sendNotification(title, message) {
    notifier.notify({
        title: title,
        message: message,
        sound: false,
        wait: false
    })
}

// start program
main();