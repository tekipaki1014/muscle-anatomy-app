import { useState } from 'react';
import { MUSCLES } from './data/muscles';
import type { Muscle, QuestionType } from './types';
import { ChevronRight, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

function App() {
  const [currentMuscle, setCurrentMuscle] = useState<Muscle | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType>('innervation');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Helper to get the correct answer text based on type
  const getAnswerText = (muscle: Muscle, type: QuestionType): string => {
    switch (type) {
      case 'innervation': return muscle.innervation;
      case 'origin': return muscle.origin;
      case 'insertion': return muscle.insertion;
      case 'nameEn': return muscle.nameEn;
    }
  };

  // Helper to get question text
  const getQuestionText = (type: QuestionType): string => {
    switch (type) {
      case 'innervation': return '支配神経は？';
      case 'origin': return '起始は？';
      case 'insertion': return '停止は？';
      case 'nameEn': return '英語名は？';
    }
  };

  const startQuiz = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];

    // Randomly select question type
    const types: QuestionType[] = ['innervation', 'origin', 'insertion', 'nameEn'];
    const type = types[Math.floor(Math.random() * types.length)];

    setCurrentMuscle(randomMuscle);
    setQuestionType(type);

    // Generate options
    const correctAnswer = getAnswerText(randomMuscle, type);

    // Get all possible answers for this type to use as distractors
    const allAnswers = Array.from(new Set(MUSCLES.map(m => getAnswerText(m, type))));

    const distractors = allAnswers
      .filter(a => a !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const newOptions = [...distractors, correctAnswer].sort(() => 0.5 - Math.random());
    setOptions(newOptions);
    setSelectedOption(null);
  };

  // Initial start
  if (!currentMuscle) {
    startQuiz();
    return null; // Or a loading spinner, but startQuiz runs synchronously
  }

  const handleAnswer = (answer: string) => {
    if (selectedOption) return;

    setSelectedOption(answer);
    const correct = answer === getAnswerText(currentMuscle, questionType);

    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>SCORE</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{score} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>Streak: {streak}</span></div>
        </div>
        <button
          onClick={() => { setScore(0); setStreak(0); startQuiz(); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7f8c8d' }}
        >
          <RefreshCw size={20} />
        </button>
      </header>

      <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '8px' }}>
          MUSCLE
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{currentMuscle.name}</h2>
        {/* Only show English name if it's NOT the question */}
        {questionType !== 'nameEn' && (
          <div className="title-en">{currentMuscle.nameEn}</div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <span style={{ background: '#eee', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
            {currentMuscle.category}
          </span>
          <span style={{ background: '#eee', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
            {currentMuscle.segment}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#7f8c8d', fontSize: '1.2rem', textAlign: 'center' }}>
        {getQuestionText(questionType)}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map((option, idx) => {
          let stateClass = '';
          if (selectedOption) {
            if (option === getAnswerText(currentMuscle, questionType)) stateClass = 'correct';
            else if (option === selectedOption) stateClass = 'wrong';
          }

          return (
            <button
              key={idx}
              className={`btn btn-option ${stateClass}`}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedOption}
              style={{ minHeight: '60px' }} // Ensure height for long text
            >
              <div style={{ flex: 1, fontSize: option.length > 20 ? '0.9rem' : '1rem' }}>{option}</div>
              {stateClass === 'correct' && <CheckCircle size={20} />}
              {stateClass === 'wrong' && <XCircle size={20} />}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div style={{ marginTop: '24px' }}>
          <button className="btn btn-primary animate-pop" onClick={startQuiz}>
            次の問題へ <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
