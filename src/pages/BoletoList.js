import React, { useContext, useEffect, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import { getBoletos } from "../services/boletoService";
import LoadingContext from "../context/LoadingContext";
import { FaFileInvoiceDollar } from "react-icons/fa";

function BoletoList(props) {
  const [pageParams, setPageParams] = useState({ page: 0, pageSize: 10 });
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const columns = ["Nome", "CPF/CNPJ", "Vencimento", "Valor", "Status"];
  const fields = [
    "payer_name",
    "payer_cpf_cnpj",
    "due_date",
    "total",
    "status",
  ];
  const context = useContext(LoadingContext);

  const buildActions = (obj) => (
    <a href={obj["secure_url"]} target="_blank" rel="noreferrer">
      <FaFileInvoiceDollar title={"Boleto"} />
    </a>
  );

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
          buildActions={buildActions}
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
