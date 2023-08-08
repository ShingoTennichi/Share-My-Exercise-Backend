import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";
import { NewPost } from "@/types/types";

export async function POST(request: Request, response: Response) {
  try{
    const { authorId, imgUrl, text }: NewPost = await request.json();
    const prisma: globalPrisma = globalPrisma;

    // save post data to database
    const data = await prisma.post.create({
      data: {
          authorId: authorId,
          imgUrl: imgUrl,
          text: text
      }
    })

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error");
  }
}