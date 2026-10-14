import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const adminToken = request.headers.get("x-admin-token") || "";
  if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: { not: null } },
      select: { id: true, email: true, deletedAt: true },
      orderBy: { deletedAt: "desc" },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Failed to fetch pending deletions:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
