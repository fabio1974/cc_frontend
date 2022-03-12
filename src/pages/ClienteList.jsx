import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponsiveTable from "../components/ResponsiveTable";
import Page from "../components/Page";

function ClienteList(props) {
  const [clientes, setClientes] = useState([]);
  const columns = [
    "Nome",
    "Email",
    "CPF/CNPJ",
    "Telefone",
    "Cidade",
    "Última Atualização",
  ];
  const fields = ["name", "email", "cpf_cnpj", "phone", "city", "created_at"];

  useEffect(() => {
    async function getClientes() {
      const result = await axios("http://localhost:8080/api/clientes");
      await setClientes(result.data.items);
    }
    getClientes();
  }, []);

  return (
    <Page title={"Clientes"}>
      <div className="mini-content">
        <ResponsiveTable objs={clientes} columns={columns} fields={fields} />
        <button className="btn btn-primary btn-sm mt-2 ">
          <i className="fa fa-plus-circle mr-1" />
          Cadastrar Novo Cliente
        </button>
      </div>
    </Page>
  );
}

export default ClienteList;
