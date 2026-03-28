import { courseOutlineAIModel, openai } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    const { courseID, topic, courseType, difficulty, createdBy } = await req.json();

    // Log input
    console.log("Received Data:", { courseID, topic, courseType, difficulty, createdBy });

    const PROMPT = `Generate a course outline for the following topic: ${topic}, course type: ${courseType}, difficulty: ${difficulty}, created by: ${createdBy}. 
    Return a JSON object with the following structure:
    {
      "course": {
        "title": "Course Title",
        "chapters": [
          {
            "title": "Chapter 1 Title",
            "summary": "Brief summary of what this chapter covers."
          }
        ]
      }
    }`;
    
    let aiResult;
    if (process.env.OPENAI_API_KEY) {
      console.log("Using OpenAI for course outline generation...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: PROMPT }],
        response_format: { type: "json_object" }
      });
      const rawText = completion.choices[0].message.content;
      console.log("Raw OpenAI Response:", rawText);
      aiResult = JSON.parse(rawText);
    } else {
      console.log("Using Gemini for course outline generation...");
      const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);
      const rawText = aiResp?.response?.text();
      console.log("Raw Gemini Response:", rawText);
      aiResult = JSON.parse(rawText);
    }

    // Insert into DB
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseID,
      topic,
      courseType,
      difficulty,
      createdBy,
      courseLayout: aiResult,
    }).returning();

    // Trigger Inngest to generate chapter notes
    try {
      await inngest.send({
        name: "notes.generate",
        data: {
          course: dbResult[0]
        }
      });
    } catch (inngestError) {
      console.warn("⚠️ Inngest 'notes.generate' event skipped. Ensure you run 'npx inngest-cli@latest dev' to handle background tasks.");
    }

    return NextResponse.json({ outline: dbResult[0] });

  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
