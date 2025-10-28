/* ACHTUNG HAFTUNGSAUSSCHLUSS! */

/* Copyright 2025 | planeteriumprovider

/* Licensed under the Apache License, Version 2.0 (the "License");
/* You may use this file only in accordance with the License.
/* You may obtain a copy of the License at
/* 
/* http://www.apache.org/licenses/LICENSE-2.0
/* 
/* Unless required by law or agreed to in writing,
/* Products distributed under the License are distributed on an "AS IS" basis,
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/* The specific language for permissions and
/* limitations under the License.
/* 
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*    |                                                                                                                                 |
/*    |             ACHTUNG! DIE OFFIZIELLEN RECHTE BESITZT XOIS UND DIE WEITERVERWENDUNG IST STRENGSTENS VERBOTEN!                     |
/*    |                        ES MUSS ERST EINE OFFIZIELLE GENEHMIGUNG VON XOIS EINGWHOLT WERDEN!!!                                    |
/*    |                                                                                                                                 |   
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*      |                                                                                                                             |
/*        |                   @planeteriumprovider hat die Berechtigung von XOIS für die Verwendung erhalten!                       |
/*      |                                                                                                                             |
/*        |                                              EIGENTÜMER VOM CODE: XOIS                                                  |
/*      |                                                                                                                             |
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/*    | ---  WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF + WEITERE INFOS AUF  --- |
/*    |                                                                                                                                 |
/*    | Instagram :  https://www.instagram.com/hakaidev?igsh=cmthM2cxYjJ5OWwy                                                           |
/*    | Instagram :  https://www.instagram.com/meepcoin?igsh=MTRtYWZuaWV5eTFlZQ==                                                       |
/*    | Instagram :  https://www.instagram.com/metha_connection?igsh=OWZsOTE5OWJibXN4                                                   |
/*    | Whatsapp  :  https://whatsapp.com/channel/0029VaCABrQ0AgWFWiCXq13W                                                              |
/*    | Whatsapp  :  https://whatsapp.com/channel/0029VaN2GYGCMY0Gr2mTFW2p                                                              |
/*    | Youtube   :  https://youtube.com/@HakaiDEVxMETHA?si=jMuzOjq8cvVdm8ed                                                            |
/*    | Discord   :  https://discord.gg/XW4gJQPf                                                                                        |
/*    | Homepage  :  https://hakaidev-x-metha.org                                                                                       |
/*    | Email     :  hakaidevxmethahelp@gmail.com                                                                                       |
/*    |                                                                                                                                 |
/*    |---------------------------------------------------------------------------------------------------------------------------------|
/* 
/* Copyright 2025  |  planeteriumprovider
/* 
/* Lizenziert unter der Apache-Lizenz, Version 2.0 (die „Lizenz“);
/* Sie dürfen diese Datei nur in Übereinstimmung mit der Lizenz verwenden.
/* Sie können eine Kopie der Lizenz erhalten unter
/* 
/* http://www.apache.org/licenses/LICENSE-2.0
/* 
/* Sofern nicht gesetzlich vorgeschrieben oder schriftlich vereinbart,
/* Die unter der Lizenz vertriebenen Produkte werden auf einer „AS IS“-Basis vertrieben,
/* OHNE GARANTIEN ODER BEDINGUNGEN JEGLICHER ART, weder ausdrücklich noch stillschweigend.
/* Die spezifischen Sprachbestimmungen für Berechtigungen und
/* Einschränkungen im Rahmen der Lizenz. */







