import React, { useState, useEffect } from 'react';
import { Box, Avatar, TextField, Button, Typography, FormControl, Input } from '@mui/material';
import { ApiRoutes } from '../enums/apiRoutes';
import { apiClient } from '../helpers/axiosClient';

interface UserProfile {
    name: string;
    email: string;
    token: string;
}

const EditProfileForm: React.FC = () => {
    const [userData, setUserData] = useState<UserProfile>({
        name: '',
        email: '',
        token: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(`${ApiRoutes.GET_USER_PROFILE}`);
                const data = response.data.data;
                setUserData({
                    name: data.name,
                    email: data.email,
                    token: data.token
                });
                setImagePreview(data.profilePic)
            } catch (error: any) {
                alert(`Failed to fetch user data: ${error.message}`);
            }
        };
        fetchUserData();
    }, []);

    const handleProfileUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            }
            await apiClient.put(`${ApiRoutes.UPDATE_PROFILE}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Profile updated successfully!");
        } catch (error: any) { }
    };

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        } else if(password.length < 6){
            alert("Password must be at least 6 characters long!");
            return;
        }
        try {
            await apiClient.post(`${ApiRoutes.CHANGE_PASSWORD}/${userData.token}`, { password });
            setPassword('');
            setConfirmPassword('');
            alert("Password updated successfully!");
        } catch (error: any) { }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Edit Profile
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                    src={imagePreview}
                    alt={userData.name}
                    sx={{ width: 100, height: 100 }}
                />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <Input
                    id="upload-image"
                    type="file"
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
            <TextField
                label="Name"
                value={userData.name}
                fullWidth
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                sx={{ mb: 2 }}
            />
            <TextField
                label="Email"
                value={userData.email}
                fullWidth
                disabled
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleProfileUpdate}
                sx={{ mb: 2 }}
            >
                Update Profile
            </Button>
            <TextField
                label="New Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handlePasswordChange}
            >
                Update Password
            </Button>
        </Box>
    );
};

export default EditProfileForm;
