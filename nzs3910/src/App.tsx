import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Container } from '@mui/material';
import RegionSelector from './RegionSelector';
import { DayInfo, Holiday, countToDescription, getDayInformation, getISODate, isHolidayForRegion } from './helper';
import { DEFAULT_REGION, API_URL, MAX_BUSINESSDAY_COUNT, KEY_DAYS } from './consts';
import "./App.css"

const BusinessDayCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [region, setRegion] = useState(() => {const locSto = localStorage.getItem("region") 
      if (locSto && locSto !== "") 
        return locSto
      else 
        localStorage.setItem("region", DEFAULT_REGION)

      return DEFAULT_REGION
    });
  const [businessDays, setBusinessDays] = useState<DayInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateBusinessDays = async () => {
    setLoading(true);
    if (startDate === "") {
      setLoading(false);
      alert("Enter a date to continue!");
      return;
    }

    if (getISODate(new Date()) > getISODate(new Date(startDate))){
      alert("Warning: Date provided is before today's date, any public holidays prior to today's date are not tracked.")
    }

    // Fetch public holidays
    const response = await fetch(API_URL);
    const holidays = await response.json();

    const applicableHolidays = holidays
      .filter((holiday: Holiday) => isHolidayForRegion(holiday, region))

    const currentDate = new Date(startDate);
    let businessDayCount = 0;

    const businessDaysList = [];

    while (businessDayCount < MAX_BUSINESSDAY_COUNT) {
      const day = getDayInformation(currentDate, applicableHolidays)

      businessDaysList.push({
        date: currentDate.toISOString().split('T')[0],
        isBusinessDay: day.isBusinessDay,
        description: (day.isBusinessDay ? countToDescription(businessDayCount, KEY_DAYS) : "") + day.description
      });

      if (day.isBusinessDay) {
        businessDayCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setBusinessDays(businessDaysList);
    setLoading(false);
  };

  

  return (
    <Container>
      <Typography variant="h3" gutterBottom sx={{textAlign:"center", py: "10px"}}>
          Business Day Calculator
        </Typography>
      <Paper sx={{ padding: '20px', alignItems: "center", alignContent: "center", justifyContent: "center", marginBottom: "50px"}}>
        

        <RegionSelector region={region} setRegion={setRegion}/>

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
        

        {/* Display Dates */}
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
    </Container>
  );
};

export default BusinessDayCalculator;