const GRID_SIZE = 35;
const GAME_SPEED = 150;
const BORDER_OFFSET = 3;
const gameGrid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score');
const mobileControls = document.getElementById('mobile-controls');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const gameOverScreen = document.getElementById('game-over-screen');
const colorSettingsScreen = document.getElementById('color-settings-screen');
const themeList = document.getElementById('theme-list');
const colorSettingsBox = document.getElementById('color-settings-box');
let currentDirection = 'right';
let nextDirection = 'right';
let snake = [];
let coin = {};
let gameInterval;
let score = 1.0;
let scoreInterval;
let coinsCollected = 0;
let coinsMissed = 0;
let coinsStreak = 0;
let isBigCoin = false;
let isMobileMode = false;
let lastMode = false;
window.lastMode = false;
let calledFromGameOver = false; 
let colors = {};
let currentTheme = localStorage.getItem('snakeTheme') || 'default';
let availableThemes = [];
let coinTimeoutBlink;
let coinTimeoutRemove;
let lastCoin = {};
let pillars = [];
let pillarTimeoutBlink;
let pillarTimeoutPlace;
let pillarTimeoutRemove;
async function fetchThemeList() {
try {
const response = await fetch('colors/themes.json'); 
availableThemes = await response.json();
const loadPromises = availableThemes.map(theme => loadThemeData(theme));
await Promise.all(loadPromises);
} catch (error) { availableThemes = [{ filename: 'default', name: 'Standard Theme' }];
await loadThemeData(availableThemes[0]);
}
}
async function loadThemeData(theme) {
const themePath = `colors/${theme.filename}.json`;
try { const response = await fetch(themePath);
if (!response.ok) throw new Error(`Theme ${theme.filename} nicht gefunden.`);
theme.colors = await response.json();
} catch (error) {
theme.colors = {};
}
}
window.loadColors = async function(themeFilename) {
const theme = availableThemes.find(t => t.filename === themeFilename);
if (!theme || !theme.colors) {
if (themeFilename !== 'default') {
return window.loadColors('default');
}
return;
}
colors = theme.colors;
const root = document.documentElement;
for (const [key, value] of Object.entries(colors)) {
const cssVarName = `--${key.toLowerCase().replace(/_/g, '-')}`;
root.style.setProperty(cssVarName, value);
}
localStorage.setItem('snakeTheme', themeFilename);
currentTheme = themeFilename;
}
function createGrid() {
gameGrid.innerHTML = '';
for (let y = 0; y < GRID_SIZE; y++) {
for (let x = 0; x < GRID_SIZE; x++) {
const cell = document.createElement('div');
cell.classList.add('cell');
cell.id = `cell-${x}-${y}`;
gameGrid.appendChild(cell);
}
}
}
window.setupControls = function(mode) {
    isMobileMode = mode; 
    document.removeEventListener('keydown', window.handleDirectionChange);
    mobileControls.style.display = 'none';
    if (isMobileMode) {
        mobileControls.style.display = 'flex';
    } else {
        document.addEventListener('keydown', window.handleDirectionChange);
    }
}
window.handleDirectionChange = function(e) {
    let newDirection;   
    switch (e.key) {
        case 'ArrowUp': case 'w': newDirection = 'up'; break;
        case 'ArrowDown': case 's': newDirection = 'down'; break;
        case 'ArrowLeft': case 'a': newDirection = 'left'; break;
        case 'ArrowRight': case 'd': newDirection = 'right'; break;
        default: return;
    }   
    const isOpposite = (currentDirection === 'up' && newDirection === 'down') ||
                       (currentDirection === 'down' && newDirection === 'up') ||
                       (currentDirection === 'left' && newDirection === 'right') ||
                       (currentDirection === 'right' && newDirection === 'left');  
    if (!isOpposite) {
        nextDirection = newDirection;
    }
}
window.updateControlStates = function() {
    if (!isMobileMode) return;
    const directions = ['up', 'down', 'left', 'right'];    
    directions.forEach(dir => {
        const button = document.getElementById(`${dir}-btn`);
        if (!button) return;
        const isOpposite = (currentDirection === 'up' && dir === 'down') ||
                           (currentDirection === 'down' && dir === 'up') ||
                           (currentDirection === 'left' && dir === 'right') ||
                           (currentDirection === 'right' && dir === 'left');    
        if (isOpposite) {
            button.classList.add('disabled-control');
        } else {
            button.classList.remove('disabled-control');
        }
    });
}
function coinTimerClear() {
    clearTimeout(coinTimeoutBlink);
    clearTimeout(coinTimeoutRemove);
    const coinCell = document.getElementById(`cell-${coin.x}-${coin.y}`);
    if (coinCell) {
        coinCell.classList.remove('coin-blink');
    }
}
function pillarTimerClear() {
    clearTimeout(pillarTimeoutBlink);
    clearTimeout(pillarTimeoutPlace);
    clearTimeout(pillarTimeoutRemove);
    // Remove blinking pillars
    document.querySelectorAll('.pillar-blink').forEach(cell => {
        cell.classList.remove('pillar-blink');
    });
}
function pillarBlink(pillarPos) {
    // Blink the 2x2 pillar area
    for (let dx = 0; dx < 2; dx++) {
        for (let dy = 0; dy < 2; dy++) {
            const cell = document.getElementById(`cell-${pillarPos.x + dx}-${pillarPos.y + dy}`);
            if (cell) {
                cell.classList.add('pillar-blink');
            }
        }
    }
}

