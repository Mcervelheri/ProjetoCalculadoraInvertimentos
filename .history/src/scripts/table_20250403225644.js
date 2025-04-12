const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
  if (!isNonEmptyArray(columnsArray) || !isNonEmptyArray(dataArray)) {
    return;
  }
};
