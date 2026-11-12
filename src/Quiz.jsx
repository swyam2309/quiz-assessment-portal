import React, { useState, useEffect } from 'react';

export default function Quiz({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(null);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleNext = (forcedOption = undefined) => {
    const choiceToSave = forcedOption !== undefined ? forcedOption : selectedOption;
    
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = choiceToSave;
    setUserAnswers(updatedAnswers);

    let newScore = score;
    if (choiceToSave === currentQ.answer) {
      newScore += 1;
      setScore(newScore);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setTimeLeft(15);
    } else {
      onFinish(newScore, updatedAnswers);
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#1e1e2f', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', backgroundColor: '#2d2d44', borderRadius: '3px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4ecca3', transition: 'width 0.3s ease' }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ color: '#aaa', fontSize: '14px' }}>Question {currentIndex + 1} of {questions.length}</span>
        <span style={{ padding: '4px 10px', backgroundColor: timeLeft <= 5 ? '#ff6b6b' : '#2d2d44', color: timeLeft <= 5 ? '#fff' : '#4ecca3', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', border: '1px solid #444' }}>
          ⏱️ {timeLeft}s
        </span>
      </div>

      <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '25px', lineHeight: '1.4' }}>{currentQ.question}</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            style={{
              padding: '14px 18px',
              textAlign: 'left',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: selectedOption === index ? '#4ecca3' : '#2d2d44',
              color: selectedOption === index ? '#1e1e2f' : '#ffffff',
              fontWeight: selectedOption === index ? 'bold' : 'normal',
              border: '1px solid #444',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleNext()}
        disabled={selectedOption === null}
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '16px',
          backgroundColor: selectedOption === null ? '#444' : '#4ecca3',
          color: selectedOption === null ? '#888' : '#1e1e2f',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: selectedOption === null ? 'not-allowed' : 'pointer'
        }}
      >
        {currentIndex === questions.length - 1 ? 'Submit Assessment' : 'Next Question'}
      </button>
    </div>
  );
}