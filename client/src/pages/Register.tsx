import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SignUp from '../components/Auth/SignUp';

const Register: React.FC = () => {

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <SignUp />
      </Box>
    </Container>
  );
};

export default Register;
