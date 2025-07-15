import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");
  if (!fileId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  const res = await fetch(driveUrl);
  if (!res.ok) {
    return NextResponse.json({ error: "Drive fetch failed" }, { status: res.status });
  }

  const arrayBuffer = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "image/png";

  return new NextResponse(Buffer.from(arrayBuffer), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
