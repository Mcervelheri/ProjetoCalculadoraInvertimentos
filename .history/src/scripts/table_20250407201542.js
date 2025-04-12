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
  function createTheadElemente(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderRefence =
    tableReference.querySelector("thead") ??
    createTheadElemente(tableReference);
  const headerRow = document.createElement("tr");
  for (const tableColumnObject of columnsArray) {
    const headerElement = /* html */ `<th class='text-center'>${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }

  tableHeaderRefence.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElemente(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyRefence =
    tableReference.querySelector("tbody") ??
    createTbodyElemente(tableReference);
}
