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
                    {obj[`${field}`]}
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
