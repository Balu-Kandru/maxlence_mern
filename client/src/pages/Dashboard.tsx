import React from 'react';
import { Button, Container } from '@mui/material';
import ActionBox from '../components/ActionBox';
import Header from '../components/Header';
import { useActionContext } from '../ActionContext';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { actions } = useActionContext();
  const navigate = useNavigate();

  const handleSelectAction = (actionId: number) => {
    navigate(`/data-grid/${actionId}`);
  };

  const handleSaveContent = () => {
    navigate(`/create-content`);
  };

  return (
    <Container sx={{
      '@media (min-width: 1200px)': {
        width: '100%',
        margin: '0px',
        maxWidth: '100%',
      },
    }}>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '16px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveContent}
          sx={{
            textTransform: 'none',
            padding: '8px 16px',
          }}
        >
          Create
        </Button>
      </div>
      <div className="action-box-container">
        <ActionBox actions={actions} onSelectAction={handleSelectAction} />
      </div>
    </Container>
  );
};

export default Dashboard;
