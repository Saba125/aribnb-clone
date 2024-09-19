import { auth } from "@/auth";
import { prisma } from "@/prisma";
export const currentUser = async () => {
  const session = await auth();
  if (!session?.user) {
    console.log("No session or user found");
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
