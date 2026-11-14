import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

const IP_SALT = process.env.TRACK_IP_SALT ?? "agwic-default-salt-change-me";

function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256")
    .update(ip + IP_SALT)
    .digest("hex")
    .slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const events = Array.isArray(body?.events) ? body.events : [];
    if (events.length === 0) {
      return NextResponse.json({ ok: true, inserted: 0 });
    }
    if (events.length > 50) {
      return NextResponse.json(
        { error: "too many events in batch" },
        { status: 413 },
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      // No DB configured yet — accept silently so the front-end doesn't error
      return NextResponse.json({ ok: true, inserted: 0, note: "no-db" });
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;
    const ipHash = hashIp(ip);

    const rows = events.map((e: Record<string, unknown>) => ({
      event_name: String(e.event_name ?? "unknown"),
      page: e.page ? String(e.page) : null,
      product_slug: e.product_slug ? String(e.product_slug) : null,
      category: e.category ? String(e.category) : null,
      session_id: e.session_id ? String(e.session_id) : null,
      referrer: e.referrer ? String(e.referrer) : null,
      ip_hash: ipHash,
      metadata: e.metadata ?? null,
    }));

    const { error } = await supabase.from("events").insert(rows);
    if (error) {
      console.error("[api/track] insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, inserted: rows.length });
  } catch (e) {
    console.error("[api/track] parse error:", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
