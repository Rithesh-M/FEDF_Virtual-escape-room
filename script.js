// Game State Management
class GameState {
    constructor() {
        this.currentChapter = 1;
        this.currentLevel = 1;
        this.collectedKeys = [false, false, false];
        this.chapterProgress = [
            [false, false, false, false, false], // Chapter 1
            [false, false, false, false, false], // Chapter 2
            [false, false, false, false, false]  // Chapter 3
        ];
        this.loadFromStorage();
    }

    saveToStorage() {
        localStorage.setItem('shadowKeysGameState', JSON.stringify({
            currentChapter: this.currentChapter,
            currentLevel: this.currentLevel,
            collectedKeys: this.collectedKeys,
            chapterProgress: this.chapterProgress
        }));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('shadowKeysGameState');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentChapter = data.currentChapter || 1;
            this.currentLevel = data.currentLevel || 1;
            this.collectedKeys = data.collectedKeys || [false, false, false];
            this.chapterProgress = data.chapterProgress || [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ];
        }
    }

    resetGame() {
        this.currentChapter = 1;
        this.currentLevel = 1;
        this.collectedKeys = [false, false, false];
        this.chapterProgress = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false]
        ];
        this.saveToStorage();
    }

    completeLevel(chapter, level) {
        this.chapterProgress[chapter - 1][level - 1] = true;
        this.saveToStorage();
    }

    completeChapter(chapter) {
        this.collectedKeys[chapter - 1] = true;
        this.saveToStorage();
    }

    isChapterUnlocked(chapter) {
        if (chapter === 1) return true;
        return this.collectedKeys[chapter - 2];
    }

    isLevelUnlocked(chapter, level) {
        if (level === 1) return this.isChapterUnlocked(chapter);
        return this.chapterProgress[chapter - 1][level - 2];
    }
}

// Level Data
const LEVEL_DATA = {
    1: { // Chapter 1: The Crimson Gate
        1: { type: 'riddle', title: 'The Guardian\'s Challenge', 
             question: 'I am not alive, yet I grow; I don\'t have lungs, yet I need air; I don\'t have a mouth, yet water kills me. What am I?',
             answer: 'fire', hint: 'Think about something that consumes and spreads...' },
        2: { type: 'puzzle', title: 'The Numbered Locks', 
             description: 'Arrange the numbers in ascending order to unlock the gate.' },
        3: { type: 'riddle', title: 'The Shadow\'s Whisper',
             question: 'The more you take, the more you leave behind. What am I?',
             answer: 'footsteps', hint: 'Think about walking...' },
        4: { type: 'drag-drop', title: 'Ancient Symbols',
             description: 'Match each symbol with its meaning to reveal the path.' },
        5: { type: 'riddle', title: 'The Final Trial',
             question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?',
             answer: 'map', hint: 'Think about something that shows places...' }
    },
    2: { // Chapter 2: The Obsidian Depths  
        1: { type: 'riddle', title: 'The Depths Call',
             question: 'I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?',
             answer: 'echo', hint: 'Think about sound bouncing back...' },
        2: { type: 'drag-drop', title: 'Elemental Balance',
             description: 'Balance the elements by placing them in their correct positions.' },
        3: { type: 'riddle', title: 'The Mirror\'s Truth',
             question: 'Forward I am heavy, but backward I am not. What am I?',
             answer: 'ton', hint: 'Think about spelling...' },
        4: { type: 'puzzle', title: 'The Crystal Grid',
             description: 'Connect all crystals with a single path without crossing lines.' },
        5: { type: 'riddle', title: 'The Obsidian Key',
             question: 'I am taken from a mine and shut up in a wooden case, from which I am never released, yet I am used by almost everyone. What am I?',
             answer: 'pencil', hint: 'Think about something for writing...' }
    },
    3: { // Chapter 3: The Final Shadow
        1: { type: 'riddle', title: 'The Ultimate Test',
             question: 'What has keys but no locks, space but no room, and you can enter but not go inside?',
             answer: 'keyboard', hint: 'Think about typing...' },
        2: { type: 'puzzle', title: 'The Shadow Maze',
             description: 'Guide the light through the maze to banish the shadows.' },
        3: { type: 'drag-drop', title: 'The Final Arrangement',
             description: 'Arrange the three keys in the order they were obtained.' },
        4: { type: 'riddle', title: 'The Penultimate Challenge',
             question: 'I am not a season, yet I can make leaves fall. I am not a thief, yet I can steal time. What am I?',
             answer: 'wind', hint: 'Think about something that moves...' },
        5: { type: 'riddle', title: 'The Final Riddle',
             question: 'Born in darkness, I bring light. Created from nothing, I hold all knowledge. What am I?',
             answer: 'idea', hint: 'Think about thoughts and creativity...' }
    }
};

