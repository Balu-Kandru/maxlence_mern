import React from 'react';
import { Typography, Box } from '@mui/material';

const NoData: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="300px">
      <Typography variant="h6" color="textSecondary">
        No data available.
      </Typography>
    </Box>
  );
};

export default NoData;
