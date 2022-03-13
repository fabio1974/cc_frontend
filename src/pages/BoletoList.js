import React, { useEffect, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import { getBoletos } from "../services/boletoService";

function BoletoList(props) {
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const columns = ["Nome", "CPF/CNPJ", "Vencimento", "Valor"];
  const fields = ["payer_name", "payer_cpf_cnpj", "due_date", "total"];

  useEffect(() => {
    async function fetch() {
      const result = await getBoletos();
      await setRowData(result.data.items);
      await setTotalCount(result.data.totalItems);
    }

    fetch();
  }, []);

  return (
    <Page title={"Boletos"}>
      <div className="mini-content">
        <ResponsiveTable
          rowData={rowData}
          totalCount={totalCount}
          columns={columns}
          fields={fields}
        />
        <Link className="btn btn-primary btn-sm mt-2 " to={"/boletoForm"}>
          <i className="fa fa-plus-circle mr-1" />
          Cadastrar Novo Boleto
        </Link>
      </div>
    </Page>
  );
}

export default BoletoList;
