import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchCarModal(props) {
  const { store } = props;
  const [list, setList] = useState([]);
  const manufacturers = store.insurance;
  const motorCategory = manufacturers.getMotorCategory();

  useEffect(async () => {
    setList(await manufacturers.fetchManufacturer(motorCategory));
  }, []);
  
  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      
      options={list.map((item) => item.Manufacturername)}
      renderInput={(params) => (
        <TextField {...params} label="Car Manufacturer" />
      )}
    />
  );
}
