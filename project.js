// Enhanced Data Storage Structure
const DATA_STORAGE = {
    users: [],
    currentUser: null,
    quizQuestions: {
        easy: [],
        medium: [],
        hard: [],
        expert: []
    },
    achievements: [
        { id: 'first_game', name: 'First Steps', icon: '🎉', description: 'Complete your first game' },
        { id: 'score_100', name: 'Century', icon: '💯', description: 'Score 100 points' },
        { id: 'score_500', name: 'Champion', icon: '🏆', description: 'Score 500 points' },
        { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach level 5' },
        { id: 'level_10', name: 'Master Mind', icon: '🧠', description: 'Reach level 10' },
        { id: 'games_10', name: 'Dedicated', icon: '💪', description: 'Play 10 games' },
        { id: 'perfect_round', name: 'Perfectionist', icon: '🎯', description: 'Complete a perfect round' }
    ]
};

// Game State
let gameState = {
    score: 0,
    level: 1,
    highScore: 0,
    maxLevel: 0,
    gamesPlayed: 0,
    currentChallenge: 0,
    challenges: ['memory', 'math', 'pattern', 'color', 'word', 'logic', 'sequence'],
    memoryPattern: [],
    userPattern: [],
    isShowingPattern: false,
    shownWords: [],
    currentWord: '',
    colorWord: '',
    colorDisplay: '',
    timeLimit: 0,
    timer: null,
    difficulty: 'medium',
    theme: 'dark',
    perfectRound: true
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initializeData();
    loadTheme();
    checkAuthentication();
});

// Initialize Data Storage
function initializeData() {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('mindEscapeUsers');
    if (storedUsers) {
        DATA_STORAGE.users = JSON.parse(storedUsers);
    }
    
    // Load current user
    const currentUser = localStorage.getItem('mindEscapeCurrentUser');
    if (currentUser) {
        DATA_STORAGE.currentUser = JSON.parse(currentUser);
    }
    
    // Initialize enhanced quiz questions
    initializeQuizQuestions();
}

