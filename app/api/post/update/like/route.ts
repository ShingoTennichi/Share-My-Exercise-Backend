import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";

export async function PUT(request: Request, response: Response) {
  try {
    const { postId, like } = await request.json();

    const data = await globalPrisma.post.update({
      where: {
        id: postId,
      },
      data: {
        like: like,
      },
    });
    console.log(data);
    return createResponse("success", data);
  } catch (e) {
    return createResponse("error")
  }
}
