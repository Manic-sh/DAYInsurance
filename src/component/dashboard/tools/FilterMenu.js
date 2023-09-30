import { useState } from "react";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";
// component
import Iconify from "../Iconify";

// ----------------------------------------------------------------------

export default function FilterMenu({ sortBy, filterKey, handleFilterChange }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleFilter = (v) => {
    setOpen(null);
    handleFilterChange(v);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={
          <Iconify
            icon={open ? "eva:chevron-up-fill" : "eva:chevron-down-fill"}
          />
        }
      >
        Filter By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {filterKey}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {sortBy.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === "newest"}
            onClick={() => handleFilter(option.value)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
