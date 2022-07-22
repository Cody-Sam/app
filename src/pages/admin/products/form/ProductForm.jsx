import { MdAddBox, MdRemoveCircle } from "react-icons/md";
import { parts, sockets } from "modules/parts";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "modules/user";
import { useNavigate } from "react-router-dom";
import FormFile from "./FormFile";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormNumber from "./FormNumber";
import FormSelect from "./FormSelect";

import styled from "styled-components";
import tw from "twin.macro";

function ProductForm({ product, method, setFormState }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [compatibility, setCompatibility] = useState([]);
  const [compatType, setCompatType] = useState("");
  const [compatSocket, setCompatSocket] = useState("");
  const [image, setImage] = useState("");
  const { userStore } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (product.name) {
      setName(product.name);
      setDescription(product.description);
      setType(product.type);
      setPrice(Number(product.price) / 100);
      setQuantity(product.quantity);
      setCompatibility(product.compatibility);
    }
  }, [product]);

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
  };

  const productSubmit = async (e) => {
    e.preventDefault();
    setFormState("pending");
    const productData = {
      _id: product._id,
      name: name,
      description: description,
      type: type,
      price: price * 100,
      compatibility: compatibility,
      quantity: quantity,
      image: method == "PUT" ? product.image : image,
    };
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    setFormState("unsent");
    if (res.status === 201) {
      const url = data.url.split("/").splice(-1);
      const prompt = window.confirm(
        "Would you like to go to this items shop page?"
      );
      if (prompt) {
        navigate(`/shop/item/${url}`);
      } else {
        navigate("/admin/products/new");
      }
    } else {
      if (res.status === 200) {
        navigate("/admin/products/");
      }
    }
  };

  return (
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
      <FormNumber name="quantity" value={quantity} onChange={setQuantity} />

      {type && (
        <>
          <FormLabel htmlFor="compatibility" label="Item Compatibility" />
          <div className="w-full flex ring rounded">
            <div className="grow">
              <FormSelect
                name="compatType"
                value={compatType}
                onChange={(e) => setCompatType(e.target.value)}
                formatted={false}
                width="full"
                options={parts.find((part) => part.slug === type).sockets}
              />
              {compatType && (
                <FormSelect
                  name="compatSocket"
                  value={compatSocket}
                  onChange={(e) => setCompatSocket(e.target.value)}
                  formatted={false}
                  width="full"
                  options={
                    sockets.find((socket) => socket.slug === compatType).options
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
        <table className="border">
          <thead>
            <tr>
              <th>Type</th>
              <th>Socket</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {compatibility.map((item, index) => {
              const socketType = sockets.find((s) => s.slug == item.type);
              const socketOption = socketType.options.find(
                (o) => o.slug == item.socket
              );
              return (
                <tr key={index}>
                  <td>{socketType.name}</td>
                  <td>{socketOption.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        let tempCompat = [...compatibility];
                        tempCompat.splice(
                          compatibility.findIndex(
                            (i) =>
                              i.type == item.type && i.socket == item.socket
                          ),
                          1
                        );
                        setCompatibility(tempCompat);
                      }}
                    >
                      <MdRemoveCircle />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <FormLabel htmlFor="image" label="Product Image" />
      <FormFile name="image" onChange={handleImage} />
      <Submit type="submit">{method == "POST" ? "Create" : "Update"} Item</Submit>
    </form>
  );
}

const Submit = styled.button`
  ${tw`
        bg-gray-800 border px-2 rounded mx-2 my-4 ring
    `}
`;

export default ProductForm;
