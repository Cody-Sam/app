import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Auth (){
  return (<LoginPage />)
}

Auth.Login = LoginPage;
Auth.Register = RegisterPage;

export default Auth;