import React from "react";
import PageTitle from "./PageTitle";

function Page({ title, children }) {
  return (
    <>
      <ol className="breadcrumb bg-light">
        <li className="breadcrumb-item">{title}</li>
      </ol>
      <div className="card mx-3">
        <div className="card-body p-0">
          <div className="mini-content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
