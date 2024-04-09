import dbConnect from "@/lib/mongo/index";
import Users, { IUsers } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";
import { createJwt, UserJWTPayload } from "@/lib/authHelper";

// to update with authHelper later

export interface IUserPayload extends JwtPayload {
  userId: string;
  isSubscribed: boolean;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const user: IUsers = await Users.findOne({ email: body.email }).exec();
    console.log(body)
    if (!user) {
      return NextResponse.json(
        { message: "No user by that email..." },
        { status: 400 },
      );
    }

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Email or password do not match..." },
        { status: 400 },
      );
    }

    const payload: UserJWTPayload = {
      userId: user._id as string,
      isSubscribed: user.isSubscribed,
    };

    const token = await createJwt(payload);

    cookies().set("accessToken", token, { secure: true, httpOnly: true });
    console.log("token creation", token);

    return NextResponse.json({ message: "Successfully logged in" });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in api/users/login:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
