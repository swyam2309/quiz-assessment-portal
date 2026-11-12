import React, { useState, useEffect } from 'react';

export default function Home({ onStart }) {
  const [stats, setStats] = useState({ totalTaken: 0, bestScore: 0 });
  const [selectedCategory, setSelectedCategory] = useState('React.js');

  useEffect(() => {
    // Load previous stats from LocalStorage to mimic a full-stack DB session
    const savedHistory = JSON.parse(localStorage.getItem('quiz_history')) || [];
    if (savedHistory.length > 0) {
      const best = Math.max(...savedHistory.map(s => s.score));
      setStats({
        totalTaken: savedHistory.length,
        bestScore: best
      });
    }
  }, []);

  const categories = [
    { id: 'React.js', name: 'React.js & Hooks', count: 4, icon: '⚛️' },
    { id: 'JavaScript', name: 'Advanced JavaScript', count: 4, icon: '📜' },
    { id: 'HTMLCSS', name: 'HTML5 & CSS3', count: 4, icon: '🎨' }
  ];

  return (
    <div style={{ maxWidth: '750px', margin: '30px auto', padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#1e1e2f', color: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      {/* Top Header / User Profile Snippet */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '20px', marginBottom: '25px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>Dashboard 🚀</h2>
          <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Welcome back, Student | Portal Active</p>
        </div>
        <div style={{ padding: '8px 15px', backgroundColor: '#2d2d44', borderRadius: '8px', border: '1px solid #444', fontSize: '14px', color: '#4ecca3', fontWeight: 'bold' }}>
          Status: Online
        </div>
      </div>

      {/* Stats Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: '#2d2d44', borderRadius: '8px', border: '1px solid #444' }}>
          <p style={{ margin: '0 0 8px 0', color: '#aaa', fontSize: '14px' }}>Quizzes Attempted</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#4ecca3' }}>{stats.totalTaken}</h3>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#2d2d44', borderRadius: '8px', border: '1px solid #444' }}>
          <p style={{ margin: '0 0 8px 0', color: '#aaa', fontSize: '14px' }}>Personal Best Score</p>
          <h3 style={{ margin: 0, fontSize: '28px', color: '#4ecca3' }}>{stats.bestScore} / 4</h3>
        </div>
      </div>

      {/* Category Selection */}
      <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Select Assessment Domain</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '30px' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '15px',
              backgroundColor: selectedCategory === cat.id ? '#2d2d44' : '#161622',
              border: `2px solid ${selectedCategory === cat.id ? '#4ecca3' : '#444'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{cat.icon}</div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>{cat.name}</div>
            <div style={{ fontSize: '12px', color: '#aaa' }}>{cat.count} Questions</div>
          </div>
        ))}
      </div>

      {/* Start Action Button */}
      <button 
        onClick={() => onStart(selectedCategory)}
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '16px',
          backgroundColor: '#4ecca3',
          color: '#1e1e2f',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(78,204,163,0.3)'
        }}
      >
        Launch Assessment ({selectedCategory})
      </button>
    </div>
  );
}