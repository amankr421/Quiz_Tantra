
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentCategories();
    loadFutureCategories();
    initCategoryAnimations();
});

function loadCurrentCategories() {
    const container = document.getElementById('current-categories');
    if (!container) return;


    const categories = [
        {
            id: 'gk',
            title: 'General Knowledge',
            icon: 'fas fa-globe-americas',
            description: 'Test your knowledge of current affairs, history, geography, and everyday facts.',
            questions: '30', 
            players: '50+', 
            color: 'linear-gradient(135deg, #3498db, #8e44ad)'
        },
        {
            id: 'coding',
            title: 'Coding & Programming',
            icon: 'fas fa-laptop-code',
            description: 'Challenge your programming skills with problems in various languages and frameworks.',
            questions: '30',
            players: '50+',
            color: 'linear-gradient(135deg, #e74c3c, #f39c12)'
        },
        {
            id: 'ai',
            title: 'AI & Atrificial Intellegence',
            icon: 'fas fa-laptop-code',
            description: 'Challenge your AI skills with Simple Ai related Questions.',
            questions: '450',
            players: '50+',
            color: 'linear-gradient(135deg, #e74c3c, #f39c12)'
        },
        {
            id: 'maths',
            title: 'Mathematics',
            icon: 'fas fa-calculator',
            description: 'Solve complex problems and puzzles to sharpen your mathematical thinking.',
            questions: '30',
            players: '50+', 
            color: 'linear-gradient(135deg, #27ae60, #2ecc71)'
        },
        {
            id: 'science',
            title: 'Science & Technology',
            icon: 'fas fa-flask',
            description: 'Explore the wonders of science and the latest technological advancements.',
            questions: '30',
            players: '50+',
            color: 'linear-gradient(135deg, #9b59b6, #e74c3c)'
        },
        {
            id: 'history',
            title: 'History & Civilization',
            icon: 'fas fa-monument',
            description: 'Journey through time and explore ancient civilizations and historical events.',
            questions: '30', 
            players: '50+',
            color: 'linear-gradient(135deg, #e67e22, #f1c40f)'
        },
        {
            id: 'geography',
            title: 'Geography',
            icon: 'fas fa-map-marked-alt',
            description: 'Discover countries, capitals, landmarks, and geographical wonders.',
            questions: '30', 
            players: '50+',
            color: 'linear-gradient(135deg, #1abc9c, #16a085)'
        },
        {
            id: 'sports',
            title: 'Sports',
            icon: 'fas fa-football-ball',
            description: 'Test your knowledge of sports history, rules, and legendary athletes.',
            questions: '30', 
            players: '50+',
            color: 'linear-gradient(135deg, #e74c3c, #c0392b)'
        },
        {
            id: 'literature',
            title: 'Literature & Arts',
            icon: 'fas fa-book',
            description: 'Dive into the world of books, poetry, art history, and literary masterpieces.',
            questions: '30',
            players: '50+',
            color: 'linear-gradient(135deg, #8e44ad, #9b59b6)'
        },
        {
            id: 'music',
            title: 'Music & Entertainment',
            icon: 'fas fa-music',
            description: 'Challenge your knowledge of music genres, artists, movies, and pop culture.',
            questions: '30',
            players: '50+',
            color: 'linear-gradient(135deg, #f39c12, #d35400)'
        },
        {
            id: 'logic',
            title: 'Logic & Puzzles',
            icon: 'fas fa-brain',
            description: 'Exercise your brain with riddles, logical puzzles, and critical thinking challenges.',
            questions: '30', 
            players: '50+',
            color: 'linear-gradient(135deg, #34495e, #2c3e50)'
        }
    ];

    container.innerHTML = categories.map(cat => `
        <div class="category-card">
            <div class="category-header" style="background: ${cat.color}">
                <i class="${cat.icon}"></i>
            </div>
            <div class="category-content">
                <h3 class="category-title">${cat.title}</h3>
                <p class="category-description">${cat.description}</p>
                <div class="category-stats">
                    <div class="stat-item">
                        <span class="stat-number">${cat.questions}</span>
                        <span class="stat-label">Questions</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${cat.players}</span>
                        <span class="stat-label">Players</span>
                    </div>
                </div>
                <button class="category-btn" onclick="startQuiz('${cat.id}')">
                    Start Quiz <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadFutureCategories() {
    const container = document.getElementById('future-categories');
    if (!container) return;

    const futureCats = [
        { 
            title: 'Artificial Intelligence', 
            icon: 'fas fa-robot', 
            desc: 'Explore AI concepts, machine learning, and neural networks', 
            status: 'in-development' 
        },
        { 
            title: 'Environmental Science', 
            icon: 'fas fa-seedling', 
            desc: 'Learn about ecology, sustainability, and climate change', 
            status: 'coming-soon' 
        },
        { 
            title: 'Economics & Finance', 
            icon: 'fas fa-chart-line', 
            desc: 'Understand markets, investments, and financial systems', 
            status: 'planned' 
        },
        { 
            title: 'Genetics & Biology', 
            icon: 'fas fa-dna', 
            desc: 'Dive into genetics, evolution, and biological systems', 
            status: 'in-development' 
        },
        { 
            title: 'Psychology', 
            icon: 'fas fa-brain', 
            desc: 'Explore human behavior, cognition, and mental processes', 
            status: 'planned' 
        },
        { 
            title: 'Space & Astronomy', 
            icon: 'fas fa-rocket', 
            desc: 'Discover planets, stars, galaxies, and space exploration', 
            status: 'coming-soon' 
        }
    ];

    container.innerHTML = futureCats.map(cat => `
        <div class="coming-soon-card">
            <div class="coming-soon-icon">
                <i class="${cat.icon}"></i>
            </div>
            <h4 class="coming-soon-title">${cat.title}</h4>
            <p class="coming-soon-description">${cat.desc}</p>
            <span class="status-badge ${cat.status}">${cat.status.replace('-', ' ')}</span>
        </div>
    `).join('');
}

function initCategoryAnimations() {
    const cards = document.querySelectorAll('.category-card, .coming-soon-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

function startQuiz(categoryId) {
    localStorage.setItem('selectedCategory', categoryId);
    window.location.href = 'playquiz.html';
}

