
import React, { useState } from 'react';
import { Question, Answers } from '../types';

interface QuestionScreenProps {
  question: Question;
  onSelectAnswer: (answerKey: keyof Answers, value: string) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, onSelectAnswer }) => {
    const [inputValue, setInputValue] = useState('');

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSelectAnswer(question.answerKey, inputValue.trim());
        }
    };

    return (
        <div className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
                {question.text}
            </h2>
            
            {question.type === 'select' && (
                <div className="grid grid-cols-1 gap-4">
                    {question.options?.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectAnswer(question.answerKey, option.text)}
                        className="flex items-center justify-center w-full p-4 bg-white border-2 border-blue-200 rounded-xl text-lg text-blue-700 font-semibold shadow-md hover:bg-blue-100 hover:border-blue-400 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <span className="mr-3 text-blue-500">{option.icon}</span>
                        {option.text}
                    </button>
                    ))}
                </div>
            )}

            {question.type === 'text' && (
                <form onSubmit={handleTextSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="例：東京都"
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-lg text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        required
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="w-full p-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        次へ
                    </button>
                </form>
            )}
        </div>
    );
};

export default QuestionScreen;
