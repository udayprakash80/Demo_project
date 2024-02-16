import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTodo(userId: number, title: string, description: string){
  const res = await prisma.todo.create({ data: {
      userId: userId, title: title, description: description
    }
  });
  return res;
}

export async  function updateToDo(id: number, done: boolean){
  const res = await prisma.todo.update({
    where: { id },
    data: { done }
  })
  return res;
}

export async function getTodos(userId: number){
  const res = await prisma.todo.findMany({ where:{
      userId: userId
    }})
  return res;
}

export async function getTodosAndUserDetails(userId: number, ) {
  const res = await prisma.todo.findMany({
    where: {
      userId: userId
    },
    select: {
      user: true,
      title: true,
      description: true
    }
  });
  return res;
}

