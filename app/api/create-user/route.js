// app/api/create-user/route.js
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { user } = await req.json();

        let result = null;
        try {
            result = await inngest.send({
                name: "user.create",
                data: {
                    user: user,
                },
            });
        } catch (inngestError) {
            console.warn("⚠️ Inngest 'user.create' event skipped. Ensure you run 'npx inngest-cli@latest dev' to handle background tasks.");
        }

        return NextResponse.json({ success: true, result });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
