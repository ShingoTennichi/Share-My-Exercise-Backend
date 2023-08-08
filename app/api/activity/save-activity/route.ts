import { globalPrisma } from "@/prisma/globalPrismaClient";
import { Activity } from "@/types/types";
import { createResponse } from "@/util/createResponse";

export async function POST(request: Request, response: Response) {
  try {
    const { authorId, activityId, startedAt, finishedAt, duration }: Activity =
      await request.json();

    const data = await globalPrisma.userActivity.create({
      data: {
        authorId: authorId,
        activityId: activityId,
        startedAt: startedAt.toString(),
        finishedAt: finishedAt.toString(),
        duration: duration,
      },
    });

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error");
  }
}
