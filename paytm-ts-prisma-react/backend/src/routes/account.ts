import {findUserByUsername, findUserNAccountByUsername} from "../Table/User";
import {getAccountByUserId, transfer} from "../Table/Account";
import {transferUpdateSchema} from "../model/schema";
import express from "express";
import {AuthMiddleware} from "../middleware";

export const accountRouter = express.Router();

accountRouter.get('/balance', AuthMiddleware, (req, res) => {
  findUserByUsername(req.body.userId).then(r => {
    if(r) {
      getAccountByUserId(r.id).then(data => {
        res.status(200).json({balance: data?.balance});
      });
    } else { res.status(400).json({status: 400, message: "Invalid token"}); }
  })
})


accountRouter.post('/transfer', AuthMiddleware, (req, res) => {
  const schema = transferUpdateSchema.safeParse(req.body);
  if(!schema.success) {
    res.json({message: 'invalid input'});
  } else {
    findUserNAccountByUsername(req.body.userId).then(sender => {
      if (sender) {
        if (sender && sender.account.balance >= parseInt(req.body.amount)) {
          findUserNAccountByUsername(req.body.receiver).then(receiver => {
            if (receiver) {
              transfer(sender.id, sender.account.balance - parseInt(req.body.amount), receiver.id, receiver.account.balance + parseInt(req.body.amount)).then(data => {
                if(data){
                  res.status(200).json({status: 200, message: "Amount transferred", data: data});
                } else{
                  res.status(400).json({status: 440, message: 'Transfer Failed'})
                }

              });
            } else { res.status(400).json({status: 400, message: 'No receiver found'})}
          })
        } else { res.status(400).json({status: 400, message: "Insufficient Balance"})}
      } else { res.status(400).json({status: 400, message: 'No sender found'})}
    })
  }
})
