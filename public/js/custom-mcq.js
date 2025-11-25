document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let startTime;
    let timerInterval;
    let currentTopic = '';
    
    // DOM Elements
    const generatorSection = document.getElementById('generator-section');
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    const reviewSection = document.getElementById('review-section');
    
    const topicInput = document.getElementById('topic-input');
    const questionCountInput = document.getElementById('question-count');
    const countDisplay = document.getElementById('count-display');
    const aiPrompt = document.getElementById('ai-prompt');
    const mcqInput = document.getElementById('mcq-input');
    const copyPromptBtn = document.getElementById('copy-prompt');
    const generateBtn = document.getElementById('generate-btn');
    
    const quizTopic = document.getElementById('quiz-topic');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const quizTimer = document.getElementById('quiz-timer');
    const questionNumEl = document.getElementById('question-num');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressFill = document.getElementById('progress-fill');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const finalScore = document.getElementById('final-score');
    const resultTopic = document.getElementById('result-topic');
    const resultTotal = document.getElementById('result-total');
    const resultCorrect = document.getElementById('result-correct');
    const resultIncorrect = document.getElementById('result-incorrect');
    const resultTime = document.getElementById('result-time');
    const reviewBtn = document.getElementById('review-btn');
    const newQuizBtn = document.getElementById('new-quiz-btn');
    const shareBtn = document.getElementById('share-btn');
    
    const reviewQuestions = document.getElementById('review-questions');
    const backResultsBtn = document.getElementById('back-results');
    const newQuizReviewBtn = document.getElementById('new-quiz-review');
    
    // Event Listeners
    questionCountInput.addEventListener('input', updateQuestionCount);
    topicInput.addEventListener('input', updateAIPrompt);
    copyPromptBtn.addEventListener('click', copyPromptToClipboard);
    generateBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    reviewBtn.addEventListener('click', showReview);
    newQuizBtn.addEventListener('click', showGenerator);
    shareBtn.addEventListener('click', shareResults);
    backResultsBtn.addEventListener('click', showResults);
    newQuizReviewBtn.addEventListener('click', showGenerator);
    
    // Initialize
    updateAIPrompt();
    
    // Update question count display
    function updateQuestionCount() {
        const count = questionCountInput.value;
        countDisplay.textContent = count;
        updateAIPrompt();
    }
    
    // Update AI prompt based on topic and count
    function updateAIPrompt() {
        const topic = topicInput.value.trim() || 'Space Exploration';
        const count = questionCountInput.value;
        
        aiPrompt.textContent = `Generate exactly ${count} multiple-choice questions about "${topic}" with the following strict format:

Q1. [Question text]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Answer: [Correct letter A/B/C/D]
Explanation: [Brief explanation]

Continue with Q2 to Q${count} in same format. Make questions conceptual and exam-style.`;
    }
    
    // Copy prompt to clipboard
    function copyPromptToClipboard() {
        const promptText = aiPrompt.textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            // Show success feedback
            const originalText = copyPromptBtn.innerHTML;
            copyPromptBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyPromptBtn.style.background = 'var(--primary-color)';
            copyPromptBtn.style.color = 'white';
            
            setTimeout(() => {
                copyPromptBtn.innerHTML = originalText;
                copyPromptBtn.style.background = '';
                copyPromptBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy prompt. Please copy manually.');
        });
    }
    
    // Start quiz
    function startQuiz() {
        const topic = topicInput.value.trim();
        const mcqText = mcqInput.value.trim();
        
        if (!topic && !mcqText) {
            alert('Please enter a topic or paste MCQ questions');
            return;
        }
        
        if (mcqText) {
            // Parse pasted MCQ text
            questions = parseMCQText(mcqText);
            currentTopic = topic || 'Custom Quiz';
        } else {
            // For demo, generate sample questions
            questions = generateSampleQuestions(topic, parseInt(questionCountInput.value));
            currentTopic = topic;
        }
        
        if (questions.length === 0) {
            alert('No valid questions found. Please check your input format.');
            return;
        }
        
        // Initialize quiz
        userAnswers = new Array(questions.length).fill(null);
        currentQuestionIndex = 0;
        currentTopic = topic || 'Custom Quiz';
        
        // Update UI
        quizTopic.textContent = currentTopic;
        totalQuestionsEl.textContent = questions.length;
        currentQuestionEl.textContent = '1';
        updateProgressBar();
        
        // Show quiz section
        showSection(quizSection);
        
        // Start timer
        startTime = new Date();
        startTimer();
        
        // Display first question
        displayQuestion(currentQuestionIndex);
    }
    
    // Parse MCQ text
    // Parse MCQ text - IMPROVED VERSION
