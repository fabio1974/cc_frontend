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
import { processSearchResponse } from "../utils/utils";

class Pesquisa extends Form {
  static contextType = LoadingContext;

  state = {
    data: { placa: "", idControlePatio: "" },
    errors: {},
  };

  componentDidMount() {
    this.props.setShowSidebar(true);
  }

  schema = {
    placa: Joi.string().min(7).max(7).allow("").label("Placa"),
    idControlePatio: Joi.string().allow("").label("Número de Controle"),
  };

  isResult = false;
  isEmpty = false;
  json = {};

  handleSearchSigv = () => {
    const { placa, idControlePatio } = this.state.data;
    this.context.showMessage("pesquisando Sigv...");
    searchSigv(placa, idControlePatio)
      .then((res) => {
        this.isResult = res.data.existe[0] === "T";
        if (this.isResult) {
          this.json = processSearchResponse(
            res.data.controlePatio[res.data.controlePatio.length - 1]
          );
          this.isEmpty = false;
        } else this.isEmpty = true;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally((res) => {
        this.context.closeMessage();
      });
  };

  handleFocus(button) {
    this.isEmpty = false;
    let data = this.state.data;
    if (button === "placa") data.idControlePatio = "";
    else data.placa = "";
    this.setState(data);
  }

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

        {!this.isEmpty && this.isResult && (
          <>
            <Apreensao apreensao={this.json.apreensao} />
            <BoletoForm cliente={this.json.cliente} mensagemDisabled />
          </>
        )}
        {this.isEmpty && (
          <label className={"text-danger mt-5"}>
            Sem resultados para a consulta
          </label>
        )}
      </Page>
    );
  }
}

export default withRouter(Pesquisa);
