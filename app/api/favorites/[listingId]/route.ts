import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { currentUser } from "@/app/actions/getCurrentUser";
interface IParams {
  listingId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  const user = await currentUser();
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ msg: "Invalid ID" });
  }
  let favoriteIds = [...(user?.favoriteIds || [])];
  console.log(`Favorite id is ${favoriteIds}`);
  favoriteIds.push(listingId);
  const updateUser = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(updateUser);
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ msg: "Invalid ID" });
  }
  let favoriteIds = [...(user.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(updatedUser);
}
