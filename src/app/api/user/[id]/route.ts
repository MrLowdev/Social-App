import prisma from "@/DB/db.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
      select: {
        name: true,
        id: true,
        email: true,
        username: true,
        image: true,

        Post: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            Likes: {
              where: {
                user_id: params.id,
              },
            },
          },
        },
        Comment: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: 200,
        data: users,
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
