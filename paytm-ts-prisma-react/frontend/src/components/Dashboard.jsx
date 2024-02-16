import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {authAtom} from "../state/auth.jsx";
import { useNavigate } from 'react-router-dom';
import {useUserActions} from "../action/user.actions.jsx";
import {usersAtom} from "../state/user.jsx";
import {useAccountActions} from "../action/account.actions.jsx";
import {accountAtom} from "../state/account.jsx";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

export function Dashboard() {
  const userActions = useUserActions();
  const accountActions = useAccountActions();
  const users = useRecoilValue(usersAtom);
  const account = useRecoilValue(accountAtom);
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Amount is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState, getValues, trigger } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit =  (data) => {};

  useEffect(() => {
    if(!auth || auth === 'null'){
      navigate('/signup')
    }
  })

  useEffect(() => {
    if(auth && auth !== 'null') {
      userActions.getAll()
        .then(() => {})
    }
  }, []);

  useEffect(() => {
    if(auth && auth !== 'null') {
      accountActions.getBalance()
        .then(() => {})
    }
  }, []);

   async function transfer(receiver) {
     const value = await trigger();
     if (value) {
       const amount = getValues("amount");
       return accountActions.sendMoney(amount, receiver)
         .catch(error => {
           setError('apiError', {message: error});
         });
     }
   }
  return (
    <div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-8">
          <div className="text-lg font-bold pt-1">Your Balance ${account.balance}</div>
          <div className="flex justify-end">
            <div className="form-group flex space-x-1">
              <div className="pt-1 font-bold">Amount:</div>
              <div>
                <input className="border-solid border-2 p-3 w-full rounded-lg" name="amount" type="text" {...register('amount')} placeholder="$... "/>
                <div className="text-xs">{errors.amount?.message}</div>
              </div>
            </div>
          </div>
          <div className="pt-5 pb-5">
            <input className="w-full border-solid border-2 p-1" type="text" placeholder="Search users ... "/>
          </div>
          {users?.user.map(contact =>
            <div className="flex justify-between pt-3" key={contact}>
              <div className="pt-2">{contact.userName}</div>
              <div>
                <button className="rounded-md bg-slate-700 hover:bg-slate-800 text-white p-2" onClick={ () => {transfer(contact.userName).then(r => {})}}>Send Money</button>
              </div>
            </div>)}
        </div>
      </form>
    </div>
  )
}
