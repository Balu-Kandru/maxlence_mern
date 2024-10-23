import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiRoutes } from '../../enums/apiRoutes';
import { AxiosResponse } from 'axios';
import { apiClient, clearLocalStorage, setLocalStorage } from '../../helpers/common';
import { AuthResponse } from '../../types/login.interface';
import { useActionContext } from '../../ActionContext';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const { setActions } = useActionContext();

  const handleLogin: SubmitHandler<SignInFormData> = (signIndata) => {
      apiClient.post(ApiRoutes.LOGIN, signIndata)
        .then((loginData: AxiosResponse<AuthResponse>) => {
          const { accesToken, user, actions } = loginData.data.data;
          setActions(actions)
          setLocalStorage(accesToken, user.name, String(user.id), user.profilePic);
          navigate('/dashboard');
        }).catch((err: any) => {
          alert(`Unauthorized user ${err.message}`);
        })
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 2 }} // Add margin bottom for spacing
      />

      <Button type="submit" variant="contained" fullWidth>
        Sign In
      </Button>
      <Typography >
        <Link href="/forgot-password" >
          Forgot password ?
        </Link>
      </Typography>
      <Typography > Do you have an account ?
        <Link
          href="/register"
          sx={{ ml: 1, cursor: 'pointer' }}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
