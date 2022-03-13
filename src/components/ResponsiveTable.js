import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

function ResponsiveTable({ rowData, totalCount, columns, fields }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-xs">
        <TableHeader columns={columns} />
        <TableBody rowData={rowData} fields={fields} />
        <TableFooter count={totalCount} />
      </table>
    </div>
  );
}

export default ResponsiveTable;
