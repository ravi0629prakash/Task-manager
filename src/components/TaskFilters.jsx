// TaskFilters.jsx
import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

const TaskFilters = ({
  filterPriority,
  setFilterPriority,
  filterDate,
  setFilterDate,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  openFilterDialog,
  setOpenFilterDialog,
  tempFilterPriority,
  setTempFilterPriority,
  tempFilterDate,
  setTempFilterDate,
  tempSortField,
  setTempSortField,
  tempSortOrder,
  setTempSortOrder,
  filterMarked,
  setFilterMarked,
  tempFilterMarked,
  setTempFilterMarked,
  sortMarked,
  setSortMarked,
  tempSortMarked,
  setTempSortMarked,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFilterSubmit = () => {
    setFilterPriority(tempFilterPriority);
    setFilterDate(tempFilterDate);
    setSortField(tempSortField);
    setSortOrder(tempSortOrder);
    setFilterMarked(tempFilterMarked);
    setSortMarked(tempSortMarked);
    setOpenFilterDialog(false);
  };

  const handleOpenFilterDialog = () => {
    setTempFilterPriority(filterPriority);
    setTempFilterDate(filterDate);
    setTempSortField(sortField);
    setTempSortOrder(sortOrder);
    setTempFilterMarked(filterMarked);
    setTempSortMarked(sortMarked);
    setOpenFilterDialog(true);
  };

  const handleClearFilters = () => {
    setFilterPriority("");
    setFilterDate("");
    setSortField("");
    setSortOrder("asc");
    setFilterMarked(false);
    setSortMarked(false);
  };

  return (
    <Box display="flex" justifyContent="center" gap={2} marginTop={2} marginBottom={2}>
      <Button variant="outlined" onClick={handleOpenFilterDialog} fullWidth={isMobile}>
        Filter Tasks
      </Button>
      <Button variant="outlined" onClick={handleClearFilters} fullWidth={isMobile}>
        Clear Filters
      </Button>
      <Dialog open={openFilterDialog} onClose={() => setOpenFilterDialog(false)} fullWidth={isMobile}>
        <DialogTitle>Filter Tasks</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Filter Priority</InputLabel>
            <Select value={tempFilterPriority} onChange={(e) => setTempFilterPriority(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField type="date" label="Filter Date" value={tempFilterDate} onChange={(e) => setTempFilterDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Sort By</InputLabel>
            <Select value={tempSortField} onChange={(e) => setTempSortField(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => setTempSortOrder(tempSortOrder === "asc" ? "desc" : "asc")} style={{ marginTop: "10px" }} fullWidth={isMobile}>
            {tempSortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
          <FormControl fullWidth margin="normal">
            <FormControlLabel control={<Checkbox checked={tempFilterMarked} onChange={(e) => setTempFilterMarked(e.target.checked)} />} label="Filter Marked Tasks" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <FormControlLabel control={<Checkbox checked={tempSortMarked} onChange={(e) => setTempSortMarked(e.target.checked)} />} label="Sort by Marked Tasks" />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFilterDialog(false)}>Cancel</Button>
          <Button onClick={handleFilterSubmit} variant="contained" color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskFilters;