import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SignIn from '../components/Auth/SignIn';

const Login: React.FC = () => {

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
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  );
};

export default Login;
