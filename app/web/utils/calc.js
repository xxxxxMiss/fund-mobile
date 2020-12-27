//估算收益
// if (估值涨幅) {
//   估算收益 = ((净值 - 净值 / (1 + 估值涨幅 * 0.01)) * 持有份额).toFixed(2)
// } else {
//   if (净值估算) {
// 	估算收益 = ((净值估算 - 净值) * 持有份额).toFixed(2)
//   }
// }
export const getEvaluateProfit = ({
  expectGrowth,
  holdShare,
  netWorth,
  expectWorth,
}) => {
  let sum = 0
  const num = holdShare || 0
  if (expectGrowth) {
    sum = ((netWorth - netWorth / (1 + expectGrowth * 0.01)) * num).toFixed(2)
  } else if (expectWorth) {
    sum = ((expectWorth - netWorth) * num).toFixed(2)
  }
  return sum
}

//持有金额
// (净值 * Number(持有份额)).toFixed(2)
export const getAmount = ({ netWorth, holdShare }) => {
  return (netWorth * Number(holdShare)).toFixed(2)
}

//持有收益
// if (持仓成本价) {
//   let sum = ((净值 - 持仓成本价) * 持有份额).toFixed(2)
//   return sum
// } else {
//   return 0
// }
export const getProfit = ({ holdCost, netWorth, holdShare }) => {
  if (holdCost) {
    return ((netWorth - holdCost) * holdShare).toFixed(2)
  }
  return 0
}

//持有收益率
// if (持仓成本价 && 持仓成本价 != 0) {
//   let sum = (((净值 - 持仓成本价) / 持仓成本价) * 100).toFixed(2)
//   return sum
// } else {
//   return 0
// }
export const getProfitRate = ({ holdCost, netWorth }) => {
  if (holdCost && holdCost != 0) {
    return (((netWorth - holdCost) / holdCost) * 100).toFixed(2)
  }
  return 0
}

//持仓比  ((持有金额/总持仓金额)*100).toFixed(2)
