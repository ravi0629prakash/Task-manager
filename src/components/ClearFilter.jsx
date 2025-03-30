// ClearFiltersButton.jsx
import React from 'react';
import { Button } from '@mui/material';
const ClearFiltersButton = ({ handleClearFilters, isMobile }) => (
  <Button
    variant="outlined"
    onClick={handleClearFilters}
    fullWidth={isMobile}
  >
    Clear Filters
  </Button>
);

export default ClearFiltersButton;