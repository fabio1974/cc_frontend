import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";

function ResponsiveTable({
  rowData,
  totalCount,
  columns,
  fields,
  setPageParams,
  pageParams,
  buildActions,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-xs">
        <TableHeader columns={columns} setPageParams={setPageParams} />
        <TableBody
          rowData={rowData}
          fields={fields}
          buildActions={buildActions}
        />
        <TableFooter
          pageParams={pageParams}
          setPageParams={setPageParams}
          count={totalCount}
        />
      </table>
    </div>
  );
}

export default ResponsiveTable;
