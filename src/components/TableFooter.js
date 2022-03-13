import React from "react";
import Paginator from "./Paginator";
import "./TableFooter.css";

function TableFooter({ count }) {
  console.log("count", count);
  return (
    <tfoot>
      <tr>
        <th colSpan={12}>
          <div className="d-inline-flex w-100">
            <select className="form-control table-footer-select me-5">
              <option value="10">10 linhas</option>
              <option value="20">20 linhas</option>
              <option value="30">30 linhas</option>
              <option value="40">40 linhas</option>
              <option value="50">50 linhas</option>
            </select>
            <Paginator />
            <div className={"w-100 text-end"}>
              <label>Número de registros: {count}</label>
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
