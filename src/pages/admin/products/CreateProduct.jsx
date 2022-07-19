import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts, sockets } from "modules/parts";

const Submit = styled.button`
  ${tw`
        bg-gray-800 border px-2 rounded mx-2 my-4 ring
    `}
`;

const FormInput = ({ name, value, type, placeholder, onChange }) => {
  return (
    <input
      className="w-full bg-black mx-2 px-2 ring rounded"
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(type == "number" ? Number(e.target.value) : e.target.value);
      }}
    ></input>
  );
};

const FormSelect = ({
  name,
  width = "full",
  formatted = true,
  placeholder,
  onChange,
  options,
}) => {
  return (
    <select
      className={`bg-black w-${width} ${
        formatted && " mx-2 px-2 ring rounded"
      }`}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    >
      <option value=""></option>
      {options.map((option) => {
        return (
          <option key={option.slug} value={option.slug}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

const FormLabel = ({ htmlFor, label, children }) => {
  return (
    <label className="px-4 pt-2" htmlFor={htmlFor}>
      {children || label}
    </label>
  );
};

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [compatibility, setCompatibility] = useState("");
  const [compatType, setCompatType] = useState("");
  const [compatSocket, setCompatSocket] = useState("");
  const [image, setImage] = useState("");

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const productSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: name,
      description: description,
      type: type,
      price: price,
      compatibility: compatibility,
      quantity: quantity,
      image: image,
    };
    const res = await fetch("http://localhost:4000/api/v1/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.token}`,
      },
      body: JSON.stringify(productData),
    });
    const { url } = await res.json();
    window.location = url;
  };

  return (
    <ContentWrapper.Flex>
      <Card>
        <Card.Body>
          <form className="text-white flex flex-col" onSubmit={productSubmit}>
            <FormLabel htmlFor="name" label="Name" />
            <FormInput name="name" value={name} onChange={setName} />

            <FormLabel htmlFor="description" label="Description" />
            <FormInput
              name="description"
              value={description}
              onChange={setDescription}
            />

            <FormLabel htmlFor="type" label="Type" />
            <FormSelect
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={parts}
              className="w-2/3 bg-black"
            />

            <FormLabel htmlFor="price" label="Price" />
            <FormInput
              name="price"
              type="number"
              value={price}
              onChange={setPrice}
            />

            <FormLabel htmlFor="quantity" label="Stock Quantity" />
            <FormInput
              name="quantity"
              type="number"
              value={quantity}
              onChange={setQuantity}
            />

            {type && (
              <>
                <FormLabel htmlFor="compatibility" label="Item Compatibility" />
                <div className="w-full ring rounded mx-2">
                  <FormSelect
                    name="compatType"
                    value={compatType}
                    onChange={(e) => setCompatType(e.target.value)}
                    formatted={false}
                    width="2/3"
                    options={parts.find((part) => part.slug === type).sockets}
                  />
                  {compatType && (
                    <FormSelect
                      name="compatSocket"
                      value={compatSocket}
                      onChange={(e) => setCompatSocket(e.target.value)}
                      formatted={false}
                      width="1/3"
                      options={
                        sockets.find((socket) => socket.slug === compatType)
                          .options
                      }
                    />
                  )}
                </div>
              </>
            )}

            <FormLabel htmlFor="image" label="Product Image" />
            <input name="image" type="file" onChange={handleImage}></input>
            <Submit type="submit">Create</Submit>
          </form>
        </Card.Body>
      </Card>
    </ContentWrapper.Flex>
  );
};

export default CreateProduct;
