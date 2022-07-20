import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";
import ProductForm from "./form/ProductForm";

function EditProduct() {
  const [formState, setFormState] = useState("unsent");
  const [product, setProduct] = useState({});
  const { item } = useParams();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/products/${item}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchData();
  }, []);

  if (formState === "unsent") {
    return (
      <ContentWrapper.Flex>
        <Card padding="4">
          <Card.Body>
            <ProductForm product={product} method="PUT" setFormState={setFormState} />
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
}

export default EditProduct;
