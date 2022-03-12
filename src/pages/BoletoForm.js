import React from "react";
import Form from "../components/Form";
import Joi from "joi-browser/dist/joi-browser";
import Page from "../components/Page";
import { createBoleto } from "../services/boletoService";
import { getClienteByCpfCnpj } from "../services/clienteService";
import { Button, Input, InputGroup } from "reactstrap";

class BoletoForm extends Form {
  state = {
    data: {
      cpf_cnpj: "",
      customer_id: "",
      name: "",
      email: "",
      total: 0,
      status: "",
      due_date: "",
      pay_date: "",
      message: "",
    },
    errors: {},
  };

  schema = {
    cpf_cnpj: Joi.string().required().label("CPF/CNPJ"),
    customer_id: Joi.string().required().label("ID"),
    email: Joi.string().required().email().label("Email"),
    total: Joi.number().required().min(0.1).label("Valor"),
    due_date: Joi.date().required().label("Data Vencimento"),
    pay_date: Joi.date().label("Data Pagamento"),
    message: Joi.string().required().label("Mensagem"),
    name: Joi.string().required().label("Nome"),
    status: Joi.string().label("Status"),
  };

  doSubmit = async () => {
    try {
      const response = await createBoleto(this.state.data);
      this.props.history.push("/boletos");
      //window.location = '/'
    } catch (e) {
      if (this.isClientError(e)) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSeachClient = async () => {
    const result = await getClienteByCpfCnpj(this.state.data.cpf_cnpj);
    const cliente = result.data[0];
    if (!cliente) {
      alert("Cliente não existe");
      return;
    }
    console.log("CLIENTE", cliente);
    const data = { ...this.state.data };
    data.email = cliente.email;
    data.name = cliente.name;
    data.customer_id = cliente.id;
    this.setState({ data }, () => console.log("STATE", this.state));
  };

  render() {
    const options = [
      "EMITIDO",
      "VENCIDO",
      "PAGAMENTO_EFETUADO",
      "CANCELADO",
      "PROTESTADO",
    ].map((item) => {
      return { id: item, name: item };
    });

    return (
      <Page title={"Criar Boleto"}>
        <form onSubmit={this.handleSubmit} action="">
          <div className="row">
            {this.renderInput("search", 4, "cpf_cnpj", "CPF/CNPJ do Pagador")}

            {this.renderInput("text", 4, "name", "Nome")}
            {this.renderInput("text", 4, "email", "Email")}
            {this.renderInput("number", 4, "total", "Total")}
            {this.renderInput("select", 4, "status", "Status", options)}
            {this.renderInput("date", 4, "due_date", "Vencimento")}
            {this.renderInput("date", 4, "pay_date", "Data Vencimento")}
            {this.renderInput("text", 8, "message", "Mensagem")}
          </div>
          {this.renderButton("Criar Boleto")}
        </form>
      </Page>
    );
  }
}

export default BoletoForm;
