import { DayInfo, createEventInfo } from "./helper"
import ICalendarLink from "react-icalendar-link";

type CalendarLinkProps = {
    day: DayInfo
}

export default function CalendarLink({day}: CalendarLinkProps){
    const event = createEventInfo(day)
    //@ts-ignore - The library is just being whiny
    return (<ICalendarLink event={event}>Add to Calendar</ICalendarLink>)
}