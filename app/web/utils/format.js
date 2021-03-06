export const fmtRate = (rate, { isCheat } = {}) => {
  if (Number.isNaN(Number(rate))) {
    return {
      text: '--',
      color: '#999',
    }
  }
  let fmtText = '--'
  if (rate) {
    rate = Number(rate).toFixed(2)
    fmtText = `${rate > 0 ? '+' : ''}${rate}%`
  }
  let color = !rate ? '' : rate > 0 ? 'red' : 'green'
  if (isCheat) {
    if (color === 'green') {
      color = 'red'
    }
    fmtText = String(fmtText).replace('-', '+')
  }
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

export const fmtNumber = (field, withPrefix, isCheat) => {
  if (!field || Number.isNaN(Number(field)))
    return {
      color: '#999',
      text: '--',
    }
  field = Number(field)
  const rst = {
    color: field === 0 ? '#999' : field > 0 ? 'red' : 'green',
    text: withPrefix ? `${field > 0 ? '+' : ''}${field}` : field,
  }
  if (isCheat) {
    if (rst.color === 'green') {
      rst.color = 'red'
    }
    rst.text = String(rst.text).replace('-', '+')
  }
  return rst
}
