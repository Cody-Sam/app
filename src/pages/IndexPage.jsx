import GlowCard from "components/GlowCard";
import { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "modules/user";
import ContentWrapper from "components/ContentWrapper";
import { PageContainer } from "../components/StyledComponents";


function IndexPage() {
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  

  return (
    <PageContainer>
      <GlowCard>
        <GlowCard.Body>
          <h1 className="text-4xl text-center">PC BUILDER 9001</h1>
        </GlowCard.Body>
      </GlowCard>
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
      </ContentWrapper.Flex>
    </PageContainer>
  );
}
export default IndexPage;