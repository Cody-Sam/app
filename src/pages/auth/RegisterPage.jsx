import { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import GlowCard from "components/GlowCard";
import { UserContext } from "modules/user";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [formState, setFormState] = useState({
    errors: { form: null, email: null, password: null },
  });
  const navigate = useNavigate();
  const {
    userStore: { status, user, token },
    userDispatch,
  } = useContext(UserContext);

  async function register(event) {
    event.preventDefault();
    const newUser = {
      name: fullName,
      email: email,
      password: password,
      admin: false
    };
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
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
          errors: { form: data.message, email: "*", password: "*" },
        });
        break;
    }
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
    return (
      <div className="flex flex-wrap gap-24 items-start justify-center py-8">
        <div className="w-full flex-col px-2">
          <div className="text-center">Register an Account</div>
          <form
            className="text-white flex flex-wrap"
            onSubmit={(event) => register(event)}
          >
            <label htmlFor="email" className="w-full mx-2">
              Full Name:
              <span className="text-red-500">
                {formState.errors.fullName && formState.errors.fullName}
              </span>
            </label>
            <input
              className={`w-full bg-black mx-2 px-2 ring rounded ${
                formState.errors.email && "ring-red-500"
              }`}
              type="text"
              name="fullName"
              value={fullName}
              placeholder="Your Name"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            ></input>
            <label htmlFor="email" className="w-full mt-4 mx-2">
              Email:
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
                // setEmail(" ");
                setEmail(event.target.value);
              }}
            ></input>

            <label htmlFor="password" className="mt-4 mx-2">
              Password:
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
              value="Register"
              className="bg-gray-800 border px-2 rounded mx-2 my-4 ring"
            />
            {formState.errors.form && (
              <p className="my-auto bg-gray-900 text-red-500 border-red-500 rounded border px-2">
                {formState.errors.form}
              </p>
            )}
          </form>
          <div className="text-center">
            <Link to="/auth/login/">Log In</Link> | Forgot Password
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterPage;
