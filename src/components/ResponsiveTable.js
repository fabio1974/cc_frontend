import React, { useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

function ResponsiveTable({ objs, columns, fields }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-xs">
        <TableHeader columns={columns} />
        <TableBody objs={objs} fields={fields} />
        <TableFooter />
      </table>
    </div>
  );
}

export default ResponsiveTable;
