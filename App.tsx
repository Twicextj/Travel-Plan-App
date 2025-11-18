
import React, { useState, useCallback } from 'react';
import { AppState, Answers, ResultData } from './types';
import { QUESTIONS } from './constants';
import { fetchRecommendation } from './services/geminiService';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleStart = () => {
    setAppState(AppState.QUESTIONS);
  };

  const handleRestart = () => {
    setAppState(AppState.START);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setLoading(false);
    setError(null);
    setResult(null);
  };

  const getRecommendation = useCallback(async (finalAnswers: Answers) => {
    setLoading(true);
    setError(null);
    try {
      const recommendation = await fetchRecommendation(finalAnswers);
      setResult(recommendation);
      setAppState(AppState.RESULT);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました。');
      setAppState(AppState.RESULT); // Go to result screen to show the error
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectAnswer = (answerKey: keyof Answers, value: string) => {
    const newAnswers = { ...answers, [answerKey]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      getRecommendation(newAnswers);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    switch (appState) {
      case AppState.START:
        return <StartScreen onStart={handleStart} />;
      case AppState.QUESTIONS:
        return (
          <QuestionScreen
            question={QUESTIONS[currentQuestionIndex]}
            onSelectAnswer={handleSelectAnswer}
          />
        );
      case AppState.RESULT:
        if (error) {
          return (
            <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg animate-fade-in-up">
              <h2 className="text-xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
              <p className="text-gray-700 mb-6">{error}</p>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition"
              >
                最初からやり直す
              </button>
            </div>
          );
        }
        return result ? <ResultScreen result={result} answers={answers} onRestart={handleRestart} /> : null;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800 bg-black/10">
      <div className="w-full max-w-md mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
