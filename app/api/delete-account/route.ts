import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.update({
      where: { email: session.user.email.toString().toLowerCase() },
      data: { deletedAt: new Date() },
    });

    // write audit record for scheduling deletion
    try {
      await prisma.audit.create({
        data: {
          actor: session.user.email.toString().toLowerCase(),
          action: "SCHEDULE_DELETE",
          details: JSON.stringify({ userId: user.id }),
        },
      });
    } catch (auditErr) {
      console.error("Failed to write schedule-delete audit:", auditErr);
    }

    return NextResponse.json({ ok: true, id: user.id });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