// Initialize Enhanced Quiz Questions
function initializeQuizQuestions() {
    // Easy Math Questions
    DATA_STORAGE.quizQuestions.easy = [
        { type: 'math', question: 'What is 5 + 3?', answer: 8, level: 'easy' },
        { type: 'math', question: 'What is 12 - 7?', answer: 5, level: 'easy' },
        { type: 'math', question: 'What is 4 × 3?', answer: 12, level: 'easy' },
        { type: 'logic', question: 'If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly?', answer: false, level: 'easy' },
        { type: 'sequence', question: 'What comes next: 2, 4, 6, 8, ?', answer: 10, level: 'easy' }
    ];
    
    // Medium Questions
    DATA_STORAGE.quizQuestions.medium = [
        { type: 'math', question: 'What is 15 × 8?', answer: 120, level: 'medium' },
        { type: 'math', question: 'What is 144 ÷ 12?', answer: 12, level: 'medium' },
        { type: 'math', question: 'What is (25 + 15) × 2?', answer: 80, level: 'medium' },
        { type: 'logic', question: 'If A > B and B > C, then A > C', answer: true, level: 'medium' },
        { type: 'sequence', question: 'What comes next: 1, 1, 2, 3, 5, 8, ?', answer: 13, level: 'medium' }
    ];
    
    // Hard Questions
    DATA_STORAGE.quizQuestions.hard = [
        { type: 'math', question: 'What is 23 × 17?', answer: 391, level: 'hard' },
        { type: 'math', question: 'What is 15% of 240?', answer: 36, level: 'hard' },
        { type: 'math', question: 'What is √144?', answer: 12, level: 'hard' },
        { type: 'logic', question: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?', answer: 5, level: 'hard' },
        { type: 'sequence', question: 'What comes next: 2, 6, 12, 20, 30, ?', answer: 42, level: 'hard' }
    ];
    
    // Expert Questions
    DATA_STORAGE.quizQuestions.expert = [
        { type: 'math', question: 'What is 47 × 83?', answer: 3901, level: 'expert' },
        { type: 'math', question: 'What is 2^10?', answer: 1024, level: 'expert' },
        { type: 'logic', question: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost (in cents)?', answer: 5, level: 'expert' },
        { type: 'sequence', question: 'What comes next: 1, 4, 9, 16, 25, 36, ?', answer: 49, level: 'expert' }
    ];
}

// Authentication Functions
function checkAuthentication() {
    if (DATA_STORAGE.currentUser) {
        showPage('homePage');
        updateUserDisplay();
        loadStats();
        updateHomeStats();
    } else {
        showPage('loginPage');
    }
}

function showAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelectorAll('.auth-tab')[0].classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelectorAll('.auth-tab')[1].classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

function handleLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const messageEl = document.getElementById('loginMessage');
    
    if (!username || !password) {
        messageEl.textContent = 'Please fill in all fields';
        messageEl.style.color = '#ef4444';
        return;
    }
    
    const user = DATA_STORAGE.users.find(u => u.username === username && u.password === password);
    
    if (user) {
        DATA_STORAGE.currentUser = user;
        localStorage.setItem('mindEscapeCurrentUser', JSON.stringify(user));
        messageEl.textContent = 'Login successful!';
        messageEl.style.color = '#10b981';
        
        setTimeout(() => {
            showPage('homePage');
            updateUserDisplay();
            loadStats();
            updateHomeStats();
        }, 500);
    } else {
        messageEl.textContent = 'Invalid username or password';
        messageEl.style.color = '#ef4444';
    }
}

function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const messageEl = document.getElementById('registerMessage');
    
    if (!username || !email || !password || !confirmPassword) {
        messageEl.textContent = 'Please fill in all fields';
        messageEl.style.color = '#ef4444';
        return;
    }
    
    if (password !== confirmPassword) {
        messageEl.textContent = 'Passwords do not match';
        messageEl.style.color = '#ef4444';
        return;
    }
    
    if (password.length < 6) {
        messageEl.textContent = 'Password must be at least 6 characters';
        messageEl.style.color = '#ef4444';
        return;
    }
    
    if (DATA_STORAGE.users.find(u => u.username === username)) {
        messageEl.textContent = 'Username already exists';
        messageEl.style.color = '#ef4444';
        return;
    }
    
    const newUser = {
        username,
        email,
        password,
        stats: {
            highScore: 0,
            gamesPlayed: 0,
            maxLevel: 0,
            totalScore: 0,
            wins: 0
        },
        achievements: [],
        createdAt: new Date().toISOString()
    };
    
    DATA_STORAGE.users.push(newUser);
    localStorage.setItem('mindEscapeUsers', JSON.stringify(DATA_STORAGE.users));
    
    messageEl.textContent = 'Registration successful! Please login.';
    messageEl.style.color = '#10b981';
    
    setTimeout(() => {
        showAuthTab('login');
        document.getElementById('loginUsername').value = username;
    }, 1000);
}

function handleLogout() {
    DATA_STORAGE.currentUser = null;
    localStorage.removeItem('mindEscapeCurrentUser');
    showPage('loginPage');
    document.getElementById('profileMenu').classList.remove('active');
}

function updateUserDisplay() {
    if (DATA_STORAGE.currentUser) {
        document.getElementById('usernameDisplay').textContent = DATA_STORAGE.currentUser.username;
        const initial = DATA_STORAGE.currentUser.username.charAt(0).toUpperCase();
        document.getElementById('profileIcon').textContent = initial;
    }
}

// Profile Functions
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('active');
}

function showProfile() {
    document.getElementById('profileMenu').classList.remove('active');
    showPage('profilePage');
    updateProfileDisplay();
}

function showSettings() {
    document.getElementById('profileMenu').classList.remove('active');
    showPage('settingsPage');
}

