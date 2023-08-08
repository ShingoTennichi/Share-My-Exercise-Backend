import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";
import { UpdateLIKE } from "@/types/types";

export async function PUT(request: Request, response: Response) {
  try {
    const { id: postId, like }: UpdateLIKE = await request.json();

    const data = await globalPrisma.post.update({
      where: {
        id: postId,
      },
      data: {
        like: like,
      },
    });

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error");
  }
}
