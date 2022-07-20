import React, { useState } from "react";

import ContentWrapper from "components/ContentWrapper";
import Card from "components/Card";

import ProductForm from "./form/ProductForm";

function CreateProduct() {
  const [formState, setFormState] = useState("unsent");

  if (formState === "unsent") {
    return (
      <ContentWrapper.Flex>
        <Card padding="4">
          <Card.Body>
            <ProductForm product={{}} method="POST" setFormState={setFormState} />
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

export default CreateProduct;
