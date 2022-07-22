import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button } from '../../../components/StyledComponents';

const PageContainer = styled.div`
  ${tw`
    h-full
    w-full
    flex
    items-center
    justify-center
    flex-col
    `}
`;

const Text = styled.h1`
  ${tw`
    text-5xl
    border-2
    p-6
    border-gray-900
  `}
`;

const PaymentFailurePage = () => {
  return (
    <PageContainer>
      <Text>Payment Failed</Text>
      <Link to="../../shop">
        <Button className="mt-5">Return to cart</Button>
      </Link>
    </PageContainer>
  );
}

export default PaymentFailurePage