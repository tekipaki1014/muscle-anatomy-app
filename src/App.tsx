import { useState, useMemo } from 'react';
import { MUSCLES } from './data/muscles';
import type { Muscle, QuizMode } from './types';
import { Brain, Activity, List, ChevronRight, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [currentMuscle, setCurrentMuscle] = useState<Muscle | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Get all unique nerves for distractors
  const allNerves = useMemo(() => Array.from(new Set(MUSCLES.map(m => m.innervation))), []);

  const startQuiz = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setCurrentMuscle(randomMuscle);

    // Generate options (Correct + 3 Distractors)
    const distractors = allNerves
      .filter(n => n !== randomMuscle.innervation)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const newOptions = [...distractors, randomMuscle.innervation].sort(() => 0.5 - Math.random());
    setOptions(newOptions);
    setSelectedOption(null);
  };

  const handleAnswer = (answer: string) => {
    if (selectedOption) return; // Prevent multiple clicks

    setSelectedOption(answer);
    const correct = answer === currentMuscle?.innervation;

    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    startQuiz();
  };

  // Home Screen
  if (!mode) {
    return (
      <div className="container" style={{ justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-color)' }}>Muscle Anatomy</h1>
          <p style={{ color: '#7f8c8d' }}>国試対策・解剖学学習アプリ</p>
        </div>

        <div className="mode-grid">
          <div className="mode-card" onClick={() => { setMode('4choice'); startQuiz(); }}>
            <Brain size={40} color="var(--primary-color)" style={{ marginBottom: '16px' }} />
            <h3>4択クイズ</h3>
            <p style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>支配神経を答える</p>
          </div>

          <div className="mode-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <Activity size={40} color="var(--nerve-color)" style={{ marginBottom: '16px' }} />
            <h3>逆引き (WIP)</h3>
            <p style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>神経から筋肉を選ぶ</p>
          </div>

          <div className="mode-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
            <List size={40} color="var(--accent-color)" style={{ marginBottom: '16px' }} />
            <h3>筋肉一覧 (WIP)</h3>
            <p style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>辞書として使う</p>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="container">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <button
          onClick={() => setMode(null)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginRight: '16px' }}
        >
          <ArrowLeft size={24} color="var(--text-color)" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>SCORE</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{score} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>Streak: {streak}</span></div>
        </div>
      </header>

      {currentMuscle && (
        <>
          <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '8px' }}>
              MUSCLE
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{currentMuscle.name}</h2>
            <div className="title-en">{currentMuscle.nameEn}</div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span style={{ background: '#eee', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
                {currentMuscle.category}
              </span>
              <span style={{ background: '#eee', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
                {currentMuscle.segment}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#7f8c8d' }}>
            支配神経は？
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((option, idx) => {
              let stateClass = '';
              if (selectedOption) {
                if (option === currentMuscle.innervation) stateClass = 'correct';
                else if (option === selectedOption) stateClass = 'wrong';
              }

              return (
                <button
                  key={idx}
                  className={`btn btn-option ${stateClass}`}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedOption}
                >
                  <div style={{ flex: 1 }}>{option}</div>
                  {stateClass === 'correct' && <CheckCircle size={20} />}
                  {stateClass === 'wrong' && <XCircle size={20} />}
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <div style={{ marginTop: '24px' }}>
              <button className="btn btn-primary animate-pop" onClick={nextQuestion}>
                次の問題へ <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
