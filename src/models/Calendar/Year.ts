import { addYears, endOfYear, isAfter, isBefore, isSameYear, startOfYear } from 'date-fns/esm'

import type { DateK } from './common'

export class Year implements DateK {
  readonly #date: Date

  constructor(...args: ConstructorParameters<typeof Date>) {
    this.#date = new Date(...args)
  }

  get date() {
    return this.#date
  }

  get toString() {
    return String(this.#date.getFullYear()) as `${number}`
  }

  get startOf() {
    return startOfYear(this.#date)
  }

  get endOf() {
    return endOfYear(this.#date)
  }

  static fromDate(date: Date) {
    return new Year(date)
  }

  static getYearRange(startDate: DateK, endDate: DateK): Year[] {
    const range: Year[] = []
    const end = endOfYear(endDate.date)

    if (startDate.date > endDate.date) return []

    let currentDate = startDate.date

    while (currentDate <= end) {
      range.push(Year.fromDate(currentDate))
      currentDate = addYears(currentDate, 1)
    }

    return range
  }

  copy() {
    return Year.fromDate(new Date(this.date))
  }

  isAfter({ date }: DateK) {
    return isAfter(this.endOf, date)
  }

  isBefore({ date }: DateK) {
    return isBefore(this.startOf, date)
  }

  isAfterEq(dateK: DateK) {
    return this.isSameYear(dateK) || this.isAfter(dateK)
  }

  isBeforeEq(dateK: DateK) {
    return this.isSameYear(dateK) || this.isBefore(dateK)
  }

  isSameYear(d: DateK): boolean {
    return isSameYear(this.#date, d.date)
  }
}