function updateProfileDisplay() {
    if (!DATA_STORAGE.currentUser) return;
    
    const user = DATA_STORAGE.currentUser;
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileTotalScore').textContent = user.stats.totalScore || 0;
    document.getElementById('profileGamesPlayed').textContent = user.stats.gamesPlayed || 0;
    document.getElementById('profileMaxLevel').textContent = user.stats.maxLevel || 0;
    
    const winRate = user.stats.gamesPlayed > 0 
        ? Math.round((user.stats.wins / user.stats.gamesPlayed) * 100) 
        : 0;
    document.getElementById('profileWinRate').textContent = winRate + '%';
    
    // Display achievements
    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.innerHTML = '';
    
    DATA_STORAGE.achievements.forEach(achievement => {
        const earned = user.achievements.includes(achievement.id);
        const achievementEl = document.createElement('div');
        achievementEl.className = 'achievement-card' + (earned ? ' earned' : '');
        achievementEl.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        `;
        achievementsGrid.appendChild(achievementEl);
    });
}

// Theme Functions
function loadTheme() {
    const savedTheme = localStorage.getItem('mindEscapeTheme') || 'dark';
    gameState.theme = savedTheme;
    applyTheme(savedTheme);
}

function toggleTheme() {
    const newTheme = gameState.theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    gameState.theme = theme;
    localStorage.setItem('mindEscapeTheme', theme);
    applyTheme(theme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'light') {
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('light-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}

// Create animated particles
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particles.appendChild(particle);
    }
}

// Load saved stats
function loadStats() {
    if (DATA_STORAGE.currentUser) {
        gameState.highScore = DATA_STORAGE.currentUser.stats.highScore || 0;
        gameState.gamesPlayed = DATA_STORAGE.currentUser.stats.gamesPlayed || 0;
        gameState.maxLevel = DATA_STORAGE.currentUser.stats.maxLevel || 0;
    } else {
        gameState.highScore = 0;
        gameState.gamesPlayed = 0;
        gameState.maxLevel = 0;
    }
}

// Save stats
function saveStats() {
    if (DATA_STORAGE.currentUser) {
        DATA_STORAGE.currentUser.stats.highScore = gameState.highScore;
        DATA_STORAGE.currentUser.stats.gamesPlayed = gameState.gamesPlayed;
        DATA_STORAGE.currentUser.stats.maxLevel = gameState.maxLevel;
        DATA_STORAGE.currentUser.stats.totalScore = (DATA_STORAGE.currentUser.stats.totalScore || 0) + gameState.score;
        
        // Update user in storage
        const userIndex = DATA_STORAGE.users.findIndex(u => u.username === DATA_STORAGE.currentUser.username);
        if (userIndex !== -1) {
            DATA_STORAGE.users[userIndex] = DATA_STORAGE.currentUser;
            localStorage.setItem('mindEscapeUsers', JSON.stringify(DATA_STORAGE.users));
            localStorage.setItem('mindEscapeCurrentUser', JSON.stringify(DATA_STORAGE.currentUser));
        }
    }
    updateHomeStats();
}

// Check and award achievements
function checkAchievements() {
    if (!DATA_STORAGE.currentUser) return;
    
    const user = DATA_STORAGE.currentUser;
    const newAchievements = [];
    
    // First game
    if (user.stats.gamesPlayed >= 1 && !user.achievements.includes('first_game')) {
        user.achievements.push('first_game');
        newAchievements.push('First Steps');
    }
    
    // Score achievements
    if (gameState.score >= 100 && !user.achievements.includes('score_100')) {
        user.achievements.push('score_100');
        newAchievements.push('Century');
    }
    
    if (gameState.score >= 500 && !user.achievements.includes('score_500')) {
        user.achievements.push('score_500');
        newAchievements.push('Champion');
    }
    
    // Level achievements
    if (gameState.level >= 5 && !user.achievements.includes('level_5')) {
        user.achievements.push('level_5');
        newAchievements.push('Rising Star');
    }
    
    if (gameState.level >= 10 && !user.achievements.includes('level_10')) {
        user.achievements.push('level_10');
        newAchievements.push('Master Mind');
    }
    
    // Games played achievement
    if (user.stats.gamesPlayed >= 10 && !user.achievements.includes('games_10')) {
        user.achievements.push('games_10');
        newAchievements.push('Dedicated');
    }
    
    // Perfect round
    if (gameState.perfectRound && !user.achievements.includes('perfect_round')) {
        user.achievements.push('perfect_round');
        newAchievements.push('Perfectionist');
    }
    
    // Show achievement notifications
    if (newAchievements.length > 0) {
        showAchievementNotification(newAchievements);
    }
}

// Show achievement notification
function showAchievementNotification(achievements) {
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'achievement-notification';
            notification.innerHTML = `
                <div class="achievement-notification-content">
                    <span class="achievement-notification-icon">🏆</span>
                    <div>
                        <div class="achievement-notification-title">Achievement Unlocked!</div>
                        <div class="achievement-notification-name">${achievement}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }, index * 500);
    });
}

