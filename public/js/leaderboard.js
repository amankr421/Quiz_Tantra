
document.addEventListener('DOMContentLoaded', function() {
    console.log('Leaderboard JS Loaded');
    
    
    initLeaderboard();
    
  
    setupFilters();
});

function initLeaderboard() {
    const leaderboardData = [
        { rank: 4, name: "Aarav Sharma", category: "Technology", score: "91%" },
        { rank: 5, name: "Priya Singh", category: "Science", score: "89%" },
        { rank: 6, name: "Rohan Mehta", category: "General Knowledge", score: "88%" },
        { rank: 7, name: "Ananya Verma", category: "History", score: "87%" },
        { rank: 8, name: "Vikram Patel", category: "Science", score: "86%" },
        { rank: 9, name: "Sneha Nair", category: "Technology", score: "85%" },
        { rank: 10, name: "Aditya Gupta", category: "General Knowledge", score: "84%" }
    ];


    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;

    leaderboardList.innerHTML = '';

    leaderboardData.forEach(player => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <div class="rank">${player.rank}</div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-category">${player.category}</div>
            </div>
            <div class="player-score">${player.score}</div>
        `;
        leaderboardList.appendChild(item);
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categoryFilter = document.getElementById('category-filter');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateLeaderboard();
        });
    });

    if (categoryFilter) {
        categoryFilter.addEventListener('change', updateLeaderboard);
    }
}

function updateLeaderboard() {
    console.log('Updating leaderboard with filters...');
    
    initLeaderboard();
}