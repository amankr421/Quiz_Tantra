document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileNav();
    
    if (document.getElementById('category-slider')) {
        createCategoryCards();
        setTimeout(initCategorySlider, 100);
    }
    
    setTimeout(() => {
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.opacity = '0';
            setTimeout(() => { loadingSpinner.style.display = 'none'; }, 300);
        }
    }, 500);
});


function initTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeSwitch.checked = currentTheme === 'light';
    
    themeSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}


function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


function createCategoryCards() {
    const categorySlider = document.getElementById('category-slider');
    if (!categorySlider) return;
    
    categorySlider.innerHTML = '';
    
    // Using the quizData you provided
    const quizData = {
        gk: { title: "GK & GS", image: "images/gk.jpg" },
        coding: { title: "Coding", image: "images/coding.jpg" },
        ai:{ title:"AI", image:"images/ai.jpg" },
        maths: { title: "Mathematics", image: "images/math.jpg" },
        science: { title: "Science", image: "images/science.jpg" },
        history: { title: "History", image: "images/history2.jpg" },
        geography: { title: "Geography", image: "images/geography.jpg" },
        sports: { title: "Sports", image: "images/sports.jpg" },
        General: { title: "General Question", image: "images/general.jpg" },
        english: { title: "English", image: "images/english.jpg" },
        Computer: { title: "Computer", image: "images/computer.jpg" }
    };
    
    Object.entries(quizData).forEach(([key, category]) => {
        const card = document.createElement('a');
        card.className = 'category-card';
        card.href = 'playquiz.html'; // Clickable link to start quiz

        // Updated Card structure: Image container and Title only
        card.innerHTML = `
            <div class="category-image-wrapper">
                <img src="${category.image}" alt="${category.title}" class="category-image-content" onerror="this.src='https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300'">
            </div>
            <h3>${category.title}</h3>
            `;
        
        card.addEventListener('click', function(e) {
            localStorage.setItem('selectedCategory', key);
        });
        
        categorySlider.appendChild(card);
    });
}


function initCategorySlider() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const categorySlider = document.getElementById('category-slider');

    if (prevBtn && nextBtn && categorySlider) {
        const cardWidth = 280 + 25; 
        
        prevBtn.addEventListener('click', function() {
            categorySlider.scrollBy({
                left: -cardWidth * 3,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            categorySlider.scrollBy({
                left: cardWidth * 3,
                behavior: 'smooth'
            });
        });

        categorySlider.addEventListener('scroll', function() {
            const isAtStart = this.scrollLeft === 0;
            const isAtEnd = this.scrollLeft >= (this.scrollWidth - this.clientWidth - 10);
            
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.disabled = isAtStart;
            
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.disabled = isAtEnd;
        });

        setTimeout(() => {
            const isAtStart = categorySlider.scrollLeft === 0;
            const isAtEnd = categorySlider.scrollLeft >= (categorySlider.scrollWidth - categorySlider.clientWidth - 10);
            
            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.disabled = isAtStart;
            
            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.disabled = isAtEnd;
        }, 100);
    }
}


function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}


if (isTouchDevice()) {
    document.documentElement.classList.add('touch-device');
}