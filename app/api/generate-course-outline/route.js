import { courseOutlineAIModel } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    const { courseID, topic, courseType, difficulty, createdBy } = await req.json();

    // Log input
    console.log("Received Data:", { courseID, topic, courseType, difficulty, createdBy });

    const PROMPT = `Generate a course outline for the following topic: ${topic}, course type: ${courseType}, difficulty: ${difficulty}, created by: ${createdBy}`;
    
    const aiResp = await courseOutlineAIModel.sendMessage(PROMPT);

    // Log AI raw output
    const rawText = aiResp?.response?.text();
    console.log("Raw AI Response:", rawText);

    // Parse AI response
    let aiResult;
    try {
      aiResult = JSON.parse(rawText);
    } catch (jsonErr) {
      console.error("JSON Parse Error:", rawText);
      throw new Error("❌ AI response is not valid JSON");
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
    await inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0]
      }
    });

    return NextResponse.json({ outline: dbResult[0] });

  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
