// import { Container, Typography, Paper, Box } from "@mui/material";
import { Container, Typography, Paper, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState }  from "react";
import apiClient from "../api/axios";
import GenericForm from '../components//GenericForm';

interface Template {
  // id: number;
  subject: string;
  body: string;
}

const CreateTemplate: React.FC = () => {
  const [createdTemplate, setCreatedTemplate] = useState<Template | null>(null);

  // Will be called by GenericForm
  const handleCreateSubmit = async (formData) => {
    // TODO: make sure that all fields are filled out before submitting
    try {
      const newTemplate = { ...formData };
      // const newTemplate: Template = { subject: formData.subject, body: formData.body };
      console.log('template in newTemplate:', newTemplate);
      const response = await apiClient.post<Template>("http://127.0.0.1:3000/create_template", newTemplate);
      setCreatedTemplate(response.data);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  return ( 
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Create Template
        </Typography>
        <Paper elevation={3} style={{ padding: "16px" }}>
          <GenericForm
            onSubmit={handleCreateSubmit}
            // initialValues={{  }} // Pass initial values from CreateTemplateForm state
            submitButtonLabel="Create"
          />
          {createdTemplate && (
            <Box mt={2}>
              <Typography variant="subtitle1">Created Template:</Typography>
              <ul>
                <li>ID: {createdTemplate.id}</li>
                <li>Subject: {createdTemplate.subject}</li>
                <li>Body: {createdTemplate.body}</li>
              </ul>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateTemplate;
