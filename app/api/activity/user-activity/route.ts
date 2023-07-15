import { globalPrisma } from "@/prisma/globalPrismaClient";

export async function POST(request: Request, response: Response) {
  try {
    // get request body
    const { id } = await response.json();

    const prisma: globalPrisma = globalPrisma;
    // get al activities matched to the user id requested
    const data = await prisma.userActivity.findMany({
      where: {
        authorId: id
      }
    });

    return new Response(
      JSON.stringify({
        data: {
          status: "Success",
          message: "Successfully processed",
          result: data,
        },
      })
    );
  }catch(e) {
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
