import { openai } from "@/configs/AiModel";
import { generateNotesAIModel } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { TEST_RESULTS_TABLE } from "@/configs/schema";

export async function POST(req) {
    try {
        const { courseId, examType, score, totalQuestions, userAnswers, userEmail, topic } = await req.json();
        
        const PROMPT = `A student just took a practice test on the topic '${topic}' and scored ${score} out of ${totalQuestions}. 
        Provide a short, highly encouraging, and specific 2-sentence feedback. 
        In the first sentence, praise them for their effort. In the second sentence, advise them on what specific area of this topic they should review or practice next based on their score.`;
        
        let feedback = "No feedback provided.";
        try {
            if (process.env.OPENAI_API_KEY) {
               console.log("Using OpenAI for feedback generation...");
               const completion = await openai.chat.completions.create({
                  model: "gpt-4o",
                  messages: [{ role: "user", content: PROMPT }]
               });
               feedback = completion.choices[0].message.content;
            } else {
               console.log("Using Gemini for feedback generation...");
               const aiResp = await generateNotesAIModel.sendMessage(PROMPT);
               feedback = aiResp?.response?.text();
            }
        } catch(e) {
            console.error("Failed to generate AI feedback for quiz result: ", e);
            feedback = `You scored ${score} out of ${totalQuestions}. Keep up the great work learning about ${topic}!`;
        }
        
        const dbResult = await db.insert(TEST_RESULTS_TABLE).values({
            courseId: String(courseId),
            examType,
            score,
            totalQuestions,
            userAnswers: userAnswers,
            userEmail,
            feedback,
            createdAt: new Date().toISOString()
        }).returning();
        
        return NextResponse.json({ result: dbResult[0] });

    } catch(err) {
        console.error("🔥 POST /api/submit-quiz error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
