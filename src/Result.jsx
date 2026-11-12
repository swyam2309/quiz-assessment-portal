import React from 'react';

export default function Result({ score, total, questions, userAnswers, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#1e1e2f', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Assessment Report 📊</h2>
        <p style={{ color: '#aaa', fontSize: '16px' }}>Here is the detailed breakdown of your performance.</p>
        
        <div style={{ display: 'inline-block', margin: '20px 0', padding: '15px 30px', backgroundColor: '#2d2d44', borderRadius: '8px', border: '1px solid #444' }}>
          <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#4ecca3' }}>{score} / {total}</span>
          <p style={{ margin: '5px 0 0 0', color: '#ccc' }}>Accuracy: {percentage}%</p>
        </div>
      </div>

      <h3 style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>Question Review</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
        {questions.map((q, index) => {
          const userChoice = userAnswers[index];
          const isCorrect = userChoice === q.answer;

          return (
            <div key={index} style={{ padding: '15px', backgroundColor: '#2d2d44', borderRadius: '8px', borderLeft: `5px solid ${isCorrect ? '#4ecca3' : '#ff6b6b'}` }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Q{index + 1}: {q.question}</p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: isCorrect ? '#4ecca3' : '#ff6b6b' }}>
                Your Answer: {userChoice !== null ? q.options[userChoice] : 'Not Answered (Timed out)'}
              </p>
              {!isCorrect && (
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#4ecca3' }}>
                  Correct Answer: {q.options[q.answer]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button 
        onClick={onRestart}
        style={{
          width: '100%',
          marginTop: '25px',
          padding: '12px',
          fontSize: '16px',
          backgroundColor: '#4ecca3',
          color: '#1e1e2f',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Retake Assessment
      </button>
    </div>
  );
}