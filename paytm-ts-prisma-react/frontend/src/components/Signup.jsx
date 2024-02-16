import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useRecoilValue} from "recoil";
import {authAtom} from "../state/auth.jsx";
import {useUserActions} from "../action/user.actions.jsx";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();

  if(auth && auth !== null){
    navigate('/');
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ firstName, lastName, userName, password  }) {
    return userActions.signup(firstName, lastName, userName, password )
      .catch(error => {
        setError('apiError', { message: error });
      });
  }
return (
  <div className="bg-gray-200">
    <div className= "flex flex-row min-h-screen justify-center items-center">
      <div className="bg-white rounded-lg p-5">
        <div className="flex justify-center text-4xl font-bold">Sign Up</div>
        <div className="flex justify-center text-xl text-slate-500 p-2">Enter your information to create an account</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="pt-5 pb-2 font-bold">First Name</div>
              <div>
                <input className="border-solid border-2 p-3 w-full rounded-lg" name="firstName" type="text" {...register('firstName')} placeholder="First Name"/>
                <div className="text-xs">{errors.firstName?.message}</div>
              </div>
          </div>

          <div className="form-group">
            <div className="pt-5 pb-2 font-bold">Last Name</div>
            <div>
              <input className="border-solid border-2 p-3 w-full rounded-lg" name="lastName" type="type" {...register('lastName')} placeholder="Last Name" />
              <div className="text-xs">{errors.lastName?.message}</div>
            </div>
          </div>
          <div className="form-group">
            <div className="pt-5 pb-2 font-bold">Email</div>
            <div>
              <input className="border-solid border-2 p-3 w-full rounded-lg" name="userName" type="type" {...register('userName')} placeholder="Email" />
              <div className="text-xs">{errors.userName?.message}</div>
            </div>
          </div>
          <div className="form-group">
            <div className="pt-5 pb-2 font-bold">Password</div>
            <div>
              <input className="border-solid border-2 p-3 w-full rounded-lg" type="password" {...register('password')} placeholder="Password"/>
              <div className="text-xs">{errors.password?.message}</div>
            </div>
          </div>
            <div className="pt-5">
            <button className="bg-slate-900 p-3 text-white w-full rounded-lg text-lg">Sign Up</button>
          </div>
        </form>

        <div className="flex justify-center text-lg text-slate-500 p-2">
          Already have an account?
          <button className="pl-2 underline hover:text-slate-900 hover:cursor-pointer" onClick={() => { console.log('login')
            navigate('/signin'); }}>Login
          </button>
        </div>
      </div>
    </div>
  </div>
)
}
