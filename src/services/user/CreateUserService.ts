import prismaClient from '../../prisma/prisma';
import { hash } from 'bcryptjs'

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    
    // Verificar se ele enviou um email
    if(!email) {
      throw new Error("Email incorreto")
    }

    // Verificar se o email já existe cadastrado na plataforma
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(userAlreadyExist) {
      throw new Error("Usúario já cadastrado")
    }

    const passwordHash = await hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select:{
        id: true,
        name: true,
        email: true
      }
    })

    return user;

  }
}

export { CreateUserService };