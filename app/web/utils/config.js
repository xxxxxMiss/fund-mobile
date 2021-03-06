import dayjs from 'dayjs'

export const FUNDTYPES = [
  {
    value: '',
    label: '所有类型',
  },
  {
    value: 'gp',
    label: '股票型',
  },
  {
    value: 'hh',
    label: '混合型',
  },
  {
    value: 'zq',
    label: '债券型',
  },
  {
    value: 'zs',
    label: '指数型',
  },
  {
    value: 'qdii',
    label: 'QDII',
  },
  {
    value: 'fof',
    label: 'FOF',
  },
]

export const FUNDCOMPANY = [
  {
    value: '',
    label: '所有类型',
  },
  {
    value: '80000222',
    label: '华夏',
  },
  {
    value: '80000223',
    label: '嘉实',
  },
  {
    value: '80000229',
    label: '易方达',
  },
  {
    value: '80000220',
    label: '南方',
  },
  {
    value: '80048752',
    label: '中银',
  },
  {
    value: '80000248',
    label: '广发',
  },
  {
    value: '80064225',
    label: '工银',
  },
  {
    value: '80000226',
    label: '博时',
  },
  {
    value: '80000228',
    label: '华安',
  },
  {
    value: '80053708',
    label: '汇添富',
  },
]

export const DATERANGE = [
  {
    label: '日涨幅',
    value: 'r',
  },
  {
    label: '周涨幅',
    value: 'z',
  },
  {
    label: '近一月',
    value: '1y',
  },
  {
    label: '近三月',
    value: '3y',
  },
  {
    label: '近六月',
    value: '6y',
  },
  {
    label: '今年来',
    value: 'jn',
  },
  {
    label: '近一年',
    value: '1n',
  },
]

export const FIELDS = {
  r: 'dayGrowth',
  z: 'lastWeekGrowth',
  '1y': 'lastMonthGrowth',
  '3y': 'lastThreeMonthsGrowth',
  '6y': 'lastSixMonthsGrowth',
  '1n': 'lastYearGrowth',
  jn: 'thisYearGrowth',
}

export const getFilterOptions = () => {
  return [
    {
      label: '近1月',
      value: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    },
    {
      label: '近3月',
      value: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    },
    {
      label: '近6月',
      value: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
    },
    {
      label: '近1年',
      value: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
    },
    {
      label: '近3年',
      value: dayjs().subtract(3, 'year').format('YYYY-MM-DD'),
    },
  ]
}
