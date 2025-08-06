// Enhanced 5-Chapter, 5-Level Escape Room Game
class DetectiveSanctuaryGame {
    constructor() {
        this.gameState = {
            currentChapter: 1,
            currentLevel: 1,
            keysCollected: 0,
            totalAttempts: 0,
            startTime: Date.now(),
            chapterStartTime: Date.now()
        };
        
        this.chapters = this.initializeChapters();
        this.maxAttempts = 4;
        this.currentPuzzle = null;
        
        this.init();
    }
    
    initializeChapters() {
        return {
            1: {
                name: "The Hidden Library",
                description: "Ancient books hold secrets of the past",
                levels: [
                    {
                        type: "anagram",
                        difficulty: "easy",
                        title: "📚 Scattered Letters",
                        content: `The old librarian's desk has scattered letter tiles. Rearrange them to form a word meaning "hidden knowledge".<br><br>
                        <div class="cipher-text">L O R E</div><br>
                        But wait... there are more letters underneath: <strong>S, C, R, T, E</strong><br>
                        Combine ALL letters to form the word.`,
                        letters: "LORESCRTE",
                        answer: "esoteric",
                        hint: "A word meaning 'intended for or understood by a small group; mysterious'"
                    },
                    {
                        type: "cipher",
                        difficulty: "easy", 
                        title: "🔤 Caesar's Secret",
                        content: `A note pinned to a book reads:<br><br>
                        <div class="cipher-text">ORRN DW WKH FDQGOH</div><br>
                        This appears to be a Caesar cipher. Each letter has been shifted forward in the alphabet.`,
                        encoded: "ORRN DW WKH FDQGOH",
                        answer: "look at the candle",
                        shift: 3,
                        hint: "Each letter is shifted 3 positions forward (A→D, B→E, C→F...)"
                    },
                    {
                        type: "pattern",
                        difficulty: "medium",
                        title: "🔢 Fibonacci Lock",
                        content: `A locked drawer has a sequence lock. The visible numbers are:<br><br>
                        <div class="number-sequence">1, 1, 2, 3, 5, 8, __, 21</div><br>
                        What number completes this famous mathematical sequence?`,
                        sequence: [1, 1, 2, 3, 5, 8, 13, 21],
                        answer: "13",
                        hint: "Each number is the sum of the two previous numbers (Fibonacci sequence)"
                    },
                    {
                        type: "logic",
                        difficulty: "medium",
                        title: "🧩 Symbol Logic",
                        content: `Three symbols on ancient books follow a pattern:<br><br>
                        <div class="grid-puzzle">
                            <div class="grid-cell">△</div>
                            <div class="grid-cell">→</div>
                            <div class="grid-cell">⬢</div>
                            <div class="grid-cell">⬢</div>
                            <div class="grid-cell">→</div>
                            <div class="grid-cell">○</div>
                            <div class="grid-cell">○</div>
                            <div class="grid-cell">→</div>
                            <div class="grid-cell">?</div>
                        </div><br>
                        What symbol replaces the question mark? (triangle, hexagon, circle, or square)`,
                        pattern: ["triangle", "hexagon", "circle"],
                        answer: "triangle",
                        hint: "Look at the pattern: triangle→hexagon, hexagon→circle, circle→?"
                    },
                    {
                        type: "riddle",
                        difficulty: "hard",
                        title: "🔮 The Librarian's Final Test",
                        content: `The head librarian left this challenging riddle:<br><br>
                        <em>"I am not a season, yet I bring change.<br>
                        I am not water, yet I can flow.<br>
                        I am not alive, yet I grow.<br>
                        I am not a teacher, yet I make you know.<br>
                        In libraries I'm treasured most,<br>
                        What am I that knowledge can boast?"</em><br><br>
                        Think carefully about what grows in libraries and flows between minds.`,
                        answer: "knowledge",
                        hints: [
                            "Think about what libraries contain",
                            "What 'flows' from person to person?",
                            "What 'grows' when shared and never diminishes?"
                        ]
                    }
                ]
            },
            2: {
                name: "The Alchemist's Laboratory", 
                description: "Where science meets mystery",
                levels: [
                    {
                        type: "math",
                        difficulty: "easy",
                        title: "⚗️ Chemical Formula",
                        content: `A beaker has the equation: <strong>H₂O + ? = H₂SO₄</strong><br><br>
                        What compound must be added? Enter as a chemical formula (like H2SO4).`,
                        answer: "so3",
                        hint: "H₂O (water) + SO₃ (sulfur trioxide) = H₂SO₄ (sulfuric acid)"
                    },
                    {
                        type: "sequence",
                        difficulty: "easy",
                        title: "🧪 Element Numbers", 
                        content: `Atomic numbers on the periodic table follow this pattern:<br><br>
                        <div class="number-sequence">2, 10, 18, __, 54</div><br>
                        These are the atomic numbers of noble gases. What's missing?`,
                        answer: "36",
                        hint: "Noble gases: Helium(2), Neon(10), Argon(18), Krypton(?), Xenon(54)"
                    },
                    {
                        type: "cipher",
                        difficulty: "medium", 
                        title: "🔬 Binary Message",
                        content: `A computer display shows this binary message:<br><br>
                        <div class="cipher-text">01000110 01001001 01010010 01000101</div><br>
                        Convert each 8-bit group to ASCII characters.`,
                        answer: "fire",
                        hint: "Convert binary to decimal, then to ASCII: 01000110=70='F', 01001001=73='I'..."
                    },
                    {
                        type: "pattern",
                        difficulty: "medium",
                        title: "🌡️ Temperature Sequence",
                        content: `Temperature readings show a pattern:<br><br>
                        <div class="number-sequence">273, 373, 473, 573, __</div><br>
                        These are Kelvin temperatures. What comes next?`,
                        answer: "673", 
                        hint: "Each temperature increases by 100K: 273→373→473→573→673"
                    },
                    {
                        type: "complex",
                        difficulty: "hard",
                        title: "⚡ Tesla's Challenge",
                        content: `Tesla's notes show: "The answer lies where science and magic meet."<br><br>
                        Three equations on the wall:<br>
                        <strong>E = mc²</strong> (Einstein's famous equation)<br>
                        <strong>F = ma</strong> (Newton's second law)<br> 
                        <strong>P = IV</strong> (Electrical power)<br><br>
                        The safe combination is the missing exponent in Einstein's equation if energy E=81 and mass m=9. What is c²?`,
                        answer: "1",
                        hint: "If E=mc² and E=81, m=9, then 81=9×c², so c²=81÷9=9... wait, check your math!"
                    }
                ]
            },
            3: {
                name: "The Clockmaker's Workshop",
                description: "Time holds all secrets",
                levels: [
                    {
                        type: "time",
                        difficulty: "easy", 
                        title: "🕐 Clock Reading",
                        content: `An antique clock stopped at exactly 3:15. In 24-hour format, this could be AM or PM.<br><br>
                        If the workshop opened at 9:00 AM and the clock stopped 6 hours and 15 minutes later, what time is shown in 24-hour format?`,
                        answer: "1515",
                        hint: "9:00 AM + 6h 15m = 15:15 (3:15 PM in 24-hour format, entered as 1515)"
                    },
                    {
                        type: "pattern",
                        difficulty: "easy",
                        title: "⚙️ Gear Ratios", 
                        content: `Clock gears have specific ratios:<br><br>
                        <div class="number-sequence">60:1, 60:1, 24:1, __:1</div><br>
                        This represents seconds:minutes, minutes:hours, hours:days, days:?`,
                        answer: "7",
                        hint: "Days in a week: 7 days = 1 week, so the ratio is 7:1"
                    },
                    {
                        type: "roman",
                        difficulty: "medium",
                        title: "🏛️ Roman Numerals",
                        content: `A Roman numeral clock face shows:<br><br>
                        <div class="cipher-text">MMXXIV - MCMLXIX = ?</div><br>
                        Calculate this Roman numeral subtraction and give the answer in Roman numerals.`,
                        calculation: "2024 - 1969 = 55",
                        answer: "lv", 
                        hint: "MMXXIV = 2024, MCMLXIX = 1969. 2024 - 1969 = 55 = LV"
                    },
                    {
                        type: "logic",
                        difficulty: "medium", 
                        title: "🔄 Time Paradox",
                        content: `A peculiar clock runs backwards during even hours and forwards during odd hours.<br><br>
                        If it's currently 2:00 PM and shows the correct time, what will it show after exactly 3 hours of real time?<br><br>
                        Enter in HH:MM format (like 14:30).`,
                        answer: "14:00",
                        hint: "2PM→3PM (backwards, -1h), 3PM→4PM (forwards, +1h), 4PM→5PM (backwards, -1h). Net: no change!"
                    },
                    {
                        type: "master",
                        difficulty: "hard",
                        title: "⏰ The Master Clock",
                        content: `The Master Clock has this inscription:<br><br>
                        <em>"I tick but have no sound,<br>
                        I move but stay in place,<br>
                        I count but know no numbers,<br>
                        I show but have no face.<br>
                        When my shadow is shortest,<br>
                        Truth shall be revealed."</em><br><br>
                        At what time of day is a shadow shortest? Answer in 24-hour format (HHMM).`,
                        answer: "1200",
                        hint: "When is the sun highest in the sky? That's when shadows are shortest - noon!"
                    }
                ]
            },
            4: {
                name: "The Cryptographer's Den",
                description: "Codes within codes within codes", 
                levels: [
                    {
                        type: "substitution",
                        difficulty: "easy",
                        title: "🔤 Simple Substitution", 
                        content: `A note uses A=1, B=2, C=3... substitution:<br><br>
                        <div class="cipher-text">20-8-5 11-5-25</div><br>
                        What does this spell?`,
                        answer: "the key",
                        hint: "T=20, H=8, E=5, (space), K=11, E=5, Y=25"
                    },
                    {
                        type: "morse",
                        difficulty: "easy",
                        title: "📡 Morse Code",
                        content: `A telegraph machine displays:<br><br>
                        <div class="cipher-text">... --- ...", "--- .--. . -.</div><br>
                        Decode this Morse code message. (Hint: ... --- ... is famous!)`,
                        answer: "sos open", 
                        hint: "S=..., O=---, S=..., (space), O=---, P=.--., E=., N=-."
                    },
                    {
                        type: "vigenere",
                        difficulty: "medium",
                        title: "🔐 Vigenère Cipher",
                        content: `Using the keyword <strong>RED</strong>, decode this Vigenère cipher:<br><br>
                        <div class="cipher-text">KZSN</div><br>
                        (Hint: Vigenère shifts each letter by the key letter's position: R=17, E=4, D=3...)`,
                        answer: "true",
                        hint: "K-17=T, Z-4=V... wait, that's not right. Try: K+9=T, Z+22=R, S+23=U, N+23=E backwards!"
                    },
                    {
                        type: "book_cipher", 
                        difficulty: "medium",
                        title: "📖 Book Cipher",
                        content: `Using this text as reference: <strong>"THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG"</strong><br><br>
                        Decode: <strong>1-1, 6-2, 9-1, 2-1</strong><br><br>
                        Format: word-letter (1-1 = 1st word, 1st letter = T)`,
                        answer: "tore",
                        hint: "1-1=T(HE), 6-2=V(ER), 9-1=L(AZY)... Wait, recheck the counting!"
                    },
                    {
                        type: "master_crypto",
                        difficulty: "hard", 
                        title: "🧠 The Cryptographer's Masterpiece",
                        content: `The final challenge combines multiple ciphers:<br><br>
                        <strong>Step 1:</strong> Caesar +5: <span class="cipher-text">MJQQT</span><br>
                        <strong>Step 2:</strong> Reverse the result<br>
                        <strong>Step 3:</strong> Remove every 2nd letter<br>
                        <strong>Step 4:</strong> Convert A=1, B=2, etc. and sum the numbers<br><br>
                        What's the final number?`,
                        steps: ["MJQQT → HELLO", "HELLO → OLLEH", "OLLEH → OLH", "O(15)+L(12)+H(8)=35"],
                        answer: "35",
                        hint: "Step by step: MJQQT-5=HELLO, reverse=OLLEH, remove 2nd&4th=OLH, O+L+H=15+12+8=35"
                    }
                ]
            },
            5: {
                name: "The Master's Final Chamber",
                description: "Only the worthy may pass",
                levels: [
                    {
                        type: "multi_step",
                        difficulty: "medium",
                        title: "🎭 The Three Masks",
                        content: `Three masks on the wall each show a number when you solve their riddle:<br><br>
                        <strong>Comedy Mask:</strong> "I am the number of sides on a hexagon"<br>
                        <strong>Tragedy Mask:</strong> "I am the square root of 49"<br>
                        <strong>Mystery Mask:</strong> "I am the number of primary colors"<br><br>
                        Enter the three numbers in order (like 637).`,
                        answer: "673",
                        hint: "Hexagon=6 sides, √49=7, Primary colors=3. Answer: 673"
                    },
                    {
                        type: "advanced_pattern",
                        difficulty: "medium",
                        title: "🌀 Spiral Logic",
                        content: `Numbers spiral outward from the center:<br><br>
                        <div class="grid-puzzle">
                            <div class="grid-cell">8</div>
                            <div class="grid-cell">1</div>
                            <div class="grid-cell">6</div>
                            <div class="grid-cell">3</div>
                            <div class="grid-cell">5</div>
                            <div class="grid-cell">7</div>
                            <div class="grid-cell">4</div>
                            <div class="grid-cell">9</div>
                            <div class="grid-cell">?</div>
                        </div><br>
                        What number completes the magic square? (All rows, columns, and diagonals sum to 15)`,
                        answer: "2",
                        hint: "In a 3×3 magic square summing to 15, the missing number makes the bottom row 4+9+?=15, so ?=2"
                    },
                    {
                        type: "word_math",
                        difficulty: "hard", 
                        title: "🔢 Word Mathematics",
                        content: `Solve this cryptarithmetic puzzle where each letter represents a unique digit:<br><br>
                        <div class="cipher-text">
                          SEND<br>
                        + MORE<br>
                        ------<br>
                         MONEY
                        </div><br>
                        What digit does the letter Y represent?`,
                        answer: "2",
                        hint: "Famous puzzle: S=9, E=5, N=6, D=7, M=1, O=0, R=8, Y=2. Check: 9567+1085=10652"
                    },
                    {
                        type: "meta_puzzle",
                        difficulty: "hard",
                        title: "🔄 The Recursive Riddle", 
                        content: `This puzzle refers to itself:<br><br>
                        <em>"In this very sentence, count the number of words that contain exactly 4 letters. That number, when written as a word and counted again for 4-letter words, gives you the answer."</em><br><br>
                        What number is the final answer?`,
                        analysis: "First count: 'this', 'very' = 2 four-letter words. 'Two' written out = 1 four-letter word",
                        answer: "1", 
                        hint: "Count 4-letter words in the sentence: 'this'(4), 'very'(4) = 2 total. 'Two' = 3 letters, not 4. But 'one' would be 3 letters... Think again!"
                    },
                    {
                        type: "ultimate",
                        difficulty: "extreme",
                        title: "👑 The Master's Ultimate Test",
                        content: `The final lock requires the Master Code. Combine all previous chapter keys:<br><br>
                        <strong>Chapter 1 Key:</strong> Number of letters in 'ESOTERIC' = ?<br>
                        <strong>Chapter 2 Key:</strong> Atomic number of Carbon = ?<br>
                        <strong>Chapter 3 Key:</strong> Hours in a day ÷ 2 = ?<br>
                        <strong>Chapter 4 Key:</strong> Letters in 'MORSE' = ?<br>
                        <strong>Chapter 5 Key:</strong> Sides of a pentagon = ?<br><br>
                        Enter all five numbers together (like 86125).`,
                        calculation: "ESOTERIC=8, Carbon=6, 24÷2=12, MORSE=5, Pentagon=5",
                        answer: "86125",
                        hint: "Count carefully: ESOTERIC(8 letters), Carbon(6), 24÷2(12), MORSE(5), Pentagon(5) = 86125"
                    }
                ]
            }
        };
    }
    
