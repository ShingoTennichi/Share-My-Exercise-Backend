import { globalPrisma } from "@/prisma/globalPrismaClient";
import { SignInInfo } from "@/types/types";
import bcrypt from "bcrypt";

export async function POST(request: Request, response: Response) {
  try {
    // get request body
    const { email, password }: SignInInfo = await request.json();
    const prisma: globalPrisma = globalPrisma;

    // check if the email already exists in database
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!data) throw new Error("Make sure email and password are correct");

    // compare password and unhashed password
    if (await bcrypt.compare(password, data.password)) {
      // if match return user data
      return new Response(
        JSON.stringify({
          data: {
            status: "Success",
            message: "Successfully processed",
            result: {
              id: data.id,
            },
          },
        })
      );
    } else {
      throw new Error("Make sure email and password are correct");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        data: {
          status: "Error",
          message: `${error}`,
          result: {},
        },
      })
    );
  }
}