// Update home page stats
function updateHomeStats() {
    document.getElementById('highScore').textContent = gameState.highScore;
    document.getElementById('gamesPlayed').textContent = gameState.gamesPlayed;
    document.getElementById('maxLevel').textContent = gameState.maxLevel;
}

// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function goHome() {
    if (gameState.timer) clearInterval(gameState.timer);
    showPage('homePage');
    updateHomeStats();
}

function startGame() {
    gameState.score = 0;
    gameState.level = 1;
    gameState.currentChallenge = 0;
    gameState.shownWords = [];
    gameState.perfectRound = true;
    updateScore();
    showPage('gamePage');
    loadChallenge();
}

// Update score display
function updateScore() {
    document.getElementById('currentScore').textContent = gameState.score;
    document.getElementById('currentLevel').textContent = gameState.level;
    const progress = ((gameState.currentChallenge % 5) / 5) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Load next challenge
function loadChallenge() {
    const challengeType = gameState.challenges[gameState.currentChallenge % 5];
    
    // Hide all challenges
    document.querySelectorAll('.challenge').forEach(c => c.classList.remove('active'));
    
    // Show current challenge
    switch(challengeType) {
        case 'memory':
            loadMemoryChallenge();
            break;
        case 'math':
            loadMathChallenge();
            break;
        case 'pattern':
            loadPatternChallenge();
            break;
        case 'color':
            loadColorChallenge();
            break;
        case 'word':
            loadWordChallenge();
            break;
    }
}

// Memory Challenge - MUCH HARDER
function loadMemoryChallenge() {
    document.getElementById('challengeTitle').textContent = 'Memory Matrix';
    document.getElementById('challengeInstructions').textContent = 'Remember the sequence - Gets faster each level!';
    document.getElementById('memoryChallenge').classList.add('active');
    
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    gameState.memoryPattern = [];
    gameState.userPattern = [];
    
    // Grid size increases more aggressively
    const gridSize = Math.min(9 + gameState.level, 25);
    const cols = Math.ceil(Math.sqrt(gridSize));
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleMemoryClick(i));
        grid.appendChild(cell);
    }
    
    document.getElementById('memoryStartBtn').style.display = 'block';
}

function startMemoryChallenge() {
    document.getElementById('memoryStartBtn').style.display = 'none';
    const gridSize = document.querySelectorAll('.grid-cell').length;
    
    // Pattern length increases significantly with level
    const patternLength = 3 + gameState.level;
    
    gameState.memoryPattern = [];
    for (let i = 0; i < patternLength; i++) {
        gameState.memoryPattern.push(Math.floor(Math.random() * gridSize));
    }
    
    gameState.isShowingPattern = true;
    showMemoryPattern();
}

