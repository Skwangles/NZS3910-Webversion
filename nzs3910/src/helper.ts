export type Holiday = {
    date: string,
      localName: string,
      name: string,
      countryCode: string,
      fixed: boolean,
      global: boolean,
      counties: string[] | null,
      launchYear: number | null,
      types: string[] | null
  }
  
export  type DayInfo = {
    date: string,
    isBusinessDay: boolean,
    description: string
  }

export type KeyDay = {
    days: number,
    desc: string
}

export function getISODate(date: Date) { return date.toISOString().split('T')[0]}

export function isWeekend(date: Date) { return date.getDay() === 0 || date.getDay() === 6 }

export function isHolidayForRegion(holiday: Holiday, region: string) {
    if (holiday.global === true) return true;
    // Note: date.nager.at API uses 'counties' to indicate regions
    return (region !== "" && holiday.counties?.includes(region))
  }

export function countToDescription(count: number, keyDays: KeyDay[]) {
    for (const keyDay of keyDays){
      if (count == keyDay.days) return count.toString() + " - " + keyDay.desc + " ";
    }
    return count
  }

export function getDayInformation(date:Date, excludedDates: Holiday[]){
    if (isWeekend(date)) return { isBusinessDay: false, description: "Weekend"}

    for (let holiday of excludedDates) {
      if (getISODate(new Date(holiday.date)) === getISODate(date)){
        return { isBusinessDay: false, description: holiday.localName }
      }
    }

    return { isBusinessDay: true, description: ""}
  }
