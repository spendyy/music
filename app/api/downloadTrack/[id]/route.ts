const { PrismaClient } = require("@prisma/client");
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  const otvet = parseInt(req.nextUrl.pathname.split("/").pop() || "10");

  const track = await prisma.trackDownload.findUnique({
    where: { trackDownloadId: otvet },
  });

  return NextResponse.json(track);
}

export async function PUT(req: NextRequest) {
  try {
    const otvet = parseInt(req.nextUrl.pathname.split("/").pop() || "10");
    const obnovlyalka = await req.json();

    if (typeof obnovlyalka.count !== "number") {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const track = await prisma.Track.update({
      where: { trackId: otvet },
      data: {
        listenCount: obnovlyalka.count,
      },
    });

    return NextResponse.json({ message: "ALL GOOD", track }, { status: 200 });
  } catch (error) {
    console.error("Error updating track:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