function showMemoryPattern() {
    const cells = document.querySelectorAll('.grid-cell');
    let index = 0;
    
    // Speed increases with level - gets much faster!
    const speed = Math.max(300, 800 - (gameState.level * 40));
    
    const interval = setInterval(() => {
        if (index > 0) {
            cells[gameState.memoryPattern[index - 1]].classList.remove('highlight');
        }
        
        if (index < gameState.memoryPattern.length) {
            cells[gameState.memoryPattern[index]].classList.add('highlight');
            index++;
        } else {
            clearInterval(interval);
            cells[gameState.memoryPattern[index - 1]].classList.remove('highlight');
            gameState.isShowingPattern = false;
            gameState.userPattern = [];
        }
    }, speed);
}

function handleMemoryClick(index) {
    if (gameState.isShowingPattern) return;
    
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.classList.add('active');
    
    setTimeout(() => cell.classList.remove('active'), 300);
    
    gameState.userPattern.push(index);
    
    const currentIndex = gameState.userPattern.length - 1;
    if (gameState.userPattern[currentIndex] !== gameState.memoryPattern[currentIndex]) {
        cell.classList.add('wrong');
        setTimeout(() => handleWrongAnswer(), 800);
        return;
    }
    
    if (gameState.userPattern.length === gameState.memoryPattern.length) {
        document.querySelectorAll('.grid-cell').forEach(c => c.classList.add('correct'));
        setTimeout(() => handleCorrectAnswer(), 800);
    }
}

// Math Challenge - SIGNIFICANTLY HARDER
function loadMathChallenge() {
    document.getElementById('challengeTitle').textContent = 'Speed Math';
    document.getElementById('challengeInstructions').textContent = 'Solve quickly or fail!';
    document.getElementById('mathChallenge').classList.add('active');
    
    let num1, num2, operator, answer;
    
    // Level 1-2: Basic operations
    if (gameState.level <= 2) {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operator = ['+', '-'][Math.floor(Math.random() * 2)];
    }
    // Level 3-5: Add multiplication
    else if (gameState.level <= 5) {
        num1 = Math.floor(Math.random() * 30) + 10;
        num2 = Math.floor(Math.random() * 15) + 1;
        operator = ['+', '-', '×'][Math.floor(Math.random() * 3)];
    }
    // Level 6-8: Add division and larger numbers
    else if (gameState.level <= 8) {
        const operators = ['+', '-', '×', '÷'];
        operator = operators[Math.floor(Math.random() * operators.length)];
        
        if (operator === '÷') {
            const divisor = Math.floor(Math.random() * 15) + 2;
            const quotient = Math.floor(Math.random() * 30) + 1;
            num1 = divisor * quotient;
            num2 = divisor;
        } else {
            num1 = Math.floor(Math.random() * 100) + 20;
            num2 = Math.floor(Math.random() * 50) + 10;
        }
    }
    // Level 9+: Multi-step operations with parentheses
    else {
        const subNum1 = Math.floor(Math.random() * 20) + 1;
        const subNum2 = Math.floor(Math.random() * 20) + 1;
        const subOp = ['+', '-'][Math.floor(Math.random() * 2)];
        const mainNum = Math.floor(Math.random() * 15) + 1;
        const mainOp = ['×', '÷'][Math.floor(Math.random() * 2)];
        
        const subResult = subOp === '+' ? subNum1 + subNum2 : subNum1 - subNum2;
        
        if (mainOp === '×') {
            answer = subResult * mainNum;
            document.getElementById('mathQuestion').textContent = `(${subNum1} ${subOp} ${subNum2}) × ${mainNum} = ?`;
        } else {
            // Ensure clean division
            const result = Math.floor(Math.random() * 20) + 1;
            answer = result;
            const dividend = result * mainNum;
            document.getElementById('mathQuestion').textContent = `${dividend} ÷ ${mainNum} = ?`;
        }
        
        gameState.mathAnswer = answer;
        document.getElementById('mathAnswer').value = '';
        document.getElementById('mathAnswer').focus();
        
        document.getElementById('mathAnswer').onkeypress = function(e) {
            if (e.key === 'Enter') checkMathAnswer();
        };
        return;
    }
    
    // Calculate answer for standard operations
    switch(operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '×':
            answer = num1 * num2;
            break;
        case '÷':
            answer = num1 / num2;
            break;
    }
    
    gameState.mathAnswer = answer;
    document.getElementById('mathQuestion').textContent = `${num1} ${operator} ${num2} = ?`;
    document.getElementById('mathAnswer').value = '';
    document.getElementById('mathAnswer').focus();
    
    document.getElementById('mathAnswer').onkeypress = function(e) {
        if (e.key === 'Enter') checkMathAnswer();
    };
}

