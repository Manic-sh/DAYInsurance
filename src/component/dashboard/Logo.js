import { Link } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import logoImg from '../../assets/images/logo/logo.png';

export default function Logo({ disabledLink = false, sx }) {
   const logo = <Box component="img" src={logoImg} sx={{ height: 60, ...sx }} />

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Link to="/">{logo}</Link>;
}
