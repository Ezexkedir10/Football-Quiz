import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const score = await prisma.score.create({
    data: {
      name: body.name,
      score: body.score,
    }
  });

  return NextResponse.json(score);
}

