import express from 'express';
import {signInSchema, signUpSchema} from "../model/schema";
import {createUser, findAllUser, findUserByUsername, findUserNAccountByUsername} from "../Table/User";
import jwt from "jsonwebtoken";
import { AuthMiddleware } from "../middleware";


export const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const schema = signUpSchema.safeParse(req.body);
  if (!schema.success) {
    res.status(411).json({message: "Invalid input"});
  } else {
    const existingUser = await findUserByUsername(req.body.userName);
    if (existingUser) {
      res.json({message: 'User exist'});

    } else {
      createUser(req.body.userName, req.body.password, req.body.firstName, req.body.lastName).then( data => {
        const token = jwt.sign({userId: data.user.userName}, 'udaya');
        res.json({
          message: 'User Created',
          token: token
        });
      })
    }
  }
})

userRouter.post('/signin',async (req, res) => {
  const schema = signInSchema.safeParse(req.body);
  if (!schema.success) {
    res.status(411).json({message: "Invalid input"});
  } else {
    const existingUser = await findUserByUsername(req.body.userName);
    if (existingUser) {
      console.log(req.body.userName);
      const token = jwt.sign({userId: req.body.userName}, 'udaya');
      res.json({
        userName: existingUser.userName,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        token: token
      });
    } else {
      res.json({
        message: "User not found, please sign up"
      })
    }
  }
})

userRouter.get('/userAccount', AuthMiddleware, (req, res) => {
  findUserNAccountByUsername(req.body.userId).then(r => {
    if(r) {
      res.json(r);
    }
  })
})

userRouter.get('/bulk', AuthMiddleware, (req, res) => {
  findAllUser().then(r => {
    if(r) {
      res.json({user: r});
    }
  })
})
