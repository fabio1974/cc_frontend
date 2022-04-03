import React from "react";
import { renderDisabledInput } from "../components/MyInput";
import Card from "../components/Card";

function Apreensao({ apreensao }) {
  return (
    <Card title={"Dados de Apreensão"}>
      <div className="row">
        {renderDisabledInput(
          4,
          `${apreensao.placaVeicLetra}-${apreensao.placaVeicNr}`,
          "Placa"
        )}
        {renderDisabledInput(4, apreensao.nomeModelo, "Modelo")}
        {renderDisabledInput(4, apreensao.cor, "Cor")}

        {renderDisabledInput(4, apreensao.nrAutoApreensao, "Número da OS")}

        {renderDisabledInput(
          4,
          apreensao.idControlePatio,
          "Número de Controle"
        )}

        {renderDisabledInput(4, apreensao.valorGuincho, "Valor do Guincho")}
        {renderDisabledInput(
          4,
          apreensao.valorTotalServicos,
          "Valor dos Serviços"
        )}
        {renderDisabledInput(
          4,
          apreensao.valorTotalVistorias,
          "Valor das Vistorias"
        )}
        {renderDisabledInput(4, apreensao.valorDiariaVeic, "Valor da Diária")}
        {renderDisabledInput(
          4,
          apreensao.valorSaidaMin,
          "Valor de Saída Mínimo"
        )}
        {renderDisabledInput(4, apreensao.valorTotal, "Valor Total")}
        {renderDisabledInput(4, apreensao.valorTotalPago, "Valor Total Pago")}
        {renderDisabledInput(
          4,
          apreensao.statusPagamento,
          "Status do Pagamento"
        )}
        {renderDisabledInput(4, apreensao.dataHoraOS, "Data da Entrada")}
      </div>
    </Card>
  );
}

export default Apreensao;
