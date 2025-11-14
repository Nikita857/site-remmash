// app/api/jwt-token/route.ts
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;

    if (!secret) {
      console.error("NEXTAUTH_SECRET is not defined");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const token = await getToken({
      req: request,
      secret: secret,
    });

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Безопасно возвращаем информацию о токене
    return Response.json({
      user: {
        id: token.sub,
        email: token.email,
        name: token.name,
      },
      expires: token.exp,
      issuedAt: token.iat,
      message: "JWT token is being used internally by NextAuth.js",
    });
  } catch (error) {
    return Response.json({
      error: error,
      status: 500,
    });
  }
}
