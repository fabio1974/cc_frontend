import React, { useEffect, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import { getBoletos } from "../services/boletoService";

function BoletoList(props) {
  const [boletos, setBoletos] = useState([]);
  const columns = ["Nome", "CPF/CNPJ", "Vencimento", "Valor"];
  const fields = ["payer_name", "payer_cpf_cnpj", "due_date", "total"];

  useEffect(() => {
    async function fetch() {
      const result = await getBoletos(); // httpService.get();// axios('http://localhost:8080/api/boletos')
      await setBoletos(result.data.items);
    }

    fetch();
  }, []);

  return (
    <Page title={"Boletos"}>
      <div className="mini-content">
        <ResponsiveTable objs={boletos} columns={columns} fields={fields} />
        <Link className="btn btn-primary btn-sm mt-2 " to={"/boletoForm"}>
          <i className="fa fa-plus-circle mr-1" />
          Cadastrar Novo Boleto
        </Link>
      </div>
    </Page>
  );
}

export default BoletoList;
