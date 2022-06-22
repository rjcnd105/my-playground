import { isSameMonth } from 'date-fns'
import { addMonths, endOfMonth, isAfter, isBefore, startOfMonth } from 'date-fns/esm'

import dateUtils from '../../../utils/DateUtils'
import type { DateK } from './common'
import { Year } from './Year'

export class Month implements DateK {
  readonly #date: Date

  constructor(...args: ConstructorParameters<typeof Date>) {
    this.#date = new Date(...args)
  }

  get date() {
    return this.#date
  }

  get toString() {
    return dateUtils.toYearMonth(this.#date, '-')
  }

  get startOf() {
    return startOfMonth(this.#date)
  }

  get endOf() {
    return endOfMonth(this.#date)
  }

  static fromDate(date: Date) {
    return new Month(date)
  }

  static getMonthRange(year: Year): Month[]
  static getMonthRange(startDateK: DateK, endDateK: DateK): Month[]
  static getMonthRange(startDateKOrYear: DateK | Year, endDateK?: DateK): Month[] {
    const range: Month[] = []

    const startDate =
      startDateKOrYear instanceof Year ? startDateKOrYear.startOf : startDateKOrYear.date
    const endDate = startDateKOrYear instanceof Year ? startDateKOrYear.endOf : endDateK?.date

    if (!endDate) throw Error('날짜 형식이 잘못되었습니다.')

    const end = endOfMonth(endDate)

    if (startDate > endDate) return []

    let currentDate = startDate

    while (currentDate <= end) {
      range.push(Month.fromDate(currentDate))
      currentDate = addMonths(currentDate, 1)
    }

    return range
  }

  copy() {
    return Month.fromDate(new Date(this.date))
  }

  isAfter({ date }: DateK) {
    return isAfter(this.endOf, date)
  }

  isBefore({ date }: DateK) {
    return isBefore(this.startOf, date)
  }

  isAfterEq(dateK: DateK) {
    return this.isSameMonth(dateK) || this.isAfter(dateK)
  }

  isBeforeEq(dateK: DateK) {
    return this.isSameMonth(dateK) || this.isBefore(dateK)
  }

  isSameMonth(d: DateK): boolean {
    return isSameMonth(this.#date, d.date)
  }
}