function placePillar() {
    
    pillarTimerClear();
    pillars = [];
    
    const minCoord = BORDER_OFFSET + 1;
    const maxCoord = GRID_SIZE - 2 - BORDER_OFFSET;
    
    const pillarCandidates = [];
    
    for (let y = minCoord; y <= maxCoord; y++) {
        for (let x = minCoord; x <= maxCoord; x++) {
            let canPlace = true;
            
            for (let dx = 0; dx < 2 && canPlace; dx++) {
                for (let dy = 0; dy < 2 && canPlace; dy++) {
                    const checkX = x + dx;
                    const checkY = y + dy;
                    
                    if (snake.some(segment => segment.x === checkX && segment.y === checkY)) {
                        canPlace = false;
                    }
                    
                    if (coin.x === checkX && coin.y === checkY) {
                        canPlace = false;
                    }
                }
            }
            
            if (canPlace && coin.x !== undefined && coin.y !== undefined) {
                const pillarCenterX = x + 0.5;
                const pillarCenterY = y + 0.5;
                const distanceToCoin = Math.sqrt(
                    Math.pow(pillarCenterX - coin.x, 2) + 
                    Math.pow(pillarCenterY - coin.y, 2)
                );
                
                if (distanceToCoin < 10) {
                    canPlace = false;
                }
            }
            
            if (canPlace) {
                pillarCandidates.push({ x, y });
            }
        }
    }
    
    if (pillarCandidates.length === 0) {
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * pillarCandidates.length);
    const pillarPos = pillarCandidates[randomIndex];
    
    pillarBlink(pillarPos);
    
    pillarTimeoutPlace = setTimeout(() => {
        document.querySelectorAll('.pillar-blink').forEach(cell => {
            cell.classList.remove('pillar-blink');
        });
        
        pillars = [];
        for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
                pillars.push({ x: pillarPos.x + dx, y: pillarPos.y + dy });
            }
        }
        
        window.drawGame();
        
        pillarTimeoutRemove = setTimeout(() => {
            pillars = [];
            window.drawGame();
        }, 4743);
        
    }, 2743);
}

