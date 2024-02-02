import { createEventInfo } from "./helper"
import ICalendarLink from "react-icalendar-link";

export default function CalendarLink({day}){
    const event = createEventInfo(day)
    return (<ICalendarLink event={event}>Add to Calendar</ICalendarLink>)
}