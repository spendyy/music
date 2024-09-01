const { PrismaClient } = require("@prisma/client");
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const playlists = await prisma.playlistAuthor.findMany();
  return NextResponse.json(playlists);
}
