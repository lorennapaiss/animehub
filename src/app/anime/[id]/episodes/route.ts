import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://api.jikan.moe/v4";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const page = req.nextUrl.searchParams.get("page") ?? "1";

  const upstream = await fetch(`${BASE}/anime/${id}/episodes?page=${page}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
