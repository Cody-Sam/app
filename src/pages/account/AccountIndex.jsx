import GlowCard from "../../components/GlowCard";
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "/src/modules/User";
import ContentWrapper from "../../components/ContentWrapper";

function AccountIndex() {
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  if (token) {
    if (!user) {
      return (
        <div className="flex flex-wrap gap-24 items-start justify-center py-8">
          {/* <GlowCard> */}
          <p>validating account</p>
          {/* </GlowCard> */}
        </div>
      );
    } else {
      return (
        <ContentWrapper.Flex>
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">
                This is your account page
              </h1>
            </GlowCard.Body>
          </GlowCard>
        </ContentWrapper.Flex>
      );
    }
  } else {
    return <Navigate to="/auth/login" />;
  }
}
export default AccountIndex;
