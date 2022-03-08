import { format, getISODay } from 'date-fns/fp'

export const KOR_DAY_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'] as const

const dateUtils = {
  toKoDayOfWeek(date: Date) {
    return KOR_DAY_OF_WEEK[getISODay(date) - 1]
  },

  // yyyy-MM-dd
  toDateString: format(`yyyy.MM.dd`),
  // MM-dd
  toMonthDate: format(`MM.dd`),
  // yyyy-MM
  toYearMonth: format(`yyyy.MM`),
  // MM월 dd일
  toKoMonthDay: format('MM월 dd일'),
  toKoMonth: format('MM월')
}

export default dateUtils
