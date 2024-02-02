import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const RegionSelector = ({ setRegion }) => {
  const [selectedCounty, setSelectedCounty] = useState('');

  const counties = [
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

  const handleCountyChange = (event) => {
    setSelectedCounty(event.target.value);
  };

  const handleUpdateRegion = () => {
    setRegion(selectedCounty);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="county-label">Select County</InputLabel>
        <Select
          labelId="county-label"
          id="county-select"
          value={selectedCounty}
          label="Select County"
          onChange={handleCountyChange}
        >
          {counties.map((county) => (
            <MenuItem key={county.code} value={county.code}>
              {county.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleUpdateRegion}>
        Update Region
      </Button>
    </div>
  );
};

export default RegionSelector;
