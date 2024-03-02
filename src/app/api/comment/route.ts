import prisma from "@/DB/db.config";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { commentSchema } from "@/validators/CommentSchema";

export async function POST(request: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }
    const data = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(commentSchema);
    const payload = await validator.validate(data);
    await prisma.post.update({
      where: {
        id: payload.post_id,
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });

    await prisma.notification.create({
      data: {
        user_id: session?.user?.id?.toString()!,
        toUser_id: payload.toUser_id,
        content: "Comment on your post",
      },
    });

    await prisma.comment.create({
      data: {
        post_id: payload.post_id,
        content: payload.content,
        user_id: session?.user?.id?.toString()!,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Comment added successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { status: 500, message: "Internal server issue" },
      { status: 500 }
    );
  }
}
