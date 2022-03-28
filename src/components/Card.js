import React from "react";

function Card({ children, title }) {
  return (
    <div className={`col-sm-12`}>
      <div className="card mt-3 ms-1">
        <div className="card-header ">{title}</div>
        <div className="card-body ">{children}</div>
      </div>
    </div>
  );
}

export default Card;
