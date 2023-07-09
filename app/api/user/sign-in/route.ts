import { globalPrisma } from "@/prisma/globalPrismaClient";
import { SignInInfo } from "@/types/types";
import bcrypt from "bcrypt";

export async function POST(request: Request, response: Response) {
  const { email, password }: SignInInfo = await request.json();
  const prisma: globalPrisma = globalPrisma;
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(!data) throw new Error("The user does not exists");
    if(await bcrypt.compare(password, data.password)) {
      return new Response(JSON.stringify({
        data: {
          status: "Success",
          message: "Successfully processed",
          result: {
            userId: data.id
          }
        }
      }))
    } else {
      throw new Error("Password did not match")
    }
  } catch(error) {
      return new Response(JSON.stringify({
        data: {
          status: "Error",
          message: `Error: ${error}`,
          result: {}
        }
      }))
  }


}
globalPrisma