// Puzzle Data
const PUZZLE_DATA = {
    '1-2': { // Chapter 1, Level 2
        type: 'number-sequence',
        numbers: [7, 3, 9, 1, 5, 2, 8, 4, 6],
        solution: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    '2-4': { // Chapter 2, Level 4
        type: 'crystal-connect',
        crystals: [
            {id: 1, x: 100, y: 100, connections: [2, 4]},
            {id: 2, x: 300, y: 100, connections: [1, 3, 5]},
            {id: 3, x: 500, y: 100, connections: [2, 6]},
            {id: 4, x: 100, y: 300, connections: [1, 5, 7]},
            {id: 5, x: 300, y: 300, connections: [2, 4, 6, 8]},
            {id: 6, x: 500, y: 300, connections: [3, 5, 9]},
            {id: 7, x: 100, y: 500, connections: [4, 8]},
            {id: 8, x: 300, y: 500, connections: [5, 7, 9]},
            {id: 9, x: 500, y: 500, connections: [6, 8]}
        ]
    },
    '3-2': { // Chapter 3, Level 2
        type: 'shadow-maze',
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: {x: 1, y: 1},
        end: {x: 7, y: 7}
    }
};

// Drag and Drop Data
const DRAG_DROP_DATA = {
    '1-4': { // Chapter 1, Level 4
        title: 'Ancient Symbols',
        items: [
            {id: 'sun', text: '☀️ Sun', correctZone: 'light'},
            {id: 'moon', text: '🌙 Moon', correctZone: 'darkness'},
            {id: 'fire', text: '🔥 Fire', correctZone: 'energy'},
            {id: 'water', text: '💧 Water', correctZone: 'flow'}
        ],
        zones: [
            {id: 'light', text: 'Source of Light'},
            {id: 'darkness', text: 'Guardian of Night'},
            {id: 'energy', text: 'Force of Power'},
            {id: 'flow', text: 'Element of Motion'}
        ]
    },
    '2-2': { // Chapter 2, Level 2
        title: 'Elemental Balance',
        items: [
            {id: 'earth', text: '🌍 Earth', correctZone: 'stability'},
            {id: 'air', text: '💨 Air', correctZone: 'freedom'},
            {id: 'flame', text: '🔥 Flame', correctZone: 'passion'},
            {id: 'ice', text: '❄️ Ice', correctZone: 'calm'}
        ],
        zones: [
            {id: 'stability', text: 'Foundation'},
            {id: 'freedom', text: 'Movement'},
            {id: 'passion', text: 'Intensity'},
            {id: 'calm', text: 'Serenity'}
        ]
    },
    '3-3': { // Chapter 3, Level 3
        title: 'The Final Arrangement',
        items: [
            {id: 'key1', text: '🗝️ Crimson Key', correctZone: 'first'},
            {id: 'key2', text: '🔑 Obsidian Key', correctZone: 'second'},
            {id: 'key3', text: '🗝️ Shadow Key', correctZone: 'third'}
        ],
        zones: [
            {id: 'first', text: 'First Obtained'},
            {id: 'second', text: 'Second Obtained'},
            {id: 'third', text: 'Final Key'}
        ]
    }
};

// Game Controller
class GameController {
    constructor() {
        this.gameState = new GameState();
        this.currentPuzzleState = null;
        this.initializeEventListeners();
        this.showLoadingScreen();
    }

    initializeEventListeners() {
        // Global key controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscape();
            } else if (e.key.toLowerCase() === 'r') {
                this.handleRestart();
            }
        });

        // Menu buttons
        document.getElementById('start-game').addEventListener('click', () => {
            this.showChapterSelect();
        });

        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showMainMenu();
        });

        document.getElementById('back-to-menu-2').addEventListener('click', () => {
            this.showMainMenu();
        });

        // Chapter selection
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.addEventListener('click', (e) => {
                const chapterNum = parseInt(e.currentTarget.dataset.chapter);
                if (this.gameState.isChapterUnlocked(chapterNum)) {
                    this.startChapter(chapterNum);
                }
            });
        });

        // Level completion buttons
        document.getElementById('next-level').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('next-chapter').addEventListener('click', () => {
            this.nextChapter();
        });

        document.getElementById('back-to-chapters').addEventListener('click', () => {
            this.showChapterSelect();
        });

        document.getElementById('play-again').addEventListener('click', () => {
            this.gameState.resetGame();
            this.updateUI();
            this.showMainMenu();
        });

        // Riddle submission
        document.getElementById('submit-riddle').addEventListener('click', () => {
            this.submitRiddleAnswer();
        });

        document.getElementById('riddle-answer').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitRiddleAnswer();
            }
        });

        // Puzzle controls
        document.getElementById('puzzle-hint').addEventListener('click', () => {
            this.showPuzzleHint();
        });

        document.getElementById('reset-puzzle').addEventListener('click', () => {
            this.resetCurrentPuzzle();
        });
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'flex';
        document.getElementById('game-container').classList.add('hidden');

        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('game-container').classList.remove('hidden');
            this.showMainMenu();
        }, 3000);
    }

    showMainMenu() {
        this.hideAllScreens();
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('main-menu').classList.add('active');
        this.updateKeyDisplay();
    }

    showChapterSelect() {
        this.hideAllScreens();
        document.getElementById('chapter-select').classList.remove('hidden');
        this.updateChapterDisplay();
    }

    showGameArea() {
        this.hideAllScreens();
        document.getElementById('game-area').classList.remove('hidden');
        this.updateGameHeader();
    }

    hideAllScreens() {
        const screens = ['main-menu', 'chapter-select', 'game-area', 'level-complete', 'chapter-complete', 'game-complete'];
        screens.forEach(screen => {
            document.getElementById(screen).classList.add('hidden');
            document.getElementById(screen).classList.remove('active');
        });

        const levels = ['riddle-level', 'puzzle-level', 'drag-drop-level'];
        levels.forEach(level => {
            document.getElementById(level).classList.add('hidden');
        });
    }

    updateKeyDisplay() {
        document.querySelectorAll('.key').forEach((key, index) => {
            key.setAttribute('data-collected', this.gameState.collectedKeys[index]);
        });
    }

    updateChapterDisplay() {
        document.querySelectorAll('.chapter').forEach((chapter, index) => {
            const chapterNum = index + 1;
            const isUnlocked = this.gameState.isChapterUnlocked(chapterNum);
            
            chapter.classList.toggle('locked', !isUnlocked);
            
            // Update progress dots
            const dots = chapter.querySelectorAll('.dot');
            dots.forEach((dot, levelIndex) => {
                const isCompleted = this.gameState.chapterProgress[chapterNum - 1][levelIndex];
                dot.classList.toggle('completed', isCompleted);
            });
        });
    }

    updateGameHeader() {
        document.getElementById('current-chapter').textContent = `Chapter ${this.gameState.currentChapter}`;
        document.getElementById('current-level').textContent = `Level ${this.gameState.currentLevel}`;
    }

    startChapter(chapter) {
        this.gameState.currentChapter = chapter;
        this.gameState.currentLevel = 1;
        this.startLevel();
    }

    startLevel() {
        this.showGameArea();
        const levelData = LEVEL_DATA[this.gameState.currentChapter][this.gameState.currentLevel];
        
        switch (levelData.type) {
            case 'riddle':
                this.showRiddleLevel(levelData);
                break;
            case 'puzzle':
                this.showPuzzleLevel(levelData);
                break;
            case 'drag-drop':
                this.showDragDropLevel(levelData);
                break;
        }
    }

    showRiddleLevel(levelData) {
        document.getElementById('riddle-level').classList.remove('hidden');
        document.getElementById('riddle-title').textContent = levelData.title;
        document.getElementById('riddle-text').textContent = levelData.question;
        document.getElementById('riddle-answer').value = '';
        document.getElementById('riddle-answer').focus();
        
        // Hide hint initially
        document.querySelector('.riddle-hint').classList.add('hidden');
    }

    showPuzzleLevel(levelData) {
        document.getElementById('puzzle-level').classList.remove('hidden');
        document.getElementById('puzzle-title').textContent = levelData.title;
        
        const puzzleKey = `${this.gameState.currentChapter}-${this.gameState.currentLevel}`;
        const puzzleData = PUZZLE_DATA[puzzleKey];
        
        if (puzzleData) {
            this.initializePuzzle(puzzleData);
        }
    }

    showDragDropLevel(levelData) {
        document.getElementById('drag-drop-level').classList.remove('hidden');
        document.getElementById('drag-drop-title').textContent = levelData.title;
        
        const dragDropKey = `${this.gameState.currentChapter}-${this.gameState.currentLevel}`;
        const dragDropData = DRAG_DROP_DATA[dragDropKey];
        
        if (dragDropData) {
            this.initializeDragDrop(dragDropData);
        }
    }

    submitRiddleAnswer() {
        const answer = document.getElementById('riddle-answer').value.toLowerCase().trim();
        const levelData = LEVEL_DATA[this.gameState.currentChapter][this.gameState.currentLevel];
        
        if (answer === levelData.answer.toLowerCase()) {
            this.completeLevel();
        } else {
            // Show hint after wrong answer
            document.querySelector('.riddle-hint').classList.remove('hidden');
            document.getElementById('hint-text').textContent = levelData.hint;
            
            // Shake animation for wrong answer
            const input = document.getElementById('riddle-answer');
            input.classList.add('bounce');
            setTimeout(() => input.classList.remove('bounce'), 600);
        }
    }

    initializePuzzle(puzzleData) {
        const puzzleArea = document.getElementById('puzzle-area');
        puzzleArea.innerHTML = '';
        
        switch (puzzleData.type) {
            case 'number-sequence':
                this.createNumberSequencePuzzle(puzzleArea, puzzleData);
                break;
            case 'crystal-connect':
                this.createCrystalConnectPuzzle(puzzleArea, puzzleData);
                break;
            case 'shadow-maze':
                this.createShadowMazePuzzle(puzzleArea, puzzleData);
                break;
        }
    }

    createNumberSequencePuzzle(container, data) {
        const puzzleDiv = document.createElement('div');
        puzzleDiv.className = 'number-puzzle';
        puzzleDiv.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
            margin: 0 auto;
        `;

        data.numbers.forEach((num, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'number-tile';
            numberDiv.textContent = num;
            numberDiv.style.cssText = `
                width: 80px;
                height: 80px;
                background: linear-gradient(45deg, var(--secondary-dark), var(--dark-red));
                border: 2px solid var(--crimson);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                color: var(--gold);
                cursor: pointer;
                transition: all 0.3s ease;
                user-select: none;
            `;

            numberDiv.addEventListener('click', () => {
                this.swapNumbers(numberDiv, data);
            });

            puzzleDiv.appendChild(numberDiv);
        });

        container.appendChild(puzzleDiv);
        this.currentPuzzleState = { type: 'number-sequence', data: [...data.numbers], solution: data.solution };
    }

    swapNumbers(clickedTile, data) {
        // Find empty space (represented by 0) or implement swapping logic
        const tiles = document.querySelectorAll('.number-tile');
        const currentOrder = Array.from(tiles).map(tile => parseInt(tile.textContent));
        
        // Simple swap with adjacent tiles for demo
        const clickedIndex = Array.from(tiles).indexOf(clickedTile);
        if (clickedIndex > 0) {
            const temp = currentOrder[clickedIndex];
            currentOrder[clickedIndex] = currentOrder[clickedIndex - 1];
            currentOrder[clickedIndex - 1] = temp;
            
            tiles[clickedIndex].textContent = currentOrder[clickedIndex];
            tiles[clickedIndex - 1].textContent = currentOrder[clickedIndex - 1];
            
            this.currentPuzzleState.data = currentOrder;
            this.checkPuzzleSolution();
        }
    }

    createCrystalConnectPuzzle(container, data) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '600');
        svg.setAttribute('height', '600');
        svg.style.background = 'rgba(0, 0, 0, 0.2)';
        svg.style.borderRadius = '10px';

        // Draw crystals
        data.crystals.forEach(crystal => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', crystal.x);
            circle.setAttribute('cy', crystal.y);
            circle.setAttribute('r', '20');
            circle.setAttribute('fill', 'var(--gold)');
            circle.setAttribute('stroke', 'var(--crimson)');
            circle.setAttribute('stroke-width', '2');
            circle.style.cursor = 'pointer';
            
            circle.addEventListener('click', () => {
                this.toggleCrystalConnection(crystal, data);
            });
            
            svg.appendChild(circle);
        });

        container.appendChild(svg);
        this.currentPuzzleState = { type: 'crystal-connect', data: data, connections: [] };
    }

    toggleCrystalConnection(crystal, data) {
        // Add connection logic
        console.log('Crystal clicked:', crystal.id);
        // For demo, just complete after a few clicks
        if (this.currentPuzzleState.connections.length >= 5) {
            this.completeLevel();
        } else {
            this.currentPuzzleState.connections.push(crystal.id);
        }
    }

    createShadowMazePuzzle(container, data) {
        const mazeDiv = document.createElement('div');
        mazeDiv.className = 'shadow-maze';
        mazeDiv.style.cssText = `
            display: grid;
            grid-template-columns: repeat(9, 40px);
            grid-template-rows: repeat(9, 40px);
            gap: 2px;
            margin: 0 auto;
            max-width: 380px;
        `;

        data.maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                const cellDiv = document.createElement('div');
                cellDiv.style.cssText = `
                    width: 40px;
                    height: 40px;
                    border-radius: 4px;
                `;
                
                if (cell === 1) {
                    // Wall
                    cellDiv.style.background = 'var(--secondary-dark)';
                    cellDiv.style.border = '1px solid var(--dark-red)';
                } else {
                    // Path
                    cellDiv.style.background = 'rgba(139, 0, 0, 0.2)';
                    cellDiv.style.border = '1px solid rgba(139, 0, 0, 0.5)';
                }

                if (x === data.start.x && y === data.start.y) {
                    cellDiv.style.background = 'var(--gold)';
                    cellDiv.innerHTML = '⭐';
                    cellDiv.style.textAlign = 'center';
                    cellDiv.style.lineHeight = '38px';
                }

                if (x === data.end.x && y === data.end.y) {
                    cellDiv.style.background = 'var(--crimson)';
                    cellDiv.innerHTML = '🚪';
                    cellDiv.style.textAlign = 'center';
                    cellDiv.style.lineHeight = '38px';
                }

                mazeDiv.appendChild(cellDiv);
            });
        });

        container.appendChild(mazeDiv);
        
        // Auto-complete for demo
        setTimeout(() => {
            this.completeLevel();
        }, 2000);
    }

    checkPuzzleSolution() {
        if (this.currentPuzzleState.type === 'number-sequence') {
            const isComplete = JSON.stringify(this.currentPuzzleState.data) === JSON.stringify(this.currentPuzzleState.solution);
            if (isComplete) {
                this.completeLevel();
            }
        }
    }

    initializeDragDrop(data) {
        const dragItems = document.getElementById('drag-items');
        const dropZones = document.getElementById('drop-zones');
        
        dragItems.innerHTML = '';
        dropZones.innerHTML = '';

        // Create draggable items
        data.items.forEach(item => {
            const dragItem = document.createElement('div');
            dragItem.className = 'drag-item';
            dragItem.textContent = item.text;
            dragItem.draggable = true;
            dragItem.dataset.itemId = item.id;
            dragItem.dataset.correctZone = item.correctZone;

            dragItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.id);
                dragItem.classList.add('dragging');
            });

            dragItem.addEventListener('dragend', () => {
                dragItem.classList.remove('dragging');
            });

            dragItems.appendChild(dragItem);
        });

        // Create drop zones
        data.zones.forEach(zone => {
            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.textContent = zone.text;
            dropZone.dataset.zoneId = zone.id;

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                const itemId = e.dataTransfer.getData('text/plain');
                const draggedItem = document.querySelector(`[data-item-id="${itemId}"]`);
                
                if (draggedItem && draggedItem.dataset.correctZone === zone.id) {
                    dropZone.appendChild(draggedItem);
                    dropZone.classList.add('filled');
                    dropZone.classList.remove('drag-over');
                    this.updateDragDropProgress(data);
                } else {
                    dropZone.classList.remove('drag-over');
                    // Wrong placement - return to original position
                    if (draggedItem) {
                        dragItems.appendChild(draggedItem);
                    }
                }
            });

            dropZones.appendChild(dropZone);
        });

        this.currentPuzzleState = { type: 'drag-drop', data: data, completed: 0 };
    }

    updateDragDropProgress(data) {
        const filledZones = document.querySelectorAll('.drop-zone.filled').length;
        const progressFill = document.querySelector('.progress-fill');
        const progress = (filledZones / data.zones.length) * 100;
        
        progressFill.style.width = `${progress}%`;
        this.currentPuzzleState.completed = filledZones;

        if (filledZones === data.zones.length) {
            setTimeout(() => {
                this.completeLevel();
            }, 500);
        }
    }

    showPuzzleHint() {
        alert('Think carefully about the pattern or try a different approach!');
    }

    resetCurrentPuzzle() {
        this.startLevel(); // Restart the current level
    }

    completeLevel() {
        this.gameState.completeLevel(this.gameState.currentChapter, this.gameState.currentLevel);
        
        // Show completion screen
        document.getElementById('level-complete').classList.remove('hidden');
        
        const isLastLevel = this.gameState.currentLevel === 5;
        document.getElementById('complete-message').textContent = isLastLevel 
            ? 'Chapter completed! The key is yours!' 
            : 'Well done! Proceed to the next challenge.';
        
        if (isLastLevel) {
            // Chapter completed
            setTimeout(() => {
                this.completeChapter();
            }, 2000);
        }
    }

    completeChapter() {
        document.getElementById('level-complete').classList.add('hidden');
        this.gameState.completeChapter(this.gameState.currentChapter);
        
        if (this.gameState.currentChapter === 3) {
            // Game completed
            this.showGameComplete();
        } else {
            // Show chapter complete
            document.getElementById('chapter-complete').classList.remove('hidden');
        }
    }

    showGameComplete() {
        document.getElementById('chapter-complete').classList.add('hidden');
        document.getElementById('game-complete').classList.remove('hidden');
    }

    nextLevel() {
        document.getElementById('level-complete').classList.add('hidden');
        this.gameState.currentLevel++;
        this.startLevel();
    }

    nextChapter() {
        document.getElementById('chapter-complete').classList.add('hidden');
        this.gameState.currentChapter++;
        this.gameState.currentLevel = 1;
        this.showChapterSelect();
    }

    handleEscape() {
        if (!document.getElementById('main-menu').classList.contains('hidden')) {
            return; // Already at main menu
        }
        
        if (!document.getElementById('chapter-select').classList.contains('hidden')) {
            this.showMainMenu();
        } else if (!document.getElementById('game-area').classList.contains('hidden')) {
            this.showChapterSelect();
        }
    }

    handleRestart() {
        if (!document.getElementById('game-area').classList.contains('hidden')) {
            this.startLevel(); // Restart current level
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameController();
    
    // Add some extra flair with particle effects (optional)
    if (typeof createParticleEffect === 'function') {
        createParticleEffect();
    }
});

// Additional utility functions for enhanced animations
function addFloatingParticles() {
    const numParticles = 20;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 7000);
    }
}

// CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 1;
        }
        50% { 
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
            opacity: 0.8;
        }
        75% { 
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Trigger floating particles periodically
setInterval(addFloatingParticles, 10000);