export function generateFallbackQuestions(topic, count) {
  const templates = [
    {
      question: `What is the primary purpose of ${topic}?`,
      answers: [
        { text: `To understand basics of ${topic}`, correct: true },
        { text: `To avoid studying ${topic}`, correct: false },
        { text: `To memorize ${topic}`, correct: false },
        { text: `To ignore ${topic}`, correct: false }
      ],
      explanation: `This tests your knowledge of ${topic}.`
    },
    {
      question: `Which concept is important in ${topic}?`,
      answers: [
        { text: `Core principles of ${topic}`, correct: true },
        { text: `Random facts`, correct: false },
        { text: `Unrelated topics`, correct: false },
        { text: `Nothing`, correct: false }
      ],
      explanation: `This checks your understanding of ${topic}.`
    }
  ];

  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(templates[i % templates.length]);
  }
  return out;
}
