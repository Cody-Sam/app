import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
    `}
`

const Submit = styled.button`
  ${tw`
        bg-gray-800 border px-2 rounded mx-2 my-4 ring
    `}
`;

const NewProductForm = styled.form`
  ${tw`
  flex
  flex-col
  width[50%]
        text-black
    `}
`;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [compatability, setCompatability] = useState("");
    const [image, setImage] = useState("");
    
    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }
    const handleImage = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setFileToBase(file)
        console.log(file)
    }

  const productSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: name,
      description: description,
      type: type,
      price: price,
      compatability: compatability,
      quantity: quantity,
      image: image,
    };
    const res = await fetch("http://localhost:4000/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    })
      const { url } = await res.json()
      window.location = url
  };

    return (
      <PageContainer>
        <NewProductForm onSubmit={productSubmit}>
          <input
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            name="description"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            name="type"
            value={type}
            placeholder="Type"
            onChange={(e) => {
              setType(e.target.value);
            }}
          ></input>
          <input
            name="compatability"
            value={compatability}
            placeholder="Compatability notworkingyet"
            onChange={(e) => {
              setCompatability(e.target.value);
            }}
          ></input>
          <input
            name="quantity"
            type="number"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          ></input>
          <input
            name="price"
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          ></input>
          <input
            name="image"
            type="file"
            onChange={handleImage}
          ></input>
          <Submit type="submit">Create</Submit>
        </NewProductForm>
      </PageContainer>
    );
};

export default CreateProduct;
