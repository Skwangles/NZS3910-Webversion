import { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { regions } from './consts';

const RegionSelector = ({ region, setRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState(region ?? regions[0].code);

  const handleRegionChange = (event: { target: { value: string; }; }) => {
    setSelectedRegion(event.target.value);

    localStorage.setItem("region", event.target.value)
    setRegion(event.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <FormControl>
        <InputLabel id="Region-label">Select Region</InputLabel>
        <Select
          labelId="region-label"
          id="region-select"
          value={selectedRegion}
          label="Select Region"
          onChange={handleRegionChange}
        >
          {regions.map((regInfo) => (
            <MenuItem key={regInfo.code} value={regInfo.code}>
              {regInfo.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default RegionSelector;
