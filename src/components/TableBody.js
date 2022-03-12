import React from "react";

function TableBody({ objs, fields }) {
  let tbody = (
    <>
      <tbody>
        {objs.map((obj) => {
          return (
            <tr key={obj.id} className="">
              {[
                ...fields.map((field, index) => (
                  <td key={index} className="text-center">
                    {obj[`${field}`]}
                  </td>
                )),
                <td key={fields.lenght + 1} className="text-center">
                  bla-bla
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
