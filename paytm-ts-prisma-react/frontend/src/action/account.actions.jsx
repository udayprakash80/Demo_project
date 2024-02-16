import {useRecoilValue, useSetRecoilState} from 'recoil';
import {accountAtom} from "../state/account"
import {useFetchWrapper} from "./useFetchWrapper.jsx";

export function useAccountActions() {
  const baseUrl = 'http://localhost:3000/api/v1';
  const account = useRecoilValue(accountAtom);
  const setAccount = useSetRecoilState(accountAtom);
  const fetchWrapper = useFetchWrapper();

  return {
    getBalance,
    sendMoney
  }

  function sendMoney(amount, receiver) {
    return fetchWrapper.post(`${baseUrl}/account/transfer`, { amount, receiver })
      .then(async res => {
        if(res.status == 200){
          setAccount({...account, balance: res.data[0].balance});
        }
      })
  }

  function getBalance() {
    return fetchWrapper.get(`${baseUrl}/account/balance`)
      .then(async res => {
        // console.log(res);
        setAccount(res);
      });
  }

}
