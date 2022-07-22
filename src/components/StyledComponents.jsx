import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

export const Button = styled.div`
  ${tw`
        bg-gray-900
        hover:bg-red-900
        text-white 
        font-bold 
        py-4 
        px-8 
        rounded
        ease-in-out
        duration-200
    `}
`;

export const PageContainer = styled.div`
  ${tw`
    h-[75%]
    w-full
    flex
    items-center
    justify-center
    flex-col
    my-24
  `}
`;