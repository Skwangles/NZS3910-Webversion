import { KEY_DAYS } from "./consts"

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
    description: string,
    makeEvent?: boolean
  }

export type KeyDay = {
    days: number,
    desc: string
}

export function getDateAtMidnight(dateString: string | Date){
  const date = new Date(dateString)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

export function getISODate(date: Date) { return date.toISOString().split('T')[0]}

export function isWeekend(date: Date) { return date.getDay() === 0 || date.getDay() === 6 }

export function isHolidayForRegion(holiday: Holiday, region: string) {
    if (holiday.global === true) return true;
    // Note: date.nager.at API uses 'counties' to indicate regions
    return (region !== "" && holiday.counties?.includes(region))
  }

export function getDayInformation(date:Date, excludedDates: Holiday[], count: number){
    if (isWeekend(date)) return { isBusinessDay: false, description: "Weekend"}

    for (let holiday of excludedDates) {
      if (getISODate(new Date(holiday.date)) === getISODate(date)){
        return { isBusinessDay: false, description: holiday.localName }
      }
    }

    const impactingKeyDay = KEY_DAYS.find(keyDay => keyDay.days === count)
    if (impactingKeyDay){
      return { isBusinessDay: true, description: impactingKeyDay.desc, makeEvent: impactingKeyDay.makeEvent}
    }

    return { isBusinessDay: true, description: "", makeEvent: false}
  }


export function createEventInfo(day: DayInfo){
    return {
      title: day.description,
      description: "NZS3910 - Contractor claims key date",
      startTime: getDateAtMidnight(day.date).toISOString()
    }
}

export function getChristmasException(startDate: Date | string){
  const chistmasShutdownLength = 13 // 24th Dec - 5th Jan, both inclusive

  let currentDate = new Date(new Date(startDate).getFullYear().toString() +  "-12-24")
  let extra = []

  for (let i = 0; i < chistmasShutdownLength; i++){
      extra.push({
          "date": getISODate(currentDate),
          "localName": "Christmas Shutdown",
          "name": "Christmas Shutdown",
          "countryCode": "NZ",
          "fixed": false,
          "global": true,
          "counties": null,
          "launchYear": null,
          "types": null
        })

      currentDate.setDate(currentDate.getDate() + 1);
  }
  return extra
}