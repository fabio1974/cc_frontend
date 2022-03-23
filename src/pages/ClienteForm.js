import React from "react";
import Form from "../components/Form";
import Joi from "joi-browser/dist/joi-browser";
import Page from "../components/Page";
import withRouter from "../utils/withRouter";
import { toast } from "react-toastify";
import LoadingContext from "../context/LoadingContext";
import { getEnderecoByCep } from "../services/viacepService";
import { createCliente } from "../services/clienteService";

class ClienteForm extends Form {
  state = {
    data: {
      name: "",
      cpf_cnpj: "",
      email: "",
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
    name: Joi.string().required().label("Nome"),
    cpf_cnpj: Joi.string().required().min(11).max(17).label("CPF/CNPJ"),
    email: Joi.string().required().email().label("Email"),
    zip_code: Joi.string().required().min(8).max(9).label("Cep"),
    city: Joi.string().required().max(50).label("Cidade"),
    state: Joi.string().required().label("Estado"),
    number: Joi.number().required().label("Número"),
    street: Joi.string().label("Rua"),
    complement: Joi.string().label("Complemento"),
    district: Joi.string().label("Bairro"),
  };

  doSubmit = async () => {
    try {
      this.context.showMessage("criando cliente...");
      await createCliente(this.state.data);
      this.context.closeMessage();
      toast.success("Cliente criado com sucesso!");

      this.props.router.navigate("/cliente");
      console.log("indo apra outra pagina", this.props.router);
    } catch (e) {
      if (this.isClientError(e)) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSearchEndereco = async () => {
    //this.context.showMessage("pesquisando cep");
    const response = await getEnderecoByCep(this.state.data.zip_code);
    //this.context.closeMessage();
    console.log("response", response);

    const data = { ...this.state.data };

    if (!response.data) {
      data.street = "";
      data.city = "";
      data.state = "";
      data.district = "";
      this.setState({ data });
      toast.error("Cep não existe");
      return;
    }

    data.street = response.data.logradouro;
    data.city = response.data.localidade;
    data.state = response.data.uf;
    data.district = response.data.bairro;

    this.setState({ data });
  };

  render() {
    return (
      <Page title={"Criar Cliente"}>
        <form onSubmit={this.handleSubmit} action="">
          <div className="row">
            {this.renderInput("text", 4, "name", "Nome")}
            {this.renderInput("text", 4, "email", "Email")}
            {this.renderInput("text", 4, "cpf_cnpj", "Cpf/Cnpj")}
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
            {this.renderInput("text", 4, "district", "Bairro", false, true)}
          </div>
          {this.renderButton("Criar Cliente")}
        </form>
      </Page>
    );
  }
}

//ClienteForm.contextType = LoadingContext;

export default withRouter(ClienteForm);