function checkMathAnswer() {
    const userAnswer = parseInt(document.getElementById('mathAnswer').value);
    
    if (userAnswer === gameState.mathAnswer) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

// Pattern Challenge - MORE COMPLEX
function loadPatternChallenge() {
    document.getElementById('challengeTitle').textContent = 'Pattern Recognition';
    document.getElementById('challengeInstructions').textContent = 'Find the pattern!';
    document.getElementById('patternChallenge').classList.add('active');
    
    const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '💎', '🔷', '🔶', '❤️', '🌟'];
    const pattern = [];
    
    // Level 1-2: Simple alternating (A-B-A-B)
    if (gameState.level <= 2) {
        const shape1 = shapes[Math.floor(Math.random() * shapes.length)];
        const shape2 = shapes.filter(s => s !== shape1)[Math.floor(Math.random() * (shapes.length - 1))];
        for (let i = 0; i < 4; i++) {
            pattern.push(i % 2 === 0 ? shape1 : shape2);
        }
        gameState.patternAnswer = pattern.length % 2 === 0 ? shape1 : shape2;
    }
    // Level 3-4: Three shape rotation (A-B-C-A-B-C)
    else if (gameState.level <= 4) {
        const shape1 = shapes[Math.floor(Math.random() * shapes.length)];
        const shape2 = shapes.filter(s => s !== shape1)[Math.floor(Math.random() * (shapes.length - 1))];
        const shape3 = shapes.filter(s => s !== shape1 && s !== shape2)[Math.floor(Math.random() * (shapes.length - 2))];
        const sequence = [shape1, shape2, shape3];
        for (let i = 0; i < 5; i++) {
            pattern.push(sequence[i % 3]);
        }
        gameState.patternAnswer = sequence[5 % 3];
    }
    // Level 5-7: Increasing sequence (A-A-B-A-A-B-B)
    else if (gameState.level <= 7) {
        const shape1 = shapes[Math.floor(Math.random() * shapes.length)];
        const shape2 = shapes.filter(s => s !== shape1)[Math.floor(Math.random() * (shapes.length - 1))];
        pattern.push(shape1, shape1, shape2, shape1, shape1, shape2, shape2);
        gameState.patternAnswer = shape1;
    }
    // Level 8+: Complex Fibonacci-like pattern
    else {
        const shape1 = shapes[Math.floor(Math.random() * shapes.length)];
        const shape2 = shapes.filter(s => s !== shape1)[Math.floor(Math.random() * (shapes.length - 1))];
        const shape3 = shapes.filter(s => s !== shape1 && s !== shape2)[Math.floor(Math.random() * (shapes.length - 2))];
        pattern.push(shape1, shape2, shape1, shape2, shape2, shape1, shape2, shape2, shape2);
        gameState.patternAnswer = shape1;
    }
    
    // Display pattern
    const sequenceDiv = document.getElementById('patternSequence');
    sequenceDiv.innerHTML = '';
    pattern.forEach(item => {
        const div = document.createElement('div');
        div.className = 'pattern-item';
        div.textContent = item;
        div.style.background = 'rgba(102, 126, 234, 0.15)';
        sequenceDiv.appendChild(div);
    });
    
    // Add question mark
    const questionDiv = document.createElement('div');
    questionDiv.className = 'pattern-item';
    questionDiv.textContent = '?';
    questionDiv.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    questionDiv.style.color = 'white';
    sequenceDiv.appendChild(questionDiv);
    
    // Create options
    const optionsDiv = document.getElementById('patternOptions');
    optionsDiv.innerHTML = '';
    
    const options = [gameState.patternAnswer];
    while (options.length < 4) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        if (!options.includes(randomShape)) {
            options.push(randomShape);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    
    options.forEach(option => {
        const btn = document.createElement('div');
        btn.className = 'pattern-option';
        btn.textContent = option;
        btn.onclick = () => checkPatternAnswer(option, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkPatternAnswer(answer, btn) {
    if (answer === gameState.patternAnswer) {
        btn.classList.add('correct');
        setTimeout(() => handleCorrectAnswer(), 800);
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.pattern-option').forEach(opt => {
            if (opt.textContent === gameState.patternAnswer) {
                opt.classList.add('correct');
            }
        });
        setTimeout(() => handleWrongAnswer(), 1200);
    }
}

// Color Challenge - HARDER STROOP EFFECT
function loadColorChallenge() {
    document.getElementById('challengeTitle').textContent = 'Color Match';
    document.getElementById('challengeInstructions').textContent = 'Click the TEXT color, not word meaning!';
    document.getElementById('colorChallenge').classList.add('active');
    
    const colors = [
        { name: 'RED', hex: '#ef4444' },
        { name: 'BLUE', hex: '#3b82f6' },
        { name: 'GREEN', hex: '#10b981' },
        { name: 'YELLOW', hex: '#fbbf24' },
        { name: 'PURPLE', hex: '#a855f7' },
        { name: 'ORANGE', hex: '#f97316' },
        { name: 'PINK', hex: '#ec4899' },
        { name: 'CYAN', hex: '#06b6d4' }
    ];
    
    const wordColor = colors[Math.floor(Math.random() * colors.length)];
    const displayColor = colors[Math.floor(Math.random() * colors.length)];
    
    gameState.colorAnswer = displayColor.hex;
    
    const wordElement = document.getElementById('colorWord');
    wordElement.textContent = wordColor.name;
    wordElement.style.color = displayColor.hex;
    
    // Create color options
    const gridDiv = document.getElementById('colorGrid');
    gridDiv.innerHTML = '';
    
    // More options at higher levels
    const numOptions = Math.min(6 + Math.floor(gameState.level / 3), 9);
    const shuffled = [...colors].sort(() => Math.random() - 0.5).slice(0, numOptions);
    
    gridDiv.style.gridTemplateColumns = numOptions > 6 ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)';
    
    shuffled.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.background = `linear-gradient(135deg, ${color.hex}, ${adjustBrightness(color.hex, -20)})`;
        option.onclick = () => checkColorAnswer(color.hex, option);
        gridDiv.appendChild(option);
    });
}

