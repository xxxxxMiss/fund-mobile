export const fmtRate = rate => {
  let fmtText = '--'
  if (rate) {
    rate = Number(rate).toFixed(2)
    fmtText = `${rate > 0 ? '+' : ''}${rate}%`
  }
  const color = !rate ? '' : rate > 0 ? 'red' : 'green'
  return {
    text: fmtText,
    color,
  }
}

export const fmtDate = dateStr => {
  if (!dateStr) return ''
  const segments = dateStr.split(' ')[0].split('-')
  return `${segments[1]}-${segments[2]}`
}
