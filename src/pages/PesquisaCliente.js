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

class PesquisaCliente extends Form {
  static contextType = LoadingContext;

  state = {
    data: { placa: "", nrAutoApreensao: null },
    errors: {},
  };

  schema = {
    placa: Joi.string().required().min(7).max(7).allow("").label("Placa"),
    nrAutoApreensao: Joi.string()
      .required()
      .min(5)
      .label("No. OS de Apreensão"),
  };

  isResult = false;
  isEmpty = false;
  json = {};

  handleSearchSigv = () => {
    const { placa, nrAutoApreensao } = this.state.data;

    if (!placa || !nrAutoApreensao) {
      toast.error("Número da OS e placa devem ser preenchido");
      return;
    }

    this.context.showMessage("pesquisando Sigv...");
    searchSigv(placa, null)
      .then((res) => {
        this.isResult = res.data.existe[0] === "T";
        if (this.isResult) {
          this.json = processSearchResponse(
            res.data.controlePatio[res.data.controlePatio.length - 1]
          );
          if (this.json.apreensao.nrAutoApreensao !== nrAutoApreensao) {
            this.isEmpty = true;
          } else this.isEmpty = false;
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
            "text",
            3,
            "nrAutoApreensao",
            "No. OS de Apreensão",
            false,
            () => this.handleFocus("search")
          )}

          {this.renderInput(
            "search",
            3,
            "placa",
            "Placa do Veículo",
            this.handleSearchSigv,
            () => this.handleFocus("placa")
          )}
        </div>

        {!this.isEmpty && this.isResult && (
          <>
            <Apreensao apreensao={this.json.apreensao} />
            <BoletoForm
              cliente={this.json.cliente}
              mensagemDisabled
              boletoDisabled
            />
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

  secondTime = false;
  componentDidMount() {
    this.secondTime = true;
    this.props.setShowSidebar(false);
  }
}

export default withRouter(PesquisaCliente);