function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function checkColorAnswer(answer, option) {
    if (answer === gameState.colorAnswer) {
        option.style.transform = 'scale(1.2)';
        option.style.boxShadow = '0 0 50px rgba(255, 255, 255, 0.8)';
        setTimeout(() => handleCorrectAnswer(), 600);
    } else {
        option.style.animation = 'wrongShake 0.6s ease';
        setTimeout(() => handleWrongAnswer(), 800);
    }
}

// Word Memory Challenge - MUCH HARDER
function loadWordChallenge() {
    document.getElementById('challengeTitle').textContent = 'Word Memory';
    document.getElementById('challengeInstructions').textContent = 'Remember ALL words shown!';
    document.getElementById('wordChallenge').classList.add('active');
    
    const words = [
        'BRAIN', 'FOCUS', 'MEMORY', 'THINK', 'LEARN', 'SMART', 'GENIUS', 
        'LOGIC', 'SOLVE', 'PATTERN', 'SPEED', 'POWER', 'MIND', 'SHARP',
        'QUICK', 'RECALL', 'AWARE', 'MENTAL', 'COGNITIVE', 'NEURON',
        'SYNAPSE', 'NEURAL', 'COMPLEX', 'COMPUTE', 'ANALYZE', 'WISDOM'
    ];
    
    let word;
    let wasShown = false;
    
    // Difficulty increases - higher chance of shown words at higher levels
    const shownChance = Math.min(0.3 + (gameState.level * 0.05), 0.7);
    
    if (gameState.shownWords.length > 2 && Math.random() < shownChance) {
        word = gameState.shownWords[Math.floor(Math.random() * gameState.shownWords.length)];
        wasShown = true;
    } else {
        const availableWords = words.filter(w => !gameState.shownWords.includes(w));
        if (availableWords.length === 0) {
            // Reset if all words shown
            gameState.shownWords = [];
        }
        word = availableWords[Math.floor(Math.random() * availableWords.length)] || words[0];
        gameState.shownWords.push(word);
        wasShown = false;
    }
    
    gameState.wordAnswer = wasShown;
    document.getElementById('wordText').textContent = word;
}

