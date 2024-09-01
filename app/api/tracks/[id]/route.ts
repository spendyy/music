const { PrismaClient } = require("@prisma/client");
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const otvet = parseInt(req.nextUrl.pathname.split("/").pop() || "1");

  const track = await prisma.Track.findMany({
    where: { authorId: otvet },
  });
  return NextResponse.json(track);
}
