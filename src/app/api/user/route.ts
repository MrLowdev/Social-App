import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function GET(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Un-Authorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: session.user?.id?.toString(),
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
      },
    });
    return NextResponse.json({ status: 200, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server issue" },
      { status: 500 }
    );
  }
}
