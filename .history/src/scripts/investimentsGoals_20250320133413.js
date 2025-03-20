function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error("Investimento inicial e prazo são obrigatórios");
  }

  const finalReturnRate =
    returnTimeFrame === "yearly"
      ? convertToMonthlyReturnRate(returnRate)
      : returnRate;
}
