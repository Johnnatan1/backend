import prismaClient from "../../prisma/prisma";
import { compare } from 'bcryptjs'

import { sign } from 'jsonwebtoken'

interface AuthUser {
  email: string;
  password: string;

}

class AuthUserService {
  async execute({ email, password }: AuthUser) {
    // Verificar se email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new Error("Usuário/senha incorreto")
    }

    // Verificar se a senha está correta
    const passwordLogin = await compare(password, user.password)

    if(!passwordLogin){
      throw new Error("Senha incorreta")
    }

    // Gerar um token JWT e devolver os dados do usuário como id, name e email
    // Se deu tudo certo vamos gerar um token para usuario
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}

export { AuthUserService };