function checkWordAnswer(userAnswer) {
    if (userAnswer === gameState.wordAnswer) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

// Handle answers
function handleCorrectAnswer() {
    // Scoring increases dramatically with level
    const baseScore = 15 * gameState.level;
    const bonus = Math.floor(gameState.level / 2) * 10;
    const speedBonus = gameState.level * 5;
    gameState.score += baseScore + bonus + speedBonus;
    updateScore();
    
    setTimeout(() => {
        gameState.currentChallenge++;
        
        if (gameState.currentChallenge % 5 === 0) {
            gameState.level++;
            if (gameState.level > gameState.maxLevel) {
                gameState.maxLevel = gameState.level;
            }
        }
        
        // Game now goes to 20 challenges instead of 15
        if (gameState.currentChallenge >= 20) {
            endGame(true);
        } else {
            loadChallenge();
        }
    }, 1000);
}

function handleWrongAnswer() {
    gameState.perfectRound = false;
    setTimeout(() => {
        endGame(false);
    }, 1000);
}

// End game
function endGame(completed) {
    if (gameState.timer) clearInterval(gameState.timer);
    
    gameState.gamesPlayed++;
    
    if (completed && DATA_STORAGE.currentUser) {
        DATA_STORAGE.currentUser.stats.wins = (DATA_STORAGE.currentUser.stats.wins || 0) + 1;
    }
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
    }
    
    saveStats();
    checkAchievements();
    
    document.getElementById('finalScore').textContent = gameState.score;
    
    // Update badges based on performance
    const badges = ['🏆', '⚡', '🎯', '🧠', '💎', '🔥', '👑', '🌟'];
    for (let i = 1; i <= 3; i++) {
        const badge = document.getElementById('badge' + i);
        if (badge) {
            badge.textContent = badges[Math.min(Math.floor(gameState.level / 2), badges.length - 1)];
        }
    }
    
    if (completed) {
        document.getElementById('resultIcon').textContent = '🎉';
        document.getElementById('resultTitle').textContent = 'Legendary Master!';
        document.getElementById('resultMessage').textContent = `Level ${gameState.level} completed! Your mind is extraordinary!`;
    } else if (gameState.score > 150) {
        document.getElementById('resultIcon').textContent = '⭐';
        document.getElementById('resultTitle').textContent = 'Impressive Progress!';
        document.getElementById('resultMessage').textContent = `Reached Level ${gameState.level}! Keep pushing your limits!`;
    } else if (gameState.score > 50) {
        document.getElementById('resultIcon').textContent = '💪';
        document.getElementById('resultTitle').textContent = 'Good Effort!';
        document.getElementById('resultMessage').textContent = `Level ${gameState.level} - Practice makes perfect!`;
    } else {
        document.getElementById('resultIcon').textContent = '🎯';
        document.getElementById('resultTitle').textContent = 'Keep Training!';
        document.getElementById('resultMessage').textContent = 'Every master was once a beginner!';
    }
    
    showPage('resultPage');
}