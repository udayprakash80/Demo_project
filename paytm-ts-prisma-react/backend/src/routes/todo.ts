import {AuthMiddleware} from "../middleware";
import {todoSchema, todoUpdateSchema} from "../model/schema";
import {findUserByUsername} from "../Table/User";
import {createTodo, getTodos, getTodosAndUserDetails, updateToDo} from "../Table/Todo";
import express from "express";

export const todoRouter = express.Router();
todoRouter.post('/todo', AuthMiddleware, (req, res) => {
  const schema = todoSchema.safeParse(req.body);
  if(!schema.success) {
    res.json({message: 'invalid input'});
  } else {
    findUserByUsername(req.body.userId).then(r => {
      if(r) {
        createTodo(r.id, req.body.title, req.body.description).then(data => {
          res.json({message: "Todo Added", data: data});
        });
      }
    })
  }
})

todoRouter.put('/todo', AuthMiddleware, (req, res) => {
  const schema = todoUpdateSchema.safeParse(req.body);
  if(!schema.success) {
    res.json({message: 'invalid input'});
  } else {
    updateToDo(req.body.id, req.body.done).then(data => {
      res.json({message: "Todo Updated", data: data});
    });
  }
})



todoRouter.delete('/todo', AuthMiddleware, (req, res) => {

})

todoRouter.get('/todos', AuthMiddleware, (req, res) => {
  findUserByUsername(req.body.userId).then(r => {
    if(r) {
      getTodos(r.id).then(data => {
        res.json({data: data});
      });
    }
  })
})

todoRouter.get('/userTodos', AuthMiddleware, (req, res) => {
  findUserByUsername(req.body.userId).then(r => {
    if(r) {
      getTodosAndUserDetails(r.id).then(data => {
        res.json({data: data});
      });
    }
  })
})
