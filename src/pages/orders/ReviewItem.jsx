import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Button = styled.button`
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

const ReviewItem = ({product}) => {
  const [stars, setStars] = useState("");
  const [comment, setComment] = useState("");
  const addReview = async (e) => {
    e.preventDefault();
    const review = {
      stars: stars,
      comment: comment,
    };
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/products/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.token}`,
        },
        body: JSON.stringify({ _id: product._id, review: review }),
      }
    );
    const status = await res.json();
  };
  return (
    <form className="flex flex-col items-center justify-center" onSubmit={addReview}>
      <input
        className="text-black "
        value={stars}
        type="Number"
        onChange={(e) => setStars(e.target.value)}
        placeholder="Stars"
      ></input>
      <input
        className="text-black"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="Text"
        placeholder="Review"
      ></input>
      <Button type="submit">Leave A Review</Button>
    </form>
  );
};

export default ReviewItem;
