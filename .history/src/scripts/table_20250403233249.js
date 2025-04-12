const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) &&
    !isNonEmptyArray(dataArray) &&
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento tabela selecionado."
    );
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error(
      `O elemento com id ${tableId} não existe ou não é uma tabela.`
    );
  }

  createTableHeader();
  createTableBody();
};

function createTableHeader(tableReference, columnsArray) {
  function createTHead(params) {}
}
function createTableBody() {}