function parseMCQText(text) {
    const questions = [];
    
    // First, try to detect if it's single-line format and add line breaks
    let formattedText = text;
    
    // Add line breaks after questions, options, answers, and explanations
    formattedText = formattedText
        .replace(/(Q\d+\.)/g, '\n$1')  // Add break before Q
        .replace(/([A-D]\))/g, '\n$1') // Add break before options
        .replace(/(Answer:)/g, '\n$1') // Add break before Answer
        .replace(/(Explanation:)/g, '\n$1'); // Add break before Explanation
    
    const questionBlocks = formattedText.split(/(?=Q\d+\.)/).filter(block => block.trim());
    
    for (const block of questionBlocks) {
        try {
            const lines = block.trim().split('\n').filter(line => line.trim());
            
            if (lines.length < 7) {
                console.log('Skipping block - insufficient lines:', lines);
                continue;
            }
            
            // Extract question number and text
            const questionMatch = lines[0].match(/Q(\d+)\.\s*(.+)/);
            if (!questionMatch) {
                console.log('No question match for:', lines[0]);
                continue;
            }
            
            const questionNumber = parseInt(questionMatch[1]);
            const questionText = questionMatch[2].trim();
            
            // Extract options (next 4 lines starting with A), B), C), D)
            const options = [];
            let optionIndex = 1;
            
            while (optionIndex < lines.length && optionIndex <= 4) {
                if (lines[optionIndex] && lines[optionIndex].match(/^[A-D]\)/)) {
                    const optionText = lines[optionIndex].substring(3).trim();
                    options.push(optionText);
                    optionIndex++;
                } else {
                    break;
                }
            }
            
            // Extract answer and explanation
            let correctAnswer = '';
            let explanation = '';
            
            for (let i = optionIndex; i < lines.length; i++) {
                if (lines[i].startsWith('Answer:')) {
                    correctAnswer = lines[i].substring(7).trim().charAt(0); // Take only first character
                } else if (lines[i].startsWith('Explanation:')) {
                    explanation = lines[i].substring(12).trim();
                    // If explanation continues on next lines
                    for (let j = i + 1; j < lines.length; j++) {
                        if (lines[j] && !lines[j].startsWith('Q')) {
                            explanation += ' ' + lines[j].trim();
                        } else {
                            break;
                        }
                    }
                    break;
                }
            }
            
            if (questionText && options.length === 4 && correctAnswer) {
                questions.push({
                    number: questionNumber,
                    text: questionText,
                    options: options,
                    correctAnswer: correctAnswer,
                    explanation: explanation || 'No explanation provided.'
                });
                console.log('Successfully parsed question:', questionNumber);
            } else {
                console.log('Invalid question format:', {
                    questionText: !!questionText,
                    options: options.length,
                    correctAnswer: !!correctAnswer
                });
            }
        } catch (error) {
            console.error('Error parsing question block:', error, 'Block:', block);
        }
    }
    
    console.log('Total questions parsed:', questions.length);
    return questions;
}
    
    // Generate sample questions (for demo)
    function generateSampleQuestions(topic, count) {
        const sampleQuestions = [];
        const difficultyLevels = ['basic', 'intermediate', 'advanced'];
        
        for (let i = 1; i <= count; i++) {
            const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
            
            sampleQuestions.push({
                number: i,
                text: `What is a ${difficulty} concept in ${topic}?`,
                options: [
                    `Core principles of ${topic}`,
                    `Random facts about ${topic}`,
                    `Unrelated topics`,
                    `Nothing important`
                ],
                correctAnswer: 'A',
                explanation: `This question tests your understanding of ${difficulty} concepts in ${topic}. The correct answer focuses on fundamental principles.`
            });
        }
        
        return sampleQuestions;
    }
    
    // Display question
    function displayQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        
        const question = questions[index];
        
        questionNumEl.textContent = index + 1;
        questionTextEl.textContent = question.text;
        
        // Clear options
        optionsContainer.innerHTML = '';
        
        // Add options
        const optionLabels = ['A', 'B', 'C', 'D'];
        optionLabels.forEach((label, i) => {
            const option = document.createElement('div');
            option.className = 'option';
            if (userAnswers[index] === label) {
                option.classList.add('selected');
            }
            
            option.innerHTML = `
                <div class="option-label"></div>
                <div class="option-text">${question.options[i]}</div>
            `;
            
            option.addEventListener('click', () => selectOption(label));
            optionsContainer.appendChild(option);
        });
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        
        if (index === questions.length - 1) {
            nextBtn.innerHTML = 'Submit <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
        
        // Update current question indicator
        currentQuestionEl.textContent = index + 1;
        updateProgressBar();
    }
    
    // Select option
    function selectOption(option) {
        userAnswers[currentQuestionIndex] = option;
        
        // Update UI
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(opt => {
            opt.classList.remove('selected');
        });
        
        const selectedOption = Array.from(options).find(opt => {
            const label = opt.querySelector('.option-text').textContent;
            return questions[currentQuestionIndex].options[['A','B','C','D'].indexOf(option)] === label;
        });
        
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    // Show previous question
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    }
    
    // Show next question
    function showNextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            // Submit quiz
            submitQuiz();
        }
    }
    
    // Submit quiz
    function submitQuiz() {
        // Stop timer
        clearInterval(timerInterval);
        
        // Calculate results
        let correctCount = 0;
        let incorrectCount = 0;
        
        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i] === questions[i].correctAnswer) {
                correctCount++;
            } else if (userAnswers[i] !== null) {
                incorrectCount++;
            }
        }
        
        // Calculate score with negative marking (4 for correct, -1 for incorrect)
        const score = Math.max(0, (correctCount * 4) - incorrectCount);
        
        // Update results UI
        finalScore.textContent = score;
        resultTopic.textContent = currentTopic;
        resultTotal.textContent = questions.length;
        resultCorrect.textContent = correctCount;
        resultIncorrect.textContent = incorrectCount;
        resultTime.textContent = quizTimer.textContent;
        
        // Show results section
        showSection(resultsSection);
    }
    
    // Show review
    function showReview() {
        // Clear review
        reviewQuestions.innerHTML = '';
        
        // Add questions to review
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            const reviewQuestion = document.createElement('div');
            reviewQuestion.className = 'review-question';
            
            let optionsHtml = '';
            const optionLabels = ['A', 'B', 'C', 'D'];
            
            optionLabels.forEach((label, i) => {
                let optionClass = 'review-option';
                if (label === question.correctAnswer) {
                    optionClass += ' correct';
                }
                if (label === userAnswer && userAnswer !== question.correctAnswer) {
                    optionClass += ' incorrect user-selected';
                } else if (label === userAnswer) {
                    optionClass += ' user-selected';
                }
                
                optionsHtml += `
                    <div class="${optionClass}">
                        <div class="option-label">${label}</div>
                        <div class="option-text">${question.options[i]}</div>
                    </div>
                `;
            });
            
            reviewQuestion.innerHTML = `
                <div class="review-question-header">
                    <div class="review-question-number">Question ${index + 1}</div>
                    <div class="review-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
                        ${isCorrect ? 'Correct' : 'Incorrect'}
                    </div>
                </div>
                <div class="review-question-text">${question.text}</div>
                <div class="review-options">
                    ${optionsHtml}
                </div>
                <div class="review-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;
            
            reviewQuestions.appendChild(reviewQuestion);
        });
        
        // Show review section
        showSection(reviewSection);
    }
    
    // Share results
    function shareResults() {
        const score = finalScore.textContent;
        const correct = resultCorrect.textContent;
        const total = resultTotal.textContent;
        const topic = resultTopic.textContent;
        
        const shareText = `I scored ${score} points in ${topic} quiz on QuizTantra! Got ${correct}/${total} questions correct. Try it yourself!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My QuizTantra Results',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
    
    // Fallback share method
    function fallbackShare(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy results: ', err);
            alert('Share this: ' + text);
        });
    }
    
    // Show generator
    function showGenerator() {
        showSection(generatorSection);
        // Reset form
        mcqInput.value = '';
    }
    
    // Show results
    function showResults() {
        showSection(resultsSection);
    }
    
    // Show section
    function showSection(section) {
        // Hide all sections
        generatorSection.classList.remove('active');
        quizSection.classList.remove('active');
        resultsSection.classList.remove('active');
        reviewSection.classList.remove('active');
        
        // Show the requested section
        section.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Start timer
    function startTimer() {
        clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            const now = new Date();
            const elapsed = Math.floor((now - startTime) / 1000);
            
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            
            quizTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
});