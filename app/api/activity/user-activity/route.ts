import { globalPrisma } from "@/prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";
import { UserId } from "@/types/types";

export async function POST(request: Request, response: Response) {
  try {
    const { id: userId }: UserId = await response.json();

    // get al activities matched to the user id requested
    const data = await globalPrisma.userActivity.findMany({
      where: {
        id: userId,
      },
    });

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error", {});
  }
}
