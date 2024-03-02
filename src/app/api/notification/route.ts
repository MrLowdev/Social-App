import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function GET(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }

    const notifications = await prisma.notification.findMany({
      where: {
        toUser_id: session?.user?.id?.toString(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(
      { status: 200, data: notifications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server issue" },
      { status: 500 }
    );
  }
}
