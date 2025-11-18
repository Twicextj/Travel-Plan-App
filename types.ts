
export enum AppState {
  START,
  QUESTIONS,
  RESULT,
}

export interface Question {
  text: string;
  answerKey: keyof Answers;
  type: 'select' | 'text';
  options?: { text: string; icon: React.ReactNode }[];
}

export interface Answers {
  season?: string;
  duration?: string;
  departure?: string;
  transport?: string;
  budget?: string;
  companion?: string;
  mood?: string;
}

export interface ResultData {
  destination: string;
  reason: string;
  imageUrl: string;
  access: string;
  cost: string;
}

export interface GeminiResponse {
  destination: string;
  reason: string;
  imageKeyword: string;
  access: string;
  cost: string;
}
