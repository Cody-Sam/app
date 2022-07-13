import GlowCard from "../../components/GlowCard";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "/src/modules/User";

function AccountIndex() {
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <div className="flex flex-wrap gap-24 items-start justify-center py-8">
      <GlowCard header="This is your account page" />
      <GlowCard header="Change your deets" />
      <GlowCard header="These are only here" />
      <GlowCard header="To demonstrate" />
      <GlowCard header="page scrolling" />
    </div>
  );
}

export default AccountIndex;
