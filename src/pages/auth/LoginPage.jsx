import { useState, useContext} from "react";
import { UserContext } from "../../modules/User";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userStore, userDispatch} = useContext(UserContext)
  let user = userStore.user
  let token = userStore.token

  async function login(event){
    event.preventDefault();
    const credentials = { email: email, password: password };
    const res = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    userDispatch({
      type: "login",
      data:{user:data.user, token: data.token}
    })
  };

  return (
    <div>
      <div>Login</div>
      <form className="bg-green-800 text-black" onSubmit={(event)=>login(event)}>
        <label>
          email:
          <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} ></input>
        </label>

        <label>
          password:
          <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
        </label>
        <input type="submit" value="Login" />
      </form>
      <div>{user && "user logged in"}</div>
      <div>{token && "Has token"}</div>
    </div>
  );
}

export default LoginPage;
