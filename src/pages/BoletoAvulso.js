import React, { useEffect } from "react";
import Page from "../components/Page";
import BoletoForm from "./BoletoForm";

function BoletoAvulso({ setShowSidebar }) {
  useEffect(() => {
    setShowSidebar(true);
  });

  return (
    <Page title={"Boleto Avulso"}>
      <BoletoForm />
    </Page>
  );
}

export default BoletoAvulso;
