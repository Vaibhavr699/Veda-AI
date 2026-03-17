import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { courseId } = params;
    const { searchParams } = new URL(req.url);
    const chapterId = searchParams.get('chapterId');

    if (!chapterId) {
        return NextResponse.json({ error: "Chapter ID is required" }, { status: 400 });
    }

    try {
        const result = await db.select()
            .from(CHAPTER_NOTES_TABLE)
            .where(
                and(
                    eq(CHAPTER_NOTES_TABLE.courseId, courseId),
                    eq(CHAPTER_NOTES_TABLE.chapterId, parseInt(chapterId))
                )
            );

        if (result.length === 0) {
            return NextResponse.json({ notes: null });
        }

        return NextResponse.json({ notes: result[0].notes });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
