import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import EditProfileForm from '../components/EditProfileForm';

const UpdateProfile: React.FC = () => {

    return (
        <Container sx={{
            '@media (min-width: 1200px)': {
                width: '100%',
                margin: '0px',
                maxWidth: "100%"
            }
        }}>
            <Header />
            <EditProfileForm/>
        </Container >
    );
};

export default UpdateProfile;
