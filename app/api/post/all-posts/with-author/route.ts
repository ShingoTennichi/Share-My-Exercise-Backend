import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";

export async function POST(request: Request, response: Response) {
  try {
    const prisma: globalPrisma = globalPrisma;
    const data = await prisma.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // reverse to display from newer posts to older posts
    data.reverse();

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error", {});
  }
}