    init() {
        this.renderCurrentLevel();
        this.updateUI();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
        
        // Auto-submit on Enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
                if (inputs.length > 0) {
                    this.checkAnswer();
                }
            }
        });
    }
    
    renderCurrentLevel() {
        const chapter = this.chapters[this.gameState.currentChapter];
        const level = chapter.levels[this.gameState.currentLevel - 1];
        
        if (!level) {
            this.completeGame();
            return;
        }
        
        this.currentPuzzle = level;
        
        const content = `
            <div class="puzzle-title">
                ${level.title}
                <span class="difficulty-indicator difficulty-${level.difficulty}">${level.difficulty.toUpperCase()}</span>
            </div>
            <div class="puzzle-content">
                ${level.content}
            </div>
            <div class="input-section">
                <input type="text" id="puzzle-input" placeholder="Enter your answer..." autocomplete="off">
                <button onclick="game.checkAnswer()">Submit Answer</button>
            </div>
        `;
        
        document.getElementById('game-content').innerHTML = content;
        document.getElementById('puzzle-input').focus();
        
        // Reset attempt counter for this level
        this.currentAttempts = 0;
        this.updateAttempts();
    }
    
    checkAnswer() {
        const input = document.getElementById('puzzle-input');
        const userAnswer = input.value.trim().toLowerCase().replace(/\s+/g, ' ');
        const correctAnswer = this.currentPuzzle.answer.toLowerCase();
        
        this.currentAttempts++;
        this.gameState.totalAttempts++;
        
        if (userAnswer === correctAnswer || this.checkAlternativeAnswers(userAnswer, correctAnswer)) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(input);
        }
        
        this.updateAttempts();
    }
    
    checkAlternativeAnswers(userAnswer, correctAnswer) {
        // Handle different formats for the same answer
        const alternatives = {
            'the key': ['thekey', 'key'],
            'look at the candle': ['lookatthecandle', 'candle'],
            'sos open': ['sosopen', 'sos,open', 'sos, open'],
            // Add more alternatives as needed
        };
        
        return alternatives[correctAnswer] && alternatives[correctAnswer].includes(userAnswer);
    }
    
    handleCorrectAnswer() {
        // Play success sound
        this.playSound('success');
        
        // Show success feedback
        document.getElementById('hint-text').innerHTML = '✅ <strong>Correct!</strong> Well done!';
        document.getElementById('hint-text').style.color = '#90ee90';
        
        // Disable input
        document.getElementById('puzzle-input').disabled = true;
        
        // Progress to next level after delay
        setTimeout(() => {
            this.nextLevel();
        }, 1500);
    }
    
    handleIncorrectAnswer(input) {
        // Play fail sound
        this.playSound('fail');
        
        // Show shake animation
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 600);
        
        // Show feedback
        const remaining = this.maxAttempts - this.currentAttempts;
        if (remaining > 0) {
            document.getElementById('hint-text').innerHTML = `❌ Incorrect. ${remaining} attempts remaining.`;
            document.getElementById('hint-text').style.color = '#ff9090';
        } else {
            document.getElementById('hint-text').innerHTML = '❌ Max attempts reached. Hint is now available!';
            document.getElementById('hint-text').style.color = '#ffff90';
        }
        
        // Clear input
        input.value = '';
        input.focus();
    }
    
    nextLevel() {
        this.gameState.currentLevel++;
        
        if (this.gameState.currentLevel > 5) {
            // Chapter complete
            this.completeChapter();
        } else {
            // Next level in same chapter
            this.renderCurrentLevel();
            this.updateUI();
        }
    }
    
    completeChapter() {
        this.gameState.keysCollected++;
        
        // Update key display
        document.getElementById(`key-${this.gameState.currentChapter}`).classList.add('collected');
        
        // Show chapter complete modal
        const modal = document.getElementById('chapter-modal');
        const chapterText = document.getElementById('chapter-complete-text');
        
        chapterText.innerHTML = `You've earned the ${this.getOrdinalNumber(this.gameState.currentChapter)} key!<br>
                                <em>"${this.chapters[this.gameState.currentChapter].name}"</em> complete!`;
        
        modal.classList.remove('hidden');
        
        // Play success sound
        this.playSound('success');
    }
    
    nextChapter() {
        document.getElementById('chapter-modal').classList.add('hidden');
        
        this.gameState.currentChapter++;
        this.gameState.currentLevel = 1;
        this.gameState.chapterStartTime = Date.now();
        
        if (this.gameState.currentChapter > 5) {
            this.completeGame();
        } else {
            this.renderCurrentLevel();
            this.updateUI();
        }
    }
    
    completeGame() {
        // Show victory modal with animations
        const modal = document.getElementById('victory-modal');
        modal.classList.remove('hidden');
        
        // Calculate final stats
        const totalTime = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        
        // Update victory message with stats
        const victoryMessage = document.querySelector('.victory-message');
        victoryMessage.innerHTML = `
            <p>🕵️‍♂️ Master Detective Status Achieved! 🕵️‍♀️</p>
            <p>Your deduction skills are unmatched!</p>
            <p><strong>Total Time:</strong> ${minutes}m ${seconds}s</p>
            <p><strong>Total Attempts:</strong> ${this.gameState.totalAttempts}</p>
        `;
        
        // Animate keys
        setTimeout(() => {
            document.querySelectorAll('.victory-key').forEach((key, index) => {
                setTimeout(() => {
                    key.style.animation = 'key-spin 2s linear infinite';
                }, index * 200);
            });
        }, 1000);
    }
    
    showHint() {
        if (this.currentAttempts >= this.maxAttempts || this.gameState.currentLevel === 5) {
            const hint = this.currentPuzzle.hint || 'No additional hint available.';
            document.getElementById('hint-text').innerHTML = `💡 <strong>Hint:</strong> ${hint}`;
            document.getElementById('hint-text').style.color = '#ffdddd';
        } else {
            document.getElementById('hint-text').innerHTML = `💡 Try ${this.maxAttempts - this.currentAttempts} more time(s) before hint unlocks.`;
            document.getElementById('hint-text').style.color = '#ffcccc';
        }
    }
    
    updateUI() {
        // Update chapter display
        const chapter = this.chapters[this.gameState.currentChapter];
        if (chapter) {
            document.getElementById('chapter-display').textContent = 
                `Chapter ${this.gameState.currentChapter}: ${chapter.name}`;
        }
        
        // Update level display  
        document.getElementById('level-display').textContent = 
            `Level ${this.gameState.currentLevel}/5`;
            
        // Update progress bar
        const progress = ((this.gameState.currentLevel - 1) / 5) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }
    
    updateAttempts() {
        const remaining = Math.max(0, this.maxAttempts - this.currentAttempts);
        document.getElementById('attempts').textContent = 
            `Attempts: ${this.currentAttempts}/${this.maxAttempts}`;
    }
    
    playSound(type) {
        const audio = document.getElementById(`${type}-sound`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    getOrdinalNumber(num) {
        const ordinals = ['', 'first', 'second', 'third', 'fourth', 'fifth'];
        return ordinals[num] || `${num}th`;
    }
    
    restartGame() {
        // Reset all game state
        this.gameState = {
            currentChapter: 1,
            currentLevel: 1, 
            keysCollected: 0,
            totalAttempts: 0,
            startTime: Date.now(),
            chapterStartTime: Date.now()
        };
        
        // Reset UI
        document.querySelectorAll('.key-slot').forEach(slot => slot.classList.remove('collected'));
        document.getElementById('victory-modal').classList.add('hidden');
        document.getElementById('chapter-modal').classList.add('hidden');
        
        // Restart game
        this.renderCurrentLevel();
        this.updateUI();
    }
}

// Debug function
//function skipLevel() {
//  if (game) {
//        game.handleCorrectAnswer();
//    }
//}

function nextChapter() {
    if (game) {
        game.nextChapter();
    }
}

function restartGame() {
    if (game) {
        game.restartGame();
    }
}

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new DetectiveSanctuaryGame();
});
