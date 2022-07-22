import GlowCard from "components/GlowCard";
import { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "modules/user";
import ContentWrapper from "components/ContentWrapper";
import { PageContainer } from "../../components/StyledComponents";

function AdminIndex() {
  const {
    userStore: { user, token },
    userDispatch,
  } = useContext(UserContext);

  return (
    <PageContainer>
      <ContentWrapper.Flex>
        <Link to="../products">
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">Manage Products</h1>
            </GlowCard.Body>
          </GlowCard>
        </Link>
        <Link to="../orders">
          <GlowCard>
            {/* <GlowCard.Header /> */}
            <GlowCard.Body>
              <h1 className="text-4xl z-20 text-center">View Orders</h1>
            </GlowCard.Body>
          </GlowCard>
        </Link>
      </ContentWrapper.Flex>
    </PageContainer>
  );
}
export default AdminIndex;
