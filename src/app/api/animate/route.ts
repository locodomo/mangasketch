import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      "Generate a detailed manga-style drawing guide based on this sketch. Include step-by-step instructions and tips for improving the drawing.",
      image
    ]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ guide: text });
  } catch (error) {
    console.error('Error generating animation guide:', error);
    return NextResponse.json(
      { error: 'Failed to generate animation guide' },
      { status: 500 }
    );
  }
} 