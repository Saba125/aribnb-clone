import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { currentUser } from "@/app/actions/getCurrentUser";
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.error();
  }
  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
