import { globalPrisma } from "../../../../prisma/globalPrismaClient";
import { createResponse } from "@/util/createResponse";
import { SignUpInfo } from "@/types/types";
import bcrypt from "bcrypt";

export async function POST(request: Request, response: Response) {
  try {
    const {firstName, lastName, email, password}: SignUpInfo = await request.json();

    const check = await globalPrisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(check) throw new Error();

    // hash password before storing
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = await globalPrisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    return createResponse("success", data);
  } catch (e) {
    return createResponse("error");
  }
}
