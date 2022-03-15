import React from "react";

function TableHeader({ columns, fetch }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="text-center">
            {column}
          </th>
        ))}
        <th className="text-center">
          <button
            onClick={() => fetch()}
            className="btn btn-primary btn-sm ml-3 mr-3"
          >
            Filtrar
          </button>
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
