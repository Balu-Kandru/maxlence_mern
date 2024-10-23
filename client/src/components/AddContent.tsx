import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { apiClient, getToken } from '../helpers/common';
import { ApiRoutes } from '../enums/apiRoutes';
import { useNavigate } from 'react-router-dom';

interface AddContentForm {
  title: string;
  body: string;
}

const AddContent: React.FC = () => {
  const [formData, setFormData] = useState<AddContentForm>({
    title: '',
    body: ''
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = getToken();
    if (!token) {
      alert('You must be logged in to add content');
      return;
    }

    if (!formData.title || !formData.body) {
      alert('Both fields are required');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post(ApiRoutes.ADD_CONTENT, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Content added successfully!');
      setFormData({
        title: '',
        body: ''
      });
      navigate('/dashboard')
    } catch (error: any) {
      alert(`Failed to add content: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add New Content
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Body"
          name="body"
          value={formData.body}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Box>
  );
};

export default AddContent;
