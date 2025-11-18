
import React from 'react';
import { Question } from './types';
import { 
  YenIcon, 
  UsersIcon, 
  HeartIcon, 
  SunIcon, 
  SparklesIcon, 
  FireIcon, 
  UserIcon,
  CalendarIcon,
  ClockIcon,
  TrainIcon,
  CarIcon,
  PlaneIcon,
  HomeIcon,
} from './components/IconComponents';

export const QUESTIONS: Question[] = [
  {
    text: 'いつごろ旅行に行きたいですか？',
    answerKey: 'season',
    type: 'select',
    options: [
      { text: '次の週末', icon: React.createElement(CalendarIcon, { className: "w-6 h-6" }) },
      { text: '1ヶ月以内', icon: React.createElement(CalendarIcon, { className: "w-6 h-6" }) },
      { text: '夏休み', icon: React.createElement(SunIcon, { className: "w-6 h-6" }) },
      { text: '秋ごろ', icon: React.createElement(CalendarIcon, { className: "w-6 h-6" }) },
    ],
  },
  {
    text: '何日間くらいの旅行ですか？',
    answerKey: 'duration',
    type: 'select',
    options: [
      { text: '日帰り', icon: React.createElement(ClockIcon, { className: "w-6 h-6" }) },
      { text: '1泊2日', icon: React.createElement(ClockIcon, { className: "w-6 h-6" }) },
      { text: '2泊3日以上', icon: React.createElement(ClockIcon, { className: "w-6 h-6" }) },
    ],
  },
  {
    text: 'どこから出発しますか？',
    answerKey: 'departure',
    type: 'text',
  },
  {
    text: '主な移動手段は何を考えますか？',
    answerKey: 'transport',
    type: 'select',
    options: [
      { text: '電車', icon: React.createElement(TrainIcon, { className: "w-6 h-6" }) },
      { text: '車', icon: React.createElement(CarIcon, { className: "w-6 h-6" }) },
      { text: '飛行機', icon: React.createElement(PlaneIcon, { className: "w-6 h-6" }) },
    ],
  },
  {
    text: '予算は一人あたり、いくらくらいですか？',
    answerKey: 'budget',
    type: 'select',
    options: [
      { text: '1万円以内', icon: React.createElement(YenIcon, { className: "w-6 h-6" }) },
      { text: '3万円以内', icon: React.createElement(YenIcon, { className: "w-6 h-6" }) },
      { text: '5万円以内', icon: React.createElement(YenIcon, { className: "w-6 h-6" }) },
      { text: '10万円以内', icon: React.createElement(YenIcon, { className: "w-6 h-6" }) },
    ],
  },
  {
    text: '誰と行きますか？',
    answerKey: 'companion',
    type: 'select',
    options: [
      { text: 'ひとりで', icon: React.createElement(UserIcon, { className: "w-6 h-6" }) },
      { text: '友達と', icon: React.createElement(UsersIcon, { className: "w-6 h-6" }) },
      { text: '恋人と', icon: React.createElement(HeartIcon, { className: "w-6 h-6" }) },
      { text: '家族と', icon: React.createElement(HomeIcon, { className: "w-6 h-6" }) },
    ],
  },
  {
    text: 'どんな気分ですか？',
    answerKey: 'mood',
    type: 'select',
    options: [
      { text: 'のんびり温泉', icon: React.createElement(FireIcon, { className: "w-6 h-6" }) },
      { text: '美味しいもの巡り', icon: React.createElement(SparklesIcon, { className: "w-6 h-6" }) },
      { text: '自然を満喫', icon: React.createElement(SunIcon, { className: "w-6 h-6" }) },
      { text: 'アクティブに活動', icon: React.createElement(UsersIcon, { className: "w-6 h-6" }) },
    ],
  },
];
