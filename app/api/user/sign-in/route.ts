import { globalPrisma } from "@/prisma/globalPrismaClient";
import { SignInInfo } from "@/types/types";
import { createResponse } from "@/util/createResponse";
import bcrypt from "bcrypt";

export async function POST(request: Request, response: Response) {
  try {
    const { email, password }: SignInInfo = await request.json();

    const data = await globalPrisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if the email already exists in database
    if (!data) throw new Error();

    // compare password and hashed password
    if (await bcrypt.compare(password, data.password)) {
      return createResponse("success", data);
    } else {
      throw new Error();
    }
  } catch (error) {
    return createResponse("error");
  }
}
