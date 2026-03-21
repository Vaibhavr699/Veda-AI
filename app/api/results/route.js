import { db } from "@/configs/db";
import { TEST_RESULTS_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        const result = await db.select({
            id: TEST_RESULTS_TABLE.id,
            courseId: TEST_RESULTS_TABLE.courseId,
            examType: TEST_RESULTS_TABLE.examType,
            score: TEST_RESULTS_TABLE.score,
            totalQuestions: TEST_RESULTS_TABLE.totalQuestions,
            feedback: TEST_RESULTS_TABLE.feedback,
            createdAt: TEST_RESULTS_TABLE.createdAt,
            topic: STUDY_MATERIAL_TABLE.topic
        })
            .from(TEST_RESULTS_TABLE)
            .leftJoin(STUDY_MATERIAL_TABLE, eq(TEST_RESULTS_TABLE.courseId, STUDY_MATERIAL_TABLE.courseID))
            .where(eq(TEST_RESULTS_TABLE.userEmail, email))
            .orderBy(desc(TEST_RESULTS_TABLE.id));

        return NextResponse.json({ results: result });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
