import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { currentUser } from "@/app/actions/getCurrentUser";
interface IParams {
  reservationId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.error();
  }
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("INvalid id");
  }
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        {
          userId: user.id,
        },
        {
          Listing: { userId: user.id },
        },
      ],
    },
  });
  return NextResponse.json(reservation);
}
