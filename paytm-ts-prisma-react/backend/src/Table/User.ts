import { PrismaClient } from "@prisma/client";
import {User} from "../model/paytm";

const prisma = new PrismaClient();

export async function findUserByUsername(userName: string){
  const res = await prisma.user.findFirst({
    where: {
      userName: userName
    }
  });
  return res;
}

export async function findUserNAccountByUsername(userName: string) {
  const res = await prisma.user.findUnique({
    where: {
      userName: userName
    },
    select:{
      id: true,
      userName: true,
      firstName: true,
      lastName: true,
      account: true
    }
  });
  return res as User;
}

export async function findAllUser(){
  const res = await prisma.user.findMany({});
  return res;
}

export async function createUser(userName: string, password: string, firstName: string, lastName: string){
  const res = await prisma.user.create({
    data: {
      userName,
      password,
      firstName,
      lastName
    }
  });
  if(res){
    const accountRes = await prisma.account.create({
      data: {
        balance: 1000,
        userId: res.id
      }
    })
    return {user: res, account: accountRes};
  }
  return res;
}

interface UpdateParams {
  firstName: string,
  lastName: string
}

export async function updateUser(userName: string, {
  firstName,
  lastName
}: UpdateParams){

  const res = await prisma.user.update({
    where: { userName },
    data: {
      firstName,
      lastName
    }
  })
  return res
}

export async function deleteUser(userName: string){
  const res = await prisma.user.delete({
    where: {
      userName: userName
    }
  });
  return res
}
