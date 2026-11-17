import { NextRequest, NextResponse } from "next/server";
import { SUPPORT_SYSTEM_PROMPT } from "@/lib/support-prompt";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 },
      );
    }

    const trimmed = messages.slice(-10);

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "The Content Review Team is away. Please try again later." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-flash",
        messages: [
          { role: "system", content: SUPPORT_SYSTEM_PROMPT },
          ...trimmed,
        ],
        temperature: 0.85,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[support] deepseek error:", res.status, errText);
      return NextResponse.json(
        {
          error:
            "The Content Review Team is reviewing your request. The Content Review Team is very tired.",
        },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ??
      "The Content Review Team has no comment.";

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("[support] unexpected error:", e);
    return NextResponse.json(
      {
        error:
          "The Content Review Team is aware. The Content Review Team is not aware.",
      },
      { status: 500 },
    );
  }
}
