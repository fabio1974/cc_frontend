import React from "react";
import Paginator from "./Paginator";
import "./TableFooter.css";

function TableFooter({ count, pageParams, setPageParams }) {
  const totalPages = Math.ceil(count / pageParams.pageSize);

  function onChange($event) {
    setPageParams({ ...pageParams, pageSize: $event.target.value });
  }

  return (
    <tfoot>
      <tr>
        <th colSpan={12}>
          <div className="d-inline-flex w-100">
            <select
              onChange={onChange}
              value={pageParams.pageSize}
              className="form-control table-footer-select me-5"
            >
              <option value="5">05 linhas</option>
              <option value="10">10 linhas</option>
              <option value="20">20 linhas</option>
              <option value="30">30 linhas</option>
              <option value="40">40 linhas</option>
              <option value="50">50 linhas</option>
            </select>

            <Paginator
              pageParams={pageParams}
              totalPages={totalPages}
              setPageParams={setPageParams}
            />

            <div className={"w-100 text-end"}>
              <label>No de Pág: {totalPages}</label>
            </div>

            <div className={"w-100 text-end"}>
              <label>No de registros: {count}</label>
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
