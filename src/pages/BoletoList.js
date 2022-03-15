import React, { useContext, useEffect, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import { getBoletos } from "../services/boletoService";
import LoadingContext from "../context/LoadingContext";

function BoletoList(props) {
  const [pageParams, setPageParams] = useState({ page: 0, pageSize: 5 });
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const columns = ["Nome", "CPF/CNPJ", "Vencimento", "Valor"];
  const fields = ["payer_name", "payer_cpf_cnpj", "due_date", "total"];
  const context = useContext(LoadingContext);

  useEffect(() => {
    async function fetch() {
      context.showMessage("buscando boletos...");
      const result = await getBoletos(pageParams.page, pageParams.pageSize);
      await setRowData(result.data.items);
      await setTotalCount(result.data.totalItems);
      context.closeMessage();
    }
    fetch();
  }, [pageParams]);

  return (
    <Page title={"Boletos"}>
      <div className="mini-content">
        <ResponsiveTable
          rowData={rowData}
          totalCount={totalCount}
          columns={columns}
          fields={fields}
          pageParams={pageParams}
          setPageParams={setPageParams}
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
