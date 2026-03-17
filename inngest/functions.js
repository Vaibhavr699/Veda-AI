import { db } from "@/configs/db";
import { inngest } from "./client";

import { eq } from "drizzle-orm";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { generateNotesAIModel, openai } from "@/configs/AiModel";


export const GenerateNotes = inngest.createFunction(
  { id: "generate-notes" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data; // Includes courseId, courseLayout, etc.

    // 1. Generate Notes for each chapter
    const notesResult = await step.run("Generate Chapter Notes", async () => {
      const chapters = course?.courseLayout?.chapters || course?.courseLayout?.course?.chapters;
      
      if (!chapters) {
        console.log("No chapters found in course layout");
        return;
      }

      for (const [index, chapter] of chapters.entries()) {
        const PROMPT = `Generate detailed study notes for the chapter: "${chapter.chapterTitle || chapter.title}". 
        Topic: ${course.topic}. 
        Difficulty: ${course.difficulty}.
        Include:
        - Detailed explanation (approx 500 words)
        - Key concepts with bullet points
        - Example (if technical, provide code snippets or practical applications)
        Format in beautiful Github-flavored Markdown.`;

        let notes = '';
        if (process.env.OPENAI_API_KEY) {
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: PROMPT }],
          });
          notes = completion.choices[0].message.content;
        } else {
          const result = await generateNotesAIModel.sendMessage(PROMPT);
          notes = result.response.text();
        }

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course.courseID,
          notes: notes,
        });
      }


      // 2. Update status of the course to 'Ready'
      await db.update(STUDY_MATERIAL_TABLE)
        .set({ status: 'Ready' })
        .where(eq(STUDY_MATERIAL_TABLE.courseID, course.courseID));
      
      return "Success";
    });

    return { success: true, result: notesResult };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const user = event.data?.user;

    const result = await step.run(
      "Check User and Create if Not in DB",
      async () => {
        const existingUser = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (existingUser?.length === 0) {
          const userResp = await db
            .insert(USER_TABLE)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: USER_TABLE.id });

          return { status: "created", userId: userResp[0].id };
        } else {
          return { status: "exists", userId: existingUser[0].id };
        }
      }
    );

    return {
      success: true,
      message: "User check and creation handled successfully.",
      result,
    };
  }
);
