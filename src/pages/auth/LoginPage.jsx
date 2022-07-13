import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../modules/User";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState({ errors: null });
  const navigate = useNavigate();
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  async function login(event) {
    event.preventDefault();
    const credentials = { email: email, password: password };
    const res = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    switch (res.status) {
      case 201:
        console.log("login successful");
        userDispatch({
          type: "login",
          data: { user: data.user, token: data.token },
        });
        navigate("/account");
        break;
      default:
        setFormState({
          ...formState,
          errors: { form: "Invalid Login Data", email: "*", password: "*" },
        });
        console.log(formState);
        break;
    }
  }
  if (useContext(UserContext).undefined) {
    return <></>;
  } else {
    if (user) {
      return (<Navigate to="/account" />);
    } else {
      return (
        <div className="flex flex-wrap gap-24 items-start justify-center py-8">
          <div className="bg-slate-600 w-full max-w-md mx-4 flex-col p-4">
            <div className="text-center">Login</div>
            <form
              className="text-white flex flex-wrap"
              onSubmit={(event) => login(event)}
            >
              <label htmlFor="email" className="w-full">
                email:
              </label>
              <input
                className="w-full bg-black"
                type="text"
                name="email"
                value={email}
                placeholder="your-email@example.com"
                onChange={(event) => {
                  setEmail(" ");
                  setEmail(event.target.value);
                }}
              ></input>

              <label htmlFor="password" className="">
                password:
              </label>
              <input
                className="bg-black w-full"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default LoginPage;
