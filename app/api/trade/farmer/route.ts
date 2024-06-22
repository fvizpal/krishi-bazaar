import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, quantity, expectedPrice, imageUrl, location } = await req.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const commodity = await db.commodity.create({
      data: {
        userId: user.id as string,
        name,
        imageUrl,
        expectedPrice,
        quantity,
        location,
        sold: false,
      }
    })

  } catch (error) {

  }
}