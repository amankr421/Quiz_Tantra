
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Quiz Generator Loaded - Fixed Version');
    initAIQuiz();
    testBackendConnection();
});


let aiQuizState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: {},
    currentTopic: '',
    questionCount: 10,
    difficulty: 'medium',
    questionType: 'multiple_choice',
    startTime: null,
    endTime: null
};

const BACKEND_URL = "http://localhost:5000";

function initAIQuiz() {
    setupEventListeners();
    setupSuggestionTags();
    setupRangeInput();
}

function setupEventListeners() {
    const generateBtn = document.getElementById('generate-quiz-btn');
    if (generateBtn) generateBtn.addEventListener('click', generateAIQuiz);

    const topicInput = document.getElementById('topic-input');
    if (topicInput) {
        topicInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') generateAIQuiz();
        });
    }

   
    const nextBtn = document.getElementById('ai-next-btn');
    const prevBtn = document.getElementById('ai-prev-btn');
    const submitBtn = document.getElementById('ai-submit-btn');

    if (nextBtn) nextBtn.addEventListener('click', nextAIQuestion);
    if (prevBtn) prevBtn.addEventListener('click', prevAIQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitAIQuiz);

    
    const reviewBtn = document.getElementById('review-ai-answers');
    const newQuizBtn = document.getElementById('new-ai-quiz');
    const shareBtn = document.getElementById('share-ai-results');
    const backToResults = document.getElementById('back-to-ai-results');
    const newQuizFromReview = document.getElementById('new-ai-quiz-from-review');

    if (reviewBtn) reviewBtn.addEventListener('click', showAIReview);
    if (newQuizBtn) newQuizBtn.addEventListener('click', startNewAIQuiz);
    if (shareBtn) shareBtn.addEventListener('click', shareAIResults);
    if (backToResults) backToResults.addEventListener('click', backToAIResults);
    if (newQuizFromReview) newQuizFromReview.addEventListener('click', startNewAIQuiz);
}

function setupSuggestionTags() {
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    const topicInput = document.getElementById('topic-input');

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            if (topicInput) {
                topicInput.value = topic;
                topicInput.focus();
            }
        });
    });
}

function setupRangeInput() {
    const rangeInput = document.getElementById('question-count');
    const countDisplay = document.getElementById('count-display');

    if (rangeInput && countDisplay) {
        rangeInput.addEventListener('input', function() {
            const value = this.value;
            countDisplay.textContent = `${value} questions`;
            aiQuizState.questionCount = parseInt(value);
        });
    }

    const difficultySelect = document.getElementById('difficulty');
    const questionTypeSelect = document.getElementById('question-type');

    if (difficultySelect) difficultySelect.addEventListener('change', function() {
        aiQuizState.difficulty = this.value;
    });

    if (questionTypeSelect) questionTypeSelect.addEventListener('change', function() {
        aiQuizState.questionType = this.value;
    });
}


async function testBackendConnection() {
    try {
        console.log('Testing backend connection to:', BACKEND_URL);
        // const response = await fetch(`${BACKEND_URL}/api/generate-quiz`);
        const response = await fetch(`${BACKEND_URL}/api/health`);

        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Backend connected:', data);
        showNotification('Backend connected successfully!', 'success');
        return true;
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        showNotification('Backend connection failed - using fallback mode', 'warning');
        return false;
    }
}


