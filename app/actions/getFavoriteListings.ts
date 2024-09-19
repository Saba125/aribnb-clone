import { prisma } from "@/prisma";
import { currentUser } from "./getCurrentUser";
export default async function getFavoriteListings() {
  try {
    const user = await currentUser();
    if (!user) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error) {
    throw new Error();
  }
}
