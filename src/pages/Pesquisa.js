import React from "react";
import Page from "../components/Page";
import LoadingContext from "../context/LoadingContext";
import { searchSigv } from "../services/pesquisaService";
import { toast } from "react-toastify";
import Apreensao from "./Apreensao";
import withRouter from "../utils/withRouter";
import Form from "../components/Form";
import Joi from "joi-browser/dist/joi-browser";
import BoletoForm from "./BoletoForm";

class Pesquisa extends Form {
  static contextType = LoadingContext;

  constructor(props) {
    super(props);
  }

  state = {
    data: { placa: "", idControlePatio: "" },
    errors: {},
  };

  schema = {
    placa: Joi.string().min(7).max(7).allow("").label("Placa"),
    idControlePatio: Joi.string().allow("").label("Número de Controle"),
  };

  isResult = false;

  handleSearchSigv = () => {
    const { placa, idControlePatio } = this.state.data;
    this.context.showMessage("pesquisando Sigv...");
    searchSigv(placa, idControlePatio)
      .then((res) => {
        this.isResult = res.data.existe[0] === "T";
        if (this.isResult)
          this.processSearchResponse(res.data.controlePatio[0]);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally((res) => {
        this.context.closeMessage();
      });
  };

  handleFocus(button) {
    let data = this.state.data;
    if (button === "placa") data.idControlePatio = "";
    else data.placa = "";
    this.setState(data);
  }

  processSearchResponse = (json) => {
    let clienteJson = json.lanc_clientes_fornecedores_codCliente[0];
    this.cliente = {
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
      message: `Placa: ${json.placaVeicLetra[0]}-${json.placaVeicNr[0]} / Controle:${json.idControlePatio[0]}`,
      valorTotal: json.valorTotal[0],
    };

    this.apreensao = {
      cor: json.cor_idCor[0].nomeCor[0],
      idControlePatio: json.idControlePatio[0],
      valorDiariaVeic: json.valorDiariaVeic[0],
      valorSaidaMin: json.valorSaidaMin[0],
      valorTotal: json.valorTotal[0],
      valorTotalPago: json.valorTotalPago[0],
      statusPagamento: json.statusPagamento[0],
      nomeModelo: json.nomeModelo[0],
      placaVeicLetra: json.placaVeicLetra[0],
      placaVeicNr: json.placaVeicNr[0],
    };
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
            this.handleSearchSigv,
            () => this.handleFocus("placa")
          )}

          {this.renderInput(
            "search",
            4,
            "idControlePatio",
            "Número de Controle",
            this.handleSearchSigv,
            () => this.handleFocus("search")
          )}
        </div>

        {this.isResult && (
          <>
            <Apreensao apreensao={this.apreensao} />
            <BoletoForm cliente={this.cliente} />
          </>
        )}
        {!this.isResult && this.secondTime && (
          <label className={"text-danger mt-5"}>
            Sem resultados para a consulta
          </label>
        )}
      </Page>
    );
  }

  secondTime = false;
  componentDidMount() {
    this.secondTime = true;
  }
}

export default withRouter(Pesquisa);
