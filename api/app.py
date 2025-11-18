from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
from datetime import datetime
import logging
import random

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["*"])

# SMART API KEY LOADING
def load_api_key():
    # 1. Try environment variable first (Production - Vercel)
    api_key = os.environ.get('OPENROUTER_API_KEY')
    if api_key:
        return api_key, "production"
    
    # 2. Try .env.development file (Development - Local)
    if os.path.exists('.env.development'):
        try:
            from dotenv import load_dotenv
            load_dotenv('.env.development')  # Specific file load karein
            api_key = os.environ.get('OPENROUTER_API_KEY')
            if api_key:
                return api_key, "development"
        except ImportError:
            pass
    
    # 3. Final fallback (Emergency)
    return None, "not_found"

OPENROUTER_API_KEY, key_source = load_api_key()

if OPENROUTER_API_KEY:
    print(f"✅ API Key loaded from: {key_source}")
else:
    print("❌ API Key not found - AI features disabled")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
WORKING_MODELS = [
    "google/gemini-2.0-flash-exp:free",
    "qwen/qwen-2.5-72b-instruct:free", 
    "mistralai/mistral-7b-instruct:free"
]

@app.route('/')
def home():
    return jsonify({
        "message": "AI Quiz Generator - PRODUCTION VERSION",
        "timestamp": datetime.now().isoformat(),
        "status": "running",
        "ai_enabled": bool(OPENROUTER_API_KEY)
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "ai_status": "enabled" if OPENROUTER_API_KEY else "disabled",
        "models": WORKING_MODELS
    })

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    try:
        data = request.get_json()
        topic = data.get('topic', '').strip()
        question_count = int(data.get('question_count', 10))
        
        if not topic:
            return jsonify({"error": "Topic required"}), 400
        
        logger.info(f"🎯 Generating quiz for: {topic}")
        
        # Check if API key is available
        if not OPENROUTER_API_KEY:
            logger.warning("🔑 No API key - Using fallback questions")
            questions = generate_fallback_questions(topic, question_count)
            return jsonify({
                "success": True,
                "topic": topic,
                "questions": questions,
                "count": len(questions),
                "source": "fallback",
                "message": "Using fallback questions (API key not configured)"
            })
        
        # Try AI generation with working models
        try:
            questions = generate_questions_with_ai(topic, question_count)
            logger.info(f"✅ AI generated {len(questions)} questions")
            
            return jsonify({
                "success": True,
                "topic": topic,
                "questions": questions,
                "count": len(questions),
                "source": "ai"
            })
            
        except Exception as ai_error:
            logger.warning(f"❌ AI failed: {ai_error}")
            questions = generate_fallback_questions(topic, question_count)
            logger.info(f"🔄 Using fallback: {len(questions)} questions")
            
            return jsonify({
                "success": True,
                "topic": topic,
                "questions": questions,
                "count": len(questions),
                "source": "fallback",
                "message": str(ai_error)
            })
        
    except Exception as e:
        logger.error(f"💥 Server error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

def generate_questions_with_ai(topic, question_count):
    """Generate questions using working AI models"""
    
    # Use random working model
    model = random.choice(WORKING_MODELS)
    
    system_prompt = f"""Create {question_count} multiple-choice questions about "{topic}".
Return ONLY valid JSON format:

{{
  "questions": [
    {{
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": 0,
      "explanation": "Brief explanation"
    }}
  ]
}}

Ensure exactly 4 options per question. Make questions specific to the topic."""

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Generate {question_count} unique multiple choice questions about {topic} with 4 options each. Return valid JSON only."}
        ],
        "max_tokens": 3000,
        "temperature": 0.7
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://quiztantra.vercel.app",
        "X-Title": "QuizTantra"
    }

    logger.info(f"🤖 Using model: {model} for: {topic}")
    
    try:
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code != 200:
            error_msg = f"API error {response.status_code}: {response.text}"
            logger.error(error_msg)
            raise Exception(error_msg)
        
        content = response.json()['choices'][0]['message']['content']
        logger.info("📥 AI Response received")
        
        # Extract JSON
        json_match = extract_json_from_text(content)
        if not json_match:
            logger.error("❌ No valid JSON in AI response")
            raise Exception("AI did not return valid JSON format")
        
        data = json.loads(json_match)
        
        questions = []
        for i, q in enumerate(data.get('questions', [])[:question_count]):
            options = q.get('options', [])
            
            # Ensure we have exactly 4 options
            if len(options) < 4:
                # Add missing options
                for j in range(len(options), 4):
                    options.append(f'Option {chr(65 + j)}')
            elif len(options) > 4:
                # Take only first 4 options
                options = options[:4]
            
            correct_index = q.get('correct_answer', 0)
            # Ensure correct_index is within bounds
            if correct_index >= len(options):
                correct_index = 0
            
            questions.append({
                'question': q.get('question', f'Question {i+1} about {topic}'),
                'answers': [
                    {
                        'text': opt, 
                        'correct': idx == correct_index
                    }
                    for idx, opt in enumerate(options)
                ],
                'explanation': q.get('explanation', f'This question tests your knowledge of {topic}.')
            })
        
        return questions
        
    except requests.exceptions.Timeout:
        logger.error("⏰ API request timeout")
        raise Exception("AI service timeout - please try again")
    except requests.exceptions.RequestException as e:
        logger.error(f"🌐 Network error: {e}")
        raise Exception(f"Network error: {str(e)}")

def extract_json_from_text(text):
    """Extract JSON from text"""
    import re
    
    # Try to find JSON in code blocks first
    json_match = re.search(r'```json\s*(.*?)\s*```', text, re.DOTALL)
    if json_match:
        return json_match.group(1)
    
    # Try to find any JSON object
    json_match = re.search(r'\{[\s\S]*\}', text)
    return json_match.group(0) if json_match else None

def generate_fallback_questions(topic, count):
    """Fallback questions if AI fails"""
    questions = []
    
    fallback_templates = [
        {
            'question': f"What is the primary purpose of {topic}?",
            'answers': [
                {'text': f"To solve problems in {topic}", 'correct': True},
                {'text': f"To organize {topic} concepts", 'correct': False},
                {'text': f"To analyze {topic} data", 'correct': False},
                {'text': f"To visualize {topic} information", 'correct': False}
            ],
            'explanation': f"This tests fundamental understanding of {topic}."
        },
        {
            'question': f"Which concept is most important in {topic}?",
            'answers': [
                {'text': f"Core principles of {topic}", 'correct': True},
                {'text': f"Historical context of {topic}", 'correct': False},
                {'text': f"Advanced techniques in {topic}", 'correct': False},
                {'text': f"Basic terminology of {topic}", 'correct': False}
            ],
            'explanation': f"This evaluates key concepts in {topic}."
        }
    ]
    
    for i in range(count):
        template = fallback_templates[i % len(fallback_templates)]
        questions.append({
            'question': template['question'],
            'answers': template['answers'],
            'explanation': template['explanation']
        })
    
    return questions

# Vercel requires this
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 AI QUIZ GENERATOR - PRODUCTION READY")
    print(f"🔑 API Source: {key_source}")
    print(f"✅ Health: http://localhost:{port}/api/health")
    app.run(host='0.0.0.0', port=port, debug=False)