import { NextRequest, NextResponse } from "next/server";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram credentials are not configured." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const language = typeof body?.language === "string" ? body.language : "";

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  const message = [
    "<b>Programare noua Topdentica</b>",
    "",
    `<b>Nume:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    `<b>Limba:</b> ${escapeHtml(language || "necunoscuta")}`,
    `<b>Data:</b> ${escapeHtml(new Date().toLocaleString("ro-MD", {
      timeZone: "Europe/Chisinau",
    }))}`,
  ].join("\n");

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );

  if (!telegramResponse.ok) {
    const telegramError = await telegramResponse.json().catch(() => null);
    console.error("Telegram message could not be sent", {
      status: telegramResponse.status,
      description:
        typeof telegramError?.description === "string"
          ? telegramError.description
          : "Unknown Telegram error",
    });

    return NextResponse.json(
      {
        error: "Telegram message could not be sent.",
        details:
          process.env.NODE_ENV === "development"
            ? telegramError?.description
            : undefined,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
