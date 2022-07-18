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
export default AccountIndex;
