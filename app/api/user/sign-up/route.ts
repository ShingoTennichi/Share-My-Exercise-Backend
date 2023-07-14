import { SignUpInfo } from "@/types/types";
import { globalPrisma } from "../../../../prisma/globalPrismaClient";
import bcrypt from "bcrypt";


export async function POST(request: Request, response: Response): Promise<Response> {
  try {
    // get request body
    const {firstName, lastName, email, password}: SignUpInfo = await request.json();
    const prisma: globalPrisma = globalPrisma;

    // need to verify user input
    const check = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(check) throw new Error("The Email is already registered");

    // hash password before storing
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // save user data to database
    const data = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({
      data: {
        status: "Success",
        message: "Successfully processed",
        result: data
      }
    }))

  } catch (error) {
    return new Response(JSON.stringify({data: {
      status: "Error",
      message: `${error}`,
      result: {}
    }}))
  };
}
