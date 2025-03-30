// FilterDisplay.jsx
import React from "react";
import { Chip, Box, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const FilterDisplay = ({
  filterPriority,
  setFilterPriority,
  filterDate,
  setFilterDate,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  filterMarked,
  setFilterMarked,
  sortMarked,
  setSortMarked,
}) => {
  const filters = [];

  if (filterPriority) {
    filters.push({ label: `Priority: ${filterPriority}`, remove: () => setFilterPriority("") });
  }

  if (filterDate) {
    filters.push({ label: `Date: ${filterDate}`, remove: () => setFilterDate("") });
  }

  if (sortField) {
    filters.push({
      label: `Sort: ${sortField} (${sortOrder})`,
      remove: () => {
        setSortField("");
        setSortOrder("asc");
      },
    });
  }

  if (filterMarked) {
    filters.push({ label: "Marked Tasks", remove: () => setFilterMarked(false) });
  }

  if (sortMarked) {
    filters.push({ label: "Sort By Marked", remove: () => setSortMarked(false) });
  }

  if (filters.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No filters applied.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={1} marginTop={2} marginBottom={2}>
      {filters.map((filter, index) => (
        <Chip
          key={index}
          label={filter.label}
          onDelete={filter.remove}
          deleteIcon={<CloseIcon />}
        />
      ))}
    </Box>
  );
};

export default FilterDisplay;