import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { BiSearchAlt } from "react-icons/bi";

export const MyInput = ({
  name,
  label,
  error,
  type,
  options,
  span,
  onClick,
  ...rest
}) => {
  return (
    <div className={`col-sm-${span}`}>
      <div className="m-1">
        <label htmlFor={name}>{label}</label>
        {(type === "text" || type === "date" || type === "number") && (
          <Input
            name={name}
            id={name}
            type={type}
            {...rest}
            className="form-control"
          />
        )}
        {type === "search" && (
          <InputGroup>
            <Input
              name={name}
              id={name}
              type={type}
              {...rest}
              className="form-control"
            />
            <Button color={"primary"} onClick={onClick}>
              <BiSearchAlt />
            </Button>
          </InputGroup>
        )}
        {type === "select" && (
          <Input
            type={"select"}
            name={name}
            id={name}
            {...rest}
            className="form-control"
          >
            {options.map((op) => (
              <option key={op.id} value={op.id}>
                {op.name}
              </option>
            ))}
          </Input>
        )}
        {type === "checkbox" && (
          <Input
            type="checkbox"
            name={name}
            id={name}
            {...rest}
            className="form-group"
          >
            <label htmlFor={name}>{label}</label>
          </Input>
        )}
        {error && <div className="badge bg-danger">{error}</div>}
      </div>
    </div>
  );
};

export function renderDisabledInput(span, value, label) {
  return (
    <MyInput
      type={"text"}
      value={value}
      label={label}
      span={span}
      disabled={true}
    />
  );
}
