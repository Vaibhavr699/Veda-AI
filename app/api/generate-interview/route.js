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
      .where(and(eq(EXAMS_CONTENT_TABLE.courseId, String(courseId)), eq(EXAMS_CONTENT_TABLE.examType, 'interview')));
    
    if (existing.length > 0) {
       return NextResponse.json({ interview: existing[0] });
    }

    const PROMPT = `Generate top 10 most commonly asked interview questions for the following topic: ${topic}. 
    Return ONLY a JSON object in this exact format, with no markdown code blocks around it:
    {
      "questions": [
        {
          "question": "Question text?",
          "answer": "A crisp, professional, and detailed answer."
        }
      ]
    }`;
    
    let aiResult;
    if (process.env.OPENAI_API_KEY) {
      console.log("Using OpenAI for interview generation...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: PROMPT }],
        response_format: { type: "json_object" }
      });
      const rawText = completion.choices[0].message.content;
      aiResult = JSON.parse(rawText);
    } else {
      console.log("Using Gemini for interview generation...");
      const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
      let rawText = aiResp?.response?.text();
      // Remove backticks if present from Gemini response
      rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
      aiResult = JSON.parse(rawText);
    }

    // Insert into DB
    const dbResult = await db.insert(EXAMS_CONTENT_TABLE).values({
      courseId: String(courseId),
      examType: 'interview',
      content: aiResult,
      status: 'Ready'
    }).returning();

    return NextResponse.json({ interview: dbResult[0] });

  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
