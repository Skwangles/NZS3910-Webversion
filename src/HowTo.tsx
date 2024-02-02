import React, { useState } from "react";
import { Box, Button } from "@mui/material";

export default function HowTo() {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <Box sx={{margin: "10px"}}>
      <Button variant="contained" color="info" size="small" onClick={toggleHelp} sx={{marginBottom: "10px"}}>
        Important Info
      </Button>
      {showHelp && (
        <Box>
          <b>Please note this tool uses important specifications from the NZS 3910:2013 - References where applicable included</b>
          <br />
          <b>Start Date</b> - date on which the payment claim was 'served' on the Engineer (1.5, G12.2.4).
          <br />
          <b>Start date is counted as day 0</b> Day 1 is the Working Day AFTER you receive/are served it.
          <br />
          <b>Important:</b> If you received the claim after 5PM or on a non-Working Day, you must select the NEXT Working Day (15.1.8).
          <br />
          <b>Working Day:</b> A day other than Saturday, Sunday, public holidays, or during 24th Dec-5th Jan (both inclusive) (1.2)
          <br />
          <b>Region:</b> Your office's New Zealand Region (e.g. Waikato, Northland, etc.)
          <br />
          <i>All key dates where taken from 12.2, which outlines the important deadlines.</i>
        </Box>
      )}
    </Box>
  );
}
