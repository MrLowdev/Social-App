import prisma from "@/DB/db.config";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { registerSchema } from "@/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(registerSchema);
    const payload = await validator.validate(body);
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
      },
    });
    if (isEmailExist) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            message: "Email already taken. please use another email.",
          },
        },
        { status: 400 }
      );
    }

    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            message: "Username already taken. please use another username.",
          },
        },
        { status: 400 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    await prisma.user.create({ data: payload });
    return NextResponse.json(
      {
        status: 200,
        message: "Account created successfully. Please login into your account",
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
      {
        errors: "Internal server error",
      },
      { status: 500 }
    );
  }
}
