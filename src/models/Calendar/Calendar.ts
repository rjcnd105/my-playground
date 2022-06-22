import { subYears } from 'date-fns'
import { addYears, endOfISOWeek, startOfISOWeek } from 'date-fns/esm'
import { makeAutoObservable } from 'mobx'

import { Day } from './Day'
import { Month } from './Month'
import { Year } from './Year'

type ConstructorParams<SelectDateT, ViewDateT> = {
  selectedSuper: SelectDateT
  superRange: SelectDateT[]
  extractSubRange(select: SelectDateT): ViewDateT[]
}

export class Calendar<SelectDateT, ViewDateT> {
  public superRange: SelectDateT[] = []
  subRange: ViewDateT[] = []
  private readonly _extractSubRange: ConstructorParams<SelectDateT, ViewDateT>['extractSubRange']

  constructor({
    selectedSuper,
    superRange,
    extractSubRange,
  }: ConstructorParams<SelectDateT, ViewDateT>) {
    this._extractSubRange = extractSubRange
    this.superRange = superRange
    this._selectedSuper = selectedSuper

    // set min, max
    this.subRange = this._extractSubRange(selectedSuper)

    makeAutoObservable(this)
  }

  private _selectedSuper: SelectDateT

  get selectedSuper() {
    return this._selectedSuper
  }

  get startDate() {
    return this.subRange[0]
  }

  get endDate() {
    return this.subRange[this.subRange.length - 1]
  }

  setSelectedSuper(select: SelectDateT) {
    this._selectedSuper = select
    this.subRange = this._extractSubRange(select)
  }
}

// TODO: 추후 도메인 기반으로 갈때 CalendarService 에 들어가야함.
const currentMonth = new Month(Day.today.date)
const currentYear = new Year(Day.today.date)

// 출석 캘린더 월별
export function makeAttendanceMonthlyCalendar(selectedMonth: Month = currentMonth) {
  // 현재로부터 1년전 부터 내일까지의 Month[] 생성
  const monthArr = Month.getMonthRange({ date: subYears(Day.today.date, 1) }, Day.tomorrow)

  // 특정 Month 선택시 Day[]는 Month의 처음과 끝
  const makeDayRange = (month: Month) => {
    return Day.getDayRange(month)
  }
  return new Calendar({
    selectedSuper: selectedMonth,
    superRange: monthArr,
    extractSubRange: makeDayRange,
  })
}

// 출석 캘린더 주간별
export function makeAttendanceWeeklyCalendar(selectedMonth: Month = currentMonth) {
  // 현재로부터 1년전 부터 내일까지의 Month[] 생성
  const monthArr = Month.getMonthRange({ date: subYears(Day.today.date, 1) }, Day.tomorrow)

  // 특정 Month 선택시 Day[]는 Month의 처음 주 시작일 부터 끝 주 마지막일 까지
  const makeDayRange = (month: Month) => {
    return Day.getDayRange(
      {
        date: startOfISOWeek(month.startOf),
      },
      {
        date: endOfISOWeek(month.endOf),
      }
    )
  }

  return new Calendar({
    selectedSuper: selectedMonth,
    superRange: monthArr,
    extractSubRange: makeDayRange,
  })
}

// 교육비 연간 캘린더
export function makeTuitionYearlyCalendar(selectedYear: Year = currentYear) {
  // 2016년부터 내년까지의 Year[] 생성
  const yearArr = Year.getYearRange(
    { date: new Date(2016, 0, 1) },
    Year.fromDate(addYears(Day.today.date, 1))
  )

  // 특정 Year 선택시 1~12 Month
  const makeMonthRange = (year: Year) => {
    return Month.getMonthRange(year)
  }

  return new Calendar({
    selectedSuper: selectedYear,
    superRange: yearArr,
    extractSubRange: makeMonthRange,
  })
}
