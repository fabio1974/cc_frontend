export const processSearchResponse = (json) => {
  let clienteJson = json.lanc_clientes_fornecedores_codCliente[0];
  const cliente = {
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

  const apreensao = {
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
    valorGuincho: json.valorGuincho[0],
    valorTotalServicos: json.valorTotalServicos[0],
    valorTotalVistorias: json.valorTotalVistorias[0],
    nrAutoApreensao: json.nrAutoApreensao[0],
    dataHoraOS: json.dataHoraOS[0],
  };
  return { cliente, apreensao };
};
