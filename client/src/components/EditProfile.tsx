import React, { useState, useEffect } from 'react';
import { Box, Avatar, TextField, Button, Typography, FormControl, Input } from '@mui/material';
import { apiClient, getToken } from '../helpers/common'; // assuming you have helper functions for API
import { ApiRoutes } from '../enums/apiRoutes'; // assuming you have API routes

interface UserProfile {
    name: string;
    email: string;
}

const EditProfile: React.FC = () => {
    const [userData, setUserData] = useState<UserProfile>({
        name: '',
        email: ''
    });
    const [imagePreview, setImagePreview] = useState<string>("");
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImagePreview('')
        const file = event.target.files?.[0];
        if (file) {
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
                const token = getToken();
                const response = await apiClient.get(`${ApiRoutes.USER_PROFILE}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.data;
                console.log(data.data)
                setUserData({
                    name: data.name,
                    email: data.email,
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
            const token = getToken();
            const updatedProfile = {
                profilePic: imagePreview,
                name: userData.name,
            };

            await apiClient.put(
                `${ApiRoutes.UPDATE_PROFILE}`,
                updatedProfile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Profile updated successfully!");
        } catch (error: any) {
            alert(`Failed to update profile: ${error.message}`);
        }
    };

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const token = getToken();
            await apiClient.post(
                `${ApiRoutes.CHANGE_PASSWORD}`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Password updated successfully!");
        } catch (error: any) {
            alert(`Failed to update password: ${error.message}`);
        }
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

export default EditProfile;
