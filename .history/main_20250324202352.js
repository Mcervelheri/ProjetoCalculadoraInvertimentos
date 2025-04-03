import generateReturnsArray from "./src/scripts/investimentsGoals.js";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById("final-money-chart");
const progressionChart = document.getElementById("progression-chart");
const form = document.getElementById("investment-form");
const clanerButton = document.getElementById("clear-form");

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }

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

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Imposto", "Rendimentos", "Contribuições"],
      datasets: [
        {
          label: "Imposto",
          data: [taxRate, 100 - taxRate],
          backgroundColor: ["#FF0000", "#00FF00"],
        },
      ],
    },
  });
}

function clearForm() {
  form.reset();

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
