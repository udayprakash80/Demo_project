import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getAccountByUserId(userId: number){
  const res = await prisma.account.findUnique({
    where: {userId: userId}
  })
  return res;
}

export async function updateBalance(userId: number, balance: number){
  const res = await prisma.account.update({
    where: {userId},
    data: {balance}
  })
  return res;
}

export async function getAccountAndUserDetails(userId: number, ) {
  const res = await prisma.account.findUnique({
    where: {
      userId: userId
    },
    select: {
      user: true,
      balance: true,
    }
  });
  return res;
}

export async function transfer(senderUserId: number, senderAmount: number, receiverUserId: number, receiverAmount: number) {
  try {
    const updateSender = prisma.account.update({
      where: {userId: senderUserId},
      data: { balance: senderAmount}
    })
    const updateReceiver = prisma.account.update({
      where: {userId: receiverUserId},
      data: {balance: receiverAmount}
    })
    return await prisma.$transaction([updateSender, updateReceiver]);
  } catch (e){
    console.log(e);
  }

}
