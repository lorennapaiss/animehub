import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://api.jikan.moe/v4";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";

  const upstream = await fetch(`${BASE}/anime/${id}/episodes?page=${page}`, {
    headers: { Accept: "application/json" },
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
