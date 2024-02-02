import TextField from "@mui/material/TextField";

export default function StartDateSelector({startDate, setStartDate}){
    return (<TextField
        id="start-date"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '20px' }}
      />)
}