function triggerPillarSpawn() {
    placePillar();
}
function coinBlink() {
    const coinCell = document.getElementById(`cell-${coin.x}-${coin.y}`);
    if (coinCell) {
        coinCell.classList.add('coin-blink');
    }
}
function coinRemove() {
    coinsMissed++;
    coinsStreak = 0;
    triggerPillarSpawn();
    coin = {};
    placeCoin(); 
}
function coinTimerStart() {
    coinTimerClear();
    coinTimeoutBlink = setTimeout(coinBlink, 5743);
    coinTimeoutRemove = setTimeout(coinRemove, 7743);
}
function calculateDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function placeCoin() {
    coinTimerClear(); 
    const minCoord = BORDER_OFFSET;
    const maxCoord = GRID_SIZE - 1 - BORDER_OFFSET;
    const head = snake[0];
    const newCoinCandidates = [];
    for (let y = minCoord; y <= maxCoord; y++) {
        for (let x = minCoord; x <= maxCoord; x++) {
            if (!snake.some(segment => segment.x === x && segment.y === y) &&
                !pillars.some(pillar => pillar.x === x && pillar.y === y)) {
                newCoinCandidates.push({ x, y });
            }
        }
    }
    if (newCoinCandidates.length === 0) {
        return;
    }
    let newCoin = {};
    const MAX_HEAD_DIST = 5;
    const MAX_LAST_COIN_DIST = 10;
    const legalCandidates = newCoinCandidates.filter(candidate => {
        const distToHead = calculateDistance(candidate, head);
        const distToLastCoin = lastCoin.x !== undefined ? calculateDistance(candidate, lastCoin) : Infinity;

        return distToHead >= MAX_HEAD_DIST && distToLastCoin >= MAX_LAST_COIN_DIST;
    });
    if (legalCandidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * legalCandidates.length);
        newCoin = legalCandidates[randomIndex];
    } else {
        let bestCandidate = null;
        let minDistanceViolations = Infinity;
        for(const candidate of newCoinCandidates) {
            const distToHead = calculateDistance(candidate, head);
            const distToLastCoin = lastCoin.x !== undefined ? calculateDistance(candidate, lastCoin) : Infinity;
            let violations = 0;
            if (distToHead < MAX_HEAD_DIST) violations += (MAX_HEAD_DIST - distToHead);
            if (distToLastCoin < MAX_LAST_COIN_DIST) violations += (MAX_LAST_COIN_DIST - distToLastCoin);
            if (violations < minDistanceViolations) {
                minDistanceViolations = violations;
                bestCandidate = candidate;
            } else if (violations === minDistanceViolations && Math.random() < 0.5) {
                bestCandidate = candidate;
            }
        }
        if (bestCandidate) {
            newCoin = bestCandidate;
        } else {
            const randomIndex = Math.floor(Math.random() * newCoinCandidates.length);
            newCoin = newCoinCandidates[randomIndex];
        }
    }
    lastCoin = coin;
    coin = newCoin;
    
    isBigCoin = (coinsStreak > 0 && coinsStreak % 25 === 0);
    
    coinTimerStart();
}
window.updateScoreByTime = function() {
    score += 0.001 * (GAME_SPEED / 743);
    window.drawGame();
}
window.moveSnake = function() {
    currentDirection = nextDirection;
    const head = snake[0];
    let newHead = { x: head.x, y: head.y };
    switch (currentDirection) {
        case 'up': newHead.y--; break;
        case 'down': newHead.y++; break;
        case 'left': newHead.x--; break;
        case 'right': newHead.x++; break;
    }
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || 
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y) ||
        pillars.some(pillar => pillar.x === newHead.x && pillar.y === newHead.y)) {
        return window.gameOver(score, coinsCollected, isMobileMode);
    }
    snake.unshift(newHead);
    if (newHead.x === coin.x && newHead.y === coin.y) {
        if (isBigCoin) {
            score *= 1.1;
            coinsCollected += 5;
        } else {
            score *= 1.02;
            coinsCollected++;
        }
        coinsStreak++;
        coinTimerClear();
        pillarTimerClear();
        pillars = [];
        placeCoin();
    } else {
        snake.pop();
    }
    window.drawGame();
    window.updateControlStates();
}
window.drawGame = function() {
    scoreDisplay.innerHTML = `SCORE: ${score.toFixed(3)}<br>COINS: ${coinsCollected}<br>MISSED: ${coinsMissed}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('snake', 'coin', 'coin-blink', 'pillar', 'big-coin');
    });
    snake.forEach(segment => {
        const cell = document.getElementById(`cell-${segment.x}-${segment.y}`);
        if (cell) cell.classList.add('snake');
    });
    
    pillars.forEach(pillar => {
        const cell = document.getElementById(`cell-${pillar.x}-${pillar.y}`);
        if (cell) cell.classList.add('pillar');
    });
    
    const coinCell = document.getElementById(`cell-${coin.x}-${coin.y}`);
    if (coinCell) {
        if (isBigCoin) {
            coinCell.classList.add('coin', 'big-coin');
        } else {
            coinCell.classList.add('coin');
        }
        if (coinTimeoutBlink && coinCell.classList.contains('coin-blink')) {
            coinCell.classList.add('coin-blink');
        }
    }
}
window.startGame = function(mode) {
    startScreen.style.display = 'none';
    colorSettingsScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
    score = 1.0;
    coinsCollected = 0;
    coinsMissed = 0;
    coinsStreak = 0;
    isBigCoin = false;
    currentDirection = 'right';
    nextDirection = 'right';
    snake = [{x: 17, y: 17}];
    coin = {};
    lastCoin = {};
    pillars = [];
    coinTimerClear();
    pillarTimerClear();
    createGrid();
    placeCoin();
    window.setupControls(mode);
    window.drawGame();
    window.updateControlStates();
    gameInterval = setInterval(window.moveSnake, GAME_SPEED);
    scoreInterval = setInterval(window.updateScoreByTime, GAME_SPEED);
    lastMode = mode;
    window.lastMode = mode;
}
window.stopGame = function() {
    clearInterval(gameInterval);
    clearInterval(scoreInterval);
    coinTimerClear();
    pillarTimerClear();
    document.removeEventListener('keydown', window.handleDirectionChange);
}
window.gameOver = function(finalScore, collectedCoins, mode) {
    window.stopGame();
    lastMode = mode;
    window.lastMode = mode;
    const iceSnakeFinalScore = finalScore * (1 + collectedCoins * 0.5);
    const displayScore = iceSnakeFinalScore.toFixed(3);
    const primaryColor = colors.PRIMARY_NEON || '#bd00ff';
    const secondaryColor = colors.SECONDARY_NEON || '#00ffc8';
    document.getElementById('final-score').innerHTML = 
        `<span style="color: ${secondaryColor};">SCORE: ${finalScore.toFixed(3)}</span><br>
         <span style="color: ${primaryColor};">COINS: ${collectedCoins}</span><br>
         <span style="color: ${primaryColor};">MISSED: ${coinsMissed}</span><br>
         <span style="color: ${primaryColor};">SHARE YOUR HIGHSCORE</span><br>
         <span style="color: ${secondaryColor}; text-shadow: 0 0 5px ${secondaryColor};">IceSnakeFinalScore: ${displayScore}</span>`;
    gameOverScreen.style.display = 'flex';
}
window.showStartMenu = function() {
    gameOverScreen.style.display = 'none';
    gameContainer.style.display = 'none';
    colorSettingsScreen.style.display = 'none';
    startScreen.style.display = 'block';
    lastMode = false;
    window.lastMode = false;
    calledFromGameOver = false;
}

window.showColorSettings = function(fromGameOver = false) {
    if (startScreen) {
        startScreen.style.display = "none";
    }
    if (gameOverScreen) {
        gameOverScreen.style.display = 'none';
    }
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }
    if (colorSettingsScreen) {
        colorSettingsScreen.style.display = 'flex';
    }

    calledFromGameOver = fromGameOver;
    window.updateColorMenuButtons?.();
    window.renderThemeButtons?.();
};

window.backToGame = function() {
    if (colorSettingsScreen) {
        colorSettingsScreen.style.display = 'none';
    }

    if (lastMode !== false) {
        window.startGame?.(lastMode);
    } else {
        window.showStartMenu?.();
    }
};

window.renderThemeButtons = function() {
    themeList.innerHTML = '';
    const themeCount = availableThemes.length;
    colorSettingsBox.classList.remove('columns-2', 'columns-3');
    if (themeCount > 12) {
        colorSettingsBox.classList.add('columns-3');
    } else if (themeCount > 6) {
        colorSettingsBox.classList.add('columns-2');
    }
    availableThemes.forEach(theme => {
        const button = document.createElement('button');
        button.textContent = theme.name;
        button.classList.add('theme-button');
        if (theme.colors) {
            button.style.setProperty('border-color', theme.colors.PRIMARY_NEON || '#bd00ff');
            button.style.setProperty('background-color', theme.colors.PRIMARY_DARK || '#4b0082');
            button.style.setProperty('color', theme.colors.SECONDARY_NEON || '#00ffc8');
            button.style.setProperty('box-shadow', `0 0 15px ${theme.colors.PRIMARY_NEON || '#bd00ff'}`);
        }
        if (theme.filename === currentTheme) {
            button.classList.add('active');
        }
        button.onclick = async () => {
            await window.loadColors(theme.filename);
            window.renderThemeButtons();
        };
        themeList.appendChild(button);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    await fetchThemeList();
    await window.loadColors(currentTheme);
});
