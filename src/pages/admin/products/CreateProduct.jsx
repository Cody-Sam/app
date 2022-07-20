import React, { useState, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import { parts, sockets } from "modules/parts";
import { MdAddBox } from "react-icons/md";
import { UserContext } from "modules/user";
import { useNavigate } from "react-router-dom";

const Submit = styled.button`
  ${tw`
        bg-gray-800 border px-2 rounded mx-2 my-4 ring
    `}
`;

const FormInput = ({ name, value, placeholder, onChange }) => {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    ></input>
  );
};
function FormNumber({ name, value, onChange }) {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      type="number"
      onChange={(event) => onChange(Number(event.target.value))}
    ></input>
  );
}
function FormFile({ name, value, onChange }) {
  return (
    <input
      className="w-full h-6 bg-black ring rounded"
      name={name}
      value={value}
      type="file"
      onChange={(event) => onChange(event)}
    ></input>
  );
}

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
      className={`h-6 bg-black w-${width} ${formatted && "ring rounded"}`}
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
    <label className="px-2 pt-2" htmlFor={htmlFor}>
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
  const [compatibility, setCompatibility] = useState([]);
  const [compatType, setCompatType] = useState("");
  const [compatSocket, setCompatSocket] = useState("");
  const [image, setImage] = useState("");
  const [formState, setFormState] = useState("unsent");

  const { userStore } = useContext(UserContext);
  const navigate = useNavigate();

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const productSubmit = async (e) => {
    e.preventDefault();
    setFormState("pending");
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
        authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(productData),
    });
    console.log(res.status);
    const data = await res.json();
    setFormState("unsent");
    if (res.status === 201) {
      const url = data.url.split("/").splice(-1);
      console.log(url);
      const prompt = window.confirm(
        "Would you like to go to this items shop page?"
      );
      if (prompt) {
        navigate(`/shop/item/${url}`);
      } else {
        navigate("/admin/products/new");
      }
    }
    console.log(data);
  };
  if (formState === "unsent") {
    return (
      <ContentWrapper.Flex>
        <Card padding="4">
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
                onChange={(e) => {
                  let prompt = true;
                  if (type) {
                    prompt = window.confirm(
                      "Changing this will remove any compatibility information already entered"
                    );
                  }
                  if (prompt) {
                    setType(e.target.value);
                    setCompatibility([]);
                    setCompatType("");
                    setCompatSocket("");
                  } else {
                    e.target.value = type;
                  }
                }}
                options={parts}
              />

              <FormLabel htmlFor="price" label="Price" />
              <FormNumber name="price" value={price} onChange={setPrice} />

              <FormLabel htmlFor="quantity" label="Stock Quantity" />
              <FormNumber
                name="quantity"
                value={quantity}
                onChange={setQuantity}
              />

              {type && (
                <>
                  <FormLabel
                    htmlFor="compatibility"
                    label="Item Compatibility"
                  />
                  <div className="w-full flex ring rounded">
                    <div className="grow">
                      <FormSelect
                        name="compatType"
                        value={compatType}
                        onChange={(e) => setCompatType(e.target.value)}
                        formatted={false}
                        width="full"
                        options={
                          parts.find((part) => part.slug === type).sockets
                        }
                      />
                      {compatType && (
                        <FormSelect
                          name="compatSocket"
                          value={compatSocket}
                          onChange={(e) => setCompatSocket(e.target.value)}
                          formatted={false}
                          width="full"
                          options={
                            sockets.find((socket) => socket.slug === compatType)
                              .options
                          }
                        />
                      )}
                    </div>
                    <div className="w-6">
                      <button
                        type="button"
                        onClick={() => {
                          setCompatibility([
                            ...compatibility,
                            {
                              type: compatType,
                              socket: compatSocket,
                            },
                          ]);
                        }}
                      >
                        <MdAddBox size="1.5em" />
                      </button>
                    </div>
                  </div>
                </>
              )}
              {compatibility && (
                <>
                  {compatibility.map((item) => {
                    return (
                      <div>
                        {item.type} | {item.socket}
                      </div>
                    );
                  })}
                </>
              )}

              <FormLabel htmlFor="image" label="Product Image" />
              <FormFile name="image" onChange={handleImage} />
              <Submit type="submit">Create</Submit>
            </form>
          </Card.Body>
        </Card>
      </ContentWrapper.Flex>
    );
  } else if (formState === "pending") {
    return (
      <ContentWrapper.Flex>
        <Card>
          <Card.Body>Please Wait...</Card.Body>
        </Card>
      </ContentWrapper.Flex>
    );
  }
};

export default CreateProduct;
