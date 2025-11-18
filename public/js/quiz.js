
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz JS Loaded');
    
   
    populateCategorySelect();
    
    
    setupQuizEventListeners();
    
    
    showScreen('user-details-screen');
});

// Quiz state variables
let currentState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    attemptCount: 0,
    selectedCategory: null,
    timer: null,
    timeLeft: 1800,
    userAnswers: {},
    currentUser: null
};

// Quiz Data
const quizData = {
    gk: {
        title: "GK & GS",
        image: "/images/gk.jpg",
        questions: [
            {
                question: "Who is the Father of the Indian Constitution?",
                answers: [
                    { text: "Jawaharlal Nehru", correct: false },
                    { text: "B. R. Ambedkar", correct: true },
                    { text: "Sardar Patel", correct: false },
                    { text: "Mahatma Gandhi", correct: false },
                ]
            },
            {
                question: "Which Indian state has the longest coastline?",
                answers: [
                    { text: "Maharashtra", correct: false },
                    { text: "Tamil Nadu", correct: false },
                    { text: "Gujarat", correct: true },
                    { text: "Andhra Pradesh", correct: false },
                ]
            },
            {
                question: "Which of these is the largest river in India by volume?",
                answers: [
                    { text: "Yamuna", correct: false },
                    { text: "Ganga", correct: false },
                    { text: "Godavari", correct: false },
                    { text: "Brahmaputra", correct: true },
                ]
            },
            {
                question: "The 'Quit India' movement was launched in which year?",
                answers: [
                    { text: "1940", correct: false },
                    { text: "1942", correct: true },
                    { text: "1945", correct: false },
                    { text: "1947", correct: false },
                ]
            },
            {
                question: "What is the primary function of the Indian Space Research Organisation (ISRO)?",
                answers: [
                    { text: "Military defense", correct: false },
                    { text: "Space exploration and satellite technology", correct: true },
                    { text: "Nuclear research", correct: false },
                    { text: "Agricultural research", correct: false },
                ]
            },
            {
                question: "In which city is the famous Victoria Memorial located?",
                answers: [
                    { text: "Mumbai", correct: false },
                    { text: "Delhi", correct: false },
                    { text: "Kolkata", correct: true },
                    { text: "Chennai", correct: false },
                ]
            },
            {
                question: "The 'Golden Temple' of Amritsar is the most sacred site for which religion?",
                answers: [
                    { text: "Buddhism", correct: false },
                    { text: "Jainism", correct: false },
                    { text: "Sikhism", correct: true },
                    { text: "Hinduism", correct: false },
                ]
            },
            {
                question: "Which mountain range is the source of the Ganges and Yamuna rivers?",
                answers: [
                    { text: "Himalayas", correct: true },
                    { text: "Aravalli Range", correct: false },
                    { text: "Western Ghats", correct: false },
                    { text: "Satpura Range", correct: false },
                ]
            },
            {
                question: "Which Indian city is known as the 'Silicon Valley of India'?",
                answers: [
                    { text: "Hyderabad", correct: false },
                    { text: "Chennai", correct: false },
                    { text: "Pune", correct: false },
                    { text: "Bengaluru", correct: true },
                ]
            },
            {
                question: "What is the scientific name of the national tree of India, the Banyan?",
                answers: [
                    { text: "Ficus benghalensis", correct: true },
                    { text: "Mangifera indica", correct: false },
                    { text: "Azadirachta indica", correct: false },
                    { text: "Shorea robusta", correct: false },
                ]
            },
            {
                question: "The first Indian to win the Nobel Prize was...",
                answers: [
                    { text: "C.V. Raman", correct: false },
                    { text: "Rabindranath Tagore", correct: true },
                    { text: "Mother Teresa", correct: false },
                    { text: "Amartya Sen", correct: false },
                ]
            },
            {
                question: "Which of the following is a classical dance form from North India?",
                answers: [
                    { text: "Kathak", correct: true },
                    { text: "Bharatanatyam", correct: false },
                    { text: "Kathakali", correct: false },
                    { text: "Odissi", correct: false },
                ]
            },
            {
                question: "The famous 'Sunderbans' forest is known for which animal?",
                answers: [
                    { text: "Asiatic Lion", correct: false },
                    { text: "One-horned Rhino", correct: false },
                    { text: "Royal Bengal Tiger", correct: true },
                    { text: "Snow Leopard", correct: false },
                ]
            },
            {
                question: "The 'Father of Indian Cinema' is a title given to which person?",
                answers: [
                    { text: "Satyajit Ray", correct: false },
                    { text: "Dadasaheb Phalke", correct: true },
                    { text: "Raj Kapoor", correct: false },
                    { text: "Guru Dutt", correct: false },
                ]
            },
            {
                question: "What is the main source of vitamin D?",
                answers: [
                    { text: "Fruits", correct: false },
                    { text: "Vegetables", correct: false },
                    { text: "Sunlight", correct: true },
                    { text: "Water", correct: false },
                ]
            },
            {
                question: "Which monument was built to commemorate the visit of King George V and Queen Mary to Mumbai?",
                answers: [
                    { text: "Gateway of India", correct: true },
                    { text: "India Gate", correct: false },
                    { text: "Charminar", correct: false },
                    { text: "Qutub Minar", correct: false },
                ]
            },
            {
                question: "The 'Rani ki Vav' stepwell, a UNESCO World Heritage site, is located in which state?",
                answers: [
                    { text: "Rajasthan", correct: false },
                    { text: "Gujarat", correct: true },
                    { text: "Karnataka", correct: false },
                    { text: "Maharashtra", correct: false },
                ]
            },
            {
                question: "Which vitamin is crucial for blood clotting?",
                answers: [
                    { text: "Vitamin A", correct: false },
                    { text: "Vitamin C", correct: false },
                    { text: "Vitamin K", correct: true },
                    { text: "Vitamin D", correct: false },
                ]
            },
            {
                question: "The currency of India is the Rupee. What is its symbol?",
                answers: [
                    { text: "₹", correct: true },
                    { text: "$", correct: false },
                    { text: "€", correct: false },
                    { text: "£", correct: false },
                ]
            },
            {
                question: "Who was the first woman Prime Minister of India?",
                answers: [
                    { text: "Sarojini Naidu", correct: false },
                    { text: "Sonia Gandhi", correct: false },
                    { text: "Indira Gandhi", correct: true },
                    { text: "Pratibha Patil", correct: false },
                ]
            },
            {
                question: "The first successful nuclear test in India was conducted in which state?",
                answers: [
                    { text: "Maharashtra", correct: false },
                    { text: "Gujarat", correct: false },
                    { text: "Rajasthan", correct: true },
                    { text: "Tamil Nadu", correct: false },
                ]
            },
            {
                question: "What is the full form of 'BSE' in the context of the Indian stock market?",
                answers: [
                    { text: "Bank of Standard Exchange", correct: false },
                    { text: "Bombay Stock Exchange", correct: true },
                    { text: "Bharat Stock Exchange", correct: false },
                    { text: "Basic Stock Exchange", correct: false },
                ]
            },
            // Added 8 questions to reach 30
            {
                question: "The national anthem of India, 'Jana Gana Mana', was originally composed in which language?",
                answers: [
                    { text: "Hindi", correct: false },
                    { text: "Bengali", correct: true },
                    { text: "Sanskrit", correct: false },
                    { text: "Marathi", correct: false }
                ]
            },
            {
                question: "Which of these Indian cities is situated on the banks of the River Yamuna?",
                answers: [
                    { text: "Lucknow", correct: false },
                    { text: "Kanpur", correct: false },
                    { text: "Agra", correct: true },
                    { text: "Patna", correct: false }
                ]
            },
            {
                question: "The term 'Zero Hour' in the Indian Parliament refers to...",
                answers: [
                    { text: "The first hour of the session", correct: false },
                    { text: "The last hour of the session", correct: false },
                    { text: "The period immediately following the Question Hour", correct: true },
                    { text: "The time before the session begins", correct: false }
                ]
            },
            {
                question: "The 'Fundamental Duties' were added to the Indian Constitution on the recommendation of which committee?",
                answers: [
                    { text: "Shah Commission", correct: false },
                    { text: "Swaran Singh Committee", correct: true },
                    { text: "Sarkaria Commission", correct: false },
                    { text: "Kothari Commission", correct: false }
                ]
            },
            {
                question: "Which Indian state is the largest producer of rice?",
                answers: [
                    { text: "Punjab", correct: false },
                    { text: "Uttar Pradesh", correct: false },
                    { text: "West Bengal", correct: true },
                    { text: "Andhra Pradesh", correct: false }
                ]
            },
            {
                question: "The 'Ajanta Caves' are primarily associated with the art of which religion?",
                answers: [
                    { text: "Jainism", correct: false },
                    { text: "Hinduism", correct: false },
                    { text: "Buddhism", correct: true },
                    { text: "Sikhism", correct: false }
                ]
            },
            {
                question: "Who authored the famous book 'Discovery of India'?",
                answers: [
                    { text: "Mahatma Gandhi", correct: false },
                    { text: "B. R. Ambedkar", correct: false },
                    { text: "Jawaharlal Nehru", correct: true },
                    { text: "Rabindranath Tagore", correct: false }
                ]
            },
            {
                question: "Which day is celebrated as 'National Science Day' in India?",
                answers: [
                    { text: "January 15th", correct: false },
                    { text: "February 28th", correct: true },
                    { text: "May 5th", correct: false },
                    { text: "December 1st", correct: false }
                ]
            }
        ]
    },
    coding: {
        title: "Coding",
        image: "/images/coding.jpg",
        questions: [
            {
                question: "What is the primary function of CSS?",
                answers: [
                    { text: "Managing databases", correct: false },
                    { text: "Adding interactivity to websites", correct: false },
                    { text: "Structuring web content", correct: false },
                    { text: "Styling web pages", correct: true },
                ]
            },
            {
                question: "Which of the following is NOT a programming language?",
                answers: [
                    { text: "Java", correct: false },
                    { text: "HTML", correct: true },
                    { text: "Python", correct: false },
                    { text: "C++", correct: false },
                ]
            },
            {
                question: "What is a 'variable' in programming?",
                answers: [
                    { text: "A type of loop", correct: false },
                    { text: "A container for storing data values", correct: true },
                    { text: "A mathematical operator", correct: false },
                    { text: "A fixed value", correct: false },
                ]
            },
            {
                question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
                answers: [
                    { text: "Queue", correct: false },
                    { text: "Array", correct: false },
                    { text: "Stack", correct: true },
                    { text: "Linked List", correct: false },
                ]
            },
            {
                question: "What does 'API' stand for?",
                answers: [
                    { text: "Application Protocol Interface", correct: false },
                    { text: "Application Programming Interface", correct: true },
                    { text: "Advanced Programming Instruction", correct: false },
                    { text: "Automated Program Integration", correct: false },
                ]
            },
            {
                question: "Which of these is used for version control in software development?",
                answers: [
                    { text: "Adobe Photoshop", correct: false },
                    { text: "Git", correct: true },
                    { text: "Microsoft Excel", correct: false },
                    { text: "Google Docs", correct: false },
                ]
            },
            {
                question: "What is a 'bug' in programming?",
                answers: [
                    { text: "A physical insect in the computer", correct: false },
                    { text: "An error or defect in a program", correct: true },
                    { text: "A type of software", correct: false },
                    { text: "A user complaint", correct: false },
                ]
            },
            {
                question: "Which term refers to the process of finding and fixing errors in code?",
                answers: [
                    { text: "Compiling", correct: false },
                    { text: "Debugging", correct: true },
                    { text: "Executing", correct: false },
                    { text: "Syntax", correct: false },
                ]
            },
            {
                question: "What is the purpose of a 'for' loop?",
                answers: [
                    { text: "To declare a new variable", correct: false },
                    { text: "To execute a block of code a specific number of times", correct: true },
                    { text: "To check a condition", correct: false },
                    { text: "To define a function", correct: false },
                ]
            },
            {
                question: "Which symbol is used for a single-line comment in Python?",
                answers: [
                    { text: "//", correct: false },
                    { text: "/* */", correct: false },
                    { text: "#", correct: true },
                    { text: "--", correct: false },
                ]
            },
            {
                question: "What is a 'Boolean' data type?",
                answers: [
                    { text: "A number with decimals", correct: false },
                    { text: "A sequence of characters", correct: false },
                    { text: "A value that can be true or false", correct: true },
                    { text: "A whole number", correct: false },
                ]
            },
            {
                question: "Which term describes a reusable block of code designed to perform a specific task?",
                answers: [
                    { text: "Variable", correct: false },
                    { text: "Function", correct: true },
                    { text: "Loop", correct: false },
                    { text: "Class", correct: false },
                ]
            },
            {
                question: "In JavaScript, what keyword is used to declare a variable that cannot be reassigned?",
                answers: [
                    { text: "var", correct: false },
                    { text: "let", correct: false },
                    { text: "const", correct: true },
                    { text: "static", correct: false },
                ]
            },
            {
                question: "What is the main purpose of a database?",
                answers: [
                    { text: "To write code", correct: false },
                    { text: "To store, manage, and retrieve data", correct: true },
                    { text: "To design user interfaces", correct: false },
                    { text: "To create network connections", correct: false },
                ]
            },
            {
                question: "Which of these is an example of an algorithm?",
                answers: [
                    { text: "A piece of software", correct: false },
                    { text: "A set of step-by-step instructions to solve a problem", correct: true },
                    { text: "A computer language", correct: false },
                    { text: "A hardware component", correct: false },
                ]
            },
            {
                question: "What does 'HTTP' stand for?",
                answers: [
                    { text: "Hyper Text Transfer Protocol", correct: true },
                    { text: "High Technology Transfer Process", correct: false },
                    { text: "Hyperlink and Text Protocol", correct: false },
                    { text: "Home Text Transfer Protocol", correct: false },
                ]
            },
            {
                question: "Which language is primarily used for creating Android mobile apps?",
                answers: [
                    { text: "C#", correct: false },
                    { text: "Python", correct: false },
                    { text: "Swift", correct: false },
                    { text: "Kotlin/Java", correct: true },
                ]
            },
            {
                question: "What is a 'compiler'?",
                answers: [
                    { text: "A program that translates source code into machine code", correct: true },
                    { text: "A tool for fixing bugs", correct: false },
                    { text: "A web browser", correct: false },
                    { text: "A type of database", correct: false },
                ]
            },
            {
                question: "Which of the following is a key concept of Object-Oriented Programming (OOP)?",
                answers: [
                    { text: "Procedural programming", correct: false },
                    { text: "Structured programming", correct: false },
                    { text: "Inheritance", correct: true },
                    { text: "Linear programming", correct: false },
                ]
            },
            {
                question: "What does a 'front-end' developer primarily work on?",
                answers: [
                    { text: "Server logic and databases", correct: false },
                    { text: "The user-facing part of a website", correct: true },
                    { text: "Network security", correct: false },
                    { text: "Operating systems", correct: false },
                ]
            },
            {
                question: "What is the purpose of an 'if-else' statement?",
                answers: [
                    { text: "To create a loop", correct: false },
                    { text: "To make a decision based on a condition", correct: true },
                    { text: "To declare a new function", correct: false },
                    { text: "To store data", correct: false },
                ]
            },
            {
                question: "In programming, what is an 'array'?",
                answers: [
                    { text: "A single piece of data", correct: false },
                    { text: "A sequence of numbers", correct: false },
                    { text: "A collection of items of the same data type", correct: true },
                    { text: "A type of bug", correct: false },
                ]
            },
            {
                question: "Which language is known as the 'mother of all languages'?",
                answers: [
                    { text: "Java", correct: false },
                    { text: "C", correct: true },
                    { text: "Assembly", correct: false },
                    { text: "Python", correct: false },
                ]
            },
            {
                question: "What is the main benefit of using a 'class' in programming?",
                answers: [
                    { text: "It simplifies loops", correct: false },
                    { text: "It allows for code reusability and organization", correct: true },
                    { text: "It makes code run faster", correct: false },
                    { text: "It manages memory automatically", correct: false },
                ]
            },
            {
                question: "What is an 'interpreter'?",
                answers: [
                    { text: "A program that translates and executes code line by line", correct: true },
                    { text: "A tool for managing versions", correct: false },
                    { text: "A physical part of a computer", correct: false },
                    { text: "A type of database", correct: false },
                ]
            },
            {
                question: "Which of these is a common framework for building websites with Python?",
                answers: [
                    { text: "Ruby on Rails", correct: false },
                    { text: "Angular", correct: false },
                    { text: "Django", correct: true },
                    { text: "Laravel", correct: false },
                ]
            },
            {
                question: "What does SQL stand for?",
                answers: [
                    { text: "Simple Query Language", correct: false },
                    { text: "Structured Question Language", correct: false },
                    { text: "Structured Query Language", correct: true },
                    { text: "Sequential Query Language", correct: false },
                ]
            },
            {
                question: "Which of these is NOT a back-end programming language?",
                answers: [
                    { text: "Node.js", correct: false },
                    { text: "Python", correct: false },
                    { text: "Java", correct: false },
                    { text: "CSS", correct: true },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "What is the main characteristic of a 'recursive' function?",
                answers: [
                    { text: "It runs indefinitely", correct: false },
                    { text: "It calls another function", correct: false },
                    { text: "It calls itself", correct: true },
                    { text: "It does not return a value", correct: false }
                ]
            },
            {
                question: "Which term refers to the process of protecting information by transforming it into an unreadable format?",
                answers: [
                    { text: "Compilation", correct: false },
                    { text: "Debugging", correct: false },
                    { text: "Encryption", correct: true },
                    { text: "Abstraction", correct: false }
                ]
            }
        ]
    },
    ai: {
        title: "Artificial Intelligence Basics",
        image: "images/ai_basics.jpg",
        questions: [
            {
                question: "What is the primary function of Machine Learning (ML)?",
                answers: [
                    { text: "To perform complex mathematical calculations only", correct: false },
                    { text: "To enable systems to learn from data without being explicitly programmed", correct: true },
                    { text: "To replace human creativity entirely", correct: false },
                    { text: "To manage cloud storage databases", correct: false },
                ]
            },
            {
                question: "Which term describes a machine that can only perform one specific, narrow task (e.g., playing chess)? ",
                answers: [
                    { text: "Artificial Super Intelligence (ASI)", correct: false },
                    { text: "Artificial General Intelligence (AGI)", correct: false },
                    { text: "Artificial Narrow Intelligence (ANI)", correct: true },
                    { text: "Deep Learning", correct: false },
                ]
            },
            {
                question: "If you train a model using a dataset where the answers (labels) are already provided, what type of learning is this? ",
                answers: [
                    { text: "Reinforcement Learning", correct: false },
                    { text: "Unsupervised Learning", correct: false },
                    { text: "Supervised Learning", correct: true },
                    { text: "Clustering", correct: false },
                ]
            },
            {
                question: "What does the acronym NLP stand for in AI? (Easy)",
                answers: [
                    { text: "Neural Logic Programming", correct: false },
                    { text: "New Learning Principles", correct: false },
                    { text: "Natural Language Processing", correct: true },
                    { text: "Numeric Linear Project", correct: false },
                ]
            },
            {
                question: "Which is the main programming language widely adopted for AI and ML due to its extensive libraries? ",
                answers: [
                    { text: "Java", correct: false },
                    { text: "C++", correct: false },
                    { text: "Python", correct: true },
                    { text: "HTML", correct: false },
                ]
            },
            {
                question: "What is an 'Artificial Neural Network' designed to mimic?",
                answers: [
                    { text: "The circulatory system", correct: false },
                    { text: "The human brain structure", correct: true },
                    { text: "The internet network topology", correct: false },
                    { text: "A physical computing device", correct: false },
                ]
            },
            {
                question: "Which framework is a popular open-source library for deep learning developed by Google?",
                answers: [
                    { text: "PyTorch", correct: false },
                    { text: "Scikit-learn", correct: false },
                    { text: "TensorFlow", correct: true },
                    { text: "Django", correct: false },
                ]
            },
            {
                question: "Which sub-field of AI focuses on enabling machines to 'see' and interpret visual data like images and videos? ",
                answers: [
                    { text: "Natural Language Processing", correct: false },
                    { text: "Speech Recognition", correct: false },
                    { text: "Computer Vision", correct: true },
                    { text: "Robotics", correct: false },
                ]
            },
            {
                question: "What is 'Clustering' primarily used for?",
                answers: [
                    { text: "Predicting a numerical value", correct: false },
                    { text: "Training on labeled data", correct: false },
                    { text: "Grouping similar data points together", correct: true },
                    { text: "Rewarding an agent for correct actions", correct: false },
                ]
            },
            {
                question: "What is the primary concern with 'Bias' in AI? ",
                answers: [
                    { text: "The model runs too slowly", correct: false },
                    { text: "The model cannot be integrated with other systems", correct: false },
                    { text: "It leads to unfair or prejudiced outcomes for certain groups", correct: true },
                    { text: "It requires too much data for training", correct: false },
                ]
            },
            {
                question: "Which type of learning involves an agent interacting with an environment to maximize cumulative reward? ",
                answers: [
                    { text: "Supervised Learning", correct: false },
                    { text: "Unsupervised Learning", correct: false },
                    { text: "Reinforcement Learning", correct: true },
                    { text: "Transfer Learning", correct: false },
                ]
            },
            {
                question: "In a neural network, what is the role of an 'Activation Function'? ",
                answers: [
                    { text: "To calculate the final error rate", correct: false },
                    { text: "To convert data into numerical format", correct: false },
                    { text: "To introduce non-linearity into the model, allowing it to learn complex patterns", correct: true },
                    { text: "To define the number of input features", correct: false },
                ]
            },
            {
                question: "What is 'overfitting'? (Mid-level)",
                answers: [
                    { text: "The model is too simple to capture the data trend", correct: false },
                    { text: "The model performs well on training data but poorly on unseen data", correct: true },
                    { text: "The model is trained with too few features", correct: false },
                    { text: "The process of reducing the number of variables in a dataset", correct: false },
                ]
            },
            {
                question: "Which algorithm is used for dimensionality reduction to simplify models and reduce computation time? ",
                answers: [
                    { text: "K-Means", correct: false },
                    { text: "Decision Tree", correct: false },
                    { text: "Principal Component Analysis (PCA)", correct: true },
                    { text: "Logistic Regression", correct: false },
                ]
            },
            {
                question: "What is the core idea behind 'Generative AI'? (Mid-level)",
                answers: [
                    { text: "Labeling large datasets manually", correct: false },
                    { text: "Creating new, realistic content (like images, text, or music)", correct: true },
                    { text: "Improving the security of data encryption", correct: false },
                    { text: "Optimizing website loading speed", correct: false },
                ]
            },
            {
                question: "Which component of an Artificial Neural Network takes the input and calculates a weighted sum? ",
                answers: [
                    { text: "The Loss Function", correct: false },
                    { text: "The Hidden Layer neuron", correct: true },
                    { text: "The Learning Rate", correct: false },
                    { text: "The Dataset", correct: false },
                ]
            },
            {
                question: "What is the name of the iterative process used to adjust the weights of a neural network based on the error?",
                answers: [
                    { text: "Forward Propagation", correct: false },
                    { text: "Normalization", correct: false },
                    { text: "Backpropagation", correct: true },
                    { text: "Feature Engineering", correct: false },
                ]
            },
            {
                question: "Which algorithm is commonly used for recommendation systems by finding similarities between users or items? ",
                answers: [
                    { text: "Linear Regression", correct: false },
                    { text: "K-Nearest Neighbors (KNN)", correct: true },
                    { text: "Convolutional Neural Network (CNN)", correct: false },
                    { text: "K-Means", correct: false },
                ]
            },
            {
                question: "What does 'tokenization' mean in the context of Natural Language Processing (NLP)? ",
                answers: [
                    { text: "Converting audio files to text", correct: false },
                    { text: "Removing punctuation from text", correct: false },
                    { text: "Breaking down text into smaller units like words or sub-words", correct: true },
                    { text: "Generating new sentences based on input", correct: false },
                ]
            },
            {
                question: "What is the key advantage of a 'Convolutional Layer' in a CNN for image processing? (Mid-level)",
                answers: [
                    { text: "It only processes text data", correct: false },
                    { text: "It reduces the dimensionality of the image immediately", correct: false },
                    { text: "It automatically learns and extracts spatial hierarchies of features (edges, textures, etc.)", correct: true },
                    { text: "It always runs faster than any other layer", correct: false },
                ]
            },
            {
                question: "The process of using a pre-trained model on a new, related task is called:",
                answers: [
                    { text: "Pruning", correct: false },
                    { text: "Overfitting", correct: false },
                    { text: "Transfer Learning", correct: true },
                    { text: "Normalization", correct: false },
                ]
            },
            {
                question: "Which metric is generally used to evaluate a regression model's performance?",
                answers: [
                    { text: "Accuracy", correct: false },
                    { text: "Precision", correct: false },
                    { text: "Mean Absolute Error (MAE)", correct: true },
                    { text: "Recall", correct: false },
                ]
            },
            {
                question: "What is the goal of an 'Intelligent Agent' in AI?",
                answers: [
                    { text: "To replace all human employees", correct: false },
                    { text: "To perform only one pre-programmed task repeatedly", correct: false },
                    { text: "To perceive its environment and take actions that maximize its chance of success", correct: true },
                    { text: "To store and retrieve large amounts of data", correct: false },
                ]
            },
            {
                question: "What does 'Data Augmentation' involve, especially in Computer Vision? ",
                answers: [
                    { text: "Removing bad data points from the dataset", correct: false },
                    { text: "Converting images to black and white only", correct: false },
                    { text: "Creating new, modified samples from existing training data (e.g., rotating or flipping images) to expand the dataset", correct: true },
                    { text: "The final step of model deployment", correct: false },
                ]
            },
            {
                question: "A 'Heuristic' in AI search algorithms is best described as:",
                answers: [
                    { text: "A fixed, predetermined path to the goal", correct: false },
                    { text: "A simple, non-optimal 'rule of thumb' or estimate that guides the search towards a solution", correct: true },
                    { text: "The total time required to find the solution", correct: false },
                    { text: "A mathematical formula for calculating weights", correct: false },
                ]
            },
            {
                question: "Which term refers to the parameter that controls the step size when adjusting the weights of a neural network during training?",
                answers: [
                    { text: "Bias", correct: false },
                    { text: "Epoch", correct: false },
                    { text: "Learning Rate", correct: true },
                    { text: "Accuracy", correct: false },
                ]
            },
            {
                question: "What is the primary function of a 'Loss Function' in training a model? ",
                answers: [
                    { text: "To randomly select features for the model", correct: false },
                    { text: "To measure how well the model is performing compared to the expected output", correct: true },
                    { text: "To preprocess the input data", correct: false },
                    { text: "To visualize the model's output", correct: false },
                ]
            },
            {
                question: "Which method is commonly used to prevent overfitting by randomly setting a fraction of neurons to zero during training? ",
                answers: [
                    { text: "Batch Normalization", correct: false },
                    { text: "Pruning", correct: false },
                    { text: "Dropout", correct: true },
                    { text: "One-Hot Encoding", correct: false },
                ]
            },
            {
                question: "In Supervised Learning, which task involves predicting a categorical label (e.g., 'Spam' or 'Not Spam')? ",
                answers: [
                    { text: "Regression", correct: false },
                    { text: "Clustering", correct: false },
                    { text: "Classification", correct: true },
                    { text: "Dimensionality Reduction", correct: false },
                ]
            },
            {
                question: "What is the primary function of a Recurrent Neural Network (RNN)? ",
                answers: [
                    { text: "To process unstructured numerical data", correct: false },
                    { text: "To recognize objects in static images", correct: false },
                    { text: "To process sequences of data, such as text or time series, where order matters", correct: true },
                    { text: "To perform non-linear regression", correct: false },
                ]
            },
            {
                question: "Which ethical concern addresses the question of who is responsible when an AI system causes harm? ",
                answers: [
                    { text: "Transparency", correct: false },
                    { text: "Fairness", correct: false },
                    { text: "Accountability", correct: true },
                    { text: "Efficiency", correct: false },
                ]
            },
            {
                question: "What is 'Sentiment Analysis' used for?",
                answers: [
                    { text: "Detecting objects in an image", correct: false },
                    { text: "Summarizing long articles", correct: false },
                    { text: "Determining the emotional tone (positive, negative, neutral) of a text", correct: true },
                    { text: "Generating new code snippets", correct: false },
                ]
            },
            {
                question: "Which is a common method for handling categorical features (like 'Red', 'Blue', 'Green') in a numerical model?",
                answers: [
                    { text: "Feature Scaling", correct: false },
                    { text: "Logarithmic Transformation", correct: false },
                    { text: "One-Hot Encoding", correct: true },
                    { text: "Model Drift", correct: false },
                ]
            },
            {
                question: "What is the primary role of an 'Optimizer' in training a neural network?",
                answers: [
                    { text: "To stop the training when the error is zero", correct: false },
                    { text: "To calculate the gradient of the loss function and update the weights to minimize loss", correct: true },
                    { text: "To select the best dataset for the task", correct: false },
                    { text: "To check the syntax of the code", correct: false },
                ]
            },
            {
                question: "Which AI application is commonly used to create virtual assistants like Siri or Alexa?",
                answers: [
                    { text: "Computer Vision", correct: false },
                    { text: "Reinforcement Learning", correct: false },
                    { text: "Speech Recognition and NLP", correct: true },
                    { text: "Database Querying", correct: false },
                ]
            },
            {
                question: "What does 'KNN' stand for in machine learning algorithms?",
                answers: [
                    { text: "Knowledge Network Nodes", correct: false },
                    { text: "Kernel New Normalization", correct: false },
                    { text: "K-Nearest Neighbors", correct: true },
                    { text: "Key New Numbers", correct: false },
                ]
            },
            {
                question: "What is the concept of a machine not only predicting but also providing an explanation for its prediction?",
                answers: [
                    { text: "Black-Box Model", correct: false },
                    { text: "Transfer Learning", correct: false },
                    { text: "Explainable AI (XAI)", correct: true },
                    { text: "Data Augmentation", correct: false },
                ]
            },
            {
                question: "What is the primary role of the 'Test Set' in machine learning? ",
                answers: [
                    { text: "To clean and preprocess the data", correct: false },
                    { text: "To adjust the model's weights during training", correct: false },
                    { text: "To provide an unbiased evaluation of the final model on unseen data", correct: true },
                    { text: "To determine the number of layers in a neural network", correct: false },
                ]
            },
            {
                question: "In a classification model, what is a 'False Negative'? ",
                answers: [
                    { text: "The model correctly predicts a positive outcome", correct: false },
                    { text: "The model predicts a negative outcome, but the actual outcome is positive", correct: true },
                    { text: "The model correctly predicts a negative outcome", correct: false },
                    { text: "The model predicts a positive outcome, but the actual outcome is negative", correct: false },
                ]
            },
            {
                question: "Which algorithm is used for clustering when the number of clusters (K) is specified beforehand?",
                answers: [
                    { text: "Support Vector Machine (SVM)", correct: false },
                    { text: "Linear Regression", correct: false },
                    { text: "K-Means", correct: true },
                    { text: "A* Search", correct: false },
                ]
            },
            {
                question: "Which technique is used to prevent the model from assigning excessive importance to any single feature by penalizing large weights?",
                answers: [
                    { text: "Clustering", correct: false },
                    { text: "Normalization", correct: false },
                    { text: "Regularization (L1/L2)", correct: true },
                    { text: "Tokenization", correct: false },
                ]
            },
            {
                question: "What is the result of applying a 'Filter' or 'Kernel' over an image in a CNN? ",
                answers: [
                    { text: "The final classified output", correct: false },
                    { text: "The loss function value", correct: false },
                    { text: "A feature map, highlighting certain features like edges or colors", correct: true },
                    { text: "A randomly generated new image", correct: false },
                ]
            },
            {
                question: "Which concept refers to the problem where the model's accuracy degrades over time due to changes in real-world data distribution?",
                answers: [
                    { text: "Data Leakage", correct: false },
                    { text: "Gradient Vanishing", correct: false },
                    { text: "Model Drift", correct: true },
                    { text: "Dimensionality Reduction", correct: false },
                ]
            },
            {
                question: "What is the primary distinction of 'Deep Learning' from general Machine Learning?",
                answers: [
                    { text: "It only uses labeled data", correct: false },
                    { text: "It uses simpler mathematical models", correct: false },
                    { text: "It uses neural networks with multiple (deep) hidden layers", correct: true },
                    { text: "It is only used for recommendation systems", correct: false },
                ]
            },
            {
                question: "The process of cleaning, transforming, and selecting relevant data to prepare it for a model is called:",
                answers: [
                    { text: "Model Deployment", correct: false },
                    { text: "Hyperparameter Tuning", correct: false },
                    { text: "Data Preprocessing", correct: true },
                    { text: "Loss Calculation", correct: false },
                ]
            }
        ]
    },
    maths: {
        title: "Mathematics",
        image: "images/math.jpg",
        questions: [
            {
                question: "What is the sum of all angles in a quadrilateral?",
                answers: [
                    { text: "180°", correct: false },
                    { text: "360°", correct: true },
                    { text: "90°", correct: false },
                    { text: "540°", correct: false },
                ]
            },
            {
                question: "What is the formula for the area of a rectangle?",
                answers: [
                    { text: "$$2(length + width)$$", correct: false },
                    { text: "$$length \\times width$$", correct: true },
                    { text: "$$side^2$$", correct: false },
                    { text: "$$\\pi r^2$$", correct: false },
                ]
            },
            {
                question: "What is the smallest prime number?",
                answers: [
                    { text: "1", correct: false },
                    { text: "2", correct: true },
                    { text: "3", correct: false },
                    { text: "0", correct: false },
                ]
            },
            {
                question: "What does the '$$\\pi$$' symbol represent in geometry?",
                answers: [
                    { text: "The ratio of a circle's diameter to its radius", correct: false },
                    { text: "The ratio of a circle's circumference to its diameter", correct: true },
                    { text: "The area of a circle", correct: false },
                    { text: "The radius of a circle", correct: false },
                ]
            },
            {
                question: "According to Pythagoras' theorem, for a right-angled triangle, what is the relationship between its sides?",
                answers: [
                    { text: "$$a + b = c$$", correct: false },
                    { text: "$$a^2 + b^2 = c^2$$", correct: true },
                    { text: "$$a^2 + b^2 = 2c$$", correct: false },
                    { text: "$$a + b = c^2$$", correct: false },
                ]
            },
            {
                question: "A line that touches a circle at only one point is called a...?",
                answers: [
                    { text: "Chord", correct: false },
                    { text: "Tangent", correct: true },
                    { text: "Radius", correct: false },
                    { text: "Diameter", correct: false },
                ]
            },
            {
                question: "The median of a triangle connects a vertex to the midpoint of the...?",
                answers: [
                    { text: "Opposite side", correct: true },
                    { text: "Adjacent side", correct: false },
                    { text: "Hypotenuse", correct: false },
                    { text: "Angle", correct: false },
                ]
            },
            {
                question: "What is the value of '$$\\tan(45^{\\circ})$$ '?",
                answers: [
                    { text: "0", correct: false },
                    { text: "0.5", correct: false },
                    { text: "1", correct: true },
                    { text: "$$\\sqrt{3}$$", correct: false },
                ]
            },
            {
                question: "What is the formula for calculating Simple Interest (SI)?",
                answers: [
                    { text: "$$P \\times R \\times T$$", correct: true },
                    { text: "$$P + R + T$$", correct: false },
                    { text: "$$P \\times R / T$$", correct: false },
                    { text: "$$P + (R \\times T)$$", correct: false },
                ]
            },
            {
                question: "A number that can be expressed in the form $$p/q$$, where p and q are integers and $$q \\ne 0$$, is called a...?",
                answers: [
                    { text: "Irrational number", correct: false },
                    { text: "Integer", correct: false },
                    { text: "Rational number", correct: true },
                    { text: "Real number", correct: false },
                ]
            },
            {
                question: "The sum of the cubes of the first 'n' natural numbers is given by the formula...?",
                answers: [
                    { text: "$$n(n+1)/2$$", correct: false },
                    { text: "$$[n(n+1)/2]^2$$", correct: true },
                    { text: "$$n^2(n+1)^2$$", correct: false },
                    { text: "$$n^3/3$$", correct: false },
                ]
            },
            {
                question: "In algebra, what is a 'monomial'?",
                answers: [
                    { text: "An expression with two terms", correct: false },
                    { text: "An expression with a single term", correct: true },
                    { text: "An expression with multiple variables", correct: false },
                    { text: "A number without a variable", correct: false },
                ]
            },
            {
                question: "The HCF of two prime numbers is always...?",
                answers: [
                    { text: "1", correct: true },
                    { text: "0", correct: false },
                    { text: "The product of the numbers", correct: false },
                    { text: "The sum of the numbers", correct: false },
                ]
            },
            {
                question: "A polygon with 8 sides is called a...?",
                answers: [
                    { text: "Hexagon", correct: false },
                    { text: "Heptagon", correct: false },
                    { text: "Octagon", correct: true },
                    { text: "Nonagon", correct: false },
                ]
            },
            {
                question: "What is the definition of a 'prime number'?",
                answers: [
                    { text: "A number with exactly two factors: 1 and itself", correct: true },
                    { text: "A number that can only be divided by 1", correct: false },
                    { text: "Any odd number", correct: false },
                    { text: "A number that is not divisible by 2", correct: false },
                ]
            },
            {
                question: "In a quadratic equation $$ax^2 + bx + c = 0$$, the discriminant is given by...?",
                answers: [
                    { text: "$$b^2 - 4ac$$", correct: true },
                    { text: "$$a^2 + b^2$$", correct: false },
                    { text: "$$4ac - b^2$$", correct: false },
                    { text: "$$-b / 2a$$", correct: false },
                ]
            },
            {
                question: "What is the formula for the volume of a sphere?",
                answers: [
                    { text: "$$\\pi r^2h$$", correct: false },
                    { text: "$$4/3 \\pi r^3$$", correct: true },
                    { text: "$$2\\pi rh$$", correct: false },
                    { text: "$$\\pi r^2$$", correct: false },
                ]
            },
            {
                question: "The product of two consecutive integers is always divisible by...?",
                answers: [
                    { text: "3", correct: false },
                    { text: "4", correct: false },
                    { text: "2", correct: true },
                    { text: "5", correct: false },
                ]
            },
            {
                question: "The area of a triangle with a base 'b' and height 'h' is given by...?",
                answers: [
                    { text: "$$b \\times h$$", correct: false },
                    { text: "$$2(b + h)$$", correct: false },
                    { text: "$$1/2 \\times b \\times h$$", correct: true },
                    { text: "$$b + h / 2$$", correct: false },
                ]
            },
            {
                question: "What is the value of $$5^0$$?",
                answers: [
                    { text: "0", correct: false },
                    { text: "5", correct: false },
                    { text: "1", correct: true },
                    { text: "10", correct: false },
                ]
            },
            {
                question: "In trigonometry, 'sec $$\\theta$$' is the reciprocal of which function?",
                answers: [
                    { text: "$$\\sin \\theta$$", correct: false },
                    { text: "$$\\cos \\theta$$", correct: true },
                    { text: "$$\\tan \\theta$$", correct: false },
                    { text: "$$\\cot \\theta$$", correct: false },
                ]
            },
            {
                question: "The set of all possible outcomes of an experiment is called the...?",
                answers: [
                    { text: "Event", correct: false },
                    { text: "Sample space", correct: true },
                    { text: "Probability", correct: false },
                    { text: "Outcome", correct: false },
                ]
            },
            {
                question: "The formula for the circumference of a circle is...",
                answers: [
                    { text: "$$\\pi r^2$$", correct: false },
                    { text: "$$2\\pi r$$", correct: true },
                    { text: "$$\\pi d$$", correct: false },
                    { text: "$$\\pi(d/2)$$", correct: false },
                ]
            },
            {
                question: "What is the slope of a horizontal line?",
                answers: [
                    { text: "Undefined", correct: false },
                    { text: "1", correct: false },
                    { text: "0", correct: true },
                    { text: "Negative", correct: false },
                ]
            },
            {
                question: "What is the volume of a cylinder with radius 'r' and height 'h'?",
                answers: [
                    { text: "$$2\\pi rh$$", correct: false },
                    { text: "$$\\pi r^2h$$", correct: true },
                    { text: "$$2\\pi r(r+h)$$", correct: false },
                    { text: "$$1/3\\pi r^2h$$", correct: false },
                ]
            },
            {
                question: "What is the formula for the nth term of an arithmetic progression?",
                answers: [
                    { text: "$$a + (n-1)d$$", correct: true },
                    { text: "$$ar^{n-1}$$", correct: false },
                    { text: "$$n/2[2a+(n-1)d]$$", correct: false },
                    { text: "$$a - (n-1)d$$", correct: false },
                ]
            },
            {
                question: "Which of the following is an irrational number?",
                answers: [
                    { text: "$$\\sqrt{4}$$", correct: false },
                    { text: "22/7", correct: false },
                    { text: "0.333...", correct: false },
                    { text: "$$\\pi$$", correct: true },
                ]
            },
            {
                question: "The property $$(a + b) + c = a + (b + c)$$ is called the...",
                answers: [
                    { text: "Commutative Property", correct: false },
                    { text: "Distributive Property", correct: false },
                    { text: "Associative Property", correct: true },
                    { text: "Identity Property", correct: false },
                ]
            },
            {
                question: "What is the mode of a set of data?",
                answers: [
                    { text: "The middle value", correct: false },
                    { text: "The sum of all values", correct: false },
                    { text: "The most frequently occurring value", correct: true },
                    { text: "The average value", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "The perimeter of a circle is also known as its...?",
                answers: [
                    { text: "Diameter", correct: false },
                    { text: "Area", correct: false },
                    { text: "Circumference", correct: true },
                    { text: "Radius", correct: false }
                ]
            },
            {
                question: "In probability, what is the probability of an impossible event?",
                answers: [
                    { text: "1", correct: false },
                    { text: "0.5", correct: false },
                    { text: "0", correct: true },
                    { text: "Undefined", correct: false }
                ]
            }
        ]
    },
    science: {
        title: "Science",
        image: "images/science.jpg",
        questions: [
            {
                question: "What is the powerhouse of the cell?",
                answers: [
                    { text: "Nucleus", correct: false },
                    { text: "Ribosome", correct: false },
                    { text: "Mitochondria", correct: true },
                    { text: "Cytoplasm", correct: false },
                ]
            },
            {
                question: "What is the chemical symbol for gold?",
                answers: [
                    { text: "Ag", correct: false },
                    { text: "Au", correct: true },
                    { text: "Pb", correct: false },
                    { text: "Fe", correct: false },
                ]
            },
            {
                question: "Which gas do plants absorb during photosynthesis?",
                answers: [
                    { text: "Oxygen", correct: false },
                    { text: "Nitrogen", correct: false },
                    { text: "Carbon Dioxide", correct: true },
                    { text: "Hydrogen", correct: false },
                ]
            },
            {
                question: "The chemical formula for water is:",
                answers: [
                    { text: "$$H_3O$$", correct: false },
                    { text: "$$H_2O_2$$", correct: false },
                    { text: "$$H_2O$$", correct: true },
                    { text: "$$CO_2$$", correct: false },
                ]
            },
            {
                question: "What is the study of the universe and celestial objects called?",
                answers: [
                    { text: "Geology", correct: false },
                    { text: "Meteorology", correct: false },
                    { text: "Cosmology", correct: true },
                    { text: "Oceanography", correct: false },
                ]
            },
            {
                question: "Which of these is a good conductor of electricity?",
                answers: [
                    { text: "Wood", correct: false },
                    { text: "Plastic", correct: false },
                    { text: "Copper", correct: true },
                    { text: "Glass", correct: false },
                ]
            },
            {
                question: "What is the process by which a solid turns directly into a gas without passing through the liquid state?",
                answers: [
                    { text: "Evaporation", correct: false },
                    { text: "Condensation", correct: false },
                    { text: "Sublimation", correct: true },
                    { text: "Melting", correct: false },
                ]
            },
            {
                question: "Which planet is known as the 'Red Planet'?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mars", correct: true },
                    { text: "Jupiter", correct: false },
                    { text: "Mercury", correct: false },
                ]
            },
            {
                question: "What is the unit of electric current?",
                answers: [
                    { text: "Volt", correct: false },
                    { text: "Ohm", correct: false },
                    { text: "Watt", correct: false },
                    { text: "Ampere", correct: true },
                ]
            },
            {
                question: "What is the main component of natural gas?",
                answers: [
                    { text: "Propane", correct: false },
                    { text: "Butane", correct: false },
                    { text: "Methane", correct: true },
                    { text: "Ethane", correct: false },
                ]
            },
            {
                question: "What is the process of a liquid becoming a solid?",
                answers: [
                    { text: "Melting", correct: false },
                    { text: "Evaporation", correct: false },
                    { text: "Freezing", correct: true },
                    { text: "Condensation", correct: false },
                ]
            },
            {
                question: "Which of these is an example of a chemical change?",
                answers: [
                    { text: "Melting of ice", correct: false },
                    { text: "Boiling of water", correct: false },
                    { text: "Burning of wood", correct: true },
                    { text: "Cutting of paper", correct: false },
                ]
            },
            {
                question: "What is the scientific study of plants called?",
                answers: [
                    { text: "Zoology", correct: false },
                    { text: "Geology", correct: false },
                    { text: "Botany", correct: true },
                    { text: "Anatomy", correct: false },
                ]
            },
            {
                question: "Which of these is the largest planet in our solar system?",
                answers: [
                    { text: "Saturn", correct: false },
                    { text: "Earth", correct: false },
                    { text: "Uranus", correct: false },
                    { text: "Jupiter", correct: true },
                ]
            },
            {
                question: "What is the main function of red blood cells?",
                answers: [
                    { text: "Fighting infection", correct: false },
                    { text: "Transporting oxygen", correct: true },
                    { text: "Clotting blood", correct: false },
                    { text: "Filtering waste", correct: false },
                ]
            },
            {
                question: "Which of the following is a renewable source of energy?",
                answers: [
                    { text: "Coal", correct: false },
                    { text: "Petroleum", correct: false },
                    { text: "Solar power", correct: true },
                    { text: "Natural gas", correct: false },
                ]
            },
            {
                question: "What is the process of splitting a large atom's nucleus into smaller atoms?",
                answers: [
                    { text: "Nuclear fusion", correct: false },
                    { text: "Nuclear fission", correct: true },
                    { text: "Radioactive decay", correct: false },
                    { text: "Chemical reaction", correct: false },
                ]
            },
            {
                question: "Which part of the human body produces insulin?",
                answers: [
                    { text: "Liver", correct: false },
                    { text: "Stomach", correct: false },
                    { text: "Pancreas", correct: true },
                    { text: "Kidney", correct: false },
                ]
            },
            {
                question: "What is the hardest natural substance on Earth?",
                answers: [
                    { text: "Granite", correct: false },
                    { text: "Iron", correct: false },
                    { text: "Diamond", correct: true },
                    { text: "Quartz", correct: false },
                ]
            },
            {
                question: "Which of these is a vector quantity?",
                answers: [
                    { text: "Mass", correct: false },
                    { text: "Speed", correct: false },
                    { text: "Distance", correct: false },
                    { text: "Velocity", correct: true },
                ]
            },
            {
                question: "Which layer of the atmosphere is closest to Earth's surface?",
                answers: [
                    { text: "Mesosphere", correct: false },
                    { text: "Stratosphere", correct: false },
                    { text: "Exosphere", correct: false },
                    { text: "Troposphere", correct: true },
                ]
            },
            {
                question: "What is the common name for sodium chloride?",
                answers: [
                    { text: "Baking soda", correct: false },
                    { text: "Vinegar", correct: false },
                    { text: "Table salt", correct: true },
                    { text: "Sugar", correct: false },
                ]
            },
            {
                question: "Which organ in the human body is responsible for filtering blood?",
                answers: [
                    { text: "Heart", correct: false },
                    { text: "Lungs", correct: false },
                    { text: "Kidneys", correct: true },
                    { text: "Stomach", correct: false },
                ]
            },
            {
                question: "What is the process of breaking down food into smaller molecules called?",
                answers: [
                    { text: "Respiration", correct: false },
                    { text: "Photosynthesis", correct: false },
                    { text: "Digestion", correct: true },
                    { text: "Fermentation", correct: false },
                ]
            },
            {
                question: "Which of these is a vertebrate?",
                answers: [
                    { text: "Jellyfish", correct: false },
                    { text: "Earthworm", correct: false },
                    { text: "Frog", correct: true },
                    { text: "Snail", correct: false },
                ]
            },
            {
                question: "What is the SI unit for temperature?",
                answers: [
                    { text: "Celsius", correct: false },
                    { text: "Fahrenheit", correct: false },
                    { text: "Joule", correct: false },
                    { text: "Kelvin", correct: true },
                ]
            },
            {
                question: "Which layer of the Earth is responsible for generating its magnetic field?",
                answers: [
                    { text: "Crust", correct: false },
                    { text: "Mantle", correct: false },
                    { text: "Inner core", correct: false },
                    { text: "Outer core", correct: true },
                ]
            },
            {
                question: "What is the function of chlorophyll in plants?",
                answers: [
                    { text: "Absorbing water from the soil", correct: false },
                    { text: "Providing structural support", correct: false },
                    { text: "Producing oxygen", correct: false },
                    { text: "Absorbing sunlight for photosynthesis", correct: true },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "What is the force that pulls objects toward the center of the Earth?",
                answers: [
                    { text: "Friction", correct: false },
                    { text: "Tension", correct: false },
                    { text: "Gravity", correct: true },
                    { text: "Magnetism", correct: false }
                ]
            },
            {
                question: "Which human organ is primarily responsible for pumping blood throughout the body?",
                answers: [
                    { text: "Brain", correct: false },
                    { text: "Lungs", correct: false },
                    { text: "Heart", correct: true },
                    { text: "Liver", correct: false }
                ]
            }
        ]
    },
    history: {
        title: "History",
        image: "images/history2.jpg",
        questions: [
            {
                question: "The Indus Valley Civilization is also known as which civilization?",
                answers: [
                    { text: "Vedic", correct: false },
                    { text: "Harappan", correct: true },
                    { text: "Mohenjo-Daro", correct: false },
                    { text: "Mauryan", correct: false },
                ]
            },
            {
                question: "Who was the founder of the Mauryan Empire?",
                answers: [
                    { text: "Ashoka", correct: false },
                    { text: "Chandragupta Maurya", correct: true },
                    { text: "Bindusara", correct: false },
                    { text: "Samudragupta", correct: false },
                ]
            },
            {
                question: "The famous 'Iron Pillar' which has not rusted despite being exposed to weather for centuries is located in which city?",
                answers: [
                    { text: "Mumbai", correct: false },
                    { text: "Delhi", correct: true },
                    { text: "Kolkata", correct: false },
                    { text: "Agra", correct: false },
                ]
            },
            {
                question: "Who was the first governor-general of independent India?",
                answers: [
                    { text: "Lord Mountbatten", correct: false },
                    { text: "C. Rajagopalachari", correct: true },
                    { text: "Jawaharlal Nehru", correct: false },
                    { text: "Dr. Rajendra Prasad", correct: false },
                ]
            },
            {
                question: "The Jallianwala Bagh massacre took place in which year?",
                answers: [
                    { text: "1918", correct: false },
                    { text: "1919", correct: true },
                    { text: "1920", correct: false },
                    { text: "1921", correct: false },
                ]
            },
            {
                question: "Which Indian freedom fighter is known as 'Netaji'?",
                answers: [
                    { text: "Bhagat Singh", correct: false },
                    { text: "Subhas Chandra Bose", correct: true },
                    { text: "Mahatma Gandhi", correct: false },
                    { text: "Sardar Vallabhbhai Patel", correct: false },
                ]
            },
            {
                question: "The 'Dandi March' was led by which freedom fighter?",
                answers: [
                    { text: "Subhas Chandra Bose", correct: false },
                    { text: "Mahatma Gandhi", correct: true },
                    { text: "Bhagat Singh", correct: false },
                    { text: "Sardar Vallabhbhai Patel", correct: false },
                ]
            },
            {
                question: "The ancient city of Pataliputra is the modern-day city of...?",
                answers: [
                    { text: "Patna", correct: true },
                    { text: "Lucknow", correct: false },
                    { text: "Varanasi", correct: false },
                    { text: "Ujjain", correct: false },
                ]
            },
            {
                question: "Who founded the 'Satyashodhak Samaj' in Maharashtra?",
                answers: [
                    { text: "B. R. Ambedkar", correct: false },
                    { text: "Jyotirao Phule", correct: true },
                    { text: "Gopal Krishna Gokhale", correct: false },
                    { text: "Mahatma Gandhi", correct: false },
                ]
            },
            {
                question: "The 'First War of Indian Independence' in 1857 is also known as the...",
                answers: [
                    { text: "Sepoy Mutiny", correct: true },
                    { text: "Quit India Movement", correct: false },
                    { text: "Civil Disobedience Movement", correct: false },
                    { text: "Non-Cooperation Movement", correct: false },
                ]
            },
            {
                question: "Which dynasty built the Khajuraho temples?",
                answers: [
                    { text: "Gupta", correct: false },
                    { text: "Chola", correct: false },
                    { text: "Chandela", correct: true },
                    { text: "Rashtrakuta", correct: false },
                ]
            },
            {
                question: "The 'Rigveda' is the oldest text of which religious tradition?",
                answers: [
                    { text: "Buddhism", correct: false },
                    { text: "Hinduism", correct: true },
                    { text: "Jainism", correct: false },
                    { text: "Sikhism", correct: false },
                ]
            },
            {
                question: "Who was the first woman President of the Indian National Congress?",
                answers: [
                    { text: "Sarojini Naidu", correct: false },
                    { text: "Annie Besant", correct: true },
                    { text: "Indira Gandhi", correct: false },
                    { text: "Vijayalakshmi Pandit", correct: false },
                ]
            },
            {
                question: "The 'Battle of Plassey' was fought in which year?",
                answers: [
                    { text: "1757", correct: true },
                    { text: "1764", correct: false },
                    { text: "1773", correct: false },
                    { text: "1857", correct: false },
                ]
            },
            {
                question: "Who founded the 'Gadar Party' in the US and Canada?",
                answers: [
                    { text: "Lala Lajpat Rai", correct: false },
                    { text: "Lala Har Dayal", correct: true },
                    { text: "Ras Bihari Bose", correct: false },
                    { text: "Sohan Singh Bhakna", correct: false },
                ]
            },
            {
                question: "The 'Sangam period' in ancient India is associated with which region?",
                answers: [
                    { text: "North India", correct: false },
                    { text: "Deccan", correct: false },
                    { text: "South India", correct: true },
                    { text: "East India", correct: false },
                ]
            },
            {
                question: "Who was the first Indian to join the Indian Civil Service (ICS)?",
                answers: [
                    { text: "Surendranath Banerjee", correct: false },
                    { text: "Satyendranath Tagore", correct: true },
                    { text: "Aurobindo Ghosh", correct: false },
                    { text: "Dadabhai Naoroji", correct: false },
                ]
            },
            {
                question: "The 'Permanent Settlement' was introduced by which British Governor-General?",
                answers: [
                    { text: "Lord Wellesley", correct: false },
                    { text: "Lord Cornwallis", correct: true },
                    { text: "Lord Dalhousie", correct: false },
                    { text: "William Bentinck", correct: false },
                ]
            },
            {
                question: "The ancient university of Nalanda was in which modern Indian state?",
                answers: [
                    { text: "West Bengal", correct: false },
                    { text: "Uttar Pradesh", correct: false },
                    { text: "Bihar", correct: true },
                    { text: "Odisha", correct: false },
                ]
            },
            {
                question: "Who was the founder of the 'Forward Bloc' political party?",
                answers: [
                    { text: "Jawaharlal Nehru", correct: false },
                    { text: "Subhas Chandra Bose", correct: true },
                    { text: "Sardar Vallabhbhai Patel", correct: false },
                    { text: "Maulana Azad", correct: false },
                ]
            },
            {
                question: "The 'Battle of Buxar' was fought in which year?",
                answers: [
                    { text: "1757", correct: false },
                    { text: "1764", correct: true },
                    { text: "1857", correct: false },
                    { text: "1773", correct: false },
                ]
            },
            {
                question: "Which Indian leader is known as the 'Iron Man of India'?",
                answers: [
                    { text: "Lal Bahadur Shastri", correct: false },
                    { text: "Sardar Vallabhbhai Patel", correct: true },
                    { text: "B. R. Ambedkar", correct: false },
                    { text: "Subhas Chandra Bose", correct: false },
                ]
            },
            {
                question: "The 'Rigvedic' period is known for which system of governance?",
                answers: [
                    { text: "Monarchy", correct: false },
                    { text: "Republic", correct: false },
                    { text: "Tribal chiefdoms", correct: true },
                    { text: "Democracy", correct: false },
                ]
            },
            {
                question: "Who was the first President of the Indian National Congress?",
                answers: [
                    { text: "A. O. Hume", correct: false },
                    { text: "W. C. Bonnerjee", correct: true },
                    { text: "Dadabhai Naoroji", correct: false },
                    { text: "Badruddin Tyabji", correct: false },
                ]
            },
            {
                question: "Which ancient Indian ruler converted to Buddhism after the Kalinga War?",
                answers: [
                    { text: "Chandragupta Maurya", correct: false },
                    { text: "Bindusara", correct: false },
                    { text: "Ashoka", correct: true },
                    { text: "Kanishka", correct: false },
                ]
            },
            {
                question: "The 'Sati Pratha' was abolished by which British Governor-General?",
                answers: [
                    { text: "Lord Dalhousie", correct: false },
                    { text: "Lord William Bentinck", correct: true },
                    { text: "Lord Canning", correct: false },
                    { text: "Lord Ripon", correct: false },
                ]
            },
            {
                question: "The 'Harshacharita' was written by which court poet of King Harsha?",
                answers: [
                    { text: "Kalidasa", correct: false },
                    { text: "Banabhatta", correct: true },
                    { text: "Fa Xian", correct: false },
                    { text: "Xuanzang", correct: false },
                ]
            },
            {
                question: "The 'Cripps Mission' came to India in which year?",
                answers: [
                    { text: "1940", correct: false },
                    { text: "1942", correct: true },
                    { text: "1945", correct: false },
                    { text: "1946", correct: false },
                ]
            },
            {
                question: "The 'Partition of Bengal' was carried out by which Viceroy of India?",
                answers: [
                    { text: "Lord Minto", correct: false },
                    { text: "Lord Curzon", correct: true },
                    { text: "Lord Hardinge", correct: false },
                    { text: "Lord Chelmsford", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "The famous poet Tulsidas, who wrote the Ramcharitmanas, lived during the reign of which Mughal Emperor?",
                answers: [
                    { text: "Humayun", correct: false },
                    { text: "Akbar", correct: true },
                    { text: "Shah Jahan", correct: false },
                    { text: "Jahangir", correct: false }
                ]
            },
            {
                question: "The 'Poona Pact' was an agreement between Mahatma Gandhi and which other leader?",
                answers: [
                    { text: "Jawaharlal Nehru", correct: false },
                    { text: "Muhammad Ali Jinnah", correct: false },
                    { text: "B. R. Ambedkar", correct: true },
                    { text: "Sardar Patel", correct: false }
                ]
            }
        ]
    },
    geography: {
        title: "Geography",
        image: "images/geography.jpg",
        questions: [
            {
                question: "Which is the largest ocean on Earth?",
                answers: [
                    { text: "Atlantic", correct: false },
                    { text: "Indian", correct: false },
                    { text: "Arctic", correct: false },
                    { text: "Pacific", correct: true },
                ]
            },
            {
                question: "Which of these is the largest continent by land area?",
                answers: [
                    { text: "Africa", correct: false },
                    { text: "North America", correct: false },
                    { text: "Asia", correct: true },
                    { text: "Europe", correct: false },
                ]
            },
            {
                question: "What is the capital of Japan?",
                answers: [
                    { text: "Beijing", correct: false },
                    { text: "Seoul", correct: false },
                    { text: "Tokyo", correct: true },
                    { text: "Bangkok", correct: false },
                ]
            },
            {
                question: "The 'Sahara Desert' is located on which continent?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "North America", correct: false },
                    { text: "Africa", correct: true },
                    { text: "Australia", correct: false },
                ]
            },
            {
                question: "Which river is the longest in the world?",
                answers: [
                    { text: "Amazon", correct: false },
                    { text: "Ganga", correct: false },
                    { text: "Nile", correct: true },
                    { text: "Yangtze", correct: false },
                ]
            },
            {
                question: "What is the name of the largest island in the world?",
                answers: [
                    { text: "Madagascar", correct: false },
                    { text: "Greenland", correct: true },
                    { text: "Australia", correct: false },
                    { text: "Borneo", correct: false },
                ]
            },
            {
                question: "Mount Everest, the world's highest peak, is located in which mountain range?",
                answers: [
                    { text: "Andes", correct: false },
                    { text: "Rocky Mountains", correct: false },
                    { text: "Himalayas", correct: true },
                    { text: "Alps", correct: false },
                ]
            },
            {
                question: "Which country is also known as the 'Land of the Rising Sun'?",
                answers: [
                    { text: "China", correct: false },
                    { text: "India", correct: false },
                    { text: "Japan", correct: true },
                    { text: "Thailand", correct: false },
                ]
            },
            {
                question: "The 'Strait of Gibraltar' separates which two continents?",
                answers: [
                    { text: "Asia and Africa", correct: false },
                    { text: "North America and South America", correct: false },
                    { text: "Europe and Africa", correct: true },
                    { text: "Asia and Europe", correct: false },
                ]
            },
            {
                question: "Which of these is the world's largest hot desert?",
                answers: [
                    { text: "Gobi Desert", correct: false },
                    { text: "Kalahari Desert", correct: false },
                    { text: "Sahara Desert", correct: true },
                    { text: "Arabian Desert", correct: false },
                ]
            },
            {
                question: "Which country is the world's largest producer of coffee?",
                answers: [
                    { text: "Colombia", correct: false },
                    { text: "Vietnam", correct: false },
                    { text: "Brazil", correct: true },
                    { text: "Ethiopia", correct: false },
                ]
            },
            {
                question: "The 'Great Barrier Reef' is located off the coast of which country?",
                answers: [
                    { text: "Indonesia", correct: false },
                    { text: "Australia", correct: true },
                    { text: "Philippines", correct: false },
                    { text: "Fiji", correct: false },
                ]
            },
            {
                question: "Which is the smallest continent by land area?",
                answers: [
                    { text: "Europe", correct: false },
                    { text: "Australia", correct: true },
                    { text: "Antarctica", correct: false },
                    { text: "South America", correct: false },
                ]
            },
            {
                question: "The 'Amazon Rainforest' is primarily located in which country?",
                answers: [
                    { text: "Peru", correct: false },
                    { text: "Colombia", correct: false },
                    { text: "Brazil", correct: true },
                    { text: "Venezuela", correct: false },
                ]
            },
            {
                question: "Which of these lines of latitude is also known as the 'Equator'?",
                answers: [
                    { text: "0°", correct: true },
                    { text: "23.5° N", correct: false },
                    { text: "23.5° S", correct: false },
                    { text: "90° N", correct: false },
                ]
            },
            {
                question: "The 'Andes Mountains' are located on which continent?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "North America", correct: false },
                    { text: "South America", correct: true },
                    { text: "Europe", correct: false },
                ]
            },
            {
                question: "Which is the largest lake in India?",
                answers: [
                    { text: "Dal Lake", correct: false },
                    { text: "Wular Lake", correct: true },
                    { text: "Chilika Lake", correct: false },
                    { text: "Sambhar Lake", correct: false },
                ]
            },
            {
                question: "The 'Chota Nagpur Plateau' is a prominent feature in which part of India?",
                answers: [
                    { text: "North India", correct: false },
                    { text: "South India", correct: false },
                    { text: "East India", correct: true },
                    { text: "West India", correct: false },
                ]
            },
            {
                question: "Which of the following is an artificial lake in India?",
                answers: [
                    { text: "Dal Lake", correct: false },
                    { text: "Wular Lake", correct: false },
                    { text: "Sukhna Lake", correct: true },
                    { text: "Chilika Lake", correct: false },
                ]
            },
            {
                question: "Which Indian state is known as the 'Spice Garden of India'?",
                answers: [
                    { text: "Karnataka", correct: false },
                    { text: "Kerala", correct: true },
                    { text: "Assam", correct: false },
                    { text: "Tamil Nadu", correct: false },
                ]
            },
            {
                question: "The 'Gir Forest' in Gujarat is the only natural habitat for which animal in India?",
                answers: [
                    { text: "Bengal Tiger", correct: false },
                    { text: "Asiatic Lion", correct: true },
                    { text: "Indian Elephant", correct: false },
                    { text: "One-horned Rhino", correct: false },
                ]
            },
            {
                question: "Which city is the capital of Australia?",
                answers: [
                    { text: "Sydney", correct: false },
                    { text: "Melbourne", correct: false },
                    { text: "Canberra", correct: true },
                    { text: "Perth", correct: false },
                ]
            },
            {
                question: "The 'Suez Canal' connects which two bodies of water?",
                answers: [
                    { text: "Mediterranean Sea and Atlantic Ocean", correct: false },
                    { text: "Red Sea and Indian Ocean", correct: false },
                    { text: "Mediterranean Sea and Red Sea", correct: true },
                    { text: "Black Sea and Caspian Sea", correct: false },
                ]
            },
            {
                question: "Which country is the largest in the world by land area?",
                answers: [
                    { text: "Canada", correct: false },
                    { text: "China", correct: false },
                    { text: "Russia", correct: true },
                    { text: "United States", correct: false },
                ]
            },
            {
                question: "The 'Great Victoria Desert' is located in which country?",
                answers: [
                    { text: "Brazil", correct: false },
                    { text: "Argentina", correct: false },
                    { text: "Australia", correct: true },
                    { text: "South Africa", correct: false },
                ]
            },
            {
                question: "Which of these is a major river flowing through China?",
                answers: [
                    { text: "Nile", correct: false },
                    { text: "Amazon", correct: false },
                    { text: "Yangtze", correct: true },
                    { text: "Volga", correct: false },
                ]
            },
            {
                question: "The 'Deccan Plateau' is a prominent geographical feature in which country?",
                answers: [
                    { text: "Pakistan", correct: false },
                    { text: "India", correct: true },
                    { text: "Nepal", correct: false },
                    { text: "Bangladesh", correct: false },
                ]
            },
            {
                question: "What is the capital of Canada?",
                answers: [
                    { text: "Toronto", correct: false },
                    { text: "Vancouver", correct: false },
                    { text: "Ottawa", correct: true },
                    { text: "Montreal", correct: false },
                ]
            },
            {
                question: "The 'Palk Strait' separates India from which country?",
                answers: [
                    { text: "Pakistan", correct: false },
                    { text: "Bangladesh", correct: false },
                    { text: "Sri Lanka", correct: true },
                    { text: "Maldives", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "The deepest point in the world's oceans, the Mariana Trench, is located in which ocean?",
                answers: [
                    { text: "Atlantic Ocean", correct: false },
                    { text: "Indian Ocean", correct: false },
                    { text: "Pacific Ocean", correct: true },
                    { text: "Arctic Ocean", correct: false }
                ]
            },
            {
                question: "Which city is located at the confluence of the Ganga and Yamuna rivers?",
                answers: [
                    { text: "Varanasi", correct: false },
                    { text: "Allahabad (Prayagraj)", correct: true },
                    { text: "Kanpur", correct: false },
                    { text: "Patna", correct: false }
                ]
            }
        ]
    },
    sports: {
        title: "Sports",
        image: "images/sports.jpg",
        questions: [
            {
                question: "How many players are on a standard basketball team on the court at one time?",
                answers: [
                    { text: "6", correct: false },
                    { text: "5", correct: true },
                    { text: "7", correct: false },
                    { text: "11", correct: false },
                ]
            },
            {
                question: "In which sport would you use a shuttlecock?",
                answers: [
                    { text: "Tennis", correct: false },
                    { text: "Badminton", correct: true },
                    { text: "Squash", correct: false },
                    { text: "Table Tennis", correct: false },
                ]
            },
            {
                question: "What is the national sport of India?",
                answers: [
                    { text: "Cricket", correct: false },
                    { text: "Hockey", correct: true },
                    { text: "Football", correct: false },
                    { text: "Kabaddi", correct: false },
                ]
            },
            {
                question: "How many players are in a cricket team on the field at one time?",
                answers: [
                    { text: "9", correct: false },
                    { text: "10", correct: false },
                    { text: "11", correct: true },
                    { text: "12", correct: false },
                ]
            },
            {
                question: "The term 'hat-trick' is commonly used in which sport?",
                answers: [
                    { text: "Basketball", correct: false },
                    { text: "Football (Soccer)", correct: true },
                    { text: "Golf", correct: false },
                    { text: "Tennis", correct: false },
                ]
            },
            {
                question: "Who is known as the 'God of Cricket'?",
                answers: [
                    { text: "MS Dhoni", correct: false },
                    { text: "Virat Kohli", correct: false },
                    { text: "Sachin Tendulkar", correct: true },
                    { text: "Rohit Sharma", correct: false },
                ]
            },
            {
                question: "The 'Dronacharya Award' is given for excellence in which field?",
                answers: [
                    { text: "Coaching", correct: true },
                    { text: "Playing", correct: false },
                    { text: "Administration", correct: false },
                    { text: "Commentary", correct: false },
                ]
            },
            {
                question: "Which country won the first-ever Cricket World Cup in 1975?",
                answers: [
                    { text: "India", correct: false },
                    { text: "Australia", correct: false },
                    { text: "West Indies", correct: true },
                    { text: "England", correct: false },
                ]
            },
            {
                question: "The term 'smash' is associated with which sport?",
                answers: [
                    { text: "Cricket", correct: false },
                    { text: "Tennis", correct: true },
                    { text: "Football", correct: false },
                    { text: "Swimming", correct: false },
                ]
            },
            {
                question: "Which country hosted the 2016 Summer Olympics?",
                answers: [
                    { text: "UK", correct: false },
                    { text: "China", correct: false },
                    { text: "Brazil", correct: true },
                    { text: "USA", correct: false },
                ]
            },
            {
                question: "In which sport would you find a 'gully' and a 'silly point'?",
                answers: [
                    { text: "Baseball", correct: false },
                    { text: "Cricket", correct: true },
                    { text: "Hockey", correct: false },
                    { text: "Golf", correct: false },
                ]
            },
            {
                question: "What is the standard length of a marathon race in kilometers?",
                answers: [
                    { text: "21.1 km", correct: false },
                    { text: "42.195 km", correct: true },
                    { text: "50 km", correct: false },
                    { text: "40 km", correct: false },
                ]
            },
            {
                question: "Which country won the FIFA World Cup in 2022?",
                answers: [
                    { text: "France", correct: false },
                    { text: "Argentina", correct: true },
                    { text: "Germany", correct: false },
                    { text: "Brazil", correct: false },
                ]
            },
            {
                question: "How many holes are there in a standard game of golf?",
                answers: [
                    { text: "9", correct: false },
                    { text: "12", correct: false },
                    { text: "18", correct: true },
                    { text: "20", correct: false },
                ]
            },
            {
                question: "The 'Ryder Cup' is a famous tournament in which sport?",
                answers: [
                    { text: "Tennis", correct: false },
                    { text: "Golf", correct: true },
                    { text: "Basketball", correct: false },
                    { text: "Hockey", correct: false },
                ]
            },
            {
                question: "What is the full form of 'IPL' in cricket?",
                answers: [
                    { text: "International Premier League", correct: false },
                    { text: "Indian Premier League", correct: true },
                    { text: "India's Premier League", correct: false },
                    { text: "Indian Professional League", correct: false },
                ]
            },
            {
                question: "The term 'backstroke' is associated with which sport?",
                answers: [
                    { text: "Gymnastics", correct: false },
                    { text: "Swimming", correct: true },
                    { text: "Athletics", correct: false },
                    { text: "Rowing", correct: false },
                ]
            },
            {
                question: "Who is the first Indian woman to win an Olympic medal?",
                answers: [
                    { text: "Saina Nehwal", correct: false },
                    { text: "Mary Kom", correct: false },
                    { text: "Karnam Malleswari", correct: true },
                    { text: "P.V. Sindhu", correct: false },
                ]
            },
            {
                question: "In which sport do you score a 'try'?",
                answers: [
                    { text: "Rugby", correct: true },
                    { text: "American Football", correct: false },
                    { text: "Cricket", correct: false },
                    { text: "Baseball", correct: false },
                ]
            },
            {
                question: "Which country is the birthplace of the sport 'Judo'?",
                answers: [
                    { text: "China", correct: false },
                    { text: "South Korea", correct: false },
                    { text: "Japan", correct: true },
                    { text: "India", correct: false },
                ]
            },
            {
                question: "The 'Wankhede Stadium' is located in which Indian city?",
                answers: [
                    { text: "Kolkata", correct: false },
                    { text: "Delhi", correct: false },
                    { text: "Mumbai", correct: true },
                    { text: "Chennai", correct: false },
                ]
            },
            {
                question: "What is the maximum number of times a single team can hit the ball in volleyball before it must cross the net?",
                answers: [
                    { text: "2", correct: false },
                    { text: "3", correct: true },
                    { text: "4", correct: false },
                ]
            },
            {
                question: "In which sport would you perform a 'dunk'?",
                answers: [
                    { text: "Volleyball", correct: false },
                    { text: "Basketball", correct: true },
                    { text: "Football", correct: false },
                    { text: "Handball", correct: false },
                ]
            },
            {
                question: "Which famous athlete is known as 'The Flying Sikh'?",
                answers: [
                    { text: "Milkha Singh", correct: true },
                    { text: "Dhyan Chand", correct: false },
                    { text: "P.T. Usha", correct: false },
                    { text: "Paavo Nurmi", correct: false },
                ]
            },
            {
                question: "The term 'checkmate' is used in which game?",
                answers: [
                    { text: "Carrom", correct: false },
                    { text: "Chess", correct: true },
                    { text: "Ludo", correct: false },
                    { text: "Snooker", correct: false },
                ]
            },
            {
                question: "Which of these is a term used in wrestling?",
                answers: [
                    { text: "Lob", correct: false },
                    { text: "Pin", correct: true },
                    { text: "Free throw", correct: false },
                    { text: "Stump", correct: false },
                ]
            },
            {
                question: "The 'Oval' cricket ground is located in which city?",
                answers: [
                    { text: "Sydney", correct: false },
                    { text: "London", correct: true },
                    { text: "Melbourne", correct: false },
                    { text: "Mumbai", correct: false },
                ]
            },
            {
                question: "Who is the first Indian to win a gold medal at the Olympics for an individual event?",
                answers: [
                    { text: "Major Dhyan Chand", correct: false },
                    { text: "Abhinav Bindra", correct: true },
                    { text: "Neeraj Chopra", correct: false },
                    { text: "Sushil Kumar", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "Which Indian city is home to the 'Eden Gardens' cricket stadium?",
                answers: [
                    { text: "Mumbai", correct: false },
                    { text: "Chennai", correct: false },
                    { text: "Kolkata", correct: true },
                    { text: "Delhi", correct: false }
                ]
            },
            {
                question: "The Olympic rings represent how many continents?",
                answers: [
                    { text: "4", correct: false },
                    { text: "5", correct: true },
                    { text: "6", correct: false },
                    { text: "7", correct: false }
                ]
            }
        ]
    },
    General: {
        title: "General Question",
        image: "images/general.jpg",
        questions: [
            {
                question: "Which is the largest animal in the world?",
                answers: [
                    { text: "Shark", correct: false },
                    { text: "Blue Whale", correct: true },
                    { text: "Elephant", correct: false },
                    { text: "Giraffe", correct: false },
                ]
            },
            {
                question: "Which is the smallest continent in the world?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "Australia", correct: true },
                    { text: "Africa", correct: false },
                    { text: "Europe", correct: false },
                ]
            },
            {
                question: "Which is the fastest animal in the world?",
                answers: [
                    { text: "Tiger", correct: false },
                    { text: "Cheetah", correct: true },
                    { text: "Lion", correct: false },
                    { text: "Leopard", correct: false },
                ]
            },
            {
                question: "Which is the largest continent in the world?",
                answers: [
                    { text: "Asia", correct: true },
                    { text: "Africa", correct: false },
                    { text: "North America", correct: false },
                    { text: "Australia", correct: false },
                ]
            },
            {
                question: "Which is the longest river in the world?",
                answers: [
                    { text: "Nile", correct: true },
                    { text: "Amazon", correct: false },
                    { text: "Ganga", correct: false },
                    { text: "Yangtze", correct: false },
                ]
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mars", correct: true },
                    { text: "Jupiter", correct: false },
                    { text: "Mercury", correct: false },
                ]
            },
            {
                question: "Which is the largest ocean in the world?",
                answers: [
                    { text: "Indian Ocean", correct: false },
                    { text: "Atlantic Ocean", correct: false },
                    { text: "Pacific Ocean", correct: true },
                    { text: "Arctic Ocean", correct: false },
                ]
            },
            {
                question: "Which country is called the Land of Rising Sun?",
                answers: [
                    { text: "India", correct: false },
                    { text: "Japan", correct: true },
                    { text: "China", correct: false },
                    { text: "Thailand", correct: false },
                ]
            },
            {
                question: "Which gas do plants release during photosynthesis?",
                answers: [
                    { text: "Oxygen", correct: true },
                    { text: "Carbon Dioxide", correct: false },
                    { text: "Nitrogen", correct: false },
                    { text: "Hydrogen", correct: false },
                ]
            },
            {
                question: "Which is the tallest mountain in the world?",
                answers: [
                    { text: "Mount Everest", correct: true },
                    { text: "K2", correct: false },
                    { text: "Kangchenjunga", correct: false },
                    { text: "Mount Fuji", correct: false },
                ]
            },
            {
                question: "Which is the national bird of India?",
                answers: [
                    { text: "Sparrow", correct: false },
                    { text: "Peacock", correct: true },
                    { text: "Parrot", correct: false },
                    { text: "Crow", correct: false },
                ]
            },
            {
                question: "Which is the coldest planet in our solar system?",
                answers: [
                    { text: "Neptune", correct: true },
                    { text: "Uranus", correct: false },
                    { text: "Pluto", correct: false },
                    { text: "Saturn", correct: false },
                ]
            },
            {
                question: "Which is the national animal of India?",
                answers: [
                    { text: "Elephant", correct: false },
                    { text: "Tiger", correct: true },
                    { text: "Lion", correct: false },
                    { text: "Leopard", correct: false },
                ]
            },
            {
                question: "Which is the currency of Japan?",
                answers: [
                    { text: "Yuan", correct: false },
                    { text: "Yen", correct: true },
                    { text: "Won", correct: false },
                    { text: "Dollar", correct: false },
                ]
            },
            {
                question: "Which gas is essential for breathing?",
                answers: [
                    { text: "Oxygen", correct: true },
                    { text: "Carbon Dioxide", correct: false },
                    { text: "Nitrogen", correct: false },
                    { text: "Helium", correct: false },
                ]
            },
            {
                question: "Who invented the light bulb?",
                answers: [
                    { text: "Alexander Graham Bell", correct: false },
                    { text: "Thomas Edison", correct: true },
                    { text: "Nikola Tesla", correct: false },
                    { text: "Isaac Newton", correct: false },
                ]
            },
            {
                question: "Which planet is closest to the Sun?",
                answers: [
                    { text: "Venus", correct: false },
                    { text: "Mercury", correct: true },
                    { text: "Earth", correct: false },
                    { text: "Mars", correct: false },
                ]
            },
            {
                question: "Which is the capital of India?",
                answers: [
                    { text: "Mumbai", correct: false },
                    { text: "Delhi", correct: true },
                    { text: "Kolkata", correct: false },
                    { text: "Chennai", correct: false },
                ]
            },
            {
                question: "Which is the national game of India?",
                answers: [
                    { text: "Cricket", correct: false },
                    { text: "Hockey", correct: true },
                    { text: "Football", correct: false },
                    { text: "Kabaddi", correct: false },
                ]
            },
            {
                question: "Which is the smallest planet in our solar system?",
                answers: [
                    { text: "Mercury", correct: true },
                    { text: "Mars", correct: false },
                    { text: "Venus", correct: false },
                    { text: "Pluto", correct: false },
                ]
            },
            {
                question: "Which organ purifies blood in the human body?",
                answers: [
                    { text: "Heart", correct: false },
                    { text: "Kidney", correct: true },
                    { text: "Lungs", correct: false },
                    { text: "Liver", correct: false },
                ]
            },
            {
                question: "Which is the hottest planet in our solar system?",
                answers: [
                    { text: "Mercury", correct: false },
                    { text: "Venus", correct: true },
                    { text: "Mars", correct: false },
                    { text: "Jupiter", correct: false },
                ]
            },
            // Added 8 questions to reach 30
            {
                question: "How many continents are there in the world?",
                answers: [
                    { text: "5", correct: false },
                    { text: "6", correct: false },
                    { text: "7", correct: true },
                    { text: "8", correct: false }
                ]
            },
            {
                question: "Which famous wall can be seen from space?",
                answers: [
                    { text: "The Berlin Wall", correct: false },
                    { text: "The Great Wall of China", correct: true },
                    { text: "Hadrian's Wall", correct: false },
                    { text: "The Wailing Wall", correct: false }
                ]
            },
            {
                question: "What is the smallest country in the world by area?",
                answers: [
                    { text: "Monaco", correct: false },
                    { text: "Vatican City", correct: true },
                    { text: "Nauru", correct: false },
                    { text: "San Marino", correct: false }
                ]
            },
            {
                question: "What is the chemical symbol for table salt?",
                answers: [
                    { text: "KCl", correct: false },
                    { text: "H2O", correct: false },
                    { text: "NaCl", correct: true },
                    { text: "CO2", correct: false }
                ]
            },
            {
                question: "What is the primary source of light and heat for the Earth?",
                answers: [
                    { text: "Moon", correct: false },
                    { text: "Stars", correct: false },
                    { text: "Sun", correct: true },
                    { text: "Other Planets", correct: false }
                ]
            },
            {
                question: "Which sense organ is used for tasting?",
                answers: [
                    { text: "Eye", correct: false },
                    { text: "Ear", correct: false },
                    { text: "Tongue", correct: true },
                    { text: "Nose", correct: false }
                ]
            },
            {
                question: "The currency 'Euro' is used by most countries in which continent?",
                answers: [
                    { text: "Asia", correct: false },
                    { text: "North America", correct: false },
                    { text: "Europe", correct: true },
                    { text: "Africa", correct: false }
                ]
            },
            {
                question: "Which of these is a flightless bird?",
                answers: [
                    { text: "Eagle", correct: false },
                    { text: "Pigeon", correct: false },
                    { text: "Ostrich", correct: true },
                    { text: "Parrot", correct: false }
                ]
            }
        ]
    },
    english: {
        title: "English",
        image: "images/english.jpg",
        questions: [
            {
                question: "Which of the following is a synonym for 'happy'?",
                answers: [
                    { text: "Gloomy", correct: false },
                    { text: "Joyful", correct: true },
                    { text: "Angry", correct: false },
                    { text: "Tired", correct: false },
                ]
            },
            {
                question: "Choose the correct spelling:",
                answers: [
                    { text: "Definately", correct: false },
                    { text: "Definitely", correct: true },
                    { text: "Definitly", correct: false },
                    { text: "Definatly", correct: false },
                ]
            },
            {
                question: "What is the past tense of 'run'?",
                answers: [
                    { text: "Running", correct: false },
                    { text: "Ran", correct: true },
                    { text: "Runned", correct: false },
                    { text: "Rans", correct: false },
                ]
            },
            {
                question: "What is the plural form of 'child'?",
                answers: [
                    { text: "Childs", correct: false },
                    { text: "Children", correct: true },
                    { text: "Childs'", correct: false },
                    { text: "Child'es", correct: false },
                ]
            },
            {
                question: "Identify the noun in the sentence: 'The quick brown fox jumps over the lazy dog.'",
                answers: [
                    { text: "Quick", correct: false },
                    { text: "Jumps", correct: false },
                    { text: "Fox", correct: true },
                    { text: "Over", correct: false },
                ]
            },
            {
                question: "Which word means the opposite of 'courage'?",
                answers: [
                    { text: "Bravery", correct: false },
                    { text: "Fear", correct: true },
                    { text: "Strength", correct: false },
                    { text: "Confidence", correct: false },
                ]
            },
            {
                question: "Fill in the blank: 'I ______ to the store yesterday.'",
                answers: [
                    { text: "go", correct: false },
                    { text: "went", correct: true },
                    { text: "gone", correct: false },
                    { text: "going", correct: false },
                ]
            },
            {
                question: "What is the synonym for 'large'?",
                answers: [
                    { text: "Tiny", correct: false },
                    { text: "Small", correct: false },
                    { text: "Big", correct: true },
                    { text: "Narrow", correct: false },
                ]
            },
            {
                question: "Complete the sentence: 'She is a very ______ person.'",
                answers: [
                    { text: "interest", correct: false },
                    { text: "interested", correct: false },
                    { text: "interesting", correct: true },
                    { text: "interestingly", correct: false },
                ]
            },
            {
                question: "Identify the adjective in the sentence: 'The red car is fast.'",
                answers: [
                    { text: "The", correct: false },
                    { text: "Car", correct: false },
                    { text: "Fast", correct: true },
                    { text: "Is", correct: false },
                ]
            },
            {
                question: "What is the past participle of 'eat'?",
                answers: [
                    { text: "Ate", correct: false },
                    { text: "Eaten", correct: true },
                    { text: "Eating", correct: false },
                    { text: "Eats", correct: false },
                ]
            },
            {
                question: "Which of these is a collective noun for a group of lions?",
                answers: [
                    { text: "Herd", correct: false },
                    { text: "Pride", correct: true },
                    { text: "Flock", correct: false },
                    { text: "Pack", correct: false },
                ]
            },
            {
                question: "Fill in the blank: 'He swims ______ than me.'",
                answers: [
                    { text: "good", correct: false },
                    { text: "well", correct: true },
                    { text: "better", correct: false },
                    { text: "best", correct: false },
                ]
            },
            {
                question: "What is the antonym of 'ancient'?",
                answers: [
                    { text: "Old", correct: false },
                    { text: "Modern", correct: true },
                    { text: "Historic", correct: false },
                    { text: "Antique", correct: false },
                ]
            },
            {
                question: "Choose the correct form of the verb: 'She ______ her homework every day.'",
                answers: [
                    { text: "do", correct: false },
                    { text: "does", correct: true },
                    { text: "doing", correct: false },
                    { text: "did", correct: false },
                ]
            },
            {
                question: "What is the plural of 'story'?",
                answers: [
                    { text: "Storys", correct: false },
                    { text: "Stories", correct: true },
                    { text: "Storyes", correct: false },
                    { text: "Storyes'", correct: false },
                ]
            },
            {
                question: "Identify the verb in the sentence: 'The birds sing in the morning.'",
                answers: [
                    { text: "The", correct: false },
                    { text: "Birds", correct: false },
                    { text: "Sing", correct: true },
                    { text: "Morning", correct: false },
                ]
            },
            {
                question: "Fill in the blank: 'The sun shines ______.'",
                answers: [
                    { text: "bright", correct: false },
                    { text: "brightly", correct: true },
                    { text: "brighter", correct: false },
                    { text: "brightness", correct: false },
                ]
            },
            {
                question: "What is the superlative form of 'good'?",
                answers: [
                    { text: "Gooder", correct: false },
                    { text: "Best", correct: true },
                    { text: "More good", correct: false },
                    { text: "Most good", correct: false },
                ]
            },
            {
                question: "What is the opposite of 'brave'?",
                answers: [
                    { text: "Bold", correct: false },
                    { text: "Courageous", correct: false },
                    { text: "Cowardly", correct: true },
                    { text: "Fearless", correct: false },
                ]
            },
            {
                question: "Which of the following is a pronoun?",
                answers: [
                    { text: "Table", correct: false },
                    { text: "He", correct: true },
                    { text: "Quickly", correct: false },
                    { text: "Sing", correct: false },
                ]
            },
            {
                question: "Choose the correct form: 'The book is ______ the table.'",
                answers: [
                    { text: "in", correct: false },
                    { text: "on", correct: true },
                    { text: "at", correct: false },
                    { text: "with", correct: false },
                ]
            },
            {
                question: "What is a 'homophone'?",
                answers: [
                    { text: "Words that sound different but have the same meaning.", correct: false },
                    { text: "Words that sound the same but have different meanings.", correct: true },
                    { text: "Words with the same spelling but different meanings.", correct: false },
                    { text: "Words that are difficult to pronounce.", correct: false },
                ]
            },
            {
                question: "What is the past tense of 'go'?",
                answers: [
                    { text: "Goes", correct: false },
                    { text: "Gone", correct: false },
                    { text: "Went", correct: true },
                    { text: "Going", correct: false },
                ]
            },
            {
                question: "Which word is a preposition?",
                answers: [
                    { text: "Quickly", correct: false },
                    { text: "Jump", correct: false },
                    { text: "Between", correct: true },
                    { text: "Happily", correct: false },
                ]
            },
            {
                question: "Complete the phrase: 'As cool as a ______.'",
                answers: [
                    { text: "fire", correct: false },
                    { text: "cucumber", correct: true },
                    { text: "rock", correct: false },
                    { text: "ice", correct: false },
                ]
            },
            {
                question: "What is the synonym for 'begin'?",
                answers: [
                    { text: "End", correct: false },
                    { text: "Start", correct: true },
                    { text: "Finish", correct: false },
                    { text: "Stop", correct: false },
                ]
            },
            {
                question: "Fill in the blank: 'The cat is sitting ______ the mat.'",
                answers: [
                    { text: "on", correct: true },
                    { text: "at", correct: false },
                    { text: "in", correct: false },
                    { text: "with", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "Choose the sentence with correct subject-verb agreement:",
                answers: [
                    { text: "They is going home", correct: false },
                    { text: "She walk to the park", correct: false },
                    { text: "The dog chases the cat", correct: true },
                    { text: "We sings a song", correct: false }
                ]
            },
            {
                question: "What literary device involves the use of an object or idea to represent another?",
                answers: [
                    { text: "Alliteration", correct: false },
                    { text: "Hyperbole", correct: false },
                    { text: "Symbolism", correct: true },
                    { text: "Metaphor", correct: false }
                ]
            }
        ]
    },
    Computer: {
        title: "Computer",
        image: "images/computer.jpg",
        questions: [
            {
                question: "Who is known as the 'Father of the Computer'?",
                answers: [
                    { text: "Alan Turing", correct: false },
                    { text: "Charles Babbage", correct: true },
                    { text: "Bill Gates", correct: false },
                    { text: "Steve Jobs", correct: false },
                ]
            },
            {
                question: "What is the full form of 'CPU'?",
                answers: [
                    { text: "Central Power Unit", correct: false },
                    { text: "Control Processing Unit", correct: false },
                    { text: "Central Processing Unit", correct: true },
                    { text: "Computer Personal Unit", correct: false },
                ]
            },
            {
                question: "The first mechanical calculator was developed by which scientist?",
                answers: [
                    { text: "Blaise Pascal", correct: true },
                    { text: "Konrad Zuse", correct: false },
                    { text: "Herman Hollerith", correct: false },
                    { text: "John von Neumann", correct: false },
                ]
            },
            {
                question: "What does 'RAM' stand for?",
                answers: [
                    { text: "Read Access Memory", correct: false },
                    { text: "Random Access Memory", correct: true },
                    { text: "Read-only Memory", correct: false },
                    { text: "Remote Access Module", correct: false },
                ]
            },
            {
                question: "What is the full form of 'URL'?",
                answers: [
                    { text: "Uniform Resource Location", correct: false },
                    { text: "Universal Reference Link", correct: false },
                    { text: "Uniform Resource Locator", correct: true },
                    { text: "Universal Resource Locator", correct: false },
                ]
            },
            {
                question: "Who co-founded Microsoft with Paul Allen?",
                answers: [
                    { text: "Steve Jobs", correct: false },
                    { text: "Larry Page", correct: false },
                    { text: "Bill Gates", correct: true },
                    { text: "Mark Zuckerberg", correct: false },
                ]
            },
            {
                question: "What does 'HTTP' stand for?",
                answers: [
                    { text: "Hyper Text Transfer Protocol", correct: true },
                    { text: "High Technology Transfer Program", correct: false },
                    { text: "Hyperlink and Text Protocol", correct: false },
                    { text: "Home Text Transfer Protocol", correct: false },
                ]
            },
            {
                question: "What is the function of a 'router' in a computer network?",
                answers: [
                    { text: "To store data", correct: false },
                    { text: "To display web pages", correct: false },
                    { text: "To connect different networks", correct: true },
                    { text: "To print documents", correct: false },
                ]
            },
            {
                question: "Which of these is a type of secondary storage device?",
                answers: [
                    { text: "CPU", correct: false },
                    { text: "RAM", correct: false },
                    { text: "Hard Disk Drive", correct: true },
                    { text: "Motherboard", correct: false },
                ]
            },
            {
                question: "What is the full form of 'PDF'?",
                answers: [
                    { text: "Public Document Format", correct: false },
                    { text: "Portable Document Format", correct: true },
                    { text: "Printable Data File", correct: false },
                    { text: "Program Document File", correct: false },
                ]
            },
            {
                question: "Which company created the 'Android' mobile operating system?",
                answers: [
                    { text: "Apple", correct: false },
                    { text: "Google", correct: true },
                    { text: "Microsoft", correct: false },
                    { text: "Samsung", correct: false },
                ]
            },
            {
                question: "What does 'WWW' stand for?",
                answers: [
                    { text: "Wide World Web", correct: false },
                    { text: "World Wide Web", correct: true },
                    { text: "Web World Wide", correct: false },
                    { text: "World Web Wide", correct: false },
                ]
            },
            {
                question: "The first computer virus was created in which year?",
                answers: [
                    { text: "1971", correct: true },
                    { text: "1984", correct: false },
                    { text: "1990", correct: false },
                    { text: "1995", correct: false },
                ]
            },
            {
                question: "What does 'ISP' stand for?",
                answers: [
                    { text: "Internal Service Provider", correct: false },
                    { text: "Internet Service Provider", correct: true },
                    { text: "International Server Program", correct: false },
                    { text: "Internet Security Protocol", correct: false },
                ]
            },
            {
                question: "Which of these is an input device?",
                answers: [
                    { text: "Monitor", correct: false },
                    { text: "Printer", correct: false },
                    { text: "Speaker", correct: false },
                    { text: "Keyboard", correct: true },
                ]
            },
            {
                question: "What is the full form of 'HTML'?",
                answers: [
                    { text: "Hyper Text Markup Language", correct: true },
                    { text: "High Tech Markup Language", correct: false },
                    { text: "Hyperlink and Text Markup Language", correct: false },
                    { text: "Home Tool Markup Language", correct: false },
                ]
            },
            {
                question: "The 'ENIAC' was the first general-purpose electronic computer. What does it stand for?",
                answers: [
                    { text: "Electronic Numerical Integrator and Computer", correct: true },
                    { text: "Electronic Network Integration and Calculation", correct: false },
                    { text: "Electrical Numerical Instruction and Automation", correct: false },
                    { text: "Electronic Numbering Interface and Calculation", correct: false },
                ]
            },
            {
                question: "What does 'VPN' stand for?",
                answers: [
                    { text: "Virtual Private Network", correct: true },
                    { text: "Verified Public Network", correct: false },
                    { text: "Varying Protocol Network", correct: false },
                    { text: "Virtual Personal Number", correct: false },
                ]
            },
            {
                question: "Which company is known for creating the 'Macintosh' computer?",
                answers: [
                    { text: "Microsoft", correct: false },
                    { text: "Dell", correct: false },
                    { text: "Apple", correct: true },
                    { text: "IBM", correct: false },
                ]
            },
            {
                question: "What does 'ROM' stand for?",
                answers: [
                    { text: "Random Only Memory", correct: false },
                    { text: "Read-only Memory", correct: true },
                    { text: "Running On Mainframe", correct: false },
                    { text: "Real-time Operating Module", correct: false },
                ]
            },
            {
                question: "A 'firewall' is used for which purpose?",
                answers: [
                    { text: "To speed up the internet", correct: false },
                    { text: "To protect a computer from unauthorized access", correct: true },
                    { text: "To clean the hard drive", correct: false },
                    { text: "To install software", correct: false },
                ]
            },
            {
                question: "What does 'LAN' stand for?",
                answers: [
                    { text: "Local Area Network", correct: true },
                    { text: "Large Access Network", correct: false },
                    { text: "Long-range Area Node", correct: false },
                    { text: "Limited Access Network", correct: false },
                ]
            },
            {
                question: "Who is credited with inventing the first 'mouse' for computers?",
                answers: [
                    { text: "Steve Wozniak", correct: false },
                    { text: "Bill Gates", correct: false },
                    { text: "Douglas Engelbart", correct: true },
                    { text: "Paul Allen", correct: false },
                ]
            },
            {
                question: "What does 'GUI' stand for?",
                answers: [
                    { text: "Global User Interface", correct: false },
                    { text: "General Utility Interface", correct: false },
                    { text: "Graphic User Interface", correct: true },
                    { text: "Graphical User Interaction", correct: false },
                ]
            },
            {
                question: "Which of these is a programming language?",
                answers: [
                    { text: "HTTP", correct: false },
                    { text: "HTML", correct: false },
                    { text: "Python", correct: true },
                    { text: "JPEG", correct: false },
                ]
            },
            {
                question: "What does 'USB' stand for?",
                answers: [
                    { text: "Universal Serial Bus", correct: true },
                    { text: "Unified System Bus", correct: false },
                    { text: "Universal Serial Board", correct: false },
                    { text: "Upgraded System Bus", correct: false },
                ]
            },
            {
                question: "What is an 'operating system'?",
                answers: [
                    { text: "A computer program for games", correct: false },
                    { text: "Software that manages all the hardware and software resources of a computer", correct: true },
                    { text: "A physical part of the computer", correct: false },
                    { text: "A type of web browser", correct: false },
                ]
            },
            {
                question: "What does 'SQL' stand for?",
                answers: [
                    { text: "Sequential Query Language", correct: false },
                    { text: "Structured Query Language", correct: true },
                    { text: "Simple Question Language", correct: false },
                    { text: "System Query Locator", correct: false },
                ]
            },
            {
                question: "The first computer hard disk drive was introduced by which company?",
                answers: [
                    { text: "IBM", correct: true },
                    { text: "Apple", correct: false },
                    { text: "Seagate", correct: false },
                    { text: "Western Digital", correct: false },
                ]
            },
            {
                question: "What is the full form of 'CD-ROM'?",
                answers: [
                    { text: "Compact Disc-Read Only Memory", correct: true },
                    { text: "Computer Drive-Read Once Memory", correct: false },
                    { text: "Central Data-Read Only Module", correct: false },
                    { text: "Compact Disc-Running Only Memory", correct: false },
                ]
            },
            // Added 2 questions to reach 30
            {
                question: "What is the maximum number of bits in an IPv4 address?",
                answers: [
                    { text: "16", correct: false },
                    { text: "32", correct: true },
                    { text: "64", correct: false },
                    { text: "128", correct: false }
                ]
            },
            {
                question: "Which application is primarily used for creating and managing a series of slides for a presentation?",
                answers: [
                    { text: "Microsoft Word", correct: false },
                    { text: "Microsoft Excel", correct: false },
                    { text: "Microsoft PowerPoint", correct: true },
                    { text: "Microsoft Access", correct: false }
                ]
            }
        ]
    }
};

// Screen elements
const screens = {
    userDetails: document.getElementById("user-details-screen"),
    quiz: document.getElementById("quiz-screen"),
    score: document.getElementById("score-screen"),
    review: document.getElementById("review-screen")
};

// Buttons and inputs
const startQuizBtn = document.getElementById("start-quiz-btn");
const nextQuestionBtn = document.getElementById("next-btn");
const prevQuestionBtn = document.getElementById("prev-btn");
const submitQuizBtn = document.getElementById("submit-btn");
const reattemptBtn = document.getElementById("reattempt-btn");
const reviewBtn = document.getElementById("review-btn");
const backToScoreBtn = document.getElementById("back-to-score-btn");

// Display elements
const usernameInput = document.getElementById("username");
const useremailInput = document.getElementById("useremail");
const quizCategorySelect = document.getElementById("quiz-category");
const userInfoDisplay = document.getElementById("user-info");
const categoryInfoDisplay = document.getElementById("category-info");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const finalScoreDisplay = document.getElementById("final-score");
const correctAnswersDisplay = document.getElementById("correct-answers");
const incorrectAnswersDisplay = document.getElementById("incorrect-answers");
const totalQuestionsDisplay = document.getElementById("total-questions");
const timerDisplay = document.getElementById("timer");
const currentScoreDisplay = document.getElementById("current-score");
const questionCounterDisplay = document.getElementById("question-counter");
const progressFill = document.getElementById("progress-fill");
const performanceFill = document.getElementById("performance-fill");
const performanceText = document.getElementById("performance-text");
const reviewQuestionsContainer = document.getElementById("review-questions");





// Populate Category Select 
function populateCategorySelect() {
    if (!quizCategorySelect) return;
    
    quizCategorySelect.innerHTML = '<option value="">Select Category</option>';
    
    const categories = {
        gk: "GK & GS",
        coding: "Coding",
        ai:"AI",
        maths: "Mathematics", 
        science: "Science",
        history: "History",
        geography: "Geography",
        sports: "Sports",
        General: "General Question",
        english: "English",
        Computer: "Computer"
    };
    
    Object.entries(categories).forEach(([key, title]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = title;
        quizCategorySelect.appendChild(option);
    });

   
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory && categories[savedCategory]) {
        quizCategorySelect.value = savedCategory;
        currentState.selectedCategory = savedCategory;
    }

    quizCategorySelect.addEventListener('change', function(e) {
        currentState.selectedCategory = e.target.value;
        localStorage.setItem('selectedCategory', e.target.value);
    });
}


function setupQuizEventListeners() {
    console.log('Setting up quiz event listeners...');
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', startQuiz);
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', nextQuestion);
    }

    if (prevQuestionBtn) {
        prevQuestionBtn.addEventListener('click', prevQuestion);
    }

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', endQuiz);
    }

    if (reattemptBtn) {
        reattemptBtn.addEventListener('click', startQuiz);
    }

    if (reviewBtn) {
        reviewBtn.addEventListener('click', showReview);
    }

    if (backToScoreBtn) {
        backToScoreBtn.addEventListener('click', function() {
            showScreen('score-screen');
        });
    }
}


function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    
   
    Object.values(screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });

 
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Start Quiz
function startQuiz() {
    console.log('startQuiz function called!');
    
    if (!usernameInput || !useremailInput || !quizCategorySelect) {
        console.error('Form elements not found!');
        alert('Form loading error. Please refresh the page.');
        return;
    }

    const username = usernameInput.value.trim();
    const useremail = useremailInput.value.trim();
    const category = quizCategorySelect.value;

    console.log('Form data:', { username, useremail, category });

    
    if (!username) {
        alert('Please enter your name');
        return;
    }

    if (!useremail) {
        alert('Please enter your email');
        return;
    }

    if (!category) {
        alert('Please select a category');
        return;
    }

    if (!isValidEmail(useremail)) {
        alert('Please enter a valid email address');
        return;
    }

    
    currentState.currentUser = {
        name: username,
        email: useremail,
        category: category
    };

   
    currentState.questions = quizData[category]?.questions || [];
    
    if (currentState.questions.length === 0) {
        alert('No questions available for this category!');
        return;
    }

   
    currentState.currentQuestionIndex = 0;
    currentState.score = 0;
    currentState.userAnswers = {};
    currentState.timeLeft = 1800;
    currentState.attemptCount++;
    clearInterval(currentState.timer);

    console.log('Starting quiz with:', currentState);

    // Show quiz screen and start
    showScreen('quiz-screen');
    updateQuizHeader();
    startTimer();
    showQuestion();
}


function updateQuizHeader() {
    if (userInfoDisplay && currentState.currentUser) {
        userInfoDisplay.textContent = `Player: ${currentState.currentUser.name}`;
    }
    
    if (categoryInfoDisplay && currentState.currentUser) {
        categoryInfoDisplay.textContent = `Category: ${quizData[currentState.currentUser.category]?.title || 'Unknown'}`;
    }
    
    if (currentScoreDisplay) {
        const correctCount = Object.values(currentState.userAnswers).reduce((count, answer) => {
            const currentQuestion = currentState.questions[answer.questionIndex];
            const isCorrect = currentQuestion && currentQuestion.answers[answer.userAnswerIndex]?.correct === true;
            return count + (isCorrect ? 1 : 0);
        }, 0);
        currentState.score = correctCount;
        currentScoreDisplay.textContent = currentState.score;
    }
    
    if (questionCounterDisplay) {
        const totalQuestions = currentState.questions.length;
        questionCounterDisplay.textContent = `${currentState.currentQuestionIndex + 1}/${totalQuestions}`;
    }
}

// Timer Functions
function startTimer() {
    clearInterval(currentState.timer);
    updateTimerDisplay();
    
    currentState.timer = setInterval(function() {
        currentState.timeLeft--;
        updateTimerDisplay();
        
        if (currentState.timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (timerDisplay) {
        timerDisplay.textContent = `${currentState.timeLeft}s`;
        timerDisplay.style.color = currentState.timeLeft <= 10 ? '#ff4444' : '';
    }
}

// Show Question
function showQuestion() {
    const currentQuestionIndex = currentState.currentQuestionIndex;
    const currentQuestion = currentState.questions[currentQuestionIndex];
    const userAnswer = currentState.userAnswers[currentQuestionIndex];

    if (!currentQuestion) return;

   
    if (answerButtons) {
        Array.from(answerButtons.children).forEach(button => {
            button.removeEventListener('click', selectAnswer);
        });
        answerButtons.innerHTML = '';
    }
    
    if (questionElement) {
        questionElement.textContent = currentQuestion.question;
    }
    
    updateQuizHeader();

    // Create answer buttons
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.dataset.index = index;
        button.addEventListener('click', selectAnswer);
        
        if (userAnswer) {
            button.disabled = true;
            const isCorrectAnswer = answer.correct;
            const isUserAnswer = index === userAnswer.userAnswerIndex;

            if (isCorrectAnswer) {
                button.classList.add('correct');
            } else if (isUserAnswer) {
                button.classList.add('incorrect');
            }
        }
        
        if (answerButtons) {
            answerButtons.appendChild(button);
        }
    });

    updateProgressBar();
    updateNavigationButtons();
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const currentQuestionIndex = currentState.currentQuestionIndex;
    
  
    if (currentState.userAnswers.hasOwnProperty(currentQuestionIndex)) {
        return;
    }

 
    if (answerButtons) {
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
        });
    }

    const isCorrect = selectedBtn.dataset.correct === 'true';
    const userAnswerIndex = parseInt(selectedBtn.dataset.index);

  
    currentState.userAnswers[currentQuestionIndex] = {
        questionIndex: currentQuestionIndex,
        userAnswerIndex: userAnswerIndex,
        isCorrect: isCorrect
    };

   
    if (answerButtons) {
        Array.from(answerButtons.children).forEach(button => {
            const buttonIsCorrect = button.dataset.correct === 'true';
            const buttonIsUserSelection = parseInt(button.dataset.index) === userAnswerIndex;
            
            if (buttonIsCorrect) {
                button.classList.add('correct');
            } else if (buttonIsUserSelection && !buttonIsCorrect) {
                button.classList.add('incorrect');
            }
        });
    }
    
   
    updateQuizHeader();
    
   
    updateNavigationButtons();
}

function updateProgressBar() {
    if (progressFill) {
        const answeredCount = Object.keys(currentState.userAnswers).length;
        const totalQuestions = currentState.questions.length;
        const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
        
        progressFill.style.width = `${progress}%`;
    }
}


function updateNavigationButtons() {
    const currentQuestionIndex = currentState.currentQuestionIndex;
    const totalQuestions = currentState.questions.length;
    const userAnswered = currentState.userAnswers.hasOwnProperty(currentQuestionIndex);

    if (prevQuestionBtn) {
        prevQuestionBtn.style.display = currentQuestionIndex > 0 ? 'flex' : 'none';
    }
    
  
    if (userAnswered) {
      
        if (currentQuestionIndex === totalQuestions - 1) {
            if (submitQuizBtn) submitQuizBtn.style.display = 'flex';
            if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
        } 
      
        else {
            if (nextQuestionBtn) nextQuestionBtn.style.display = 'flex';
            if (submitQuizBtn) submitQuizBtn.style.display = 'none';
        }
    } 
  
    else {
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
        if (submitQuizBtn) submitQuizBtn.style.display = 'none';
    }
}

function nextQuestion() {
    const totalQuestions = currentState.questions.length;
    
    if (currentState.userAnswers.hasOwnProperty(currentState.currentQuestionIndex)) {
        if (currentState.currentQuestionIndex < totalQuestions - 1) {
            currentState.currentQuestionIndex++;
            showQuestion();
        } else if (currentState.currentQuestionIndex === totalQuestions - 1) {
            endQuiz();
        }
    } else {
        alert("Please select an answer before moving to the next question.");
    }
}

function prevQuestion() {
    if (currentState.currentQuestionIndex > 0) {
        currentState.currentQuestionIndex--;
        showQuestion();
    }
}

// End Quiz
function endQuiz() {
    console.log('Quiz ended.');
    clearInterval(currentState.timer);
    
  
    let finalCorrectAnswers = 0;
    for (const answerData of Object.values(currentState.userAnswers)) {
        const question = currentState.questions[answerData.questionIndex];
        if (question && question.answers[answerData.userAnswerIndex]?.correct === true) {
            finalCorrectAnswers++;
        }
    }
    currentState.score = finalCorrectAnswers;

    showScreen('score-screen');
    showResults();
}

function showResults() {
    const totalQuestions = currentState.questions.length;
    const correctAnswers = currentState.score;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    if (totalQuestionsDisplay) {
        totalQuestionsDisplay.textContent = totalQuestions;
    }
    
    if (correctAnswersDisplay) {
        correctAnswersDisplay.textContent = correctAnswers;
    }
    
    if (incorrectAnswersDisplay) {
        incorrectAnswersDisplay.textContent = incorrectAnswers;
    }
    
    if (finalScoreDisplay) {
        finalScoreDisplay.textContent = `${percentage}%`;
    }

    // Update performance
    if (performanceFill) {
        performanceFill.style.width = `${percentage}%`;
        
        if (percentage >= 80) {
            performanceText.textContent = "Outstanding! You're a quiz master! 🎯";
            performanceFill.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";
        } else if (percentage >= 60) {
            performanceText.textContent = "Great job! Keep learning! 📚";
            performanceFill.style.background = "linear-gradient(135deg, #FF9800, #F57C00)";
        } else {
            performanceText.textContent = "Good effort! Practice makes perfect! 💪";
            performanceFill.style.background = "linear-gradient(135deg, #f44336, #d32f2f)";
        }
    }
}

// Show Review
function showReview() {
    showScreen('review-screen');
    
    if (!reviewQuestionsContainer) return;
    
    reviewQuestionsContainer.innerHTML = '';

   
    const sortedAnswers = Object.entries(currentState.userAnswers)
        .map(([index, data]) => ({ questionIndex: parseInt(index), ...data }))
        .sort((a, b) => a.questionIndex - b.questionIndex);

    sortedAnswers.forEach((answerData, index) => {
        const questionIndex = answerData.questionIndex;
        const currentQuestion = currentState.questions[questionIndex];
        
        if (!currentQuestion) return;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-item';
        
        const questionText = document.createElement('div');
        questionText.className = 'review-question';
        questionText.textContent = `${index + 1}. ${currentQuestion.question}`;
        
        const answersDiv = document.createElement('div');
        answersDiv.className = 'review-answers';
        
        const correctAnswerIndex = currentQuestion.answers.findIndex(a => a.correct);
        
        currentQuestion.answers.forEach((option, optionIndex) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'review-answer';
            
            const isCorrectAnswer = optionIndex === correctAnswerIndex;
            const isUserSelection = optionIndex === answerData.userAnswerIndex;
            
            if (isCorrectAnswer) {
                answerDiv.classList.add('correct');
            } 
            if (isUserSelection) {
                 answerDiv.classList.add('user-answer');
                 if (!isCorrectAnswer) {
                    answerDiv.classList.add('incorrect');
                }
            }
            
            answerDiv.innerHTML = `
                <span>${option.text}</span>
                ${isCorrectAnswer ? '<i class="fas fa-check"></i>' : ''}
                ${isUserSelection && !isCorrectAnswer ? '<i class="fas fa-times"></i>' : ''}
            `;
            
            answersDiv.appendChild(answerDiv);
        });
        
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(answersDiv);
        reviewQuestionsContainer.appendChild(questionDiv);
    });
}

// Is Valid Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}