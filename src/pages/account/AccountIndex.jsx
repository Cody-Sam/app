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
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">
          This is your account page{" "}
        </h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">Change your deets</h1>{" "}
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">These are only here</h1>{" "}
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">To demonstrate</h1>
      </GlowCard>
      <GlowCard>
        <h1 className="text-4xl z-20 text-center">page scrolling </h1>
      </GlowCard>
    </div>
  );
}

export default AccountIndex;
