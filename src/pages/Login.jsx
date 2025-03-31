import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  styled,
  Alert,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "Ravi" && password === "1234") {
      localStorage.setItem("user", username);
      navigate("/dashboard");
      console.log("Toast should be showing now");
      toast.success('Sign in successful!');
      console.log("Toast function finished");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box>
      <Navbar1/>
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5" align="center">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Sign In
          </StyledButton>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </StyledPaper>
      <ToastContainer position="top-left" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
    <Footer/>
    </Box>
  );
};

export default Login;