import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ResetPasswordFormData>();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    console.log(data, token);
    navigate('/')
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === getValues("password") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
