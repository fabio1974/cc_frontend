import React from "react";
import Form from "../components/Form";
import Joi from "joi-browser/dist/joi-browser";
import Page from "../components/Page";
import { getClienteByCpfCnpj } from "../services/clienteService";
import withRouter from "../utils/withRouter";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { createBoleto } from "../services/boletoService";
import LoadingContext from "../context/LoadingContext";

class BoletoForm extends Form {
  state = {
    data: {
      cpf_cnpj: "",
      customer_id: "",
      name: "",
      email: "",
      total: 0,
      status: "EMITIDO",
      due_date: moment(new Date()).add(1, "days").format("YYYY-MM-DD"),
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
    pay_date: Joi.date().allow("").label("Data Pagamento"),
    message: Joi.string().required().label("Mensagem"),
    name: Joi.string().required().label("Nome"),
    status: Joi.string().label("Status"),
  };

  static contextType = LoadingContext;

  doSubmit = async () => {
    try {
      this.context.showMessage("criando boleto...");
      const response = await createBoleto(this.state.data);
      this.context.closeMessage();
      toast.success("Boleto criado com sucesso!");

      this.props.router.navigate("/boleto");
      console.log("indo apra outra pagina", this.props.router);
    } catch (e) {
      if (this.isClientError(e)) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSearchClient = async () => {
    this.context.showMessage("pesquisando cliente");
    const result = await getClienteByCpfCnpj(this.state.data.cpf_cnpj);
    this.context.closeMessage();

    const cliente = result.data[0];
    const data = { ...this.state.data };

    if (!cliente) {
      data.email = "";
      data.name = "";
      this.setState({ data });
      toast.error("Cliente não existe");
      return;
    }

    data.email = cliente.email;
    data.name = cliente.name;
    data.customer_id = cliente.id;
    this.setState({ data });
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
            {this.renderInput(
              "search",
              4,
              "cpf_cnpj",
              "CPF/CNPJ do Pagador",
              this.handleSearchClient
            )}

            {this.renderInput("text", 4, "name", "Nome")}
            {this.renderInput("text", 4, "email", "Email")}
            {this.renderInput("number", 4, "total", "Total")}
            {this.renderSelect(4, "status", "Status", options)}
            {this.renderInput("date", 4, "due_date", "Vencimento")}
            {this.renderInput(
              "date",
              4,
              "pay_date",
              "Data Pagamento",
              null,
              true
            )}
            {this.renderInput("text", 8, "message", "Mensagem")}
          </div>
          {this.renderButton("Criar Boleto")}
        </form>
      </Page>
    );
  }
}

//BoletoForm.contextType = LoadingContext;

export default withRouter(BoletoForm);
