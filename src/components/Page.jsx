import React from "react";

function Page({ title, children }) {
  return (
    <>
      <ol className="breadcrumb bg-light">
        <li className="breadcrumb-item">{title}</li>
      </ol>
      <div className="card mx-3 mt-3 mb-5">
        <div className="card-body p-0">
          <div className="mini-content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
