import { useSetRecoilState } from 'recoil';
import {authAtom} from "../state/auth.jsx";
import {usersAtom} from "../state/user.jsx";
import { useNavigate} from "react-router-dom";
import {useFetchWrapper} from "./useFetchWrapper.jsx";

export function useUserActions() {
  // const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const baseUrl = 'http://localhost:3000/api/v1';
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  return {
    signup,
    signin,
    logout,
    getAll
  }

  function signup(firstName, lastName, userName, password) {
    return fetchWrapper.post(`${baseUrl}/user/signup`, { firstName, lastName, userName, password })
      .then(async res => {
        localStorage.setItem('user', JSON.stringify(res));
        setAuth(res);
        navigate('/');
      })
  }

  function signin(userName, password) {
    console.log(userName, password);
    return fetchWrapper.post(`${baseUrl}/user/signin`, {userName, password})
      .then(async res => {
        localStorage.setItem('user', JSON.stringify(res));
        setAuth(res);
        navigate('/');
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('user');
    setAuth(null);
    navigate('/signin');
  }

  function getAll() {
    return fetchWrapper.get(`${baseUrl}/user/bulk`)
      .then(async res => {
        setUsers(res);
      });
  }

}
