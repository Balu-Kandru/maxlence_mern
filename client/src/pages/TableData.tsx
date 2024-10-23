import React from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import TableBox from '../components/TableBox';

const DataGrid: React.FC = () => {

    return (
        <Container sx={{
            '@media (min-width: 1200px)': {
                width: '100%',
                margin: '0px',
                maxWidth: "100%"
            }
        }}>
            <Header />
            <TableBox />
        </Container >
    );
};

export default DataGrid;
