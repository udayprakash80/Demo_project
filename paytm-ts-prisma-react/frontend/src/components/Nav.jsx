import {useRecoilValue} from "recoil";
import {useUserActions} from "../action/user.actions.jsx";
import {authAtom} from "../state/auth.jsx";

export function Nav() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  console.log(auth);

  if(!auth) return null;

  return (
    <div className="flex justify-between">
      <div className="text-2xl font-bold pt-1">Payments App</div>
      <div className="flex space-x-4">
        <div className="pt-2">Hello, {auth?.firstName}</div>
        <div className="p-2 hover:cursor-pointer"><a onClick={userActions.logout} className="nav-item nav-link">Logout</a></div>
      </div>
    </div>
  )
}
