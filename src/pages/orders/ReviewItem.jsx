import React, { useState } from "react";

const ReviewItem = ({product}) => {
  const [stars, setStars] = useState("");
  const [comment, setComment] = useState("");
  const addReview = async (e) => {
    e.preventDefault();
    const review = {
      stars: stars,
      comment: comment,
    };
    const res = await fetch("http://localhost:4000/api/v1/products/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify({ _id: product._id, review: review }),
    });
    const status = await res.json();
  };
  return (
    <form onSubmit={addReview}>
      <input
        className="text-black"
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
      <button type="submit">Leave A Review</button>
    </form>
  );
};

export default ReviewItem;
