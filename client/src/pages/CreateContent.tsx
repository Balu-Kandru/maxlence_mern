import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import '../styles/Dashboard.css';
import AddContent from '../components/AddContent';

const CreateContent: React.FC = () => {
    return (
        <Container sx={{
            '@media (min-width: 1200px)': {
                width: '100%',
                margin: '0px',
                maxWidth: "100%"
            }
        }}>
            <Header />
            <AddContent />
        </Container >
    );
};

export default CreateContent;
