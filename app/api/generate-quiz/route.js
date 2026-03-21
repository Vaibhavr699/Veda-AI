import { courseOutlineAIModel, openai } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { EXAMS_CONTENT_TABLE } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId, topic } = await req.json();

    // Check if exam already generated
    const existing = await db.select().from(EXAMS_CONTENT_TABLE)
      .where(and(eq(EXAMS_CONTENT_TABLE.courseId, String(courseId)), eq(EXAMS_CONTENT_TABLE.examType, 'quiz')));
    
    if (existing.length > 0) {
       return NextResponse.json({ quiz: existing[0] });
    }

    const PROMPT = `Generate 10 multiple-choice questions for the following topic: ${topic}. 
    Return ONLY a JSON object in this exact format, with no markdown code blocks around it:
    {
      "questions": [
        {
          "question": "Question text?",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "explanation": "Why A is correct"
        }
      ]
    }`;
    
    let aiResult;
    if (process.env.OPENAI_API_KEY) {
      console.log("Using OpenAI for quiz generation...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: PROMPT }],
        response_format: { type: "json_object" }
      });
      const rawText = completion.choices[0].message.content;
      aiResult = JSON.parse(rawText);
    } else {
      console.log("Using Gemini for quiz generation...");
      const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
      let rawText = aiResp?.response?.text();
      // Remove backticks if present from Gemini response
      rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      aiResult = JSON.parse(rawText);
    }

    // Insert into DB
    const dbResult = await db.insert(EXAMS_CONTENT_TABLE).values({
      courseId: String(courseId),
      examType: 'quiz',
      content: aiResult,
      status: 'Ready'
    }).returning();

    return NextResponse.json({ quiz: dbResult[0] });

  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
