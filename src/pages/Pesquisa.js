import React from "react";
import Page from "../components/Page";
import Form from "../components/Form";
import Joi from "joi-browser";
import LoadingContext from "../context/LoadingContext";
import { searchSigv } from "../services/pesquisaService";
import { toast } from "react-toastify";
import Apreensao from "./Apreensao";
import moment from "moment";
import Card from "../components/Card";
import { getClienteByCpfCnpj } from "../services/clienteService";
import { getEnderecoByCep } from "../services/viacepService";
import { createBoleto } from "../services/boletoService";
import data from "bootstrap/js/src/dom/data";
import withRouter from "../utils/withRouter";

class Pesquisa extends Form {
  static contextType = LoadingContext;

  apreensao = {};

  state = {
    data: {
      placa: "",
      codControle: "",
      cpf_cnpj: "",
      name: "",
      email: "",
      total: 0,
      status: "EMITIDO",
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
    placa: Joi.string().allow("").label("Placa"),
    codControle: Joi.string().allow("").label("Códdigo de Controle"),
    cpf_cnpj: Joi.string().required().label("CPF/CNPJ"),
    email: Joi.string().required().email().label("Email"),
    total: Joi.number().required().min(0.1).label("Valor"),
    due_date: Joi.date().required().label("Data Vencimento"),
    pay_date: Joi.date().allow("").label("Data Pagamento"),
    message: Joi.string().required().label("Mensagem"),
    name: Joi.string().required().label("Nome"),
    status: Joi.string().label("Status"),
    zip_code: Joi.string().required().min(8).max(9).label("Cep"),
    city: Joi.string().required().max(50).label("Cidade"),
    state: Joi.string().required().label("Estado"),
    number: Joi.number().required().label("Número"),
    street: Joi.string().label("Rua"),
    complement: Joi.string().allow("").label("Complemento"),
    district: Joi.string().label("Bairro"),
  };

  handleSearchSigv = () => {
    const { placa, codControle } = this.state.data;
    this.context.showMessage("pesquisando Sigv...");
    searchSigv(placa, codControle)
      .then((res) => {
        console.log("res", res);
        if (res.data.existe[0] === "T")
          this.processSearchResponse(res.data.controlePatio[0]);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
      })
      .finally((res) => this.context.closeMessage());
  };

  processSearchResponse = (json) => {
    let clienteJson = json.lanc_clientes_fornecedores_codCliente[0];
    let cliente = {
      cpfCnpjCliente: clienteJson.cpfCnpjCliente[0],
      emailCliente: clienteJson.emailCliente[0],
      empresa_codEmp: clienteJson.empresa_codEmp[0],
      endBairro: clienteJson.endBairro[0],
      endCep: clienteJson.endCep[0],
      endComp: clienteJson.endComp[0],
      endLogradouro: clienteJson.endLogradouro[0],
      endNomeCidade: clienteJson.endNomeCidade[0],
      endNr: clienteJson.endNr[0],
      endUF: clienteJson.endUF[0],
      nomeCliente: clienteJson.nomeCliente[0],
    };

    this.apreensao = {
      cor: json.cor_idCor[0].nomeCor[0],
      codControle: json.codControle[0],
      valorDiariaVeic: json.valorDiariaVeic[0],
      valorSaidaMin: json.valorSaidaMin[0],
      valorTotal: json.valorTotal[0],
      valorTotalPago: json.valorTotalPago[0],
      statusPagamento: json.statusPagamento[0],
      nomeModelo: json.nomeModelo[0],
      placaVeicLetra: json.placaVeicLetra[0],
      placaVeicNr: json.placaVeicNr[0],
    };

    const data = { ...this.state.data };
    data.name = cliente.nomeCliente;
    data.email = cliente.emailCliente;
    data.city = cliente.endNomeCidade;
    data.state = cliente.endUF;
    data.district = cliente.endBairro;
    data.number = cliente.endNr;
    data.street = cliente.endLogradouro;
    data.cpf_cnpj = cliente.cpfCnpjCliente;
    data.total = this.apreensao.valorTotal;
    data.zip_code = cliente.endCep;
    data.message = `Placa: ${this.apreensao.placaVeicLetra}-${this.apreensao.placaVeicNr} / Controle:${json.codControle[0]}`;

    this.setState({ data });
  };

  handleSearchClient = () => {
    this.context.showMessage("pesquisando dados do pagador...");
    getClienteByCpfCnpj(this.state.data.cpf_cnpj)
      .then((res) => {
        const cliente = res.data[0];
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };

        if (!cliente) {
          data.email = "";
          data.name = "";
          this.setState({ data });
          toast.error("Cliente não existe");
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
      <Page title={"Pesquisa por Placa"}>
        <div className="row">
          {this.renderInput(
            "search",
            4,
            "placa",
            "Placa do Veículo",
            this.handleSearchSigv
          )}

          {this.renderInput(
            "search",
            4,
            "codControle",
            "Código de Controle",
            this.handleSearchSigv
          )}
        </div>
        <form onSubmit={this.handleSubmit} action="">
          {this.state.data.total > 0 && (
            <>
              <div className="row">
                <Apreensao apreensao={this.apreensao} />
              </div>

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
                    null,
                    true
                  )}
                </div>
              </Card>

              {this.renderButton("Criar Boleto")}
            </>
          )}
        </form>
      </Page>
    );
  }
}

export default withRouter(Pesquisa);
