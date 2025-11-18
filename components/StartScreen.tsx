
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">
        旅先おまかせ診断
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        あなたにピッタリの旅先、見つけます！
      </p>
      <button
        onClick={onStart}
        className="w-full px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        診断スタート
      </button>
    </div>
  );
};

export default StartScreen;
