export const DEFAULT_REGION = "NZ-WKO"
export const COUNTRY_CODE = "NZ";
export const API_URL = "https://date.nager.at/api/v3/NextPublicHolidays/" + COUNTRY_CODE;

export const KEY_DAYS = [
    { "days": 0, "desc": "Schedule was served", makeEvent: false },
    { "days": 1, "desc": "Received date", makeEvent: false },
    { "days": 7, "desc": "Engineer issue Progress Payment Schedule", makeEvent: true },
    { "days": 10, "desc": "Principal advise amendments/deductions", makeEvent: true },
    { "days": 12, "desc": "Engineer issue replacement Schedule (if applicable)", makeEvent: true },
    { "days": 24, "desc": "Principal makes payment", makeEvent: true }
]; // Enter in Ascending order
export const MAX_BUSINESSDAY_COUNT = KEY_DAYS[KEY_DAYS.length - 1].days + 1 // +1 because day 0 is included

export const regions = [
    { label: 'Northland', code: 'NZ-NTL' },
    { label: 'Auckland', code: 'NZ-AUK' },
    { label: 'Waikato', code: 'NZ-WKO' },
    { label: 'Bay of Plenty', code: 'NZ-BOP' },
    { label: 'Gisborne', code: 'NZ-GIS' },
    { label: 'Hawke\'s Bay', code: 'NZ-HKB' },
    { label: 'Taranaki', code: 'NZ-TKI' },
    { label: 'Manawatu-Whanganui', code: 'NZ-MWT'},
    { label: 'Wellington', code: 'NZ-WGN' },
    { label: 'Tasman', code: 'NZ-TAS' },
    { label: 'Nelson', code: 'NZ-NSN' },
    { label: 'Marlborough', code: 'NZ-MBH' },
    { label: 'West Coast', code: 'NZ-WTC' },
    { label: 'Canterbury', code: 'NZ-CAN' },
    { label: 'Otago', code: 'NZ-OTA' },
    { label: 'Southland', code: 'NZ-STL' },
  ];