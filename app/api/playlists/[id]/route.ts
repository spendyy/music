const { PrismaClient } = require("@prisma/client");
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const otvet = parseInt(req.nextUrl.pathname.split("/").pop() || "1");

  const playlist = await prisma.playlistAuthor.findUnique({
    where: { id: otvet },
  });
  return NextResponse.json(playlist);
}
