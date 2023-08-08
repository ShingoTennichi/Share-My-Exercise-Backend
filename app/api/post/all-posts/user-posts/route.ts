import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";
import { UserId } from "@/types/types";

export async function POST(request: Request, response: Response) {
  try {
    const { id: userId }: UserId = await request.json();
    const prisma = globalPrisma;
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        postAuthorId: {
          select: {
            imgUrl: true,
            like: true,
            text: true,
            createdAt: true,
          },
        },
      },
    });

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error");
  }
}
