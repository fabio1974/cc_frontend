import React, { Component } from "react";
import * as Joi from "joi-browser";
import { Button } from "reactstrap";
import { MyInput } from "./MyInput";

class Form extends Component {
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  isClientError(error) {
    return (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    );
  }

  renderButton(label) {
    return <Button className="btn btn-primary ms-1 me-2 mt-3">{label}</Button>;
  }

  renderBackButton(label, history) {
    return (
      <button className="btn btn-primary mr-2" onClick={history.goBack}>
        {label}
      </button>
    );
  }

  renderInput(type = "text", span, name, label, options = [], onCLick) {
    const { data, errors } = this.state;

    return (
      <MyInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        span={span}
        options={options}
        onClick={onCLick}
      />
    );
  }
}

export default Form;
