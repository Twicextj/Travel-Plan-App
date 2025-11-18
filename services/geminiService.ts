
import { GoogleGenAI } from "@google/genai";
import { Answers, ResultData, GeminiResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (answers: Answers): string => {
  return `
あなたは日本の旅行プランのプロフェッショナルです。以下のユーザーの希望に基づいて、日本国内の特定の観光地を一つだけ提案してください。提案は、以下のJSON形式で返してください。

{
  "destination": "都道府県名 市町村名など具体的な地名",
  "reason": "なぜその場所がユーザーの希望に合っているのか、魅力的な短い説明文",
  "imageKeyword": "その場所を象徴する風景や建物の英語のキーワード（例: 'Kusatsu Onsen Gunma'）",
  "access": "出発地からの具体的なアクセス方法（移動手段を考慮して）",
  "cost": "出発地からの交通費のおおよその目安"
}

# ユーザーの希望
- 旅行時期: ${answers.season || '指定なし'}
- 旅行期間: ${answers.duration || '指定なし'}
- 出発地: ${answers.departure || '指定なし'}
- 移動手段: ${answers.transport || '指定なし'}
- 予算（一人あたり）: ${answers.budget || '指定なし'}
- 同行者: ${answers.companion || '指定なし'}
- 目的・気分: ${answers.mood || '指定なし'}

# 制約
- 必ずJSON形式で回答してください。
- \`destination\`は具体的な地名を一つだけ含めてください。
- \`reason\`は簡潔かつ説得力のある文章にしてください。
- \`imageKeyword\`は英語にしてください。
- \`access\`と\`cost\`は、ユーザーの出発地と移動手段を考慮して具体的に記述してください。
- 前後に説明文などをつけず、JSONオブジェクトのみを返してください。
  `;
};

export const fetchRecommendation = async (answers: Answers): Promise<ResultData> => {
  const prompt = generatePrompt(answers);

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData: GeminiResponse = JSON.parse(jsonStr);

    if (!parsedData.destination || !parsedData.reason || !parsedData.imageKeyword || !parsedData.access || !parsedData.cost) {
        throw new Error("APIからのレスポンス形式が正しくありません。");
    }

    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(parsedData.imageKeyword)}/800/600`;

    return {
      destination: parsedData.destination,
      reason: parsedData.reason,
      imageUrl: imageUrl,
      access: parsedData.access,
      cost: parsedData.cost,
    };
  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof SyntaxError) {
      throw new Error("AIからの応答を解析できませんでした。別の選択肢で試してみてください。");
    }
    throw new Error("おすすめの取得に失敗しました。時間をおいて再試行してください。");
  }
};
