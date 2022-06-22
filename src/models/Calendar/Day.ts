import { addDays, isAfter, isSameDay, isSunday } from 'date-fns'
import { endOfDay, isBefore, startOfDay } from 'date-fns/esm'
import dateUtils from '../../utils/dateUtils'

import type { DateK } from './common'
import { Month } from './Month'

// 하루
export class Day implements DateK {
  static today = new Day(new Date())
  static tomorrow = new Day(addDays(Day.today.date, 1))
  readonly #date: Date

  constructor(...args: ConstructorParameters<typeof Date>) {
    this.#date = new Date(...args)
  }

  get date() {
    return this.#date
  }

  get isToday() {
    return Day.today.isSameDay(this)
  }

  get isHoliday() {
    return isSunday(this.#date)
  }

  get koDayOfWeek() {
    return dateUtils.toKoDayOfWeek(this.#date)
  }

  get toString() {
    return dateUtils.toDateString(this.#date)
  }

  get startOf() {
    return startOfDay(this.#date)
  }

  get endOf() {
    return endOfDay(this.#date)
  }

  static fromDate(date: Date) {
    return new Day(date)
  }

  static getDayRange(month: Month): Day[]

  static getDayRange(startDateK: DateK, endDateK: DateK): Day[]

  static getDayRange(startDateKOrMonth: DateK | Month, endDateK?: DateK): Day[] {
    const startDate =
      startDateKOrMonth instanceof Month ? startDateKOrMonth.startOf : startDateKOrMonth.date

    const endDate = startDateKOrMonth instanceof Month ? startDateKOrMonth.endOf : endDateK?.date

    if (!endDate) throw Error('날짜 형식이 잘못되었습니다.')

    const range: Day[] = []
    const end = endOfDay(endDate)

    if (startDate > endDate) return []

    let currentDate = startDate

    while (currentDate <= end) {
      range.push(Day.fromDate(currentDate))
      currentDate = addDays(currentDate, 1)
    }

    return range
  }

  copy() {
    return Day.fromDate(new Date(this.date))
  }

  isAfter({ date }: DateK) {
    return isAfter(endOfDay(this.date), date)
  }

  isBefore({ date }: DateK) {
    return isBefore(startOfDay(this.date), date)
  }

  isAfterEq(dateK: DateK) {
    return this.isSameDay(dateK) || this.isAfter(dateK)
  }

  isBeforeEq(dateK: DateK) {
    return this.isSameDay(dateK) || this.isBefore(dateK)
  }

  isSameDay(d: DateK): boolean {
    return isSameDay(this.#date, d.date)
  }
}
