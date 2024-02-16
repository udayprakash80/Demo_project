import zod from 'zod';
export const signUpSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
})

export const signInSchema = zod.object({
  userName: zod.string(),
  password: zod.string()
})

export const todoSchema = zod.object( {
  title: zod.string(),
  description: zod.string()
})

export  const todoUpdateSchema = zod.object({
  id: zod.number(),
  done: zod.boolean()
})

export  const transferUpdateSchema = zod.object({
  amount: zod.string(),
  receiver: zod.string()
})
