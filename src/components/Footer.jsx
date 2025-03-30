// Footer.jsx
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Corrected line
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  textAlign: 'center',
}));

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="md">
        <Typography variant="body2" color="white">
          {'Copyright © '}
          
          {new Date().getFullYear()}
          {' TaskManager All rights reserved'}
          {/* <Link color="inherit" href="https://Taski.com/">
            TaskManager
          </Link>{' '} */}
          {'.'}
        </Typography>
        <Typography variant="body2" color="white" sx={{ mt: 1 }}>
          Made with ❤️ by Ravi Prakash
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;