import { Quote } from "../../components/auth/quote.auth.jsx";
import { Auth } from "../../components/auth/auth.auth.jsx";

const Login = () => {
  return (
    <div className="grid grid-cols-2 justify-stretch">
       <div><Auth type="login" /></div>
       <div className="bg-slate-200 h-screen flex justify-center invisible md:visible "><Quote/></div>
    </div>
  )
}

export default Login;