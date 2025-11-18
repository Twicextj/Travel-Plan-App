
import React from 'react';
import { ResultData, Answers } from '../types';

interface ResultScreenProps {
  result: ResultData;
  answers: Answers;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, answers, onRestart }) => {
  const summary = `${answers.departure || '指定の場所'}から${answers.duration ? ` ${answers.duration}` : ''}${answers.transport ? `、${answers.transport}で` : ''}の旅行なら…`;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
      <img src={result.imageUrl} alt={result.destination} className="w-full h-64 object-cover" />
      <div className="p-6 md:p-8">
        <p className="text-sm md:text-base text-gray-500 font-medium text-center">{summary}</p>
        <p className="text-base text-gray-500 font-medium text-center pt-4">あなたへのおすすめは…</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 my-3 text-center">
          {result.destination}
        </h2>
        
        <div className="text-left my-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-300">
            <h3 className="font-bold text-blue-800 mb-1">おすすめの理由</h3>
            <p className="text-gray-700 leading-relaxed">{result.reason}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-300">
            <h3 className="font-bold text-green-800 mb-1">アクセス</h3>
            <p className="text-gray-700 leading-relaxed">{result.access}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-300">
            <h3 className="font-bold text-yellow-800 mb-1">交通費目安</h3>
            <p className="text-gray-700 leading-relaxed">{result.cost}</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
