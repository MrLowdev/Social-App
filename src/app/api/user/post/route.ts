import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/DB/db.config";

export async function GET(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }

    const post = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        Likes: {
          where: {
            user_id: session?.user?.id?.toString(),
          },
        },
      },
      where: {
        user_id: session?.user?.id?.toString(),
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(
      {
        status: 200,
        data: post,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server issue" },
      { status: 500 }
    );
  }
}
