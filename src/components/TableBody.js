import React from "react";

function TableBody({ rowData, fields, buildActions }) {
  let tbody = (
    <>
      <tbody>
        {rowData.map((obj) => {
          return (
            <tr key={obj.id} className="">
              {[
                ...fields.map((field, index) => (
                  <td
                    key={index}
                    className={index === 0 ? "text-start" : "text-center"}
                  >
                    {field === "status"
                      ? translateStatus(obj[`${field}`])
                      : obj[`${field}`]}
                  </td>
                )),
                <td key={fields.lenght + 1} className="text-center">
                  {buildActions(obj)}
                </td>,
              ]}
            </tr>
          );
        })}
      </tbody>
    </>
  );
  return tbody;
}

export default TableBody;

const translateStatus = (status) => {
  switch (status) {
    case "pending":
      return "pendente";
    case "paid":
      return "paga";
    case "canceled":
      return "cancelada";
    case "in_analysis":
      return "em análise";
    case "draft":
      return "rascunho";
    case "partially_paid":
      return "parcialmente paga";
    case "refunded":
      return "reembolsada";
    case "expired":
      return "expirada";
    case "in_protest":
      return "em protesto";
    case "chargeback":
      return "contestada";
    default:
      return "unknow";
  }
};
