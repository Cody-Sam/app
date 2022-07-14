import { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import GlowCard from "../../components/GlowCard";
import { UserContext } from "../../modules/User";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState({
    errors: { form: null, email: null, password: null },
  });
  const navigate = useNavigate();
  const {
    userStore: { status, user, token },
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
        break;
    }
  }

  function LoginForm() {
    return (
      <div className="flex flex-wrap gap-24 items-start justify-center py-8">
        <div className="w-full flex-col px-2">
          <div className="text-center">Login</div>
          <form
            className="text-white flex flex-wrap"
            onSubmit={(event) => login(event)}
          >
            <label htmlFor="email" className="w-full mx-2">
              email:
              <span className="text-red-500">
                {formState.errors.email && formState.errors.email}
              </span>
            </label>
            <input
              className={`w-full bg-black mx-2 px-2 ring rounded ${
                formState.errors.email && "ring-red-500"
              }`}
              type="text"
              name="email"
              value={email}
              placeholder="your-email@example.com"
              onChange={(event) => {
                setEmail(" ");
                setEmail(event.target.value);
              }}
            ></input>

            <label htmlFor="password" className="mt-4 mx-2">
              password:
              <span className="text-red-500">
                {formState.errors.password && formState.errors.password}
              </span>
            </label>
            <input
              className={`w-full bg-black mx-2 px-2 ring rounded ${
                formState.errors.password && "ring-red-500"
              }`}
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>

            <input
              type="submit"
              value="Login"
              className="bg-gray-800 border px-2 rounded mx-2 my-4 ring"
            />
            {formState.errors.form && (
              <p className="my-auto bg-gray-900 text-red-500 border-red-500 rounded border px-2">
                {formState.errors.form}
              </p>
            )}
          </form>
          <div className="text-center">
            <Link to="/auth/signup/">Sign Up</Link> | Forgot Password
          </div>
        </div>
      </div>
    );
  }

  if (token) {
    if (status === "authorising") {
      return (
        <div className="flex flex-wrap gap-24 items-start justify-center py-8">
          <GlowCard>Validating Account</GlowCard>
        </div>
      );
    } else if (status === "authorised") {
      return <Navigate to="/account" />;
    }
  } else {
    return <LoginForm />;
  }
}

export default LoginPage;
