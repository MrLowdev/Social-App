import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { LikeType } from "@/types/type";
import prisma from "@/DB/db.config";

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }

    const payload: LikeType = await request.json();

    if (!payload.post_id || !payload.toUserId) {
      return NextResponse.json(
        {
          status: 400,
          message: "Bad request. Please pass post id",
        },
        { status: 400 }
      );
    }

    if (payload.status === "1") {
      await prisma.notification.create({
        data: {
          user_id: session.user?.id?.toString()!,
          toUser_id: payload.toUserId,
          content: "Liked your post.",
        },
      });
      await prisma.post.update({
        where: {
          id: payload.post_id,
        },
        data: {
          like_count: {
            increment: 1,
          },
        },
      });

      await prisma.likes.create({
        data: {
          user_id: session?.user?.id?.toString()!,
          post_id: payload.post_id,
        },
      });
    } else if (payload.status === "0") {
      await prisma.post.update({
        where: {
          id: payload.post_id,
        },
        data: {
          like_count: {
            decrement: 1,
          },
        },
      });

      await prisma.likes.deleteMany({
        where: {
          user_id: session?.user?.id?.toString()!,
          post_id: payload.post_id,
        },
      });
    }
    return NextResponse.json(
      {
        status: 200,
        message:
          payload.status == "1"
            ? "Post Liked successfully!"
            : "Post Disliked successfully!",
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
