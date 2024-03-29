import prisma from "@/DB/db.config";
import { NextRequest, NextResponse } from "next/server";
import { CustomSession, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import vine, { errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { postSchema } from "@/validators/postSchema";
import { imageValidator } from "@/validators/imageValidator";
import { join } from "path";
import { getRandomNumber } from "@/lib/utils";
import { writeFile } from "fs/promises";

export async function GET(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { id: true, name: true, username: true },
        },
        Likes: {
          take: 1,
          where: {
            user_id: session?.user?.id?.toString(),
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(
      {
        status: 200,
        data: posts,
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

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { status: 401, message: "Un-Authorized" },
        { status: 401 }
      );
    }
    const formData = await req.formData();

    const data = { content: formData.get("content"), image: "" };

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);
    const image = formData.get("image") as File | null;
    if (image) {
      const isImageNotValid = imageValidator(image?.name, image?.size);
      if (isImageNotValid) {
        return NextResponse.json(
          {
            status: 400,
            errors: {
              content: isImageNotValid,
            },
          },
          { status: 400 }
        );
      }

      try {
        const buffer = Buffer.from(await image!.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "/uploads");
        const uniqueName = Date.now() + "_" + getRandomNumber(1, 999999);
        const imgExt = image?.name.split(".");
        const filename = uniqueName + "." + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);
        data.image = filename;
      } catch (error) {
        return NextResponse.json(
          {
            status: 500,
            message: "Something went wrong.Please try again later.",
          },
          { status: 500 }
        );
      }
    }
    await prisma.post.create({
      data: {
        content: payload.content,
        user_id: session.user?.id?.toString()!,
        image: data.image ?? null,
      },
    });

    return NextResponse.json(
      {
        status: 200,
        message: "Post created successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: 500, message: "Internal server issue" },
      { status: 500 }
    );
  }
}
