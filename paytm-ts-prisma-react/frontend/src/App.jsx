import { Route, Routes, BrowserRouter} from "react-router-dom";
import './output.css'
import {Dashboard} from "./components/Dashboard.jsx";
import {lazy, Suspense} from "react";
import {Nav} from "./components/Nav.jsx";
const Signup = lazy( () => import('./components/Signup.jsx'));
const Signin = lazy( () => import('./components/Signin.jsx'));

function App() {
  return (
    <div className="p-1">
      <BrowserRouter history={history}>
        <Nav />
        <Routes>
          <Route path='/' element={<Suspense fallback={'...Loading'}><Dashboard/></Suspense> }></Route>
          <Route path='/signin' element={<Suspense fallback={'...Loading'}><Signin/></Suspense> }></Route>
          <Route path='/signup' element={<Suspense fallback={'...Loading'}><Signup/></Suspense> }></Route>
          <Route path='*' element={<Suspense fallback={'...Loading'}><Dashboard/></Suspense> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
