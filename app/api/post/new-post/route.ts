import { globalPrisma } from "@/prisma/globalPrismaClient";
import { NewPost } from "@/types/types";

export async function POST(request: Request, response: Response) {
  try{
    // get request body
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

    return new Response(
      JSON.stringify({
        data: {
          status: "Success",
          message: "Successfully processed",
          result: data,
        },
      })
    );
  } catch(e) {
    return new Response(
      JSON.stringify({
        data: {
          status: "Error",
          message: `${e}`,
          result: {},
        },
      })
    );
  }
}