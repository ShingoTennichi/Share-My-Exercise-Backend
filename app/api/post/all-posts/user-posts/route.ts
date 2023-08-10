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

    if (!data) throw Error();

    const userPosts: userPosts = {
      id: data.id,
      author: `${data.firstName} ${data.lastName}`,
      userPosts: data.postAuthorId.reverse(),
    };

    return createResponse("success", userPosts);
  } catch (e) {
    return createResponse("error");
  }
}

type userPosts = {
  id: number;
  author: string;
  userPosts: userPost[];
};

type userPost = {
  imgUrl: string | null;
  like: number;
  text: string | null;
  createdAt: Date;
};
