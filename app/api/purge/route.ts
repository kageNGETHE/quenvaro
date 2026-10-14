import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const adminToken = request.headers.get("x-admin-token") || "";
  if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30); // 30 days ago

  try {
    const result = await prisma.user.deleteMany({
      where: {
        deletedAt: {
          lte: cutoff,
        },
      },
    });

    return NextResponse.json({ ok: true, deleted: result.count });
  } catch (error) {
    console.error("Purge failed:", error);
    return NextResponse.json({ error: "Purge failed" }, { status: 500 });
  }
}
