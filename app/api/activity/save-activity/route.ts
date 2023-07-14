import { globalPrisma } from "@/prisma/globalPrismaClient";
import { Activity } from "@/types/types";

export async function POST(response: Response, request: Request) {
  try {
    // get request body
    const { authorId, activityId, startedAt, finishedAt, duration }: Activity = await response.json();
    const prisma: globalPrisma = globalPrisma;

    // save user activity data to database
    const data = await prisma.userActivity.create({
      data: {
        authorId: authorId,
        activityId: activityId,
        startedAt: startedAt.toString(),
        finishedAt: finishedAt.toString(),
        duration: duration
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
  }catch(e){
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
};