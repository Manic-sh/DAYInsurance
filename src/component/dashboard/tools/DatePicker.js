import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from "@mui/material/TextField";
export default function DatePicker({
  FilterName,
  FilterDate,
  FilterMinDate,
  FilterMaxDate,
  handleFilterChange,
}) {
  return (
    <>
        <MobileDatePicker
          inputFormat="dd/MM/yyyy"
          label={FilterName}
          name="DatePicker"
          disableCloseOnSelect={false}
          value={FilterDate}
          minDate={FilterMinDate}
          maxDate={FilterMaxDate}
          onChange={(newValue) => {
            handleFilterChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </>
  );
}
