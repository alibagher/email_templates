import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface GenericFormProps {
  onSubmit: (formData: any) => void;
  // Optional initial values for form fields
  initialValues?: { [key: string]: string }; 
  submitButtonLabel: string;
}

const GenericForm: React.FC<GenericFormProps> = ({ onSubmit, initialValues = {}, submitButtonLabel }) => {
  const [formData, setFormData] = useState(initialValues);

  console.log(initialValues, formData)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    // Prevents from page reloading.
    event.preventDefault();
    // Pass the data to the onSubmit Function
    onSubmit(formData);
    // will not set the fields empty because when editing, can continously edit. but when creating, it will create a new one.
    // setFormData({});
  };

  return (
    <Box>
      {/* Optional title */}
      {/* <Typography variant="h6" gutterBottom>
        {title}
      </Typography> */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Subject"
          name="subject" // Use name attribute for form data access
          value={formData.subject || ''} // Access value from formData
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          name="body" // Use name attribute for form data access
          multiline
          rows={4}
          value={formData.body || ''} // Access value from formData
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {submitButtonLabel}
        </Button>
      </form>
    </Box>
  );
};

export default GenericForm;