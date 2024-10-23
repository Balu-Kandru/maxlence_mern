import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link, FormControl, Input, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiRoutes } from '../../enums/apiRoutes';
import { apiClient } from '../../helpers/common';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  profilePic: FileList;
};

const SignUp: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const navigate = useNavigate();

  const handleSignUp: SubmitHandler<SignUpFormData> = async (userInfo: SignUpFormData) => {
    const formData = new FormData();
  
    formData.append('name', userInfo.name);
    formData.append('email', userInfo.email);
    formData.append('password', userInfo.password);
    
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      await apiClient.post(ApiRoutes.SIGNUP, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("A mail is sent to your email, please confirm before login");
      navigate("/");
    } catch (err: any) {
      console.log(err.response);
      alert(`something went wrong: ${err.response ? err.response.data.message : err}`);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview('')
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 4 }}>

      {imagePreview && <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar
          src={imagePreview}
          alt={"no image"}
          sx={{ width: 100, height: 100 }}
        />
      </Box>}

      <TextField
        fullWidth
        label="Full Name"
        {...register("name", { required: "Full Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
        sx={{ mb: 2 }}
      />
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Input
          id="upload-image"
          type="file"
          {...register("profilePic")}
          onChange={handleFileChange}
          inputProps={{ accept: 'image/*' }}
          sx={{ display: 'none' }}
        />
        <Button
          variant="outlined"
          component="label"
          htmlFor="upload-image"
          sx={{ height: '40px' }}
        >
          Upload Profile Pic
        </Button>
      </FormControl>

      <Button type="submit" variant="contained" fullWidth sx={{ mb: 2 }}>
        Sign Up
      </Button>

      <Typography
        component="h1"
        variant="body1"
        align="center"
        sx={{ mt: 2, cursor: 'pointer' }}
      >
        Already have an account?
        <Link
          href="/"
          sx={{ ml: 1, cursor: 'pointer' }}
        >
          Sign In
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
