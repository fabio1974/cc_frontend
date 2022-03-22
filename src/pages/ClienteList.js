import React, { useContext, useEffect, useState } from "react";
import ResponsiveTable from "../components/ResponsiveTable";
import Page from "../components/Page";
import LoadingContext from "../context/LoadingContext";
import { getClientes } from "../services/clienteService";
import { Link } from "react-router-dom";
import { GiGears } from "react-icons/gi";

function ClienteList(props) {
  const [pageParams, setPageParams] = useState({ page: 0, pageSize: 10 });
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const columns = [
    "Nome",
    "Email",
    "CPF/CNPJ",
    "Telefone",
    "Cidade",
    "Última Atualização",
  ];
  const fields = ["name", "email", "cpf_cnpj", "phone", "city", "created_at"];
  const context = useContext(LoadingContext);

  const buildActions = (obj) => <GiGears />;

  useEffect(() => {
    async function fetch() {
      context.showMessage("buscando clientes...");
      const result = await getClientes(pageParams.page, pageParams.pageSize);
      await setRowData(result.data.items);
      await setTotalCount(result.data.totalItems);
      context.closeMessage();
    }
    fetch();
  }, [pageParams]);

  return (
    <Page title={"Clientes"}>
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
          Cadastrar Novo Cliente
        </Link>
      </div>
    </Page>
  );
}

export default ClienteList;
