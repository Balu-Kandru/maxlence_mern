import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type ForgotPasswordFormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    console.log(data)
    navigate('/')
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Enter Your Account Email
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Send Email
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
