import generateReturnsArray from "./src/scripts/investimentsGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/scripts/table.js";

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
const form = document.getElementById("investment-form");
const clanerButton = document.getElementById("clear-form");
let doughnutChartReference = {};
let progressionChartReference = {};

const columnsArray = [
  { columnLabel: "Total Investido", accessor: "investedAmount" },
  { columnLabel: "Rendimento Mensal", accessor: "interestReturns" },
  { columnLabel: "Rendimento Total", accessor: "totalInterestReturns" },
  { columnLabel: "Mês", accessor: "month" },
  { columnLabel: "Quantia Total", accessor: "totalAmount" },
];

function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  resetCharts();
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", ".")
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", ".")
  );
  const timeAmount = document.getElementById("time-amount").value;
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", ".")
  );
  const returnRatePeriod = document.getElementById("evaluation-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", ".")
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod
  );

  /*  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Total Investido", "Rendimento", "Imposto"],
      datasets: [
        {
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(
              finalInvestmentObject.totalInterestReturns * (1 - taxRate / 100)
            ),
            formatCurrency(
              (finalInvestmentObject.totalInterestReturns * taxRate) / 100
            ),
          ],
          backgroundColor: [
            "rgb(255,99,132)",
            "rgb(54,162,235)",
            "rgb(255,205,86)",
          ],
        },
      ],
    },
  });

  progressionChartReference = new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((item) => item.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((item) => formatCurrency(item.investedAmount)),
          backgroundColor: "rgb(255,99,132)",
        },
        {
          lable: "Imposto",
          data: returnsArray.map((item) =>
            formatCurrency((item.totalInterestReturns * taxRate) / 100)
          ),
          backgroundColor: "rgb(255,205,86)",
        },
        {
          label: "Retorno de Investimento",
          data: returnsArray.map((item) =>
            formatCurrency(item.totalInterestReturns * (1 - taxRate / 100))
          ),
          backgroundColor: "rgb(54,162,235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });*/
  createTable(columnsArray, returnsArray, "results-table");
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function resetCharts() {
  if (
    !isObjectEmpty(doughnutChartReference) &&
    !isObjectEmpty(progressionChartReference)
  ) {
    doughnutChartReference.destroy();
    progressionChartReference.destroy();
  }
}

function clearForm() {
  form.reset();
  resetCharts();

  const errorElements = document.querySelectorAll(".error");
  for (const errorElement of errorElements) {
    errorElement.classList.remove("error");
    errorElement.parentElement.querySelector("p").remove();
  }
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (
    !parentElement.classList.contains("error") &&
    (isNaN(inputValue) || Number(inputValue) <= 0)
  ) {
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico e maior que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  }

  if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);

clanerButton.addEventListener("click", clearForm);
