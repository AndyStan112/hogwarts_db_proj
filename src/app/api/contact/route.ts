import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { sql } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, user_email, subject, message } = body;

    if (!name || !user_email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    console.log(body)
    await sql`
      INSERT INTO contact (name, user_email, subject, message)
      VALUES (${name}, ${user_email}, ${subject}, ${message})
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST /api/contact:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
