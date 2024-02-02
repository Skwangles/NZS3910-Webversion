import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Container, Box } from '@mui/material';
import RegionSelector from './RegionSelector';

type Holiday = {
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

type DayInfo = {
  date: string,
  isBusinessDay: boolean,
  description: string
}

const keyDays = [{ "days": 7, "desc": "Engineer issue Progress Payment Schedule" },
    { "days": 10, "desc": "Principal advise amendments/deductions" },
    { "days": 12, "desc": "Engineer issue replacement Schedule (if applicable)" },
    { "days": 24, "desc": "Principal makes payment" }
];


const BusinessDayCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [region, setRegion] = useState(() => {return localStorage.getItem("region") ?? 'NZ-WKO'});
  const [businessDays, setBusinessDays] = useState<DayInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getISODate = (date: Date) => date.toISOString().split('T')[0]

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6

  const isHolidayForRegion = (holiday: Holiday) => {
    if (holiday.global === true) return true;
    return (region !== "" && holiday.counties?.includes(region))
  }

  const calculateBusinessDays = async () => {
    setLoading(true);

    if (getISODate(new Date()) > getISODate(new Date(startDate))){
      alert("Warning: Date provided is before today's date, any public holidays prior to today's date are not tracked.")
    }

    // Fetch public holidays
    const response = await fetch('https://date.nager.at/api/v3/NextPublicHolidays/NZ');
    const holidays = await response.json();

    const applicableHolidays = holidays
      .filter((holiday: Holiday) => isHolidayForRegion(holiday))

    const endDate = new Date(startDate);
    let businessDayCount = 0;

    const businessDaysList = [];

    while (businessDayCount < keyDays[keyDays.length - 1].days) {
      endDate.setDate(endDate.getDate() + 1);
      const day = getDayInformation(endDate, applicableHolidays)

      if (day.isBusinessDay) {
        businessDayCount++;
      }

      businessDaysList.push({
        date: endDate.toISOString().split('T')[0],
        isBusinessDay: day.isBusinessDay,
        description: (day.isBusinessDay ? countToDescription(businessDayCount) : "") + day.description
      });
    }

    setBusinessDays(businessDaysList);
    setLoading(false);
  };

  const countToDescription = (count: number) => {
    for (const keyDay of keyDays){
      if (count == keyDay.days) return count.toString() + " - " + keyDay.desc + " ";
    }
    return count
  }

  const getDayInformation = (date:Date, excludedDates: Holiday[]) => {
    if (isWeekend(date)) return { isBusinessDay: false, description: "Weekend"}

    for (let holiday of excludedDates) {
      if (getISODate(new Date(holiday.date)) === getISODate(date)){
        return { isBusinessDay: false, description: holiday.localName }
      }
    }

    return { isBusinessDay: true, description: ""}
  }

  return (
    <Box display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
      <Paper sx={{ padding: '20px'}}>
        <RegionSelector setRegion={setRegion}/>
      </Paper>
      <Paper sx={{ padding: '20px'}}>
        <Typography variant="h3" gutterBottom>
          Business Day Calculator
        </Typography>

        <Typography gutterBottom sx={{py: "5px"}}>
          Region: {region ?? "None selected"}
        </Typography>

        <TextField
          id="start-date"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={calculateBusinessDays}>
          Calculate
        </Button>
        {loading && <Typography variant="body1">Loading...</Typography>}
        {!loading && businessDays.length > 0 && (
          <div>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Business Days:
            </Typography>
            {businessDays.map((day, index) => (
              <Typography key={index} variant="body1">
                {day.date} - {day.isBusinessDay ? <b> {day.description} </b> : day.description}
              </Typography>
            ))}
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default BusinessDayCalculator;
