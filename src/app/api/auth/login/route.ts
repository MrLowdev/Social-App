import prisma from "@/DB/db.config";
import { CustomErrorReporter } from "@/validators/CustomErrorReporter";
import { loginSchema } from "@/validators/authSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validate = vine.compile(loginSchema);
    const payload = await validate.validate(body);
    const isUserExist = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (isUserExist) {
      const isPasswordSame = bcrypt.compareSync(
        payload.password,
        isUserExist.password!
      );
      if (isPasswordSame) {
        return NextResponse.json(
          {
            status: 200,
            message: "you logged in successfully",
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          status: 400,
          errors: {
            message: "Invalid credentials",
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: 400,
        errors: {
          message: "No account found with this email",
        },
      },
      { status: 400 }
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
        message: "Internal server issue",
      },
      { status: 500 }
    );
  }
}
