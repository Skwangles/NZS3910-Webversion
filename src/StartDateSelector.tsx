import TextField from "@mui/material/TextField";

type StartDateSelectorProps = {
  startDate: string,
  setStartDate: React.Dispatch<React.SetStateAction<string>>
}

export default function StartDateSelector({startDate, setStartDate}: StartDateSelectorProps){
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