async function generateAIQuiz() {
    const topicInput = document.getElementById('topic-input');
    const topic = topicInput ? topicInput.value.trim() : '';

    if (!topic) {
        showNotification('Please enter a topic for the quiz', 'error');
        return;
    }

    if (topic.length < 2) {
        showNotification('Please enter a more specific topic', 'error');
        return;
    }

    aiQuizState.currentTopic = topic;
    aiQuizState.startTime = new Date();

    showScreen('loading-screen');
    
    const generatingTopic = document.getElementById('generating-topic');
    if (generatingTopic) generatingTopic.textContent = topic;

    simulateProgress();

    try {
        console.log('Generating quiz for topic:', topic);
        
        const response = await fetch(`${BACKEND_URL}/api/generate-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                question_count: aiQuizState.questionCount,
                difficulty: aiQuizState.difficulty,
                question_type: aiQuizState.questionType
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Backend error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        
        if (data.success && data.questions && data.questions.length > 0) {
            aiQuizState.questions = data.questions;
            aiQuizState.currentQuestionIndex = 0;
            aiQuizState.score = 0;
            aiQuizState.userAnswers = {};

            showScreen('ai-quiz-screen');
            updateAIQuizHeader();
            showAIQuestion();
            
            showNotification(`Generated ${data.questions.length} AI questions successfully!`, 'success');
        } else {
            throw new Error(data.error || 'No questions generated by AI');
        }
        
    } catch (error) {
        console.error('Error generating quiz:', error);
        showNotification('AI generation failed. Using sample questions instead.', 'warning');

        useMockQuestions(topic);
    }
}


function generateMockQuestions(topic, count) {
    const questions = [];
    const questionTemplates = [
        `What is the primary purpose of ${topic}?`,
        `Which of the following best describes ${topic}?`,
        `What is the most important aspect of ${topic}?`,
        `How does ${topic} typically work?`,
        `What are the main benefits of ${topic}?`,
        `What is a common challenge in ${topic}?`,
        `Which technology is most associated with ${topic}?`,
        `What principle is fundamental to ${topic}?`,
        `How has ${topic} evolved over time?`,
        `What skill is essential for mastering ${topic}?`
    ];

    const answerTemplates = [
        ["To solve complex problems", "To organize information", "To create art", "To build physical structures"],
        ["A systematic approach", "A random process", "A simple method", "A theoretical concept"],
        ["Understanding core principles", "Memorizing facts", "Following instructions", "Creative expression"],
        ["Through logical steps", "By random chance", "Through intuition", "By following trends"],
        ["Improved efficiency", "Increased complexity", "Reduced functionality", "Limited options"],
        ["Managing complexity", "Finding information", "Creating content", "Following rules"],
        ["Modern computing", "Ancient tools", "Basic mathematics", "Physical labor"],
        ["Logical reasoning", "Creative thinking", "Memorization", "Observation"],
        ["Through technological advances", "By staying the same", "Through simplification", "By becoming more complex"],
        ["Analytical thinking", "Physical strength", "Artistic talent", "Memory skills"]
    ];

    for (let i = 0; i < count; i++) {
        const templateIndex = i % questionTemplates.length;
        questions.push({
            question: questionTemplates[templateIndex].replace('${topic}', topic),
            answers: answerTemplates[templateIndex].map((text, index) => ({
                text: text,
                correct: index === 0 // First answer is always correct in mock
            })),
            explanation: `This question tests your understanding of ${topic}. The correct answer demonstrates the fundamental concept.`
        });
    }

    return questions;
}

function useMockQuestions(topic) {
    aiQuizState.questions = generateMockQuestions(topic, aiQuizState.questionCount);
    aiQuizState.currentQuestionIndex = 0;
    aiQuizState.score = 0;
    aiQuizState.userAnswers = {};
    showScreen('ai-quiz-screen');
    updateAIQuizHeader();
    showAIQuestion();
}


function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

function updateAIQuizHeader() {
    const topicElement = document.getElementById('ai-quiz-topic');
    const settingsElement = document.getElementById('ai-quiz-settings');
    const scoreElement = document.getElementById('ai-current-score');
    const counterElement = document.getElementById('ai-question-counter');

    if (topicElement) topicElement.textContent = `Topic: ${aiQuizState.currentTopic}`;
    if (settingsElement) settingsElement.textContent = `${aiQuizState.questions.length} Questions • ${capitalize(aiQuizState.difficulty)} Difficulty`;
    if (scoreElement) scoreElement.textContent = aiQuizState.score;
    if (counterElement) counterElement.textContent = `${aiQuizState.currentQuestionIndex + 1}/${aiQuizState.questions.length}`;

    updateAIProgressBar();
}

function updateAIProgressBar() {
    const progressFill = document.getElementById('ai-progress-fill');
    if (progressFill && aiQuizState.questions.length) {
        const progress = ((aiQuizState.currentQuestionIndex + 1) / aiQuizState.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function showAIQuestion() {
    const currentQuestion = aiQuizState.questions[aiQuizState.currentQuestionIndex];
    const questionElement = document.getElementById('ai-question');
    const answerButtons = document.getElementById('ai-answer-buttons');

    if (!currentQuestion) return;

    if (answerButtons) answerButtons.innerHTML = '';
    if (questionElement) questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'ai-answer-btn';
        
        // Add answer indicator (A, B, C, D)
        const indicator = document.createElement('div');
        indicator.className = 'answer-indicator';
        indicator.textContent = String.fromCharCode(65 + index); // A, B, C, D
        
        const answerText = document.createElement('div');
        answerText.className = 'answer-text';
        answerText.textContent = answer.text;
        
        btn.appendChild(indicator);
        btn.appendChild(answerText);
        
        btn.dataset.index = index;
        btn.dataset.correct = answer.correct;

        const userAnswer = aiQuizState.userAnswers[aiQuizState.currentQuestionIndex];
        if (userAnswer !== undefined) {
            btn.disabled = true;
            if (answer.correct) {
                btn.classList.add('correct');
                indicator.innerHTML = '<i class="fas fa-check"></i>';
            } else if (index === userAnswer) {
                btn.classList.add('incorrect');
                indicator.innerHTML = '<i class="fas fa-times"></i>';
            }
        } else {
            btn.addEventListener('click', selectAIAnswer);
        }

        if (answerButtons) answerButtons.appendChild(btn);
    });

    updateAIQuizHeader();
    updateAINavigation();
}

function selectAIAnswer(e) {
    const btn = e.currentTarget;
    const answerIndex = parseInt(btn.dataset.index, 10);
    const isCorrect = btn.dataset.correct === 'true';

    const answerButtons = document.getElementById('ai-answer-buttons');
    if (answerButtons) {
        Array.from(answerButtons.children).forEach(b => b.disabled = true);
    }

    aiQuizState.userAnswers[aiQuizState.currentQuestionIndex] = answerIndex;
    if (isCorrect) aiQuizState.score++;

    if (answerButtons) {
        Array.from(answerButtons.children).forEach((b, i) => {
            if (b.dataset.correct === 'true') b.classList.add('correct');
            else if (i === answerIndex) b.classList.add('incorrect');
        });
    }

    updateAIQuizHeader();
    updateAINavigation();
}

function updateAINavigation() {
    const prevBtn = document.getElementById('ai-prev-btn');
    const nextBtn = document.getElementById('ai-next-btn');
    const submitBtn = document.getElementById('ai-submit-btn');

    const hasAnswer = aiQuizState.userAnswers[aiQuizState.currentQuestionIndex] !== undefined;
    const isLast = aiQuizState.currentQuestionIndex === aiQuizState.questions.length - 1;

    if (prevBtn) prevBtn.style.display = aiQuizState.currentQuestionIndex > 0 ? 'flex' : 'none';
    if (nextBtn && submitBtn) {
        if (hasAnswer) {
            if (isLast) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'flex';
            } else {
                nextBtn.style.display = 'flex';
                submitBtn.style.display = 'none';
            }
        } else {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'none';
        }
    }
}

function nextAIQuestion() {
    if (aiQuizState.currentQuestionIndex < aiQuizState.questions.length - 1) {
        aiQuizState.currentQuestionIndex++;
        showAIQuestion();
    }
}

function prevAIQuestion() {
    if (aiQuizState.currentQuestionIndex > 0) {
        aiQuizState.currentQuestionIndex--;
        showAIQuestion();
    }
}

function submitAIQuiz() {
    aiQuizState.endTime = new Date();
    showAIResults();
}

function showAIResults() {
    showScreen('ai-results-screen');
    calculateAIResults();
}

function calculateAIResults() {
    const total = aiQuizState.questions.length;
    const correct = aiQuizState.score;
    const percentage = total ? Math.round((correct / total) * 100) : 0;

    const finalScoreEl = document.getElementById('ai-final-score');
    const topicEl = document.getElementById('results-topic');
    const totalEl = document.getElementById('results-total');
    const correctEl = document.getElementById('results-correct');
    const incorrectEl = document.getElementById('results-incorrect');
    const timeEl = document.getElementById('results-time');

    if (finalScoreEl) finalScoreEl.textContent = `${correct}/${total}`;
    if (topicEl) topicEl.textContent = aiQuizState.currentTopic;
    if (totalEl) totalEl.textContent = total;
    if (correctEl) correctEl.textContent = correct;
    if (incorrectEl) incorrectEl.textContent = total - correct;

    const timeTaken = Math.round((aiQuizState.endTime - aiQuizState.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    if (timeEl) timeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    updateScoreCircle(percentage);
    generateAIPerformanceInsights(percentage, correct, total);
}

function updateScoreCircle(percentage) {
    const circle = document.getElementById('score-circle');
    if (!circle) return;
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

function generateAIPerformanceInsights(percentage, correct, total) {
    let knowledgeLevel, strongAreas, improveAreas, recommendation;

    if (percentage >= 90) {
        knowledgeLevel = "Expert";
        strongAreas = "Comprehensive Understanding";
        improveAreas = "Advanced Applications";
        recommendation = "Explore advanced topics and real-world applications";
    } else if (percentage >= 70) {
        knowledgeLevel = "Proficient";
        strongAreas = "Core Concepts";
        improveAreas = "Detailed Knowledge";
        recommendation = "Focus on deepening your understanding of specific areas";
    } else if (percentage >= 50) {
        knowledgeLevel = "Intermediate";
        strongAreas = "Basic Principles";
        improveAreas = "Fundamental Concepts";
        recommendation = "Review basic concepts and practice more questions";
    } else {
        knowledgeLevel = "Beginner";
        strongAreas = "Initial Awareness";
        improveAreas = "Fundamental Understanding";
        recommendation = "Start with foundational concepts and build gradually";
    }

    const kEl = document.getElementById('knowledge-level');
    const sEl = document.getElementById('strong-areas');
    const iEl = document.getElementById('improve-areas');
    const rEl = document.getElementById('ai-recommendation');

    if (kEl) kEl.textContent = knowledgeLevel;
    if (sEl) sEl.textContent = strongAreas;
    if (iEl) iEl.textContent = improveAreas;
    if (rEl) rEl.textContent = recommendation;
}

function showAIReview() {
    showScreen('ai-review-screen');
    displayAIReviewQuestions();
}

function displayAIReviewQuestions() {
    const reviewContainer = document.getElementById('ai-review-questions');
    if (!reviewContainer) return;
    reviewContainer.innerHTML = '';

    aiQuizState.questions.forEach((question, index) => {
        const userAnswerIndex = aiQuizState.userAnswers[index];
        const userAnswer = userAnswerIndex !== undefined ? question.answers[userAnswerIndex] : null;

        const qDiv = document.createElement('div');
        qDiv.className = 'review-item ai-enhanced';

        qDiv.innerHTML = `
            <div class="review-question">
                <strong>Question ${index + 1}:</strong> ${escapeHtml(question.question)}
            </div>
            <div class="review-answers">
                ${question.answers.map((answer, ansIndex) => `
                    <div class="review-answer ${answer.correct ? 'correct' : ''} ${userAnswerIndex === ansIndex && !answer.correct ? 'incorrect' : ''} ${userAnswerIndex === ansIndex ? 'user-answer' : ''}">
                        <span>${escapeHtml(answer.text)}</span>
                        ${answer.correct ? '<i class="fas fa-check"></i>' : ''}
                        ${userAnswerIndex === ansIndex && !answer.correct ? '<i class="fas fa-times"></i>' : ''}
                    </div>
                `).join('')}
            </div>
            <div class="ai-explanation">
                <h4><i class="fas fa-robot"></i> AI Explanation</h4>
                <p>${escapeHtml(question.explanation || '')}</p>
                ${userAnswer ? `<p><strong>Your answer was ${userAnswer.correct ? 'correct' : 'incorrect'}.</strong></p>` : '<p><strong>You did not answer this question.</strong></p>'}
            </div>
        `;

        reviewContainer.appendChild(qDiv);
    });
}

function backToAIResults() {
    showScreen('ai-results-screen');
}

function startNewAIQuiz() {
    aiQuizState = {
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: {},
        currentTopic: '',
        questionCount: 10,
        difficulty: 'medium',
        questionType: 'multiple_choice',
        startTime: null,
        endTime: null
    };
    showScreen('topic-selection-screen');
    const topicInput = document.getElementById('topic-input');
    if (topicInput) {
        topicInput.value = '';
        topicInput.focus();
    }
}

function shareAIResults() {
    const results = {
        topic: aiQuizState.currentTopic,
        score: aiQuizState.score,
        total: aiQuizState.questions.length,
        percentage: Math.round((aiQuizState.score / aiQuizState.questions.length) * 100)
    };

    const shareText = `I scored ${results.score}/${results.total} (${results.percentage}%) on ${results.topic} quiz!`;

    if (navigator.share) {
        navigator.share({ title: 'My AI Quiz Results', text: shareText, url: window.location.href });
    } else {
        navigator.clipboard.writeText(shareText).then(() => showNotification('Results copied to clipboard!', 'success'));
    }
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 600;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) notification.parentNode.removeChild(notification);
        }, 300);
    }, 3500);
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, function (m) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m];
    });
}

function capitalize(s) {
    if (!s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function simulateProgress() {
    const progressBar = document.getElementById('ai-progress');
    const steps = document.querySelectorAll('.progress-steps .step');
    const funFacts = [
        "AI can process and understand complex topics in seconds!",
        "Each question is uniquely generated based on your specific topic.",
        "AI-generated questions adapt to different difficulty levels.",
        "The explanations provided help reinforce learning and understanding."
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        if (progressBar) progressBar.style.width = `${progress}%`;

        if (steps && steps.length >= 3) {
            if (progress < 33) {
                steps[0].classList.add('active'); steps[1].classList.remove('active'); steps[2].classList.remove('active');
            } else if (progress < 66) {
                steps[0].classList.add('active'); steps[1].classList.add('active'); steps[2].classList.remove('active');
            } else {
                steps[0].classList.add('active'); steps[1].classList.add('active'); steps[2].classList.add('active');
            }
        }

        if (Math.random() < 0.08) {
            const funFact = document.getElementById('fun-fact');
            if (funFact) funFact.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
        }
    }, 220);
}