import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import moment from "moment";
import Joi from "joi-browser";
import Form from "../components/Form";
import { getClienteByCpfCnpj } from "../services/clienteService";
import { toast } from "react-toastify";
import { getEnderecoByCep } from "../services/viacepService";
import { createBoleto } from "../services/boletoService";
import Apreensao from "./Apreensao";
import Card from "../components/Card";
import data from "bootstrap/js/src/dom/data";
import LoadingContext from "../context/LoadingContext";

class BoletoForm extends Form {
  constructor(props) {
    super(props);
  }

  static contextType = LoadingContext;

  getData = () => {
    const cliente = this.props.cliente;
    const data = { ...this.state.data };
    if (cliente) {
      data.name = cliente.nomeCliente;
      data.email = cliente.emailCliente;
      data.city = cliente.endNomeCidade;
      data.state = cliente.endUF;
      data.district = cliente.endBairro;
      data.number = cliente.endNr;
      data.street = cliente.endLogradouro;
      data.cpf_cnpj = cliente.cpfCnpjCliente;
      data.total = cliente.valorTotal;
      data.zip_code = cliente.endCep;
      data.message = cliente.message;
      data.total = cliente.valorTotal;
    }
    return data;
  };

  componentDidMount() {
    this.setState({ data: this.getData() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cliente !== this.props.cliente) {
      this.setState({ data: this.getData() });
      console.log("set state", this.state);
    }
  }

  state = {
    data: {
      cpf_cnpj: "",
      name: "",
      email: "",
      total: 0,
      status: "",
      due_date: moment(new Date()).format("YYYY-MM-DD"),
      pay_date: "",
      message: "",
      zip_code: "",
      city: "",
      state: "",
      number: 0,
      street: "",
      complement: "",
      district: "",
    },
    errors: {},
  };

  schema = {
    cpf_cnpj: Joi.string().required().label("CPF/CNPJ"),
    email: Joi.string().required().email().label("Email"),
    total: Joi.number().required().min(0.1).label("Valor"),
    due_date: Joi.date().required().label("Data Vencimento"),
    pay_date: Joi.date().allow("").label("Data Pagamento"),
    message: Joi.string().required().label("Mensagem"),
    name: Joi.string().required().label("Nome"),
    status: Joi.string().allow("").label("Status"),
    zip_code: Joi.string().required().min(8).max(9).label("Cep"),
    city: Joi.string().required().max(50).label("Cidade"),
    state: Joi.string().required().label("Estado"),
    number: Joi.number().required().label("Número"),
    street: Joi.string().label("Rua"),
    complement: Joi.string().allow("").label("Complemento"),
    district: Joi.string().label("Bairro"),
  };

  handleSearchClient = () => {
    this.context.showMessage("pesquisando dados do pagador...");
    getClienteByCpfCnpj(this.state.data.cpf_cnpj)
      .then((res) => {
        const cliente = res.data[0];
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };

        if (!cliente) {
          if (!this.state.data.name) {
            data.email = "";
            data.name = "";
          }
          this.setState({ data });
          toast.error("Cliente não existe na base da Iugu");
          return;
        }

        data.email = cliente.email;
        if (data.email) errors.email = null;
        data.name = cliente.name;
        if (data.name) errors.name = null;

        this.setState({ data, errors });
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => this.context.closeMessage());
  };

  handleSearchEndereco = async () => {
    this.context.showMessage("pesquisando cep");
    getEnderecoByCep(this.state.data.zip_code)
      .then((res) => {
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };

        if (!res.data) {
          data.street = "";
          data.city = "";
          data.state = "";
          data.district = "";
          this.setState({ data });
          toast.error("Cep não existe");
          return;
        }
        data.street = res.data.logradouro;
        if (data.street) errors.street = null;
        data.city = res.data.localidade;
        if (data.city) errors.city = null;
        data.state = res.data.uf;
        if (data.state) errors.state = null;
        data.district = res.data.bairro;
        if (data.district) errors.district = null;

        this.setState({ data, errors });
      })
      .catch((error) => {
        toast("Problema na pesquisa. Tente novamente!");
      })
      .finally(() => this.context.closeMessage());
  };

  doSubmit = async () => {
    try {
      this.context.showMessage("criando boleto...");
      await createBoleto(this.state.data);
      this.context.closeMessage();
      toast.success("Boleto criado com sucesso!");

      this.props.router.navigate("/boleto");
      console.log("indo apra outra pagina", this.props.router);
    } catch (e) {
      this.context.closeMessage();
      if (this.isClientError(e)) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="">
        {this.state.data.total > 0 && (
          <>
            <Card title={"Dados do Pagador"}>
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

                {this.renderInput(
                  "search",
                  4,
                  "zip_code",
                  "Cep",
                  this.handleSearchEndereco
                )}
                {this.renderInput("text", 4, "city", "Cidade")}
                {this.renderInput("text", 4, "state", "Estado")}
                {this.renderInput("text", 4, "number", "Número")}
                {this.renderInput("text", 4, "street", "Rua")}
                {this.renderInput(
                  "text",
                  4,
                  "district",
                  "Bairro",
                  false,
                  false,
                  true
                )}
              </div>
            </Card>

            <Card title={"Dados do Boleto"}>
              <div className="row">
                {this.renderInput("number", 4, "total", "Total")}
                {this.renderInput("date", 4, "due_date", "Vencimento")}
                {this.renderInput(
                  "text",
                  4,
                  "message",
                  "Mensagem",
                  false,
                  false,
                  true
                )}
              </div>
            </Card>

            {this.renderButton("Criar Boleto")}
          </>
        )}
      </form>
    );
  }
}

export default withRouter(BoletoForm);
