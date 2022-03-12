import React from "react";

function TableFooter(props) {
  return (
    <tfoot>
      <tr>
        <th colSpan="12">
          <div className="ui-toolbar">
            <select className="input-xs mr-5   ">
              <option value="10">10 linhas</option>
              <option value="20">20 linhas</option>
              <option value="30">30 linhas</option>
              <option value="40">40 linhas</option>
              <option value="50">50 linhas</option>
            </select>
            <div
              className="ml-5   y"
              firsttext="«"
              lasttext="»"
              nexttext="›"
              previoustext="‹"
            >
              <ul className="pagination ml-5">
                <li className="pagination-first page-item disabled ">
                  <a className="page-link" href="">
                    «
                  </a>
                </li>
                <li className="pagination-prev page-item disabled ">
                  <a className="page-link" href="">
                    ‹
                  </a>
                </li>
                <li className="pagination-page page-item active ">
                  <a className="page-link" href="">
                    1
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    2
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    3
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    4
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    5
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    6
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    7
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    8
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    9
                  </a>
                </li>
                <li className="pagination-page page-item ">
                  <a className="page-link" href="">
                    10
                  </a>
                </li>
                <li className="pagination-next page-item ">
                  <a className="page-link" href="">
                    ›
                  </a>
                </li>
                <li className="pagination-last page-item ">
                  <a className="page-link" href="">
                    »
                  </a>
                </li>
              </ul>
            </div>
            <div className="ui-toolbar-group-right">
              {" "}
              Número de registros: 1109
            </div>
          </div>
        </th>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
