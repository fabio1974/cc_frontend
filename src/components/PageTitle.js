import React from "react";

function PageTitle({ title }) {
  return (
    <>
      <ol className="breadcrumb bg-light">
        <li className="breadcrumb-item">{title}</li>
      </ol>
    </>
  );
}

export default PageTitle;
