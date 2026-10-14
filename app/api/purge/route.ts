import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const adminToken = request.headers.get("x-admin-token") || "";
  if (!process.env.ADMIN_TOKEN || adminToken !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30); // 30 days ago

  try {
    // find users scheduled for deletion past cutoff
    const users = await prisma.user.findMany({
      where: {
        deletedAt: {
          lte: cutoff,
        },
      },
      select: { id: true, email: true, deletedAt: true },
    });

    if (!users || users.length === 0) {
      // record audit that purge ran but nothing to delete
      await prisma.audit.create({
        data: {
          actor: "admin",
          action: "PURGE_RUN",
          details: JSON.stringify({ deleted: 0, note: "no eligible users" }),
        },
      });

      return NextResponse.json({ ok: true, deleted: 0 });
    }

    const userIds = users.map((u) => u.id);

    // Perform deletes in a transaction: remove messages, then users, and write an audit record
    const deleteMessages = prisma.message.deleteMany({ where: { userId: { in: userIds } } });
    const deleteUsers = prisma.user.deleteMany({ where: { id: { in: userIds } } });
    const audit = prisma.audit.create({
      data: {
        actor: "admin",
        action: "PURGE",
        details: JSON.stringify({ deletedUserIds: userIds, count: userIds.length }),
      },
    });

    const [messagesResult, usersResult, auditRecord] = await prisma.$transaction([deleteMessages, deleteUsers, audit]);

    return NextResponse.json({ ok: true, deleted: usersResult.count, details: { messagesDeleted: messagesResult.count, auditId: auditRecord.id } });
  } catch (error) {
    console.error("Purge failed:", error);
    try {
      await prisma.audit.create({
        data: {
          actor: "admin",
          action: "PURGE_ERROR",
          details: String(error instanceof Error ? error.message : JSON.stringify(error)),
        },
      });
    } catch (e) {
      console.error("Failed to write purge error audit:", e);
    }
    return NextResponse.json({ error: "Purge failed" }, { status: 500 });
  }
}
