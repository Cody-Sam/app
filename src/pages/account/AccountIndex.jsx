import GlowCard from "components/GlowCard";
import { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "modules/user";
import ContentWrapper from "components/ContentWrapper";
import { PageContainer } from "../../components/StyledComponents";

function AccountIndex() {
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  return (
    <PageContainer>
      <ContentWrapper.Flex>
        <Link to="../../shop">
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">Start Shopping</h1>
            </GlowCard.Body>
          </GlowCard>
        </Link>
        <Link to="../../build">
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">Build Your PC</h1>
            </GlowCard.Body>
          </GlowCard>
        </Link>
        <Link to="../../orders">
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">View Your Orders</h1>
            </GlowCard.Body>
          </GlowCard>
        </Link>
      </ContentWrapper.Flex>
    </PageContainer>
  );
}
export default AccountIndex;
