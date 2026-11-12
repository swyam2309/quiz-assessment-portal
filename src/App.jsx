import React, { useState } from 'react';
import Home from './Home';
import Quiz from './Quiz';
import Result from './Result';
import { categoryQuestions } from './data/questions';

export default function App() {
  const [step, setStep] = useState('home'); // 'home', 'quiz', 'result'
  const [activeCategory, setActiveCategory] = useState('React.js');
  const [finalScore, setFinalScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleStartQuiz = (category) => {
    setActiveCategory(category);
    setStep('quiz');
  };

  const handleFinishQuiz = (score, answers) => {
    setFinalScore(score);
    setUserAnswers(answers);
    
    // Save to local storage history with category tag
    const existingHistory = JSON.parse(localStorage.getItem('quiz_history')) || [];
    const newEntry = { score, category: activeCategory, date: new Date().toLocaleDateString() };
    localStorage.setItem('quiz_history', JSON.stringify([...existingHistory, newEntry]));

    setStep('result');
  };

  const currentQuestions = categoryQuestions[activeCategory] || categoryQuestions['React.js'];

  return (
    <div>
      {step === 'home' && <Home onStart={handleStartQuiz} />}
      {step === 'quiz' && <Quiz questions={currentQuestions} onFinish={handleFinishQuiz} />}
      {step === 'result' && (
        <Result 
          score={finalScore} 
          total={currentQuestions.length} 
          questions={currentQuestions} 
          userAnswers={userAnswers} 
          onRestart={() => setStep('home')} 
        />
      )}
    </div>
  );
}