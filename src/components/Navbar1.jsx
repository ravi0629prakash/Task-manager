
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Use theme's primary color
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
}));

const Navbar = ({ onAddTaskClick, onFilterTasksClick }) => {
  const navigate = useNavigate();

  const handleExitClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;