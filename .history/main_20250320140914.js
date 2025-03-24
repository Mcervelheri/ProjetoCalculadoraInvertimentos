import generateReturnsArray from "./src/scripts/investimentsGoals";

const calculateButton = document.getElementById("calculate-result");

function renderProgression() {
  const startingAmount = document.getElementById("starting-amount").value;
  const additionalContribution = document.getElementById(
    "additional-contribution"
  ).value;
  const returnRate = document.getElementById("return-rate").value;
  const taxRate = document.getElementById("tax-rate").value;
  const timeAmount = document.getElementById("time-amount").value;
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRatePeriod = document.getElementById("evaluation-period").value;

  generateReturnsArray(
    parseFloat(startingAmount),
    parseFloat(timeAmount),
    timeAmountPeriod,
    parseFloat(additionalContribution),
    parseFloat(returnRate),
    returnRatePeriod
  );
}
